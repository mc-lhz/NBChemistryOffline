# NB 化学实验室离线包 —— VIP 实现与解锁脚本分析报告

> 分析对象：
> - **原站源码**：`BAK\nobook_chem_offline\umi.5eade003.js.bak`（ pristine，未打任何补丁，5,779,409 字节）
> - **解锁脚本**：`nobook_chem_offline\nb-offline-shim.js` + `nobook_chem_offline\nb-vip-local.js`
> - **加载入口**：`nobook_chem_offline\index.html`
>
> 本报告分两部分：第一部分只谈**原站源码里的 VIP 系统**（不碰任何 shim）；第二部分只谈**解锁脚本怎么把 VIP 伪造出来**。

---

# 第一部分：原网站（umi 打包源码）如何实现 VIP

## 1.1 设计模型：两条正交的维度

NB 化学的"能不能用某个实验 / 器材"由**两条互不依赖的维度**决定：

| 维度 | 来源 | 含义 |
|------|------|------|
| **用户权益**（entitlement） | `loginModel.userInfo.vip_info[gradePid].vip` | 当前账号在"某学科段"有没有 VIP |
| **资源要求**（requirement） | 每个资源/器材自身携带的 `vip` / `isLock` / `isFree` 字段 | 这个资源本身要不要 VIP 才能进 |

最终判定被统一成一条公式（后文三道闸门都用它）：

```
allow = 资源免费 || isVip || isActive
```

- `资源免费`：资源自带 `isFree` / `vip===0` 之类标记。
- `isVip`：来自 `appModel.isVip`（由 `updateVipStatus` 从 `vip_info` 算出）。
- `isActive`：来自 `activationModel.isActive`（激活码激活后的本地状态）。

## 1.2 密钥协商与加密下发（挑战-响应协议）

VIP 数据不是明文下发的，走了一个**客户端主导的挑战-响应**流程：

1. **客户端出种子** `X = getUniqueID()`，本质是 `new Date().getTime()` 再加一点防碰撞随机（见 1.4）。
2. **客户端用内嵌的 RSA-2048 公钥**把 `X` 加密，当作 `sign-v1` 查询参数发给服务端。
3. **服务端**用 `MD5(X)` 的 UTF-8 32 字节串作为 AES-256-CBC 的密钥、以前 16 字节作 IV，把 VIP 数据加密成 `encrypt_data` 返回。
4. **客户端**用同一个 `X` 走 `Vt`/`pw` 解密出 VIP JSON。

> **关键安全弱点**：服务端只加密、不下发任何签名。所以这条信道**只有保密性、没有真实性**——客户端无法验证 `encrypt_data` 是不是服务端真发的，只能保证"只有知道 X 的人能读"。这恰恰是解锁脚本能"不破解加密就注入"的根本原因（见第二部分）。

## 1.3 两个核心解密函数（源码摘录）

**① `Vt` / `pw` —— AES-256-CBC 解密**（`.bak` @3456195）

```js
Vt=(ct,Re)=>{
  var Ve=$e.enc.Base64.parse(ct),
      ut=$e.lib.WordArray.create(Ve.words.slice(0,4)),   // 前 16 字节 = IV
      dt=$e.lib.WordArray.create(Ve.words.slice(4)),     // 余下 = 密文
      Dt=$e.AES.decrypt(
        {ciphertext:dt},
        $e.enc.Utf8.parse($e.MD5(Re).toString()),        // key = MD5(seed)
        {iv:ut, mode:$e.mode.CBC, padding:$e.pad.Pkcs7}
      );
  return Dt.toString($e.enc.Utf8)
}
```

**② `Xt` / `JM` —— 资源列表 VIP 装饰器**（`.bak` @3456488）

