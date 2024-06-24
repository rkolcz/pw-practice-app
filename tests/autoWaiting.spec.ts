import {test, expect} from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('http://www.uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

// IMPORTANT: To ensure the test runs correctly, make sure that the timeout in playwright.config.ts is set to above 20 seconds.

/* PRACTICE NOTE: The concept of automatic waiting in Playwright allows for automatically waiting for specific conditions of elements on the page, 
such as being visible or stable, which helps in writing reliable and resilient tests, reducing their flakiness.
Use AutoWaiting for methods that do not have automatic waiting implemented, like 'allTextContents()' */

test('Auto waiting in Playwright', async ({page}) => {
    const successButton = page.locator('.bg-success')

    // Method 1: Playwright automatically waits for the element to be ready to click (default auto-wait capabilities)
    await successButton.click()

    // Method 2: Retrieve the text from the button after clicking using 'textContent()' (default auto-wait capabilities)
    const text = await successButton.textContent()
    
    // Assert
    expect(text).toEqual('Data loaded with AJAX get request.')


    /* PRACTICE NOTE: This method does not have the auto-wait feature implemented. */

    //// OPTIONAL: Method 3: Wait for the button to be in the "attached" state (attached to the DOM).
    // await successButton.waitFor({state: "attached"})
    
    //// OPTIONAL: Retrieve all text contents from the element.
    // const text = await successButton.allTextContents()

    // Assert
    // expect(text).toContain('Data loaded with AJAX get request.')

    //// OPTIONAL: Method 4: Overriding the timeout of the assertion
    // await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})
