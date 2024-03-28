# Vanilla JS Boilerplate

This Vanilla JS Boilerplate provides a simple yet powerful starting point for building web applications using plain JavaScript. It includes routing functionality, support for `scss`, linting and formatting, a development server for testing, and a customizable build script for bundling your code for production deployment.

## Features

- Minimal setup required
- Routing functionality for single-page applications (SPA)
- Development server for testing
- Customizable build script for bundling JavaScript and CSS files
- Supports multiple package managers: npm, pnpm, yarn, and bun
- support for `scss`
- lint and formatting scripts

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js & npm (or your preferred package manager)
- Git (optional, but recommended for version control)

## Getting Started

### Installation

Download a local copy of the repository and move inside the directory.

If you choose to use this repository as a template, you can simply click on the "Use this template" button to create a new repository based on this boilerplate.

Once you have cloned the repository or created a new one from the template, you can install the dependencies using your preferred package manager:
```bash
# Using npm:
npm install

# Using pnpm:
pnpm install

# Using yarn:
yarn install

# Using bun:
bun install
```

### Development
```bash
bun dev
```

### Building
```bash
bun build
```

### Linting
```bash
bun lint
```

### Formatting
```bash
bun format
```

### Linting & Formatting
```bash
bun lint:format
```

### Building & Preview
```bash
bun build:preview
```

## Routing

Routing in this boilerplate is handled using plain JavaScript. Routes are automatically generated based on the HTML files present in the `src/pages` directory. Each HTML file created under `src/pages` is considered a route. If you add or remove HTML files in this directory, the routes will be updated accordingly. You can restart the development server to see the changes take effect. If you need to customize routes further, you can edit the `src/scripts/constants/routes.ts` file. Note that the routing is for development only and the bundled files in the build output are not suitable for SPA projects.

Additionally, the script `scripts/generateRoutes.cjs` facilitates the creation of routes during development. It dynamically generates routes based on the HTML files present in the `src/pages` directory. This script ensures that routes are kept up to date with changes to the HTML files. If essential root HTML files such as `index.html`, `home.html`, or `main.html` are absent, the script automatically generates a `home.html` file with default content to maintain a consistent routing structure. The generated routes are exported to the `src/typescript/constants/routes.ts` file, providing a convenient way to manage routes in the project.

## Customizable Build Scripts

In this boilerplate project, customizable build scripts are provided in the `scripts` folder at the project root, specifically in `scripts/post-build.cjs`. These scripts automate various tasks such as inserting scripts and links into HTML files, wrapping content within a `<main>` element, and organizing the build output. They enhance the build process by allowing developers to customize the behavior of the build output to suit specific project requirements.

## Directory Structure
```bash
vanilla-js-boilerplate/
├── dist/                   # Compiled files (generated after running 'npm run build' or 'npm run build:preview')
├── scripts/                # Custom scripts for development & production
├── src/                    # Source files
│   ├── pages/              # HTML files for different routes
│   ├── typescript/         # Typescirpt | JavaScript files (depending on your preferences, make sure to import them in 'src/main.ts' so they compile to one '.js' file in production) 
│   │   ├── constants/      # Constants (e.g., routes)
│   │   ├── utils/          # Utility functions
│   ├── scss/               # SCSS files (compiled to one '.css' file in production)
├── .gitignore              # Git ignore file
├── package.json            # Package configuration
├── README.md               # Project documentation
└── ...                     # Other configuration files (e.g., lock files, vite.config.json, etc.)
```

## Technologies Used

- [Bun](https://bun.sh)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [Sass](https://github.com/sass/sass)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Vite](https://github.com/vitejs/vite)

## License

This project is licensed under the [MIT License](LICENSE).
