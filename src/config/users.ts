import { getRequiredEnvValue } from "../utils/commonUtils";

export const usernames = {
  standard: getRequiredEnvValue("STANDARD_USERNAME"),
  lockedOut: getRequiredEnvValue("LOCKED_OUT_USERNAME"),
  problem: getRequiredEnvValue("PROBLEM_USERNAME"),
  performanceGlitch: getRequiredEnvValue("PERFORMANCE_GLITCH_USERNAME"),
  error: getRequiredEnvValue("ERROR_USERNAME"),
  visual: getRequiredEnvValue("VISUAL_USERNAME"),
} as const;

export const globalPassword = getRequiredEnvValue("GLOBAL_PASSWORD");
