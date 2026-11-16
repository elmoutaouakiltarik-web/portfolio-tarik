/* Due scene 3D senza librerie.
   1. Superficie u(x, t) della soluzione esatta di Burgers (WebGL2). I dati sono in assets/data/burgers-u.bin:
      241 istanti × 201 posizioni, Int16 = u · 32767, calcolati con Cole-Hopf (stesso codice dell'immagine piatta).
   2. Trasformate di Clarke e Park del controllo vettoriale (Canvas 2D con proiezione prospettica).
   Entrambe si fermano quando escono dallo schermo e rispettano prefers-reduced-motion. */
(function () {
  'use strict';
  var NT = 241, NX = 201;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var darkMQ = window.matchMedia && matchMedia('(prefers-color-scheme: dark)');
  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };
  var f = function (n, d) { return window.I18N ? window.I18N.fmt(n, d) : n.toFixed(d); };

  function css(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function rgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&');
    var n = parseInt(hex, 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }
  function signed(v, d) { return (v >= 0 ? '+' : '−') + f(Math.abs(v), d); }

  /* ---- algebra minima (matrici column-major come vuole WebGL) ------------------------------ */
  function persp(fy, a, n, fa) {
    var q = 1 / Math.tan(fy / 2), nf = 1 / (n - fa);
    return [q / a, 0, 0, 0, 0, q, 0, 0, 0, 0, (fa + n) * nf, -1, 0, 0, 2 * fa * n * nf, 0];
  }
  function lookAt(e, c, u) {
    var z = norm([e[0] - c[0], e[1] - c[1], e[2] - c[2]]), x = norm(cross(u, z)), y = cross(z, x);
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
      -dot(x, e), -dot(y, e), -dot(z, e), 1];
  }
  function mul(a, b) {
    var o = new Array(16);
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      var s = 0;
      for (var k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k];
      o[i * 4 + j] = s;
    }
    return o;
  }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function norm(a) { var l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function ease(k) { return 1 - Math.pow(1 - k, 3); }

  /* Trascinamento per ruotare. Con touch-action: pan-y lo scorrimento verticale resta alla pagina. */
  function orbit(target, view, onChange, onHover) {
    var drag = null;
    target.addEventListener('pointerdown', function (e) {
      drag = { x: e.clientX, y: e.clientY, yaw: view.yaw, pitch: view.pitch, moved: false };
      target.setPointerCapture(e.pointerId);
    });
    target.addEventListener('pointermove', function (e) {
      if (!drag) { if (onHover && e.pointerType === 'mouse') onHover(e); return; }
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      view.yaw = drag.yaw - dx * 0.008;
      view.pitch = Math.min(view.max, Math.max(view.min, drag.pitch + dy * 0.006));
      target.classList.add('is-drag');
      onChange();
    });
    function end() { drag = null; target.classList.remove('is-drag'); }
    target.addEventListener('pointerup', end);
    target.addEventListener('pointercancel', end);
  }

  function visible(el, cb) {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver(function (es) { cb(es[0].isIntersecting); }, { threshold: 0.15 }).observe(el);
  }

  /* =========================================================================================
     1. Superficie di Burgers
     ========================================================================================= */
  function burgers() {
    var root = document.querySelector('.field');
    if (!root) return;
    var box = root.querySelector('.field3d'), stage = root.querySelector('.field3d__stage');
    var back = root.querySelector('.field3d__back'), glc = root.querySelector('.field3d__gl');
    var front = root.querySelector('.field3d__front'), slider = root.querySelector('.field3d__range');
    var out = root.querySelector('.field3d__out'), map = root.querySelector('.field__grid');
    var cut = root.querySelector('.field__cut'), cutLbl = root.querySelector('.field__x-cut');
    var gl = glc.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true });

    var ti = +slider.value;
    function setT(i) {
      ti = Math.max(0, Math.min(NT - 1, Math.round(i)));
      slider.value = ti;
      var tv = ti / (NT - 1);
      out.textContent = 't = ' + f(tv, 2);
      cut.style.left = (tv * 100) + '%';
      cutLbl.style.left = (tv * 100) + '%';
      cutLbl.textContent = 't = ' + f(tv, 2);
      draw();
    }
    slider.addEventListener('input', function () { setT(+slider.value); });
    document.addEventListener('langchange', function () { setT(ti); });

    /* senza WebGL2 resta la mappa piatta, con la sezione comunque spostabile */
    var draw = function () {};
    box.hidden = false;
    if (!gl) { root.classList.add('no-3d'); setT(ti); return; }

    var W = 2.7, D = 1.0, H = 0.42;               /* dimensioni del box in unità mondo */
    var X = function (tv) { return (tv - 0.5) * W; };
    var Z = function (xv) { return xv * D; };   /* x = +1 verso chi guarda: il fronte d'urto è rivolto alla camera */
    var U = null, view = { yaw: -0.5, pitch: 0.5, min: 0.08, max: 1.4, dist: 5.4 };
    var mvp = null, cssW = 0, cssH = 0, dpr = 1, col = {}, prog, nIdx = 0, loc = {};

    function colors() {
      var dark = darkMQ && darkMQ.matches;
      col = {
        neg: rgb(css('--s1')), pos: rgb(css('--s2')), mid: rgb(css('--surface')),
        line: rgb(css('--bg')), ink: css('--ink'), ink2: css('--ink-2'), muted: css('--muted'),
        rule: css('--rule'), rule2: css('--rule-strong'), bg: css('--bg'), dark: dark
      };
    }

    function shader(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    function setup() {
      prog = gl.createProgram();
      gl.attachShader(prog, shader(gl.VERTEX_SHADER, [
        '#version 300 es',
        'in vec3 aP; in vec3 aN; in float aU; uniform mat4 uM;',
        'out vec3 vN; out float vU; out vec3 vP;',
        'void main(){ vN=aN; vU=aU; vP=aP; gl_Position=uM*vec4(aP,1.0); }'].join('\n')));
      gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, [
        '#version 300 es',
        'precision highp float;',
        'in vec3 vN; in float vU; in vec3 vP; out vec4 o;',
        'uniform vec3 uNeg, uMid, uPos, uLine, uCut; uniform float uX, uAmb;',
        'void main(){',
        '  float s=clamp(vU,-1.0,1.0);',
        '  vec3 c = s<0.0 ? mix(uMid,uNeg,-s) : mix(uMid,uPos,s);',
        '  vec3 n=normalize(vN); if(!gl_FrontFacing) n=-n;',
        '  float l=uAmb+(1.0-uAmb)*max(dot(n,normalize(vec3(-0.35,1.0,0.55))),0.0);',
        '  c*=l;',
        /* isolinee ogni 0,25 di u, tolte dove il gradiente esplode (fronte d'urto) */
        '  float v=vU*4.0, w=fwidth(v);',
        '  float a=(1.0-clamp(abs(fract(v+0.5)-0.5)/max(w,1e-4)-0.5,0.0,1.0))*step(w,0.35)*step(0.12,abs(vU))*0.55;',
        '  c=mix(c,uLine,a);',
        '  float d=abs(vP.x-uX)/max(fwidth(vP.x),1e-4);',
        '  c=mix(c,uCut,(1.0-clamp(d-0.8,0.0,1.0))*0.95);',
        '  o=vec4(c,1.0);',
        '}'].join('\n')));
      gl.linkProgram(prog);
      ['uM', 'uNeg', 'uMid', 'uPos', 'uLine', 'uCut', 'uX', 'uAmb'].forEach(function (n) { loc[n] = gl.getUniformLocation(prog, n); });

      var P = new Float32Array(NT * NX * 3), N = new Float32Array(NT * NX * 3), A = new Float32Array(NT * NX);
      var u = function (i, j) { return U[Math.min(NT - 1, Math.max(0, i)) * NX + Math.min(NX - 1, Math.max(0, j))]; };
      for (var i = 0; i < NT; i++) for (var j = 0; j < NX; j++) {
        var k = i * NX + j, xv = -1 + 2 * j / (NX - 1);
        P[k * 3] = X(i / (NT - 1)); P[k * 3 + 1] = u(i, j) * H; P[k * 3 + 2] = Z(xv); A[k] = u(i, j);
        /* normale da differenze centrate in coordinate mondo */
        var dt = (u(i + 1, j) - u(i - 1, j)) * H / (2 * W / (NT - 1));
        var dz = (u(i, j + 1) - u(i, j - 1)) * H / (2 * 2 * D / (NX - 1));
        var nn = norm([-dt, 1, -dz]);
        N[k * 3] = nn[0]; N[k * 3 + 1] = nn[1]; N[k * 3 + 2] = nn[2];
      }
      var I = new Uint16Array((NT - 1) * (NX - 1) * 6), p = 0;
      for (i = 0; i < NT - 1; i++) for (j = 0; j < NX - 1; j++) {
        var a = i * NX + j, b = a + 1, c = a + NX, d = c + 1;
        I[p++] = a; I[p++] = c; I[p++] = b; I[p++] = b; I[p++] = c; I[p++] = d;
      }
      nIdx = p;
      var vao = gl.createVertexArray();
      gl.bindVertexArray(vao);
      [['aP', P, 3], ['aN', N, 3], ['aU', A, 1]].forEach(function (s) {
        var b = gl.createBuffer(), l = gl.getAttribLocation(prog, s[0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, s[1], gl.STATIC_DRAW);
        gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, s[2], gl.FLOAT, false, 0, 0);
      });
      var ib = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, I, gl.STATIC_DRAW);
    }

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = stage.clientWidth; cssH = stage.clientHeight;
      [back, glc, front].forEach(function (c) { c.width = Math.round(cssW * dpr); c.height = Math.round(cssH * dpr); });
    }

    function proj(p) {
      var m = mvp, x = p[0], y = p[1], z = p[2];
      var w = m[3] * x + m[7] * y + m[11] * z + m[15];
      return [(m[0] * x + m[4] * y + m[8] * z + m[12]) / w * 0.5 * cssW + cssW / 2,
        -(m[1] * x + m[5] * y + m[9] * z + m[13]) / w * 0.5 * cssH + cssH / 2];
    }
    function path(ctx, pts) {
      ctx.beginPath();
      pts.forEach(function (p, i) { var s = proj(p); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); });
    }
    function label(ctx, p, txt, align, dy) {
      var s = proj(p);
      ctx.textAlign = align || 'center';
      ctx.fillText(txt, s[0], s[1] + (dy || 0));
    }

    function render() {
      if (!U || !cssW) return;
      var narrow = cssW < 560;
      var fov = narrow ? 0.62 : 0.5, aspect = cssW / cssH;
      // schermi stretti: allontana la camera così la superficie resta intera in larghezza
      var dd = view.dist * Math.min(1.6, Math.max(1, 1.35 / aspect));
      var e = [dd * Math.cos(view.pitch) * Math.sin(view.yaw), dd * Math.sin(view.pitch),
        dd * Math.cos(view.pitch) * Math.cos(view.yaw)];
      mvp = mul(persp(fov, aspect, 0.1, 50), lookAt(e, [0, -0.3, 0], [0, 1, 0]));
      var tv = ti / (NT - 1), y0 = -H * 1.12;

      /* sfondo: pavimento con griglia e pareti di riferimento */
      var b = back.getContext('2d');
      b.setTransform(dpr, 0, 0, dpr, 0, 0); b.clearRect(0, 0, cssW, cssH);
      b.lineWidth = 1; b.strokeStyle = col.rule;
      for (var g = 0; g <= 4; g++) {
        path(b, [[X(g / 4), y0, Z(-1)], [X(g / 4), y0, Z(1)]]); b.stroke();
        path(b, [[X(0), y0, Z(-1 + g / 2)], [X(1), y0, Z(-1 + g / 2)]]); b.stroke();
      }
      b.strokeStyle = col.rule2;
      path(b, [[X(0), y0, Z(-1)], [X(1), y0, Z(-1)], [X(1), y0, Z(1)], [X(0), y0, Z(1)], [X(0), y0, Z(-1)]]); b.stroke();
      /* asse verticale u sullo spigolo posteriore sinistro */
      var corner = Math.sin(view.yaw) > 0 ? 0 : 1, farX = Math.cos(view.yaw) > 0 ? -1 : 1;
      path(b, [[X(corner), y0, Z(farX)], [X(corner), H, Z(farX)]]); b.stroke();
      [-1, 0, 1].forEach(function (v) { path(b, [[X(corner), v * H, Z(farX)], [X(corner) + (corner ? 0.06 : -0.06), v * H, Z(farX)]]); b.stroke(); });

      /* superficie */
      gl.viewport(0, 0, glc.width, glc.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(prog);
      gl.uniformMatrix4fv(loc.uM, false, new Float32Array(mvp));
      gl.uniform3fv(loc.uNeg, col.neg); gl.uniform3fv(loc.uPos, col.pos); gl.uniform3fv(loc.uMid, col.mid);
      gl.uniform3fv(loc.uLine, col.line); gl.uniform3fv(loc.uCut, rgb(col.ink));
      gl.uniform1f(loc.uX, X(tv)); gl.uniform1f(loc.uAmb, col.dark ? 0.55 : 0.6);
      gl.drawElements(gl.TRIANGLES, nIdx, gl.UNSIGNED_SHORT, 0);

      /* primo piano: profilo della sezione proiettato sulla parete di fondo, etichette */
      var c = front.getContext('2d');
      c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, cssW, cssH);
      var prof = [];
      for (var j = 0; j < NX; j++) prof.push([X(tv), U[ti * NX + j] * H, Z(-1 + 2 * j / (NX - 1))]);
      var wallX = Math.sin(view.yaw) > 0 ? X(0) : X(1);
      var shadow = prof.map(function (p) { return [wallX, p[1], p[2]]; });
      b.strokeStyle = col.ink2; b.lineWidth = 1.5; b.setLineDash([4, 3]);
      path(b, shadow); b.stroke(); b.setLineDash([]);

      c.font = '500 ' + (narrow ? 10.5 : 12) + 'px "IBM Plex Mono", ui-monospace, monospace';
      c.fillStyle = col.muted; c.textBaseline = 'middle';
      var off = narrow ? 0.2 : 0.16;
      label(c, [X(0), y0, Z(-farX) - farX * off], 't = 0');
      label(c, [X(0.5), y0, Z(-farX) - farX * off], 't = ' + f(0.5, 1));
      label(c, [X(1), y0, Z(-farX) - farX * off], 't = 1');
      var side = Math.sin(view.yaw) > 0 ? 1 : 0, sx = side ? X(1) + 0.12 : X(0) - 0.12;
      label(c, [sx, y0, Z(1)], 'x = 1', side ? 'left' : 'right');
      label(c, [sx, y0, Z(-1)], 'x = −1', side ? 'left' : 'right');
      var ax = X(corner) + (corner ? 0.1 : -0.1), al = corner ? 'left' : 'right';
      label(c, [ax, H, Z(farX)], 'u = 1', al);
      c.fillStyle = col.ink; c.font = '600 ' + (narrow ? 11 : 12.5) + 'px "IBM Plex Mono", ui-monospace, monospace';
      label(c, [X(tv), H * 1.55, Z(0)], 't = ' + f(tv, 2));
      c.strokeStyle = col.ink; c.lineWidth = 1;
      path(c, [[X(tv), H * 1.38, Z(0)], [X(tv), U[ti * NX + (NX >> 1)] * H + 0.02, Z(0)]]); c.stroke();
    }

    var queued = false;
    draw = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; render(); });
    };

    orbit(stage, view, draw, function (e) {
      /* il mouse sopra la superficie sposta la sezione: t del punto più vicino sull'asse proiettato */
      if (!mvp) return;
      var r = stage.getBoundingClientRect(), mx = e.clientX - r.left, best = 0, bd = 1e9;
      for (var i = 0; i < NT; i += 2) {
        var s = proj([X(i / (NT - 1)), 0, 0]), dd = Math.abs(s[0] - mx);
        if (dd < bd) { bd = dd; best = i; }
      }
      setT(best);
    });
    stage.addEventListener('dblclick', function () { view.yaw = -0.5; view.pitch = 0.5; draw(); });
    stage.addEventListener('keydown', function (e) {
      var k = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, 0.08], ArrowDown: [0, -0.08] }[e.key];
      if (!k) return;
      e.preventDefault();
      view.yaw += k[0]; view.pitch = Math.min(view.max, Math.max(view.min, view.pitch + k[1])); draw();
    });

    /* vista 3D o mappa piatta */
    var seg = root.querySelectorAll('[data-view]');
    seg.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var is3d = btn.getAttribute('data-view') === '3d';
        seg.forEach(function (o) { o.setAttribute('aria-pressed', String(o === btn)); });
        stage.hidden = !is3d; map.hidden = is3d;
        if (is3d) { size(); draw(); }
      });
    });

    glc.addEventListener('webglcontextlost', function (e) {
      e.preventDefault(); root.classList.add('no-3d'); stage.hidden = true; map.hidden = false;
    });

    fetch('assets/data/burgers-u.bin?v=20261116e').then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.arrayBuffer();
    }).then(function (buf) {
      var q = new Int16Array(buf);
      if (q.length !== NT * NX) throw new Error('size');
      U = new Float32Array(q.length);
      for (var i = 0; i < q.length; i++) U[i] = q[i] / 32767;
      colors(); setup(); size();
      root.classList.add('is-3d'); map.hidden = true; stage.hidden = false;
      size(); setT(ti);
      if (darkMQ) darkMQ.addEventListener('change', function () { colors(); draw(); });
      if ('ResizeObserver' in window) new ResizeObserver(function () { size(); render(); }).observe(stage);
      /* breve entrata: la superficie ruota fino alla vista iniziale la prima volta che compare */
      if (!reduced) {
        var seen = false;
        visible(stage, function (on) {
          if (!on || seen) return;
          seen = true;
          var y0 = view.yaw - 0.9, p0 = 0.95, t0 = performance.now();
          (function step(now) {
            var k = Math.min(1, (now - t0) / 1600), e = ease(k);
            view.yaw = y0 + 0.9 * e; view.pitch = p0 + (0.5 - p0) * e; render();
            if (k < 1) requestAnimationFrame(step);
          })(t0);
        });
      }
    }).catch(function () {
      root.classList.add('no-3d'); stage.hidden = true; map.hidden = false; setT(ti);
    });
  }

  /* =========================================================================================
     2. Clarke e Park
     ========================================================================================= */
  function clarke() {
    var fig = document.querySelector('.clarke');
    if (!fig) return;
    var stage = fig.querySelector('.clarke__stage'), cv = fig.querySelector('canvas');
    var playBtn = fig.querySelector('[data-act="play"]'), viewBtn = fig.querySelector('[data-act="view"]');
    var out = fig.querySelector('.clarke__out');
    var ctx = cv.getContext('2d');
    var ID = -0.42, IQ = 0.86;                       /* valori illustrativi in per unità */
    var view = { yaw: 0.6, pitch: 0.42, min: -0.2, max: Math.PI / 2, dist: 6 };
    var theta = 0.6, playing = !reduced, onScreen = false, last = 0, w = 0, h = 0, dpr = 1, anim = null;

    /* base del piano: n = (1,1,1)/√3 diventa l'asse verticale, α e β stanno nel piano orizzontale */
    var r = Math.sqrt(2 / 3);
    var ea = [1 * r, -0.5 * r, -0.5 * r], eb = [0, Math.sqrt(3) / 2 * r, -Math.sqrt(3) / 2 * r];
    var en = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
    function world(p) { return [dot(p, ea), dot(p, en), -dot(p, eb)]; }      /* abc → (X, Y, Z) */

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = stage.clientWidth; h = stage.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    }
    function proj(p) {
      var cy = Math.cos(view.yaw), sy = Math.sin(view.yaw), cp = Math.cos(view.pitch), sp = Math.sin(view.pitch);
      var x = cy * p[0] - sy * p[2], z = sy * p[0] + cy * p[2];
      var y = cp * p[1] - sp * z; z = sp * p[1] + cp * z;
      var s = Math.min(w, h * 1.25) * 0.9 / (view.dist - z) * 2.1;
      return [w / 2 + x * s, h * 0.54 - y * s];
    }
    function line(pts, color, width, dash) {
      ctx.beginPath();
      pts.forEach(function (p, i) { var s = proj(world(p)); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); });
      ctx.strokeStyle = color; ctx.lineWidth = width || 1; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
    }
    function text(p, s, color, weight) {
      var q = proj(world(p));
      ctx.fillStyle = color; ctx.font = (weight || 500) + ' 12px "IBM Plex Mono", ui-monospace, monospace';
      ctx.fillText(s, q[0], q[1]);
    }

    function render() {
      if (!w) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var C = { a: css('--s1'), b: css('--s2'), c: css('--s3'), ink: css('--ink'), ink2: css('--ink-2'),
        muted: css('--muted'), rule: css('--rule'), rule2: css('--rule-strong'), surf: css('--surface') };
      /* in abc il vettore corrente sta sul piano a+b+c = 0; |P| = √(3/2)·|I| */
      var al = ID * Math.cos(theta) - IQ * Math.sin(theta), be = ID * Math.sin(theta) + IQ * Math.cos(theta);
      var ia = al, ib = -al / 2 + Math.sqrt(3) / 2 * be, ic = -al / 2 - Math.sqrt(3) / 2 * be;
      var mag = Math.hypot(ID, IQ);
      /* punto del piano dato (α, β) in coordinate abc */
      var ab = function (a, b) { return [a, -a / 2 + Math.sqrt(3) / 2 * b, -a / 2 - Math.sqrt(3) / 2 * b]; };

      /* disco del piano a + b + c = 0 */
      ctx.beginPath();
      for (var k = 0; k <= 72; k++) {
        var q = proj(world(ab(1.32 * Math.cos(k / 72 * 2 * Math.PI), 1.32 * Math.sin(k / 72 * 2 * Math.PI))));
        if (k) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]);
      }
      ctx.fillStyle = C.surf; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1;
      ctx.strokeStyle = C.rule2; ctx.lineWidth = 1; ctx.stroke();

      /* assi a, b, c (ortogonali nello spazio delle fasi) */
      [[1, 0, 0, C.a, 'ia'], [0, 1, 0, C.b, 'ib'], [0, 0, 1, C.c, 'ic']].forEach(function (s) {
        var L = 1.35;
        line([[-s[0] * L * 0.55, -s[1] * L * 0.55, -s[2] * L * 0.55], [s[0] * L, s[1] * L, s[2] * L]], s[3], 1.5);
        text([s[0] * L * 1.13, s[1] * L * 1.13, s[2] * L * 1.13], s[4], s[3], 600);
      });

      /* traiettoria: cerchio di raggio |I| nel piano */
      var circ = [];
      for (k = 0; k <= 96; k++) circ.push(ab(mag * Math.cos(k / 96 * 2 * Math.PI), mag * Math.sin(k / 96 * 2 * Math.PI)));
      line(circ, C.muted, 1, [3, 3]);

      /* assi α, β fissi e d, q rotanti */
      line([ab(-1.25, 0), ab(1.25, 0)], C.rule2, 1);
      line([ab(0, -1.25), ab(0, 1.25)], C.rule2, 1);
      text(ab(1.42, 0), 'α', C.muted); text(ab(0, 1.42), 'β', C.muted);
      var dA = [Math.cos(theta), Math.sin(theta)], qA = [-Math.sin(theta), Math.cos(theta)];
      line([ab(0, 0), ab(dA[0] * 1.25, dA[1] * 1.25)], C.ink2, 1.5);
      line([ab(0, 0), ab(qA[0] * 1.25, qA[1] * 1.25)], C.ink2, 1.5, [5, 3]);
      text(ab(dA[0] * 1.42, dA[1] * 1.42), 'd', C.ink2, 600);
      text(ab(qA[0] * 1.42, qA[1] * 1.42), 'q', C.ink2, 600);

      /* proiezioni su d e q */
      var pd = ab(dA[0] * ID, dA[1] * ID), pq = ab(qA[0] * IQ, qA[1] * IQ), P = [ia, ib, ic];
      line([P, pd], C.muted, 1, [2, 3]);
      line([P, pq], C.muted, 1, [2, 3]);
      /* proiezioni sugli assi di fase: i valori istantanei ia, ib, ic */
      [[ia, 0, 0, C.a], [0, ib, 0, C.b], [0, 0, ic, C.c]].forEach(function (s) {
        line([P, [s[0], s[1], s[2]]], s[3], 1, [2, 3]);
        var q = proj(world([s[0], s[1], s[2]]));
        ctx.beginPath(); ctx.arc(q[0], q[1], 3.5, 0, 7); ctx.fillStyle = s[3]; ctx.fill();
      });

      /* vettore corrente */
      line([[0, 0, 0], P], C.ink, 2.5);
      var pp = proj(world(P));
      ctx.beginPath(); ctx.arc(pp[0], pp[1], 5, 0, 7); ctx.fillStyle = C.ink; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = C.surf; ctx.stroke();
      text([P[0] * 1.18, P[1] * 1.18, P[2] * 1.18], 'i', C.ink, 600);

      out.innerHTML =
        '<span>θ = ' + f(((theta * 180 / Math.PI) % 360 + 360) % 360, 0) + '°</span>' +
        '<span><i style="background:var(--s1)"></i>ia ' + signed(ia, 2) + '</span>' +
        '<span><i style="background:var(--s2)"></i>ib ' + signed(ib, 2) + '</span>' +
        '<span><i style="background:var(--s3)"></i>ic ' + signed(ic, 2) + '</span>' +
        '<span class="clarke__dq">id ' + signed(ID, 2) + ' · iq ' + signed(IQ, 2) + '</span>';
    }

    function tick(now) {
      if (!playing || !onScreen) { last = 0; return; }
      if (last) theta += (now - last) / 1000 * 0.9;
      last = now; render();
      requestAnimationFrame(tick);
    }
    function setPlaying(p) {
      playing = p;
      playBtn.setAttribute('aria-pressed', String(!p));
      playBtn.textContent = t(p ? 'js.pause' : 'js.play');
      if (p) requestAnimationFrame(tick);
    }
    playBtn.addEventListener('click', function () { setPlaying(!playing); });

    var top = false;
    viewBtn.addEventListener('click', function () {
      top = !top;
      viewBtn.textContent = t(top ? 'js.view_tilt' : 'js.view_top');
      var y0 = view.yaw, p0 = view.pitch, p1 = top ? Math.PI / 2 : 0.42, t0 = performance.now();
      if (anim) cancelAnimationFrame(anim);
      (function step(now) {
        var k = reduced ? 1 : Math.min(1, (now - t0) / 700), e = ease(k);
        view.pitch = p0 + (p1 - p0) * e; view.yaw = y0; render();
        if (k < 1) anim = requestAnimationFrame(step);
      })(t0);
    });
    document.addEventListener('langchange', function () {
      playBtn.textContent = t(playing ? 'js.pause' : 'js.play');
      viewBtn.textContent = t(top ? 'js.view_tilt' : 'js.view_top');
      render();
    });

    orbit(stage, view, render);
    stage.addEventListener('keydown', function (e) {
      var k = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, 0.08], ArrowDown: [0, -0.08] }[e.key];
      if (!k) return;
      e.preventDefault();
      view.yaw += k[0]; view.pitch = Math.min(view.max, Math.max(view.min, view.pitch + k[1])); render();
    });
    if (darkMQ) darkMQ.addEventListener('change', render);
    if ('ResizeObserver' in window) new ResizeObserver(function () { size(); render(); }).observe(stage);
    visible(stage, function (on) { onScreen = on; if (on && playing) requestAnimationFrame(tick); });
    fig.classList.add('is-ready');
    size(); setPlaying(playing); render();
  }

  function start() {
    try { burgers(); } catch (e) { document.querySelector('.field') && document.querySelector('.field').classList.add('no-3d'); }
    clarke();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
