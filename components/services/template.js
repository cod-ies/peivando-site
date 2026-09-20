import {
  INDUSTRY_IDS,
  SERVICE_IDS,
  SITE_ORIGIN,
  WHATSAPP,
  assertNever,
} from "./catalog.js";
import { de } from "./copy-de.js";

const WA_HREF = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(de.waText);

/**
 * @param {string} value
 */
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LOGO = `<svg width="27" height="27" viewBox="0 0 40 40" aria-hidden="true">
  <g fill="none" stroke="var(--teal)" stroke-width="1.5" stroke-linecap="round">
    <path d="M20 20 20 8M20 20 30.4 14M20 20 30.4 26M20 20 20 32M20 20 9.6 26M20 20 9.6 14" opacity=".5"/>
    <path d="M20 8 30.4 14 30.4 26 20 32 9.6 26 9.6 14Z" opacity=".28"/>
  </g>
  <g fill="var(--teal)">
    <circle cx="20" cy="8" r="2.3"/><circle cx="30.4" cy="14" r="2.3"/><circle cx="30.4" cy="26" r="2.3"/>
    <circle cx="20" cy="32" r="2.3"/><circle cx="9.6" cy="26" r="2.3"/><circle cx="9.6" cy="14" r="2.3"/>
    <circle cx="20" cy="20" r="3.9"/>
  </g>
</svg>`;

const TICK = `<svg class="tick" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8.5 6 12.5 14 3.5" fill="none" stroke="var(--teal)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const WA_ICON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3c-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1Z"/></svg>`;

/**
 * @param {"leistungen" | "branchen" | "industry"} current
 */
function header(current) {
  const servicesCurrent = current === "leistungen" ? ' aria-current="page"' : "";
  const industriesCurrent = current === "branchen" || current === "industry" ? ' aria-current="page"' : "";
  return `<a class="skip" href="#main">Zum Inhalt</a>
<header class="head" id="head">
  <div class="wrap head-in">
    <a class="brand" href="/" aria-label="Peivando">${LOGO}<b>Peivando</b></a>
    <nav class="nav" aria-label="Seite">
      <a href="/leistungen/"${servicesCurrent} data-i="nav.services">${esc(de.nav.services)}</a>
      <a href="/branchen/"${industriesCurrent} data-i="nav.industries">${esc(de.nav.industries)}</a>
      <a href="/#contact" data-i="nav.contact">${esc(de.nav.contact)}</a>
    </nav>
    <div class="langs" role="group" aria-label="Sprache / Language" data-i="nav.lang" data-i-attr="aria-label">
      <button type="button" data-l="de" aria-pressed="true">DE</button>
      <button type="button" data-l="en" aria-pressed="false">EN</button>
      <button type="button" data-l="prs" aria-pressed="false">دری</button>
      <button type="button" data-l="fa" aria-pressed="false">فارسی</button>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<footer>
  <div class="wrap foot">
    <p class="mono">© <span id="yr">2026</span> Peivando · <span data-i="foot.legal">${esc(de.foot.legal)}</span></p>
    <div class="links">
      <a class="mono" href="/#contact" data-i="nav.contact">${esc(de.nav.contact)}</a>
      <a class="mono" href="/leistungen/" data-i="nav.services">${esc(de.nav.services)}</a>
      <a class="mono" href="/branchen/" data-i="nav.industries">${esc(de.nav.industries)}</a>
    </div>
  </div>
</footer>`;
}

function ticks() {
  return `<div class="ticks">${de.ticks.map((label, index) =>
    `<span data-i="ticks.${index}">${esc(label)}</span>`
  ).join("")}</div>`;
}

function ctaRow(extraHref, extraKey, extraLabel) {
  return `<div class="cta">
    <a class="btn btn-fill" href="/#contact">
      <span data-i="cta.talk">${esc(de.cta.talk)}</span>
    </a>
    <a class="btn btn-line" data-wa href="${WA_HREF}">
      ${WA_ICON}
      <span data-i="cta.whatsapp">${esc(de.cta.whatsapp)}</span>
    </a>
    <a class="btn btn-line" href="${extraHref}">
      <span data-i="${extraKey}">${esc(extraLabel)}</span>
    </a>
  </div>`;
}

function packageBlock() {
  const items = de.package.items.map((item, index) => `<li>
    ${TICK}
    <div>
      <strong data-i="package.items.${index}.t">${esc(item.t)}</strong>
      <span data-i="package.items.${index}.d">${esc(item.d)}</span>
    </div>
  </li>`).join("");
  return `<section id="local-business" class="wrap">
    <article class="pkg">
      <p class="mono" data-i="package.eyebrow">${esc(de.package.eyebrow)}</p>
      <h2 data-i="package.title">${esc(de.package.title)}</h2>
      <p class="lede" data-i="package.lede">${esc(de.package.lede)}</p>
      <ul class="feat">${items}</ul>
      <p class="note" data-i="package.note">${esc(de.package.note)}</p>
      <div class="cta">
        <a class="btn btn-fill" href="/#contact"><span data-i="cta.talk">${esc(de.cta.talk)}</span></a>
      </div>
    </article>
  </section>`;
}

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.titleKey
 * @param {string} opts.description
 * @param {string} opts.descriptionKey
 * @param {string} opts.canonical
 * @param {string} opts.jsonLd
 * @param {"leistungen" | "branchen" | "industry"} opts.nav
 * @param {string} opts.main
 */
