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
    this.pageTitle = page.getByTestId(checkoutSelectors.pageTitle);
    this.firstNameInput = page.getByTestId(checkoutSelectors.firstNameInput);
    this.lastNameInput = page.getByTestId(checkoutSelectors.lastNameInput);
    this.postalCodeInput = page.getByTestId(checkoutSelectors.postalCodeInput);
    this.continueButton = page.getByTestId(checkoutSelectors.continueButton);
    this.cancelButton = page.getByTestId(checkoutSelectors.cancelButton);
    this.errorMessage = page.getByTestId(checkoutSelectors.errorMessage);
    this.orderItems = page.getByTestId(cartSelectors.cartItems);
    this.subtotal = page.getByTestId(checkoutSelectors.subtotal);
    this.tax = page.getByTestId(checkoutSelectors.tax);
    this.total = page.getByTestId(checkoutSelectors.total);
    this.finishButton = page.getByTestId(checkoutSelectors.finishButton);
    this.confirmationMessage = page.getByTestId(checkoutSelectors.confirmationMessage);
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
