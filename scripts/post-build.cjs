const fs = require("fs");
const path = require("path");

// Function to insert scripts and links into HTML files
function insertScriptsAndLinks(htmlFiles, scripts, links) {
  htmlFiles.forEach((file) => {
    let content = fs.readFileSync(file, "utf8");
    const headIndex = content.indexOf("</head>");
    if (headIndex !== -1) {
      let insertion = "";
      scripts.forEach((script) => {
        const relativeScriptPath = path
          .relative(path.dirname(file), script)
          .replace(/\\/g, "/");
        insertion += `<script type="module" crossorigin src="/${relativeScriptPath}"></script>\n`;
      });
      links.forEach((link) => {
        const relativeLinkPath = path
          .relative(path.dirname(file), link)
          .replace(/\\/g, "/");
        insertion += `<link rel="stylesheet" crossorigin href="/${relativeLinkPath}">\n`;
      });
      content =
        content.slice(0, headIndex) + insertion + content.slice(headIndex);
      fs.writeFileSync(file, content, "utf8");
    }
  });
}

// Function to wrap content in the main element using the index.html as layout
function wrapContentInMain(htmlFiles) {
  const distDir = path.resolve(__dirname, "../dist");
  const indexFile = path.join(distDir, "index.html");
  const indexContent = fs.readFileSync(indexFile, "utf8");
  const mainIdIndex = indexContent.indexOf('id="main"');
  const mainStartIndex = indexContent.indexOf(">", mainIdIndex) + 1;
  const mainEndIndex = indexContent.indexOf("</div>", mainStartIndex);

  htmlFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const bodyIndex = content.indexOf("<body>");
    const bodyEndIndex = content.indexOf("</body>");
    if (bodyIndex !== -1 && bodyEndIndex !== -1) {
      const bodyContent = content.slice(bodyIndex + 6, bodyEndIndex);
      const wrappedContent =
        indexContent.slice(0, mainStartIndex) +
        bodyContent +
        indexContent.slice(mainEndIndex);
      fs.writeFileSync(file, wrappedContent, "utf8");
    }
  });
}

// Main function to run the script
function main() {
  const distDir = path.resolve(__dirname, "../dist");
  const pagesDir = path.join(distDir, "pages");
  const assetsDir = path.join(distDir, "assets");

  const htmlFiles = fs
    .readdirSync(pagesDir)
    .filter((file) => file.endsWith(".html"))
    .map((file) => path.join(pagesDir, file));
  const scripts = fs
    .readdirSync(assetsDir)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join(assetsDir, file));
  const links = fs
    .readdirSync(assetsDir)
    .filter((file) => file.endsWith(".css"))
    .map((file) => path.join(assetsDir, file));

  // Extract titles before any modifications
  const titles = htmlFiles.map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    return titleMatch ? titleMatch[1] : "Default Title"; // Fallback to "Default Title" if no title is found
  });

  insertScriptsAndLinks(htmlFiles, scripts, links);
  wrapContentInMain(htmlFiles);

  // Move files from ./dist/pages to ./dist, update titles, and delete the ./dist/pages folder
  htmlFiles.forEach((file, index) => {
    const newPath = path.join(distDir, path.basename(file));
    fs.renameSync(file, newPath);

    // Update the title in the moved file
    let newContent = fs.readFileSync(newPath, "utf8");
    newContent = newContent.replace(
      /<title>.*?<\/title>/,
      `<title>${titles[index]}</title>`,
    );
    fs.writeFileSync(newPath, newContent, "utf8");
  });
  fs.rmSync(pagesDir, { recursive: true, force: true });
}

main();
