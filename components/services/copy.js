import { de } from "./copy-de.js";
import { en } from "./copy-en.js";
import { prs } from "./copy-prs.js";
import { fa } from "./copy-fa.js";
import { isLocale } from "./catalog.js";

export const messages = { de, en, prs, fa };

/**
 * @param {string | null | undefined} locale
 */
export function copyFor(locale) {
  if (locale && isLocale(locale)) return messages[locale];
  return messages.de;
}
