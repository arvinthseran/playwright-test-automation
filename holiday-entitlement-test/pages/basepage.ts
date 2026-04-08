import { Page } from '@playwright/test';

export abstract class BasePage {
    protected pageTitle: string;
  constructor(protected page: Page, pageTitle: string) {
    this.page = page;
    this.pageTitle = pageTitle;
  }

    // all pages must implement their own page verification logic
    abstract verifyPage(): Promise<void>;

    async verifyPageAsync<T extends BasePage>(func: () => T): Promise<T> {

        // should be on the correct page
        console.log(`Navigating to page with title: "${this.pageTitle}"`);

        // Execute the provided function (create instance of next page)
        const nextPage = func();

        // next page veification logic is executed after the page navigation is complete
        await nextPage.verifyPage();

        console.log(`Navigated sucessfully to page with title: "${this.pageTitle}"`);

        // Return the verified page
        return nextPage;
    }
}