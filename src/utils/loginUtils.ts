import { urlPaths } from "../config/routes";
import { LoginPage } from "../pages/loginPage";
import { cookieNames } from "../config/cookies";
import { expect, type Page } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";
import { assertCookieValue } from "./commonUtils";

export async function assertSuccessfulLogin(page: Page, username: string, timeout?: number) {
    await expect(page).toHaveURL(urlPaths.inventory, { timeout });

    const pageTitle = page.locator(inventorySelectors.pageTitle);
    await expect.soft(pageTitle).toBeVisible({ timeout });
    await expect.soft(pageTitle).toHaveText("Products", { timeout });
    await assertCookieValue(page, cookieNames.sessionUsername, username);
}

export async function assertRejectedLogin(loginPage: LoginPage, errorMessage: string, sessionUsername?: string) {
    await expect(loginPage.page).toHaveURL(urlPaths.login);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect.soft(loginPage.errorMessage).toContainText(errorMessage);
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    await expect.soft(loginPage.loginButton).toBeVisible();
    if (sessionUsername !== undefined) {
        await assertCookieValue(loginPage.page, cookieNames.sessionUsername, sessionUsername);
    }
}
