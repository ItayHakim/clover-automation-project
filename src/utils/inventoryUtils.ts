import { expect, type Page } from "@playwright/test";
import { urlPaths } from "../config/routes";
import { inventorySelectors } from "../mapping/inventorySelectors";

export async function assertInventoryPage(page: Page, timeout?: number) {
    await expect(page).toHaveURL(urlPaths.inventory, { timeout });

    const pageTitle = page.locator(inventorySelectors.pageTitle);
    await expect(pageTitle).toBeVisible({ timeout });
    await expect(pageTitle).toHaveText("Products", { timeout });
}
