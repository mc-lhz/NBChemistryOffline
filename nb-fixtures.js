/* ===========================================================
 * NB 化学离线版 — 内嵌接口数据 (fixtures)  [noserver 版]
 * -----------------------------------------------------------
 * 取代 server.py 的 /__nbpx RECORD/REPLAY：所有“内容类”接口
 * （试剂库 / 容器 / 实验数据 …）的回放数据直接内嵌在浏览器，
 * 因此页面无需任何后端即可运行。
 *
 * 格式：window.__nb_fixtures = {
 *   "<METHOD 大写> <归一化 URL>": { status, contentType, body, b64? },
 *   ...
 * }
 *   - 键 = method(大写) + 空格 + 归一化 URL（已剔除 _/t/sign/token 等易变参数）
 *   - body 为字符串；二进制资源请设 b64:true 并填入 base64 编码串
 *   - 也可用 window.__nb_addFixture(method, url, meta) 在运行时追加
 *
 * 当前为空：未录制数据时，内容类接口返回空 ok({})，页面照常运行
 * （试剂/容器列表为空）。运行时可用 window.__nb_missing 查看缺失的接口。
 *
 * 如何填充真实数据（录制一次即可永久离线）：
 *   1) 切到带 server.py 的 Offline 分支，运行  python server.py --record
 *      打开实验室随便点几下，server.py 会把响应落盘到 fixtures/*.json
 *   2) 把这些 JSON 编译进本文件：键用 fxStrictKey(method,url)，
 *      值为 {status, contentType, body(字符串), b64?}
 *   3) 保存、提交，noserver 分支即获得完整离线数据
 * =========================================================== */
window.__nb_fixtures = window.__nb_fixtures || {};

window.__nb_addFixture = function (method, url, meta) {
  var k = (method || 'GET').toUpperCase() + ' ' + (url || '');
  window.__nb_fixtures[k] = meta;
  return k;
};
