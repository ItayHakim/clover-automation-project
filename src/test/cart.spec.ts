import { urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
import { addToCartCases, cartUsername, removeFromCartCases } from "../testdata/cartData";
import {
    addProductsToCart,
    assertCartBadge,
    assertCartContents,
} from "../utils/cartUtils";
import { assertInventoryPage } from "../utils/inventoryUtils";

test.describe("Cart Page Tests", () => {
    test.use({ sessionUsername: cartUsername });

    test.describe("Add products", () => {
        test.use({ pagePath: urlPaths.inventory });

        test.beforeEach(async ({ page }) => {
            await assertInventoryPage(page);
        });

        for (const cartCase of addToCartCases) {
            test(`${cartCase.testId} - ${cartCase.name}`, async ({ inventoryPage, navigationPage, cartPage }) => {
                const expectedProducts = await addProductsToCart(inventoryPage, cartCase.products);
                await navigationPage.openCart();
                await assertCartContents(cartPage, expectedProducts);
                await assertCartBadge(navigationPage, expectedProducts.length);
            });
        }
    });

    for (const cartCase of removeFromCartCases) {
        test.describe(cartCase.name, () => {
            test.use({
                pagePath: urlPaths.cart,
                cartProductIds: cartCase.initialProducts.map(product => product.id),
            });

            test(`${cartCase.testId} - ${cartCase.name}`, async ({ cartPage, navigationPage }) => {
                await assertCartContents(cartPage, cartCase.initialProducts);
                await assertCartBadge(navigationPage, cartCase.initialProducts.length);
                await cartPage.removeProduct(cartCase.productToRemove.name);
                await assertCartContents(cartPage, cartCase.remainingProducts);
                await assertCartBadge(navigationPage, cartCase.remainingProducts.length);
            });
        });
    }
});
