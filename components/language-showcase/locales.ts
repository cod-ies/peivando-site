import type { LocaleMeta, ShowcaseLocale } from "./types";

export const LOCALES: readonly ShowcaseLocale[] = ["de", "en", "prs", "fa"];

export function getLocaleMeta(locale: ShowcaseLocale): LocaleMeta {
  switch (locale) {
    case "de":
      return {
        id: "de",
        dir: "ltr",
        htmlLang: "de",
        shortLabel: "DE",
        name: "Deutsch",
        script: "latin",
      };
    case "en":
      return {
        id: "en",
        dir: "ltr",
        htmlLang: "en",
        shortLabel: "EN",
        name: "English",
        script: "latin",
      };
    case "prs":
      return {
        id: "prs",
        dir: "rtl",
        htmlLang: "prs",
        shortLabel: "دری",
        name: "دری",
        script: "arabic",
      };
    case "fa":
      return {
        id: "fa",
        dir: "rtl",
        htmlLang: "fa",
        shortLabel: "فارسی",
        name: "فارسی",
        script: "arabic",
      };
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unhandled showcase locale: ${String(_exhaustive)}`);
    }
  }
}

export function isRtlLocale(locale: ShowcaseLocale): boolean {
  return getLocaleMeta(locale).dir === "rtl";
}

export function cycleLocale(current: ShowcaseLocale, delta: number): ShowcaseLocale {
  const index = LOCALES.indexOf(current);
  const next = LOCALES[(index + delta + LOCALES.length) % LOCALES.length];
  return next ?? current;
}
