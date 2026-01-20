import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { FunnelPI1Page } from "./FunnelPI1Page";

export class HomePage extends BasePage {

    private pageTitle = 'Upgrade - Personal Loans, Cards and Rewards Checking | Home';

    constructor(page: Page) {
        super(page);
    }

    async goto(): Promise<void> {
        await super.goto('/');
        await this.waitForPageLoad
    }

    // Locators for Home Page - Lazy getters
    private readonly locators = {
        desiredAmount: () => this.page.locator('input[name="desiredAmount"]'),
        loanPurpose: () => this.page.locator('select[name="loan-purpose"]'),
        getStarted: () => this.page.locator('button[type="submit"]'),
    }

    async enterAmountAndGetStarted(amount: string, loanPurpose: string): Promise<FunnelPI1Page> {
        await this.locators.desiredAmount().fill(amount);
        await this.locators.loanPurpose().selectOption(loanPurpose)
        await this.locators.getStarted().click();

        const nextPage = new FunnelPI1Page(this.page);
        await nextPage.waitForPageLoad();
        return nextPage;
    }
}
