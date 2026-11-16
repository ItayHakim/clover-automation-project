import { urlPaths } from "../config/routes";
import { LoginPage } from "../pages/loginPage";
import { cookieNames } from "../config/cookies";
import { expect, type Page } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";

async function assertSessionUsernameCookie(page: Page, username: string) {
    await expect.poll(async () => {
        const cookies = await page.context().cookies(page.url());
        return cookies.find(cookie => cookie.name === cookieNames.sessionUsername)?.value;
    }, { message: `Expected ${cookieNames.sessionUsername} cookie to contain ${username}` }).toBe(username);
}

export async function assertSuccessfulLogin(page: Page, username: string, timeout?: number) {
    await expect(page).toHaveURL(urlPaths.inventory, { timeout });

    const pageTitle = page.locator(inventorySelectors.pageTitle);
    await expect.soft(pageTitle).toBeVisible({ timeout });
    await expect.soft(pageTitle).toHaveText("Products", { timeout });
    await assertSessionUsernameCookie(page, username);
}

export async function assertRejectedLogin(loginPage: LoginPage, errorMessage: string, sessionUsername?: string) {
    await expect(loginPage.page).toHaveURL(urlPaths.login);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect.soft(loginPage.errorMessage).toContainText(errorMessage);
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    await expect.soft(loginPage.loginButton).toBeVisible();
    if (sessionUsername !== undefined) {
        await assertSessionUsernameCookie(loginPage.page, sessionUsername);
    }
}
