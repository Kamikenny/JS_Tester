import { test, expect, Page } from "@playwright/test"


test("Lustin - Bruxelles midi", async ({ page }) => {
    await page.goto("https://www.letec.be/")
    const niquetamere = page.getByRole('button', { name: /Accepter tout/i })
    await expect(niquetamere).toBeVisible()
    await niquetamere.click()

    await expect(page).toHaveURL("https://www.letec.be/")

    const inputs = page.getByPlaceholder(/lieu, adresse, arrêt/i)

    await inputs.first().pressSequentially("Lustin", { delay: 100 })
    await expect(page.getByText(/Lustin \[SNCB\]/i)).toBeVisible()
    await page.getByText(/Lustin \[SNCB\]/i).click()

    await inputs.last().pressSequentially("Bruxelles-midi", { delay: 100 })
    await expect(page.getByText(/Bruxelles-Midi \[SNCB\]/i)).toBeVisible()
    await page.getByText(/Bruxelles-Midi \[SNCB\]/i).click()

    await page.getByRole('button', { name: /(partir maintenant)/i }).click()

    await page.getByRole('tab', { name: /arrivée/i }).click()
    await page.getByRole("textbox", { name: /heure d'arrivée/i }).click()
    await page.getByRole("textbox", { name: /heure d'arrivée/i }).pressSequentially("1700", { delay: 100 })
    // await page.getByRole("textbox", { name: /heure d'arrivée/i }).press('Tab')
    // await page.getByRole("textbox", { name: /heure d'arrivée/i }).press('Tab')
    // await page.getByRole("textbox", { name: /heure d'arrivée/i }).press('Enter')
    await page.getByRole('button', { name: /valider/i }).click()

    await expect(page.getByRole('button', { name: /(Arrivée le)/i })).toBeVisible()

    await page.getByRole('button', { name: /Calculer/i }).click()
    await page.getByRole('button', { name: /planifier mon voyage/i }).click()

    await expect(page.getByRole('heading', { name: 'Résultats de recherche' })).toBeVisible()

})