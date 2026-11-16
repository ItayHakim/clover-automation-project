import { navigationSelectors } from "./navigationSelectors";

export const checkoutSelectors = {
  pageTitle: navigationSelectors.pageTitle,
  firstNameInput: "firstName",
  lastNameInput: "lastName",
  postalCodeInput: "postalCode",
  continueButton: "continue",
  cancelButton: "cancel",
  subtotal: "subtotal-label",
  tax: "tax-label",
  total: "total-label",
  finishButton: "finish",
  confirmationMessage: "complete-header",
  backHomeButton: "back-to-products",
};
