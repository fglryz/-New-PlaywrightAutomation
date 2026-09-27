import { test } from '@playwright/test';

test('Bypass authentication by embedding the credentials in the url',async ({ page }) => {
  //https://username:password@the-internet-5chk.onrender.com/basic_auth

  await page.goto(
    "https://admin:admin@the-internet-5chk.onrender.com/basic_auth"),
     await page.waitForTimeout(2000);
});




test("Bypass authentication by encoding credentials bese64 format", async ({ page }) => {

const username = process.env.PRACTICE_USERNAME;
const password = process.env.PRACTICE_PASSWORD;
test.skip(!username || !password, "Practice credentials are not configured");

const encodedCredentials = Buffer.from(`${username}:${password}`).toString("base64");

await page.setExtraHTTPHeaders({
  Authorization: `Basic ${encodedCredentials}`,
});

await page.goto("https://the-internet-5chk.onrender.com/basic_auth");


});