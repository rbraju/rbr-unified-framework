import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AlertsFramesWindowsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await super.goto('/');
        await this.waitForPageLoad();
    }

    private readonly frame1 = this.page.frameLocator('iframe#frame1');

    private readonly frame2 = this.page.frameLocator('iframe#frame2');

    async verifyFrameHeaders() {
        const frame1Header = await this.frame1.locator('h1').textContent();
        expect(frame1Header, 'error1').toBe('This is a sample page');

        const frame2Header = await this.frame2.locator('h1').textContent();
        expect(frame2Header, 'error2').toBe('This is a sample page');

        await this.page.waitForTimeout(1000 * 5);
    }
};
