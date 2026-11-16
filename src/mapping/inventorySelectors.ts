import { navigationSelectors } from "./navigationSelectors";

export const inventorySelectors = {
  pageTitle: navigationSelectors.pageTitle,
  productItem: "inventory-item",
  productName: "inventory-item-name",
  productDescription: "inventory-item-desc",
  productPrice: "inventory-item-price",
  productImage: "img",
  sortDropdown: "product-sort-container",
  addToCartButton: /^add-to-cart-/,
  logoutLink: "logout-sidebar-link",
};

export const productSortOptions = {
  nameAscending: "az",
  nameDescending: "za",
  priceAscending: "lohi",
  priceDescending: "hilo",
} as const;
