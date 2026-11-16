import { expect } from "@playwright/test";
import { getProductDetailsPath } from "../config/routes";
import type { ProductDetailsType } from "../models/productTypes";
import { ProductDetailsPage } from "../pages/productDetailsPage";

export async function assertProductDetailsPage(
    productDetailsPage: ProductDetailsPage,
    productId: number,
    productName: string,
) {
    await expect(productDetailsPage.page).toHaveURL(getProductDetailsPath(productId));
    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.productName).toHaveText(productName);
}

export async function assertProductDetails(
    productDetailsPage: ProductDetailsPage,
    expectedDetails: ProductDetailsType,
    productId: number,
) {
    await assertProductDetailsPage(productDetailsPage, productId, expectedDetails.name);
    await expect.soft(productDetailsPage.productDescription).toBeVisible();
    await expect.soft(productDetailsPage.productDescription).toHaveText(expectedDetails.description);
    await expect.soft(productDetailsPage.productPrice).toBeVisible();
    await expect.soft(productDetailsPage.productPrice).toHaveText(expectedDetails.price);
}
