import { usernames } from "../config/users";
import type { AddToCartCaseType, RemoveFromCartCaseType } from "../models/cartTypes";
import { backpackProduct, bikeLightProduct } from "./productsData";

export const cartUsername = usernames.standard;

export const addToCartCases: AddToCartCaseType[] = [
  {
    testId: "CART-01",
    name: "add Sauce Labs Backpack to Cart",
    products: [backpackProduct],
  },
  {
    testId: "CART-02",
    name: "add Backpack and Bike Light to Cart",
    products: [backpackProduct, bikeLightProduct],
  },
];

export const removeFromCartCases: RemoveFromCartCaseType[] = [
  {
    testId: "CART-03",
    name: "remove Backpack and keep Bike Light in Cart",
    initialProducts: [backpackProduct, bikeLightProduct],
    productToRemove: backpackProduct,
    remainingProducts: [bikeLightProduct],
  },
  {
    testId: "CART-04",
    name: "remove the last product from Cart",
    initialProducts: [backpackProduct],
    productToRemove: backpackProduct,
    remainingProducts: [],
  },
];
