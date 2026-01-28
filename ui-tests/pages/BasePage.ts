import { expect, Page } from "@playwright/test";

export abstract class BasePage {

    protected readonly page: Page;

    protected readonly baseUrl = process.env.BASE_URL || 'https://www.upgrade.com';

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = '/'): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded'});
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyPageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async getCurrenturl(): Promise<string> {
        return this.page.url();
    }

    async verifyUrlContains(expectedPath: string): Promise<void> {
        expect(this.getCurrenturl()).toContain(expectedPath);
    }
}
