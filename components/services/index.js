import {
  EMAIL,
  INDUSTRIES,
  LOCAL_BUSINESS,
  SERVICE_IDS,
  SERVICES,
  WHATSAPP,
  industryHref,
  isIndustryId,
  isServiceId,
  serviceHref,
} from "./catalog.js";
import { copyFor, messages } from "./copy.js";

export {
  EMAIL,
  INDUSTRIES,
  LOCAL_BUSINESS,
  SERVICE_IDS,
  SERVICES,
  WHATSAPP,
  copyFor,
  industryHref,
  isIndustryId,
  isServiceId,
  messages,
  serviceHref,
};

/**
 * Structured lists the homepage (or other routes) can import
 * without touching page markup. Copy stays in this folder.
 *
 * @param {import("./catalog.js").Locale} [locale]
 */
export function serviceSummaries(locale) {
  const copy = copyFor(locale);
  return SERVICES.map((service) => {
    const item = copy.leistungen.items[service.id];
    return {
      id: service.id,
      num: service.num,
      href: service.href,
      title: item.title,
      lede: item.lede,
      hint: item.hint,
    };
  });
}

/**
 * @param {import("./catalog.js").Locale} [locale]
 */
export function industrySummaries(locale) {
  const copy = copyFor(locale);
  return INDUSTRIES.map((industry) => {
    const item = copy.industries[industry.id];
    return {
      id: industry.id,
      href: industry.href,
      title: item.eyebrow,
      lede: item.h1,
    };
  });
}

/**
 * @param {import("./catalog.js").Locale} [locale]
 */
export function localBusinessPitch(locale) {
  const copy = copyFor(locale);
  return {
    id: LOCAL_BUSINESS.id,
    href: LOCAL_BUSINESS.href,
    includes: LOCAL_BUSINESS.includes,
    eyebrow: copy.package.eyebrow,
    title: copy.package.title,
    lede: copy.package.lede,
    items: copy.package.items,
    note: copy.package.note,
  };
}
