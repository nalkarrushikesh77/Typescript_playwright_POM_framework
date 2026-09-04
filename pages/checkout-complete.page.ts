import { Page, Locator, expect } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Verifies successful order confirmation header message
  async verifyOrderSuccess() {
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }

  // Returns order header text
  async getSuccessHeaderText(): Promise<string> {
    return await this.completeHeader.innerText();
  }

  // Clicks Back Home to return to main product inventory
  async clickBackHome() {
    await this.backHomeButton.click();
  }
}