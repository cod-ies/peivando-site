export const DEFAULT_LOCALE = "de";

export const LOCALE_CODES = ["de", "en", "prs", "fa"];

export const RTL_LOCALES = ["prs", "fa"];

export const LOCALES = [
  { code: "de", htmlLang: "de", dir: "ltr", switchLabel: "DE", nativeName: "Deutsch" },
  { code: "en", htmlLang: "en", dir: "ltr", switchLabel: "EN", nativeName: "English" },
  { code: "prs", htmlLang: "prs", dir: "rtl", switchLabel: "دری", nativeName: "دری" },
  { code: "fa", htmlLang: "fa", dir: "rtl", switchLabel: "فارسی", nativeName: "فارسی" },
];

export function isRtl(code) {
  return RTL_LOCALES.includes(code);
}

export function flattenMessages(dict, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(dict)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenMessages(value, path));
    } else if (typeof value === "string") {
      out[path] = value;
    }
  }
  return out;
}
