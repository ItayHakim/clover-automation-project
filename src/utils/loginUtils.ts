import { Page } from "playwright/test";
import { loginSelectors } from "../mapping/loginSelectors";
export function fillLoginDetails(username: string, password: string, page: Page) {
  page.locator(loginSelectors.usernameInput).fill(username);
  page.locator(loginSelectors.passwordInput).fill(password);
  page.locator(loginSelectors.loginButton).click();
}