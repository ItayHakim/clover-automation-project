import { expect } from "./matchers";
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
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => {
            return element.complete && element.naturalWidth > 0;
        })).toBe(true);
        await expect.soft(price).toBeVisible();
        await expect.soft(price).toHaveText(/^\$\d+\.\d{2}$/);
    }
}

export async function assertProductsSorted(
    inventoryPage: InventoryPage,
    sortBy: ProductSortCaseType["sortBy"],
    descending: boolean,
    originalNames: string[],
    originalPrices: number[],
) {
    await assertProductCatalog(inventoryPage, originalNames.length);
    await expect.poll(async () => (await inventoryPage.getProductNames()).sort()).toEqual([...originalNames].sort());
    await expect.poll(async () => (await inventoryPage.getProductPrices()).sort((first, second) => first - second))
        .toEqual([...originalPrices].sort((first, second) => first - second));
    const direction = descending ? "desc" : "asc";

    if (sortBy === "price") {
        await expect.poll(() => inventoryPage.getProductPrices()).toBeSorted(direction);
        return;
    }

    await expect.poll(() => inventoryPage.getProductNames()).toBeSorted(direction);
}
