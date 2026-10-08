#!/usr/bin/env node
/* Structural check for index.html (no dependencies).
 *
 *   node tools/check-html.js
 *
 * Errors (exit code 1): duplicate ids · in-page links to a missing id · local files that do not exist
 * · images without alt · target="_blank" without rel="noopener".
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const errors = [];

const ids = new Map();
for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.set(m[1], (ids.get(m[1]) || 0) + 1);
for (const [id, n] of ids) if (n > 1) errors.push(`duplicate id: ${id} (x${n})`);

for (const m of html.matchAll(/href="#([^"]*)"/g)) {
  if (m[1] && !ids.has(m[1])) errors.push(`link to missing id: #${m[1]}`);
}

const isRemote = (u) => /^(?:[a-z]+:|\/\/|#|data:)/i.test(u);
for (const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
  const u = m[1].split('#')[0].split('?')[0];
  if (!u || isRemote(u)) continue;
  if (!fs.existsSync(path.join(root, u))) errors.push(`missing local file: ${u}`);
}

for (const m of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\salt=/.test(m[0])) errors.push(`image without alt: ${m[0].slice(0, 80)}`);
}
for (const m of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  if (!/rel="[^"]*noopener/.test(m[0])) errors.push(`target=_blank without rel=noopener: ${m[0].slice(0, 80)}`);
}

console.log(`index.html: ${ids.size} ids checked`);
errors.forEach((e) => console.log('ERROR ' + e));
if (errors.length) {
  console.log(`\n${errors.length} error(s)`);
  process.exit(1);
}
console.log('OK');
