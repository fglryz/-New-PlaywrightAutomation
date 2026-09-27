import { test, expect } from "@playwright/test";

test("Window popup paractice ", async ({ page }) => {
  //creating new listener for monitoring windows popup

  let promisedNewPageEvent = page.waitForEvent("popup");

  await page.goto("https://the-internet-5chk.onrender.com/windows");
  await page.click("text='Click Here'");

  let newPage = await promisedNewPageEvent; //await for the prose to be resolved

  await expect(newPage).toHaveTitle("New Window");
  await expect(page).toHaveTitle("Windows");

  await page.bringToFront()
  let firstWindowElements = page.getByText("Opening a new window");
  await expect(firstWindowElements).toBeVisible();

  await newPage.bringToFront()
  let secondWindowElements = newPage.getByText("New Window");
  await expect(secondWindowElements).toBeVisible();
});
