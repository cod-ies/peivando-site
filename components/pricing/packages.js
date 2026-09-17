export const PRICING_CONTACT = {
  whatsapp: "93747970495",
  email: "info@peivando.com",
  contactHref: "/#contact",
};

export const PACKAGES = [
  {
    id: "starter",
    featured: false,
    priceEur: 399,
    pages: 1,
    featureKeys: [
      "design",
      "mobile",
      "form",
      "whatsapp",
      "domain",
    ],
  },
  {
    id: "business",
    featured: true,
    priceEur: 899,
    pages: 5,
    featureKeys: [
      "pages5",
      "responsive",
      "seo",
      "form",
      "maps",
      "analytics",
    ],
  },
  {
    id: "multilingual",
    featured: false,
    priceEur: 1290,
    pages: null,
    featureKeys: [
      "dePlusOne",
      "rtl",
      "switcher",
      "seoLang",
      "typography",
    ],
  },
];
