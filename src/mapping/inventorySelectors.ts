import { navigationSelectors } from "./navigationSelectors";

export const inventorySelectors = {
  pageTitle: '[data-test="title"]',
  productCards: '[data-test="inventory-item"]',
  productName: '[data-test="inventory-item-name"]',
  productDescription: '[data-test="inventory-item-desc"]',
  productPrice: '[data-test="inventory-item-price"]',
  productImage: "img",
  sortDropdown: '[data-test="product-sort-container"]',
  addToCartButton: '[data-test^="add-to-cart-"]',
  menuButton: navigationSelectors.menuButton,
  logoutLink: "#logout_sidebar_link"
};

export const productSortOptions = {
  nameAscending: "az",
  nameDescending: "za",
  priceAscending: "lohi",
  priceDescending: "hilo",
} as const;
