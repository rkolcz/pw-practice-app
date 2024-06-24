import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"


export class DatepickerPage extends HelperBase {
    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarImputField = this.page.getByPlaceholder('Form Picker')
        await calendarImputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarImputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){ 
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    //Reduce duplicate of code
    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        // Arrange 
        // Using JS Date object to get the current date and time
        let date = new Date() 
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-Us', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-Us', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}` //Create a final date format

        // Act
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() 
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}` 
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){ 
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() 
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() 
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click() //Common locator for both calendars on the page
        return dateToAssert
    }
}