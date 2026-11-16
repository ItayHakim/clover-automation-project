import { baseURL } from "../config/routes";
import { cookieNames } from "../config/cookies";
import { localStorageKeys } from "../config/localStorage";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";
import { NavigationPage } from "../pages/navigationPage";
import { expect, test } from "@playwright/test";

type BasePageFixtures = {
    pagePath: string;
    sessionUsername: string;
    cartProductIds: number[];
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletePage: CheckoutCompletePage;
    navigationPage: NavigationPage;
};

if (!baseURL) {
    throw new Error("BASE_URL is required. Copy .env.example to .env and set the website URL.");
}
const storageOrigin = new URL(baseURL).origin;

export const basePage = test.extend<BasePageFixtures>({
    pagePath: [baseURL, { option: true }],
    sessionUsername: ["", { option: true }],
    cartProductIds: [[], { option: true }],

    page: async ({ page, pagePath, sessionUsername, cartProductIds }, use) => {
        if (cartProductIds.length > 0) {
            await page.context().setStorageState({
                cookies: await page.context().cookies(),
                origins: [
                    {
                        origin: storageOrigin,
                        localStorage: [
                            { name: localStorageKeys.cartContents, value: JSON.stringify(cartProductIds) },
                        ],
                    },
                ],
            });
        }
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

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },

    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },

    navigationPage: async ({ page }, use) => {
        await use(new NavigationPage(page));
    },
});

export { expect } from "@playwright/test";
