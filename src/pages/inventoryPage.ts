import type { Locator, Page } from "@playwright/test";
import { inventorySelectors } from "../mapping/inventorySelectors";
import { navigationSelectors } from "../mapping/navigationSelectors";
import type { ProductDetailsType, ProductSortOptionType } from "../models/productTypes";
import { parsePrice } from "../utils/priceUtils";

export class InventoryPage {
  readonly pageTitle: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(readonly page: Page) {
    this.pageTitle = page.getByTestId(inventorySelectors.pageTitle);
    this.menuButton = page.locator(navigationSelectors.menuButton);
    this.logoutLink = page.getByTestId(inventorySelectors.logoutLink);
    this.productCards = page.getByTestId(inventorySelectors.productItem);
    this.productNames = this.productCards.getByTestId(inventorySelectors.productName);
    this.productPrices = this.productCards.getByTestId(inventorySelectors.productPrice);
    this.sortDropdown = page.getByTestId(inventorySelectors.sortDropdown);
  }

  getProduct(name: string) {
    return this.productCards.filter({ has: this.page.getByText(name, { exact: true }) });
  }

  async getProductDetails(name: string): Promise<ProductDetailsType> {
    const product = this.getProduct(name);

    return {
      name: await product.getByTestId(inventorySelectors.productName).innerText(),
      description: await product.getByTestId(inventorySelectors.productDescription).innerText(),
      price: await product.getByTestId(inventorySelectors.productPrice).innerText(),
    };
  }

  async openProduct(name: string) {
    await this.getProduct(name).getByTestId(inventorySelectors.productName).click();
  }

  async addToCart(name: string) {
    await this.getProduct(name).getByTestId(inventorySelectors.addToCartButton).click();
  }

  async sortProducts(sortOption: ProductSortOptionType) {
    await this.sortDropdown.selectOption(sortOption);
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map(price => parsePrice(price));
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
