import { test } from "@playwright/test";
import { baseURL } from "../config/routes";

type BasePageFixtures = {
  pagePath: string;
};

if (!baseURL) {
  throw new Error("BASE_URL is required. Copy .env.example to .env and set the website URL.");
}
export const basePage = test.extend<BasePageFixtures>({
  pagePath: [baseURL, { option: true }],

  page: async ({ page, pagePath }, use) => {
    await page.goto(pagePath);
    await use(page);
  },
});

export { expect } from "@playwright/test";
