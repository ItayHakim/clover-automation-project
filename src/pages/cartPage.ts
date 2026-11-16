import type { Locator, Page } from "@playwright/test";
import { cartSelectors } from "../mapping/cartSelectors";

export class CartPage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;

  constructor(readonly page: Page) {
    this.pageTitle = page.getByTestId(cartSelectors.pageTitle);
    this.cartItems = page.getByTestId(cartSelectors.cartItems);
    this.continueShoppingButton = page.getByTestId(cartSelectors.continueShoppingButton);
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  getProduct(name: string) {
    return this.cartItems.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async removeProduct(name: string) {
    await this.getProduct(name).getByTestId(cartSelectors.removeButton).click();
  }
}
