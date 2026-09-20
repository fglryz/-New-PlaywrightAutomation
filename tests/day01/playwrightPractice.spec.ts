import { test, expect } from "@playwright/test";

test("", async ({ page }) => {
  //navigate to google.com
  await page.goto("https://google.com/");
  //pause for 3 seconds
  await page.waitForTimeout(3000);
  //assert the title of the page is "Google"
  await expect(page).toHaveTitle(/Google/);
});

test(" ", async ({ page }) => {});
