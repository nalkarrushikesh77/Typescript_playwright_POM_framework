import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutStepOnePage } from "../pages/checkout-step-one.page";
import { CheckoutStepTwoPage } from "../pages/checkout-step-two.page";
import { CheckoutCompletePage } from "../pages/checkout-complete.page";

test.describe("SauceDemo End-to-End Checkout Workflow", () => {
  test("Complete full user journey from login to order confirmation", async ({ page }) => {
    // 1. Initialize Page Objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // Step 1: Login
    await page.goto("https://www.saucedemo.com/");
    await loginPage.performLogin("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Step 2: Select item & navigate to cart
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
    await inventoryPage.goToCart();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // Step 3: Verify item in cart & click Checkout
    const itemQuantity = await cartPage.getCartItemCount();
    expect(itemQuantity).toBe(1);
    await cartPage.clickCheckout();

    // Step 4: Fill step-one customer form
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    await checkoutStepOnePage.fillCheckoutInformation("John", "Doe", "411001");
    await checkoutStepOnePage.clickContinue();

    // Step 5: Verify overview calculations & finish order
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    const subtotal = await checkoutStepTwoPage.getSubtotal();
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();
    expect(parseFloat((subtotal + tax).toFixed(2))).toBe(total);
    await checkoutStepTwoPage.clickFinish();

    // Step 6: Validate successful order confirmation
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    await checkoutCompletePage.verifyOrderSuccess();

    // Step 7: Return to home inventory screen
    await checkoutCompletePage.clickBackHome();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });
});