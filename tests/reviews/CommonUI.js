import { faker } from "@faker-js/faker";

export class CommonUI {

  static async login(page) {
    const CREDENTIALS = Buffer.from(
      `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`,
    ).toString("base64");
    await page.setExtraHTTPHeaders({ Authorization: `Basic ${CREDENTIALS}` });
    await page.goto(process.env.SEP_QA_URL);
  }

  static async completeStartApplicationStep(
    page,
    firstName = faker.person.firstName(),
    lastName = faker.person.lastName(),
    email = faker.internet.email(),
    phoneNumber = faker.string.numeric(10),
    howDidYouHear = "Email",
  ) {
    await page.locator("//input[@formcontrolname='firstName']").fill(firstName);
    await page.locator("//input[@formcontrolname='lastName']").fill(lastName);
    await page.locator("//input[@formcontrolname='email']").fill(email);
    await page
      .locator("//input[@formcontrolname='phoneNumber']")
      .fill(phoneNumber);

    await page
      .locator("//mat-label[text()='How did you hear about us?']")
      .click();
    await page
      .getByRole("option", { name: howDidYouHear, exact: true })
      .click();
    await page.locator("//button[@class='next-button']").click();
  }

  static async chosingPaymentPlan(
    page,
    planName = /5 Installments/,
  ) {
    await page.getByRole("button", { name: planName }).click();

    const nextButton = page
      .getByRole("button", { name: "Next", exact: true })
      .last();

    await nextButton.waitFor({ state: "visible" });
    await nextButton.click();
  }

  static async fillingCardDetails(
    page,
    cardNumber = "4242 4242 4242 4242",
    expiry = "12/34",
    cvc = "123",
    postalCode = "12345",
  ) {
    const paymentFrame = page.frameLocator('iframe[title="Secure payment input frame"]');

    const cardNumberInput = paymentFrame.locator("#payment-numberInput");
    const expiryInput = paymentFrame.locator("#payment-expiryInput");
    const cvcInput = paymentFrame.locator("#payment-cvcInput");
    const postalCodeInput = paymentFrame.locator("#payment-postalCodeInput");

    await cardNumberInput.fill(cardNumber);
    await expiryInput.fill(expiry);
    await cvcInput.fill(cvc);
    await postalCodeInput.fill(postalCode);

    await cardNumberInput.waitFor({ state: "visible" });
    await expiryInput.waitFor({ state: "visible" });
    await cvcInput.waitFor({ state: "visible" });
    await postalCodeInput.waitFor({ state: "visible" });
  }
}
