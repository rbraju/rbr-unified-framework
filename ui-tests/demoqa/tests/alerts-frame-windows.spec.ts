import test from "@playwright/test";
import { AlertsFramesWindowsPage } from "../pages/AlertsFramesWindowsPage";
import { HomePage } from "../pages/HomePage";

test.beforeEach('Maximize window', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
});

test('Alerts & Frames test', async ({ page }) => {
    const homePage = new HomePage(page);
    homePage.goto();
    homePage.navigateToAlertsFrameAndWindowsPage();

    const alertsFrameWindowsPage = new AlertsFramesWindowsPage(page);
    await alertsFrameWindowsPage.leftPanel.selectSection('Alerts, Frame & Windows', 'Frames');
    await alertsFrameWindowsPage.verifyFrameHeaders();
});
