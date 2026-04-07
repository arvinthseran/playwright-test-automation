import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BookDrivingTestPage extends BasePage{

  async goto(): Promise<void> {
    await this.page.goto("https://www.gov.uk/book-driving-test");
    await this.verifyPageLoaded();
  }

  async verifyPageLoaded(): Promise<void> {
    expect(this.page.getByLabel('Header proposition').locator('span')).toContainText('Book your driving test');
  }

  async clickStartNow(): Promise<void> {
    await this.page.getByRole('button', { name: 'Start now on the driving test' }).click();
  }
}
