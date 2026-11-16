import { urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
import { assertCartContents } from "../utils/cartUtils";
import {
    checkoutProducts,
    checkoutTaxRate,
    checkoutUsername,
    customerDetails,
    orderConfirmationMessage,
    rejectedCheckoutCases,
} from "../testdata/checkoutData";
import {
    assertCheckoutInformation,
    assertCheckoutOverview,
    assertRejectedCheckout,
    assertSuccessfulCheckout,
} from "../utils/checkoutUtils";

test.describe("Checkout Page Tests", () => {
    test.use({
        pagePath: urlPaths.checkoutInformation,
        sessionUsername: checkoutUsername,
        cartProductIds: [checkoutProducts[0].id],
    });

    test.beforeEach(async ({ checkoutPage }) => {
        await assertCheckoutInformation(checkoutPage);
    });

    test.describe("Complete an order", () => {
        test.use({ cartProductIds: checkoutProducts.map(product => product.id) });

        test("CHECKOUT-01 - valid customer details complete an order", async ({ checkoutPage }) => {
            await checkoutPage.submitInformation(customerDetails);
            await assertCheckoutOverview(checkoutPage, checkoutProducts, checkoutTaxRate);
            await checkoutPage.finishCheckout();
            await assertSuccessfulCheckout(checkoutPage, orderConfirmationMessage);
        });
    });

    for (const checkoutCase of rejectedCheckoutCases) {
        test(`${checkoutCase.testId} - ${checkoutCase.name} stays on Your Information with the expected error`, async ({ checkoutPage }) => {
            await checkoutPage.submitInformation(checkoutCase.customerDetails);
            await assertRejectedCheckout(checkoutPage, checkoutCase.errorMessage);
        });
    }

    test("CHECKOUT-05 - cancel checkout returns to Cart with the same item", async ({ checkoutPage, cartPage }) => {
        await checkoutPage.cancelCheckout();
        await assertCartContents(cartPage, [checkoutProducts[0]]);
    });
});
