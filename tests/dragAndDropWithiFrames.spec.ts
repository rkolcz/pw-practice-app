import {test, expect} from '@playwright/test'

test('drag & drop with iframes in Playwright', async({page}) => {
    // Arrange
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    await page.locator('.fc-dialog-container').getByRole('button', {name: "Consent"}).click()
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    
    // Act
    // First case
    await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

    // Second case (More precise control)
    await frame.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up

    // //Assert - in progress
    // await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]) 
});