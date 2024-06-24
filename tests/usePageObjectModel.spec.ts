import { test, expect } from '@playwright/test' 
import { PageManager } from '../Page-object/pageManager' 
import { faker } from '@faker-js/faker'


test.beforeEach(async ({ page }) => { 
    await page.goto('/') 
})

test('navigate to form page ', async ({ page }) => {
    // Arrange
    const pm = new PageManager(page) 
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    // Arrange
    const pm = new PageManager(page) 
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@tst.com`

    // Act
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGrigdFormWithCredentialsAndSelectOption('process', 'passt4$', 'Option 1')
    // await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    await pm.onFormLayoutsPage().sumbitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    // await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(17)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(17, 20)
});
