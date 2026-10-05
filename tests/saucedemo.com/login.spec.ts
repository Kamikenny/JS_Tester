import test, { expect, Page } from "@playwright/test";

enum acceptedUsernames {
    standard = "standard_user",
    lockedOut = "locked_out_user",
    problem = "problem_user",
    perfGlitch = "performace_glitch_user",
    error = "error_user",
    visual = "visual_user"
}

const acceptedConnection = async (
    page: Page,
    user: acceptedUsernames = acceptedUsernames.standard,
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
        await acceptedConnection(page)

        await expect(page.getByText(/Products/)).toBeVisible()
    })
})

test.describe("Login with accpeted users - negative tests", () => {

})