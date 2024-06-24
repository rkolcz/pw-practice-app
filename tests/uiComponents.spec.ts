import {test, expect} from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('/')
})

test.describe('Form Layauts page', () => {
    test.beforeEach( async ({page}) => {
        // Arrange
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })


    test('Should validate email input', async ({page}, testInfo) => {
        // Arrange
        const usingTheGridEmailImput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});

        // Act
        await usingTheGridEmailImput.fill('tst@tst.com')
        await usingTheGridEmailImput.clear()
        await usingTheGridEmailImput.pressSequentially('tstTwo@tst.com', {delay: 80})

        // Assert
        const imputValue = await usingTheGridEmailImput.inputValue()
        expect(imputValue).toEqual('tstTwo@tst.com')
        await expect(usingTheGridEmailImput).toHaveValue('tstTwo@tst.com')
    });


    test('Should check radio buttons', async({page}) => {
        // Arrange
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        
        // Act
        // Method 1 (getByLabel) (NOT RECOMEND)
        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        // Method 2 (getByRole) (RECOMEND)
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})

        // Assert
        // Validation of radiobutton status - Method 1
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy()
        // expect(radioStatus).toBeFalsy()

        // Validation of radiobutton status - Method 2
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        // STEP 1: Check the radio button 'Option 2'
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        // STEP 2: Verify that the radio button 'Option 1' is NOT checked
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        // STEP 3: Verify that the radio button 'Option 2' is checked
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    });
})


test('Should check all checkboxes', async({page}) => {
    // Arrange
    await page.getByTitle('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // Act
    // Manipulation of single checkboxes
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})
    await page.getByRole('checkbox', {name: "Show toast with icon"}).uncheck({force: true})

    // Assert
    // Manipulation all at once (for loop)
    const allBoxes = page.getByRole('checkbox') 
    
    for(const box of await allBoxes.all()) {
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
    for(const box of await allBoxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
});


test('Should verify list and dropdowns functionality', async ({page}) => {
    // Arrange
    const dropDownMenu = page.locator('ngx-header nb-select');
    await dropDownMenu.click();

    page.getByRole('list') // <-- Use when the list has a UL (DOM) tag
    page.getByRole('listitem') // <-- Use when the list has LI (DOM) tag

    // Act
    // Assigning the list of our options to the variable
    // const optionList = page.getByRole('list').locator('nb-option') //Method 1
    const optionList = page.locator('nb-option-list nb-option') //Method 2
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    // Assert - verify one bg color
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // Assert - verify all bg colors
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click();
    for (const color in colors) {
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
            await dropDownMenu.click();
    }
});


test('Should validate hover on one tooltip', async ({page}) => {
    // Arrange
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    // Act
    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    // Assert
    page.getByRole('tooltip') // -> If you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
});


test('Should validate tooltips for all colored buttons', async ({ page }) => {
    // Arrange
    await page.getByTitle('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
    const tooltipCards = page.locator('nb-card', { hasText: "Colored Tooltips" });

    // Act & Assert
    const allColoredTooltips = {
        "Default": "This is a tooltip",
        "Primary": "This is a tooltip",
        "Success": "This is a tooltip",
        "Danger": "This is a tooltip",
        "Info": "This is a tooltip",
        "Warning": "This is a tooltip"
    };

    for (const buttonName in allColoredTooltips) {
        const button = tooltipCards.getByRole('button', { name: buttonName });
        await button.hover();
        await page.waitForTimeout(300); //A short timeout to make the tooltip appear

        const tooltip = await page.locator('nb-tooltip').textContent();
        expect(tooltip).toEqual(allColoredTooltips[buttonName]);

        // Optionally: reset hover so tooltips don't overlap
        await page.mouse.move(0, 0);
    }
});


test('Should validate all placements tooltip ', async ({page}) => {
    // Arrange
    await page.getByTitle('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
    const tooltipModal = page.locator('nb-card', {hasText: "Tooltip Placements"});

    // Act & Assert
    const allTooltipPlacements = {
        "Top": "This is a tooltip",
        "Right": "This is a tooltip",
        "Bottom": "This is a tooltip",
        "Left": "This is a tooltip"
    };

    for (const buttonName in allTooltipPlacements) {
        const button = tooltipModal.getByRole('button', {name: buttonName}); //Shortcut to the button instance
        await button.hover();
        await page.waitForTimeout(300);
        //Unclick because the 2nd button has a tooltip that obscures the 3rd button
        await page.mouse.move(0, 0);

        const tooltip = await page.locator('nb-tooltip').textContent();
        expect(tooltip).toEqual(allTooltipPlacements[buttonName]);

        await page.mouse.move(0, 0);
    }
})


test('Should validate delete confirmation dialog for email in Smart Table', async ({page}) => {
    // Arrange
    await page.getByTitle('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Act
    // Registers an event handler for dialogs on the page, checks the message content in the dialog, and accepts the dialog.
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click();
})


test('Should manipulate web tables in Smart Table component', async({page}) => {
    // Arrange
    await page.getByTitle('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Act & Assert
    //1 get the row by any text in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //2 get the row based on the value in the specific colum
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@tst.com')
    await page.locator('.nb-checkmark').click()

    await expect(targetRowById.locator('td').nth(5)).toHaveText("test@tst.com")

    //3 test filter of the table - loop
    const ages = ["20", "30", "40", "200"]

    for(let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()

            if(age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }

    }
});


test('Should validate datepicker - manual', async({page}) => {
    // Arrange
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    const calendarImputField = page.getByPlaceholder('Form Picker')

    // Act 1
    await calendarImputField.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('14').click() //getByText('14') --> Szuka elementu, który zawiera tekst „14”. Może to być część większego tekstu (np. „14th”) lub samodzielna „14”.

    // Act 2
    await calendarImputField.click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click() //getByText('1', {exact: true}) --> Szuka elementu, który zawiera dokładnie tekst „1”. Bez żadnych dodatkowych znaków czy części tekstu.

    // Assert
    await expect(calendarImputField).toHaveValue('Jun 1, 2024')
})


test('Should validate datepicker - dynamic', async({page}) => {
    // Arrange
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    const calendarImputField = page.getByPlaceholder('Form Picker')

    // Act
    await calendarImputField.click()

    let date = new Date() //Using a JavaScript object - obtains the current date and time.
    date.setDate(date.getDate() + 31)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-Us', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-Us', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}` //Defining the final date format

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() // Fetches the current text from the interactive calendar window
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}` // Constructs the expected string containing the month and year for comparison with the calendar.
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){ // If the displayed text (month/year) does not match the expected result...
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() // Clicks the calendar navigation button to move to the next month
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() // Fetches the current text from the interactive calendar window again
    }
    
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click() 

    // Assert
    await expect(calendarImputField).toHaveValue(dateToAssert)
})


test('Should validate slider functionality', async({page}) => {
    // 1.Update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()

    // // 2. Mouse movement - in progress
    // const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempBox.scrollIntoViewIfNeeded()

    // const box = await tempBox.boundingBox()
    // const x = box.x + box.width / 2
    // const y = box.y + box.height / 2
    // await page.mouse.move(x , y)
    // await page.mouse.down()
    // await page.mouse.move(x + 100, y)
    // await page.mouse.move(x + 100, y + 100)
    // await page.mouse.up()

    // // Assert
    // await expect(tempBox).toContainText('27')
});





