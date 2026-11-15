import "dotenv/config";
import { getRequiredEnvValue } from "../utils/commonUtils";
import type { LoginUserType, RejectedLoginCaseType } from "../models/loginTypes";

const standardUsername = getRequiredEnvValue("STANDARD_USERNAME");
export const globalPassword = getRequiredEnvValue("GLOBAL_PASSWORD");

export const successfulLoginUsers: LoginUserType[] = [
  { testId: "LOGIN-01", name: "standard user", username: standardUsername },
  { testId: "LOGIN-02", name: "problem user", username: getRequiredEnvValue("PROBLEM_USERNAME") },
  { testId: "LOGIN-03", name: "visual user", username: getRequiredEnvValue("VISUAL_USERNAME") },
  { testId: "LOGIN-04", name: "error user", username: getRequiredEnvValue("ERROR_USERNAME") },
  { testId: "LOGIN-05", name: "performance glitch user", username: getRequiredEnvValue("PERFORMANCE_GLITCH_USERNAME"), isSlow: true, }
];

export const rejectedLoginCases: RejectedLoginCaseType[] = [
  {
    testId: "LOGIN-06",
    name: "locked-out user",
    username: getRequiredEnvValue("LOCKED_OUT_USERNAME"),
    password: globalPassword,
    errorMessage: "Sorry, this user has been locked out."
  },
  {
    testId: "LOGIN-07",
    name: "incorrect password",
    username: standardUsername,
    password: `${globalPassword}_incorrect`,
    errorMessage: "Username and password do not match any user in this service"
  },
  {
    testId: "LOGIN-08",
    name: "missing username",
    username: "",
    password: globalPassword,
    errorMessage: "Username is required"
  },
  {
    testId: "LOGIN-09",
    name: "missing password",
    username: standardUsername,
    password: "",
    errorMessage: "Password is required"
  }
];
