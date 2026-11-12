# Playwright API Testing Framework

An enterprise-grade API test automation framework built with **Playwright**, **TypeScript**, and modern testing best practices. Designed for robustness, clean architecture, and seamless CI/CD integration.

---

## 🚀 Key Features

- **Architectural Patterns:** Implements the **Builder Pattern** for flexible test data generation and **Page/Service Object Model** principles for API endpoints.
- **Global Setup & Authentication:** Centralized authorization via `globalSetup.ts`, retrieving and sharing the authentication token dynamically using environment variables.
- **Strict Runtime Validation:** Request and response payloads are validated using **Zod** schemas to ensure contract compliance.
- **Custom Logging:** Built-in lightweight `Logger` utility with intuitive emojis (`🚀`, `✅`, `❌`) for clear request/response tracing in the console.
- **Flexible Test Data:** Uses `@faker-js/faker` for dynamic and isolated test data generation.
- **CI/CD Integration:** Fully automated pipeline via GitHub Actions with intelligent dependency caching and HTML report generation.

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Test Runner:** Playwright (`@playwright/test`)
- **Validation:** Zod
- **Data Generation:** Faker.js
- **Environment Management:** Dotenv
- **CI/CD:** GitHub Actions

---

## 📂 Project Structure

playwright-api-framework/
├── .github/
│ └── workflows/
│ └── playwright.yml # GitHub Actions CI/CD pipeline
├── src/
│ ├── api/ # API clients and request wrappers
│ ├── config/
│ │ └── globalSetup.ts # Global setup for authentication & environment
│ ├── fixtures/
│ │ └── testFixtures.ts # Custom Playwright test fixtures
│ └── utils/
│ └── logger.ts # Custom console logger with formatting
├── tests/ # API test specifications (CRUD operations)
├── .env.example # Environment variables template
├── playwright.config.ts # Playwright configuration file
├── tsconfig.json # TypeScript configuration
└── package.json # Project dependencies and scripts

⚙️ Getting Started
Prerequisites
Node.js (LTS version recommended, e.g., v20+)

npm

Installation

Clone the repository:

Bash
git clone https://github.com/YuliyaPaddubskaya/playwright-api-framework.git
cd playwright-api-framework
Install dependencies:

Bash
npm ci
Configure environment variables:
Copy .env.example to .env and fill in your values (for the public sandbox, default demo credentials work out of the box):

Bash
cp .env.example .env
🧪 Running Tests
Run all tests (Headless mode):

Bash
npm test
Run tests in Playwright UI Mode (Interactive):

Bash
npm run test:ui
Run tests in Headed mode:

Bash
npm run test:headed
Open the HTML Test Report:

Bash
npm run report
🤖 CI/CD Pipeline (GitHub Actions)
The project includes a streamlined GitHub Actions workflow (.github/workflows/playwright.yml) that triggers on every push and pull request to main/master branches, as well as manual triggers (workflow_dispatch).

Features: Caches node_modules for lightning-fast execution, executes API tests securely, and automatically uploads the Playwright HTML report as an artifact (retained for 90 days).

Note on Credentials: The pipeline uses public demo credentials for the Restful Booker sandbox (https://restful-booker.herokuapp.com), which are intentionally exposed for portfolio evaluation and ease of testing. For private environments, secrets should be configured via GitHub Secrets.
