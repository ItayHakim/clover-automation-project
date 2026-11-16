import type { Locator, Page } from "@playwright/test";
import { navigationSelectors } from "../mapping/navigationSelectors";

export class NavigationPage {
  readonly cartLink: Locator;
  readonly menuButton: Locator;
  readonly allItemsLink: Locator;

  constructor(readonly page: Page) {
    this.cartLink = page.locator(navigationSelectors.cartLink);
    this.menuButton = page.locator(navigationSelectors.menuButton);
    this.allItemsLink = page.locator(navigationSelectors.allItemsLink);
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openAllItems() {
    await this.menuButton.click();
    await this.allItemsLink.click();
  }
}
