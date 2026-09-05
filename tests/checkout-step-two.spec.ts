import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";
import { CheckoutStepTwoPage } from "../pages/checkout-step-two.page";
import path from "path";

test.describe("SauceDemo Checkout Step Two Tests", () => {
  let checkoutStepTwoPage: CheckoutStepTwoPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    // E2E Pre-condition setup
    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin("standard_user", "secret_sauce");
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await cartPage.clickCheckout();
    await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "411001");
    await checkoutStepOnePage.clickContinue();

    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
  });

  test("Verify subtotal + tax equals total amount", async () => {
    const subtotal = await checkoutStepTwoPage.getSubtotal();
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();

    // Mathematically verify Subtotal + Tax == Total
    const calculatedTotal = parseFloat((subtotal + tax).toFixed(2));
    expect(calculatedTotal).toBe(total);
  });

  test("Verify clicking Finish redirects to Checkout Complete page", async ({ page }) => {
    await checkoutStepTwoPage.clickFinish();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
  });
});