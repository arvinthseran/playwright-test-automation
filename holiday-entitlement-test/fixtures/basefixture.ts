import { test as base } from '@playwright/test';
import { StartPage } from '../pages/startpage';

// Define the types for our custom fixtures
type HolidayFixtures = {
  startPage: StartPage;
};

export const test = base.extend<HolidayFixtures>({
  // This fixture navigaes to the page and provides the entry point to the application
  startPage: async ({ page }, use) => {
    const startPage = new StartPage(page);
    await use(startPage);
  },
});

export { expect } from '@playwright/test';