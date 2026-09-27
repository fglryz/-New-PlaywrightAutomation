import { test, expect } from "@playwright/test";

test("verify all links under ul tag are displayed and enabled", async ({
  page,
}) => {
  // Step 1 & 2: Open Chrome browser and navigate to URL
  await page.goto("https://the-internet-5chk.onrender.com/");

  // Step 3: Verify URL contains "the-internet-5chk.onrender.com"
  await expect(page).toHaveURL(/the-internet-5chk\.onrender\.com/);

  // Step 4: Verify title should be "Practice"
  await expect(page).toHaveTitle("Practice");

  // Step 5: Verify all links under ul HTML tag are visible and clickable
  const links = page.locator("//ul[@class='list-group']//a");




  // Check that all links are enabled (not disabled)
  const linkCount = await links.count();
  for (let i = 0; i < linkCount; i++) {
    await expect(links.nth(i)).toBeEnabled();
    await expect(links.nth(i)).toBeVisible();
  }
});
test('Search CYDEO on google', async ({ page }) => {
  // Step 1 & 2: Open Chrome browser and navigate to Google
  await page.goto('https://www.google.com/');
 page.locator('#mat-input-0')
  let acceptButton = page.locator("button#L2AGLb");
  await acceptButton.click();

  // Step 3: Verify the title should be "Google"
  await expect(page).toHaveTitle('Google');

  // Step 4: Enter "CYDEO" in the searchbox and press enter key
  const searchBox = page.locator("//textarea[@class='gLFyf']");
  await searchBox.fill('CYDEO');
  await searchBox.press('Enter');

  // Wait for search results to load
  await page.waitForLoadState('networkidle');

  // Step 5: Verify page title contains "CYDEO"
  await expect(page).toHaveTitle(/CYDEO/);
});
