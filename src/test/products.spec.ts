import { urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
import { productSortOptions } from "../mapping/inventorySelectors";
import { productCount, productSortCases, productsUsername, productToOpen } from "../testdata/productsData";
import { assertSuccessfulLogin } from "../utils/loginUtils";
import { assertProductDetails } from "../utils/productDetailsUtils";
import { assertProductCatalog, assertProductsSorted } from "../utils/productsUtils";

test.describe("Products Page Tests", () => {
    test.use({ pagePath: urlPaths.inventory, sessionUsername: productsUsername });

    test.beforeEach(async ({ page }) => {
        await assertSuccessfulLogin(page, productsUsername);
    });

    test("PRODUCT-01 - show all product cards with a name, image and price", async ({ inventoryPage }) => {
        await assertProductCatalog(inventoryPage, productCount);
    });

    for (const sortCase of productSortCases) {
        test(`${sortCase.testId} - sort Products by ${sortCase.name}`, async ({ inventoryPage }) => {
            if (sortCase.sortOption === productSortOptions.nameAscending) {
                await inventoryPage.sortProducts(productSortOptions.nameDescending);
                await assertProductsSorted(inventoryPage, "name", true, productCount);
            }

            await inventoryPage.sortProducts(sortCase.sortOption);
            await assertProductsSorted(inventoryPage, sortCase.sortBy, sortCase.descending, productCount);
        });
    }

    test("PRODUCT-06 - Sauce Labs Backpack details match its product card", async ({ inventoryPage, productDetailsPage }) => {
        const productDetails = await inventoryPage.getProductDetails(productToOpen.name);
        await inventoryPage.openProduct(productToOpen.name);
        await assertProductDetails(productDetailsPage, productDetails, productToOpen.id);
    });
});
