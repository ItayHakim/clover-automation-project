export type CartProductType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type AddToCartCaseType = {
  testId: string;
  name: string;
  products: CartProductType[];
};

export type RemoveFromCartCaseType = {
  testId: string;
  name: string;
  initialProducts: CartProductType[];
  productToRemove: CartProductType;
  remainingProducts: CartProductType[];
};
