import { test, expect } from "@playwright/test";

/*
1.verify that there are exactly 50 link within ul tag
2.verify that  each of the 50 link elements within the <ul> tag is visible and clickable
3.verify that  each of the 50 link elements within the <ul> tag has an href attribute
*/

test.describe("Array", () => {
  let elements; 
  test.beforeEach(async ({ page }) => {
    //create before each to navigate https://the-internet-5chk.onrender.com/

    await page.goto("https://the-internet-5chk.onrender.com/");
     elements = await page.locator("//ul[@class='list-group']/li/a").all();
  });

  test("verify that there are exactly 50 link within ul tag", async ({page,}) => {
    
    expect(elements.length).toBe(50);
    //expect(elements.length).toBeGreaterThanOrEqual(20);
  });

  test("verify that  each of the 50 link elements within the <ul> tag is visible and clickable", async ({page,}) => {
    
    for await (const e of elements) {
      await expect(e).toBeVisible();
      //expect(e.isVisible()).toBeTruthy();
    }
  });

  test("verify that  each of the 50 link elements within the <ul> tag has an href attribute", async ({page}) => {
    
    for await (const e of elements) {
      await expect(e).toHaveAttribute("href");
      console.log(await e.getAttribute("href"));
    }
  });
});
