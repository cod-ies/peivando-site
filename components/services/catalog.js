/**
 * Owned by the services/industries pages.
 * Homepage and other routes may import these constants; do not move them.
 */

/** @typedef {"website-erstellen" | "landingpage" | "mehrsprachige-website" | "redesign" | "pflege" | "local-seo"} ServiceId */
/** @typedef {"restaurants" | "handwerker" | "aerzte" | "autohaendler" | "friseure" | "lokale-unternehmen"} IndustryId */
/** @typedef {"de" | "en" | "prs" | "fa"} Locale */

export const WHATSAPP = "93747970495";
export const EMAIL = "info@peivando.com";
export const SITE_ORIGIN = "https://peivando.com";

export const SERVICE_IDS = /** @type {const} */ ([
  "website-erstellen",
  "landingpage",
  "mehrsprachige-website",
  "redesign",
  "pflege",
  "local-seo",
]);

export const INDUSTRY_IDS = /** @type {const} */ ([
  "restaurants",
  "handwerker",
  "aerzte",
  "autohaendler",
  "friseure",
  "lokale-unternehmen",
]);

export const LOCALES = /** @type {const} */ (["de", "en", "prs", "fa"]);

export const SERVICES = SERVICE_IDS.map((id, index) => ({
  id,
  num: String(index + 1).padStart(2, "0"),
  href: "/leistungen/#" + id,
}));

export const INDUSTRIES = INDUSTRY_IDS.map((id) => ({
  id,
  href: "/branchen/" + id + "/",
}));

export const LOCAL_BUSINESS = {
  id: "local-business",
  href: "/leistungen/#local-business",
  includes: /** @type {const} */ ([
    "website",
    "maps",
    "whatsapp",
    "form",
  ]),
};

/**
 * @param {string} value
 * @returns {value is ServiceId}
 */
export function isServiceId(value) {
  return SERVICE_IDS.some((id) => id === value);
}

/**
 * @param {string} value
 * @returns {value is IndustryId}
 */
export function isIndustryId(value) {
  return INDUSTRY_IDS.some((id) => id === value);
}

/**
 * @param {string} value
 * @returns {value is Locale}
 */
export function isLocale(value) {
  return LOCALES.some((id) => id === value);
}

/**
 * @param {never} value
 * @returns {never}
 */
export function assertNever(value) {
  throw new Error("Unhandled value: " + String(value));
}

/**
 * @param {IndustryId} id
 */
export function industryHref(id) {
  switch (id) {
    case "restaurants":
    case "handwerker":
    case "aerzte":
    case "autohaendler":
    case "friseure":
    case "lokale-unternehmen":
      return "/branchen/" + id + "/";
    default:
      return assertNever(id);
  }
}

/**
 * @param {ServiceId} id
 */
export function serviceHref(id) {
  switch (id) {
    case "website-erstellen":
    case "landingpage":
    case "mehrsprachige-website":
    case "redesign":
    case "pflege":
    case "local-seo":
      return "/leistungen/#" + id;
    default:
      return assertNever(id);
  }
}
