import { urlPaths } from "../config/routes";
import { LoginPage } from "../pages/loginPage";
import { expect, type Page } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";

export async function assertSuccessfulLogin(page: Page, timeout?: number) {
    await expect(page).toHaveURL(urlPaths.inventory, { timeout });

    const pageTitle = page.locator(inventorySelectors.pageTitle);
    await expect.soft(pageTitle).toBeVisible({ timeout });
    await expect.soft(pageTitle).toHaveText("Products", { timeout });
}

export async function assertRejectedLogin(loginPage: LoginPage, errorMessage: string) {
    await expect(loginPage.page).toHaveURL(urlPaths.login);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect.soft(loginPage.errorMessage).toContainText(errorMessage);
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    await expect.soft(loginPage.loginButton).toBeVisible();
}
