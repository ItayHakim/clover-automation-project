import { urlPaths } from "../config/routes";
import { getRequiredEnvValue } from "../utils/commonUtils";

export const logoutUsername = getRequiredEnvValue("STANDARD_USERNAME");
export const inventoryAccessError = `You can only access '${urlPaths.inventory}' when you are logged in.`;
