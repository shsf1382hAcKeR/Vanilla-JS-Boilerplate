import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

function generateInputObject(path) {
  const resolvedPath = resolve(__dirname, path);
  const isDirectory = fs.statSync(resolvedPath).isDirectory();

  if (isDirectory) {
    return fs.readdirSync(resolvedPath).reduce((acc, file) => {
      const name = file.split(".").shift(); // Use the file name without extension as the key
      acc[name] = resolve(resolvedPath, file);
      return acc;
    }, {});
  } else {
    const name = path.split("/").pop().split(".").shift(); // Extract the file name without extension
    return { [name]: resolvedPath };
  }
}

export default defineConfig({
  root: "./src",
  publicDir: "../src/public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"),
        ...generateInputObject("./src/pages"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
