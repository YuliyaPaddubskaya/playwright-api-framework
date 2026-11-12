import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

// Download variables from .env file
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: [["html", { outputFolder: "playwright-api-report" }], ["line"]],
  globalSetup: require.resolve("./src/config/globalSetup.ts"),
  use: {
    baseURL: process.env.API_BASE_URL || "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    trace: "retain-on-failure",
  },
});
