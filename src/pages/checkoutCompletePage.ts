import type { Locator, Page } from "@playwright/test";
import { checkoutSelectors } from "../mapping/checkoutSelectors";

export class CheckoutCompletePage {
  readonly confirmationMessage: Locator;
  readonly backHomeButton: Locator;

  constructor(readonly page: Page) {
    this.confirmationMessage = page.getByTestId(checkoutSelectors.confirmationMessage);
    this.backHomeButton = page.getByTestId(checkoutSelectors.backHomeButton);
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }
}
