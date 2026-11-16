import type { Locator, Page } from "@playwright/test";
import { checkoutSelectors } from "../mapping/checkoutSelectors";
import { messagesSelectors } from "../mapping/messagesSelectors";
import type { CheckoutCustomerType } from "../models/checkoutTypes";

export class CheckoutPage {
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(readonly page: Page) {
    this.pageTitle = page.getByTestId(checkoutSelectors.pageTitle);
    this.firstNameInput = page.getByTestId(checkoutSelectors.firstNameInput);
    this.lastNameInput = page.getByTestId(checkoutSelectors.lastNameInput);
    this.postalCodeInput = page.getByTestId(checkoutSelectors.postalCodeInput);
    this.continueButton = page.getByTestId(checkoutSelectors.continueButton);
    this.cancelButton = page.getByTestId(checkoutSelectors.cancelButton);
    this.errorMessage = page.getByTestId(messagesSelectors.errorMessage);
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
}
