import { defineConfig } from "vite";

// Define chrome as the default browser for the dev server
const opsys = process.platform;
// windows
if (opsys === "win32" || opsys === "win64") process.env.BROWSER = "chrome";
// macOS
if (opsys === "darwin") process.env.BROWSER = "/Applications/Google Chrome.app";

export default defineConfig({
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
