import { CONTACT_CONFIG, NEED_KIND_DE } from "./config.js";
import { CONTACT_STRINGS, UI_LANG_ATTR } from "./strings.js";

const LANG_KEY = "peivando.lang";

function t(lang, key) {
  const dict = CONTACT_STRINGS[lang] || CONTACT_STRINGS.de;
  return dict[key] ?? CONTACT_STRINGS.de[key] ?? key;
}

function readLang() {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && CONTACT_STRINGS[stored]) return stored;
  } catch {
    /* private mode */
  }
  return "de";
}

function writeLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* private mode */
  }
}

function selectedRadio(form, name) {
  const el = form.querySelector('input[type="radio"][name="' + name + '"]:checked');
  return el ? el.value : "";
}

function selectedLanguages(form) {
  return Array.from(form.querySelectorAll('input[name="languages"]:checked')).map(
    function (el) {
      return el.value;
    }
  );
}

function control(form, name) {
  return form.elements.namedItem(name);
}

function controlValue(form, name) {
  const el = control(form, name);
  if (!el) return "";
  return String(el.value || "").trim();
}

function formatWhatsAppNumber(digits) {
  if (digits.startsWith("93") && digits.length >= 11) {
    return (
      "+93 " +
      digits.slice(2, 4) +
      " " +
      digits.slice(4, 7) +
      " " +
      digits.slice(7)
    );
  }
  return "+" + digits;
}

function whatsAppUrl(text) {
  return (
    "https://wa.me/" +
    CONTACT_CONFIG.whatsapp +
    "?text=" +
    encodeURIComponent(text || "")
  );
}

function mailUrl(body) {
  return (
    "mailto:" +
    CONTACT_CONFIG.email +
    "?subject=" +
    encodeURIComponent("Website-Anfrage / Website enquiry") +
    "&body=" +
    encodeURIComponent(body || "")
  );
}

function openUrl(url) {
  if (!url) return false;
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (win) return true;
  window.location.assign(url);
  return true;
}

export function composeEnquiry(form, lang) {
  const need = selectedRadio(form, "need");
  const pages = selectedRadio(form, "pages");
  const budget = selectedRadio(form, "budget");
  const languages = selectedLanguages(form);
  const notes = controlValue(form, "notes");
  const name = controlValue(form, "name");
  const contact = controlValue(form, "contact");
  const lines = [
    t(lang, "wa.prefill"),
    "",
    t(lang, "f.name") + ": " + (name || "—"),
    t(lang, "f.mail") + ": " + (contact || "—"),
    t(lang, "f.need") + ": " + (need ? t(lang, "f.need." + need) : "—"),
    t(lang, "f.pages") + ": " + (pages ? t(lang, "f.pages." + pages) : "—"),
    t(lang, "f.langs") + ": " +
      (languages.length
        ? languages.map(function (code) {
            return t(lang, "f.langs." + code);
          }).join(", ")
        : "—"),
    t(lang, "f.budget") + ": " + (budget ? t(lang, "f.budget." + budget) : "—"),
  ];
  if (notes) lines.push("", notes);
  return {
    need: need,
    pages: pages,
    budget: budget,
    languages: languages,
    notes: notes,
    name: name,
    contact: contact,
    kind: NEED_KIND_DE[need] || need,
    message: lines.join("\n"),
  };
}

export function recapText(form, lang) {
  const enquiry = composeEnquiry(form, lang);
  const parts = [];
  if (enquiry.need) parts.push(t(lang, "f.need." + enquiry.need));
  if (enquiry.pages) parts.push(t(lang, "f.pages." + enquiry.pages));
  if (enquiry.languages.length) {
    parts.push(
      enquiry.languages
        .map(function (code) {
          return t(lang, "f.langs." + code);
        })
        .join(", ")
    );
  }
  if (enquiry.budget) parts.push(t(lang, "f.budget." + enquiry.budget));
  return parts.length ? parts.join(" · ") : t(lang, "recap.empty");
}

function applyStrings(root, lang) {
  const dict = CONTACT_STRINGS[lang] || CONTACT_STRINGS.de;
  root.querySelectorAll("[data-i]").forEach(function (el) {
    const key = el.getAttribute("data-i");
    if (dict[key] != null) el.textContent = dict[key];
  });
  root.querySelectorAll("[data-i-aria]").forEach(function (el) {
    const key = el.getAttribute("data-i-aria");
    if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
  });
  const title = dict["meta.title"];
  if (title) document.title = title;
  const attr = UI_LANG_ATTR[lang] || UI_LANG_ATTR.de;
  document.documentElement.lang = attr.lang;
  document.documentElement.dir = attr.dir;
  document.body.dir = attr.dir;
  document.body.setAttribute("dir", attr.dir);
  root.querySelectorAll(".contact-langs button").forEach(function (btn) {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-l") === lang));
  });
}

function setInvalid(el, invalid) {
  if (!el) return;
  el.setAttribute("aria-invalid", invalid ? "true" : "false");
}

