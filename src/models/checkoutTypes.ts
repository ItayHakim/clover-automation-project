export type CheckoutCustomerType = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export type RejectedCheckoutCaseType = {
  testId: string;
  name: string;
  customerDetails: CheckoutCustomerType;
  errorMessage: string;
};
