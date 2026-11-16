import { urlPaths } from "../config/routes";
import { usernames } from "../config/users";
import { getProtectedRouteError } from "./errorMessages";

export const logoutUsername = usernames.standard;
export const inventoryAccessError = getProtectedRouteError(urlPaths.inventory);
