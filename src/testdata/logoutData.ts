import { urlPaths } from "../config/routes";
import { usernames } from "../config/users";

export const logoutUsername = usernames.standard;
export const inventoryAccessError = `You can only access '${urlPaths.inventory}' when you are logged in.`;
