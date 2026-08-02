/* ===========================================================
 * NB 化学实验室 — 离线运行垫片 (shim) v2  [noserver 版]
 * 目标：只保留“做实验”，把 登录/激活/VIP/作业/统计/上报 全部本地假装成功。
 * 与 v1 的区别：彻底移除对 server.py 的依赖 —— 所有接口拦截、假数据、以及
 *   内容类接口的“录制回放”全部在浏览器内完成，页面变为纯静态，可用任意静态
 *   服务器（python -m http.server / nginx / GitHub Pages…）托管，无需自定义后端。
 * 加载时机：nb-config.js 之后、其余脚本之前（nb-fixtures.js 需在它之前加载）。
 * =========================================================== */
(function () {
  'use strict';

  var LOG = true;
  var HITS = [];          // 被拦截的请求，window.__nbShimHits 可查
  window.__nbShimHits = HITS;
  var MISSING = [];       // 内容类接口无内嵌数据时的缺失清单，window.__nb_missing 可查
  window.__nb_missing = MISSING;

  function log() {
    if (LOG) console.log.apply(console, ['%c[shim]', 'color:#0a7'].concat([].slice.call(arguments)));
  }
  function noop() { }

  /* ---------- 1. 不再改写 API 域名为 /__nbapi，保留真实跨域 URL ----------
   * 拦截发生在下面的 fetch / XHR 钩子里：所有跨域请求都会被合成响应，
   * 因此不再需要把地址改写为本地占位、也不再需要 server.py 的 /__nbapi、/__nbpx。
   * 仅把 cookieDomain 收敛为当前 host，避免跨域 cookie 写不进去。 */
  var cfg = window.__nb_config || (window.__nb_config = { api: {} });
  cfg.api = cfg.api || {};
  if (window.__nb_domain) {
    try { window.__nb_domain.cookieDomain = location.hostname; } catch (e) { }
  }
  // 关掉埋点 / 调研 / sentry（与 v1 一致）
  window.__nb_sensors = { enabled: '', showlog: '', tenantName: 'nobook', project: 'offline' };
  window.__nb_howxm = { appId: '' };
  window.__nb_sentry = { enabled: '' };

  /* ---------- 1.5 注入 auth_key（SDK 缺失时会跳过全部初始化导致点击无反应） ---------- */
  /* 根因: umi.js 中 sdkModel.parseAuthKeyFromURL 在 query.auth_key 缺失时 early return，
     导致整个交互系统(PointerManager等)不初始化 → 点击无反应。
     方案: URL注入 + 延迟Redux dispatch双保险 */
  (function injectAuthKey() {
    // A) URL 层面注入
    var url = location.href;
    if (!/[?&]auth_key=/.test(url)) {
      var sep = url.indexOf('?') >= 0 ? '&' : '?';
      var fakeAuth = '21-offline' + Date.now().toString(36);
      try { history.replaceState(null, '', url + sep + 'auth_key=' + encodeURIComponent(fakeAuth)); } catch (e) { }
      log('URL 注入 auth_key=' + fakeAuth);
    }

    // B) hook location.href（umi 内部可能从这里读 query）
    try {
      var origSearchDesc = Object.getOwnPropertyDescriptor(location, 'search')
        || Object.getOwnPropertyDescriptor(HTMLLocation.prototype, 'search');
      if (origSearchDesc && origSearchDesc.get) {
        var origGet = origSearchDesc.get;
        Object.defineProperty(location, 'search', {
          get: function () { var s = origGet.call(this); return /[?&]auth_key=/.test(s) ? s : s + (s ? '&' : '?') + 'auth_key=21-offline'; },
          configurable: true
        });
      }
    } catch (e) { }

    // C) 延迟直接 dispatch Redux —— 最可靠方案，不依赖路由时序
    // 等待 dva app 初始化后，模拟 parseAuthKeyFromURL 成功后的行为：
    //   bt("21-xxx") → {canDIY:true, canRes:true, gradeId:3} (高中化学)
    //   然后 dispatch sdkModel/updateState + appModel/switchGrade
    setTimeout(function tryDispatch() {
      try {
        var dvaApp = window.getDvaApp && window.getDvaApp();
        if (!dvaApp || !dvaApp._store) {
          log('等待 dva app...'); setTimeout(tryDispatch, 500); return;
        }
        var store = dvaApp._store;
        var state = store.getState();
        // 检查是否已经初始化过（避免重复）
        if (state.sdkModel && state.sdkModel.gradeId) {
          log('sdkModel 已有 gradeId=' + state.sdkModel.gradeId + ', 跳过 dispatch');
          return;
        }
        // 模拟 bt("21-xxxx") 的返回值：高中化学, 可DIY, 可资源
        store.dispatch({ type: 'sdkModel/updateState', payload: {
          canDIY: true, canRes: true, gradeId: 3,
          forceHDVOnMobile: false, noNBSetDataOfURL: false
        } });
        store.dispatch({ type: 'appModel/switchGrade', payload: 3 });
        log('✅ 已直接 dispatch sdkModel 状态 (gradeId=3 高中化学 DIY=Res=true)');
      } catch (e) {
        log('dispatch 待重试: ' + e.message); setTimeout(tryDispatch, 1000);
      }
    }, 2000);  // 等 2s 让 dva app 先初始化
  })();

  /* ---------- 1.9 占位 encrypt_data ----------
   * 真正 encrypt_data 由服务端用 RSA 签名的随机 AES 密钥（MD5(getUniqueID())）加密，
   * 离线无法复现合法密文。此处任意占位值即可：umi.5eade003.js 的解密函数 Vt 已打补丁——
   * 当真实 AES 解密失败（离线必然失败）时回退返回离线 VIP JSON（含 vip_info 与
   * 顶层 vip/app_resource_vip/channel_vip），使登录链 le.vip_info 命中、器材解锁。 */
  var EMPTY_CIPHER = 'AAAAAAAAAAAAAAAAAAAAAA==';

  /* ---------- 2. 假用户：一个永不过期的本地 VIP ---------- */
  var FAKE_USER = {
    id: 100001,
    uid: 100001,
    user_id: 100001,
    username: 'offline',
    nickname: '本地用户',
    realname: '本地用户',
    avatar: '',
    mobile: '',
    role: 1,
    identity: 1,
    is_vip: 1,
    isVip: true,
    vip: 1,
    vip_level: 9,
    vipLevel: 9,
    vip_end_time: 4102444800,      // 2100-01-01
    expire_time: 4102444800,
    school_id: 1,
    school_name: '本地',
    subject: 'chemistry',
    token: 'offline-token',
    is_login: 1
  };
  window.__nb_offline_user = FAKE_USER;

  /* ---------- 3. 通用响应模板 ---------- */
  function ok(data) {
    return { code: 0, status: 0, errcode: 0, success: true, message: 'ok', msg: 'ok', data: data === undefined ? {} : data };
  }

  // 按 URL 关键字给不同的假数据
  function mockFor(url) {
    var u = String(url);

    /* ★ 登录态判定的唯一来源：必须返回扁平对象（umi-request 不解包 {code,data} 信封），
     *   且顶层带 auth_token + encrypt_data。否则 app 读 le.auth_token=undefined → 弹微信扫码框 →
     *   二维码 canvas 未挂载 → getContext 崩溃。encrypt_data 为占位值即可，真正的 vip_info
     *   由 umi.5eade003.js 的 Vt 补丁在解密失败时注入。 */
    if (/login\/check|checkLogin/i.test(u)) {
      var lc = {};
      for (var _k in FAKE_USER) if (Object.prototype.hasOwnProperty.call(FAKE_USER, _k)) lc[_k] = FAKE_USER[_k];
      lc.auth_token = 'offline-token';
      lc.encrypt_data = EMPTY_CIPHER;
      lc.schoolname = '本地';
      lc.phone = '13800000000';
      lc.phone_check = 1;
      lc.tenant = 'nb';
      lc.tenant_info = { id: 'nb', name: '本地' };
      lc.customer_account_lock_status = 0;
      HITS.push({ via: 'login-check-flat', url: u });
      log('login/check → 扁平已登录响应 (auth_token + encrypt_data)');
      return lc;
    }

    if (/login|passport|checkLogin|userInfo|user_info|getUser|account/i.test(u)) {
      return ok({ user: FAKE_USER, userInfo: FAKE_USER, info: FAKE_USER, isLogin: true, is_login: 1 });
    }
    if (/vip|limit|权限|auth|permission|purchase|order|pay/i.test(u)) {
      return ok({ is_vip: 1, isVip: true, level: 9, limit: 0, expired: false, end_time: 4102444800 });
    }
    if (/activate|active|offline/i.test(u)) {
      return ok({ activated: true, status: 1, expire: 4102444800 });
    }
    if (/serverTime|time/i.test(u)) {
      return ok({ time: Math.floor(Date.now() / 1000), timestamp: Date.now() });
    }
    if (/homework|task|report|record|save|upload|log|track|stat/i.test(u)) {
      return ok({ id: 0, list: [], total: 0 });
    }
    if (/list|templates|resource|catalog|module/i.test(u)) {
      return ok({ list: [], items: [], total: 0, data: [] });
    }
    return ok({});
  }

  /* ---------- 3.5 内嵌接口数据（取代 server.py 的 /__nbpx RECORD/REPLAY） ----------
   * 数据源：window.__nb_fixtures（由 nb-fixtures.js 定义，默认空）。
   *   录制方式：在带 server.py 的 Offline 分支用 --record 抓真响应，再编译进 nb-fixtures.js。
   *   未录制时：内容类接口返回空 ok({})，页面照常运行（试剂/容器列表为空）。
   * 易变 query 参数（时间戳/随机数/签名）不参与匹配键，避免永远 miss。 */
  var VOLATILE_QS = {
    '_': 1, 't': 1, 'ts': 1, 'time': 1, 'timestamp': 1, 'rand': 1, 'random': 1,
    'nonce': 1, 'sign': 1, 'signature': 1, 'auth_key': 1, 'token': 1, '_t': 1,
    'cb': 1, 'callback': 1, 'r': 1
  };

  function normalizeUrl(url) {
    try {
      var u = new URL(url, location.href);
      var entries = [];
      u.SearchParams.forEach(function (v, k) { entries.push([k, v]); });
      entries = entries.filter(function (kv) { return !VOLATILE_QS[kv[0].toLowerCase()]; });
      entries.sort(function (a, b) { return a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0); });
      var q = entries.map(function (kv) { return encodeURIComponent(kv[0]) + '=' + encodeURIComponent(kv[1]); }).join('&');
      return u.origin + u.pathname + (q ? '?' + q : '');
    } catch (e) {
      return String(url);
    }
  }

  function fxStrictKey(method, url) {
    return (method || 'GET').toUpperCase() + ' ' + normalizeUrl(url);
  }
  function fxLooseKey(method, url) {
    try {
      var u = new URL(url, location.href);
      return (method || 'GET').toUpperCase() + ' ' + u.origin + u.pathname;
    } catch (e) {
      return (method || 'GET').toUpperCase() + ' ' + url;
    }
  }

  function lookupFixture(method, url) {
    var fx = window.__nb_fixtures || {};
    var strict = fxStrictKey(method, url);
    if (fx[strict]) return fx[strict];
    var loose = fxLooseKey(method, url) + '?';
    var keys = Object.keys(fx);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].indexOf(loose) === 0) return fx[keys[i]];
    }
    return null;
  }

  var _missSeen = {};
  function recordMissing(via, url) {
    var tag = via + ' ' + url;
    if (_missSeen[tag]) return;
    _missSeen[tag] = 1;
    MISSING.push({ via: via, url: url });
    log('无内嵌数据 →', url, '（返回空 ok，查看 window.__nb_missing）');
  }

  /* ---------- 4. 哪些请求仍走本地假数据（不查 fixtures）：登录 / VIP / 激活 / 上报 / 时间 等会话类。
   * 这样本地假 VIP 态不会被真实（可能非 VIP）响应覆盖，离线壳照常“已登录/已激活”。 ---------- */
  function shouldMock(url) {
    return /login|passport|checkLogin|userInfo|user_info|getUser|account|vip|limit|权限|auth|permission|purchase|order|pay|activate|active|offline|serverTime|time|homework|task|report|record|save|upload|log|track|stat|sensors|howxm/i.test(String(url));
  }

  function isLocalAsset(url) {
    var u = String(url);
    if (/^(blob:|data:)/.test(u)) return true;
    // 相对路径或同源 → 当作静态资源放行
    if (!/^https?:\/\//.test(u)) return true;
    try {
      return new URL(u, location.href).origin === location.origin;
    } catch (e) { return false; }
  }

  /* ---------- 5. 拦 fetch（合成响应，绝不触网） ---------- */
  var rawFetch = window.fetch ? window.fetch.bind(window) : null;
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    if (isLocalAsset(url)) return rawFetch(input, init);
    HITS.push({ via: 'fetch', url: url });
    log('fetch →', url);
    init = init || {};

    if (shouldMock(url)) {
      var b = JSON.stringify(mockFor(url));
      return Promise.resolve(new Response(b, { status: 200, headers: { 'Content-Type': 'application/json' } }));
    }

    // 内容类请求：命中内嵌数据则回放，否则空 ok
    var meta = lookupFixture(init.method, url);
    if (meta) {
      var body = (typeof meta.body === 'object') ? JSON.stringify(meta.body) : String(meta.body == null ? '{}' : meta.body);
      log('fixture →', url);
      return Promise.resolve(new Response(body, {
        status: meta.status || 200,
        headers: { 'Content-Type': (meta.contentType || 'application/json') }
      }));
    }
    recordMissing('fetch', url);
    return Promise.resolve(new Response(JSON.stringify(ok({})), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    }));
  };

  /* ---------- 6. 拦 XHR（原型补丁，保留原生对象，不破坏 responseType/事件） ---------- */
  var XP = XMLHttpRequest.prototype;
  var rawOpen = XP.open, rawSend = XP.send;
  var rawSetHeader = XP.setRequestHeader;
  var rawGetAll = XP.getAllResponseHeaders, rawGetOne = XP.getResponseHeader;

  function freeze(obj, k, v) {
    try { Object.defineProperty(obj, k, { value: v, configurable: true, writable: true }); }
    catch (e) { }
  }

  XP.open = function (method, url) {
    this.__nbUrl = url;
    this.__nbMethod = method || 'GET';
    this.__nbHeaders = {};
    this.__nbMock = !isLocalAsset(url);
    if (!this.__nbMock) return rawOpen.apply(this, arguments);
    HITS.push({ via: 'xhr', url: url, method: method });
    log('xhr →', method, url);
  };
  XP.setRequestHeader = function (k, v) {
    if (!this.__nbMock) return rawSetHeader.apply(this, arguments);
    if (this.__nbHeaders) this.__nbHeaders[k] = v;
  };
  XP.getAllResponseHeaders = function () {
    if (!this.__nbMock) return rawGetAll.apply(this, arguments);
    return 'content-type: ' + (this.__nbCt || 'application/json') + '\r\n';
  };
  XP.getResponseHeader = function (h) {
    if (!this.__nbMock) return rawGetOne.apply(this, arguments);
    return /content-type/i.test(h) ? (this.__nbCt || 'application/json') : null;
  };

  // 统一合成响应：text 为响应体字符串；opts 可携带 contentType / status / b64（二进制 base64）
  function respondXHR(self, text, opts) {
    opts = opts || {};
    var ct = opts.contentType || 'application/json';
    var rt = self.responseType;
    self.__nbCt = ct;
    if (opts.b64 && /^(arraybuffer|blob|)$/.test(rt)) {
      var bin = atob(text);
      var u8 = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
      var buf = u8.buffer;
      if (rt === 'blob') freeze(self, 'response', new Blob([buf], { type: ct }));
      else freeze(self, 'response', buf);
      freeze(self, 'responseText', '');
    } else if (rt === 'json') {
      try { freeze(self, 'response', JSON.parse(text)); } catch (e) { freeze(self, 'response', text); }
    } else if (rt === 'arraybuffer') {
      freeze(self, 'response', new TextEncoder().encode(text).buffer);
    } else if (rt === 'blob') {
      freeze(self, 'response', new Blob([text], { type: ct }));
    } else {
      freeze(self, 'responseText', text);
      freeze(self, 'response', text);
    }
    freeze(self, 'readyState', 4);
    freeze(self, 'status', opts.status || 200);
    freeze(self, 'statusText', 'OK');
    freeze(self, 'responseURL', self.__nbUrl);
    try { if (self.onreadystatechange) self.onreadystatechange(new Event('readystatechange')); } catch (e) { }
    try { self.dispatchEvent(new Event('readystatechange')); } catch (e) { }
    try { if (self.onload) self.onload(new Event('load')); } catch (e) { }
    try { self.dispatchEvent(new Event('load')); } catch (e) { }
    try { if (self.onloadend) self.onloadend(new Event('loadend')); } catch (e) { }
    try { self.dispatchEvent(new Event('loadend')); } catch (e) { }
  }

  XP.send = function (bodyArg) {
    if (!this.__nbMock) return rawSend.apply(this, arguments);
    var self = this;

    if (shouldMock(self.__nbUrl)) {
      setTimeout(function () { respondXHR(self, JSON.stringify(mockFor(self.__nbUrl)), { contentType: 'application/json' }); }, 0);
      return;
    }

    var meta = lookupFixture(self.__nbMethod, self.__nbUrl);
    if (meta) {
      var body = (typeof meta.body === 'object') ? JSON.stringify(meta.body) : String(meta.body == null ? '{}' : meta.body);
      setTimeout(function () { respondXHR(self, body, { contentType: meta.contentType || 'application/json', status: meta.status || 200, b64: !!meta.b64 }); }, 0);
      return;
    }
    recordMissing('xhr', self.__nbUrl);
    setTimeout(function () { respondXHR(self, JSON.stringify(ok({})), { contentType: 'application/json' }); }, 0);
  };

  /* ---------- 7. 假登录态：cookie + storage ---------- */
  try {
    document.cookie = 'nb_token=offline-token;path=/';
    document.cookie = 'uid=100001;path=/';
    localStorage.setItem('userInfo', JSON.stringify(FAKE_USER));
    localStorage.setItem('nb_token', 'offline-token');
    localStorage.setItem('token', 'offline-token');
    localStorage.setItem('isLogin', '1');
  } catch (e) { }

  /* ---------- 8. 杂项全局桩 ---------- */
  window.sendToAppMessage = window.sendToAppMessage || function () { };
  window._howxm = window._howxm || function () { };
  window.g_initialProps = window.g_initialProps || {};
  window.sa = window.sa || { init: noop, track: noop, login: noop, quick: noop, registerPage: noop, setProfile: noop };
  window.sensors = window.sensors || window.sa;

  /* ---------- 9. 屏蔽 Service Worker（静态壳自己就是本地） ---------- */
  if (navigator.serviceWorker && navigator.serviceWorker.register) {
    navigator.serviceWorker.register = function () { return Promise.resolve({ scope: '/', unregister: function () { return Promise.resolve(true); } }); };
  }

  /* ---------- 10. 静默 WebSocket ---------- */
  window.WebSocket = function (url) {
    log('websocket blocked →', url);
    var o = { readyState: 3, close: noop, send: noop, addEventListener: noop, removeEventListener: noop };
    return o;
  };
  window.WebSocket.CONNECTING = 0; window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2; window.WebSocket.CLOSED = 3;

  /* ---------- 11. 音频解码守卫 ----------
   * soundjs 0.6.1 的 WebAudioLoader 会把 xhr 响应再用 new Blob([...]) 包一层，
   * 然后直接把 Blob 传给 decodeAudioData —— 而该 API 只接受 ArrayBuffer，
   * 于是抛 “parameter 1 is not of type 'ArrayBuffer'”（同步 TypeError，未被 soundjs 的
   * error 回调捕获 → 表现为 Uncaught）。这里在边界处把 Blob 转回 ArrayBuffer，
   * 解码失败（离线时音频不存在/是占位数据）则回退为静音 buffer，保证实验室不崩。
   */
  (function patchDecodeAudioData() {
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return;
    var Base = window.BaseAudioContext || Ctor;
    var proto = Base.prototype;
    var orig = proto.decodeAudioData;
    if (!orig || orig.__nbPatched) return;

    function silentBuffer(ctx) {
      try {
        var rate = ctx.sampleRate || 44100;
        return ctx.createBuffer(1, 1, rate);
      } catch (e) { return null; }
    }

    proto.decodeAudioData = function (buffer, success, error) {
      var self = this;

      function fail() {
        var sb = silentBuffer(self);
        if (success) { if (sb) success(sb); return undefined; }
        return Promise.resolve(sb || self.createBuffer(1, 1, self.sampleRate || 44100));
      }

      // Blob / 带 arrayBuffer() 的对象 → 先转 ArrayBuffer
      if (buffer && typeof buffer.arrayBuffer === 'function') {
        return buffer.arrayBuffer().then(
          function (ab) {
            try { return orig.call(self, ab, success, error); }
            catch (e) { return fail(); }
          },
          function () { return fail(); }
        );
      }
      if (buffer instanceof ArrayBuffer) {
        try { return orig.call(self, buffer, success, error); }
        catch (e) { return fail(); }
      }
      // 其它类型（字符串 / 占位数据等）→ 静音，不抛
      return fail();
    };
    proto.decodeAudioData.__nbPatched = true;
    log('decodeAudioData 守卫已装');
  })();

  /* ---------- 12. 强制 VIP 解锁（数据层，确定性兜底） ----------
   * 即便 umi.5eade003.js 的 Vt 补丁未生效，这里也直接把 VIP 写进 Redux：
   *   - loginModel.userInfo.vip_info：补齐初/高中 vip=1（器材解锁、VIP 角标）
   *   - appModel.isVip = true：直接满足“实验触发立即开通”等所有 VIP 闸门
   *   - localStorage.un_lock_vip=1：触发 bundle 内置的 isVip 强制覆盖
   * 登录态有时会被后续 getUserInfo 覆盖，因此轮询一段时间反复确保。 */
  function __nbEnsureVip() {
    try {
      var dva = window.getDvaApp && window.getDvaApp();
      if (!dva || !dva._store) return false;
      var store = dva._store, st = store.getState(), changed = false;
      var ui = (st.loginModel && st.loginModel.userInfo) || {};
      if (ui && (ui.user_id || ui.uid || ui.username || ui.auth_token)) {
        var vi = ui.vip_info;
        var need = !vi || !vi.CZHXNDZHTa75 || vi.CZHXNDZHTa75.vip !== 1 ||
                   !vi.GZHXXV8IClkO || vi.GZHXXV8IClkO.vip !== 1;
        if (need) {
          var nv = Object.assign({}, vi);
          nv.CZHXNDZHTa75 = { vip: 1, is_vip: 1, type: 1, vip_expire: 4102444800, expire: 4102444800 };
          nv.GZHXXV8IClkO  = { vip: 1, is_vip: 1, type: 1, vip_expire: 4102444800, expire: 4102444800 };
          store.dispatch({ type: 'loginModel/updateState', payload: { userInfo: Object.assign({}, ui, { vip_info: nv }) } });
          changed = true;
        }
      }
      if ((st.appModel || {}).isVip !== true) {
        store.dispatch({ type: 'appModel/updateState', payload: { isVip: true } });
        changed = true;
      }
      try { if (localStorage.getItem('un_lock_vip') !== '1') localStorage.setItem('un_lock_vip', '1'); } catch (e) {}
      return changed;
    } catch (e) { return false; }
  }

  (function __nbKeepVip() {
    if (__nbEnsureVip()) log('VIP 强制注入/保持 (isVip=true)');
    if (__nbKeepVip._n === undefined) __nbKeepVip._n = 0;
    __nbKeepVip._n++;
    if (__nbKeepVip._n < 120) setTimeout(__nbKeepVip, 500); // ~60s 反复确保
  })();

  /* ---------- 13. 控制台自检（即便 nb-vip-local.js 未加载也可用） ---------- */
  function __nbVipState() {
    try {
      var dva = window.getDvaApp && window.getDvaApp();
      if (!dva || !dva._store) return null;
      return dva._store.getState();
    } catch (e) { return null; }
  }
  window.__nbVip = {
    check: function (gradeId) {
      var st = __nbVipState(); if (!st) return false;
      var pid = gradeId === 2 ? 'CZHXNDZHTa75' : 'GZHXXV8IClkO';
      var info = st.loginModel && st.loginModel.userInfo && st.loginModel.userInfo.vip_info;
      var v = info && info[pid];
      return !!(v && v.vip === 1);
    },
    status: function () {
      var st = __nbVipState();
      if (!st) { console.log('%c[nb-vip]', 'color:#07a', 'store 未就绪'); return null; }
      var j = this.check(2), s = this.check(3);
      var appVip = !!(st.appModel && st.appModel.isVip);
      console.log('%c[nb-vip]', 'color:#07a', '初中VIP:', j, ' 高中VIP:', s, ' appModel.isVip:', appVip);
      return { junior: j, senior: s, appIsVip: appVip };
    }
  };

  log('offline shim ready (noserver). 被拦请求: window.__nbShimHits / 缺失接口: window.__nb_missing');
})();
