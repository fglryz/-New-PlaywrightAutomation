import { test,expect } from '@playwright/test';

test.describe('', () => {
    test.beforeEach(async ({ page }) => {
      //create before each to navigate https://the-internet-5chk.onrender.com/

      await page.goto("https://the-internet-5chk.onrender.com/");

      await expect(page).toHaveTitle("Practice");
      await page.title()
      expect(await page.title()).toBe("Practice")
    });


  test('Verify checkbox are checked', async ({ page }) => {
    await page.getByText("Checkboxes").click();
     
   let checkbox1 = page.locator("input#box1");
   let checkbox2 = page.locator("input#box2");
   await checkbox1.check();

   await expect(checkbox1).toBeChecked();
   await expect(checkbox2).toBeChecked();
   //-------------------------------------//
   expect (await checkbox1.isChecked()).toBeTruthy();
   expect(await checkbox2.isChecked()).toBeTruthy();
  });
     

  test("Verify checkbox are unchecked", async ({ page }) => {
     await page.getByText("Checkboxes").click();

     let checkbox1 = page.locator("input#box1");
     let checkbox2 = page.locator("input#box2");
     

     await checkbox1.uncheck();
     await checkbox2.uncheck();
     await expect(checkbox1).not.toBeChecked();
     await expect(checkbox2).not.toBeChecked();

     //-------------------------------------//
    expect(await checkbox1.isChecked()).toBeFalsy();
     expect(await checkbox2.isChecked()).toBeFalsy();
    
  });

  test("Verify  text of the element", async ({ page }) => {
    let headerElement = page.locator("span.h1y");

    await expect(headerElement).toHaveText("Test Automation Practice");
    await expect(headerElement).toBeVisible();

    let actualText = await headerElement.innerText();
    expect(actualText).toEqual("Test Automation Practice");

   

  });

  
});