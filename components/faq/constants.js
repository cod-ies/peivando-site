export const WHATSAPP_E164 = "93747970495";
export const EMAIL = "info@peivando.com";
export const LOCALES = ["de", "en", "prs", "fa"];

export const FAQ_IDS = [
  "languages",
  "rtl",
  "process",
  "packages",
  "whatsapp",
  "timeline",
  "munich",
  "ownership",
  "texts",
  "proof",
  "start",
];

export const PACKAGES = [
  { id: "starter", fromEur: 399, name: "Starter" },
  { id: "business", fromEur: 899, name: "Business" },
  { id: "multilingual", fromEur: 1290, name: "Multilingual" },
];

export function whatsappHref(text) {
  return "https://wa.me/" + WHATSAPP_E164 + "?text=" + encodeURIComponent(text);
}

export function whatsappDisplay() {
  return "+" + WHATSAPP_E164.replace(/^(\d{1,3})(\d{2})(\d{3})(\d+)$/, "$1 $2 $3 $4");
}

export function resolveLocale(value) {
  if (value === "de" || value === "en" || value === "prs" || value === "fa") {
    return value;
  }
  return "de";
}

export function isRtl(locale) {
  switch (locale) {
    case "de":
    case "en":
      return false;
    case "prs":
    case "fa":
      return true;
    default: {
      const _exhaustive = locale;
      void _exhaustive;
      return false;
    }
  }
}

export function htmlLang(locale) {
  switch (locale) {
    case "de":
      return "de";
    case "en":
      return "en";
    case "prs":
      return "fa-AF";
    case "fa":
      return "fa-IR";
    default: {
      const _exhaustive = locale;
      void _exhaustive;
      return "de";
    }
  }
}

export function readStoredLang() {
  try {
    return resolveLocale(localStorage.getItem("peivando.lang"));
  } catch {
    return "de";
  }
}

export function writeStoredLang(lang) {
  try {
    localStorage.setItem("peivando.lang", lang);
  } catch {}
}

export function preferredLang() {
  const fromQuery = new URLSearchParams(location.search).get("lang");
  if (fromQuery) return resolveLocale(fromQuery);
  return readStoredLang();
}
