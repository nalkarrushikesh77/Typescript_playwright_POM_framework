import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";

test.describe("SauceDemo Checkout Step One Tests", () => {
  let checkoutStepOnePage: CheckoutStepOnePage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);

    // Setup: Navigate through Login -> Inventory -> Add Item -> Cart -> Checkout
    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin("standard_user", "secret_sauce");
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();

    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
  });

  test("Verify submitting form with valid info redirects to Overview (Step Two)", async ({ page }) => {
    await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "411001");
    await checkoutStepOnePage.clickContinue();

    // Assert redirection to Step Two
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
  });

  test("Verify error message appears when submitting empty form", async () => {
    await checkoutStepOnePage.clickContinue();

    const error = await checkoutStepOnePage.getErrorMessage();
    expect(error).toContain("Error: First Name is required");
  });
});