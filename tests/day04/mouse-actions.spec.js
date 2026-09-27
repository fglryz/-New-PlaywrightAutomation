import { test } from "@playwright/test";

test.describe("Mouse Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/");
    await page.waitForTimeout(3000);
  });
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
  });
  test("Left Click", async ({ page }) => {
    await page.click("text='A/B Testing'");
  });

  test("Right Click", async ({ page }) => {
    await page.click("text='A/B Testing'", { button: "right" });
  });

  test("Hover", async ({ page }) => {
    await page.click("text='Hovers'");

    let elements = await page.locator("//img[@alt='User Avatar']").all();
    for (let each of elements) {
      await each.hover();
    }
  });
  test("Mouse whell scrolling", async ({ page }) => {

    await page.mouse.wheel(0,1200);

  });
  test(" scrolling specific elements", async ({ page }) => {
  let inputLinks = page.getByText('Inputs');
  await inputLinks.scrollIntoViewIfNeeded();
  await inputLinks.click()

  });
  test(" Drag and Drop", async ({ page }) => {
    await page.click("text='Drag and Drop'");
    //await page.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']");
let squareA = page.locator("//div[@id='column-a']");
let squareB = page.locator("//div[@id='column-b']");
await squareA.dragTo(squareB);

  });
});
