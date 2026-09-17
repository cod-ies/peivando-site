import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const previewDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: previewDir,
  plugins: [react()],
  server: {
    host: true,
    port: 5179,
    strictPort: true,
  },
});
