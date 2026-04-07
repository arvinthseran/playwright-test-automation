import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ChooseTyprOfTestPage extends BasePage{

  async verifyPageLoaded(): Promise<void> {
    await expect(this.page.getByLabel('Header proposition').locator('span')).toContainText('Book your driving test');
  }

  async clickCar(): Promise<void> {
      await this.page.getByRole('button', { name: 'Accept all non-essential' }).click();
      await this.page.getByRole('button', { name: 'Car (manual and automatic)' }).click();
  }
}