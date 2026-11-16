import { baseURL } from "../config/routes";
import { cookieNames } from "../config/cookies";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { expect, test } from "@playwright/test";

type BasePageFixtures = {
    pagePath: string;
    sessionUsername: string;
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    productDetailsPage: ProductDetailsPage;
};

if (!baseURL) {
    throw new Error("BASE_URL is required. Copy .env.example to .env and set the website URL.");
}
export const basePage = test.extend<BasePageFixtures>({
    pagePath: [baseURL, { option: true }],
    sessionUsername: ["", { option: true }],

    page: async ({ page, pagePath, sessionUsername }, use) => {
        if (sessionUsername) {
            await page.context().addCookies([
                { name: cookieNames.sessionUsername, value: sessionUsername, url: baseURL },
            ]);
        }
        await page.goto(pagePath);
        await expect(page).toHaveTitle(/Swag Labs/);
        await use(page);
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
});

export { expect } from "@playwright/test";
