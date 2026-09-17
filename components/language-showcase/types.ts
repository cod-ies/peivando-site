export type ShowcaseLocale = "de" | "en" | "prs" | "fa";

export type LanguageShowcaseProps = {
  className?: string;
  defaultLocale?: ShowcaseLocale;
  onLocaleChange?: (locale: ShowcaseLocale) => void;
};

export type LocaleDir = "ltr" | "rtl";

export type LocaleMeta = {
  id: ShowcaseLocale;
  dir: LocaleDir;
  htmlLang: string;
  shortLabel: string;
  name: string;
  script: "latin" | "arabic";
};

export type ChromeCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  hint: string;
  switcherLabel: string;
};

export type BakeryProduct = {
  name: string;
  price: string;
};

export type BakeryCopy = {
  brand: string;
  navRange: string;
  navShops: string;
  navContact: string;
  headline: string;
  lede: string;
  cta: string;
  hoursTag: string;
  hoursValue: string;
  locationTag: string;
  locationValue: string;
  products: readonly [BakeryProduct, BakeryProduct, BakeryProduct];
};
