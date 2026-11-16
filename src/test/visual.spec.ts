import { urlPaths } from "../config/routes";
import { basePage as test, expect } from "../fixture/basePage";

test.use({ pagePath: urlPaths.login });

test("VISUAL-01 - login form matches the visual baseline", { tag: ["@visual", "@regression"] }, async ({ loginPage }) => {
    await expect(loginPage.loginForm).toHaveScreenshot("login-form.png");
});
