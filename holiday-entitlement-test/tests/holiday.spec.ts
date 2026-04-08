import { test } from '../fixtures/basefixture';
import { IrregularHrsPage, HolidayBasedOnPage, WorkOutHolidayPage, NoOfDaysWorkedPage, InformationPage, EmplStartDatePage, LeaveYearStartDatePage, EmplEndDatePage } from '../pages/startpage';

test.describe('Holiday entitlement calculator regression tests', { tag:['@regression']}, () => {
  
  let irregularHrsPage: IrregularHrsPage;
  let holidayBasedOnPage: HolidayBasedOnPage;
  let emplStartDatePage: EmplStartDatePage;
  let emplEndDatePage: EmplEndDatePage;
  let leaveYearStartDatePage: LeaveYearStartDatePage;
  let workOutHolidayPage: WorkOutHolidayPage;
  let noOfDaysWorkedPage: NoOfDaysWorkedPage;
  let informationPage: InformationPage;

test.beforeEach('', async ({startPage: startPage }) => {
      let startpage = await startPage.navigate();
      await startpage.verifyPage(); 
});

test('Calculate full leave year', { tag:['@fullleaveyear']}, async ({ startPage: startPage }) => {
  
  await test.step('Given I start the holiday entitlement calculator',  async () => {
    irregularHrsPage = await startPage.clickStart();
  });

  await test.step('When I choose "No" for Irregular working hours', async () => {
    holidayBasedOnPage = await irregularHrsPage.submitNo();
  });

  await test.step('And I choose holiday entitlement based on "days worked per week"', async () => {
    workOutHolidayPage = await holidayBasedOnPage.submitDaysPerWeek();
  });

    await test.step('And I choose "for a full leave year"', async () => {
    noOfDaysWorkedPage = await workOutHolidayPage.submitFullYear();
  });

  await test.step('And I enter "5" working days per week', async () => {
    informationPage = await noOfDaysWorkedPage.submitNoOfDaysPerWeek(5);
  });

  await test.step('Then the statutory entitlement is "28" days', async () => {
    await informationPage.verifyNoOfLeaveDays(28);
  });
});


test('Calculate starting part way through leave year', { tag:['@partway']}, async ({ startPage: startPage }) => {
  
  await test.step('Given I start the holiday entitlement calculator',  async () => {
    irregularHrsPage = await startPage.clickStart();
  });

  await test.step('When I choose "No" for Irregular working hours', async () => {
    holidayBasedOnPage = await irregularHrsPage.submitNo();
  });

  await test.step('And I choose holiday entitlement based on "days worked per week"', async () => {
    workOutHolidayPage = await holidayBasedOnPage.submitDaysPerWeek();
  });

    await test.step('And I choose "someone starting part way"', async () => {
    emplStartDatePage = await workOutHolidayPage.submitStartingPartway();
  });

    await test.step('And I fill in the employment start date as 01/02/2024', async () => {
    leaveYearStartDatePage = await emplStartDatePage.submitEmpStartDateAndGoToLeaveYearStartDate(1, 2, 2024);
  });
    await test.step('And I fill in the leave year start date as 01/01/2024', async () => {
    noOfDaysWorkedPage = await leaveYearStartDatePage.submitLeaveYearStartDate(1, 1, 2024);
  });

  await test.step('And I enter "5" working days per week', async () => {
    informationPage = await noOfDaysWorkedPage.submitNoOfDaysPerWeek(5);
  });

  await test.step('Then the statutory entitlement is "26" days', async () => {
    await informationPage.verifyNoOfLeaveDays(26);
  });
});

test('Calculate leaving part way through leave year', { tag:['@partway']}, async ({ startPage: startPage }) => {
  
  await test.step('Given I start the holiday entitlement calculator',  async () => {
    irregularHrsPage = await startPage.clickStart();
  });

  await test.step('When I choose "No" for Irregular working hours', async () => {
    holidayBasedOnPage = await irregularHrsPage.submitNo();
  });

  await test.step('And I choose holiday entitlement based on "days worked per week"', async () => {
    workOutHolidayPage = await holidayBasedOnPage.submitDaysPerWeek();
  });

    await test.step('And I choose "someone leaving part way"', async () => {
    emplEndDatePage = await workOutHolidayPage.submitLeavingPartway();
  });

    await test.step('And I fill in the employment end date as 01/02/2024', async () => {
    leaveYearStartDatePage = await emplEndDatePage.submitEmpEndDateAndGoToLeaveYearStartDate(1, 11, 2024);
  });
    await test.step('And I fill in the leave year start date as 01/01/2024', async () => {
    noOfDaysWorkedPage = await leaveYearStartDatePage.submitLeaveYearStartDate(1, 1, 2024);
  });

  await test.step('And I enter "5" working days per week', async () => {
    informationPage = await noOfDaysWorkedPage.submitNoOfDaysPerWeek(5);
  });

  await test.step('Then the statutory entitlement is "23.5" days', async () => {
    await informationPage.verifyNoOfLeaveDays(23.5);
  });
});

test('Calculate stating and leaving part way through leave year', { tag:['@partway']}, async ({ startPage: startPage }) => {
  
  await test.step('Given I start the holiday entitlement calculator',  async () => {
    irregularHrsPage = await startPage.clickStart();
  });

  await test.step('When I choose "No" for Irregular working hours', async () => {
    holidayBasedOnPage = await irregularHrsPage.submitNo();
  });

  await test.step('And I choose holiday entitlement based on "days worked per week"', async () => {
    workOutHolidayPage = await holidayBasedOnPage.submitDaysPerWeek();
  });

  await test.step('And I choose "someone starting and leaving part way"', async () => {
    emplStartDatePage = await workOutHolidayPage.submitStartAndLeavingPartway();
  });

  await test.step('And I fill in the employment start date as 01/02/2024', async () => {
    emplEndDatePage = await emplStartDatePage.submitEmpStartDateAndGoToEmpEndDate(1, 2, 2024);
  });
    await test.step('And I fill in the employment end date as 01/12/2024', async () => {
    noOfDaysWorkedPage = await emplEndDatePage.submitEmpEndDateAndGoToNoOfDaysWorked(1, 12, 2024);
  });

  await test.step('And I enter "5" working days per week', async () => {
    informationPage = await noOfDaysWorkedPage.submitNoOfDaysPerWeek(5);
  });

  await test.step('Then the statutory entitlement is "23.4" days', async () => {
    await informationPage.verifyNoOfLeaveDays(23.4);
  });
});

test('Employment end date must be with in 1 year', { tag:['@negative']}, async ({ startPage: startPage }) => {
  
  await test.step('Given I start the holiday entitlement calculator',  async () => {
    irregularHrsPage = await startPage.clickStart();
  });

  await test.step('When I choose "No" for Irregular working hours', async () => {
    holidayBasedOnPage = await irregularHrsPage.submitNo();
  });

  await test.step('And I choose holiday entitlement based on "days worked per week"', async () => {
    workOutHolidayPage = await holidayBasedOnPage.submitDaysPerWeek();
  });

  await test.step('And I choose "someone starting and leaving part way"', async () => {
    emplStartDatePage = await workOutHolidayPage.submitStartAndLeavingPartway();
  });

  await test.step('And I fill in the employment start date as 01/02/2024', async () => {
    emplEndDatePage = await emplStartDatePage.submitEmpStartDateAndGoToEmpEndDate(1, 2, 2024);
  });
    await test.step('Then an error message is thrown if I fill the employment end date as 01/02/2025', async () => {
    await emplEndDatePage.submitEmpEndDateAndVerifyErrorMessage(1, 2, 2025);
  });
});
});