import test, { expect, Page } from "@playwright/test";

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
})

test.describe("Ajouts au panier", () => {
    test("Ajouter 'backpack et bike' puis enlever 'bike'", async ({ page }) => {
        await userConnect(page)
        await expect(page.getByText(/Products/)).toBeVisible()

        // const backpack = await page.locator('[data-test="inventory-item"]').filter({ hasText: /backpack/i })
        // const bike = await page.locator('[data-test="inventory-item"]').filter({ hasText: /bike/i })

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

        // await backpack.getByRole('button', { name: /.*backpack/i }).click()
        // await bike.getByRole('button', { name: /.*bike/i }).click()

        const badge = await page.locator('[data-test="shopping-cart-badge"]')
        await expect(badge).toHaveText("2")

        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await expect(badge).toHaveText("1")
    })
})