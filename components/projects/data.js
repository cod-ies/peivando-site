import { LANGUAGE_LABELS } from "./lang.js";

export { LANGUAGE_LABELS };

export const PROJECTS = [
  {
    id: "baeckerei-nowzad",
    href: "/projekte/baeckerei-nowzad/",
    concept: true,
    languages: ["de", "en", "prs", "fa"],
    name: {
      de: "Bäckerei Nowzad",
      en: "Nowzad Bakery",
      prs: "نانوایی نوزاد",
      fa: "نانوایی نوزاد",
    },
    sector: {
      de: "Bäckerei · München",
      en: "Bakery · Munich",
      prs: "نانوایی · مونیخ",
      fa: "نانوایی · مونیخ",
    },
    summary: {
      de: "Mehrsprachige Filialseite: Sortiment, zwei Standorte und Bestellungen für Feiern. Dieselbe Demo, die auf der Startseite als Sprachbeispiel läuft.",
      en: "A multilingual shop page: range, two locations, and orders for celebrations. The same demo that runs as the language example on the home page.",
      prs: "صفحهٔ چندزبانه برای نانوایی: محصولات، دو شعبه و سفارش برای جشن‌ها. همان نمونه‌ای که در صفحهٔ نخست برای زبان‌ها دیده می‌شود.",
      fa: "صفحهٔ چندزبانه برای نانوایی: محصولات، دو شعبه و سفارش جشن‌ها. همان نمونه‌ای که در صفحهٔ نخست برای زبان‌ها دیده می‌شود.",
    },
    features: {
      de: ["Mehrsprachig & RTL", "Filialen & Öffnungszeiten", "Bestellhinweis", "Mobil"],
      en: ["Multilingual & RTL", "Shops & opening hours", "Order note", "Mobile"],
      prs: ["چندزبانه و راست‌به‌چپ", "شعبه‌ها و ساعات کار", "یادداشت سفارش", "موبایل"],
      fa: ["چندزبانه و راست‌به‌چپ", "شعبه‌ها و ساعات کار", "یادداشت سفارش", "موبایل"],
    },
  },
  {
    id: "afghanisches-restaurant",
    href: "/projekte/afghanisches-restaurant/",
    concept: true,
    languages: ["de", "prs", "fa"],
    name: {
      de: "Afghanisches Restaurant",
      en: "Afghan restaurant",
      prs: "رستوران افغانی",
      fa: "رستوران افغانستانی",
    },
    sector: {
      de: "Gastronomie · München",
      en: "Restaurant · Munich",
      prs: "غذاخانه‌ · مونیخ",
      fa: "رستوران · مونیخ",
    },
    summary: {
      de: "Konzept für ein Restaurant, dessen Gäste Deutsch, Dari und Farsi sprechen. Speisekarte, Reservierung über WhatsApp, Anfahrt.",
      en: "A concept for a restaurant whose guests speak German, Dari and Farsi. Menu, WhatsApp booking, directions.",
      prs: "طرحی برای رستورانی که مهمانانش آلمانی، دری و فارسی حرف می‌زنند. منو، رزرو از واتس‌اپ، مسیر.",
      fa: "طرحی برای رستورانی که مهمانانش آلمانی، دری و فارسی صحبت می‌کنند. منو، رزرو از واتساپ، مسیر.",
    },
    features: {
      de: ["Speisekarte", "WhatsApp-Reservierung", "Anfahrt", "RTL-Typografie"],
      en: ["Menu", "WhatsApp booking", "Directions", "RTL typography"],
      prs: ["منو", "رزرو واتس‌اپ", "مسیر", "حروف‌چینی راست‌به‌چپ"],
      fa: ["منو", "رزرو واتساپ", "مسیر", "حروف‌چینی راست‌به‌چپ"],
    },
  },
  {
    id: "kfz-handel",
    href: "/projekte/kfz-handel/",
    concept: true,
    languages: ["de", "en"],
    name: {
      de: "KFZ-Handel",
      en: "Used car dealer",
      prs: "فروش موتر",
      fa: "فروش خودرو",
    },
    sector: {
      de: "Autohandel · lokal",
      en: "Car dealer · local",
      prs: "فروش موتر · محلی",
      fa: "فروش خودرو · محلی",
    },
    summary: {
      de: "Klare Händlerseite mit Musterfahrzeugen und Anfrageformular auf Deutsch und Englisch. Kein erfundener Lagerbestand eines echten Betriebs.",
      en: "A clear dealer page with sample vehicles and an enquiry form in German and English. Not the invented stock of a real business.",
      prs: "صفحهٔ فروشنده با موترهای نمونه و فورم درخواست به آلمانی و انگلیسی. موجودی ساختگی یک شرکت واقعی نیست.",
      fa: "صفحهٔ فروشنده با خودروهای نمونه و فرم درخواست به آلمانی و انگلیسی. موجودی ساختگی یک کسب‌وکار واقعی نیست.",
    },
    features: {
      de: ["Fahrzeugübersicht", "Anfrageformular", "SEO-Grundlagen", "Mobil"],
      en: ["Vehicle list", "Enquiry form", "SEO basics", "Mobile"],
      prs: ["فهرست موترها", "فورم درخواست", "اساسات سئو", "موبایل"],
      fa: ["فهرست خودروها", "فرم درخواست", "مبانی سئو", "موبایل"],
    },
  },
  {
    id: "reinigungsunternehmen",
    href: "/projekte/reinigungsunternehmen/",
    concept: true,
    languages: ["de", "en"],
    name: {
      de: "Reinigungsunternehmen",
      en: "Cleaning company",
      prs: "شرکت نظافت",
      fa: "شرکت نظافت",
    },
    sector: {
      de: "Dienstleistung · lokal",
      en: "Services · local",
      prs: "خدمات · محلی",
      fa: "خدمات · محلی",
    },
    summary: {
      de: "Leistungen, Einsatzgebiet und Angebot anfragen — in zwei Sprachen, mit direktem Kontakt. Weniger Dekoration, mehr der Weg zur Anfrage.",
      en: "Services, coverage area and a quote request — in two languages, with a direct contact path. Less decoration, more route to an enquiry.",
      prs: "خدمات، ساحهٔ کار و درخواست قیمت — به دو زبان، با تماس مستقیم. کمتر زینت، بیشتر راه به درخواست.",
      fa: "خدمات، محدودهٔ کار و درخواست قیمت — به دو زبان، با تماس مستقیم. کمتر تزئین، بیشتر مسیر درخواست.",
    },
    features: {
      de: ["Leistungsübersicht", "Angebot anfragen", "WhatsApp", "Einsatzgebiete"],
      en: ["Service list", "Request a quote", "WhatsApp", "Coverage area"],
      prs: ["فهرست خدمات", "درخواست قیمت", "واتس‌اپ", "ساحهٔ کار"],
      fa: ["فهرست خدمات", "درخواست قیمت", "واتساپ", "محدودهٔ کار"],
    },
  },
];

export function getProjectById(id) {
  return PROJECTS.find((project) => project.id === id) || null;
}

export function getFeaturedProjects(count = 3) {
  return PROJECTS.slice(0, count);
}
