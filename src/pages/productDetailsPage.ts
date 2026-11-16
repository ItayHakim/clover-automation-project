import type { Locator, Page } from "@playwright/test";
import { productDetailsSelectors } from "../mapping/productDetailsSelectors";

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(readonly page: Page) {
    const productDetails = page.locator(productDetailsSelectors.productDetails);
    this.productName = productDetails.getByTestId(productDetailsSelectors.productName);
    this.productDescription = productDetails.getByTestId(productDetailsSelectors.productDescription);
    this.productPrice = productDetails.getByTestId(productDetailsSelectors.productPrice);
  }
}
