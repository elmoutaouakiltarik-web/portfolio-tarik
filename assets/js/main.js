/* Portfolio UI — vanilla JS, no dependencies.
 * Everything here is progressive enhancement: the page is fully readable without it.
 */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var tr = function (key) { return window.I18N ? window.I18N.t(key) : key; };
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };

  /* ---- footer year -------------------------------------------------------------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---- nav state + scroll progress (single rAF-throttled listener) -------------- */
  var nav = $('#nav');
  var bar = $('#progress');
  var maxScroll = 1;
  var ticking = false;
  function measure() { maxScroll = Math.max(1, root.scrollHeight - window.innerHeight); }
  function paintScroll() {
    ticking = false;
    var y = window.pageYOffset || root.scrollTop || 0;
    if (nav) nav.classList.toggle('is-stuck', y > 8);
    if (bar) bar.style.transform = 'scaleX(' + Math.min(1, y / maxScroll).toFixed(4) + ')';
  }
  function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(paintScroll); } }
  measure(); paintScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); }, { passive: true });
  window.addEventListener('load', function () { measure(); onScroll(); });
  if ('ResizeObserver' in window) new ResizeObserver(function () { measure(); }).observe(body);

  /* ---- mobile menu --------------------------------------------------------------- */
  var burger = $('#burger');
  var menu = $('#menu');
  var inertTargets = [$('main'), $('.footer')].filter(Boolean);
  var menuOpen = false;
  function focusables() { return [burger].concat($$('a[href], button', menu)).filter(function (el) { return el && !el.disabled; }); }
  function setMenu(open) {
    if (!menu || !burger || open === menuOpen) return;
    menuOpen = open;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', tr(open ? 'a11y.menu_close' : 'a11y.menu_open'));
    body.classList.toggle('menu-open', open);
    inertTargets.forEach(function (el) { if (open) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
    if (open) {
      menu.hidden = false;
      window.requestAnimationFrame(function () { window.requestAnimationFrame(function () { menu.classList.add('is-open'); }); });
      var first = $('a', menu); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
    } else {
      menu.classList.remove('is-open');
      setTimeout(function () { if (!menuOpen) menu.hidden = true; }, reduce ? 0 : 300);
    }
  }
  if (burger && menu) {
    burger.addEventListener('click', function () { setMenu(!menuOpen); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a[href^="#"]')) setMenu(false); });
    doc.addEventListener('keydown', function (e) {
      if (!menuOpen) return;
      if (e.key === 'Escape') { setMenu(false); burger.focus(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      var i = f.indexOf(doc.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && (i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
    });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', function (ev) { if (ev.matches) setMenu(false); });
    doc.addEventListener('i18n:change', function () { burger.setAttribute('aria-label', tr(menuOpen ? 'a11y.menu_close' : 'a11y.menu_open')); });
  }

  /* ---- scroll spy (IntersectionObserver, no scroll reads) ------------------------- */
  var spyLinks = $$('.nav__links a[data-nav], .menu a[data-nav]');
  var desktopIds = {};
  $$('.nav__links a[data-nav]').forEach(function (a) { desktopIds[a.getAttribute('data-nav')] = true; });
  var GROUP = { stack: 'expertise' };
  function setActive(id) {
    spyLinks.forEach(function (a) {
      var target = a.getAttribute('data-nav');
      var inMenu = !!a.closest('.menu');
      var wanted = inMenu ? id : (desktopIds[id] ? id : GROUP[id]);
      a.classList.toggle('is-active', !!wanted && target === wanted);
      if (target === wanted) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id === 'top' ? '' : en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    $$('main > section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---- reveal on scroll ------------------------------------------------------------ */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rv.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { rv.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }
  window.addEventListener('beforeprint', function () { revealEls.forEach(function (el) { el.classList.add('is-in'); }); });

  /* ---- counters ---------------------------------------------------------------------- */
  var counters = $$('[data-count]');
  function fmt(n) { try { return new Intl.NumberFormat(window.I18N ? window.I18N.lang() : 'it').format(n); } catch (e) { return String(n); } }
  function paintCounter(el, n) { el.textContent = fmt(n) + (el.getAttribute('data-suffix') || ''); }
  function animateCounter(el) {
    var target = Number(el.getAttribute('data-count'));
    if (reduce) { paintCounter(el, target); return; }
    var t0 = performance.now(); var dur = 1300;
    (function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      paintCounter(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) window.requestAnimationFrame(step);
    })(t0);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { animateCounter(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }
  doc.addEventListener('i18n:change', function () { counters.forEach(function (el) { paintCounter(el, Number(el.getAttribute('data-count'))); }); });

  /* ---- tabs (WAI-ARIA tabs pattern) ---------------------------------------------------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    var panels = tabs.map(function (t) { return doc.getElementById(t.getAttribute('aria-controls')); });
    function select(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panels[k]) panels[k].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length; var k = null;
        if (e.key === 'ArrowRight') k = (i + 1) % n;
        else if (e.key === 'ArrowLeft') k = (i - 1 + n) % n;
        else if (e.key === 'Home') k = 0;
        else if (e.key === 'End') k = n - 1;
        if (k !== null) { e.preventDefault(); select(k, true); }
      });
    });
    select(0);
  });

  /* ---- typewriters (hero role + terminal), only while the hero is on screen --------------- */
  var heroVisible = true;
  var hero = $('#top');
  if (hero && 'IntersectionObserver' in window) new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; }, { threshold: 0.05 }).observe(hero);
  function typeLoop(el, list, opts) {
    if (!el || reduce) return;
    var i = 0, n = el.textContent.length, del = true;
    list = [el.textContent].concat(list);
    function tick() {
      if (doc.hidden || !heroVisible) { setTimeout(tick, 600); return; }
      var word = list[i];
      if (del) {
        n--; el.textContent = word.slice(0, Math.max(0, n));
        if (n <= 0) { del = false; i = (i + 1) % list.length; setTimeout(tick, 320); } else setTimeout(tick, opts.erase);
      } else {
        n++; el.textContent = list[i].slice(0, n);
        if (n >= list[i].length) { del = true; setTimeout(tick, opts.hold); } else setTimeout(tick, opts.type);
      }
    }
    setTimeout(tick, opts.start);
  }
  typeLoop($('#heroTyped'), ['CFD & Digital Twin Engineer', 'OT/IT Systems Architect', 'Physics-driven ML'], { start: 4800, hold: 2200, type: 62, erase: 30 });
  typeLoop($('#typed'), ['cfdml.surrogate.train --rom', 'twin.sync --ot opcua --it mqtt', 'robot.cell.validate --eqf'], { start: 3400, hold: 1500, type: 52, erase: 26 });

  /* ---- desktop-only polish: hero panel tilt + card spotlight ------------------------------ */
  if (finePointer && !reduce) {
    var panel = $('#tiltCard');
    if (panel) {
      var pt = null;
      panel.addEventListener('pointermove', function (e) {
        if (pt) return;
        pt = window.requestAnimationFrame(function () {
          pt = null;
          var r = panel.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          panel.style.transform = 'rotateY(' + (x * 7).toFixed(2) + 'deg) rotateX(' + (-y * 7).toFixed(2) + 'deg)';
        });
      }, { passive: true });
      panel.addEventListener('pointerleave', function () { panel.style.transform = ''; }, { passive: true });
    }
    var sx = 0, sy = 0, sCard = null, sPending = false;
    doc.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      sCard = card; sx = e.clientX; sy = e.clientY;
      if (sPending) return;
      sPending = true;
      window.requestAnimationFrame(function () {
        sPending = false;
        var r = sCard.getBoundingClientRect();
        sCard.style.setProperty('--mx', (sx - r.left).toFixed(0) + 'px');
        sCard.style.setProperty('--my', (sy - r.top).toFixed(0) + 'px');
      });
    }, { passive: true });
  }

  /* ---- print / focus helpers --------------------------------------------------------------- */
  $$('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
  $$('a[data-focus]').forEach(function (a) {
    a.addEventListener('click', function () {
      var id = a.getAttribute('data-focus');
      setTimeout(function () { var f = doc.getElementById(id); if (f) f.focus({ preventScroll: true }); }, 500);
    });
  });

  /* ---- contact form ---------------------------------------------------------------------------- */
  var form = $('#contactForm');
  if (form) {
    var EMAIL = 'elmoutaouakiltarik@gmail.com';
    var hint = $('#formHint');
    var submit = form.querySelector('[type="submit"]');
    var fields = {
      name: { el: $('#cf-name'), err: $('#err-name') },
      email: { el: $('#cf-email'), err: $('#err-email') },
      msg: { el: $('#cf-msg'), err: $('#err-msg') },
    };
    var checks = {
      name: function (v) { return !v ? 'js.err.name' : (v.length < 2 ? 'js.err.name2' : ''); },
      email: function (v) { return !v ? 'js.err.email' : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'js.err.email2'); },
      msg: function (v) { return !v ? 'js.err.msg' : (v.length < 10 ? 'js.err.msg2' : ''); },
    };
    function check(key, soft) {
      var f = fields[key]; var k = checks[key](f.el.value.trim());
      if (k && soft && !f.el.value.trim()) k = '';
      f.el.setAttribute('aria-invalid', k ? 'true' : 'false');
      f.err.setAttribute('data-key', k);
      f.err.textContent = k ? tr(k) : '';
      return !k;
    }
    Object.keys(fields).forEach(function (key) {
      fields[key].el.addEventListener('blur', function () { check(key, true); });
      fields[key].el.addEventListener('input', function () { if (fields[key].el.getAttribute('aria-invalid') === 'true') check(key); });
    });
    doc.addEventListener('i18n:change', function () {
      Object.keys(fields).forEach(function (key) { var k = fields[key].err.getAttribute('data-key'); if (k) fields[key].err.textContent = tr(k); });
    });
    var hintKey = '', hintExtra = '';
    function status(key, cls, extra) {
      hintKey = key; hintExtra = extra || '';
      hint.removeAttribute('data-i18n');
      hint.textContent = tr(key) + hintExtra;
      hint.className = 'form__hint ' + (cls || '');
    }
    doc.addEventListener('i18n:change', function () { if (hintKey) hint.textContent = tr(hintKey) + hintExtra; });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      Object.keys(fields).forEach(function (key) { if (!check(key)) ok = false; });
      if (!ok) { var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
      var data = {
        name: fields.name.el.value.trim(), email: fields.email.el.value.trim(), message: fields.msg.el.value.trim(),
      };
      if (form.elements._honeypot && form.elements._honeypot.value) { status('js.ok.sent', 'is-ok'); form.reset(); return; }
      var key = form.getAttribute('data-access-key');
      var endpoint = form.getAttribute('data-endpoint') || (key ? 'https://api.web3forms.com/submit' : '');
      if (endpoint) {
        submit.setAttribute('aria-busy', 'true'); status('js.sending');
        var fd = new FormData(form); if (key) fd.append('access_key', key);
        fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: fd })
          .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); form.reset(); status('js.ok.sent', 'is-ok'); })
          .catch(function () { status('js.err.send', 'is-err', ' ' + EMAIL); })
          .then(function () { submit.removeAttribute('aria-busy'); });
        return;
      }
      var subject = tr('js.mail.subject') + ' — ' + data.name;
      var text = data.message + '\r\n\r\n— ' + data.name + ' <' + data.email + '>';
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      status('js.ok.mailto', 'is-ok');
    });
  }

  /* ---- ambient audio (opt-in, generated with WebAudio, nothing is downloaded) ---------------------- */
  var audioBtn = $('#audioToggle');
  if (audioBtn && (window.AudioContext || window.webkitAudioContext)) {
    var ctx = null, master = null, timers = [], nodes = [], on = false;
    var useEl = audioBtn.querySelector('use');
    var SCALE = [261.63, 293.66, 311.13, 349.23, 392.0, 415.3, 466.16];
    function reverb() {
      var len = Math.floor(2.4 * ctx.sampleRate), buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (var c = 0; c < 2; c++) { var d = buf.getChannelData(c); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      var conv = ctx.createConvolver(); conv.buffer = buf;
      var wet = ctx.createGain(); wet.gain.value = 0.38;
      var dry = ctx.createGain(); dry.gain.value = 0.62;
      var input = ctx.createGain();
      input.connect(dry); dry.connect(master); input.connect(conv); conv.connect(wet); wet.connect(master);
      return input;
    }
    var bus = null;
    function drone() {
      var now = ctx.currentTime, base = 65.41;
      [base, base * 1.5, base * 2, base * 2.5].forEach(function (f, i) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = i % 2 ? 'triangle' : 'sine'; o.frequency.value = f + (Math.random() * 0.4 - 0.2);
        g.gain.value = 0; g.gain.linearRampToValueAtTime(0.03 + i * 0.008, now + 2.5 + i * 0.5);
        o.connect(g); g.connect(bus); o.start(); nodes.push({ o: o, g: g });
      });
    }
    function pluck() {
      if (!on) return;
      var now = ctx.currentTime, dur = 1.4 + Math.random() * 0.9;
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = SCALE[Math.floor(Math.random() * SCALE.length)] * 0.5;
      g.gain.value = 0; g.gain.linearRampToValueAtTime(0.03 + Math.random() * 0.015, now + 0.25);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      o.connect(g); g.connect(bus); o.start(now); o.stop(now + dur + 0.05);
      timers.push(setTimeout(pluck, 2000 + Math.random() * 1600));
    }
    function setAudio(next) {
      on = next;
      audioBtn.setAttribute('aria-pressed', next ? 'true' : 'false');
      audioBtn.title = tr(next ? 'js.audio.on' : 'js.audio.off');
      if (useEl) useEl.setAttribute('href', next ? '#i-sound' : '#i-mute');
      if (next) {
        if (!ctx) { ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination); bus = reverb(); }
        if (ctx.state === 'suspended') ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);
        drone(); timers.push(setTimeout(pluck, 1500));
      } else if (ctx) {
        master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        timers.forEach(clearTimeout); timers = [];
        var dead = nodes; nodes = [];
        setTimeout(function () { dead.forEach(function (n) { try { n.o.stop(); } catch (e) { /* already stopped */ } }); }, 800);
      }
    }
    audioBtn.addEventListener('click', function () { setAudio(!on); });
    doc.addEventListener('visibilitychange', function () { if (doc.hidden && on) setAudio(false); });
  } else if (audioBtn) {
    audioBtn.hidden = true;
  }
})();
