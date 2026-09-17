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
      "foot.imp": "Impressum",
      "foot.dse": "Datenschutz",
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
      "foot.imp": "Impressum",
      "foot.dse": "Privacy",
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
      "foot.imp": "Impressum",
      "foot.dse": "Datenschutz",
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
      "foot.imp": "Impressum",
      "foot.dse": "Datenschutz",
      "foot.contact": "تماس",
      "foot.facebook": "فیسبوک"
    }
  };

  function pageDicts() {
    return typeof T === "object" && T ? T : {};
  }

  function flattenMessages(dict, prefix) {
    var out = {};
    if (!dict || typeof dict !== "object") return out;
    Object.keys(dict).forEach(function (key) {
      var path = prefix ? prefix + "." + key : key;
      var value = dict[key];
      if (value && typeof value === "object" && !Array.isArray(value)) {
        var nested = flattenMessages(value, path);
        Object.keys(nested).forEach(function (nestedKey) {
          out[nestedKey] = nested[nestedKey];
        });
      } else if (typeof value === "string") {
        out[path] = value;
      }
    });
    return out;
  }

  function mergeLocalePack(code, nested) {
    if (typeof T !== "object" || !T) window.T = { de: {} };
    if (!T[code]) T[code] = {};
    var flat = flattenMessages(nested);
    Object.keys(flat).forEach(function (key) {
      T[code][key] = flat[key];
    });
  }

  function loadMessageFiles() {
    return Promise.all(LOCALES.map(function (code) {
      return fetch("/messages/" + code + ".json").then(function (res) {
        if (!res.ok) return null;
        return res.json().then(function (nested) {
          mergeLocalePack(code, nested);
        });
      }).catch(function () {
        return null;
      });
    }));
  }

  function localePack(locale) {
    var page = pageDicts();
    return page[locale] || {};
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
      var detail = { locale: locale };
      document.dispatchEvent(new CustomEvent("peivando:localechange", { detail: detail }));
      window.dispatchEvent(new CustomEvent("peivando:lang", { detail: detail }));
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

  function isHome() {
    var path = currentPath();
    return path === "/" || path === "";
  }

  function prefersReduceMotion() {
    return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function hashAliases() {
    return (typeof PEIVANDO === "object" && PEIVANDO && PEIVANDO.hashAliases) || {
      services: "leistungen",
      contact: "kontakt",
      languages: "sprachen",
      about: "ueber",
      pricing: "preise",
      process: "ablauf"
    };
  }

  function navSectionIds() {
    return (typeof PEIVANDO === "object" && PEIVANDO && PEIVANDO.sections) ||
      ["projekte", "leistungen", "preise", "ueber", "kontakt"];
  }

  function resolveSection(raw) {
    var id = String(raw || "").replace(/^#/, "");
    var aliases = hashAliases();
    if (aliases[id]) id = aliases[id];
    if (id === "top" || id === "") return "top";
    if (document.getElementById(id)) return id;
    return "";
  }

  function syncHeadOffset() {
    var head = document.getElementById("head");
    if (!head) return 72;
    var open = head.classList.contains("is-open");
    if (open) head.classList.remove("is-open");
    var height = Math.round(head.getBoundingClientRect().height) || 72;
    if (open) head.classList.add("is-open");
    document.documentElement.style.setProperty("--head-h", height + "px");
    return height;
  }

  function markSection(id) {
    document.querySelectorAll(".nav a[data-section]").forEach(function (link) {
      var section = link.getAttribute("data-section");
      if (id && section === id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function markCurrentNav() {
    if (isHome()) {
      spySections();
      return;
    }
    var path = currentPath();
    document.querySelectorAll(".nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var section = link.getAttribute("data-section");
      if (section && href.indexOf("#" + section) !== -1) {
        link.removeAttribute("aria-current");
        return;
      }
      if (href.charAt(0) !== "/") {
        link.removeAttribute("aria-current");
        return;
      }
      var route = href.split("#")[0].replace(/\/index\.html$/, "/");
      if (route.length > 1 && route.slice(-1) === "/") route = route.slice(0, -1);
      if (route === path) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  var spyLock = "";

  function spySections() {
    if (!isHome()) return;
    if (spyLock) {
      markSection(spyLock);
      return;
    }
    var ids = navSectionIds();
    var els = [];
    for (var i = 0; i < ids.length; i++) {
      var node = document.getElementById(ids[i]);
      if (node) els.push({ id: ids[i], node: node });
    }
    if (!els.length) return;
    var headH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--head-h")) || 72;
    var probe = headH + 28;
    var current = "";
    for (var j = 0; j < els.length; j++) {
      if (els[j].node.getBoundingClientRect().top <= probe) current = els[j].id;
    }
    if (els[0].node.getBoundingClientRect().top > probe + 48) current = "";
    markSection(current);
  }

  function scrollToSection(id, updateHash) {
    id = resolveSection(id);
    closeMenu();
    if (!id || id === "top") {
      var topBehavior = prefersReduceMotion() ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior: topBehavior });
      if (updateHash) history.pushState(null, "", location.pathname + location.search);
      spyLock = "";
      markSection("");
      return true;
    }
    var el = document.getElementById(id);
    if (!el) return false;
    spyLock = id;
    markSection(id);
    var behavior = prefersReduceMotion() ? "auto" : "smooth";
    el.scrollIntoView({ behavior: behavior, block: "start" });
    if (updateHash) history.pushState(null, "", "#" + id);
    window.setTimeout(function () {
      spyLock = "";
      spySections();
    }, prefersReduceMotion() ? 50 : 650);
    return true;
  }

  function sectionFromHref(href) {
    if (!href) return "";
    var hash = "";
    var hashAt = href.indexOf("#");
    if (hashAt !== -1) hash = href.slice(hashAt + 1);
    if (hash) return resolveSection(hash);
    try {
      var url = new URL(href, location.origin);
      if (typeof PEIVANDO === "object" && PEIVANDO && PEIVANDO.sectionForPath) {
        return PEIVANDO.sectionForPath(url.pathname) || "";
      }
    } catch (e) {}
    return "";
  }

  function onInPageNav(event, href) {
    if (event.defaultPrevented || event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    var section = sectionFromHref(href);
    if (!section) return false;
    if (isHome()) {
      event.preventDefault();
      scrollToSection(section, true);
      return true;
    }
    return false;
  }

  function bindInPageLinks() {
    document.addEventListener("click", function (event) {
      var node = event.target;
      if (node && node.nodeType !== 1) node = node.parentElement;
      var link = node && node.closest ? node.closest("a[href]") : null;
      if (!link) return;
      if (link.target && link.target !== "" && link.target !== "_self") return;
      var href = link.getAttribute("href") || "";
      if (href.charAt(0) === "#" || href.indexOf("/#") !== -1 || href === "/" || href === "/index.html") {
        if (href === "/" || href === "/index.html") {
          if (isHome() && event.button === 0 && !event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            scrollToSection("top", true);
            closeMenu();
          }
          return;
        }
        onInPageNav(event, href);
        closeMenu();
      }
    });
  }

  function consumeInitialHash() {
    if (!isHome()) return;
    var id = resolveSection(location.hash);
    if (!id || id === "top") return;
    window.setTimeout(function () {
      scrollToSection(id, false);
    }, 40);
  }

  function bind() {
    var head = document.getElementById("head");
    syncHeadOffset();
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

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", function (event) {
      if (!head || !head.classList.contains("is-open")) return;
      if (!head.contains(event.target)) closeMenu();
    });

    addEventListener("resize", function () {
      if (window.innerWidth > 1100) closeMenu();
      syncHeadOffset();
      spySections();
    });

    if (head) {
      addEventListener("scroll", function () {
        head.classList.toggle("stuck", scrollY > 8);
        spySections();
      }, { passive: true });
      head.classList.toggle("stuck", scrollY > 8);
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

    bindInPageLinks();
    if (isHome() && "scrollRestoration" in history) history.scrollRestoration = "manual";
    markCurrentNav();
    consumeInitialHash();
    addEventListener("hashchange", function () {
      if (!isHome()) return;
      var id = resolveSection(location.hash);
      if (id) scrollToSection(id, false);
    });
    addEventListener("popstate", function () {
      if (!isHome()) return;
      var id = resolveSection(location.hash);
      scrollToSection(id || "top", false);
    });
  }

  function storedLocale() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  bind();
  loadMessageFiles().then(function () {
    applyLocale(window.lang || storedLocale() || "de", false);
  });

  window.PeivandoChrome = {
    locales: LOCALES.slice(),
    applyLocale: applyLocale,
    closeMenu: closeMenu,
    scrollToSection: scrollToSection,
    resolveSection: resolveSection
  };
})();
