/* ===========================================================
 * NB 化学实验室 — 离线 VIP 自检（数据层，最小版）
 * -----------------------------------------------------------
 * 真正的 VIP 注入发生在 umi.5eade003.js 的解密函数 Vt 补丁里：
 *   离线时真实 AES 解密必然失败（密钥 MD5(getUniqueID()) 不可离线复现），
 *   补丁让 Vt 在解密失败时回退返回离线 VIP JSON（含 vip_info + 顶层
 *   vip/app_resource_vip/channel_vip），使 loginModel.userInfo.vip_info
 *   命中，器材解锁、无扫码框。
 *
 * 本脚本不碰网络、也不 hook JSON.parse，只提供控制台自检：
 *   __nbVip.check(2) / __nbVip.check(3)  —— 看初/高中化学是否 VIP（true/false）
 *   __nbVip.status()                     —— 打印 Redux 实况
 * =========================================================== */
(function () {
  'use strict';

  function getState() {
    try {
      var app = window.getDvaApp && window.getDvaApp();
      return app && app._store ? app._store.getState() : null;
    } catch (e) { return null; }
  }

  function vipOf(gradeId) {
    var st = getState();
    if (!st) return { ready: false, reason: 'dva store 未就绪（页面还在加载？）' };
    var pid = gradeId === 2 ? 'CZHXNDZHTa75' : 'GZHXXV8IClkO';
    var info = st.loginModel && st.loginModel.userInfo && st.loginModel.userInfo.vip_info;
    var v = info && info[pid];
    return {
      ready: true,
      pid: pid,
      vip: !!(v && v.vip === 1),
      isVip: !!(st.appModel && st.appModel.isVip),
      hasUserInfo: !!info
    };
  }

  window.__nbVip = {
    check: function (gradeId) { return vipOf(gradeId || 3).vip; },
    status: function () {
      var r2 = vipOf(2), r3 = vipOf(3);
      console.log('%c[nb-vip]', 'color:#07a', '初中化学', r2, ' 高中化学', r3);
      return { junior: r2, senior: r3 };
    }
  };

  console.log('%c[nb-vip-local]', 'color:#07a', '已装载：VIP 自检就绪（实际注入在 umi.5eade003.js 的 Vt 补丁）');
})();
