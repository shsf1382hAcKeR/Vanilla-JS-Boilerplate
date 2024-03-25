import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { resolve } from "path";

const getHtmlFiles = () => {
  const pagesDir = resolve(__dirname, "./src/pages");
  const files = readdirSync(pagesDir);
  return files.reduce((entries, file) => {
    if (file.endsWith(".html")) {
      const name = file.replace(".html", "");
      entries[name] = resolve(pagesDir, file);
    }
    return entries;
  }, {});
};

export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"), // Specify the main index.html file as an entry point
        ...getHtmlFiles(), // Dynamically include all HTML files from the src/pages directory
        404: resolve(__dirname, "./src/pages/404.html"), // You can still manually specify other entry points if needed
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Alias for src directory
    },
  },
});
