/* Translations. Italian is the source language and lives in index.html (data-i18n keys);
 * this file holds only the engine plus the Italian strings used by JavaScript.
 * English and French live in assets/js/lang/ and are loaded on demand.
 * After editing, run: node tools/check-i18n.js */
var DICT = window.__DICT = {
 "it": {
  "meta.description": "Industrial AI Architect a Reggio Emilia. Digital twin physics-driven, CFD-AI e automazione OT/IT: sistemi che funzionano in produzione. Disponibile per collaborazioni in Europa.",
  "js.err.name": "Inserisci il tuo nome",
  "js.err.name2": "Nome troppo corto",
  "js.err.email": "Inserisci la tua email",
  "js.err.email2": "Email non valida",
  "js.err.msg": "Scrivi un messaggio",
  "js.err.msg2": "Messaggio troppo corto (min. 10 caratteri)",
  "js.sending": "Invio in corso…",
  "js.ok.mailto": "Il tuo client di posta è pronto: premi Invia per completare.",
  "js.ok.sent": "Messaggio inviato! Ti risponderò entro 24 ore.",
  "js.err.send": "Invio non riuscito. Scrivimi direttamente a",
  "js.mail.subject": "Contatto dal portfolio",
  "js.mail.name": "Nome",
  "js.mail.email": "Email",
  "js.audio.on": "Audio ambient attivo",
  "js.audio.off": "Audio ambient disattivato"
 }
};

/* i18n engine — Italian is read from the DOM (source of truth), EN/FR come from DICT above.
 * Markup contract:
 *   data-i18n="key"                      -> innerHTML is replaced
 *   data-i18n-attr="attr:key;attr2:key"  -> attributes are replaced
 * Public API: I18N.t(key), I18N.lang(), I18N.set('en'), event "i18n:change" on document.
 */
(function () {
  'use strict';

  var SUPPORTED = ['it', 'en', 'fr'];
  var scriptBase = (function () { var s = document.currentScript; return s && s.src ? s.src.replace(/[^/]*$/, '') : 'assets/js/'; })();
  var STORE_KEY = 'tem-lang';
  var htmlCache = null;
  var attrCache = null;
  var current = 'it';

  function readStore() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function writeStore(v) { try { localStorage.setItem(STORE_KEY, v); } catch (e) { /* private mode */ } }
  function fromUrl() {
    try {
      var p = new URLSearchParams(window.location.search).get('lang');
      p = p && p.toLowerCase();
      return p && SUPPORTED.indexOf(p) > -1 ? p : null;
    } catch (e) { return null; }
  }

  function capture() {
    htmlCache = new Map();
    attrCache = new Map();
    document.querySelectorAll('[data-i18n]').forEach(function (el) { htmlCache.set(el, el.innerHTML); });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var map = {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var attr = pair.split(':')[0];
        map[attr] = el.getAttribute(attr);
      });
      attrCache.set(el, map);
    });
  }

  function t(key, lang) {
    var d = DICT[lang || current];
    if (d && d[key] != null) return d[key];
    return (DICT.it && DICT.it[key] != null) ? DICT.it[key] : key;
  }

  function setMeta(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.setAttribute('content', value);
  }

  function apply(lang) {
    if (!htmlCache) capture();
    current = lang;
    var dict = DICT[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = lang === 'it' ? htmlCache.get(el) : dict[el.getAttribute('data-i18n')];
      if (value != null && el.innerHTML !== value) el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var cached = attrCache.get(el) || {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        var value = lang === 'it' ? cached[bits[0]] : dict[bits[1]];
        if (value != null) el.setAttribute(bits[0], value);
      });
    });

    var description = t('meta.description', lang);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[property="og:locale"]', { it: 'it_IT', en: 'en_US', fr: 'fr_FR' }[lang]);

    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      var on = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
    });

    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: lang } }));
  }

  var loading = {};
  function load(lang, done) {
    if (DICT[lang]) { done(); return; }
    if (loading[lang]) { loading[lang].push(done); return; }
    loading[lang] = [done];
    var s = document.createElement('script');
    s.src = scriptBase + 'lang/' + lang + '.js';
    s.onload = function () { var q = loading[lang]; delete loading[lang]; q.forEach(function (fn) { fn(); }); };
    s.onerror = function () { delete loading[lang]; /* offline: stay on current language */ };
    document.head.appendChild(s);
  }

  function set(lang, persist) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    if (persist !== false) writeStore(lang);
    load(lang, function () { apply(lang); });
  }

  function init() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-lang]');
      if (btn) { e.preventDefault(); set(btn.getAttribute('data-lang')); }
    });
    // warm the other dictionaries as soon as someone shows interest in the switch
    ['pointerenter', 'focusin', 'touchstart'].forEach(function (ev) {
      document.querySelectorAll('.lang').forEach(function (g) {
        g.addEventListener(ev, function () { SUPPORTED.forEach(function (l) { if (l !== 'it') load(l, function () {}); }); }, { passive: true, once: true });
      });
    });
    var initial = fromUrl() || readStore() || 'it';
    if (SUPPORTED.indexOf(initial) === -1) initial = 'it';
    if (fromUrl()) writeStore(initial);
    // the markup already is the Italian source: only touch the DOM when another language is requested
    if (initial !== 'it') load(initial, function () { apply(initial); });
  }

  window.I18N = { t: t, lang: function () { return current; }, set: set, supported: SUPPORTED };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
