import { test } from '../fixtures/basefixture';
import { IrregularHrsPage, HolidayBasedOnPage, WorkOutHolidayPage, NoOfDaysWorkedPage, InformationPage } from '../pages/startpage';

test('Calculate full leave year', async ({ startPage: startPage }) => {
  let irregularHrsPage: IrregularHrsPage;
  let holidayBasedOnPage: HolidayBasedOnPage;
  let workOutHolidayPage: WorkOutHolidayPage;
  let noOfDaysWorkedPage: NoOfDaysWorkedPage;
  let informationPage: InformationPage;

  await test.step('Given I navigate to the holiday entitlement calculator', async () => {
    let startpage = await startPage.navigate();
    await startpage.verifyPage(); 
    irregularHrsPage = await startpage.clickStart();
  });

  await test.step('When I choose "days worked per week"', async () => {
    holidayBasedOnPage = await irregularHrsPage.submitNo();
  });

  await test.step('And I choose "full leave year"', async () => {
    workOutHolidayPage = await holidayBasedOnPage.submitDaysPerWeek();
  });

  await test.step('And I enter "5" working days', async () => {
    noOfDaysWorkedPage = await workOutHolidayPage.submitFullYear();
  });

  await test.step('Then the statutory entitlement is 28 days', async () => {
    informationPage = await noOfDaysWorkedPage.submitNoOfDaysPerWeek(5);
    await informationPage.verifyNoOfLeaveDays(28);
  });
});