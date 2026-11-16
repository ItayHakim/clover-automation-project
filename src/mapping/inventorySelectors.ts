import { navigationSelectors } from "./navigationSelectors";

export const inventorySelectors = {
  pageTitle: "title",
  productCards: "inventory-item",
  productName: "inventory-item-name",
  productDescription: "inventory-item-desc",
  productPrice: "inventory-item-price",
  productImage: "img",
  sortDropdown: "product-sort-container",
  addToCartButton: /^add-to-cart-/,
  menuButton: navigationSelectors.menuButton,
  logoutLink: "logout-sidebar-link"
};

export const productSortOptions = {
  nameAscending: "az",
  nameDescending: "za",
  priceAscending: "lohi",
  priceDescending: "hilo",
} as const;
