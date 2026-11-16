import type { Locator, Page } from "@playwright/test";
import { cartSelectors } from "../mapping/cartSelectors";
import { checkoutSelectors } from "../mapping/checkoutSelectors";
import type { CheckoutCustomerType } from "../models/checkoutTypes";

export class CheckoutPage {
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly orderItems: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(readonly page: Page) {
    this.pageTitle = page.locator(checkoutSelectors.pageTitle);
    this.firstNameInput = page.locator(checkoutSelectors.firstNameInput);
    this.lastNameInput = page.locator(checkoutSelectors.lastNameInput);
    this.postalCodeInput = page.locator(checkoutSelectors.postalCodeInput);
    this.continueButton = page.locator(checkoutSelectors.continueButton);
    this.cancelButton = page.locator(checkoutSelectors.cancelButton);
    this.errorMessage = page.locator(checkoutSelectors.errorMessage);
    this.orderItems = page.locator(cartSelectors.cartItems);
    this.subtotal = page.locator(checkoutSelectors.subtotal);
    this.tax = page.locator(checkoutSelectors.tax);
    this.total = page.locator(checkoutSelectors.total);
    this.finishButton = page.locator(checkoutSelectors.finishButton);
    this.confirmationMessage = page.locator(checkoutSelectors.confirmationMessage);
  }

  async submitInformation(customerDetails: CheckoutCustomerType) {
    await this.firstNameInput.fill(customerDetails.firstName);
    await this.lastNameInput.fill(customerDetails.lastName);
    await this.postalCodeInput.fill(customerDetails.postalCode);
    await this.continueButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
