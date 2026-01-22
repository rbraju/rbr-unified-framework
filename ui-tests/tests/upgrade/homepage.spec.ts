import test from "@playwright/test";
import { HomePage } from "../../upgrade/pages/HomePage";
import { Borrower } from "../../upgrade/models/Borrower";

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
    await funnelPI1Page.waitForPageLoad();
    let borrower = new Borrower('Nodald', 'Rumpt', '123 Main Street', 'San Francisco', 'CA', '94105', '08/25/1993', '4144144144');
    await funnelPI1Page.enterBasicInformation(borrower);
});
