import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,

    reporter: 'html',
    timeout: 30 * 1000, // Default timeout of 30 seconds per test

    // Fail the build on CI if test.only accidentally left in the source code
    forbidOnly: !!process.env.CI,

    expect: {
        timeout: 6 * 1000, // Default timeout for assertions
    },

    // Shared settings for all the below projects. See https://playwright.dev/docs/api/class-testoptions.
    use: {
        headless: false,
        browserName: 'chromium',
        baseURL: process.env.BASE_URL || 'https://www.upgrade.com/',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    // Configure projects for major browsers
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
    ],
});
