import { expect, type Locator } from "@playwright/test";
import { urlPaths } from "../config/routes";
import { cartSelectors } from "../mapping/cartSelectors";
import type { CartProductType } from "../models/cartTypes";
import { CartPage } from "../pages/cartPage";

export async function assertCartItems(cartItems: Locator, expectedProducts: CartProductType[]) {
    await expect(cartItems).toHaveCount(expectedProducts.length);

    for (const expectedProduct of expectedProducts) {
        const product = cartItems.filter({
            has: cartItems.page().getByText(expectedProduct.name, { exact: true }),
        });
        const name = product.locator(cartSelectors.productName);
        const price = product.locator(cartSelectors.productPrice);
        const quantity = product.locator(cartSelectors.productQuantity);

        await expect(name).toBeVisible();
        await expect(name).toHaveText(expectedProduct.name);
        await expect(price).toBeVisible();
        await expect(price).toHaveText(`$${expectedProduct.price.toFixed(2)}`);
        await expect(quantity).toBeVisible();
        await expect(quantity).toHaveText(String(expectedProduct.quantity));
    }
}

export async function assertCartContents(cartPage: CartPage, expectedProducts: CartProductType[]) {
    await expect(cartPage.page).toHaveURL(urlPaths.cart);
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
    await assertCartItems(cartPage.cartItems, expectedProducts);
}
