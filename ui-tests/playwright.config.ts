import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    fullyParallel: true,
    reporter: [
        ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
    ],
    timeout: 10 * 1000,
    forbidOnly: !!process.env.CI,
    expect: {
        timeout: 6 * 1000,
    },
    use: {
        headless: false,
        browserName: 'chromium',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'curlmecrazy',
            testDir: './curlmecrazy/tests',
            testMatch: /curlmecrazy\/tests\/.*\.spec\.ts/,
            channel: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.CURLMECRAZY_BASE_URL || 'https://localhost:5173',
            },
        },
        {
            name: 'demoqa',
            testDir: './demoqa/tests',
            testMatch: /demoqa\/tests\/.*\.spec\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.DEMOQA_BASE_URL || 'https://demoqa.com/',
            },
        },
        {
            name: 'upgrade',
            testDir: './upgrade/tests',
            testMatch: /upgrade\/tests\/.*\.spec\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                baseURL: process.env.UPGRADE_BASE_URL || 'https://www.upgrade.com/',
            },
        },
    ],
});
