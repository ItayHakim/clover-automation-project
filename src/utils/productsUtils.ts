import { expect } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";
import type { ProductSortCaseType } from "../models/productTypes";
import { InventoryPage } from "../pages/inventoryPage";

export async function assertProductCatalog(inventoryPage: InventoryPage, expectedCount: number) {
    await expect(inventoryPage.productCards).toHaveCount(expectedCount);

    for (const product of await inventoryPage.productCards.all()) {
        const name = product.getByTestId(inventorySelectors.productName);
        const image = product.locator(inventorySelectors.productImage);
        const price = product.getByTestId(inventorySelectors.productPrice);

        await expect.soft(name).toBeVisible();
        await expect.soft(name).toHaveText(/\S/);
        await expect.soft(image).toBeVisible();
        await expect.soft(price).toBeVisible();
        await expect.soft(price).toHaveText(/^\$\d+\.\d{2}$/);
    }
}

export async function assertProductsSorted(inventoryPage: InventoryPage, sortBy: ProductSortCaseType["sortBy"], descending: boolean, expectedCount: number,
) {
    await assertProductCatalog(inventoryPage, expectedCount);

    if (sortBy === "price") {
        await expect(inventoryPage.productPrices).toHaveCount(expectedCount);
        const prices = await inventoryPage.getProductPrices();
        const expectedPrices = prices.slice();
        expectedPrices.sort((firstPrice, secondPrice) => firstPrice - secondPrice);
        if (descending) {
            expectedPrices.reverse();
        }

        await expect.poll(() => inventoryPage.getProductPrices()).toEqual(expectedPrices);
        return;
    }

    await expect(inventoryPage.productNames).toHaveCount(expectedCount);
    const names = await inventoryPage.getProductNames();
    const expectedNames = names.slice();
    expectedNames.sort();
    if (descending) {
        expectedNames.reverse();
    }

    await expect.poll(() => inventoryPage.getProductNames()).toEqual(expectedNames);
}
