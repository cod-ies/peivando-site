import { copyFor, messages } from "./copy.js";
import { WHATSAPP, assertNever, isLocale } from "./catalog.js";

const LANG_KEY = "peivando.lang";

/**
 * @param {unknown} root
 * @param {string} path
 */
function lookup(root, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return acc[key];
  }, root);
}

/**
 * @param {import("./catalog.js").Locale} locale
 */
function documentLang(locale) {
  switch (locale) {
    case "de":
      return "de";
    case "en":
      return "en";
    case "prs":
      return "fa-AF";
    case "fa":
      return "fa-IR";
    default:
      return assertNever(locale);
  }
}

/**
 * @param {import("./catalog.js").Locale} locale
 */
function isRtl(locale) {
  switch (locale) {
    case "fa":
    case "prs":
      return true;
    case "de":
    case "en":
      return false;
    default:
      return assertNever(locale);
  }
}

/**
 * @param {string} locale
 */
export function applyLocale(locale) {
  const resolved = isLocale(locale) ? locale : "de";
  const dict = copyFor(resolved);

  document.querySelectorAll("[data-i]").forEach((el) => {
    const key = el.getAttribute("data-i");
    if (!key) return;
    const value = lookup(dict, key);
    if (typeof value !== "string") return;
    const attr = el.getAttribute("data-i-attr");
    if (attr) {
      el.setAttribute(attr, value);
      return;
    }
    if (el.tagName === "META") {
      el.setAttribute("content", value);
      return;
    }
    if (el.tagName === "TITLE") {
      document.title = value;
      el.textContent = value;
      return;
    }
    el.textContent = value;
  });

  document.documentElement.lang = documentLang(resolved);
  document.body.setAttribute("dir", isRtl(resolved) ? "rtl" : "ltr");
  document.querySelectorAll(".langs button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-l") === resolved));
  });

  const wa = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(dict.waText);
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.setAttribute("href", wa);
  });

  try {
    localStorage.setItem(LANG_KEY, resolved);
  } catch {
    // localStorage can throw in private mode
  }
}

function boot() {
  const head = document.getElementById("head");
  if (head) {
    addEventListener("scroll", () => {
      head.classList.toggle("stuck", scrollY > 24);
    }, { passive: true });
  }

  const year = document.getElementById("yr");
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".langs button").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("data-l") || "de";
      applyLocale(next);
    });
  });

  let initial = "de";
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && stored in messages) initial = stored;
  } catch {
    initial = "de";
  }
  applyLocale(initial);
}

boot();
