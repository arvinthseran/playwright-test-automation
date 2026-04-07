import { test } from '../fixtures/basefixture';
import { IrregularHrsPage, HolidayBasedOnPage, WorkOutHolidayPage, NoOfDaysWorkedPage, InformationPage } from '../pages/startpage';

test.beforeEach('', async ({ }) => {
  console.log(`Running ${test.info().title}`);
});

test('Calculate full leave year', { tag:['@regression', '@fullleaveyear']}, async ({ startPage: startPage }) => {
  let irregularHrsPage: IrregularHrsPage;
  let holidayBasedOnPage: HolidayBasedOnPage;
  let workOutHolidayPage: WorkOutHolidayPage;
  let noOfDaysWorkedPage: NoOfDaysWorkedPage;
  let informationPage: InformationPage;

  await test.step('Given I navigate to the holiday entitlement calculator',  async () => {
    let startpage = await startPage.navigate();
    await startpage.verifyPage(); 
    irregularHrsPage = await startpage.clickStart();
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