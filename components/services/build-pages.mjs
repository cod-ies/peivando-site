import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { INDUSTRY_IDS, assertNever } from "./catalog.js";
import { messages } from "./copy.js";
import { branchenIndexPage, industryPage, leistungenPage } from "./template.js";

/**
 * @param {unknown} expected
 * @param {unknown} actual
 * @param {string} path
 * @param {string[]} missing
 */
function collectMissingKeys(expected, actual, path, missing) {
  if (expected && typeof expected === "object") {
    if (!actual || typeof actual !== "object") {
      missing.push(path || "(root)");
      return;
    }
    for (const key of Object.keys(expected)) {
      collectMissingKeys(expected[key], actual[key], path ? path + "." + key : key, missing);
    }
    return;
  }
  if (typeof expected === "string" && typeof actual !== "string") missing.push(path);
}

for (const locale of /** @type {const} */ (["en", "prs", "fa"])) {
  const missing = [];
  collectMissingKeys(messages.de, messages[locale], "", missing);
  if (missing.length) {
    throw new Error("Missing copy keys in " + locale + ": " + missing.join(", "));
  }
}

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * @param {string} rel
 * @param {string} html
 */
async function writePage(rel, html) {
  const path = join(root, rel);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, html, "utf8");
}

await writePage("leistungen/index.html", leistungenPage());
await writePage("branchen/index.html", branchenIndexPage());

for (const id of INDUSTRY_IDS) {
  switch (id) {
    case "restaurants":
    case "handwerker":
    case "aerzte":
    case "autohaendler":
    case "friseure":
    case "lokale-unternehmen":
      await writePage("branchen/" + id + "/index.html", industryPage(id));
      break;
    default:
      assertNever(id);
  }
}
