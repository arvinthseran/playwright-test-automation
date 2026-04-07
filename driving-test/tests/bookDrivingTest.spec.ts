import { test, expect } from "@playwright/test";
import { BookDrivingTestPage } from "../pages/BookDrivingTestPage";
import { ChooseTyprOfTestPage } from "../pages/ChooseTyprOfTestPage";

test("can open booking page and click Start now", async ({ page }) => {
  const bookingPage = new BookDrivingTestPage(page);
  await bookingPage.goto();
  await bookingPage.clickStartNow();

  const choosetypepage = new ChooseTyprOfTestPage(page);
  await choosetypepage.verifyPageLoaded();
  await choosetypepage.clickCar();
    
});
