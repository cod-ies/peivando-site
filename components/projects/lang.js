export const LANGS = ["de", "en", "prs", "fa"];

export const LANGUAGE_LABELS = {
  de: "Deutsch",
  en: "English",
  prs: "دری",
  fa: "فارسی",
};

export const LANG_STORAGE_KEY = "peivando.lang";

export function normalizeLang(value) {
  switch (value) {
    case "de":
    case "en":
    case "prs":
    case "fa":
      return value;
    default:
      return "de";
  }
}

export function isRtl(lang) {
  return lang === "fa" || lang === "prs";
}

export function htmlLang(lang) {
  switch (normalizeLang(lang)) {
    case "de":
      return "de";
    case "en":
      return "en";
    case "prs":
      return "fa-AF";
    case "fa":
      return "fa-IR";
    default:
      return "de";
  }
}

export function t(dict, lang) {
  if (dict == null) return "";
  if (typeof dict === "string") return dict;
  const key = normalizeLang(lang);
  return dict[key] || dict.de || "";
}

export function readStoredLang() {
  try {
    return normalizeLang(localStorage.getItem(LANG_STORAGE_KEY));
  } catch {
    return "de";
  }
}

export function storeLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, normalizeLang(lang));
  } catch {
    return;
  }
}

export function applyDocumentLang(lang) {
  const resolved = normalizeLang(lang);
  document.documentElement.lang = htmlLang(resolved);
  document.documentElement.dir = isRtl(resolved) ? "rtl" : "ltr";
  document.body.dir = isRtl(resolved) ? "rtl" : "ltr";
  document.body.setAttribute("data-lang", resolved);
  return resolved;
}
