import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FunnelPI1Page extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Locators for Funnel - Personal Information 1 page
    private readonly locators = {
        firstName: () => this.page.locator('input[name="borrowerFirstName"]'),
        lastName: () => this.page.locator('input[name="borrowerLastName"]'),
    }

    async enterBasicInformation(firstName: string, lastName: string): Promise<void> {
        await this.locators.firstName().fill(firstName);
        await this.locators.lastName().fill(lastName);
    }
}
