import { expect, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { Borrower } from "../../models/upgrade/Borrower";
import { FunnelPI1IncomePage } from "./FunnelPI1IncomePage";

export class FunnelPI1BasicInfoPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Locators for Funnel - Personal Information 1 - Basic Info page
    private readonly locators = {
        firstName: () => this.page.locator('input[name="borrowerFirstName"]'),
        lastName: () => this.page.locator('input[name="borrowerLastName"]'),
        address: () => this.page.locator('input[data-auto="borrowerStreet"]'),
        city: () => this.page.locator('input[data-auto="borrowerCity"]'),
        state: () => this.page.locator('input[data-auto="borrowerState"]'),
        zip: () => this.page.locator('input[data-auto="borrowerZipCode"]'),
        dateOfBirth: () => this.page.locator('input[data-auto="borrowerDateOfBirth"]'),
        phoneNumber: () => this.page.locator('input[data-auto="borrowerPhoneNumber-localSuffix"]'),
        continueButton: () => this.page.locator('button[data-auto="continuePersonalInfo"]'),
    }

    async enterBasicInformation(borrower: Borrower): Promise<FunnelPI1IncomePage> {
        await this.locators.firstName().fill(borrower.firstName);
        await this.locators.lastName().fill(borrower.lastName);
        await this.enterAddress(borrower);
        await this.locators.dateOfBirth().fill(borrower.dateOfBirth);
        // if phone number text is present, fill it
        if (await this.locators.phoneNumber().isVisible()) {
            await this.locators.phoneNumber().click();
            await this.locators.phoneNumber().clear();
            await this.locators.phoneNumber().type(borrower.phoneNumber);
        }
        await this.locators.continueButton().click();
        const nextPage = new FunnelPI1IncomePage(this.page);
        await nextPage.waitForPageLoad();
        return nextPage;
    }

    async enterAddress(borrower: Borrower): Promise<void> {
        await this.locators.address().fill(borrower.address);

        // Type address in the address field and wait for the suggestions to appear and select
        console.log(borrower);
        await this.page.getByRole('listbox', {name: 'options'}).waitFor({state: 'visible'});
        await this.page.getByRole('option', { name: `${borrower.address}, ${borrower.city}, ${borrower.state}, USA` }).click();

        // Wait for the address to populate in fields
        await expect(this.locators.city()).toHaveValue(borrower.city);
        await expect(this.locators.state()).toHaveValue(borrower.state);
        await expect(this.locators.zip()).toHaveValue(borrower.zip);
    }
}
