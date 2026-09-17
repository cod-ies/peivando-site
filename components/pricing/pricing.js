import { COPY } from "./copy.js";
import { PACKAGES, PRICING_CONTACT } from "./packages.js";

const TICK =
  '<svg class="pricing-tick" width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8.5 6 12.5 14 3.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const WA_ICON =
  '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3c-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1Z"/></svg>';

function ensureStylesheet() {
  const href = new URL("./pricing.css", import.meta.url).href;
  if (document.querySelector(`link[data-peivando-pricing="css"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.setAttribute("data-peivando-pricing", "css");
  document.head.appendChild(link);
}

export function readPricingLang() {
  try {
    const stored = localStorage.getItem("peivando.lang");
    if (stored && COPY[stored]) return stored;
  } catch {
    /* localStorage can be blocked */
  }
  const htmlLang = document.documentElement.lang;
  if (htmlLang && COPY[htmlLang]) return htmlLang;
  return "de";
}

export function priceLabel(amount, lang) {
  switch (lang) {
    case "en":
      return { prefix: "from", amount: `€${amount.toLocaleString("en-GB")}` };
    case "fa":
    case "prs":
      return { prefix: "از", amount: `${amount.toLocaleString("fa-AF")} €` };
    case "de":
    default:
      return { prefix: "ab", amount: `€${amount.toLocaleString("de-DE")}` };
  }
}

function whatsappHref(lang, packageName) {
  const copy = COPY[lang] || COPY.de;
  const text = copy.waText.replace("{name}", packageName);
  return `https://wa.me/${PRICING_CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderCard(pkg, copy, lang) {
  const packCopy = copy.packages[pkg.id];
  const price = priceLabel(pkg.priceEur, lang);
  const features = pkg.featureKeys
    .map((key) => copy.features[key])
    .filter(Boolean)
    .map((label) => `<li>${TICK}<span>${escapeHtml(label)}</span></li>`)
    .join("");
  const badge = pkg.featured
    ? `<p class="pricing-badge">${escapeHtml(copy.featured)}</p>`
    : `<p class="pricing-badge is-empty" aria-hidden="true"></p>`;
  const contact = `/?paket=${encodeURIComponent(pkg.id)}#contact`;

  return `<article class="pricing-card${pkg.featured ? " is-featured" : ""}" data-package="${pkg.id}">
    ${badge}
    <p class="mono pricing-kind">${escapeHtml(packCopy.kind)}</p>
    <h3>${escapeHtml(packCopy.name)}</h3>
    <p class="pricing-audience">${escapeHtml(packCopy.audience)}</p>
    <p class="pricing-price">
      <span class="mono pricing-price-prefix">${escapeHtml(price.prefix)}</span>
      <span class="pricing-amount">${escapeHtml(price.amount)}</span>
      <span class="mono pricing-once">${escapeHtml(copy.once)}</span>
    </p>
    <ul class="pricing-features">${features}</ul>
    <a class="btn ${pkg.featured ? "btn-fill" : "btn-line"}" href="${contact}">${escapeHtml(copy.ctaCard)}</a>
  </article>`;
}

export function renderPricing(lang, options) {
  const copy = COPY[lang] || COPY.de;
  const cards = PACKAGES.map((pkg) => renderCard(pkg, copy, lang)).join("");
  const notes = copy.notes
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");
  const dir = lang === "fa" || lang === "prs" ? "rtl" : "ltr";
  const primaryWa = whatsappHref(lang, copy.packages.business.name);
  const heading = options?.heading === "h1" ? "h1" : "h2";

  return `<section class="pricing-section" dir="${dir}" lang="${lang === "prs" ? "fa" : lang}" aria-labelledby="pricing-title">
    <div class="wrap">
      <div class="pricing-head">
        <p class="mono">${escapeHtml(copy.eyebrow)}</p>
        <${heading} id="pricing-title">${escapeHtml(copy.title)}</${heading}>
        <p class="lede">${escapeHtml(copy.lede)}</p>
        <div class="pricing-meta">
          <span class="mono">${escapeHtml(copy.meta1)}</span>
          <span class="mono">${escapeHtml(copy.meta2)}</span>
          <span class="mono">${escapeHtml(copy.meta3)}</span>
        </div>
      </div>
      <div class="pricing-grid">${cards}</div>
      <div class="pricing-notes">
        <h3>${escapeHtml(copy.notesTitle)}</h3>
        <ul>${notes}</ul>
      </div>
      <div class="pricing-cta">
        <a class="btn btn-fill" href="${PRICING_CONTACT.contactHref}">${escapeHtml(copy.ctaPrimary)}</a>
        <a class="btn btn-line" href="${primaryWa}">${WA_ICON}<span>${escapeHtml(copy.ctaWhatsapp)}</span></a>
      </div>
    </div>
  </section>`;
}

export function mountPricing(root, options) {
  if (!root) return null;
  ensureStylesheet();
  const lang = options?.lang || readPricingLang();
  const heading = options?.heading || root.getAttribute?.("heading") || "h2";
  root.innerHTML = renderPricing(lang, { heading });
  return root;
}

class PeivandoPricing extends HTMLElement {
  connectedCallback() {
    this._onLang = () => {
      mountPricing(this, {
        lang: readPricingLang(),
        heading: this.getAttribute("heading") || "h2",
      });
    };
    mountPricing(this, {
      lang: this.getAttribute("lang") || readPricingLang(),
      heading: this.getAttribute("heading") || "h2",
    });
    window.addEventListener("peivando:lang", this._onLang);
    window.addEventListener("storage", this._onLang);
  }

  disconnectedCallback() {
    window.removeEventListener("peivando:lang", this._onLang);
    window.removeEventListener("storage", this._onLang);
  }

  static get observedAttributes() {
    return ["lang", "heading"];
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue || !this.isConnected) return;
    mountPricing(this, {
      lang: this.getAttribute("lang") || readPricingLang(),
      heading: this.getAttribute("heading") || "h2",
    });
  }
}

if (!customElements.get("peivando-pricing")) {
  customElements.define("peivando-pricing", PeivandoPricing);
}
