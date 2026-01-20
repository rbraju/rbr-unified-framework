# UI Tests Framework

A modern, scalable UI testing framework built with TypeScript and Playwright. This framework provides a robust foundation for automated browser testing with Page Object Model pattern, clear separation of concerns, and cross-browser support.

## 🏗️ Architecture Overview

The UI testing framework follows the Page Object Model (POM) pattern, ensuring maintainability, reusability, and separation of concerns. The framework is organized into distinct layers:

```
ui-tests/
├── tests/                    # Test Specifications
│   └── upgrade/             # Domain-specific tests
├── upgrade/                 # Page Object Models
│   ├── pages/              # Page Classes
│   │   ├── BasePage.ts     # Base Page Class
│   │   ├── HomePage.ts     # Page-specific implementations
│   │   └── FunnelPI1Page.ts
│   └── models/             # Data Models
├── playwright.config.ts     # Playwright Configuration
└── package.json            # Dependencies
```

## 📦 Technology Stack

- **Language**: TypeScript
- **Testing Framework**: Playwright 1.57.0
- **Package Manager**: npm
- **Browsers**: Chromium, Firefox, WebKit
- **Node.js**: 16+ required

## 🏛️ Framework Architecture

### 1. Configuration Layer (`playwright.config.ts`)

The Playwright configuration file centralizes all test execution settings:

#### Key Configuration Options
- **Test Directory**: `./tests` - Location of test specifications
- **Parallel Execution**: Enabled by default for faster test runs
- **Reporter**: HTML reporter for test results
- **Timeout Settings**:
  - Test timeout: 30 seconds
  - Assertion timeout: 6 seconds
- **Browser Configuration**: Configurable browser and device settings
- **Base URL**: Environment-based or default URL
- **Trace Collection**: Automatic trace on test retry for debugging

#### Environment Configuration
```typescript
use: {
    headless: false,
    browserName: 'chromium',
    baseURL: process.env.BASE_URL || 'https://www.upgrade.com/',
    trace: 'on-first-retry',
}
```

### 2. Page Object Model Layer (`upgrade/pages/`)

The Page Object Model (POM) pattern encapsulates page-specific logic and locators.

#### `BasePage`
- Abstract base class for all page objects
- Common page navigation and utility methods:
  - `goto(path)` - Navigate to a specific path
  - `waitForPageLoad()` - Wait for page load state
  - `verifyPageTitle(expectedTitle)` - Verify page title
  - `getCurrenturl()` - Get current page URL
  - `verifyUrlContains(expectedPath)` - Verify URL contains expected path
- Base URL configuration

**BasePage Structure**:
```typescript
export abstract class BasePage {
    protected readonly page: Page;
    protected readonly baseUrl: string;

    constructor(page: Page) {
        this.page = page;
    }

    // Common methods for all pages
}
```

#### Page-Specific Classes
- Extend `BasePage` for each page
- Encapsulate page-specific locators
- Implement page-specific actions and interactions
- Return next page objects for fluent test flow

**Example Page Implementation** (`HomePage.ts`):
```typescript
export class HomePage extends BasePage {
    // Page-specific locators
    private readonly locators = {
        desiredAmount: () => this.page.locator('input[name="desiredAmount"]'),
        loanPurpose: () => this.page.locator('select[name="loan-purpose"]'),
        getStarted: () => this.page.locator('button[type="submit"]'),
    }

    // Page-specific actions
    async enterAmountAndGetStarted(amount: string, loanPurpose: string): Promise<FunnelPI1Page> {
        await this.locators.desiredAmount().fill(amount);
        await this.locators.loanPurpose().selectOption(loanPurpose);
        await this.locators.getStarted().click();

        const nextPage = new FunnelPI1Page(this.page);
        await nextPage.waitForPageLoad();
        return nextPage;
    }
}
```

### 3. Test Layer (`tests/`)

The test layer contains test specifications using Playwright's test API.

#### Test Structure
- Use Playwright's `test` API for test definitions
- Instantiate page objects for interactions
- Use async/await for asynchronous operations
- Leverage Playwright's built-in assertions

**Example Test** (`homepage.spec.ts`):
```typescript
import test from "@playwright/test";
import { HomePage } from "../../upgrade/pages/HomePage";

test('Get started from home page', async ({ page }) => {
    const homepage = new HomePage(page);

    // Navigate and interact
    await homepage.goto();
    await homepage.waitForPageLoad();
    const funnelPI1Page = await homepage.enterAmountAndGetStarted('9000', 'Large Purchase');

    // Continue with next page interactions
    await funnelPI1Page.enterBasicInformation('John', 'Doe');
});
```

#### Test Organization
- Organize tests by domain/feature
- Use descriptive test names
- Keep tests focused on single scenarios
- Use page objects for all interactions