```js
Xt=(ct,Re)=>{
  for(var Ve=0;Ve<ct.length;Ve++){
    var ut=ct[Ve], dt=ut.encrypt_data||null;
    if(ut.vip=1, ut.channel_vip=2, dt){
      var Dt=Vt(dt,Re), Zt=1, Ht=1, qt=2;
      try{ var pr=JSON.parse(Dt); Zt=pr.vip; Ht=pr.app_resource_vip; qt=pr.channel_vip }
      catch(Yt){ Zt=1 }                       // ← 解密失败：fail-closed 保持 vip=1
      ut.vip=Zt; ut.app_resource_vip=Ht; ut.channel_vip=qt;
    } else ut.app_resource_vip=1, ut.vip=1, ut.channel_vip=2;
  }
  return ct
}
```

注意 `app_resource_vip` / `channel_vip` 被写进对象却**从不被读取**——是死字段。

## 1.4 登录态与 VIP 状态同步

**`getUniqueID`（种子来源）**（`.bak` @3393370）

```js
static getUniqueID(){ return "".concat(o.getUnique()) }
static getUnique(){
  o._aUniqueIDs==null && (o._aUniqueIDs=new Array);
  for(var c=new Date, h=c.getTime(); !o.isUnique(h);)
    h+=o.random(c.getTime(), 2*c.getTime());   // 防碰撞：时间戳 + 随机
  return o._aUniqueIDs.push(h), h
}
```

→ **密钥种子完全由客户端控制**，离线侧算不出真值只是因为 `X` 只以 RSA 密文形式出现在 `sign-v1` 里。

**`LP()` / `login/check`（解密 → vip_info）**（`.bak` @3388883）

```js
,B.ZP)(p.Z.checkLogin,{headers:{Authorization:Q},method:"get",
        params:{pid:J,"sign-v1":ne}})
 .then(le=>{
    var te, ce=le, ue=ce.encrypt_data;
    if(ue){
      var de=(0,Z.pw)(ue,X);                 // ← 注意：pw() 在 try 之外！
      try{ var pe=JSON.parse(de); le.vip_info=pe.vip_info }
      catch(ve){ le=null }
    } else le=null;                          // 没有 encrypt_data 直接判未登录
    L(le),
    (te=le)!==null&&te!==void 0&&te.auth_token&&(w="Bearer ".concat(le.auth_token), v.Z.authToken=w),
    C(le)
 }, ()=>{ L(null) })
```

> **脆弱点 ①**：`var de=(0,Z.pw)(ue,X)` 在 `try` 块**外面**。若 `pw()` 因非法 Pkcs7 填充抛异常，异常会逃出 `.then`，`L(le)` 永不执行，外层 Promise **永远不 resolve**——登录静默卡死。（解锁脚本正是利用这一点反过来让 `pw()` 恒定返回空串，见 2.4。）

**`updateVipStatus`（权益 → isVip）**（`.bak` @1633076）

```js
return pt=h.Z.getGradePid(Xe),
       Lt=st.vip_info[pt],
       zt=(Lt==null?void 0:Lt.vip)===1,
       !h.Z.isLoadZH && localStorage.getItem("un_lock_vip") && (zt=!0),  // 后门
       Gt.next=18,
       Ct({type:"updateState", payload:{isVip:zt, gradePid:pt}});
```

> **脆弱点 ②**：若 `userInfo.vip_info` 整体缺失，上面那句 `st.vip_info[pt]` 之前的早退分支会 `break`，`isVip` 保持旧值——既没解锁也没报错，属于 fail-ambiguous。

## 1.5 三道闸门（统一公式，细节差异）

三处入口都用 `allow = 资源免费 || isVip || isActive`，但字段来源略有不同：

**① `canEnterResource`（进实验）**（`.bak` @1630792 及后续）

- 资源带 `gradePhase` 时，会**直接重算** `Ar`（来自 `vip_info[gradePhase]`），从而**覆盖** `appModel.isVip` 的值——这是它和另两道的本质区别。
- 最终 `!Ar && !Pr && (parseInt(It.vip)===1 || Gt)` 不成立时弹 `noVipDialog`（"实验触发立即开通"）。

