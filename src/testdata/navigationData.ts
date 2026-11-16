import { urlPaths } from "../config/routes";
import { usernames } from "../config/users";
import type { ProtectedRouteCaseType } from "../models/navigationTypes";
import { inventoryAccessError } from "./logoutData";
import { productToOpen } from "./productsData";

export const navigationUsername = usernames.standard;
export const navigationProductPath = `${urlPaths.productDetails}?id=${productToOpen.id}`;

export const protectedRouteCases: ProtectedRouteCaseType[] = [
  {
    testId: "NAV-03",
    name: "Inventory",
    pagePath: urlPaths.inventory,
    errorMessage: inventoryAccessError,
  },
  {
    testId: "NAV-04",
    name: "Cart",
    pagePath: urlPaths.cart,
    errorMessage: `You can only access '${urlPaths.cart}' when you are logged in.`,
  },
];
