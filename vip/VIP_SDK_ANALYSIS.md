# VIP SDK 分析（nobook_chem_offline/vip）

> 分析对象：`vip/` 目录下的 3 个 Tampermonkey 用户脚本
> 分析日期：2026-08-01
> 性质说明：这三个文件都是针对 NoBook（中小学虚拟实验平台）的**用户脚本（UserScript）**，
> 其脚本元数据（@description）明确写明了“显示隐藏器械 / 解锁实验室 / NoBook 物理化学实验室”等用途，
> 属于**绕过平台会员（VIP）访问限制**的脚本。以下为纯技术/代码结构分析，不含部署或使用指引。

---

## 1. 总览对比表

| 项目 | v1.3.js | v2.0.js | v4.2.js |
|------|---------|---------|---------|
| 体积 | 317.3 KB | 317.3 KB | 220.7 KB |
| @name | NB化学实验 | NB实验脚本 | NB实验 |
| @version | 1.3 | 2.0 | 4.2 |
| @description | 显示隐藏器械 | 解锁 NoBook 物理/化学实验室 | NoBook 物理、化学实验室 |
| 目标站点 | hx（化学） | hx（化学）+ wl（物理） | hx + wl + gzsw（高中生物）+ czsw（初中生物） |
| @grant | none | GM_getValue / GM_setValue / unsafeWindow | GM_xmlhttpRequest / GM_getValue / GM_setValue / unsafeWindow |
| 外部依赖 | 无 | 无 | crypto-js 4.1.1 (cdnjs) + 远程 `https://uutool.cn/js/` |
| @run-at | （默认） | document-start | document-start |
| 混淆方式 | 自研字符码混淆 | javascript-obfuscator（VM/状态机） | javascript-obfuscator（字符串数组 + 代理 + RC4） |
| 全局标记 | — | — | `window.__vip_v4_2 = { stubbed: true }` |

---

## 2. 逐版本拆解

### 2.1 v1.3.js —— 最小功能 + 自研混淆
- **用途**：仅做 UI 层“显示隐藏器械”，最基础。
- **授权**：`@grant none`，不调用任何 GM_* API，纯前端 DOM 操作。
- **混淆特征**：非标准混淆器。开头是一个自研哈希函数 `h(j)`，对参数做字符码累加；主体是一个巨型对象 `Y`，内部挂满数组（`m/E/c1/v1/A/...`）和大量形如 `l:function(j='length'){return !Y.m[0]&&Y.m.push(99)&&0||Y.m[j]}` 的“伪 getter”函数。这些函数名（`l/g/c/F/r/...`）其实是被替换过的属性访问器，运行时动态读写数组下标，用来隐藏真实逻辑。
- **结论**：功能最简单，混淆强度最低，纯揭示页面内已存在但被隐藏的元素。

### 2.2 v2.0.js —— 状态机/虚拟机混淆 + 持久化 + Cookie 操作
- **用途**：从“化学”扩展到“物理+化学”，描述改为“解锁”。
- **授权升级**：引入 `GM_getValue` / `GM_setValue`（本地持久化配置/状态）与 `unsafeWindow`（穿透沙箱访问页面真实 window）。
- **混淆特征**：典型 **javascript-obfuscator** 的“控制流扁平化 + 代理函数”风格。生成了一组带 `_J_P_` 后缀的辅助函数（如 `qprhCQ_Opaqu_J_P_`、`UUKCfV_Calcu_J_P_`、`wXoAEP_Calcu_J_P_`、`Pzvpwa_Calcu_J_P_`）。核心逻辑被包成一个 `U(...R)` 函数，内部用 `while(...)` + `switch(M+c+H+d)` 的**状态机/解释器**驱动，分支里大量 `document.cookie=...` 写入操作（构造/伪造会话或鉴权 Cookie）。
- **结论**：相比 v1.3，已具备“持久化状态 + 伪造会话 Cookie”的能力，不再只是显示隐藏元素，而是尝试绕过登录/鉴权链路。

