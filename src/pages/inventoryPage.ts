import type { Locator, Page } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";
import type { ProductDetailsType, ProductSortOptionType } from "../models/productTypes";

export class InventoryPage {
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(readonly page: Page) {
    this.menuButton = page.locator(inventorySelectors.menuButton);
    this.logoutLink = page.locator(inventorySelectors.logoutLink);
    this.productCards = page.locator(inventorySelectors.productCards);
    this.productNames = this.productCards.locator(inventorySelectors.productName);
    this.productPrices = this.productCards.locator(inventorySelectors.productPrice);
    this.sortDropdown = page.locator(inventorySelectors.sortDropdown);
  }

  getProduct(name: string) {
    return this.productCards.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async getProductDetails(name: string): Promise<ProductDetailsType> {
    const product = this.getProduct(name);

    return {
      name: await product.locator(inventorySelectors.productName).innerText(),
      description: await product.locator(inventorySelectors.productDescription).innerText(),
      price: await product.locator(inventorySelectors.productPrice).innerText(),
    };
  }

  async openProduct(name: string) {
    await this.getProduct(name).locator(inventorySelectors.productName).click();
  }

  async sortProducts(sortOption: ProductSortOptionType) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => Number(price.replace("$", "")));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
