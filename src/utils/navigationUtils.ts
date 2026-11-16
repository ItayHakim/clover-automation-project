import { cookieNames } from "../config/cookies";
import { LoginPage } from "../pages/loginPage";
import { assertCookieValue } from "./commonUtils";
import { assertRejectedLogin } from "./loginUtils";

export async function assertProtectedRouteRedirect(loginPage: LoginPage, errorMessage: string) {
    await assertRejectedLogin(loginPage, errorMessage);
    await assertCookieValue(loginPage.page, cookieNames.sessionUsername, undefined);
}
