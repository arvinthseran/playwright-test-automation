import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Audit', () => {
  test('should not have any detectable accessibility violations', { tag:['@accessibility']}, async ({ page }) => {
    // 1. Navigate to your local app
    await page.goto('http://localhost:8080/');

    // 2. Run the accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // 3. Assert that there are no violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});