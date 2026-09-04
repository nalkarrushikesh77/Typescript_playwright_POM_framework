import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator(".cart_list");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  // Asserts the cart container is visible
  async verifyCartPageLoaded() {
    await expect(this.cartList).toBeVisible();
  }

  // Returns total number of items inside the cart
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  // Checks if a specific product title exists in the cart list
  async verifyItemInCart(itemName: string) {
    const item = this.page.locator(".inventory_item_name", { hasText: itemName });
    await expect(item).toBeVisible();
  }

  // Removes an item directly from the cart page view
  async removeItemByName(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/ /g, "-");
    await this.page.locator(`[data-test="remove-${formattedName}"]`).click();
  }

  // Clicks Checkout to proceed to step one
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  // Clicks Continue Shopping to navigate back to Inventory
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
}