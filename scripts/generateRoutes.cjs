const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "../src/pages");

// Read the contents of the pages directory
fs.readdir(pagesDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter out specific HTML files for root routes
  const rootHtmlFiles = files.filter(
    (file) =>
      file === "index.html" || file === "home.html" || file === "main.html",
  );

  // Generate routes based on HTML files
  const routes = files.reduce((acc, file) => {
    // Define route based on file name
    let route = "/";
    if (!rootHtmlFiles.includes(file)) {
      route += path.basename(file, ".html");
    }
    acc[route] = path.join("/pages", file);
    return acc;
  }, {});

  // If none of the root HTML files are present, create home.html
  if (rootHtmlFiles.length === 0) {
    const homeHtmlContent = `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Home Page</title>
        </head>
        <body>
          <h1>Welcome to the Home Page</h1>
          <p>This is the content of the home page.</p>
        </body>
      </html>`;

    fs.writeFileSync(path.join(pagesDir, "home.html"), homeHtmlContent);
    console.log("Created home.html file with default content.");

    // Add the home route to the routes object
    routes["/"] = "/pages/home.html";
  }

  // Write the generated routes to routes.ts file
  const routesFileContent = `export const routes: Record<string, string> = ${JSON.stringify(
    routes,
    null,
    2,
  )};\n`;
  fs.writeFileSync(
    path.join(__dirname, "../src/scripts/constants/routes.ts"),
    routesFileContent,
  );

  console.log("Routes generated successfully!");
});
