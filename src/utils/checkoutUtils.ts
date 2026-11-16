import { expect } from "@playwright/test";
import { localStorageKeys } from "../config/localStorage";
import { urlPaths } from "../config/routes";
import type { CartProductType } from "../models/cartTypes";
import { CheckoutPage } from "../pages/checkoutPage";
import { assertCartItems } from "./cartUtils";

export async function assertCheckoutInformation(checkoutPage: CheckoutPage) {
    await expect(checkoutPage.page).toHaveURL(urlPaths.checkoutInformation);
    await expect(checkoutPage.pageTitle).toHaveText("Checkout: Your Information");
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.continueButton).toBeVisible();
}

export async function assertRejectedCheckout(checkoutPage: CheckoutPage, errorMessage: string) {
    await assertCheckoutInformation(checkoutPage);
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(errorMessage);
}

export async function assertCheckoutOverview(
    checkoutPage: CheckoutPage,
    expectedProducts: CartProductType[],
    taxRate: number,
) {
    await expect(checkoutPage.page).toHaveURL(urlPaths.checkoutOverview);
    await expect(checkoutPage.pageTitle).toHaveText("Checkout: Overview");
    await assertCartItems(checkoutPage.orderItems, expectedProducts);

    let subtotalCents = 0;
    for (const product of expectedProducts) {
        subtotalCents += Math.round(product.price * 100) * product.quantity;
    }
    const taxCents = Math.round(subtotalCents * taxRate);
    const totalCents = subtotalCents + taxCents;

    await expect(checkoutPage.subtotal).toHaveText(`Item total: $${(subtotalCents / 100).toFixed(2)}`);
    await expect(checkoutPage.tax).toHaveText(`Tax: $${(taxCents / 100).toFixed(2)}`);
    await expect(checkoutPage.total).toHaveText(`Total: $${(totalCents / 100).toFixed(2)}`);
}

export async function assertSuccessfulCheckout(checkoutPage: CheckoutPage, confirmationMessage: string) {
    await expect(checkoutPage.page).toHaveURL(urlPaths.checkoutComplete);
    await expect(checkoutPage.confirmationMessage).toHaveText(confirmationMessage);
    await expect(checkoutPage.confirmationMessage).toBeVisible();
    await expect.poll(() => checkoutPage.page.evaluate(key => {
        return JSON.parse(localStorage.getItem(key) ?? "[]");
    }, localStorageKeys.cartContents)).toEqual([]);
}
