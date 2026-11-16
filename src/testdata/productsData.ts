import { usernames } from "../config/users";
import { productSortOptions } from "../mapping/inventorySelectors";
import type { CartProductType } from "../models/cartTypes";
import type { ProductSortCaseType } from "../models/productTypes";

export const productsUsername = usernames.standard;
export const productCount = 6;
export const backpackProduct: CartProductType = { id: 4, name: "Sauce Labs Backpack", price: 29.99, quantity: 1 };
export const bikeLightProduct: CartProductType = { id: 0, name: "Sauce Labs Bike Light", price: 9.99, quantity: 1 };
export const productToOpen = backpackProduct;

export const productSortCases: ProductSortCaseType[] = [
  {
    testId: "PRODUCT-02",
    name: "Name (A to Z)",
    sortOption: productSortOptions.nameAscending,
    sortBy: "name",
    descending: false,
  },
  {
    testId: "PRODUCT-03",
    name: "Name (Z to A)",
    sortOption: productSortOptions.nameDescending,
    sortBy: "name",
    descending: true,
  },
  {
    testId: "PRODUCT-04",
    name: "Price (low to high)",
    sortOption: productSortOptions.priceAscending,
    sortBy: "price",
    descending: false,
  },
  {
    testId: "PRODUCT-05",
    name: "Price (high to low)",
    sortOption: productSortOptions.priceDescending,
    sortBy: "price",
    descending: true,
  },
];
