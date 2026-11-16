import { getProductDetailsPath, urlPaths } from "../config/routes";
import { usernames } from "../config/users";
import type { ProtectedRouteCaseType } from "../models/navigationTypes";
import { getProtectedRouteError } from "./errorMessages";
import { productToOpen } from "./productsData";

export const navigationUsername = usernames.standard;
export const navigationProductPath = getProductDetailsPath(productToOpen.id);

export const protectedRouteCases: ProtectedRouteCaseType[] = [
  {
    testId: "NAV-03",
    name: "Inventory",
    pagePath: urlPaths.inventory,
    errorMessage: getProtectedRouteError(urlPaths.inventory),
  },
  {
    testId: "NAV-04",
    name: "Cart",
    pagePath: urlPaths.cart,
    errorMessage: getProtectedRouteError(urlPaths.cart),
  },
];