**② 器材挂载**（`.bak` @1631142 附近）

```js
ie = isSDK && !showEquipmentLock
     ? true
     : ( dat.isLock===false || dat.isFreeEq || appModel.isVip || activationModel.isActive );
```
（源码里还存在 `!h.Z.isLoadZH && localStorage.getItem("un_lock_vip") && (console.log("~~~~~~~~后门"), ie=!0)` 的后门打印，但中文界面下永不触发。）

**③ 个人实验列表**：结构与 ② 一致，不满足时弹 "个人实验触发立即开通"。

## 1.6 三条官方解锁路径（原站自带）

| 路径 | 实现 | 是否真·离线 | 备注 |
|------|------|------------|------|
| ① VIP 账号 | 服务端通过 `encrypt_data` 下发 `vip_info` | **否**（需联网拿加密数据） | 正常付费渠道 |
| ② 激活码 | `offLineValid()` 纯本地校验（`.bak` @3359973） | **是** | 唯一真正离线的官方路径 |
| ③ `un_lock_vip` 本地开关 | `localStorage` 标记 + `!isLoadZH` 门控 | 是（但病死） | 中文界面 `isLoadZH=/^zh/.test(lan)` 恒真 → 后门死 |

**激活码校验 `offLineValid`**（`.bak` @3359973，节选）

```js
offLineValid(I,k,N,R,W){
  var j=R?w:f, G=this.get(), K=p.Z.subjectName,
      q=k=k.replace(/\s|\-/g,""),
      ie=this.getMd5ASCII(0,4,I);              // 用 uuid 前 4 位做设备绑定
  if(k.startsWith(ie)) k=k.slice(ie.length);
  else return console.error("当前生成的序列号与设备不一致"), j;
  var z=k.slice(0,4);
  if(z==="0000") return R?M:A;                 // 天数段
  k=k.slice(4); ...
  // 后续比对学科、校验和、过期时间
}
```

→ 激活码把 **`MD5(uuid)` 前 4 位**绑进序列号，再校验天数/学科/校验和。这是原站留给离线的唯一后门。

## 1.7 原站源码小结

- VIP 是**客户端主导密钥**的挑战-响应：种子 `X=Date.now()`，RSA 护 seed，AES 护数据，**无签名**。
- 三道闸门统一公式 `资源免费 || isVip || isActive`；`canEnterResource` 在有 `gradePhase` 时会用 `vip_info` 重算覆盖 `appModel.isVip`。
- 三条解锁路径里只有**激活码**能真正离线跑；`un_lock_vip` 在中文界面下被 `isLoadZH` 杀死。
- 两处原生脆弱点：`LP()` 里 `pw()` 在 try 外（解密异常→登录挂死）、`updateVipStatus` 缺 `vip_info` 静默中断。

---

# 第二部分：解锁脚本如何实现

## 2.1 设计取舍：为什么不用旧的 `v4.2` 油猴脚本

`index.html` 里 `vip/v4.2.js`、`restore-shim.js` 全部被注释掉。原因写在 `nb-vip-local.js` 头部：

- `v4.2` 是 **Tampermonkey 中间人脚本**：依赖 `@match` 在线域名 + `@require` CDN 的 crypto-js，离线包里两者都不成立。
- 它的核心手法是**覆写 `XMLHttpRequest.prototype.send`** 把请求转发到真实 NoBook 服务器再改响应——离线没有源站，请求必然挂起；而且它的 `send` 覆写会**盖掉 `nb-offline-shim.js` 的同名覆写**，导致点击试剂屏 / 容器时拿不到数据、面板打不开。

→ 新方案 `nb-vip-local.js` 改用**「数据层注入」**：**一行 XHR/fetch 都不碰**，因此与 shim 零冲突。

## 2.2 加载顺序（`index.html`）

