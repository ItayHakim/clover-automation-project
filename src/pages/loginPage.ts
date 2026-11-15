import type { Locator, Page } from "@playwright/test";
import { loginSelectors } from "../mapping/loginSelectors";

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(readonly page: Page) {
    this.usernameInput = page.locator(loginSelectors.usernameInput);
    this.passwordInput = page.locator(loginSelectors.passwordInput);
    this.loginButton = page.locator(loginSelectors.loginButton);
    this.errorMessage = page.locator(loginSelectors.errorMessage);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
