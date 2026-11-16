import { expect, type Page } from "@playwright/test";

export function getRequiredEnvValue(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required. Check your .env file against .env.example.`);
  }
  return value;
}

export async function assertCookieValue(page: Page, cookieName: string, expectedValue: string | undefined) {
  const message = expectedValue === undefined
    ? `Expected ${cookieName} cookie to be absent`
    : `Expected ${cookieName} cookie to equal ${expectedValue}`;

  await expect.poll(async () => {
    const cookies = await page.context().cookies(page.url());
    return cookies.find(cookie => cookie.name === cookieName)?.value;
  }, { message }).toBe(expectedValue);
}
