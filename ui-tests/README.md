# UI Tests

Playwright + TypeScript UI test suite. Tests are organised per application — each app lives in its own folder with pages, models, utils, and tests co-located together.

## Project Structure

```
ui-tests/
├── upgrade/                        # Upgrade.com tests
│   ├── models/
│   │   └── Borrower.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── FunnelPI1BasicInfoPage.ts
│   │   └── FunnelPI1IncomePage.ts
│   ├── tests/
│   │   └── homepage.spec.ts
│   └── utils/
│       └── BorrowerUtil.ts
├── demoqa/                         # DemoQA.com tests
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── AlertsFramesWindowsPage.ts
│   │   └── components/
│   │       └── LeftPanel.ts
│   └── tests/
│       ├── demo.spec.ts
│       └── alerts-frame-windows.spec.ts
├── curlmecrazy/                    # CurlMeCrazy tests (WIP)
├── playwright.config.ts            # Single config — one project per app
├── package.json
└── .env                            # Local env overrides (not committed)
```

Each app is a named **project** in `playwright.config.ts` with its own `testDir` and default `baseURL`. There is one config file at the root — no per-app configs.

## Setup

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install chromium
```

## Running Tests

### Per app

| App | Command | Default URL |
|-----|---------|-------------|
| Upgrade | `npm run test:upgrade` | https://www.upgrade.com |
| DemoQA | `npm run test:demoqa` | https://demoqa.com |

### All apps

```bash
npx playwright test
```

### Common options

```bash
# Run with browser visible
npm run test:upgrade:headed
npm run test:demoqa:headed

# Run a single test file
npx playwright test --project=upgrade upgrade/tests/homepage.spec.ts

# Debug (opens Playwright Inspector)
npx playwright test --project=upgrade --debug

# Interactive UI mode
npx playwright test --project=upgrade --ui

# View the HTML report after a run
npx playwright show-report
```

### Override the base URL

```bash
BASE_URL=https://staging.upgrade.com npm run test:upgrade
```

## Adding a New App

1. Create the app folder with the standard layout:
   ```
   <appname>/
   ├── pages/
   ├── tests/
   ├── models/       # if needed
   └── utils/        # if needed
   ```

2. Add a project entry in `playwright.config.ts`:
   ```typescript
   {
       name: '<appname>',
       testDir: './<appname>/tests',
       use: {
           ...devices['Desktop Chrome'],
           baseURL: 'https://example.com',
       },
   }
   ```

3. Add npm scripts in `package.json`:
   ```json
   "test:<appname>": "npx playwright test --project=<appname>",
   "test:<appname>:headed": "npx playwright test --project=<appname> --headed"
   ```
