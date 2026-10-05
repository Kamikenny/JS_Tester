import { test, expect, Page } from '@playwright/test';

const userConnect = async (
    page: Page,
    user: string = "standard_user",
) => {
    const username: string = user

    await page.getByRole("textbox", { name: "Username" }).fill(username)
    await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce")
    await page.getByRole("button", { name: "Login" }).click()
}

test.beforeEach(async ({ page }) => {
    await page.goto("https://saucedemo.com/")
    await userConnect(page)
})

test('test', async ({ page }) => {

    const badges = page.getByTestId("inventory-item")
    const articles = await badges.filter({ hasText: /backpack|bike/i }).all()

    for (const article of articles) {
        await article.getByRole('button', { name: /add/i, exact: false }).click()
    }

    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2")

    await page.getByTestId("shopping-cart-link").click()
    const cartItems = await page.getByTestId("invetory-item").all()

    await page.getByTestId("checkout").click()

    await page.getByTestId("firstName").fill("Standard")
    await page.getByTestId("lastName").fill("User")
    await page.getByTestId("postalCode").fill("1000")

    await page.getByTestId("continue").click()

    await expect(page.getByTestId("subtotal-label")).toHaveText(/\$39.98/)

    await page.locator('[data-test="finish"]').click();

    await expect(page.getByText("Thank you for your order!"))
});