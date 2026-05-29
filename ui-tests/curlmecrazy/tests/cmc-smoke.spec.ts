import { test, expect } from '@playwright/test';

test('CMC Smoke Test - Verify home page', async ({ page }) => {
    await page.goto('/');
    const bookAppointmentLink = page.getByRole('link', { name: 'Book Appointment' }).first(); // Fixed typo in 'Appointment'
    await bookAppointmentLink.click();
    await expect(page).toHaveURL('/book');
});