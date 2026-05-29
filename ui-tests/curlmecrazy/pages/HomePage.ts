import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    private readonly bookAppointmentBtn = this.page.locator('[data-testid="book-appointment-btn"]');

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<void> {
        await this.goto('/');
    }

    async clickBookAppointment(): Promise<void> {
        await this.bookAppointmentBtn.click();
    }
}
