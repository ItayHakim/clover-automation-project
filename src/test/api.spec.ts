import { expect, test } from "@playwright/test";
import { urlPaths } from "../config/routes";

test("HTTP-01 - storefront serves the login HTML", { tag: ["@api", "@regression"] }, async ({ request }) => {
    const response = await request.get(urlPaths.login);

    await expect(response).toBeOK();
    expect(response.headers()["content-type"]).toContain("text/html");
    expect(await response.text()).toContain("Swag Labs");
});
