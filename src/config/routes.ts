import "dotenv/config";

export const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error("BASE_URL is required. Copy .env.example to .env and set the website URL.");
}
else if (!baseURL.startsWith("http")) {
  throw new Error("BASE_URL must start with http or https.");
}

export const urlPaths = {
  login: "/",
  inventory: "/inventory.html",  
  cart: "/cart.html",
}