```html
<script src="assets/nb-config.js?..."></script>
<script src="nb-offline-shim.js"></script>            <!-- ① 离线垫片 -->
<!-- VIP 解锁：本地实现，替代 vip/v4.2.js。必须排在 shim 之后、umi.js 之前 -->
<script src="nb-vip-local.js"></script>              <!-- ② 数据层注入 -->
...
<script src="/umi.5eade003.js"></script>             <!-- ③ 原站主包 -->
```

职责切分：**shim 负责让 `login/check` 返回"长得像已登录"的响应；nb-vip-local 负责在解密链末端把 `vip_info` 真正填进去。** 二者缺一不可（见 2.6）。

## 2.3 `nb-offline-shim.js`：离线运行垫片

主要段落：

- **§1 域名重定向**：把所有 `cfg.api` 里的 `https://...` 压平成 `location.origin + /__nbapi/<key>`，并 `snapshot()` 保存真实 URL 到 `window.__nb_realapi`，供 RECORD/REPLAY 代理回放真实资源（实验数据、模型等仍走本地 server 代理，不打假）。
- **§1.5 `auth_key` 注入**（根因修复）：原站 `sdkModel.parseAuthKeyFromURL` 在 `query.auth_key` 缺失时 early-return，导致整个交互系统（PointerManager 等）不初始化 → 点击无反应。脚本三管齐下：
  - A) URL 注入 `?auth_key=21-offline...`
  - B) `Object.defineProperty(location,'search',...)` hook
  - C) 延迟 2s 直接 `dispatch` Redux：`sdkModel/updateState {canDIY:true, canRes:true, gradeId:3}` + `appModel/switchGrade 3`（高中化学）
- **§2 `FAKE_USER`**：一个永不过期的本地 VIP 用户（`is_vip:1, vip:1, vip_level:9, vip_end_time:4102444800` 即 2100-01-01）。
- **§3.2 `login/check` 假响应**（最关键）：必须返回**扁平对象**（umi-request 不解包 `{code,data}` 信封），且**带 `auth_token` + `encrypt_data`**。否则：
  - 没 `auth_token` → `initUserToken` 判未登录 → 弹微信扫码框 → 二维码 canvas 未挂载 → `getContext` 报错；
  - 没 `encrypt_data` → 走 `else le=null` 直接判未登录。
- **§4 fetch 拦截 / §5 XHR 原型补丁 / §5.5** 保存 shim 自身版本（`__nbShimXHR*` / `__nbShimFetch`）供还原。
- **§6** cookie + `localStorage` 假登录态。
- **§10 `decodeAudioData` 守卫**：soundjs 会把 XHR 响应再 `new Blob([...])` 包一层传给 `decodeAudioData`（只接受 ArrayBuffer）→ 抛 "parameter 1 is not of type 'ArrayBuffer'"。守卫把 Blob 转回 ArrayBuffer，解码失败则回退静音 buffer，保证实验不崩。

## 2.4 关键 trick：用「空密文」让 AES 恒定返回空串、绝不抛异常

`login/check` 的 `encrypt_data` 不是真密文，而是一个**只有 IV、密文长度为 0** 的 blob：

```js
// nb-offline-shim.js
var EMPTY_CIPHER = 'AAAAAAAAAAAAAAAAAAAAAA==';   // 16 字节全 0：仅 IV，密文长度 = 0
function loginCheckPayload(){
  var out = {}; for (var k in FAKE_USER) out[k]=FAKE_USER[k];
  out.encrypt_data = EMPTY_CIPHER;
  window.__nbLoginCheckAt = Date.now();          // 给 nb-vip-local 的发信号（单槽）
  return out;
}
```

为什么稳：

- `pw()` 先 `slice(0,4)` 当 IV、`slice(4)` 当密文。这里密文长度 = 0。
- Pkcs7 unpad 读到 `undefined` 按 0 处理 → `Utf8.stringify` 空串 → **全程不抛，稳定返回 `""`**。
- 对比：若给"IV + 1 个随机密文块"，则有 **6.4%** 概率抛 `Malformed UTF-8`（实测 3000 次随机密钥 0 次异常 vs 6.4%）。

