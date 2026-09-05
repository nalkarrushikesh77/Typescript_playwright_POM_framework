# SauceDemo Playwright & TypeScript Automation Suite

An end-to-end test automation framework built for the SauceDemo application using Playwright, TypeScript, and the Page Object Model (POM) design pattern.

## Framework Architecture
* **Page Object Model (POM):** Decouples page locators and user actions (`pages/`) from test execution and assertions (`tests/`).
* **Type Safety:** Uses TypeScript for robust type checking and auto-completion.
* **Test Isolation:** Leverages Playwright's `test.beforeEach` hooks for independent test runs.
* **E2E Workflow:** Validates complete user checkout journey alongside isolated page-level test specs.

## Project Structure
```text
.
├── pages/                  # Page Object Model classes
├── tests/                  # Test specification files & E2E suite
├── .gitignore              # Ignored files (node_modules, reports)
├── package.json            # Project dependencies & scripts
└── playwright.config.ts    # Playwright runner configuration
```

## Setup & Execution

Clone repository:
```bash
git clone https://github.com/nalkarrushikesh77/Typescript_playwright_POM_framework.git
```

Install dependencies:
```bash
npm ci
```

Install Playwright browsers:
```bash
npx playwright install
```

Execute all tests:
```bash
npx playwright test
```

View HTML test report:
```bash
npx playwright show-report
```