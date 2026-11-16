# Swag Labs Test Plan

Swag Labs is the SauceDemo storefront. Shoppers sign in, browse and sort the product catalog, manage a cart, and complete a demo order. This plan covers those browser flows as well as sign-out, menu navigation, and restricted pages.

[SauceDemo](https://www.saucedemo.com/) · [Project latest version](https://github.com/ItayHakim/cover-automation-project)

## Scope

ooThe plan uses Playwright with TypeScript and the repository’s Chromium project. It checks visible page content, URL transitions, validation messages, cart and order state, the website's HTTP response, and the login form's appearance.

## Coverage Status

The suite implements 30 browser cases and two bonus checks. Run results are recorded in the Playwright HTML report and Allure report.

| Area | Spec | Cases | Status | Coverage |
| --- | --- | --- | --- | --- |
| Login | [`src/test/login.spec.ts`](src/test/login.spec.ts) | 9 | Implemented | Successful sign-in and rejected inputs |
| Products | [`src/test/products.spec.ts`](src/test/products.spec.ts) | 6 | Implemented | Catalog cards, four sort options, and product details |
| Cart | [`src/test/cart.spec.ts`](src/test/cart.spec.ts) | 4 | Implemented | Added and removed items, quantities, prices, and badge count |
| Checkout | [`src/test/checkout.spec.ts`](src/test/checkout.spec.ts) | 5 | Implemented | Order completion, required fields, and cancellation |
| Logout | [`src/test/logout.spec.ts`](src/test/logout.spec.ts) | 2 | Implemented | Sign-out and session invalidation |
| Navigation | [`src/test/navigaton.spec.ts`](src/test/navigaton.spec.ts) | 4 | Implemented | Cart and menu navigation, plus protected routes |
| HTTP | [`src/test/api.spec.ts`](src/test/api.spec.ts) | 1 | Implemented | Website availability and HTML content through the request fixture |
| Visual | [`src/test/visual.spec.ts`](src/test/visual.spec.ts) | 1 | Implemented | Login form screenshot comparison |

The six core Login cases are LOGIN-01 and LOGIN-05 through LOGIN-09. LOGIN-02 through LOGIN-04 provide supplemental demo-account coverage. Logout and Navigation together have six cases.

## Test Setup

- Follow the repository README to install dependencies. Installation creates `.env` from `.env.example` when needed and installs Chromium.
- Use a fresh browser context for each case. Use `standard_user` for signed-in flows unless the case names another account.
- Seed the exact products needed for each case. Use Test User and ZIP code `12345` as valid checkout inputs.
- Run visual comparisons against the committed Windows Chromium baseline. Generate and review a separate baseline when using another operating system.

## Test Cases

`P` means **priority**. It tells you which tests deserve attention first when testing time is limited. **The lower the number, the higher the priority.**

| Priority | Meaning in this plan | Examples |
| --- | --- | --- |
| **P0 — Critical** | Core shopping or access behavior. Failure could block purchasing or allow unauthorized access. | Standard login, rejecting a wrong password, adding a product, completing checkout, blocking protected pages |
| **P1 — Important** | Common functionality and validation needed for reliable everyday use. | Removing cart items, checking required checkout fields, opening product details, logging out |
| **P2 — Lower priority** | Additional coverage for secondary behavior. | Sorting Z to A, sorting highest price first, comparing the login form screenshot |

### Login

Use credentials from the environment. For rejected attempts, the username field, password field, and Login button must remain visible.

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `LOGIN-01` | Standard user signs in | 1. Open the Login page.<br>2. Enter `standard_user` and the shared password.<br>3. Click Login. | The page opens `/inventory.html` and the visible page title reads “Products”. | P0 |
| `LOGIN-02` | Problem user signs in (supplemental) | 1. Open the Login page.<br>2. Enter `problem_user` and the shared password.<br>3. Click Login. | The page opens `/inventory.html` and the visible page title reads “Products”. | P2 |
| `LOGIN-03` | Visual user signs in (supplemental) | 1. Open the Login page.<br>2. Enter `visual_user` and the shared password.<br>3. Click Login. | The page opens `/inventory.html` and the visible page title reads “Products”. | P2 |
| `LOGIN-04` | Error user signs in (supplemental) | 1. Open the Login page.<br>2. Enter `error_user` and the shared password.<br>3. Click Login. | The page opens `/inventory.html` and the visible page title reads “Products”. | P2 |
| `LOGIN-05` | Performance glitch user signs in | 1. Open the Login page.<br>2. Enter `performance_glitch_user` and the shared password.<br>3. Click Login. | The page opens `/inventory.html` and the visible page title reads “Products”. | P1 |
| `LOGIN-06` | Locked-out user is denied | 1. Open the Login page.<br>2. Enter `locked_out_user` and the shared password.<br>3. Click Login. | The page stays at `/`. The visible error contains `Sorry, this user has been locked out.` The login controls stay visible. | P0 |
| `LOGIN-07` | Wrong password is rejected | 1. Open the Login page.<br>2. Enter `standard_user` and append `_incorrect` to the shared password.<br>3. Click Login. | The page stays at `/`. The visible error contains `Username and password do not match any user in this service`. The login controls stay visible. | P0 |
| `LOGIN-08` | Username is required | 1. Open the Login page.<br>2. Leave the username blank. Enter the shared password.<br>3. Click Login. | The page stays at `/`. The visible error contains `Username is required`. The login controls stay visible. | P1 |
| `LOGIN-09` | Password is required | 1. Open the Login page.<br>2. Enter `standard_user` and leave the password blank.<br>3. Click Login. | The page stays at `/`. The visible error contains `Password is required`. The login controls stay visible. | P1 |

### Products

Start signed in as `standard_user` on Inventory. Save the displayed names or numeric prices before changing the sort.

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `PRODUCT-01` | Show the product catalog | 1. Open Inventory.<br>2. Inspect the visible product cards and loaded images. | Six cards are present. Every card has a visible name, successfully loaded image, and price. | P1 |
| `PRODUCT-02` | Sort names A to Z | 1. Save all displayed names.<br>2. Select Name (Z to A) and verify that order.<br>3. Select Name (A to Z).<br>4. Read the full list again. | The full list matches the saved names sorted A to Z. The item count stays the same. | P1 |
| `PRODUCT-03` | Sort names Z to A | 1. Save all displayed names.<br>2. Select Name (Z to A).<br>3. Read the full list again. | The full list matches the saved names sorted Z to A. The item count stays the same. | P2 |
| `PRODUCT-04` | Sort lowest price first | 1. Save all displayed numeric prices.<br>2. Select Price (low to high).<br>3. Read the full list again. | The full list matches the saved numeric prices sorted from lowest to highest. The item count stays the same. | P1 |
| `PRODUCT-05` | Sort highest price first | 1. Save all displayed numeric prices.<br>2. Select Price (high to low).<br>3. Read the full list again. | The full list matches the saved numeric prices sorted from highest to lowest. The item count stays the same. | P2 |
| `PRODUCT-06` | Open product details | 1. Find Sauce Labs Backpack.<br>2. Save its displayed name, description, and price.<br>3. Click the product name. | The path is `/inventory-item.html`. The displayed name, description, and price match the saved values. | P1 |

### Cart

Add cases start signed in on Inventory with an empty cart. Removal cases start on Cart with the required products seeded. Backpack and Bike Light refer to Sauce Labs Backpack and Sauce Labs Bike Light.

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `CART-01` | Add one product | 1. Save the Backpack name and price.<br>2. Click Add to cart on Backpack.<br>3. Open Cart. | `/cart.html` shows only the saved product and price. The row quantity and badge both show 1. | P0 |
| `CART-02` | Add two different products | 1. Save the names and prices of Backpack and Bike Light.<br>2. Add each product once.<br>3. Open Cart. | `/cart.html` shows both saved products and prices. Each row has quantity 1 and the badge shows 2. | P1 |
| `CART-03` | Remove one of two products | 1. Seed Backpack and Bike Light and open Cart.<br>2. Verify the initial contents and badge.<br>3. Click Remove on the Backpack row. | Only Bike Light remains with quantity 1. The cart badge shows 1. | P1 |
| `CART-04` | Remove the final product | 1. Seed Backpack and open Cart.<br>2. Verify the initial contents and badge.<br>3. Click Remove on the Backpack row. | There are zero cart item rows and the cart badge is absent. | P1 |

### Checkout

Start signed in on Cart with the listed products seeded, then click Checkout. Use Test, User, and `12345` as the valid form values. Information, Overview, and Complete use separate Page Objects.

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `CHECKOUT-01` | Complete an order with valid details | 1. Seed Backpack and Bike Light and open Cart.<br>2. Click Checkout.<br>3. Enter valid details and click Continue.<br>4. Verify Overview and click Finish.<br>5. Verify confirmation, then click Back Home. | At `/checkout-step-two.html`, the expected items and prices match with quantity 1 each. The subtotal sums the prices, tax is 8% rounded to cents, and total is subtotal plus tax. Finish opens `/checkout-complete.html`, shows “Thank you for your order!”, and clears the cart. Back Home returns to Products. | P0 |
| `CHECKOUT-02` | Leave First Name blank | 1. Seed Backpack. Open Cart and click Checkout.<br>2. Leave First Name blank and fill the other two fields.<br>3. Click Continue. | The page stays at `/checkout-step-one.html`. The visible error contains “First Name is required”. | P1 |
| `CHECKOUT-03` | Leave Last Name blank | 1. Seed Backpack. Open Cart and click Checkout.<br>2. Leave Last Name blank and fill the other two fields.<br>3. Click Continue. | The page stays at `/checkout-step-one.html`. The visible error contains “Last Name is required”. | P1 |
| `CHECKOUT-04` | Leave Postal Code blank | 1. Seed Backpack. Open Cart and click Checkout.<br>2. Leave Postal Code blank and fill the other two fields.<br>3. Click Continue. | The page stays at `/checkout-step-one.html`. The visible error contains “Postal Code is required”. | P1 |
| `CHECKOUT-05` | Cancel from Your Information | 1. Seed Backpack and open Cart.<br>2. Click Checkout.<br>3. On Your Information, click Cancel. | The page returns to `/cart.html` with the same Backpack row, quantity 1, and price. | P1 |

### Logout

Start signed in as `standard_user` on Inventory. Keep the same context for the access check after logout.

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `LOGOUT-01` | Sign out from the side menu | 1. Open the side menu.<br>2. Click Logout. | The page returns to `/`. The username field, password field, and Login button are visible. | P1 |
| `LOGOUT-02` | Block Inventory after sign-out | 1. Open the side menu and click Logout.<br>2. Wait for `/`.<br>3. In the same context, open `/inventory.html` directly. | The page redirects to `/`. A visible error contains “You can only access '/inventory.html' when you are logged in.” | P0 |

### Navigation

Sign in for NAV-01 and NAV-02. Start NAV-03 and NAV-04 signed out in a fresh browser context.

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `NAV-01` | Go to Cart and continue shopping | 1. From Inventory, click the Cart icon.<br>2. Verify the Cart page.<br>3. Click Continue Shopping. | The first action opens `/cart.html` with “Your Cart”. Continue Shopping returns to `/inventory.html` with “Products”. | P1 |
| `NAV-02` | Go to Products from item details | 1. Open the known Backpack details page directly.<br>2. Verify its URL and product name.<br>3. Open the side menu and click All Items. | The page returns to `/inventory.html` with the visible “Products” title. | P2 |
| `NAV-03` | Block guest access to Inventory | 1. Start signed out.<br>2. Open `/inventory.html` directly. | The page redirects to `/`. A visible error contains “You can only access '/inventory.html' when you are logged in.” | P0 |
| `NAV-04` | Block guest access to Cart | 1. Start signed out.<br>2. Open `/cart.html` directly. | The page redirects to `/`. A visible error contains “You can only access '/cart.html' when you are logged in.” | P0 |

### HTTP and visual checks

| Test ID | Description | Steps | Expected result | Priority |
| --- | --- | --- | --- | --- |
| `HTTP-01` | Request the website through HTTP | 1. Use Playwright's request fixture to GET the configured website.<br>2. Check the status, content type, and response body. | The response succeeds and returns the Swag Labs application HTML. | P1 |
| `VISUAL-01` | Compare the login form screenshot | 1. Open Login with a fresh browser context.<br>2. Capture the form with Playwright's screenshot assertion.<br>3. Compare it with the committed baseline. | The form matches the reviewed Windows Chromium screenshot. | P2 |

## Out of Scope

- Real payments, order fulfillment, email delivery, backend APIs, and database checks.
- Mobile layouts, additional browser engines, visual coverage beyond the login form, and accessibility audits.
- Load and response-time benchmarks. The slow demo account is covered as a functional sign-in case.
- Account creation, password reset, and external About links.

## Test Risks

| Risk | Mitigation |
| --- | --- |
| Shared demo site changes | UI text, product data, or availability may change independently of the suite. Use page-object locators and review the failing trace before updating an expectation. |
| State carries across cases | Sign-in and cart state can affect later results. Use a fresh context and seed each case’s own cart. |
| Demo account behavior varies | Use the standard account for shopping flows. Give the performance glitch case its own slow-test budget. |
| A sort starts in the expected order | For Name (A to Z), verify the reverse order first. Compare every entry with a separately sorted copy and parse prices as numbers. |
| Amounts round differently | Convert captured prices to cents, round the 8% tax to cents, and compare totals using the rounded tax. |
| Screenshot rendering varies across platforms | Use the committed Windows Chromium baseline in Windows CI. Generate and review the appropriate baseline for another operating system. |

## Summary

The six smoke checks are PRODUCT-01, CART-01, CART-02, CHECKOUT-01, LOGOUT-01, and NAV-01. Run them with `npm run test:smoke`.

The suite has 32 implemented cases across eight specs, including 30 browser cases. The configuration uses one retry, isolated parallel tests, failure screenshots and videos, Playwright HTML reporting, and Allure reporting. Bonus coverage includes GitHub Actions, tags, a typed sorting matcher, HTTP checks, and a visual baseline.

Check the selected cases with `npm test -- --list`. Run the suite with `npm test`, then open the HTML report with `npm run report`. Generate the Allure report with `npm run allure:generate` and view it with `npm run allure:open`. Record run results by test ID in the generated reports.
