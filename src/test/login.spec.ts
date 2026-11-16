import { urlPaths } from "../config/routes";
import { basePage as test } from "../fixture/basePage";
import { globalPassword, rejectedLoginCases, successfulLoginUsers } from "../testdata/loginData";
import { assertRejectedLogin, assertSuccessfulLogin } from "../utils/loginUtils";

test.describe("Login Page Tests", () => {
    test.use({ pagePath: urlPaths.login });

    for (const user of successfulLoginUsers) {
        test(`${user.testId} - ${user.name} can log in and view Products`, async ({ page, loginPage }) => {
            test.slow(user.isSlow === true);
            await loginPage.login(user.username, globalPassword);
            await assertSuccessfulLogin(page, user.username, user.assertionTimeout);
        });
    }

    for (const loginCase of rejectedLoginCases) {
        test(`${loginCase.testId} - ${loginCase.name} stays on Login with the expected error`, async ({ loginPage }) => {
            await loginPage.login(loginCase.username, loginCase.password);
            await assertRejectedLogin(
                loginPage,
                loginCase.errorMessage,
                loginCase.expectsSessionCookie ? loginCase.username : undefined,
            );
        });
    }
});
