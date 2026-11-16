import type { Locator, Page } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";

export class InventoryPage {
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(readonly page: Page) {
    this.menuButton = page.locator(inventorySelectors.menuButton);
    this.logoutLink = page.locator(inventorySelectors.logoutLink);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
