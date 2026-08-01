const fs = require('fs');
const vm = require('vm');
const file = 'v4.2.js';
const s = fs.readFileSync(file, 'utf8');

// 1) array
const a0 = s.indexOf('_0x5c68=[');
const e0 = s.indexOf('];', a0);
const arr = eval(s.slice(a0 + '_0x5c68='.length, e0 + 1));

// 2) decoder
const ds = s.indexOf('function _0x96e9(_0x3bc175,_0x32b9f2){');
let d = 0, de = -1;
for (let k = ds; k < s.length; k++) { if (s[k] === '{') d++; else if (s[k] === '}') { d--; if (d === 0) { de = k + 1; break; } } }
let dec = s.slice(ds, de).replace(/,\s*new\s+_0x48fe7b\(_0x96e9\)\['[^']*'\]\(\)/g, '');

// 3) wrapper defs
const fnRe = /function\s+(_0x[0-9a-f]+)\s*\(([^)]*)\)\s*\{/g;
const fd = {};
let m;
while ((m = fnRe.exec(s))) {
  const ps = m.index + m[0].length;
  let dd = 1, j = ps;
  for (; j < s.length; j++) { if (s[j] === '{') dd++; else if (s[j] === '}') { dd--; if (dd === 0) break; } }
  fd[m[1]] = s.slice(m.index, j + 1);
}

// stripNested
function stripNested(body) {
  const ob = body.indexOf('{');
  if (ob < 0) return body;
  let out = body.slice(0, ob + 1), i = ob + 1;
  while (i < body.length) {
    const fn = body.indexOf('function ', i);
    if (fn < 0) { out += body.slice(i); break; }
    out += body.slice(i, fn);
    const ob2 = body.indexOf('{', fn);
    if (ob2 < 0) { out += body.slice(fn); break; }
    let d2 = 0, j2 = ob2;
    for (; j2 < body.length; j2++) { if (body[j2] === '{') d2++; else if (body[j2] === '}') { d2--; if (d2 === 0) break; } }
    i = j2 + 1;
  }
  return out;
}
function bcn(body) {
  const st = stripNested(body);
  const r = st.match(/return\s+(_0x[0-9a-f]+)\s*\(([^()]*)\)\s*;?\s*\}/);
  return r ? r[1] : null;
}
const reach = new Set(['_0x96e9']);
let ch = true;
while (ch) { ch = false; for (const [n, src] of Object.entries(fd)) { if (reach.has(n)) continue; const c = bcn(src); if (c && reach.has(c)) { reach.add(n); ch = true; } } }

const sd = [dec];
for (const n of reach) { if (n === '_0x96e9') continue; sd.push(fd[n]); }
const wrapNames = [...reach].filter(n => n !== '_0x96e9').map(n => n + ':' + n).join(',');
const code = sd.join('\n') + '\nglobalThis.__w={' + wrapNames + '};';
const ctx = { _0x5c68: arr, console };
vm.createContext(ctx);
vm.runInContext(code, ctx, { filename: 'sb.js' });
const w = ctx.__w;

// 4) send override slice
const si = s.indexOf("=function(_0x9d4d4d,_0x3e7de1){", 200900);
let sd2 = 0, se = -1;
for (let k = si; k < s.length; k++) { if (s[k] === '{') sd2++; else if (s[k] === '}') { sd2--; if (sd2 === 0) { se = k + 1; break; } } }
const slice = s.slice(si, se);

// 5) evaluate every _0xNNN(args) call in the slice
const re = /(_0x[0-9a-f]+)\(\s*((?:"[^"]*"|'[^']*'|-?0x[0-9a-fA-F]+|\d+)(?:\s*,\s*(?:"[^"]*"|'[^']*'|-?0x[0-9a-fA-F]+|\d+))*)\s*\)/g;
const seen = new Set();
let mm;
console.log('===== decoded wrapper calls in send override =====');
while ((mm = re.exec(slice))) {
  const call = mm[0];
  if (!w[mm[1]]) continue;
  let val;
  try { val = vm.runInContext(call, ctx, { filename: 'c.js' }); } catch (e) { continue; }
  if (typeof val !== 'string') continue;
  const printable = [...val].every(c => { const code = c.charCodeAt(0); return (code >= 32 && code <= 126) || code === 9; });
  if (!printable) continue;
  if (seen.has(call)) continue; seen.add(call);
  // find surrounding tokens for context
  const ci = slice.indexOf(call);
  const ctxStr = slice.slice(Math.max(0, ci - 40), ci + call.length + 20).replace(/\n/g, ' ');
  console.log(`• ${call}\n    => ${JSON.stringify(val)}\n    ctx: ${ctxStr}\n`);
}

// 6) literal hex-escape strings in the slice
const hexRe = /\\x([0-9a-fA-F]{2})/g;
const litRe = /'((\\x[0-9a-fA-F]{2})+)'/g;
let lm;
console.log('\n===== literal hex-escape string literals in slice =====');
while ((lm = litRe.exec(slice))) {
  const raw = lm[1];
  let str = '';
  const hm = raw.match(/\\x([0-9a-fA-F]{2})/g);
  for (const h of hm) str += String.fromCharCode(parseInt(h.slice(2), 16));
  console.log(`• ${lm[0]} => ${JSON.stringify(str)}`);
}

// 7) find _0x283165, _0x4a2d14, _0x438fa8 definitions
console.log('\n===== key identifier assignments =====');
for (const id of ['_0x283165', '_0x4a2d14', '_0x438fa8', '_0x30824d']) {
  const ri = s.indexOf('const ' + id + '=');
  const ri2 = s.indexOf('let ' + id + '=');
  const ri3 = s.indexOf('var ' + id + '=');
  const at = ri >= 0 ? ri : (ri2 >= 0 ? ri2 : ri3);
  if (at >= 0) console.log(`• ${id} = ${s.slice(at, at + 120).replace(/\n/g, ' ')}`);
  else console.log(`• ${id} = (not found as simple const/let/var)`);
}
