import { aboutCopy } from "./copy.js";
import {
  EMAIL,
  htmlLang,
  isRtl,
  preferredLang,
  resolveLocale,
  whatsappDisplay,
  whatsappHref,
  writeStoredLang,
} from "./constants.js";

function harvestDe() {
  document.querySelectorAll("[data-i]").forEach(function (el) {
    aboutCopy.de[el.getAttribute("data-i")] = el.innerHTML;
  });
}

function dictFor(lang) {
  return aboutCopy[lang] || aboutCopy.de;
}

export function applyAboutLanguage(lang) {
  const locale = resolveLocale(lang);
  const dict = dictFor(locale);
  document.querySelectorAll("[data-i]").forEach(function (el) {
    const key = el.getAttribute("data-i");
    if (dict[key] != null) el.innerHTML = dict[key];
  });
  document.body.setAttribute("dir", isRtl(locale) ? "rtl" : "ltr");
  document.documentElement.lang = htmlLang(locale);
  document.title = dict["meta.title"] || document.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && dict["meta.desc"]) meta.setAttribute("content", dict["meta.desc"]);
  document.querySelectorAll(".langs").forEach(function (group) {
    group.setAttribute("aria-label", dict["langs.label"] || "Sprache");
  });
  document.querySelectorAll(".langs button").forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.dataset.l === locale));
  });
  const wa = whatsappHref(dict["cta.waText"] || aboutCopy.de["cta.waText"]);
  document.querySelectorAll("[data-wa]").forEach(function (link) {
    link.setAttribute("href", wa);
  });
  document.querySelectorAll("[data-wa-num]").forEach(function (el) {
    el.textContent = whatsappDisplay();
  });
  document.querySelectorAll("[data-mail]").forEach(function (link) {
    link.setAttribute("href", "mailto:" + EMAIL);
  });
  const year = document.getElementById("yr");
  if (year) year.textContent = String(new Date().getFullYear());
  writeStoredLang(locale);
}

export function hydrateAbout() {
  harvestDe();
  applyAboutLanguage(preferredLang());
  document.querySelectorAll(".langs button").forEach(function (button) {
    button.addEventListener("click", function () {
      applyAboutLanguage(button.dataset.l);
    });
  });
  const head = document.getElementById("head");
  if (head) {
    addEventListener(
      "scroll",
      function () {
        head.classList.toggle("stuck", scrollY > 24);
      },
      { passive: true }
    );
  }
}

export { aboutCopy } from "./copy.js";
export { getAboutCopy } from "./copy.js";
