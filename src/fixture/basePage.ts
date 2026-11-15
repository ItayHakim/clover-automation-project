import { baseURL } from "../config/routes";
import { LoginPage } from "../pages/loginPage";
import { expect, test } from "@playwright/test";

type BasePageFixtures = {
    pagePath: string;
    loginPage: LoginPage;
};

if (!baseURL) {
    throw new Error("BASE_URL is required. Copy .env.example to .env and set the website URL.");
}
export const basePage = test.extend<BasePageFixtures>({
    pagePath: [baseURL, { option: true }],

    page: async ({ page, pagePath }, use) => {
        await page.goto(pagePath);
        await expect(page).toHaveTitle(/Swag Labs/);
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect } from "@playwright/test";
