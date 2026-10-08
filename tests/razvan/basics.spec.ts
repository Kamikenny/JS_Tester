import { test, expect, Page } from "@playwright/test"

const url = 'https://qa-practice.razvanvancea.ro'

test('check', async ({ page }) => {
    await page.goto(url + "/checkboxes.html")
    const cases = await page.getByRole("checkbox")

    await cases.first().check()
    await cases.last().uncheck()

    await expect(cases.first()).toBeChecked()
})