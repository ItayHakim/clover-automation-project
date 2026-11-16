import { expect } from "@playwright/test";
import { cookieNames } from "../config/cookies";
import { urlPaths } from "../config/routes";
import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { assertCookieValue } from "./commonUtils";
import { assertRejectedLogin } from "./loginUtils";

export async function assertCartPage(cartPage: CartPage) {
    await expect(cartPage.page).toHaveURL(urlPaths.cart);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
}

export async function assertProductDetailsPage(
    productDetailsPage: ProductDetailsPage,
    productId: number,
    productName: string,
) {
    await expect(productDetailsPage.page).toHaveURL(`${urlPaths.productDetails}?id=${productId}`);
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.productName).toHaveText(productName);
}

export async function assertProtectedRouteRedirect(loginPage: LoginPage, errorMessage: string) {
    await assertRejectedLogin(loginPage, errorMessage);
    await assertCookieValue(loginPage.page, cookieNames.sessionUsername, undefined);
}
