import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/login.page"

test("Verify user is able to login", async({page})=>{
    
const loginPage = new LoginPage(page);
await page.goto("https://www.saucedemo.com/");
await loginPage.performLogin("standard_user", "secret_sauce");

await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

})