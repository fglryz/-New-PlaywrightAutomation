import { test, expect } from "@playwright/test";

test.describe("Practice Cydeo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
  });
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(2000);
  });

  test("Getting the title ofthe  page", async ({ page }) => {
    console.log(await page.title());
    await expect(page).toHaveTitle("Practice");
  });

  test("Getting the current url of the page", async ({ page }) => {
    expect(await page.url()).toBe("https://the-internet-5chk.onrender.com/");
  });
});
