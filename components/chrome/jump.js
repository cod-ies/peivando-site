/* Thin alias pages: send leftover /preise /kontakt /projekte URLs onto the one-pager. */
(function () {
  var ALIASES = {
    services: "leistungen",
    contact: "kontakt",
    languages: "sprachen",
    about: "ueber",
    pricing: "preise",
    process: "ablauf"
  };
  var script = document.currentScript;
  var section = (script && script.getAttribute("data-jump")) || "";
  if (!section && typeof PEIVANDO === "object" && PEIVANDO && PEIVANDO.sectionForPath) {
    section = PEIVANDO.sectionForPath(location.pathname) || "";
  }
  section = ALIASES[section] || section || "top";
  var search = location.search || "";
  location.replace("/" + search + "#" + section);
})();
