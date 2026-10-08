#!/usr/bin/env node
/* Translation check for the static site (no dependencies).
 *
 *   node tools/check-i18n.js
 *
 * Errors (exit code 1):
 *   - a key used in index.html / main.js is missing in English or French
 *   - English and French do not define the same keys
 *   - an empty translation
 * Warnings:
 *   - a translation that no markup or script uses
 *   - French punctuation not preceded by a no-break space (: ; ? ! »)
 *   - straight apostrophes and double spaces inside EN/FR strings
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

/* ---- keys used by the markup and by the scripts ----------------------------------------- */
const html = read('index.html');
const used = new Set();
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) used.add(m[1]);
for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
  for (const pair of m[1].split(';')) {
    const key = pair.split(':')[1];
    if (key) used.add(key.trim());
  }
}
const markupKeys = new Set(used);

const scriptKeys = new Set();
for (const file of fs.readdirSync(path.join(root, 'assets/js')).filter((f) => f.endsWith('.js'))) {
  for (const m of read('assets/js/' + file).matchAll(/'((?:js|a11y|meta)\.[A-Za-z0-9_.]+)'/g)) scriptKeys.add(m[1]);
}
scriptKeys.forEach((k) => used.add(k));

/* ---- dictionaries ----------------------------------------------------------------------- */
function parseDict(file, re) {
  const m = read(file).match(re);
  if (!m) throw new Error('Cannot parse ' + file);
  return JSON.parse(m[1]);
}
const it = parseDict('assets/js/i18n.js', /var DICT = window\.__DICT = (\{[\s\S]*?\n\});/).it;
const dict = {
  en: parseDict('assets/js/lang/en.js', /window\.__DICT\.en = (\{[\s\S]*\});?\s*$/),
  fr: parseDict('assets/js/lang/fr.js', /window\.__DICT\.fr = (\{[\s\S]*\});?\s*$/),
};
Object.keys(it).forEach((k) => used.add(k));

/* ---- checks ------------------------------------------------------------------------------ */
const errors = [];
const warnings = [];

for (const lang of ['en', 'fr']) {
  const d = dict[lang];
  for (const k of used) if (!(k in d)) errors.push(`[${lang}] missing key: ${k}`);
  for (const k of Object.keys(d)) {
    if (!used.has(k)) warnings.push(`[${lang}] unused key: ${k}`);
    if (!String(d[k]).trim()) errors.push(`[${lang}] empty value: ${k}`);
    const v = String(d[k]);
    if (/\s{2,}/.test(v.replace(/<[^>]+>/g, ''))) warnings.push(`[${lang}] double space: ${k}`);
    if (/\w'\w/.test(v.replace(/<[^>]+>/g, ''))) warnings.push(`[${lang}] straight apostrophe (use ’): ${k}`);
    if (lang === 'fr' && /[^  <>\s](?: )[:;?!»]/.test(v.replace(/<[^>]+>/g, ''))) warnings.push(`[fr] regular space before ; : ? ! » (use a no-break space): ${k}`);
  }
}
for (const k of Object.keys(dict.en)) if (!(k in dict.fr)) errors.push(`[fr] missing key present in en: ${k}`);
for (const k of Object.keys(dict.fr)) if (!(k in dict.en)) errors.push(`[en] missing key present in fr: ${k}`);
for (const k of Object.keys(it)) if (!(k in dict.en)) errors.push(`[en] missing script key: ${k}`);

/* ---- report ------------------------------------------------------------------------------ */
const uniq = (a) => [...new Set(a)];
console.log(`index.html: ${markupKeys.size} markup keys · scripts: ${scriptKeys.size} · en: ${Object.keys(dict.en).length} · fr: ${Object.keys(dict.fr).length}`);
uniq(warnings).forEach((w) => console.log('warn  ' + w));
uniq(errors).forEach((e) => console.log('ERROR ' + e));
if (errors.length) {
  console.log(`\n${uniq(errors).length} error(s)`);
  process.exit(1);
}
console.log(warnings.length ? `\nOK with ${uniq(warnings).length} warning(s)` : '\nOK');
