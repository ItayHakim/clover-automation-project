import { baseURL, urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
//import { addRandomProductToCart, assertProductDetailsInCart } from "../utils/cartUtils";
//import { registerSelectors } from "../mapping/registerMapping";
//import { userRegisterDetails } from "../testData/registerData";
//import { assertRegisterDetails, fillRegisterDetails } from "../utils/registerUtils";

test.describe("Login Page Tests", () => {
    test("Verify that the login page loads successfully", async ({ page }) => {
        await page.goto(urlPaths.login);
        await test.expect(page).toHaveTitle(/Swag Labs/);
    })
});  