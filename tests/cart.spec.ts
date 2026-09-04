import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";

test.describe("SauceDemo Cart Page Tests", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Login and navigate to inventory
    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin("standard_user", "secret_sauce");

    // Add an item and navigate to cart
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();
  });

  test("Verify cart page loads with added item", async ({ page }) => {
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyItemInCart("Sauce Labs Backpack");
    
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(5);
  });

  test("Verify removing an item from cart page removes it from DOM", async () => {
    await cartPage.removeItemByName("Sauce Labs Backpack");
    
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test("Verify clicking checkout redirects to step one page", async ({ page }) => {
    await cartPage.clickCheckout();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
  });
});