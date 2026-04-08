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
    await this.page.goto('/calculate-your-holiday-entitlement');
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

    async submitStartingPartway(): Promise<EmplStartDatePage> {
        await this.page.getByRole('radio', { name: 'for someone starting part way' }).check();
        await this.page.getByRole('button', { name: 'Continue' }).click();
       return await this.verifyPageAsync(() => new EmplStartDatePage(this.page));
    }

    async submitLeavingPartway(): Promise<EmplEndDatePage> {
        await this.page.getByRole('radio', { name: 'for someone leaving part way' }).check();
        await this.page.getByRole('button', { name: 'Continue' }).click();
       return await this.verifyPageAsync(() => new EmplEndDatePage(this.page));
    }

    async submitStartAndLeavingPartway(): Promise<EmplStartDatePage> {
        await this.page.getByRole('radio', { name: 'for someone starting and' }).check();
        await this.page.getByRole('button', { name: 'Continue' }).click();
       return await this.verifyPageAsync(() => new EmplStartDatePage(this.page));
    }
}

export class EmplStartDatePage extends BasePage {
    constructor(page: Page) {
        super(page, 'What was the employment start date?');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }

    private async EnterEmpStartDate(day : number, month: number, year: number): Promise<void> {
        await this.page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
        await this.page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
        await this.page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    async submitEmpStartDateAndGoToLeaveYearStartDate(day : number, month: number, year: number): Promise<LeaveYearStartDatePage> {
        await this.EnterEmpStartDate(day, month, year);
        return await this.verifyPageAsync(() => new LeaveYearStartDatePage(this.page));
    }
    async submitEmpStartDateAndGoToEmpEndDate(day : number, month: number, year: number): Promise<EmplEndDatePage> {
        await this.EnterEmpStartDate(day, month, year);
        return await this.verifyPageAsync(() => new EmplEndDatePage(this.page));
    }
}

export class EmplEndDatePage extends BasePage {
    constructor(page: Page) {
        super(page, 'What was the employment end date?');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }    
    
    private async EnterEmpEndDate(day : number, month: number, year: number): Promise<void> {
        await this.page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
        await this.page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
        await this.page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    
    async submitEmpEndDateAndGoToLeaveYearStartDate(day : number, month: number, year: number): Promise<LeaveYearStartDatePage> {
        await this.EnterEmpEndDate(day, month, year);
        return await this.verifyPageAsync(() => new LeaveYearStartDatePage(this.page));
    }

    async submitEmpEndDateAndGoToNoOfDaysWorked(day : number, month: number, year: number): Promise<NoOfDaysWorkedPage> {
        await this.EnterEmpEndDate(day, month, year);
        return await this.verifyPageAsync(() => new NoOfDaysWorkedPage(this.page));
    }

    async submitEmpEndDateAndVerifyErrorMessage(day : number, month: number, year: number): Promise<void> {
        let errormessage = `Your employment end date must be within 1 year of your start date`;
        await this.EnterEmpEndDate(day, month, year);
        await expect(this.page.getByRole('alert')).toContainText(errormessage);
        await expect(this.page.getByRole('group')).toContainText(errormessage);
    }
}

export class LeaveYearStartDatePage extends BasePage {
    constructor(page: Page) {
        super(page, 'When does the leave year start?');
    }
    async verifyPage(): Promise<void> {
       await expect(this.page.locator('h1')).toContainText(this.pageTitle);
    }
 
    async submitLeaveYearStartDate(day : number, month: number, year: number): Promise<NoOfDaysWorkedPage> {
        await this.page.getByRole('textbox', { name: 'Day' }).fill(day.toString());
        await this.page.getByRole('textbox', { name: 'Month' }).fill(month.toString());
        await this.page.getByRole('textbox', { name: 'Year' }).fill(year.toString());
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