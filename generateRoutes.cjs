const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "/src/pages");

// Read the contents of the pages directory
fs.readdir(pagesDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter out non-HTML files
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  // Generate routes based on HTML files
  const routes = htmlFiles.reduce((acc, file) => {
    const route = `/${path.basename(file, ".html")}`;
    acc[route] = path.join("/pages", file);
    return acc;
  }, {});

  // Write the generated routes to routes.ts file
  const routesFileContent = `export const routes: Record<string, string> = ${JSON.stringify(routes, null, 2)};\n`;
  fs.writeFileSync(
    path.join(__dirname, "/src/scripts/constants/routes.ts"),
    routesFileContent,
  );

  console.log("Routes generated successfully!");
});
