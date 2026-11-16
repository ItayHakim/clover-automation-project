import "dotenv/config";
import { baseURL } from "./src/config/routes";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/test",
  fullyParallel: true,
  reporter: [
    ["html"],
    ["allure-playwright", { resultsDir: "test-results/allure-results" }],
  ],
  timeout: 30_000,
  retries: 2,
  maxFailures: undefined,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL,
    testIdAttribute: "data-test",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
