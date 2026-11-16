import { expect, type Locator } from "@playwright/test";
import { urlPaths } from "../config/routes";
import { cartSelectors } from "../mapping/cartSelectors";
import type { CartProductType } from "../models/cartTypes";
import { CartPage } from "../pages/cartPage";
import { InventoryPage } from "../pages/inventoryPage";
import { NavigationPage } from "../pages/navigationPage";

export async function addProductsToCart(
    inventoryPage: InventoryPage,
    products: CartProductType[],
): Promise<CartProductType[]> {
    const expectedProducts: CartProductType[] = [];

    for (const product of products) {
        const productDetails = await inventoryPage.getProductDetails(product.name);
        expectedProducts.push({
            ...product,
            name: productDetails.name,
            price: Number(productDetails.price.replace("$", "")),
        });
        await inventoryPage.addToCart(product.name);
    }

    return expectedProducts;
}

export async function assertCartPage(cartPage: CartPage) {
    await expect(cartPage.page).toHaveURL(urlPaths.cart);
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.pageTitle).toHaveText("Your Cart");
}

export async function assertCartItems(cartItems: Locator, expectedProducts: CartProductType[]) {
    await expect(cartItems).toHaveCount(expectedProducts.length);

    for (const expectedProduct of expectedProducts) {
        const product = cartItems.filter({
            has: cartItems.page().getByText(expectedProduct.name, { exact: true }),
        });
        const name = product.getByTestId(cartSelectors.productName);
        const price = product.getByTestId(cartSelectors.productPrice);
        const quantity = product.getByTestId(cartSelectors.productQuantity);

        await expect(name).toBeVisible();
        await expect(name).toHaveText(expectedProduct.name);
        await expect(price).toBeVisible();
        await expect(price).toHaveText(`$${expectedProduct.price.toFixed(2)}`);
        await expect(quantity).toBeVisible();
        await expect(quantity).toHaveText(String(expectedProduct.quantity));
    }
}

export async function assertCartContents(cartPage: CartPage, expectedProducts: CartProductType[]) {
    await assertCartPage(cartPage);
    await assertCartItems(cartPage.cartItems, expectedProducts);
}

export async function assertCartBadge(navigationPage: NavigationPage, expectedCount: number) {
    if (expectedCount === 0) {
        await expect(navigationPage.cartBadge).toHaveCount(0);
        return;
    }

    await expect(navigationPage.cartBadge).toBeVisible();
    await expect(navigationPage.cartBadge).toHaveText(String(expectedCount));
}
