import { test, expect } from "@playwright/test";

test.describe("JS alert", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet-5chk.onrender.com/javascript_alerts");
  });

  test("@test Regular alert", async ({ page }) => {
    page.on("dialog", (alert) => {
      console.log(`Alert Message: ${alert.message()}`);
      alert.accept();
    });

    await page.locator("//button[@onclick='jsAlert()']").click();
    await expect(page.locator("#result")).toHaveText(
      "You successfully clicked an alert",
    );
  });

  test("confirmation allert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert Message: ${alert.message()}`);
      alert.dismiss();
    });

    let JsConfAllertBtn = page.locator("//button[@onclick='jsConfirm()']");
    await JsConfAllertBtn.click();
    await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
  });

  test("Promt alert", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(`Alert Message: ${alert.message()}`);
      await alert.accept("CYDEO");
    });

    const promptAlertBtn = page.locator("//button[@onclick='jsPrompt()']");

    await promptAlertBtn.click();

    await expect(page.locator("#result")).toHaveText("You entered: CYDEO");
  });
});
