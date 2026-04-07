import { Page, expect } from '@playwright/test';
import { BasePage } from './basepage';

export class StartPage extends BasePage {
    constructor(page: Page) {
        super(page, 'Calculate holiday entitlement'); 
    }
  async verifyPage(): Promise<void> {
      await expect(this.page.locator('h1')).toContainText(this.pageTitle);
  }

  async navigate() {
    await this.page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');
    return this; // Stay on start page after navigation
  }

  async clickStart(): Promise<IrregularHrsPage> {
    await this.page.getByRole('button', { name: 'Start now' }).click();
    return await this.verifyPageAsync(() => new IrregularHrsPage(this.page));
  }
}

export class IrregularHrsPage extends BasePage {
  constructor(page: Page) {
    super(page, 'Does the employee work irregular hours or for part of the year?');
  }
    async verifyPage(): Promise<void> {
      await expect(this.page.locator('h1')).toContainText(this.pageTitle);
  }

  async submitNo(): Promise<HolidayBasedOnPage> {
    await this.page.getByRole('radio', { name: 'No' }).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    return await this.verifyPageAsync(() => new HolidayBasedOnPage(this.page));
  }
}

export class HolidayBasedOnPage extends BasePage {
    constructor(page: Page) {
        super(page, 'Is the holiday entitlement based on:');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }
 
    async submitDaysPerWeek(): Promise<WorkOutHolidayPage> {
        await this.page.getByRole('radio', { name: 'days worked per week' }).check();
        await this.page.getByRole('button', { name: 'Continue' }).click();
       return await this.verifyPageAsync(() => new WorkOutHolidayPage(this.page));
    }
}

export class WorkOutHolidayPage extends BasePage {
    constructor(page: Page) {
        super(page, 'Do you want to work out holiday:');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }
 
    async submitFullYear(): Promise<NoOfDaysWorkedPage> {
        await this.page.getByRole('radio', { name: 'for a full leave year' }).check();
        await this.page.getByRole('button', { name: 'Continue' }).click();
       return await this.verifyPageAsync(() => new NoOfDaysWorkedPage(this.page));
    }
}

export class NoOfDaysWorkedPage extends BasePage {
    constructor(page: Page) {
        super(page, 'Number of days worked per week?');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }
 
    async submitNoOfDaysPerWeek(noofdays : number): Promise<InformationPage> {
        await this.page.getByRole('textbox', { name: 'Number of days worked per' }).fill(noofdays.toString());
        await this.page.getByRole('button', { name: 'Continue' }).click();
       return await this.verifyPageAsync(() => new InformationPage(this.page));
    }
}

export class InformationPage extends BasePage {
    constructor(page: Page) {
        super(page, 'Information based on your answers');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }
 
    async verifyNoOfLeaveDays(noofdays : number): Promise<void> {
        await expect(this.page.locator('#result-info')).toContainText(`The statutory holiday entitlement is ${noofdays} days holiday.`);
    }
}