→ 于是 `LP()` 里 `pw(ue,X)` 安全返回 `""`，紧接着的 `JSON.parse("")` 会抛异常……而这正被 `nb-vip-local.js` 接住。

**为什么必须是「零长度密文」（关键边界）**：在原站 `LP()` 里 `var de=(0,Z.pw)(ue,X)` 位于 `try` 块**之外**（见 1.4 @3388883）。一旦 `pw()` 抛异常，异常会逃出 `.then` 回调，`L(le)` 永不调用 → 登录 Promise 永远不 resolve。因此 `pw()` **绝对不能抛**——这正是选用「16 字节全 0 = 仅 IV、密文长度 0」而**不是**「IV + 随机密文块」的原因：后者有 **6.4%** 概率因非法 Pkcs7 填充而抛 `Malformed UTF-8`；前者 Pkcs7 unpad 读到 `undefined` 当 0、Utf8 空串，**稳定返回 `""` 不抛**，从而把异常推迟到 `JSON.parse("")` 那一行（在 `try` 内），再由 nb-vip-local 的钩子接住。这条 `try` 边界是整个解锁脚本能成立的**前置条件**。

## 2.5 `nb-vip-local.js`：数据层 VIP 注入

**学科 pid 常量**（直接抄自原站 `Config`，与 1.6 的 grade PIDs 一致）

```js
var PIDS = {
  czhx:'CZHXNDZHTa75', gzhx:'GZHXXV8IClkO',   // 初中 / 高中化学 ← 本包主用
  czwl:'CZWlTE4lVgz9', gzwl:'GZWLcJQXfD9W',
  czsw:'JuFhE84jRhEh', gzsw:'EjEViMk33jNr',
  wzhx:'IfKiInEcZu9c', wzwl:'NiFEjb83nJL4', xkpid:'iwjngieNGEAiEI2'
};
var FAR_FUTURE_MS = 4102444800000;             // 2100-01-01
```

**`applyVip(user)`**：给"像用户"的对象补齐 `vip_info`（每个 pid 都 `vip:1`，到期 2100-01-01），并补 `vip / is_vip / isVip / channel_vip / app_resource_vip / vip_endtime` 等次要字段。

**§3 给 shim 假用户就地注入**：`patchShimUser()` 直接 `applyVip(window.__nb_offline_user)`（与 `mockFor` 闭包是同一引用），影响所有后续假响应；shim 若还没跑则轮询补救。

**§4 主注入点（决定性的一步）—— `JSON.parse` hook 接住解密链末端**：

```js
JSON.parse = function(text, reviver){
  // checkLogin 解密链：pw() 返回的空串在这里被换成 VIP 数据
  if (text === '' && consumeLoginCheck()){
    loginCheckHits++;
    return { vip_info: buildVipInfo() };        // ← 等价于"服务端下发了一份 VIP 全开加密数据"
  }
  var out = rawParse.call(JSON, text, reviver); // 解析失败照常抛出，不改变原语义
  if (typeof text==='string' &&
      (text.indexOf('vip')>=0 || text.indexOf('user_id')>=0 || text.indexOf('activeArr')>=0)){
    try{ enrich(out,0); }catch(e){}             // §4.5 兜底：递归补齐零散用户/激活态
  }
  return out;
};
```

配对信号设计很讲究：

- `shim.loginCheckPayload()` 在发出假 `login/check` 时写 `window.__nbLoginCheckAt = Date.now()`（**单槽**，不累加）。
- `nb-vip-local.consumeLoginCheck()` 校验时间戳且在 **3 秒窗口**内才生效、用完即清。
- 不用计数器，是为了避免"某次 check 响应没被消费（请求取消/重试）导致计数一直挂着，几秒后误伤别处正常的 `JSON.parse("")`"。从 `pw()` 返回到 `JSON.parse("")` 是同一条微任务链，实际间隔毫秒级。

