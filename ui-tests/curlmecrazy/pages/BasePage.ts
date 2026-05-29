import { expect, Page } from '@playwright/test';

export abstract class BasePage {

    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string = '/'): Promise<void> {
        await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyPageTitle(expectedTitle: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async verifyUrlContains(expectedPath: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
    }
}
