import { test, expect } from "@playwright/test";

test("Getting the title ofthe  page", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");

  //let actualTitle = await page.title();
  //console.log("actualTitle = " + actualTitle);
  await expect(page).toHaveTitle("Practice");

  //await expect(actualTitle).toBe("Practice");
});

test("Getting the current url of the page", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/");
  let currentUrl = page.url();
  expect(currentUrl).toBe("https://the-internet-5chk.onrender.com/");
});


test('Set the window size', async ({ page }) => {
  await page.goto('https://the-internet-5chk.onrender.com/');
  await page.waitForTimeout (3000);
  //await page.setViewportSize({ width: 1280, height: 720 });
  //expect(page.viewportSize()).toEqual({ width: 1280, height: 720 });
  
});
