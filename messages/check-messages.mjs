import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const LOCALE_CODES = ["de", "en", "prs", "fa"];

const LIVE_DATA_I_KEYS = [
  "nav.services",
  "nav.process",
  "nav.languages",
  "nav.contact",
  "hero.eyebrow",
  "hero.title",
  "hero.lede",
  "hero.cta1",
  "hero.cta2",
  "hero.m1",
  "hero.m2",
  "hero.m3",
  "band.label",
  "svc.eyebrow",
  "svc.title",
  "svc.1.t",
  "svc.1.d",
  "svc.1.p",
  "svc.2.t",
  "svc.2.d",
  "svc.2.p",
  "svc.3.t",
  "svc.3.d",
  "svc.3.p",
  "svc.4.t",
  "svc.4.d",
  "svc.4.p",
  "proc.eyebrow",
  "proc.title",
  "proc.lede",
  "proc.1.t",
  "proc.1.d",
  "proc.2.t",
  "proc.2.d",
  "proc.3.t",
  "proc.3.d",
  "proc.4.t",
  "proc.4.d",
  "lng.eyebrow",
  "lng.title",
  "lng.lede",
  "lng.hint",
  "lng.1.t",
  "lng.1.d",
  "lng.2.t",
  "lng.2.d",
  "lng.3.t",
  "lng.3.d",
  "dm.brand",
  "dm.n1",
  "dm.n2",
  "dm.n3",
  "dm.h",
  "dm.p",
  "dm.btn",
  "dm.t1",
  "dm.t2",
  "dm.t3",
  "con.eyebrow",
  "con.title",
  "con.lede",
  "con.mail",
  "f.name",
  "f.mail",
  "f.kind",
  "f.msg",
  "f.k1",
  "f.k2",
  "f.k3",
  "f.k4",
  "f.k5",
  "f.send",
  "f.privacy",
  "foot.imp",
  "foot.dse",
];

const REQUIRED_NEW_KEYS = [
  "nav.projects",
  "nav.pricing",
  "nav.about",
  "lang.fa",
  "lang.prs",
  "cta.consult",
  "cta.projects",
  "cta.offer",
  "pkg.starter.price",
  "pkg.business.price",
  "pkg.multilingual.price",
  "legal.imprintTitle",
  "legal.privacyTitle",
  "projects.concept",
  "config.cta",
];

function flattenMessages(dict, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(dict)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenMessages(value, path));
    } else {
      out[path] = value;
    }
  }
  return out;
}

function load(name) {
  return JSON.parse(readFileSync(join(dir, name), "utf8"));
}

const dicts = Object.fromEntries(
  LOCALE_CODES.map((code) => [code, load(`${code}.json`)])
);
const baseKeys = Object.keys(flattenMessages(dicts.de)).sort();

for (const code of LOCALE_CODES) {
  const flat = flattenMessages(dicts[code]);
  const keys = Object.keys(flat).sort();
  const missing = baseKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !baseKeys.includes(key));
  if (missing.length || extra.length) {
    throw new Error(`${code} key mismatch\n missing: ${missing}\n extra: ${extra}`);
  }
  for (const key of keys) {
    const value = flat[key];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${code}: empty value at ${key}`);
    }
    if (/US\$|Impressum ergänzen|Datenschutz ergänzen/.test(value)) {
      throw new Error(`${code}: stale copy at ${key}: ${value}`);
    }
  }
  for (const key of [...LIVE_DATA_I_KEYS, ...REQUIRED_NEW_KEYS]) {
    if (flat[key] == null) {
      throw new Error(`${code}: missing ${key}`);
    }
  }
}

const registry = load("locales.json");
const codes = registry.locales.map((item) => item.code);
if (JSON.stringify(codes) !== JSON.stringify(LOCALE_CODES)) {
  throw new Error(`locales.json codes ${codes} != ${LOCALE_CODES}`);
}
if (!codes.includes("fa") || !codes.includes("prs")) {
  throw new Error("expected fa and prs locales");
}

console.log(`ok ${baseKeys.length} keys × ${LOCALE_CODES.join(", ")}`);
