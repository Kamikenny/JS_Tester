import { test, expect, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc")
})

test("Mon premier test", async ({ page }) => {
  await expect(page).toHaveTitle(/TodoMVC/)
})

test("Remplir panier", async ({ page }) => {
  const textInput: Locator = page.getByRole('textbox', { name: /needs to be done/ })
  await textInput.fill("banane")
  await textInput.press("Enter")

  await expect(page.getByTestId('todo-title')).toHaveText(["banane"])

  const bananeCheckBox: Locator = page.getByRole('checkbox', { name: 'Toggle Todo' })
  await bananeCheckBox.click()
})

test("remplir champs 2 fois", async ({ page }) => {
  const elements: string[] = ["Banane", "Pomme", "Bonjour", "Au revoir", "Ananas"]

  const textInput: Locator = page.getByRole("textbox", { name: /needs to be done/ })

  for (const element of elements) {
    await textInput.fill(element)
    await textInput.press("Enter")
  }

  await expect(page.getByTestId('todo-title')).toHaveText(elements)
  await expect(page.getByTestId('todo-count')).toHaveText(elements.length + ' item' + (elements.length > 1 ? 's' : '') + ' left')

  const list: Locator = await page.getByRole('listitem')
  const itemList: Locator = await list.filter({ hasText: elements[1] })
  await itemList.getByRole('checkbox').click()

  await expect(page.getByTestId('todo-title')).toHaveText(elements)
  await expect(page.getByTestId('todo-count')).toHaveText(elements.length - 1 + ' item' + (elements.length - 1 > 1 ? 's' : '') + ' left')

  // const bananeCheckBox: Locator = page.getByRole('listitem').filter({ hasText: 'Banane' }).getByLabel('Toggle Todo')
  // const bananeDeleteBtn: Locator = page.getByRole('listitem').filter({ hasText: 'Banane' }).getByRole('button', { name: 'Delete' })

  // await bananeCheckBox.click()
  // await expect(page.getByTestId('todo-count')).toHaveText(/1 item left/)

  // await bananeDeleteBtn.click()
  // await expect(page.getByTestId('todo-title')).toHaveText(["Pomme"])
})