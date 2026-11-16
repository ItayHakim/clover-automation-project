import type { Locator, Page } from "@playwright/test";
import { loginSelectors } from "../mapping/loginSelectors";
import { messagesSelectors } from "../mapping/messagesSelectors";

export class LoginPage {
  readonly loginForm: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(readonly page: Page) {
    this.loginForm = page.locator(loginSelectors.loginForm);
    this.usernameInput = page.getByTestId(loginSelectors.usernameInput);
    this.passwordInput = page.getByTestId(loginSelectors.passwordInput);
    this.loginButton = page.getByTestId(loginSelectors.loginButton);
    this.errorMessage = page.getByTestId(messagesSelectors.errorMessage);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
