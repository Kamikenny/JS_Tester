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


test('test', async ({ page }) => {
    // Correction à faire plus tard : 
    // Récupérer la liste des articles et boucler dessus
    // Récupérer le titre de l'article dans une variable, cliquer sur l'img, et expect le titre de l'article
    await page.goto("https://saucedemo.com/")
    await userConnect(page)

    const keywords: RegExp[] = [/(backpack)/i, /(bike)/i, /(bolt)/i, /(fleece)/i, /(onesie)/i, /(red)/i]

    for (const key of keywords) {
        await page.getByAltText(key).click()
        await expect(page.getByTestId("inventory-item-name")).toHaveText(key)
        await page.getByTestId("back-to-products").click()
    }
});