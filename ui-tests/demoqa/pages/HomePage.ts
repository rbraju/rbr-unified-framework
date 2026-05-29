import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await super.goto('/');
        await this.waitForPageLoad();
    }

    private readonly locators = {
        forms: () => this.page.locator('a[href="/forms]'),
        alertsFramesAndWindows: () => this.page.locator('a[href="/alertsWindows"]')
    }

    async navigateToAlertsFrameAndWindowsPage() {
        this.locators.alertsFramesAndWindows().click();
    }
};
