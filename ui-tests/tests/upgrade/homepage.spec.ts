import test from "@playwright/test";
import { Borrower } from "../../models/upgrade/Borrower";
import { HomePage } from "../../pages/upgrade/HomePage";
import { BorrowerUtil } from "../../utils/BorrowerUtil";

test.beforeEach(async ({ page }) => {
    // Maximize the browser window
    await page.setViewportSize({ width: 1920, height: 1080 });
});

test.only('Get started from home page', async ({ page }) => {
    const homepage = new HomePage(page);

    // Navigate to home page, enter loan amount and get started
    await homepage.goto();
    await homepage.waitForPageLoad();
    const funnelPI1Page = await homepage.enterAmountAndGetStarted('9000', 'Large Purchase');

    // Enter basic information
    let borrower: Borrower = await BorrowerUtil.getRandomBorrower();
    const funnelPI1IncomePage = await funnelPI1Page.enterBasicInformation(borrower);

    // Enter income details
    await funnelPI1IncomePage.enterIncomeDetails(borrower);
});
