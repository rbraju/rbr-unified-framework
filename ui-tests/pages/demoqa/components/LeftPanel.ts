import { Locator, Page } from "@playwright/test";

type SectionName =
    | 'Elements'
    | 'Forms'
    | 'Alerts, Frame & Windows'
    | 'Widgets'
    | 'Interactions'
    | 'Book Store Application';

export class LeftPanel {

    constructor(private readonly page: Page) {
    }

    async selectSection(sectionName: SectionName, subSection: string) {
        const group = this.page.locator('.element-group').filter({ hasText: sectionName });
        const header = group.locator('.header-wrapper');
        const container = group.locator('.element-list');
        const item = group.getByText(subSection, { exact: true });

        // Expand section. 
        await this.expandSection(container, header);

        // Select sub-section
        await item.click();
    }

    async expandSection(container: Locator, header: Locator) {
        const classValue = await container.getAttribute('class');
        if (!classValue?.includes('show')) {
            await header.click();
        }
    }
};
