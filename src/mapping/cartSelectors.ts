import { inventorySelectors } from "./inventorySelectors";
import { navigationSelectors } from "./navigationSelectors";

export const cartSelectors = {
  pageTitle: navigationSelectors.pageTitle,
  cartItems: inventorySelectors.productItem,
  productName: inventorySelectors.productName,
  productPrice: inventorySelectors.productPrice,
  productQuantity: "item-quantity",
  continueShoppingButton: "continue-shopping",
  checkoutButton: "checkout",
  removeButton: /^remove-/,
};
