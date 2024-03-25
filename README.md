# Vanilla JS Boilerplate

This Vanilla JS Boilerplate provides a simple yet powerful starting point for building web applications using plain JavaScript. It includes routing functionality, support for `scss`, linting and formatting, a development server for testing, and a build script for bundling your code for production deployment.

## Features

- Minimal setup required
- Routing functionality for single-page applications (SPA)
- Development server for testing
- Build script for bundling JavaScript and CSS files
- Supports multiple package managers: npm, pnpm, yarn, and bun
- support for `scss`
- lint and formatting scripts

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js & npm (or your preferred package manager)
- Git (optional, but recommended for version control)

## Getting Started

### Installation

download a local copy of the repository and move inside the directory:

```bash
cd vanilla-js-boilerplate
```
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

Routing in this boilerplate is handled using plain JavaScript. Routes are automatically generated based on the HTML files present in the `src/pages` directory. Each HTML file created under `src/pages` is considered a route. If you add or remove HTML files in this directory, the routes will be updated accordingly. You can restart the development server or create a new build to see the changes take effect. If you need to customize routes further, you can edit the `src/scripts/constants/routes.ts` file.


## Directory Structure
```php
vanilla-js-boilerplate/
├── dist/                   # Compiled files (generated after running 'npm run build')
├── public/                 # Public assets (favicon, images, etc.)
├── src/                    # Source files
│   ├── pages/              # HTML files for different routes
│   ├── scripts/            # JavaScript files
│   │   ├── constants/      # Constants (e.g., routes)
│   │   ├── utils/          # Utility functions
│   ├── scss/               # SCSS files
├── .gitignore              # Git ignore file
├── package.json            # NPM package configuration
├── README.md               # Project documentation
└── ...                     # Other configuration files
```
