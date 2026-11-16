import { urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
import { inventoryAccessError, logoutUsername } from "../testdata/logoutData";
import { assertRejectedLogin, assertSuccessfulLogin } from "../utils/loginUtils";
import { assertSuccessfulLogout } from "../utils/logoutUtils";

test.describe("Logout Page Tests", () => {
    test.use({ pagePath: urlPaths.inventory, sessionUsername: logoutUsername });

    test.beforeEach(async ({ page }) => {
        await assertSuccessfulLogin(page, logoutUsername);
    });

    test("LOGOUT-01 - standard user can log out and return to Login", async ({ inventoryPage, loginPage }) => {
        await inventoryPage.logout();
        await assertSuccessfulLogout(loginPage);
    });

    test("LOGOUT-02 - Inventory access is blocked after logout", async ({ page, inventoryPage, loginPage }) => {
        await inventoryPage.logout();
        await assertSuccessfulLogout(loginPage);
        await page.goto(urlPaths.inventory);
        await assertRejectedLogin(loginPage, inventoryAccessError);
    });
});
