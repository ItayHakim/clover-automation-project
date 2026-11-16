# cover-automation-project

End-to-end automation tests for the Swag Labs demo shop, built with Playwright Test and TypeScript. The current suite covers login, logout, Products, Cart, Checkout, and Navigation on Sauce Demo. [Swag Labs](https://www.saucedemo.com/)

## Technologies

| Technology | Purpose |
| --- | --- |
| Playwright Test | Browser automation, custom fixtures, assertions, parallel execution, and HTML reporting |
| TypeScript | Strict type checking for tests, Page Objects, fixtures, and scenario data |
| Allure Playwright and Allure Report 3 | Collect test steps and attachments and generate an additional HTML report |
| dotenv | Load the website URL and demo credentials from `.env` |
| Node.js and npm | Run the project and manage dependencies |

## Requirements

- Node.js 24.x and npm
- Git
- Internet access to install dependencies and browsers and reach Sauce Demo

The commands below use Windows PowerShell.

If PowerShell blocks `npm.ps1` or `npx.ps1`, use `npm.cmd` or `npx.cmd` in the commands below.

## Setup

Clone the repository and install the project dependencies.

```powershell
git clone https://github.com/ItayHakim/cover-automation-project.git
cd cover-automation-project
npm ci
npm test
```

`npm ci` runs the setup script, which creates `.env` from `.env.example` when needed and installs Chromium. Review `.env` to customize the website URL or demo accounts.

Run all subsequent commands from the project root.

## Environment variables

`.env.example` contains the public Sauce Demo accounts and shared password. Installation copies it to `.env` when the local file is absent. Adjust `.env` for your local setup.

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

`dotenv` loads these values into `process.env`. The route configuration validates `BASE_URL`, and the user configuration checks that all required credentials are present. Git ignores `.env`, while `.env.example` is included in the repository for setup.

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
npm run typecheck
```

To run the login suite with three workers and retries disabled, use

```powershell
npm test -- src/test/login.spec.ts --workers=3 --retries=0
```

Run the smoke tests or filter the regression, HTTP, or visual checks by tag.

```powershell
npm run test:smoke
npm test -- --grep @regression
npm test -- --grep @api
npm test -- --grep @visual
```

`@smoke` selects six checks covering the catalog, adding one or two products to Cart, completing an order, logging out, and navigating between Cart and Products. `@regression` covers Products, Cart, Checkout, Logout, Navigation, HTTP, and visual checks.

## Current test coverage

The suite contains 32 tests, covering nine Login, six Products, four Cart, five Checkout, four Navigation, two Logout, one HTTP, and one visual scenario.

Scope, detailed test steps, expected results, priorities, and test risks are documented in the companion test plan. [Test plan](TEST_PLAN.md)

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

The Products suite covers six scenarios. Each test injects the standard user's session cookie and opens Inventory directly.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `PRODUCT-01` | Display the catalog | Six cards, each with a visible name, loaded image, and price |
| `PRODUCT-02` | Name (A to Z) | Full name list in ascending order, starting from verified Z-to-A order |
| `PRODUCT-03` | Name (Z to A) | Full name list in descending order |
| `PRODUCT-04` | Price (low to high) | Full price list in ascending numeric order |
| `PRODUCT-05` | Price (high to low) | Full price list in descending numeric order |
| `PRODUCT-06` | Open Sauce Labs Backpack | Item URL and name, description, and price match its catalog card |

The Cart suite covers four scenarios. Each test injects the standard user's session cookie. Add tests start on Inventory, save each product's displayed name and price, click Add to cart, and open Cart. Removal tests seed the required items and open Cart directly, then verify the starting contents and badge before clicking Remove.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `CART-01` | Add Sauce Labs Backpack | Cart contains only Backpack with the saved name and price, quantity 1, and badge 1 |
| `CART-02` | Add Backpack and Bike Light | Cart contains exactly both saved products with matching prices, quantity 1 each, and badge 2 |
| `CART-03` | Remove Backpack from a two-item cart | Only Bike Light remains with the expected price, quantity 1, and badge 1 |
| `CART-04` | Remove Backpack from a one-item cart | Cart has no item rows and the badge is absent |

Cart scenarios live in `src/testdata/cartData.ts`. Backpack and Bike Light definitions in `src/testdata/productsData.ts` are shared by Cart and Checkout.

The Checkout suite covers five scenarios. Each test injects the standard user's session cookie and seeds `cart-contents` in local storage before opening Cart and clicking Checkout. The completed order uses Backpack and Bike Light. Validation and cancellation use Backpack only.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `CHECKOUT-01` | Valid customer details | Overview items, quantities, prices, subtotal, 8% tax rounded to cents, and total match. Finish shows confirmation and clears the cart. Back Home returns to Products |
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

The Navigation suite covers four scenarios. Signed-in tests inject the standard user's session cookie and open Products or Sauce Labs Backpack details directly. Protected-route tests open their target URL in a fresh signed-out context.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `NAV-01` | Open Cart, then Continue Shopping | `/cart.html` with a visible Your Cart title, then `/inventory.html` with a visible Products title |
| `NAV-02` | Choose All Items from product details | Verified Backpack details return to `/inventory.html` with a visible Products title |
| `NAV-03` | Open Inventory without a session | Redirect to Login with the Inventory-access error, visible login fields and button, and no session cookie |
| `NAV-04` | Open Cart without a session | Redirect to Login with the Cart-access error, visible login fields and button, and no session cookie |

Navigation route and title assertions stop the test on a mismatch before the next action.

The HTTP check uses Playwright's `request` fixture to verify the website's response and HTML content. The visual check compares the login form with a committed screenshot baseline.

| Test ID | Scenario | Expected result |
| --- | --- | --- |
| `HTTP-01` | Request the website without a browser | Successful HTTP response containing the Swag Labs application HTML |
| `VISUAL-01` | Compare the login form | The rendered form matches the reviewed Windows Chromium baseline |

The screenshot baseline lives in `src/test/visual.spec.ts-snapshots/`. CI uses Windows to match its platform. When running on another operating system, generate and inspect that platform's baseline before committing it. Review intentional UI changes before updating an existing baseline. [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots)

```powershell
npm test -- src/test/visual.spec.ts --update-snapshots
npm test -- src/test/visual.spec.ts
```

## Project structure

```text
cover-automation-project/
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- scripts/
|   `-- setup.cjs
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
|   |   |-- messagesSelectors.ts
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
|   |   |-- checkoutCompletePage.ts
|   |   |-- checkoutOverviewPage.ts
|   |   |-- checkoutPage.ts
|   |   |-- inventoryPage.ts
|   |   |-- loginPage.ts
|   |   |-- navigationPage.ts
|   |   `-- productDetailsPage.ts
|   |-- test/
|   |   |-- api.spec.ts
|   |   |-- cart.spec.ts
|   |   |-- checkout.spec.ts
|   |   |-- login.spec.ts
|   |   |-- logout.spec.ts
|   |   |-- navigaton.spec.ts
|   |   |-- products.spec.ts
|   |   |-- visual.spec.ts
|   |   `-- visual.spec.ts-snapshots/
|   |-- testdata/
|   |   |-- cartData.ts
|   |   |-- checkoutData.ts
|   |   |-- errorMessages.ts
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
|       |-- matchers.ts
|       |-- navigationUtils.ts
|       |-- priceUtils.ts
|       |-- productDetailsUtils.ts
|       `-- productsUtils.ts
|-- .env.example
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- playwright.config.ts
|-- README.md
|-- TEST_PLAN.md
`-- tsconfig.json
```

| Folder | Responsibility |
| --- | --- |
| `.github/workflows` | Run type checking and tests in GitHub Actions and upload reports |
| `scripts` | Create the local environment file during dependency installation |
| `config` | Environment-based URL, page paths, cookie names, and local storage keys |
| `fixture` | Shared navigation, session cookie and cart setup, and Page Object injection |
| `mapping` | Page selectors and product sort values |
| `models` | TypeScript types for users, products, cart items, checkout inputs, and protected-route scenarios |
| `pages` | Page Object classes with locators and actions |
| `test` | Test suites, scenario execution, and committed visual baselines |
| `testdata` | Environment-based inputs, expected errors, and per-user settings |
| `utils` | Shared environment and login helpers, assertions, and the typed `toBeSorted` custom matcher |

## Test setup and timeouts

Browser tests import `basePage` as `test` from the custom fixture. Before each test uses its page, the fixture navigates to `pagePath` and checks that the browser title contains Swag Labs. Tests can set their initial route with `test.use({ pagePath: urlPaths.login })`. The fixture provides `loginPage`, `inventoryPage`, `productDetailsPage`, `cartPage`, `checkoutPage`, `checkoutOverviewPage`, `checkoutCompletePage`, and `navigationPage` instances. Each checkout screen has its own Page Object. Products, Cart, Logout, and signed-in Navigation tests set `sessionUsername` to inject the session cookie before navigation, using `test.use({ pagePath: urlPaths.inventory, sessionUsername: usernames.standard })` when starting on Products.

Playwright is configured with `testIdAttribute: "data-test"`. Mapping files store the attribute values, and Page Objects and assertion helpers use `getByTestId()` to locate them, as shown below.

```ts
// loginSelectors.usernameInput is "username"
this.usernameInput = page.getByTestId(loginSelectors.usernameInput);
```

Shared product test IDs live in `inventorySelectors.ts`, the page title test ID lives in `navigationSelectors.ts`, and the error-message test ID lives in `messagesSelectors.ts`. Page Objects use `messagesSelectors.errorMessage` directly, while page mappings reuse the shared product and title values with their own container scoping. Scoped Add and Remove buttons use regular expressions to match their test ID prefixes. CSS locators remain where a test ID does not provide the required scope, such as the menu button and product details container.

`NavigationPage` owns the Cart link and All Items navigation. `InventoryPage` owns Logout and reuses the shared menu-button selector. Product-details assertions in `productDetailsUtils.ts` share the URL and name checks used by Products and Navigation.

`getProductDetailsPath()` builds product-details routes, and `getProtectedRouteError()` builds expected access errors for protected routes. Price conversion and display formatting use `parsePrice()` and `formatPrice()` from `priceUtils.ts`. `formatPrice()` returns the full dollar amount, such as `$29.99`.

Checkout and Cart removal tests set `cartProductIds` to seed the cart before the first navigation. For example, `[4, 0]` is stored as the JSON array `[4,0]` under `localStorageKeys.cartContents` for the configured website origin. The fixture applies this storage state once per test, so later navigation does not restore removed items.

Each test receives an isolated browser context. `fullyParallel: true` enables parallel execution across and within test files.

The performance glitch user has `isSlow: true`, which enables `test.slow()` for that case. Its `assertionTimeout: 15_000` gives the inventory URL and Products title checks extra time. `test.slow()` extends the overall test timeout, while the optional timeout argument in `assertSuccessfulLogin(page, username, timeout?: number)` controls those assertions. Other users use the configured assertion timeout.

The shared assertions use Playwright's built-in assertions, including soft assertions that allow the remaining UI checks to run while recording a failure.

Product sorting uses the typed `toBeSorted` custom matcher and checks that the sorted list preserves the names or prices captured before changing the sort.

## Configuration and reports

The current settings in `playwright.config.ts` are

| Setting | Value |
| --- | --- |
| Test directory | `./src/test` |
| Browser project | Chromium with Desktop Chrome settings |
| Test ID attribute | `data-test` |
| Parallel execution | Enabled |
| Workers | Playwright default |
| Focused tests in CI | Rejected |
| Test timeout | 30 seconds |
| Default assertion timeout | 5 seconds |
| Retries | 1 |
| Reporters | Playwright HTML and Allure Playwright |
| Screenshots | On failure |
| Videos | Retained on failure |
| Traces | On the first retry |

After a test run, open the HTML report with

```powershell
npm run report
```

The report is generated in `playwright-report/`. Failure screenshots, retained videos, and retry traces are stored in `test-results/` and linked from the report. Both folders are ignored by Git. A run with retries disabled produces no first-retry trace.

`npm ci` installs both `allure-playwright` and the Allure Report 3 CLI. The CLI runs with Node.js. Allure records results in `test-results/allure-results/`, which Playwright cleans with its test output before a new run. Generate and open the additional report after running the tests. [Allure Playwright setup](https://allurereport.org/docs/playwright/), [Allure Report 3 installation](https://allurereport.org/docs/v3/install/)

```powershell
npm run allure:generate
npm run allure:open
```

The generated Allure report is stored in `allure-report/`, which Git ignores.

Include the complete generated `playwright-report/` folder with the assignment submission so the reviewer receives the run report and its attachments.

## Continuous integration

`.github/workflows/playwright.yml` runs on Windows with Node.js 24. It installs locked dependencies with the setup script, checks types, and runs the suite. It then generates the Allure report and uploads the Playwright report, Allure report, and test results as workflow artifacts, including when tests fail.
