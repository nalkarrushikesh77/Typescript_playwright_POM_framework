import { Page, Locator, expect } from "@playwright/test";

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Fills out user information form
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  // Clicks Continue to proceed to Checkout Overview (Step Two)
  async clickContinue() {
    await this.continueButton.click();
  }

  // Clicks Cancel to return to the Cart Page
  async clickCancel() {
    await this.cancelButton.click();
  }

  // Fetches error text if validation fails (e.g., submitting empty fields)
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}