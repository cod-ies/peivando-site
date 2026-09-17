import { getFeaturedProjects } from "../projects/data.js";

const CONCEPT = {
  de: "Konzeptprojekt",
  en: "Concept project",
  prs: "پروژهٔ مفهومی",
  fa: "پروژه مفهومی",
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function mountFeaturedProjects(root) {
  if (!root) return;

  function locale() {
    return window.lang || "de";
  }

  function render() {
    const lang = locale();
    const label = CONCEPT[lang] || CONCEPT.de;
    root.innerHTML = getFeaturedProjects(3)
      .map(function (project) {
        const name = project.name[lang] || project.name.de;
        const sector = project.sector[lang] || project.sector.de;
        const summary = project.summary[lang] || project.summary.de;
        return (
          '<a class="proj-card" href="' +
          project.href +
          '">' +
          '<span class="mono proj-tag">' +
          escapeHtml(label) +
          "</span>" +
          "<h3>" +
          escapeHtml(name) +
          "</h3>" +
          '<p class="proj-sector">' +
          escapeHtml(sector) +
          "</p>" +
          "<p>" +
          escapeHtml(summary) +
          "</p>" +
          "</a>"
        );
      })
      .join("");
  }

  document.addEventListener("peivando:localechange", render);
  render();
}

const mount = document.getElementById("proj-grid");
if (mount) mountFeaturedProjects(mount);
