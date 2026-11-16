import { urlPaths } from "../config/routes";
import { cookieNames } from "../config/cookies";
import { LoginPage } from "../pages/loginPage";
import { expect } from "@playwright/test";
import { assertCookieValue } from "./commonUtils";

export async function assertSuccessfulLogout(loginPage: LoginPage) {
    await expect(loginPage.page).toHaveURL(urlPaths.login);
    await expect.soft(loginPage.usernameInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    await expect.soft(loginPage.loginButton).toBeVisible();
    await assertCookieValue(loginPage.page, cookieNames.sessionUsername, undefined);
}
