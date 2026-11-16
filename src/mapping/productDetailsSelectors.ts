import { inventorySelectors } from "./inventorySelectors";

export const productDetailsSelectors = {
  productDetails: ".inventory_details_container",
  productName: inventorySelectors.productName,
  productDescription: inventorySelectors.productDescription,
  productPrice: inventorySelectors.productPrice,
};
