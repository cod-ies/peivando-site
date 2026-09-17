import { PROJECTS, LANGUAGE_LABELS } from "./data.js";
import { escapeHtml } from "./html.js";
import { PAGE_COPY } from "./i18n.js";
import {
  LANGS,
  applyDocumentLang,
  normalizeLang,
  readStoredLang,
  storeLang,
  t,
} from "./lang.js";

function copy(lang) {
  return PAGE_COPY[normalizeLang(lang)] || PAGE_COPY.de;
}

function padNum(index) {
  return String(index + 1).padStart(2, "0");
}

function languageChips(project) {
  return project.languages
    .map((code) => LANGUAGE_LABELS[code] || code)
    .map((label) => `<li>${escapeHtml(label)}</li>`)
    .join("");
}

function featureList(project, lang) {
  const items = t(project.features, lang);
  if (!Array.isArray(items)) return "";
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderCard(project, index, lang) {
  const strings = copy(lang);
  const view = project.href
    ? `<a class="btn btn-line" href="${escapeHtml(project.href)}">${escapeHtml(strings["card.view"])}</a>`
    : "";

  return `<article class="card" id="${escapeHtml(project.id)}">
    <div class="card-top">
      <span class="num">${padNum(index)}</span>
      <span class="badge">${escapeHtml(strings["card.concept"])}</span>
    </div>
    <h2>${escapeHtml(t(project.name, lang))}</h2>
    <p class="sector">${escapeHtml(t(project.sector, lang))}</p>
    <p class="summary">${escapeHtml(t(project.summary, lang))}</p>
    <p class="sub">${escapeHtml(strings["card.languages"])}</p>
    <ul class="chips">${languageChips(project)}</ul>
    <p class="sub">${escapeHtml(strings["card.features"])}</p>
    <ul class="feat-list">${featureList(project, lang)}</ul>
    ${view}
  </article>`;
}

function applyStaticCopy(lang) {
  const strings = copy(lang);
  document.title = strings["meta.title"];
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", strings["meta.description"]);

  document.querySelectorAll("[data-i]").forEach((el) => {
    const key = el.getAttribute("data-i");
    if (key && strings[key] != null) el.innerHTML = strings[key];
  });
  document.querySelectorAll("[data-i-aria]").forEach((el) => {
    const key = el.getAttribute("data-i-aria");
    if (key && strings[key] != null) el.setAttribute("aria-label", strings[key]);
  });
}

function renderGrid(lang) {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map((project, index) => renderCard(project, index, lang)).join("");
}

function syncLangButtons(lang) {
  document.querySelectorAll(".langs button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.l === lang));
  });
}

export function setProjectsLang(lang, persist) {
  const resolved = applyDocumentLang(lang);
  if (persist !== false) storeLang(resolved);
  applyStaticCopy(resolved);
  renderGrid(resolved);
  syncLangButtons(resolved);
  return resolved;
}

export function mountProjectsPage() {
  const initial = readStoredLang();
  setProjectsLang(initial, false);

  document.querySelectorAll(".langs button").forEach((button) => {
    button.addEventListener("click", () => {
      const next = normalizeLang(button.dataset.l);
      if (!LANGS.includes(next)) return;
      setProjectsLang(next, true);
    });
  });

  const head = document.getElementById("head");
  if (head) {
    const onScroll = () => {
      head.classList.toggle("stuck", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
}
