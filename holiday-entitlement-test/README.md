# Holiday Entitlement Calculator Test Suite

This directory contains end-to-end test automation for the UK Government's Holiday Entitlement Calculator tool using Playwright Test.

## Overview

The Holiday Entitlement Calculator is a GOV.UK tool that helps users calculate their statutory holiday entitlement based on different working arrangements. This test suite ensures the calculator works correctly across various scenarios and maintains accessibility standards.

## Test Structure

### Test Files

- **`holiday.spec.ts`** - Regression tests covering various holiday entitlement calculation scenarios
  - Full leave year calculations
  - Irregular working hours handling
  - Multiple employment scenarios
  - Edge cases and boundary conditions

- **`smoke.spec.ts`** - Smoke tests to verify basic functionality
  - Core calculator workflows
  - Happy path validation
  - Quick sanity checks

- **`accessibility.spec.ts`** - Accessibility compliance tests
  - WCAG 2.1 compliance validation using axe-core
  - Screen reader compatibility
  - Keyboard navigation

### Page Objects

Located in the `pages/` directory:

- **`basepage.ts`** - Base page class with common methods and utilities
- **`startpage.ts`** - Page objects for calculator pages:
  - `IrregularHrsPage` - Irregular working hours selection
  - `HolidayBasedOnPage` - Holiday calculation basis selection
  - `WorkOutHolidayPage` - Holiday calculation output
  - `NoOfDaysWorkedPage` - Days worked input
  - `InformationPage` - Information page
  - `EmplStartDatePage` - Employment start date input
  - `LeaveYearStartDatePage` - Leave year start date input
  - `EmplEndDatePage` - Employment end date input

### Fixtures

The `fixtures/` directory contains test fixtures:
- **`basefixture.ts`** - Custom Playwright fixtures for test setup and teardown

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test suite
```bash
# Smoke tests
npx playwright test --project=smoke

# Regression tests
npx playwright test --project=regression

# Accessibility tests
npx playwright test --project=accessibility
```

### Run tests with specific tags
```bash
# Run regression tests
npx playwright test --grep @regression

# Run full leave year tests
npx playwright test --grep @fullleaveyear
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Debug tests
```bash
npx playwright test --debug
```

## Test Configuration

The test suite is configured in `playwright.config.ts`:

- **Base URL:** `https://www.gov.uk`
- **Timeout:** 30 seconds per test
- **Expect Timeout:** 10 seconds for assertions
- **Browsers:** Chrome (Desktop)
- **Reporters:** HTML report (generated in `playwright-report/`)
- **Retry Logic:** 2 retries on CI, 0 on local
- **Video/Screenshot:** Captured on failure or first retry

### Test Projects

- **Smoke** - Basic functionality tests (runs first)
- **Accessibility** - Accessibility compliance checks
- **Regression** - Comprehensive regression tests (depends on smoke passing)

## Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

Generated artifacts:
- `playwright-report/` - HTML test report
- `test-results/` - Detailed test results and traces
- Screenshots and videos saved on failure

## Dependencies

- **@playwright/test** - E2E testing framework
- **@axe-core/playwright** - Accessibility testing
- **@types/node** - TypeScript types for Node.js

## Key Testing Patterns

### Using Test Fixtures
Tests use custom fixtures from `basefixture.ts`:
```typescript
test('example', async ({ startPage }) => {
  await startPage.navigate();
});
```

### Page Object Model
All page interactions use page objects to maintain clean test code:
```typescript
irregularHrsPage = await startPage.clickStart();
holidayBasedOnPage = await irregularHrsPage.submitNo();
```

### Test Steps
Tests use Playwright's `test.step()` for better reporting:
```typescript
await test.step('Given I start the calculator', async () => {
  // Step implementation
});
```

## CI/CD Integration

The test suite includes CI/CD configuration:
- Runs on GitHub Actions with reporter integration
- Retries tests on CI (2 retries) for flaky test handling
- Single worker on CI to avoid resource conflicts
- Parallel execution on local machines

## Troubleshooting

### Tests timing out
- Increase timeout in `playwright.config.ts`
- Check network connectivity to GOV.UK
- Verify the calculator URL is accessible

### Failed accessibility tests
- Check for accessibility violations in the HTML report
- Refer to axe-core documentation for remediation
- Ensure page elements have proper ARIA labels

### Flaky tests
- Check for race conditions in page interactions
- Verify proper wait conditions in page objects
- Review the video/screenshot artifacts for failure details

## Contributing

When adding new tests:
1. Create page objects for new calculator pages
2. Use appropriate tags (`@regression`, `@smoke`, etc.)
3. Follow the BDD style with `test.step()`
4. Ensure accessibility compliance
5. Run full suite before committing

## Resources

- [Playwright Documentation](https://playwright.dev)
- [GOV.UK Holiday Entitlement Calculator](https://www.gov.uk/calculate-your-holiday-entitlement)
- [axe-core Accessibility Testing](https://www.deque.com/axe/core-documentation/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## License

This project is provided as-is for testing purposes.
