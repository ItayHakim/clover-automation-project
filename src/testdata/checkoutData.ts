import { usernames } from "../config/users";
import type { CartProductType } from "../models/cartTypes";
import type { CheckoutCustomerType, RejectedCheckoutCaseType } from "../models/checkoutTypes";

export const checkoutUsername = usernames.standard;
export const checkoutTaxRate = 0.08;
export const orderConfirmationMessage = "Thank you for your order!";

export const checkoutProducts: CartProductType[] = [
  { id: 4, name: "Sauce Labs Backpack", price: 29.99, quantity: 1 },
  { id: 0, name: "Sauce Labs Bike Light", price: 9.99, quantity: 1 },
];

export const customerDetails: CheckoutCustomerType = {
  firstName: "Test",
  lastName: "User",
  postalCode: "12345",
};

export const rejectedCheckoutCases: RejectedCheckoutCaseType[] = [
  {
    testId: "CHECKOUT-02",
    name: "missing first name",
    customerDetails: { ...customerDetails, firstName: "" },
    errorMessage: "Error: First Name is required",
  },
  {
    testId: "CHECKOUT-03",
    name: "missing last name",
    customerDetails: { ...customerDetails, lastName: "" },
    errorMessage: "Error: Last Name is required",
  },
  {
    testId: "CHECKOUT-04",
    name: "missing postal code",
    customerDetails: { ...customerDetails, postalCode: "" },
    errorMessage: "Error: Postal Code is required",
  },
];
