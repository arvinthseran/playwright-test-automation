import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  retries: 1,
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  reporter: [
    ["list"], 
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["json", {outputFile: "results.json"}]
],
outputDir: "test-results/"
});
