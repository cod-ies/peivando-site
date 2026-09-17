/* Navbar, footer, language switch, layout shell behaviour. */
(function () {
  var LOCALES = ["de", "en", "prs", "fa"];
  var RTL = { prs: true, fa: true };
  var STORAGE_KEY = "peivando.lang";

  var CHROME_I18N = {
    de: {
      "skip": "Zum Inhalt",
      "nav.open": "Menü öffnen",
      "nav.close": "Menü schließen",
      "nav.services": "Leistungen",
      "nav.projects": "Projekte",
      "nav.pricing": "Preise",
      "nav.about": "Über uns",
      "nav.contact": "Kontakt",
      "lang.label": "Sprache",
      "foot.impressum": "Impressum",
      "foot.privacy": "Datenschutz",
      "foot.contact": "Kontakt",
      "foot.facebook": "Facebook"
    },
    en: {
      "skip": "Skip to content",
      "nav.open": "Open menu",
      "nav.close": "Close menu",
      "nav.services": "Services",
      "nav.projects": "Projects",
      "nav.pricing": "Pricing",
      "nav.about": "About us",
      "nav.contact": "Contact",
      "lang.label": "Language",
      "foot.impressum": "Impressum",
      "foot.privacy": "Privacy",
      "foot.contact": "Contact",
      "foot.facebook": "Facebook"
    },
    prs: {
      "skip": "برو به محتوا",
      "nav.open": "باز کردن فهرست",
      "nav.close": "بستن فهرست",
      "nav.services": "خدمات",
      "nav.projects": "پروژه‌ها",
      "nav.pricing": "قیمت‌ها",
      "nav.about": "دربارهٔ ما",
      "nav.contact": "تماس",
      "lang.label": "زبان",
      "foot.impressum": "Impressum",
      "foot.privacy": "Datenschutz",
      "foot.contact": "تماس",
      "foot.facebook": "فیسبوک"
    },
    fa: {
      "skip": "برو به محتوا",
      "nav.open": "باز کردن منو",
      "nav.close": "بستن منو",
      "nav.services": "خدمات",
      "nav.projects": "پروژه‌ها",
      "nav.pricing": "قیمت‌ها",
      "nav.about": "درباره ما",
      "nav.contact": "تماس",
      "lang.label": "زبان",
      "foot.impressum": "Impressum",
      "foot.privacy": "Datenschutz",
      "foot.contact": "تماس",
      "foot.facebook": "فیسبوک"
    }
  };

  function pageDicts() {
    return typeof T === "object" && T ? T : {};
  }

  function localePack(locale) {
    var page = pageDicts();
    var pack = page[locale];
    if (!pack && locale === "prs") pack = page.fa;
    if (!pack) pack = page.de || {};
    return pack;
  }

  function chromePack(locale) {
    return CHROME_I18N[locale] || CHROME_I18N.de;
  }

  function textFor(key, locale) {
    var page = localePack(locale);
    if (page[key] != null) return page[key];
    var chrome = chromePack(locale);
    if (chrome[key] != null) return chrome[key];
    if (pageDicts().de && pageDicts().de[key] != null) return pageDicts().de[key];
    return CHROME_I18N.de[key];
  }

  function isRtl(locale) {
    return !!RTL[locale];
  }

  function normalizeLocale(value) {
    if (LOCALES.indexOf(value) !== -1) return value;
    return "de";
  }

  function applyLocale(locale, animate) {
    locale = normalizeLocale(locale);
    window.lang = locale;

    var screen = document.getElementById("screen");
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var go = function () {
      document.querySelectorAll("[data-i]").forEach(function (el) {
        var key = el.getAttribute("data-i");
        var value = textFor(key, locale);
        if (value != null) el.innerHTML = value;
      });
      document.body.setAttribute("dir", isRtl(locale) ? "rtl" : "ltr");
      document.documentElement.lang = locale;
      document.querySelectorAll(".langs button").forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.getAttribute("data-l") === locale));
      });
      var langGroup = document.querySelector(".langs");
      if (langGroup) langGroup.setAttribute("aria-label", textFor("lang.label", locale));
      syncMenuToggleLabel(locale);
      document.dispatchEvent(new CustomEvent("peivando:localechange", { detail: { locale: locale } }));
    };

    if (animate && screen && !reduce) {
      screen.classList.add("flip");
      setTimeout(function () {
        go();
        screen.classList.remove("flip");
      }, 170);
    } else {
      go();
    }

    try { localStorage.setItem(STORAGE_KEY, locale); } catch (e) {}
  }

  function syncMenuToggleLabel(locale) {
    var toggle = document.querySelector(".menu-toggle");
    var head = document.getElementById("head");
    if (!toggle || !head) return;
    var open = head.classList.contains("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", textFor(open ? "nav.close" : "nav.open", locale || window.lang || "de"));
  }

  function closeMenu() {
    var head = document.getElementById("head");
    if (!head) return;
    head.classList.remove("is-open");
    syncMenuToggleLabel();
  }

  function toggleMenu() {
    var head = document.getElementById("head");
    if (!head) return;
    head.classList.toggle("is-open");
    syncMenuToggleLabel();
  }

  function currentPath() {
    var path = (location.pathname || "/").replace(/\/index\.html$/, "/");
    if (path.length > 1 && path.slice(-1) === "/") path = path.slice(0, -1);
    return path || "/";
  }

  function markCurrentNav() {
    var path = currentPath();
    document.querySelectorAll(".nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.charAt(0) !== "/") {
        link.removeAttribute("aria-current");
        return;
      }
      var route = href.replace(/\/index\.html$/, "/");
      if (route.length > 1 && route.slice(-1) === "/") route = route.slice(0, -1);
      if (route === path) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function bind() {
    var head = document.getElementById("head");
    document.querySelectorAll(".langs button").forEach(function (button) {
      button.addEventListener("click", function () {
        applyLocale(button.getAttribute("data-l"), true);
      });
    });

    var toggle = document.querySelector(".menu-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        toggleMenu();
      });
    }

    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!head || !head.classList.contains("is-open")) return;
      if (!head.contains(event.target)) closeMenu();
    });

    addEventListener("resize", function () {
      if (window.innerWidth > 1100) closeMenu();
    });

    if (head) {
      addEventListener("scroll", function () {
        head.classList.toggle("stuck", scrollY > 24);
      }, { passive: true });
      head.classList.toggle("stuck", scrollY > 24);
    }

    var year = document.getElementById("yr");
    if (year) year.textContent = String(new Date().getFullYear());

    if (typeof PEIVANDO === "object" && PEIVANDO) {
      var footMail = document.getElementById("foot-mail");
      if (footMail) {
        footMail.textContent = PEIVANDO.email;
        footMail.href = "mailto:" + PEIVANDO.email;
      }
      var footWa = document.getElementById("foot-wa");
      if (footWa) {
        footWa.textContent = PEIVANDO.whatsappDisplay;
        footWa.href = "https://wa.me/" + PEIVANDO.whatsappDigits;
      }
      var footFb = document.getElementById("foot-facebook");
      if (footFb && PEIVANDO.facebookUrl) footFb.href = PEIVANDO.facebookUrl;
    }

    markCurrentNav();
  }

  function storedLocale() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  bind();
  applyLocale(storedLocale() || "de", false);

  window.PeivandoChrome = {
    locales: LOCALES.slice(),
    applyLocale: applyLocale,
    closeMenu: closeMenu
  };
})();
