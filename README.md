# clover-automation-project

End-to-end automation tests for the Swag Labs demo shop, built with Playwright Test and TypeScript. The current suite covers login, logout, Products, Cart, Checkout, and Navigation on Sauce Demo. [Swag Labs](https://www.saucedemo.com/)

## Requirements

- Node.js 24.x and npm
- Git
- Internet access to install dependencies and browsers and reach Sauce Demo

The commands below use Windows PowerShell.

## Setup

Clone the repository and install the project dependencies.

```powershell
git clone https://github.com/ItayHakim/clover-automation-project.git
cd clover-automation-project
npm i
```

Create your local environment file during the first setup, then install Chromium, the browser configured for this project.

```powershell
Copy-Item .env.example .env
npx playwright install chromium
```

Run all subsequent commands from the project root.

## Environment variables

`.env.example` contains the public Sauce Demo accounts and shared password. Copy it to `.env` and adjust the values for your local setup.

| Variable | Example value | Purpose |
| --- | --- | --- |
| `BASE_URL` | `https://www.saucedemo.com/` | Website URL |
| `STANDARD_USERNAME` | `standard_user` | Standard account and invalid-input scenarios |
| `LOCKED_OUT_USERNAME` | `locked_out_user` | Locked-out account |
| `PROBLEM_USERNAME` | `problem_user` | Problem account |
| `PERFORMANCE_GLITCH_USERNAME` | `performance_glitch_user` | Slow account |
| `ERROR_USERNAME` | `error_user` | Error account |
| `VISUAL_USERNAME` | `visual_user` | Visual account |
| `GLOBAL_PASSWORD` | `secret_sauce` | Shared valid password |

`dotenv` loads these values into `process.env`. The route configuration validates `BASE_URL`, and the login data loader checks that all required credentials are present. Git ignores `.env`, while `.env.example` is included in the repository for setup.

## Running tests

Run the complete suite in headless mode.

```powershell
npm test
```

Run only the login test file.

```powershell
npm test -- src/test/login.spec.ts
```

Run a single scenario by its test ID. This example runs the locked-out account case.

```powershell
npm test -- src/test/login.spec.ts -g "LOGIN-06"
```

Open the browser during execution or use Playwright's interactive test UI.

```powershell
npm run test:headed
npm run test:ui
```

List discovered tests or check TypeScript types.

```powershell
npm test -- --list
npx tsc --noEmit
```

To run the login suite with three workers and retries disabled, use

```powershell
npm test -- src/test/login.spec.ts --workers=3 --retries=0
```

## Current test coverage

The suite currently contains 30 tests, covering nine Login, six Products, four Cart, five Checkout, four Navigation, and two Logout scenarios.

The login suite generates nine independent tests from the scenario data in `src/testdata/loginData.ts`.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `LOGIN-01` | Standard user | `/inventory.html` and a visible Products title |
| `LOGIN-02` | Problem user | `/inventory.html` and a visible Products title |
| `LOGIN-03` | Visual user | `/inventory.html` and a visible Products title |
| `LOGIN-04` | Error user | `/inventory.html` and a visible Products title |
| `LOGIN-05` | Performance glitch user | `/inventory.html` and a visible Products title |
| `LOGIN-06` | Locked-out user | Login page with the locked-out error |
| `LOGIN-07` | Incorrect password | Login page with the invalid-credentials error |
| `LOGIN-08` | Missing username | Login page with the username-required error |
| `LOGIN-09` | Missing password | Login page with the password-required error |

Rejected login tests also check that the username field, password field, and login button are visible. The incorrect-password scenario derives an invalid value from the shared password. The missing-field scenarios submit an empty string for the relevant field.

The Products suite covers the six scenarios from the diagram's Products page. Each test injects the standard user's session cookie and opens Inventory directly.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `PRODUCT-01` | Display the catalog | Six cards, each with a visible name, image, and price |
| `PRODUCT-02` | Name (A to Z) | Full name list in ascending order, starting from verified Z-to-A order |
| `PRODUCT-03` | Name (Z to A) | Full name list in descending order |
| `PRODUCT-04` | Price (low to high) | Full price list in ascending numeric order |
| `PRODUCT-05` | Price (high to low) | Full price list in descending numeric order |
| `PRODUCT-06` | Open Sauce Labs Backpack | Item URL and name, description, and price match its catalog card |

The Cart suite covers the four scenarios from the diagram's Cart page. Each test injects the standard user's session cookie. Add tests start on Inventory, save each product's displayed name and price, click Add to cart, and open Cart. Removal tests seed the required items and open Cart directly, then verify the starting contents and badge before clicking Remove.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `CART-01` | Add Sauce Labs Backpack | Cart contains only Backpack with the saved name and price, quantity 1, and badge 1 |
| `CART-02` | Add Backpack and Bike Light | Cart contains exactly both saved products with matching prices, quantity 1 each, and badge 2 |
| `CART-03` | Remove Backpack from a two-item cart | Only Bike Light remains with the expected price, quantity 1, and badge 1 |
| `CART-04` | Remove Backpack from a one-item cart | Cart has no item rows and the badge is absent |

Cart scenarios live in `src/testdata/cartData.ts`. Backpack and Bike Light definitions in `src/testdata/productsData.ts` are shared by Cart and Checkout.

The Checkout suite covers the five scenarios from the diagram's Checkout page. Each test injects the standard user's session cookie and seeds `cart-contents` in local storage before opening `/checkout-step-one.html` directly. The completed order uses Backpack and Bike Light; validation and cancellation use Backpack only.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `CHECKOUT-01` | Valid customer details | Overview items, quantities, prices, subtotal, 8% tax rounded to cents, and total match; Finish shows confirmation and clears the cart |
| `CHECKOUT-02` | Missing first name | Stay on Your Information with the first-name-required error |
| `CHECKOUT-03` | Missing last name | Stay on Your Information with the last-name-required error |
| `CHECKOUT-04` | Missing postal code | Stay on Your Information with the postal-code-required error |
| `CHECKOUT-05` | Cancel from Your Information | Return to Cart with the same item, quantity, and price |

The overview assertions stop the test on a mismatch before clicking Finish. Expected products and customer inputs live in `src/testdata/checkoutData.ts`.

The Logout suite contains two tests. Each test injects the standard user's session cookie and opens Inventory directly.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `LOGOUT-01` | Log out as the standard user | Return to Login with visible login fields and button, and the session cookie removed |
| `LOGOUT-02` | Open Inventory after logout | Redirect to Login with the Inventory-access error |

The Navigation suite covers the four scenarios from the diagram's Navigation page. Signed-in tests inject the standard user's session cookie and open Products or Sauce Labs Backpack details directly. Protected-route tests open their target URL in a fresh signed-out context.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `NAV-01` | Open Cart, then Continue Shopping | `/cart.html` with a visible Your Cart title, then `/inventory.html` with a visible Products title |
| `NAV-02` | Choose All Items from product details | Verified Backpack details return to `/inventory.html` with a visible Products title |
| `NAV-03` | Open Inventory without a session | Redirect to Login with the Inventory-access error, visible login fields and button, and no session cookie |
| `NAV-04` | Open Cart without a session | Redirect to Login with the Cart-access error, visible login fields and button, and no session cookie |

Navigation route and title assertions stop the test on a mismatch before the next action.

## Project structure

```text
clover-automation-project/
|-- src/
|   |-- config/
|   |   |-- cookies.ts
|   |   |-- localStorage.ts
|   |   |-- routes.ts
|   |   `-- users.ts
|   |-- fixture/
|   |   `-- basePage.ts
|   |-- mapping/
|   |   |-- cartSelectors.ts
|   |   |-- checkoutSelectors.ts
|   |   |-- inventorySelectors.ts
|   |   |-- loginSelectors.ts
|   |   |-- navigationSelectors.ts
|   |   `-- productDetailsSelectors.ts
|   |-- models/
|   |   |-- cartTypes.ts
|   |   |-- checkoutTypes.ts
|   |   |-- loginTypes.ts
|   |   |-- navigationTypes.ts
|   |   `-- productTypes.ts
|   |-- pages/
|   |   |-- cartPage.ts
|   |   |-- checkoutPage.ts
|   |   |-- inventoryPage.ts
|   |   |-- loginPage.ts
|   |   |-- navigationPage.ts
|   |   `-- productDetailsPage.ts
|   |-- test/
|   |   |-- cart.spec.ts
|   |   |-- checkout.spec.ts
|   |   |-- login.spec.ts
|   |   |-- logout.spec.ts
|   |   |-- navigaton.spec.ts
|   |   `-- products.spec.ts
|   |-- testdata/
|   |   |-- cartData.ts
|   |   |-- checkoutData.ts
|   |   |-- loginData.ts
|   |   |-- logoutData.ts
|   |   |-- navigationData.ts
|   |   `-- productsData.ts
|   `-- utils/
|       |-- cartUtils.ts
|       |-- checkoutUtils.ts
|       |-- commonUtils.ts
|       |-- inventoryUtils.ts
|       |-- loginUtils.ts
|       |-- logoutUtils.ts
|       |-- navigationUtils.ts
|       `-- productsUtils.ts
|-- .env.example
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- playwright.config.ts
|-- README.md
`-- tsconfig.json
```

| Folder | Responsibility |
| --- | --- |
| `config` | Environment-based URL, page paths, cookie names, and local storage keys |
| `fixture` | Shared navigation, session cookie and cart setup, and Page Object injection |
| `mapping` | Page selectors and product sort values |
| `models` | TypeScript types for users, products, cart items, checkout inputs, and protected-route scenarios |
| `pages` | Page Object classes with locators and actions |
| `test` | Test suites and scenario execution |
| `testdata` | Environment-based inputs, expected errors, and per-user settings |
| `utils` | Shared environment and login helpers, and assertions |

## Test setup and timeouts

Tests import `basePage` as `test` from the custom fixture. Before each test uses its page, the fixture navigates to `pagePath` and checks that the browser title contains Swag Labs. Tests can set their initial route with `test.use({ pagePath: urlPaths.login })`. The fixture provides `loginPage`, `inventoryPage`, `productDetailsPage`, `cartPage`, `checkoutPage`, and `navigationPage` instances. Products, Cart, Logout, and signed-in Navigation tests set `sessionUsername` to inject the session cookie before navigation, using `test.use({ pagePath: urlPaths.inventory, sessionUsername: usernames.standard })` when starting on Products.

Playwright is configured with `testIdAttribute: "data-test"`. Mapping files store the attribute values, and Page Objects and assertion helpers use `getByTestId()` to locate them:

```ts
// loginSelectors.usernameInput is "username"
this.usernameInput = page.getByTestId(loginSelectors.usernameInput);
```

Scoped Add and Remove buttons use regular expressions to match their test ID prefixes. CSS locators remain where a test ID does not provide the required scope, such as the menu button and product details container.

Checkout and Cart removal tests set `cartProductIds` to seed the cart before the first navigation. For example, `[4, 0]` is stored as the JSON array `[4,0]` under `localStorageKeys.cartContents` for the configured website origin. The fixture applies this storage state once per test, so later navigation does not restore removed items.

Each test receives an isolated browser context. `fullyParallel: true` enables parallel execution across and within test files.

The performance glitch user has `isSlow: true`, which enables `test.slow()` for that case. Its `assertionTimeout: 15_000` gives the inventory URL and Products title checks extra time. `test.slow()` extends the overall test timeout, while the optional timeout argument in `assertSuccessfulLogin(page, username, timeout?: number)` controls those assertions. Other users use the configured assertion timeout.

The shared assertions use Playwright's built-in assertions, including soft assertions that allow the remaining UI checks to run while recording a failure.

## Configuration and reports

The current settings in `playwright.config.ts` are

| Setting | Value |
| --- | --- |
| Test directory | `./src/test` |
| Browser project | Chromium with Desktop Chrome settings |
| Test ID attribute | `data-test` |
| Parallel execution | Enabled |
| Test timeout | 30 seconds |
| Default assertion timeout | 5 seconds |
| Retries | 2 |
| Reporter | HTML |
| Screenshots | On failure |
| Videos | Retained on failure |
| Traces | On the first retry |

After a test run, open the HTML report with

```powershell
npx playwright show-report
```

The report is generated in `playwright-report/`. Failure screenshots, retained videos, and retry traces are stored in `test-results/` and linked from the report. Both folders are ignored by Git. A run with retries disabled produces no first-retry trace.
