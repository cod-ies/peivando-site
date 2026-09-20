/* ═══════════════════════════════════════════════════════════════════════
   Peivando hero — "Prism Cluster"
   Refracting glass solids behind the device stack (three.js), pointer
   parallax on the glass layers, and a phone screen that cycles languages.

   Everything here is progressive enhancement. Without JS, without WebGL,
   with reduced motion, on a small screen or on a metered connection the
   hero still renders: the CSS gradient and the static device cards are
   the baseline, this file only adds depth on top of them.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection || {};
  var thrifty = conn.saveData === true || /2g/.test(conn.effectiveType || '');

  /* ── 1. language cycle on the right-hand phone ───────────────────── */
  (function locales() {
    var slot = hero.querySelector('[data-locales]');
    if (!slot) return;

    var head = slot.querySelector('[data-locale-h]');
    var sub = slot.querySelector('[data-locale-p]');
    var cta = slot.querySelector('[data-locale-cta]');
    if (!head || !sub) return;

    var set = [
      { dir: 'ltr', lang: 'de', h: 'Grenzenlos bauen.', p: 'Moderne Websites, die sich anpassen, verbinden und überall funktionieren.', c: 'Leistungen ansehen' },
      { dir: 'ltr', lang: 'en', h: 'Build without limits.', p: 'Modern websites that adapt, connect and perform everywhere.', c: 'Explore services' },
      { dir: 'rtl', lang: 'prs', h: 'بدون مرز بسازید.', p: 'ویب‌سایت‌های مدرن که در هر زبان و هر صفحه کار می‌کنند.', c: 'خدمات ما' },
      { dir: 'rtl', lang: 'fa', h: 'بی‌مرز بسازید.', p: 'وب‌سایت‌های مدرن که همه‌جا سریع و درست کار می‌کنند.', c: 'مشاهده خدمات' }
    ];

    var i = 0;
    if (reduce) return; // one language, no flicker

    setInterval(function () {
      i = (i + 1) % set.length;
      var l = set[i];
      slot.classList.add('out');
      setTimeout(function () {
        slot.setAttribute('dir', l.dir);
        slot.setAttribute('lang', l.lang);
        slot.classList.toggle('m-rtl', l.dir === 'rtl');
        head.textContent = l.h;
        sub.textContent = l.p;
        if (cta) cta.textContent = l.c;
        slot.classList.remove('out');
      }, 380);
    }, 3400);
  })();

  /* ── 2. pointer parallax on the glass layers ─────────────────────── */
  (function parallax() {
    if (reduce || !window.matchMedia('(pointer:fine)').matches) return;
    var layers = hero.querySelectorAll('[data-depth]');
    if (!layers.length) return;

    var queued = false, mx = 0, my = 0;

    function apply() {
      queued = false;
      var r = hero.getBoundingClientRect();
      var dx = (mx - (r.left + r.width / 2)) / Math.max(r.width, 1);
      var dy = (my - (r.top + r.height / 2)) / Math.max(r.height, 1);
      for (var i = 0; i < layers.length; i++) {
        var d = parseFloat(layers[i].dataset.depth) || 0;
        layers[i].style.setProperty('--px', (-dx * d * 42).toFixed(1) + 'px');
        layers[i].style.setProperty('--py', (-dy * d * 26).toFixed(1) + 'px');
      }
      hero.classList.add('parallax-on');
    }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!queued) { queued = true; requestAnimationFrame(apply); }
    }, { passive: true });
  })();

  /* ── 3. WebGL glass solids ───────────────────────────────────────── */
  var canvas = hero.querySelector('.hero-gl');
  if (!canvas) return;
  if (reduce || thrifty) return;
  if (window.innerWidth < 900) return;              // phones keep the flat gradient
  if (!hasWebGL()) return;

  loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js', function (ok) {
    if (ok && window.THREE) start(window.THREE);
  });

  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  }

  function loadScript(src, done) {
    var s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = function () { done(true); };
    s.onerror = function () { done(false); };   // CDN blocked → flat gradient, no error
    document.head.appendChild(s);
  }

  /* Two plates. `plate('flat')` repaints the section's own CSS gradient so the
     canvas background and the DOM background are the same picture — no seam.
     `plate('rich')` adds the blue blobs and only ever appears *through* the
     glass, which is what gives the refraction its colour. */
  function plate(THREE, kind, w, h) {
    w = Math.max(16, Math.round(w / 3));
    h = Math.max(16, Math.round(h / 3));
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var g = c.getContext('2d');

    /* the same ellipse the stylesheet draws:
       radial-gradient(120% 92% at 50% 4%, #FFF 0%, #F3F6FB 44%, #E3E9F4 100%) */
    var rx = 1.2 * w, ry = .92 * h;
    g.save();
    g.translate(w * .5, h * .04);
    g.scale(1, ry / rx);
    var base = g.createRadialGradient(0, 0, 0, 0, 0, rx);
    base.addColorStop(0, '#ffffff');
    base.addColorStop(.44, '#f3f6fb');
    base.addColorStop(1, '#e3e9f4');
    g.fillStyle = base;
    g.fillRect(-w, -h * 6, w * 3, h * 12);
    g.restore();

    if (kind === 'rich') {
      var b1 = g.createRadialGradient(w * .13, h * .38, 2, w * .13, h * .38, w * .47);
      b1.addColorStop(0, 'rgba(26,92,255,.55)'); b1.addColorStop(1, 'rgba(26,92,255,0)');
      g.fillStyle = b1; g.fillRect(0, 0, w, h);

      var b2 = g.createRadialGradient(w * .87, h * .84, 2, w * .87, h * .84, w * .5);
      b2.addColorStop(0, 'rgba(96,150,255,.5)'); b2.addColorStop(1, 'rgba(96,150,255,0)');
      g.fillStyle = b2; g.fillRect(0, 0, w, h);
    }
    return new THREE.CanvasTexture(c);
  }

  function envMap(THREE, renderer) {
    var c = document.createElement('canvas');
    c.width = 512; c.height = 256;
    var g = c.getContext('2d');
    var grd = g.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(.45, '#e9f0ff');
    grd.addColorStop(1, '#b9ccf5');
    g.fillStyle = grd; g.fillRect(0, 0, 512, 256);

    var white = g.createRadialGradient(150, 70, 4, 150, 70, 120);
    white.addColorStop(0, '#ffffff'); white.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = white; g.fillRect(0, 0, 512, 256);

    var blue = g.createRadialGradient(400, 190, 4, 400, 190, 150);
    blue.addColorStop(0, '#1a5cff'); blue.addColorStop(1, 'rgba(26,92,255,0)');
    g.fillStyle = blue; g.fillRect(0, 0, 512, 256);

    var tex = new THREE.CanvasTexture(c);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    var pm = new THREE.PMREMGenerator(renderer);
    var env = pm.fromEquirectangular(tex).texture;
    pm.dispose(); tex.dispose();
    return env;
  }

  function start(THREE) {
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
      });
    } catch (e) { return; }

    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
    else if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.NoToneMapping;

    var scene = new THREE.Scene();
    var flat, rich;
    var backdrop;

    function repaint(w, h) {
      if (flat) { flat.dispose(); rich.dispose(); }
      flat = plate(THREE, 'flat', w, h);
      rich = plate(THREE, 'rich', w, h);
      scene.background = flat;
      if (backdrop) { backdrop.material.map = rich; backdrop.material.needsUpdate = true; }
    }
    scene.environment = envMap(THREE, renderer);

    var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    var group = new THREE.Group();
    scene.add(group);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xcdd9f0, 1.1));

    var key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(3, 5, 6); scene.add(key);

    var rimBlue = new THREE.PointLight(0x2f6bff, 2.6, 22);
    rimBlue.position.set(-4, 2, 3); scene.add(rimBlue);

    var rimWhite = new THREE.PointLight(0xffffff, 1.8, 22);
    rimWhite.position.set(4.5, -2, 3.5); scene.add(rimWhite);

    // something for the transmissive material to actually refract
    backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 30),
      new THREE.MeshBasicMaterial()
    );
    backdrop.position.z = -12;
    scene.add(backdrop);

    function glass() {
      return new THREE.MeshPhysicalMaterial({
        transmission: .86, thickness: 3.2, roughness: .04, ior: 1.52, metalness: 0,
        clearcoat: 1, clearcoatRoughness: .06,
        iridescence: 1, iridescenceIOR: 1.8, iridescenceThicknessRange: [120, 640],
        envMapIntensity: 1.5, specularIntensity: 1,
        attenuationColor: new THREE.Color('#7ea8ff'), attenuationDistance: 1.4,
        color: new THREE.Color('#ffffff')
      });
    }

    var ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 0), glass());
    ico.position.set(-4.5, 1.5, -1.6);

    var torus = new THREE.Mesh(new THREE.TorusGeometry(1.3, .42, 40, 120), glass());
    torus.position.set(4.6, 1.1, -1.4); torus.rotation.set(.6, .3, 0);

    var ball = new THREE.Mesh(new THREE.SphereGeometry(.86, 44, 30), glass());
    ball.position.set(3.7, -2.6, -1.9);

    var pill = new THREE.Mesh(
      THREE.CapsuleGeometry
        ? new THREE.CapsuleGeometry(.5, 1.8, 12, 30)
        : new THREE.CylinderGeometry(.5, .5, 2.4, 30),
      glass()
    );
    pill.position.set(-4.3, -2.7, -2.1); pill.rotation.z = .7;

    group.add(ico, torus, ball, pill);

    /* keep the canvas matched to its box */
    function resize() {
      var w = canvas.clientWidth || hero.clientWidth;
      var h = canvas.clientHeight || hero.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      repaint(w, h);
    }
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(hero);
    else window.addEventListener('resize', resize, { passive: true });

    /* pointer, normalised to the hero box */
    var px = 0, py = 0;
    window.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    }, { passive: true });

    /* entrance: the cluster eases in from depth alongside the CSS fly-in */
    var t0 = performance.now();
    var ease = function (x) { return 1 - Math.pow(2, -9 * x); };
    var camZ = camera.position.z;
    var visible = true;

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; },
        { rootMargin: '300px' }).observe(hero);
    }

    canvas.classList.add('on');

    (function loop() {
      requestAnimationFrame(loop);
      if (!visible || document.hidden) return;

      var now = performance.now();
      var t = (now - t0) / 1000;
      var e = ease(Math.min(1, (now - t0) / 1700));

      group.scale.setScalar(.55 + .45 * e);
      camera.position.z = (camZ + 3.4) - 3.4 * e;

      ico.rotation.x = t * .18; ico.rotation.y = t * .24;
      torus.rotation.z = t * .22; torus.rotation.y = .3 + Math.sin(t * .4) * .3;
      ball.rotation.y = -t * .3;
      pill.rotation.x = t * .2;

      group.rotation.y = px * .18;
      group.rotation.x = py * .12;

      renderer.render(scene, camera);
    })();
  }
})();
