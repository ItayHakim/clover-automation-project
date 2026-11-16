export function parsePrice(priceText: string): number {
    return Number(priceText.replace("$", ""));
}

export function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}
