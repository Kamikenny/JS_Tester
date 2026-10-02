import { test, expect, Locator } from '@playwright/test';

test("Mon premier test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc")

  await expect(page).toHaveTitle(/TodoMVC/)
})

test("Remplir panier", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc")

  const textInput: Locator = await page.getByRole('textbox', { name: /needs to be done/ })
  await textInput.fill("banane")
  await textInput.press("Enter")

  await expect(page.getByTestId('todo-title')).toHaveText(["banane"])

  const bananeCheckBox: Locator = await page.getByRole('checkbox', { name: 'Toggle Todo' })
  await bananeCheckBox.click()
})

test("remplir champs 2 fois", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc")

  const textInput: Locator = page.getByRole("textbox", { name: /needs to be done/ })

  await textInput.fill("Banane")
  await textInput.press("Enter")

  await textInput.fill("Pomme")
  await textInput.press("Enter")

  await expect(page.getByTestId('todo-count')).toHaveText(/2 items left/)

  const bananeCheckBox: Locator = page.getByRole('listitem').filter({ hasText: 'Banane' }).getByLabel('Toggle Todo')

  await bananeCheckBox.click()
  await expect(page.getByTestId('todo-count')).toHaveText(/1 item left/)
})