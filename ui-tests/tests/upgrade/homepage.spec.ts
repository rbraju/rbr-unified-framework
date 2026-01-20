import test from "@playwright/test";
import { HomePage } from "../../upgrade/pages/HomePage";

test.only('Get started from home page', async ({ page }) => {
    const homepage = new HomePage(page);

    // Navigate to home page, enter loan amount and get started
    await homepage.goto();
    await homepage.waitForPageLoad();
    const funnelPI1Page = await homepage.enterAmountAndGetStarted('9000', 'Large Purchase');

    // Enter basic information
    await funnelPI1Page.enterBasicInformation('Nodald', 'Rumpt');
    await page.waitForTimeout(5 * 1000);
});