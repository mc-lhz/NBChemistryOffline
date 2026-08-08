# NB 化学实验室离线包


本报告只谈**原站源码里的 VIP 系统**（不碰任何 shim）

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