### 2.3 v4.2.js —— 标准字符串数组混淆 + 加密 + 远程代码加载（且标注为离线空桩）
- **用途/覆盖范围**：进一步扩展到**生物**（gzsw 高中生物、czsw 初中生物），覆盖化学/物理/生物全学科。
- **授权再升级**：新增 `GM_xmlhttpRequest`（可发起跨域网络请求，绕过页面同源限制），并 `@require` 加载 `crypto-js 4.1.1`。
- **混淆特征**：标准 **javascript-obfuscator** 形态——字符串数组 `const _0x5c68=['\x70\x77...', ...]`（hex 编码）+ 代理解码函数；配合 crypto-js 基本可判定字符串数组经过 **RC4/Base64** 加密后在运行时解密，静态可读性极低。
- **关键外部点**：`var obfuscator = "https://uutool.cn/js/";` —— 这是一个**远程 JS 加载地址**，结合 `GM_xmlhttpRequest`，脚本运行时会向 `uutool.cn` 拉取并很可能 `eval` 远程代码。
- **“离线空桩”声明（重要）**：文件第 1–5 行写了一段注释，说明原版在离线环境下会因内部 `client.fetch` 为 undefined 而崩溃（`TypeError: Cannot read properties of undefined (reading 'fetch')`），因此标注 `window.__vip_v4_2 = { stubbed: true }`。
  - **但注意**：注释之后（第 6 行起）依然完整保留了原始 UserScript 头（@version 4.2）和**完整的混淆 payload（第 24 行起）**。也就是说这个“stub”标记是**失效/误导性的**——真正代码并未真正被桩掉，离线加载时仍会尝试执行并在 `fetch` 处崩溃。
  - 换句话说：该文件本质就是 v4.2 原版，只是前面加了一行 stub 标记和一段说明注释，并非真正可离线运行的桩实现。

---

## 3. 混淆技术小结

| 技术 | v1.3 | v2.0 | v4.2 |
|------|------|------|------|
| 自研字符码哈希 | ✅ | | |
| 伪 getter / 数组下标混淆 | ✅ | | |
| 控制流扁平化（switch 状态机） | | ✅ | |
| javascript-obfuscator 标准字符串数组 | | ✅(VM 变体) | ✅ |
| 字符串 RC4/Base64 加密 + crypto-js | | | ✅ |
| 远程代码加载（eval 远程 JS） | | | ✅ |

总体趋势：混淆强度与**能力半径**同步升级——从“前端显隐” → “伪造 Cookie 会话” → “带加密 + 跨域请求 + 远程代码”。

---

## 4. 关键发现 / 风险点

1. **能力逐代增强且目的明确**：元数据描述从“显示隐藏器械”逐步变为“解锁实验室”，授权从 `none` 升级到可写 Cookie、可发跨域请求，符合“会员限制绕过”脚本的典型演进路径。
2. **v4.2 含远程代码加载**：`obfuscator="https://uutool.cn/js/"` + `GM_xmlhttpRequest`，存在运行时拉取并执行第三方代码的行为——这是**供应链 / 远程代码执行**风险点，离线场景也会因依赖外部 fetch 而失效。
3. **v4.2 的“stub”标注是误导性的**：`window.__vip_v4_2 = { stubbed: true }` 与真实 payload 共存，离线崩溃问题并未真正解决，只是加了一行标记。
4. **体积一致性强**：v1.3 与 v2.0 同为 317.3 KB（几乎相等），v4.2 为 220.7 KB——v4.2 体积更小可能源于混淆器版本/字符串数组压缩差异。

---

## 5. 版本演进路线（归纳）

```
v1.3 化学单科 · 仅显示隐藏元素 · 自研混淆 · 无 GM 授权
  └─> v2.0 化学+物理 · 伪造会话 Cookie + 本地持久化 · javascript-obfuscator(VM)
        └─> v4.2 化学+物理+生物 · 跨域请求 + crypto 加密 + 远程代码加载 · 标注离线 stub(失效)
```

---

## 6. 备注
- 本分析仅描述代码结构与混淆手段，用于理解与审计。
- 这类脚本的用途是绕过商业平台的会员/鉴权限制，使用前请注意相关法律与平台服务条款风险。
- 如需进一步“去混淆”还原 v2.0 / v4.2 的真实逻辑，需要分别针对其 javascript-obfuscator 的代理/字符串数组做运行时解密（或本地用 Node 模拟 `CryptoJS` 解密 `_0x5c68`），可在此基础上继续。
