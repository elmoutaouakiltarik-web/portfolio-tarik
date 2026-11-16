/* Lingua del sito. L’italiano è nel markup (chiavi data-i18n); qui ci sono il motore e le
   stringhe italiane usate da charts.js. Inglese e francese stanno in lang/ e si caricano solo
   quando servono. Dopo ogni modifica: node tools/check-i18n.js */
var DICT = window.__DICT = {
 "it": {
  "js.exact": "Esatta",
  "js.diff": "Differenza",
  "js.err": "Errore L2 relativo",
  "js.grid": "Griglia",
  "js.points": "punti",
  "js.trained": "risoluzione di addestramento",
  "js.wasted": "tentativi sprecati",
  "js.cost": "Costo",
  "js.hybrid": "Ibrida (RRF)",
  "js.vector": "Solo vettori",
  "js.bm25": "Solo BM25",
  "js.hil_tool": "Toolchain Python",
  "js.hil_tool2": "simulazione → codice → deploy",
  "js.hil_mcu2": "firmware FOC in C",
  "js.hil_rt2": "modello PLECS in tempo reale",
  "js.hil_rt3": "inverter + IPMSM 30 kW (50 kW picco)",
  "js.hil_pwm": "PWM 100 kHz",
  "js.hil_meas": "misure",
  "js.hil_flash": "carica il firmware",
  "js.hil_cases": "8 casi di test HIL · bus 96 V",
  "js.play": "Avvia",
  "js.pause": "Pausa",
  "js.view_top": "Vista dall’alto",
  "js.view_tilt": "Vista inclinata"
 }
};

(function () {
  'use strict';
  var LANGS = ['it', 'en', 'fr'];
  var STORE = 'portfolio-lang';
  var root = document.documentElement;
  var current = 'it';
  var originals = null;

  function t(key) {
    var d = DICT[current] || {};
    if (Object.prototype.hasOwnProperty.call(d, key)) return d[key];
    return DICT.it[key] !== undefined ? DICT.it[key] : key;
  }

  function fmt(n, digits) {
    var loc = current === 'en' ? 'en-GB' : current === 'fr' ? 'fr-FR' : 'it-IT';
    return Number(n).toLocaleString(loc, { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  function parseSpec(el) {
    var out = {};
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var p = pair.split(':');
      if (p.length === 2) out[p[0].trim()] = p[1].trim();
    });
    return out;
  }

  function snapshot() {
    originals = { text: [], attr: [] };
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      originals.text.push({ el: el, key: el.getAttribute('data-i18n'), val: el.innerHTML });
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = parseSpec(el);
      Object.keys(spec).forEach(function (attr) {
        originals.attr.push({ el: el, attr: attr, key: spec[attr], val: el.getAttribute(attr) });
      });
    });
  }

  function apply(lang) {
    current = lang;
    var d = lang === 'it' ? null : DICT[lang];
    originals.text.forEach(function (r) {
      r.el.innerHTML = d && d[r.key] !== undefined ? d[r.key] : r.val;
    });
    originals.attr.forEach(function (r) {
      r.el.setAttribute(r.attr, d && d[r.key] !== undefined ? d[r.key] : r.val);
    });
    root.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    try { localStorage.setItem(STORE, lang); } catch (e) { /* senza storage la scelta vale solo per questa visita */ }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function load(lang) {
    if (lang === 'it' || DICT[lang]) { apply(lang); return; }
    var s = document.createElement('script');
    s.src = 'assets/js/lang/' + lang + '.js?v=20261116c';
    s.onload = function () { apply(DICT[lang] ? lang : 'it'); };
    s.onerror = function () { apply('it'); };
    document.head.appendChild(s);
  }

  function initial() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) !== -1) return q;
    try {
      var saved = localStorage.getItem(STORE);
      if (LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) { /* ignora */ }
    var nav = (navigator.language || 'it').slice(0, 2).toLowerCase();
    if (nav === 'it') return 'it';
    return nav === 'fr' ? 'fr' : 'en';
  }

  window.I18N = { t: t, fmt: fmt, lang: function () { return current; } };

  function start() {
    snapshot();
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { load(b.getAttribute('data-lang')); });
    });
    load(initial());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
