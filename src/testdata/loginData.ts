import { globalPassword, usernames } from "../config/users";
import type { LoginUserType, RejectedLoginCaseType } from "../models/loginTypes";

export const successfulLoginUsers: LoginUserType[] = [
  { testId: "LOGIN-01", name: "standard user", username: usernames.standard },
  { testId: "LOGIN-02", name: "problem user", username: usernames.problem },
  { testId: "LOGIN-03", name: "visual user", username: usernames.visual },
  { testId: "LOGIN-04", name: "error user", username: usernames.error },
  { testId: "LOGIN-05", name: "performance glitch user", username: usernames.performanceGlitch, isSlow: true, assertionTimeout: 15_000, }
];

export const rejectedLoginCases: RejectedLoginCaseType[] = [
  {
    testId: "LOGIN-06",
    name: "locked-out user",
    username: usernames.lockedOut,
    password: globalPassword,
    errorMessage: "Sorry, this user has been locked out.",
    expectsSessionCookie: true
  },
  {
    testId: "LOGIN-07",
    name: "incorrect password",
    username: usernames.standard,
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
    username: usernames.standard,
    password: "",
    errorMessage: "Password is required"
  }
];
