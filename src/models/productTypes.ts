import type { productSortOptions } from "../mapping/inventorySelectors";

export type ProductSortOptionType = (typeof productSortOptions)[keyof typeof productSortOptions];

export type ProductSortCaseType = {
  testId: string;
  name: string;
  sortOption: ProductSortOptionType;
  sortBy: "name" | "price";
  descending: boolean;
};

export type ProductDetailsType = {
  name: string;
  description: string;
  price: string;
};
