import { test } from "@playwright/test";

test("iFrame test", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/iframe ");
  let closeButton = page.locator(
    "//button[contains(@class,'tox-notification__dismiss')]",
  );
  await closeButton.click();

  let myFrame = page.frameLocator("iframe#mce_0_ifr");

  let elementInsideTheIframe = myFrame.locator("//body[@id='tinymce']");

  //await elementInsideTheIframe.clear();
  await elementInsideTheIframe.press("Command+A", "Backspace");

  await elementInsideTheIframe.fill("Hello Cydeo");
});