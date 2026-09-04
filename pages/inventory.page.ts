import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly itemList: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemList = page.locator(".inventory_list");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
  }

  // 1. Visibility & Counts
  async verifyItemListVisible() {
    await expect(this.itemList).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  // 2. Cart Actions
  async addItemToCartByName(itemName: string) {
    // Converts "Sauce Labs Backpack" to "sauce-labs-backpack" for locator attributes
    const formattedName = itemName.toLowerCase().replace(/ /g, "-");
    await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
  }

  async removeItemFromCartByName(itemName: string) {
    const formattedName = itemName.toLowerCase().replace(/ /g, "-");
    await this.page.locator(`[data-test="remove-${formattedName}"]`).click();
  }

  async getCartBadgeCount(): Promise<string> {
    return await this.shoppingCartBadge.innerText();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  // 3. Sorting Actions
  async selectSortOption(optionValue: "az" | "za" | "lohi" | "hilo") {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllPrices(): Promise<number[]> {
    const priceElements = await this.page.locator(".inventory_item_price").allInnerTexts();
    return priceElements.map(price => parseFloat(price.replace("$", "")));
  }

  async getAllItemNames(): Promise<string[]> {
    return await this.page.locator(".inventory_item_name").allInnerTexts();
  }
}