import { test, expect } from "@playwright/test";
import { CommonUI } from "./commonUI";

test.describe("Payment Plan Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Ensure the user is on the enrollment page.

    await CommonUI.login(page);
    await CommonUI.completeStartApplicationStep(page);
  });

  test("Verify that Step 2 stepper is blue and Step 1 stepper is green", async ({page}) => {
    const step1StepperCircle = page.locator(".step-circle").nth(0);
    const step2StepperCircle = page.locator(".step-circle").nth(1);

    await expect(step1StepperCircle).toHaveCSS("background-color", "rgb(172, 245, 138)",);
    await expect(step2StepperCircle).toHaveCSS( "background-color","rgb(1, 201, 255)",
    );
  });

  test("Verify that the Next button is disabled by default", async ({page,}) => {
    const nextButton = page.getByRole("button", { name: "Next", exact: true }).last();

    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeDisabled();
  });

  test("Verify that the Next button becomes enabled when a payment plan is selected", async ({page,}) => {
    await page.getByRole("button", { name: /Upfront/ }).click();
    const nextButton = page.getByRole("button", { name: "Next", exact: true }).last();

    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();
  });

  test("Verify Clicking the active next button will change the stepper 2 color to green", async ({page,}) => {
    await page.getByRole("button", { name: /5 Installments/ }).click();

    const nextButton = page
      .getByRole("button", { name: "Next", exact: true })
      .last();
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    const step2StepperCircle = page.locator(".step-circle").nth(1);
    const step3StepperCircle = page.locator(".step-circle").nth(2);

    await expect(step2StepperCircle).toHaveCSS("background-color","rgb(172, 245, 138)",);
    await expect(step3StepperCircle).toHaveCSS("background-color","rgb(1, 201, 255)",
    );
  });


  test("Verify that Step 1 & Step 2 steppers are green and Step 3 stepper is blue", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /5 Installments/ }).click();

    const nextButton = page
      .getByRole("button", { name: "Next", exact: true })
      .last();
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    const step1StepperCircle = page.locator(".step-circle").nth(0);
    const step2StepperCircle = page.locator(".step-circle").nth(1);
    const step3StepperCircle = page.locator(".step-circle").nth(2);

    await expect(step1StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)",
    );
    await expect(step2StepperCircle).toHaveCSS(
      "background-color",
      "rgb(172, 245, 138)",
    );
    await expect(step3StepperCircle).toHaveCSS(
      "background-color",
      "rgb(1, 201, 255)",
    );
  });

  test("Verify that the payment input fields are enabled and accept card details", async ({
    page,
  }) => {
    await CommonUI.chosingPaymentPlan(page);

    const paymentFrame = page.frameLocator(
      'iframe[title="Secure payment input frame"]',
    );
    const cardNumberInput = paymentFrame.locator("#payment-numberInput");
    const expiryInput = paymentFrame.locator("#payment-expiryInput");
    const cvcInput = paymentFrame.locator("#payment-cvcInput");
    const postalCodeInput = paymentFrame.locator("#payment-postalCodeInput");

    await expect(cardNumberInput).toBeVisible();
    await expect(cardNumberInput).toBeEnabled();
    await expect(expiryInput).toBeVisible();
    await expect(expiryInput).toBeEnabled();
    await expect(cvcInput).toBeVisible();
    await expect(cvcInput).toBeEnabled();
    await expect(postalCodeInput).toBeVisible();
    await expect(postalCodeInput).toBeEnabled();

    await CommonUI.fillingCardDetails(page);

    await expect(cardNumberInput).toHaveValue("4242 4242 4242 4242");
    await expect(expiryInput).toHaveValue("12 / 34");
    await expect(cvcInput).toHaveValue("123");
    await expect(postalCodeInput).toHaveValue("12345");
  });

});
