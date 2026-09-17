import type { BakeryCopy, ChromeCopy, ShowcaseLocale } from "./types";

export const CHROME: Record<ShowcaseLocale, ChromeCopy> = {
  de: {
    eyebrow: "Konzeptprojekt · Bäckerei",
    title: "Dieselbe Seite. Vier Sprachen. Echtes RTL.",
    lede: "Laptop und Handy zeigen dieselbe Kundenseite — Deutsch, Englisch, Dari und Farsi. Navigation und Text laufen mit, nicht nur die Wörter.",
    hint: "Sprache wählen. Beide Bildschirme wechseln zusammen.",
    switcherLabel: "Demo-Sprache",
  },
  en: {
    eyebrow: "Concept project · Bakery",
    title: "The same site. Four languages. Real RTL.",
    lede: "Laptop and phone show the same client page — German, English, Dari and Farsi. Navigation and type follow the language, not just the words.",
    hint: "Pick a language. Both screens switch together.",
    switcherLabel: "Demo language",
  },
  prs: {
    eyebrow: "پروژهٔ مفهومی · نانوایی",
    title: "همان صفحه. چهار زبان. راست‌به‌چپ واقعی.",
    lede: "لپ‌تاپ و موبایل همان صفحهٔ مشتری را نشان می‌دهند — آلمانی، انگلیسی، دری و فارسی. ناوبری و متن با زبان می‌آیند، نه فقط واژه‌ها.",
    hint: "زبان را بگزینید. هر دو صفحه با هم عوض می‌شوند.",
    switcherLabel: "زبان نمونه",
  },
  fa: {
    eyebrow: "پروژهٔ مفهومی · نانوایی",
    title: "همان سایت. چهار زبان. راست‌به‌چپ واقعی.",
    lede: "لپ‌تاپ و گوشی همان صفحهٔ مشتری را نشان می‌دهند — آلمانی، انگلیسی، دری و فارسی. منو و نوشتار با زبان جابه‌جا می‌شوند، نه فقط ترجمهٔ کلمات.",
    hint: "زبان را انتخاب کنید. هر دو صفحه با هم عوض می‌شوند.",
    switcherLabel: "زبان نمونه",
  },
};

export const BAKERY: Record<ShowcaseLocale, BakeryCopy> = {
  de: {
    brand: "Bäckerei Nowzad",
    navRange: "Sortiment",
    navShops: "Filialen",
    navContact: "Kontakt",
    headline: "Frisches Brot, jeden Morgen um sechs.",
    lede: "Zwei Filialen in München. Bestellungen für Feiern nehmen wir bis Donnerstag an.",
    cta: "Jetzt bestellen",
    hoursTag: "Öffnungszeiten",
    hoursValue: "Täglich 06–18 Uhr",
    locationTag: "Anfahrt",
    locationValue: "Sendling & Haidhausen",
    products: [
      { name: "Bauernbrot", price: "€4,20" },
      { name: "Sesambrötchen", price: "€1,10" },
      { name: "Baklava", price: "€2,80" },
    ],
  },
  en: {
    brand: "Nowzad Bakery",
    navRange: "Range",
    navShops: "Shops",
    navContact: "Contact",
    headline: "Fresh bread, every morning at six.",
    lede: "Two shops in Munich. Orders for celebrations taken until Thursday.",
    cta: "Order now",
    hoursTag: "Opening hours",
    hoursValue: "Daily 6am–6pm",
    locationTag: "Directions",
    locationValue: "Sendling & Haidhausen",
    products: [
      { name: "Farmhouse loaf", price: "€4.20" },
      { name: "Sesame roll", price: "€1.10" },
      { name: "Baklava", price: "€2.80" },
    ],
  },
  prs: {
    brand: "نانوایی نوزاد",
    navRange: "جنس‌ها",
    navShops: "دوکان‌ها",
    navContact: "تماس",
    headline: "نان گرم، هر بامداد ساعت شش.",
    lede: "دو دوکان در مونیخ. سفارش جشن‌ها را تا روز پنج‌شنبه می‌گیریم.",
    cta: "سفارش بدهید",
    hoursTag: "اوقات کار",
    hoursValue: "هر روز ۶–۱۸",
    locationTag: "مسیر",
    locationValue: "Sendling & Haidhausen",
    products: [
      { name: "نان تنوری", price: "€۴,۲۰" },
      { name: "بولکی کنجدی", price: "€۱,۱۰" },
      { name: "بقلاوا", price: "€۲,۸۰" },
    ],
  },
  fa: {
    brand: "نانوایی نوزاد",
    navRange: "محصولات",
    navShops: "شعبه‌ها",
    navContact: "تماس",
    headline: "نان تازه، هر صبح ساعت شش.",
    lede: "دو شعبه در مونیخ. سفارش مراسم را تا پنجشنبه می‌پذیریم.",
    cta: "همین حالا سفارش دهید",
    hoursTag: "ساعات کاری",
    hoursValue: "همه‌روزه ۶–۱۸",
    locationTag: "مسیر",
    locationValue: "Sendling & Haidhausen",
    products: [
      { name: "نان بربری", price: "€۴٫۲۰" },
      { name: "شیرمال", price: "€۱٫۱۰" },
      { name: "باقلوا", price: "€۲٫۸۰" },
    ],
  },
};

export const URL_HOST = "nowzad.example";

export function localePath(locale: ShowcaseLocale): string {
  switch (locale) {
    case "de":
      return "/de";
    case "en":
      return "/en";
    case "prs":
      return "/prs";
    case "fa":
      return "/fa";
    default: {
      const _exhaustive: never = locale;
      throw new Error(`Unhandled showcase locale: ${String(_exhaustive)}`);
    }
  }
}
