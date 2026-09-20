import { test, expect } from "@playwright/test";

test("", async ({ page }) => {
  await page.goto("https://google.com/");
  //await page.waitForTimeout(5000);
  await expect(page).toHaveTitle(/Google/);
  let acceptButton = page.locator("button#L2AGLb");
  await acceptButton.click();

  let searchBox = page.locator("textarea.gLFyf");
  //searchBox.type('Playwright');
  //await page.waitForTimeout(3000);
  searchBox.fill("Playwright");

  await searchBox.press("Enter");
  await page.waitForTimeout(3000);
});
