import { PROJECTS } from "./data.js";
import { DEMOS, DEMO_SHELL } from "./demo-data.js";
import { escapeHtml } from "./html.js";
import {
  applyDocumentLang,
  normalizeLang,
  readStoredLang,
  storeLang,
  t,
} from "./lang.js";

function shellCopy(lang) {
  return DEMO_SHELL[normalizeLang(lang)] || DEMO_SHELL.de;
}

function availableLangs(demoId) {
  const project = PROJECTS.find((item) => item.id === demoId);
  return project ? project.languages : ["de"];
}

function pickLang(demoId, requested) {
  const allowed = availableLangs(demoId);
  const normalized = normalizeLang(requested);
  return allowed.includes(normalized) ? normalized : allowed[0];
}

function renderSection(section, lang) {
  const items = (section.items || [])
    .map(
      (item) => `<article class="card">
        <h3>${escapeHtml(t(item.title, lang))}</h3>
        <p>${escapeHtml(t(item.text, lang))}</p>
      </article>`,
    )
    .join("");

  return `<section class="section wrap" id="${escapeHtml(section.id)}">
    <h2>${escapeHtml(t(section.title, lang))}</h2>
    <div class="cards">${items}</div>
  </section>`;
}

function renderDemo(root, demoId, lang) {
  const demo = DEMOS[demoId];
  const strings = shellCopy(lang);
  const langs = availableLangs(demoId);
  const nav = (demo.nav || []).map((item) => `<span>${escapeHtml(t(item, lang))}</span>`).join("");
  const buttons = langs
    .map((code) => {
      const label = code === "de" ? "DE" : code === "en" ? "EN" : code === "prs" ? "دری" : "فارسی";
      return `<button type="button" data-l="${code}" aria-pressed="${code === lang ? "true" : "false"}">${label}</button>`;
    })
    .join("");

  root.innerHTML = `
    <div class="banner">
      <div class="banner-in">
        <span>${escapeHtml(strings.banner)}</span>
        <a href="/projekte/">${escapeHtml(strings.back)}</a>
      </div>
    </div>
    <header class="wrap top">
      <a class="brand" href="/projekte/${escapeHtml(demoId)}/">${escapeHtml(t(demo.brand, lang))}</a>
      <nav class="nav" aria-label="${escapeHtml(t(demo.brand, lang))}">${nav}</nav>
      <div class="langs" role="group" aria-label="${escapeHtml(strings.langs)}">${buttons}</div>
    </header>
    <main>
      <section class="hero wrap">
        <p class="kicker">${escapeHtml(t(demo.hero.kicker, lang))}</p>
        <h1>${escapeHtml(t(demo.hero.h, lang))}</h1>
        <p class="lede">${escapeHtml(t(demo.hero.p, lang))}</p>
        <a class="btn" href="/#contact">${escapeHtml(t(demo.hero.cta, lang))}</a>
      </section>
      ${(demo.sections || []).map((section) => renderSection(section, lang)).join("")}
    </main>
    <footer class="demo-foot">
      <div class="wrap">
        <a href="/#contact">${escapeHtml(strings.peivandoCta)}</a>
      </div>
    </footer>`;
}

export function mountDemo(demoId) {
  const demo = DEMOS[demoId];
  if (!demo) {
    document.body.textContent = "Unknown concept project.";
    return;
  }

  document.body.setAttribute("data-theme", demo.theme);
  const root = document.getElementById("demo-root") || document.body;

  const apply = (requested, persist) => {
    const lang = pickLang(demoId, requested);
    applyDocumentLang(lang);
    if (persist !== false) storeLang(lang);
    document.title = t(demo.title, lang);
    renderDemo(root, demoId, lang);
    root.querySelectorAll(".langs button").forEach((button) => {
      button.addEventListener("click", () => apply(button.dataset.l, true));
    });
  };

  apply(readStoredLang(), false);
}
