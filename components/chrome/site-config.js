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
    services: "/leistungen",
    projects: "/projekte",
    pricing: "/preise",
    about: "/ueber",
    contact: "/kontakt",
    impressum: "/impressum",
    datenschutz: "/datenschutz"
  }
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