### 4. Model Layer (`upgrade/models/`)

The model layer contains data models for test data management (when needed).

- TypeScript interfaces/types for data structures
- Test data generators
- Data transformation utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the ui-tests directory**:
```bash
cd ui-tests
```

2. **Install dependencies**:
```bash
npm install
```

3. **Install Playwright browsers** (if not automatically installed):
```bash
npx playwright install
```

### Configuration

#### Environment Variables
Set the `BASE_URL` environment variable to override the default base URL:

```bash
export BASE_URL=https://www.upgrade.com/
```

Or use inline for a single run:
```bash
BASE_URL=https://staging.upgrade.com/ npx playwright test
```

#### Playwright Configuration
Edit `playwright.config.ts` to customize:
- Browser selection
- Timeout values
- Test directory
- Reporter settings
- Screenshot/video capture

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Specific Test File
```bash
npx playwright test tests/upgrade/homepage.spec.ts
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### View Test Report
```bash
npx playwright show-report
```

## 🔧 Extending the Framework

### Adding New Page Objects

1. **Create a new page class** extending `BasePage`:
```typescript
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Define locators
    private readonly locators = {
        button: () => this.page.locator('button.submit'),
        input: () => this.page.locator('input[name="field"]'),
    }

    // Define page actions
    async performAction() {
        await this.locators.input().fill('value');
        await this.locators.button().click();
    }
}
```

2. **Use in tests**:
```typescript
const newPage = new NewPage(page);
await newPage.performAction();
```

### Adding New Test Suites

1. **Create test file** in `tests/` directory:
```typescript
import test from "@playwright/test";

test.describe('Feature Name', () => {
    test('test scenario', async ({ page }) => {
        // Test implementation
    });
});
```

### Configuring Multiple Browsers

Edit `playwright.config.ts`:
```typescript
projects: [
    {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
    },
    {
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
    },
    {
        name: 'webkit',
        use: { ...devices['Desktop Safari'] },
    },
]
```

### Adding Custom Assertions

Use Playwright's built-in `expect` API:
```typescript
import { expect } from "@playwright/test";

await expect(page.locator('element')).toBeVisible();
await expect(page.locator('element')).toContainText('expected text');
```

## 📚 Design Patterns Used

1. **Page Object Model (POM)**: Encapsulates page logic and locators
2. **Inheritance**: Base page class provides common functionality
3. **Composition**: Page objects compose into test flows
4. **Factory Pattern**: Page objects can be created as needed
5. **Fluent Interface**: Methods return page objects for chaining

## 🔐 Best Practices

1. **Page Object Model**: Always use page objects, never interact with pages directly in tests
2. **Locator Strategy**: Use stable, semantic locators (prefer data-testid, name, role)
3. **Wait Strategies**: Use Playwright's auto-waiting; explicitly wait when needed
4. **Test Isolation**: Each test should be independent and clean up after itself
5. **Async/Await**: Always use async/await for asynchronous operations
6. **Error Handling**: Implement proper error handling and meaningful error messages
7. **Test Data**: Externalize test data from test logic
8. **Descriptive Names**: Use clear, descriptive names for tests and page methods

## 🎯 Playwright Features

### Auto-Waiting
Playwright automatically waits for elements to be actionable before interacting:
- Element becomes visible
- Element becomes stable
- Element receives events
- Element is enabled

### Network Interception
Intercept and modify network requests:
```typescript
await page.route('**/api/**', route => {
    route.fulfill({ json: { mock: 'data' } });
});
```

### Screenshots and Videos
Automatic capture on test failure (configurable in `playwright.config.ts`)

### Trace Viewer
View detailed execution traces:
```bash
npx playwright show-trace trace.zip
```

## 📊 Reporting

The framework uses Playwright's HTML reporter by default:
- Test execution results
- Screenshots on failure
- Videos (if enabled)
- Trace files for debugging

View reports:
```bash
npx playwright show-report
```

## 🔍 Troubleshooting

### Tests Timing Out
- Increase timeout in `playwright.config.ts`
- Check for slow network or application response
- Verify locators are correct

### Elements Not Found
- Use Playwright Inspector to debug: `npx playwright test --debug`
- Verify locators with browser DevTools
- Check if element is in an iframe

### Flaky Tests
- Ensure proper waits for dynamic content
- Use more stable locators
- Consider using `waitForSelector` with specific conditions

## 📈 Future Enhancements

- [ ] Visual regression testing
- [ ] API testing integration
- [ ] Mobile device testing
- [ ] Performance monitoring
- [ ] Test data management framework
- [ ] Custom reporters
- [ ] CI/CD integration examples
- [ ] Parallel execution optimization
- [ ] Screenshot comparison utilities
- [ ] Accessibility testing integration
