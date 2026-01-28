import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { Borrower } from "../../models/upgrade/Borrower";

export class FunnelPI1IncomePage extends BasePage {

    private pageTitle = 'Income information | Upgrade';

    constructor(page: Page) {
        super(page);
    }

    // Locators for Funnel - Personal Information 1 - Incomepage
    private readonly locators = {
        individualAnnualIncome: () => this.page.locator('input[data-auto="borrowerIncome"]'),
        additionalAnnualIncome: () => this.page.locator('input[data-auto="borrowerAdditionalIncome"]'),
        continueButton: () => this.page.locator('button[data-auto="continuePersonalInfo"]'),
    }

    async enterIncomeDetails(borrower: Borrower) {
        await this.locators.individualAnnualIncome().fill(borrower.individualAnnualIncome);
        await this.locators.additionalAnnualIncome().fill(borrower.additionalAnnualIncome);
        await this.locators.continueButton().click();

        await this.page.waitForTimeout(1000 * 5);
    }
}
