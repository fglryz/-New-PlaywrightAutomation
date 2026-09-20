import { test } from "@playwright/test";

test.describe("Test Group", () => {
  test.beforeEach(async ({ page }) => {
    //create before each to navigate https://the-internet-5chk.onrender.com/

    await page.goto("https://the-internet-5chk.onrender.com/");
  });

  test("Check", async ({ page }) => {
    let checkboxesLink = page.getByText("Checkboxes");
    //let checkboxesLink = page.locator("text='Checkboxes'");
    await checkboxesLink.click();

    let checkbox1 = page.locator("//*[@id='box1']");
    await checkbox1.check();
  });

  test("Uncheck", async ({ page }) => {
    let checkboxesLink = page.getByText("Checkboxes");
    //let checkboxesLink = page.locator("text='Checkboxes'");
    await checkboxesLink.click();

    let checkbox2 = page.locator("//*[@id='box2']");
    await checkbox2.uncheck();
  });

  test("Select", async ({ page }) => {
    let dropdownLink = page.getByText("Dropdown");
    await dropdownLink.click();
    let simpleDropdown = page.locator("//*[@id='dropdown']");
    //await simpleDropdown.selectOption("1");//selecting by the value
    //await simpleDropdown.selectOption({label:"Option 1"});//select by text
    await simpleDropdown.selectOption({ index: 1 });
  });
});
