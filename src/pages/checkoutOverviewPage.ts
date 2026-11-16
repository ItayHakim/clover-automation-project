import type { Locator, Page } from "@playwright/test";
import { cartSelectors } from "../mapping/cartSelectors";
import { checkoutSelectors } from "../mapping/checkoutSelectors";

export class CheckoutOverviewPage {
  readonly pageTitle: Locator;
  readonly orderItems: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(readonly page: Page) {
    this.pageTitle = page.getByTestId(checkoutSelectors.pageTitle);
    this.orderItems = page.getByTestId(cartSelectors.cartItems);
    this.subtotal = page.getByTestId(checkoutSelectors.subtotal);
    this.tax = page.getByTestId(checkoutSelectors.tax);
    this.total = page.getByTestId(checkoutSelectors.total);
    this.finishButton = page.getByTestId(checkoutSelectors.finishButton);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
