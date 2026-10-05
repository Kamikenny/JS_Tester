import test, { expect, Locator, Page } from "@playwright/test";

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

test.describe("Login with accepted users - positive tests", () => {
    test("login avec 'standard_user'", async ({ page }) => {
        await userConnect(page)

        await expect(page.getByText(/Products/)).toBeVisible()
    })
})

test.describe("Login with accepted users - negative tests", () => {
    test("login avec 'locked_out_user'", async ({ page }) => {
        await userConnect(page, "locked_out_user")

        await expect(page.getByText(/locked out/)).toBeVisible()

    });

    test("login avec 'problem_user'", async ({ page }) => {
        await userConnect(page, "problem_user")

        const images = await page.getByRole("main").getByRole("img").all()

        for (let img of images) {
            await expect(img).toHaveAttribute("src", "/assets/sl-404-Cq1a9k9X.jpg")
        }
    })
})