**§4.5 兜底 `enrich()`**：递归遍历 `user / userInfo / info / data / result / payload` 等键，对"像用户"的节点 `applyVip`，并把 `activeArr`（激活态）补成 `[true,true]`——覆盖不走 shim 的数据（如 fixtures 回放、localStorage 历史登录态）。大数组（>500）不遍历以免拖慢。

**§5 本地标记**：`localStorage.setItem('un_lock_vip','1')`——虽然中文界面下 `isLoadZH` 让它死掉（见 1.6），但切到非中文时能兜底，且无副作用。

**§6 自检**：`window.__nbVip.status()` 在控制台打印 checkLogin 接管次数、`JSON.parse` 补齐次数、以及直接读 Redux `loginModel.userInfo / appModel.isVip` 的实况，用来确认注入真的生效。

## 2.6 为什么这套能生效（原理串讲）

把两个脚本串起来看，正好是**精确卡在原站解密链的两个断点上**：

1. 原站判定公式：`isVip = loginModel.userInfo.vip_info[gradePid].vip === 1`。
2. `userInfo` 的**唯一来源**：`initUserToken → LP() → GET passport/v5/login/check → setUserInfo(res)`。
3. 而 `vip_info` **不取自响应明文**，取自 `encrypt_data` 解密后的 JSON（`LP()` 里 `le.vip_info = JSON.parse(pw(ue,X)).vip_info`）。

所以只要做两件事，app 就会以为自己拿到了服务端下发的 VIP 全开数据：

- **shim** 让 `login/check` 返回**扁平**对象 + `auth_token` + 空 `encrypt_data` → app 不判未登录，且走到 `pw(ue,X)` → 得到 `""`。
- **nb-vip-local** 在 `JSON.parse("")` 那一行塞入 `{vip_info: 全 pid vip=1}` → `le.vip_info` 被正确赋值、`le` 保持非 null → `setUserInfo` 把这份 VIP 全开对象写进 Redux。

> 只改 shim 的假用户**没用**——那个对象根本不会进 `loginModel.userInfo`；必须 §3 + §4 协作。这也是为什么单看任一个脚本都"看不出在解锁"，必须一起看。

## 2.7 一句话对比

| | 原站 VIP 系统 | 解锁脚本 |
|---|---|---|
| 密钥 | 客户端出种子 `X=Date.now()`，RSA 护 seed，AES 护数据，**无签名** | 不碰密钥 |
| 注入位置 | 服务端下发 `encrypt_data` | 在 `pw()` 之后的 `JSON.parse("")` 行注入 `vip_info` |
| 手段 | 加密信道 | 空密文（让 AES 恒返回空串不抛）+ `JSON.parse` hook 数据层注入 |
| 冲突面 | 原生逻辑 | 零 XHR/fetch 覆写，与 shim 不冲突 |

**本质**：解锁脚本**没有破解任何加密**，而是利用原站"解密失败/空串也算合法、且 vip_info 只看解密结果"的链路特性，在离线路径上**喂给解密链末端一个空密文让 `pw()` 返回空，再用 `JSON.parse` hook 在 app 取 `vip_info` 的那一行塞入 VIP 全开数据**。

---

## 附：关键偏移索引（pristine `.bak`）

| 符号 | 偏移 |
|------|------|
| `Vt`/`pw` AES 解密 | @3456195 |
| `Xt`/`JM` 资源装饰器 | @3456488 |
| `getUniqueID` | @3393370 |
| `LP()` login/check | @3388883 |
| `updateVipStatus` | @1633076 |
| `canEnterResource` 闸门 | @1630792 |
| 器材挂载闸门（`isActive`/`isVip`） | @1631142 |
| `offLineValid` 激活码 | @3359973 |
| `isLoadZH = /^zh/.test(lan)` | @1159742 |
| grade PIDs (`czhx` 等) | @1160191 |