export function pageShell(opts) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title data-i="${opts.titleKey}">${esc(opts.title)}</title>
<meta name="description" data-i="${opts.descriptionKey}" content="${esc(opts.description)}">
<meta name="theme-color" content="#F7F9FD">
<link rel="canonical" href="${esc(opts.canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Peivando">
<meta property="og:title" data-i="${opts.titleKey}" data-i-attr="content" content="${esc(opts.title)}">
<meta property="og:description" data-i="${opts.descriptionKey}" data-i-attr="content" content="${esc(opts.description)}">
<meta property="og:url" content="${esc(opts.canonical)}">
<meta property="og:locale" content="de_DE">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='9' fill='%23050C12'/%3E%3Cg fill='%233ACFB6'%3E%3Ccircle cx='20' cy='9' r='2.2'/%3E%3Ccircle cx='29.5' cy='14.5' r='2.2'/%3E%3Ccircle cx='29.5' cy='25.5' r='2.2'/%3E%3Ccircle cx='20' cy='31' r='2.2'/%3E%3Ccircle cx='10.5' cy='25.5' r='2.2'/%3E%3Ccircle cx='10.5' cy='14.5' r='2.2'/%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3C/g%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Vazirmatn:wght@400;500;700&display=swap">
<link rel="stylesheet" href="/components/services/styles.css">
<script type="application/ld+json">${opts.jsonLd}</script>
</head>
<body dir="ltr">
${header(opts.nav)}
<main id="main">
${opts.main}
</main>
${footer()}
<script type="module" src="/components/services/client.js"></script>
</body>
</html>
`;
}

export function leistungenPage() {
  const page = de.leistungen;
  const items = SERVICE_IDS.map((id, index) => {
    const item = page.items[id];
    const points = item.points.map((point, pointIndex) =>
      `<span data-i="leistungen.items.${id}.points.${pointIndex}">${esc(point)}</span>`
    ).join("");
    return `<article class="svc" id="${id}">
      <span class="num">${String(index + 1).padStart(2, "0")}</span>
      <div class="svc-b">
        <h3 data-i="leistungen.items.${id}.title">${esc(item.title)}</h3>
        <p data-i="leistungen.items.${id}.lede">${esc(item.lede)}</p>
        <div class="svc-points">${points}</div>
      </div>
      <span class="price" data-i="leistungen.items.${id}.hint">${esc(item.hint)}</span>
    </article>`;
  }).join("\n");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.metaTitle,
    itemListElement: SERVICE_IDS.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.items[id].title,
      url: SITE_ORIGIN + "/leistungen/#" + id,
    })),
  });

  const main = `<div class="hero">
    <div class="wrap">
      <p class="mono" data-i="leistungen.eyebrow">${esc(page.eyebrow)}</p>
      <h1 data-i="leistungen.h1">${esc(page.h1)}</h1>
      <p class="lede" data-i="leistungen.lede">${esc(page.lede)}</p>
      ${ctaRow("/branchen/", "cta.industries", de.cta.industries)}
      ${ticks()}
    </div>
  </div>
  <section class="wrap">
    ${items}
  </section>
  ${packageBlock()}
  <section class="contact">
    <div class="wrap">
      <p class="mono" data-i="nav.contact">${esc(de.nav.contact)}</p>
      <h2 data-i="cta.talk">${esc(de.cta.talk)}</h2>
      <div class="cta">
        <a class="btn btn-fill" href="/#contact"><span data-i="cta.talk">${esc(de.cta.talk)}</span></a>
        <a class="btn btn-line" data-wa href="${WA_HREF}"><span data-i="cta.whatsapp">${esc(de.cta.whatsapp)}</span></a>
      </div>
    </div>
  </section>`;

  return pageShell({
    title: page.metaTitle,
    titleKey: "leistungen.metaTitle",
    description: page.metaDescription,
    descriptionKey: "leistungen.metaDescription",
    canonical: SITE_ORIGIN + "/leistungen/",
    jsonLd,
    nav: "leistungen",
    main,
  });
}

export function branchenIndexPage() {
  const page = de.branchen;
  const cards = INDUSTRY_IDS.map((id) => {
    const item = de.industries[id];
    return `<a class="ind-card" href="/branchen/${id}/">
      <p class="mono" data-i="industries.${id}.eyebrow">${esc(item.eyebrow)}</p>
      <h3 data-i="industries.${id}.h1">${esc(item.h1)}</h3>
    </a>`;
  }).join("\n");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.metaTitle,
    itemListElement: INDUSTRY_IDS.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: de.industries[id].eyebrow,
      url: SITE_ORIGIN + "/branchen/" + id + "/",
    })),
  });

  const main = `<div class="hero">
    <div class="wrap">
      <p class="mono" data-i="branchen.eyebrow">${esc(page.eyebrow)}</p>
      <h1 data-i="branchen.h1">${esc(page.h1)}</h1>
      <p class="lede" data-i="branchen.lede">${esc(page.lede)}</p>
      ${ctaRow("/leistungen/#local-business", "cta.package", de.cta.package)}
      ${ticks()}
    </div>
  </div>
  <section class="wrap">
    <div class="ind-grid">${cards}</div>
  </section>
  ${packageBlock()}
  <section class="contact">
    <div class="wrap">
      <p class="mono" data-i="nav.contact">${esc(de.nav.contact)}</p>
      <h2 data-i="cta.talk">${esc(de.cta.talk)}</h2>
      <div class="cta">
        <a class="btn btn-fill" href="/#contact"><span data-i="cta.talk">${esc(de.cta.talk)}</span></a>
        <a class="btn btn-line" data-wa href="${WA_HREF}"><span data-i="cta.whatsapp">${esc(de.cta.whatsapp)}</span></a>
      </div>
    </div>
  </section>`;

  return pageShell({
    title: page.metaTitle,
    titleKey: "branchen.metaTitle",
    description: page.metaDescription,
    descriptionKey: "branchen.metaDescription",
    canonical: SITE_ORIGIN + "/branchen/",
    jsonLd,
    nav: "branchen",
    main,
  });
}

/**
 * @param {import("./catalog.js").IndustryId} id
 */
export function industryPage(id) {
  const item = de.industries[id];
  if (!item) return assertNever(/** @type {never} */ (id));

  const pains = item.pains.map((pain, index) => `<div class="pain">
    <h3 data-i="industries.${id}.pains.${index}.t">${esc(pain.t)}</h3>
    <p data-i="industries.${id}.pains.${index}.d">${esc(pain.d)}</p>
  </div>`).join("");

  const outcomes = item.outcomes.map((outcome, index) => `<div class="win">
    <h3 data-i="industries.${id}.outcomes.${index}.t">${esc(outcome.t)}</h3>
    <p data-i="industries.${id}.outcomes.${index}.d">${esc(outcome.d)}</p>
  </div>`).join("");

  const others = INDUSTRY_IDS.filter((other) => other !== id).map((other) => {
    const copy = de.industries[other];
    return `<a class="ind-card" href="/branchen/${other}/">
      <p class="mono" data-i="industries.${other}.eyebrow">${esc(copy.eyebrow)}</p>
      <h3 data-i="industries.${other}.h1">${esc(copy.h1)}</h3>
    </a>`;
  }).join("");

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.metaTitle,
    description: item.metaDescription,
    url: SITE_ORIGIN + "/branchen/" + id + "/",
    provider: { "@type": "ProfessionalService", name: "Peivando", url: SITE_ORIGIN + "/" },
    areaServed: { "@type": "City", name: "München" },
    audience: { "@type": "Audience", audienceType: item.eyebrow },
  });

  const main = `<div class="hero">
    <div class="wrap">
      <p class="mono"><a href="/branchen/" data-i="nav.industries">${esc(de.nav.industries)}</a> · <span data-i="industries.${id}.eyebrow">${esc(item.eyebrow)}</span></p>
      <h1 data-i="industries.${id}.h1">${esc(item.h1)}</h1>
      <p class="lede" data-i="industries.${id}.lede">${esc(item.lede)}</p>
      ${ctaRow("/leistungen/#local-business", "cta.package", de.cta.package)}
      ${ticks()}
    </div>
  </div>
  <section class="wrap">
    <div class="split">
      <div class="stack">
        <p class="mono" data-i="industries.${id}.painsTitle">${esc(item.painsTitle)}</p>
        ${pains}
      </div>
      <div class="stack">
        <p class="mono" data-i="industries.${id}.outcomesTitle">${esc(item.outcomesTitle)}</p>
        ${outcomes}
      </div>
    </div>
  </section>
  ${packageBlock()}
  <section class="wrap">
    <div class="sec-head">
      <p class="mono" data-i="nav.industries">${esc(de.nav.industries)}</p>
    </div>
    <div class="ind-grid">${others}</div>
  </section>
  <section class="contact">
    <div class="wrap">
      <div class="cta">
        <a class="btn btn-fill" href="/#contact"><span data-i="cta.talk">${esc(de.cta.talk)}</span></a>
        <a class="btn btn-line" data-wa href="${WA_HREF}"><span data-i="cta.whatsapp">${esc(de.cta.whatsapp)}</span></a>
      </div>
    </div>
  </section>`;

  return pageShell({
    title: item.metaTitle,
    titleKey: `industries.${id}.metaTitle`,
    description: item.metaDescription,
    descriptionKey: `industries.${id}.metaDescription`,
    canonical: SITE_ORIGIN + "/branchen/" + id + "/",
    jsonLd,
    nav: "industry",
    main,
  });
}
