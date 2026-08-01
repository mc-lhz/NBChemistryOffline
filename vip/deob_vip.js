'use strict';
// deob_vip.js — static deobfuscator for the NoBook "VIP" Tampermonkey cracker scripts.
//
// It does NOT produce runnable bypass logic. It only statically recovers the
// readable strings hidden behind the obfuscator-io string-array + custom-RC4
// + 216-wrapper chain, and writes a partially-deobfuscated copy where every
// call that decodes to a printable string is replaced inline with that literal.
//
// Usage: node deob_vip.js <input.js> [minPrintLen]   -> writes <input>.deob.js
//
const fs = require('fs');
const vm = require('vm');

const file = process.argv[2] || 'v4.2.js';
const MIN_LEN = parseInt(process.argv[3] || '3', 10);
const s = fs.readFileSync(file, 'utf8');

// This tool only understands the obfuscator-io string-array + custom-RC4
// architecture (decoder _0x96e9, array _0x5c68). Other packers (unicode /
// identifier-substitution) are out of scope and would make the brace-matcher
// run off into string-literal regions. Bail early with a clear message.
if (s.indexOf('_0x96e9(') < 0 || s.indexOf('_0x5c68=[') < 0) {
  console.error('SKIP: ' + file + ' does not use the _0x96e9/_0x5c68 obfuscation.');
  console.error('       (It likely uses a different packer — e.g. unicode/identifier substitution.)');
  process.exit(0);
}

// --- 1) string array ---
const a0 = s.indexOf('_0x5c68=[');
const e0 = s.indexOf('];', a0);
const arr = eval(s.slice(a0 + '_0x5c68='.length, e0 + 1));

// --- 2) the verbatim decoder (anti-tamper self-check neutralized) ---
const ds = s.indexOf('function _0x96e9(_0x3bc175,_0x32b9f2){');
let depth = 0, dend = -1;
for (let k = ds; k < s.length; k++) { if (s[k] === '{') depth++; else if (s[k] === '}') { depth--; if (depth === 0) { dend = k + 1; break; } } }
let dec = s.slice(ds, dend).replace(/,\s*new\s+_0x48fe7b\(_0x96e9\)\['[^']*'\]\(\)/g, '');

// --- 3) all function defs + reachable wrapper closure ---
const fnRe = /function\s+(_0x[0-9a-f]+)\s*\(([^)]*)\)\s*\{/g;
const funcDefs = {};
let m;
while ((m = fnRe.exec(s))) {
  const ps = m.index + m[0].length; let d = 1, j = ps;
  for (; j < s.length; j++) { if (s[j] === '{') d++; else if (s[j] === '}') { d--; if (d === 0) break; } }
  funcDefs[m[1]] = s.slice(m.index, j + 1);
}
function stripNested(b){const o=b.indexOf('{');if(o<0)return b;let out=b.slice(0,o+1),i=o+1;while(i<b.length){const fn=b.indexOf('function ',i);if(fn<0){out+=b.slice(i);break;}out+=b.slice(i,fn);const ob=b.indexOf('{',fn);if(ob<0){out+=b.slice(fn);break;}let d=0,j=ob;for(;j<b.length;j++){if(b[j]==='{')d++;else if(b[j]==='}'){d--;if(d===0)break;}}i=j+1;}return out;}
function bodyCallName(b){const st=stripNested(b);const r=st.match(/return\s+(_0x[0-9a-f]+)\s*\(([^()]*)\)\s*;?\s*\}/);return r?{callee:r[1],args:r[2]}:null;}
const reachable = new Set(['_0x96e9']); let changed = true;
while (changed) { changed = false; for (const [name, src] of Object.entries(funcDefs)) { if (reachable.has(name)) continue; const bc = bodyCallName(src); if (bc && reachable.has(bc.callee)) { reachable.add(name); changed = true; } } }

// --- 4) build a vm sandbox with the verbatim decoder + all wrappers ---
const sandboxDefs = [dec];
for (const name of reachable) { if (name === '_0x96e9') continue; sandboxDefs.push(funcDefs[name]); }
const sandboxCode = `${sandboxDefs.join('\n')}\nglobalThis.__w={${[...reachable].filter(n => n !== '_0x96e9').map(n => n + ':' + n).join(',')}};`;
const ctx = { _0x5c68: arr, console };
vm.createContext(ctx);
vm.runInContext(sandboxCode, ctx, { filename: 'sb.js' });
const wrappers = ctx.__w;

// --- 5) evaluate every literal call site ---
const singleRe = /(_0x[0-9a-f]+)\(\s*((?:'[^']*'|-?0x[0-9a-fA-F]+|\d+)(?:\s*,\s*(?:'[^']*'|-?0x[0-9a-fA-F]+|\d+))*)\s*\)/g;
const spans = [];
while ((m = singleRe.exec(s))) {
  const name = m[1]; if (!wrappers[name]) continue;
  const argStr = m[2]; if (/\(/.test(argStr)) continue;
  let v;
  try { v = vm.runInContext(`${name}(${argStr})`, ctx, { filename: 'c.js' }); } catch (e) { continue; }
  if (typeof v !== 'string') continue;
  spans.push({ start: m.index, end: m.index + m[0].length, val: v });
}
console.error('total wrapper-call spans:', spans.length);

// --- 6) merge consecutive '+' joined spans into reconstructed strings ---
spans.sort((a, b) => a.start - b.start);
const runs = [];
let cur = null;
for (let i = 0; i < spans.length; i++) {
  const sp = spans[i];
  if (cur) {
    const mid = s.slice(cur.end, sp.start);
    if (/^\s*\+\s*$/.test(mid)) { cur.end = sp.end; cur.val += sp.val; cur.parts.push(sp.val); continue; }
    else { runs.push(cur); cur = null; }
  }
  cur = { start: sp.start, end: sp.end, val: sp.val, parts: [sp.val] };
}
if (cur) runs.push(cur);
const good = runs.filter(r => r.val.length >= 4 && /^[ -~]+$/.test(r.val));
good.sort((a, b) => b.val.length - a.val.length);
console.error('reconstructed full strings (len>=4 printable):', good.length);
for (const r of good.slice(0, 120)) console.log('STR ' + JSON.stringify(r.val));

// --- 7) write a partially-deobfuscated file ---
// Replace every span that decodes to a printable string (len >= MIN_LEN) inline
// with that literal. Control-flow polluted slots are left untouched.
const printableSpans = spans
  .filter(sp => sp.val.length >= MIN_LEN && /^[ -~]+$/.test(sp.val))
  .sort((a, b) => b.start - a.start); // reverse so earlier splices don't shift later offsets
let out = s;
let replaced = 0;
for (const sp of printableSpans) {
  const literal = JSON.stringify(sp.val);
  out = out.slice(0, sp.start) + literal + out.slice(sp.end);
  replaced++;
}
const outName = file + '.deob.js';
fs.writeFileSync(outName, out);
console.error(`\nWrote ${outName}: ${replaced} string-call sites inlined (of ${spans.length} decoded).`);
console.error(`Original ${s.length} bytes -> deob ${out.length} bytes.`);
