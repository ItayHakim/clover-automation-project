export const inventorySelectors = {
  pageTitle: '[data-test="title"]',
  productCards: '[data-test="inventory-item"]',
  productName: '[data-test="inventory-item-name"]',
  productDescription: '[data-test="inventory-item-desc"]',
  productPrice: '[data-test="inventory-item-price"]',
  productImage: "img",
  sortDropdown: '[data-test="product-sort-container"]',
  menuButton: "#react-burger-menu-btn",
  logoutLink: "#logout_sidebar_link"
};

export const productSortOptions = {
  nameAscending: "az",
  nameDescending: "za",
  priceAscending: "lohi",
  priceDescending: "hilo",
} as const;
