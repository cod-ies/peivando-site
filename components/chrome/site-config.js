/* Peivando contact + routes. Phone is the live WhatsApp number — do not invent +49. */
var PEIVANDO = {
  whatsappDigits: "93747970495",
  whatsappDisplay: "+93 74 797 0495",
  email: "info@peivando.com",
  facebookUrl: "https://www.facebook.com/peivando",
  messengerUrl: "https://m.me/peivando",
  siteUrl: "https://peivando.com",
  routes: {
    home: "/",
    services: "/#leistungen",
    projects: "/#projekte",
    pricing: "/#preise",
    about: "/#ueber",
    contact: "/#kontakt",
    impressum: "/impressum",
    datenschutz: "/datenschutz"
  },
  sections: ["projekte", "leistungen", "preise", "ueber", "kontakt"],
  hashAliases: {
    services: "leistungen",
    contact: "kontakt",
    languages: "sprachen",
    about: "ueber",
    pricing: "preise",
    process: "ablauf"
  },
  pathSections: {
    "/leistungen": "leistungen",
    "/projekte": "projekte",
    "/preise": "preise",
    "/ueber": "ueber",
    "/about": "ueber",
    "/kontakt": "kontakt",
    "/contact": "kontakt",
    "/faq": "faq"
  }
};

PEIVANDO.sectionForPath = function (pathname) {
  var path = (pathname || "/").replace(/\/index\.html$/, "/");
  if (path.length > 1 && path.slice(-1) === "/") path = path.slice(0, -1);
  return this.pathSections[path] || "";
};

/* Back-compat for the homepage contact script */
var WHATSAPP = PEIVANDO.whatsappDigits;
var EMAIL = PEIVANDO.email;

PEIVANDO.whatsAppUrl = function (text) {
  return "https://wa.me/" + this.whatsappDigits + "?text=" + encodeURIComponent(text || "");
};

PEIVANDO.mailUrl = function (subject, body) {
  return (
    "mailto:" +
    this.email +
    "?subject=" +
    encodeURIComponent(subject || "Website-Anfrage / Website enquiry") +
    "&body=" +
    encodeURIComponent(body || "")
  );
};

PEIVANDO.openUrl = function (url) {
  if (!url) return false;
  var win = window.open(url, "_blank", "noopener,noreferrer");
  if (win) return true;
  window.location.assign(url);
  return true;
};
