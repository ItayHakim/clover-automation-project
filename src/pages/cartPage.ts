import type { Locator, Page } from "@playwright/test";
import { cartSelectors } from "../mapping/cartSelectors";

export class CartPage {
  readonly pageTitle: Locator;
  readonly cartItems: Locator;

  constructor(readonly page: Page) {
    this.pageTitle = page.locator(cartSelectors.pageTitle);
    this.cartItems = page.locator(cartSelectors.cartItems);
  }
}
