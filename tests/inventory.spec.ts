import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

test.describe("SauceDemo Inventory Page Tests", () => {
  let inventoryPage: InventoryPage;

  // Log in automatically before running each test case
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Verify inventory page container is visible and displays 6 items", async () => {
    await inventoryPage.verifyItemListVisible();
    
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test("Verify adding an item updates the cart badge count", async () => {
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe("1");
  });

  test("Verify removing an item updates the cart badge count", async () => {
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.addItemToCartByName("Sauce Labs Bike Light");
    
    // Remove one item and check if count decrements to 1
    await inventoryPage.removeItemFromCartByName("Sauce Labs Backpack");
    const badgeCount = await inventoryPage.getCartBadgeCount();
    expect(badgeCount).toBe("1");
  });

  test("Verify sorting items by Price (Low to High)", async () => {
    await inventoryPage.selectSortOption("lohi");

    const actualPrices = await inventoryPage.getAllPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });

  test("Verify navigating to the shopping cart page", async ({ page }) => {
    await inventoryPage.goToCart();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
  });
});