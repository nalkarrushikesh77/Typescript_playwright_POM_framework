import { Page, Locator, expect } from "@playwright/test";

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  // Asserts the overview page container loaded
  async verifyOverviewPageLoaded() {
    await expect(this.subtotalLabel).toBeVisible();
  }

  // Helper method to parse currency numbers out of summary strings (e.g., "Item total: $29.99" -> 29.99)
  private parsePriceString(rawText: string): number {
    const matched = rawText.match(/\$([0-9]+\.[0-9]{2})/);
    return matched ? parseFloat(matched[1]) : 0;
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.innerText();
    return this.parsePriceString(text);
  }

  async getTax(): Promise<number> {
    const text = await this.taxLabel.innerText();
    return this.parsePriceString(text);
  }

  async getTotal(): Promise<number> {
    const text = await this.totalLabel.innerText();
    return this.parsePriceString(text);
  }

  // Clicks Finish to place the order
  async clickFinish() {
    await this.finishButton.click();
  }
}