function validate(form, lang) {
  const enquiry = composeEnquiry(form, lang);
  const name = controlValue(form, "name");
  const contact = controlValue(form, "contact");
  const langsOk = enquiry.languages.length > 0;
  const firstLang = form.querySelector('input[name="languages"]');

  setInvalid(control(form, "name"), !name);
  setInvalid(control(form, "contact"), !contact);
  form.querySelectorAll('input[name="need"]').forEach(function (el) {
    setInvalid(el, !enquiry.need);
  });
  form.querySelectorAll('input[name="pages"]').forEach(function (el) {
    setInvalid(el, !enquiry.pages);
  });
  form.querySelectorAll('input[name="budget"]').forEach(function (el) {
    setInvalid(el, !enquiry.budget);
  });
  form.querySelectorAll('input[name="languages"]').forEach(function (el) {
    setInvalid(el, !langsOk);
  });
  if (firstLang) {
    firstLang.setCustomValidity(langsOk ? "" : t(lang, "f.langs.err"));
  }

  return Boolean(
    name && contact && enquiry.need && enquiry.pages && enquiry.budget && langsOk
  );
}

function formUrl() {
  if (typeof window !== "undefined" && window.PEIVANDO_FORM_URL) {
    return String(window.PEIVANDO_FORM_URL);
  }
  return CONTACT_CONFIG.formUrl || "";
}

function updateChannels(root, form, lang) {
  const enquiry = composeEnquiry(form, lang);
  const waText = enquiry.message;
  const waLink = root.querySelector("#ch-wa");
  const mailLink = root.querySelector("#ch-mail");
  if (waLink) waLink.href = whatsAppUrl(waText);
  if (mailLink) mailLink.href = mailUrl(waText);
}

function updateRecap(root, form, lang) {
  const recap = root.querySelector("#contact-recap-text");
  if (recap) recap.textContent = recapText(form, lang);
}

export function initContactConfigurator(root) {
  const form = root.querySelector("#contact-form");
  const out = root.querySelector("#form-msg");
  if (!form || !out) return;

  let lang = readLang();
  let statusKind = "";
  let statusKey = "";

  const mailAddr = root.querySelector("#mail-addr");
  const waNum = root.querySelector("#wa-num");
  if (mailAddr) mailAddr.textContent = CONTACT_CONFIG.email;
  if (waNum) waNum.textContent = formatWhatsAppNumber(CONTACT_CONFIG.whatsapp);
  const year = root.querySelector("#yr");
  if (year) year.textContent = String(new Date().getFullYear());

  function renderStatus() {
    if (!statusKey) {
      out.className = "contact-msg";
      out.textContent = "";
      return;
    }
    out.className = "contact-msg show " + statusKind;
    out.textContent = t(lang, statusKey);
  }

  function say(kind, key) {
    statusKind = kind;
    statusKey = key;
    renderStatus();
  }

  function refresh() {
    applyStrings(root, lang);
    updateRecap(root, form, lang);
    updateChannels(root, form, lang);
    renderStatus();
  }

  root.querySelectorAll(".contact-langs button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const next = btn.getAttribute("data-l");
      if (!CONTACT_STRINGS[next]) return;
      lang = next;
      writeLang(lang);
      refresh();
    });
  });

  form.addEventListener("change", function () {
    const firstLang = form.querySelector('input[name="languages"]');
    if (firstLang && selectedLanguages(form).length) firstLang.setCustomValidity("");
    updateRecap(root, form, lang);
    updateChannels(root, form, lang);
  });
  form.addEventListener("input", function () {
    if (statusKind === "warn") {
      statusKind = "";
      statusKey = "";
      renderStatus();
    }
    updateRecap(root, form, lang);
    updateChannels(root, form, lang);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate(form, lang)) {
      say("warn", "f.miss");
      const firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    const enquiry = composeEnquiry(form, lang);
    const fd = new FormData(form);
    fd.set("kind", enquiry.kind);
    fd.set("need", enquiry.need);
    fd.set("pages", enquiry.pages);
    fd.set("budget", enquiry.budget);
    fd.set("languages_joined", enquiry.languages.join(","));
    fd.set("message", enquiry.message);
    fd.set("_language", lang);

    const endpoint = formUrl();
    if (!endpoint) {
      updateChannels(root, form, lang);
      openUrl(whatsAppUrl(enquiry.message));
      say("ok", "f.sentVia");
      return;
    }

    fetch(endpoint, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          form.querySelectorAll("[aria-invalid]").forEach(function (el) {
            el.setAttribute("aria-invalid", "false");
          });
          const firstLang = form.querySelector('input[name="languages"]');
          if (firstLang) firstLang.setCustomValidity("");
          updateRecap(root, form, lang);
          updateChannels(root, form, lang);
          say("ok", "f.sent");
        } else {
          say("warn", "f.err");
        }
      })
      .catch(function () {
        say("warn", "f.err");
      });
  });

  refresh();
}

