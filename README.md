# clover-automation-project

End-to-end automation tests for the Swag Labs demo shop, built with Playwright Test and TypeScript. The current suite covers login, logout, and Products on Sauce Demo. [Swag Labs](https://www.saucedemo.com/)

## Requirements

- Node.js 24.x and npm
- Git
- Internet access to install dependencies and browsers and reach Sauce Demo

The commands below use Windows PowerShell. The `.cmd` suffix runs npm and npx through their Windows command files.

## Setup

Clone the repository and install the dependencies from `package-lock.json`.

```powershell
git clone https://github.com/ItayHakim/clover-automation-project.git
cd clover-automation-project
npm.cmd ci
```

Create your local environment file during the first setup, then install Chromium, the browser configured for this project.

```powershell
Copy-Item .env.example .env
npx.cmd playwright install chromium
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
npm.cmd test
```

Run only the login test file.

```powershell
npm.cmd test -- src/test/login.spec.ts
```

Run a single scenario by its test ID. This example runs the locked-out account case.

```powershell
npm.cmd test -- src/test/login.spec.ts -g "LOGIN-06"
```

Open the browser during execution or use Playwright's interactive test UI.

```powershell
npm.cmd run test:headed
npm.cmd run test:ui
```

List discovered tests or check TypeScript types.

```powershell
npm.cmd test -- --list
npx.cmd tsc --noEmit
```

To run the login suite with three workers and retries disabled, use

```powershell
npm.cmd test -- src/test/login.spec.ts --workers=3 --retries=0
```

## Current test coverage

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

The Logout suite covers returning to Login and blocking Inventory access after logout. Cart, Checkout, and Navigation remain placeholders for future coverage.

## Project structure

```text
clover-automation-project/
|-- src/
|   |-- config/
|   |   `-- routes.ts
|   |-- fixture/
|   |   `-- basePage.ts
|   |-- mapping/
|   |   |-- inventorySelectors.ts
|   |   `-- loginSelectors.ts
|   |-- models/
|   |   `-- loginTypes.ts
|   |-- pages/
|   |   `-- loginPage.ts
|   |-- test/
|   |   |-- cart.spec.ts
|   |   |-- checkout.spec.ts
|   |   |-- login.spec.ts
|   |   |-- logout.spec.ts
|   |   |-- navigaton.spec.ts
|   |   `-- products.spec.ts
|   |-- testdata/
|   |   `-- loginData.ts
|   `-- utils/
|       |-- commonUtils.ts
|       `-- loginUtils.ts
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
| `config` | Environment-based website URL and page paths |
| `fixture` | Shared navigation, page-title check, and LoginPage injection |
| `mapping` | Login and inventory selectors |
| `models` | TypeScript types for users and rejected login cases |
| `pages` | Page Object classes with locators and actions |
| `test` | Test suites and scenario execution |
| `testdata` | Environment-based inputs, expected errors, and per-user settings |
| `utils` | Shared environment and login helpers, and assertions |

## Test setup and timeouts

Tests import `basePage` as `test` from the custom fixture. Before each test uses its page, the fixture navigates to `pagePath` and checks that the browser title contains Swag Labs. Tests can set their initial route with `test.use({ pagePath: urlPaths.login })`. The fixture provides `loginPage`, `inventoryPage`, and `productDetailsPage` instances. Products and Logout use `test.use({ pagePath: urlPaths.inventory, sessionUsername: usernames.standard })` to inject the session cookie before navigation.

Each test receives an isolated browser context. `fullyParallel: true` enables parallel execution across and within test files.

The performance glitch user has `isSlow: true`, which enables `test.slow()` for that case. Its `assertionTimeout: 15_000` gives the inventory URL and Products title checks extra time. `test.slow()` extends the overall test timeout, while the optional timeout argument in `assertSuccessfulLogin(page, timeout?: number)` controls those assertions. Other users use the configured assertion timeout.

The shared assertions use Playwright's built-in assertions, including soft assertions that allow the remaining UI checks to run while recording a failure.

## Configuration and reports

The current settings in `playwright.config.ts` are

| Setting | Value |
| --- | --- |
| Test directory | `./src/test` |
| Browser project | Chromium with Desktop Chrome settings |
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
npx.cmd playwright show-report
```

The report is generated in `playwright-report/`. Failure screenshots, retained videos, and retry traces are stored in `test-results/` and linked from the report. Both folders are ignored by Git. A run with retries disabled produces no first-retry trace.
