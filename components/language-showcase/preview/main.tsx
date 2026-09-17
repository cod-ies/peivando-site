import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageShowcase } from "../LanguageShowcase";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing #root");
}

createRoot(root).render(
  <StrictMode>
    <div className="pv-ls-preview">
      <LanguageShowcase />
    </div>
  </StrictMode>,
);
