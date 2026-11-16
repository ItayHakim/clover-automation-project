import { urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
import { navigationProductPath, navigationUsername, protectedRouteCases } from "../testdata/navigationData";
import { productToOpen } from "../testdata/productsData";
import { assertCartPage } from "../utils/cartUtils";
import { assertInventoryPage } from "../utils/inventoryUtils";
import { assertProtectedRouteRedirect } from "../utils/navigationUtils";
import { assertProductDetailsPage } from "../utils/productDetailsUtils";

test.describe("Navigation Page Tests", () => {
    test.describe("Signed-in navigation", () => {
        test.use({ pagePath: urlPaths.inventory, sessionUsername: navigationUsername });

        test("NAV-01 - Cart and Continue Shopping navigate between Cart and Products", async ({ page, navigationPage, cartPage }) => {
            await assertInventoryPage(page);
            await navigationPage.openCart();
            await assertCartPage(cartPage);
            await cartPage.continueShopping();
            await assertInventoryPage(page);
        });

        test.describe("Product details", () => {
            test.use({ pagePath: navigationProductPath });

            test("NAV-02 - All Items returns from product details to Products", async ({ page, productDetailsPage, navigationPage }) => {
                await assertProductDetailsPage(productDetailsPage, productToOpen.id, productToOpen.name);
                await navigationPage.openAllItems();
                await assertInventoryPage(page);
            });
        });
    });

    for (const routeCase of protectedRouteCases) {
        test.describe(`${routeCase.name} without a session`, () => {
            test.use({ pagePath: routeCase.pagePath, sessionUsername: "" });

            test(`${routeCase.testId} - ${routeCase.name} access is blocked without a session`, async ({ loginPage }) => {
                await assertProtectedRouteRedirect(loginPage, routeCase.errorMessage);
            });
        });
    }
});
