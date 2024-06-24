import {test, expect} from '@playwright/test'

test.beforeEach( async ({page}) => {
    await page.goto('/')
    // await page.waitForTimeout(1000)
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    
});


test('input fields @smoke', async ({page}) => {
    const usingTheGridEmailImput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});

    await usingTheGridEmailImput.fill('tst@tst.com')
    await usingTheGridEmailImput.clear()
    await usingTheGridEmailImput.pressSequentially('tstTwo@tst.com', {delay: 80})

    // Assert: generic assertion
    const imputValue = await usingTheGridEmailImput.inputValue()
    expect (imputValue).toEqual('tstTwo@tst.com')

    // Assert: locator assertion
    await expect(usingTheGridEmailImput).toHaveValue('tstTwo@tst.com')
});


test.describe('Should have a test suite @smoke', () => {
    test.beforeEach('Should run before each test', async ({ page }) => {
        await page.goto('/')
        await page.waitForTimeout(1000)
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    });

    test('Should have a Form Layouts title', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });

    test('Should have a Datepicker title', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
});


test.skip('Locator syntax rules in Playwright', async ({page}) => {
    //by Tag name
    page.locator('input').first().click()
    //by Id
    page.locator('#inputEmail1')
    //by Class value
    page.locator('.shape-rectangle')
    //by attribute
    page.locator('[placeholder="Email"]')
    //by Class value (full)
    page.locator('[class="input-full-width size-medium shape-rectangle"]')
    //combine different selectors (tag + attribute + attribute + class)
    page.locator('input[placeholder="Email"][nbinput].shape-rectangle')
    //by XPath (NOT RECOMMENDED IN PLAYWRIGHT)
    page.locator('//*[@id="inputEmail1"]')
    //by partial text match (cząskowy tekst)
    page.locator(':text("Using")')
    //by exact text match  (całość tekstu)
    page.locator(':text-is("Using the Grid")')
});


test('User facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click()
    await page.getByTitle('IoT Dashboard').click()
});


test('lacating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text("Option 1")').click(); //oddzielone spacja
    await page.locator('nb-card').locator('nb-radio').locator(':text("Option 2")').click();
    //Chaining method (łączenie metod)
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

    //nth - index (BAD PRACTICE)
    await page.locator('nb-card').nth(3).getByRole('button').click()
});


test('locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger') }).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
});


test('Reusing the locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passField = basicForm.getByRole('textbox', {name: "Password"})

    await emailField.fill('test@ts.com')
    await passField.fill('tstpass123')
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button', {name: /submit/i }).click();

    //Assert
    await expect(emailField).toHaveValue('test@ts.com')
    await expect(passField).toHaveValue('tstpass123')
});


test('extracting values', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})

    //single test value - textContent() - pobierania tekstu z danego obiektu i przypisywanie go do zmiennej
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values (pobieramy kazdą wartośc z kazdego elementu i wsadazmy w array następnie sprawdzamy czy zawiera "option 1")
    //allTextContents() -> służy do wydobycia wszystkich treści tekstowych z dokumentu HTML. Funkcja rekurencyjnie przechodzi przez wszystkie węzły potomne podanego elementu, gromadząc treść tekstową. Pomija tagi skryptów i styli, aby uniknąć dołączania ich zawartości. Na końcu zwraca wszystkie zebrane treści tekstowe.
    const allRadioButtonsLabels =  await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //imput value (w nie wszystkich polach jest tekst, wtedy uzywamy metody inputValue()) (np. Email tu nie jest tekstem)
    const emailField2 = basicForm.getByRole('textbox', {name: "Email"})
    await emailField2.fill('test@ts.com')
    const emailValue = await emailField2.inputValue()
    expect(emailValue).toEqual('test@ts.com')

    // pozyskanie kadego atrybutu .getAttribute()
    const placeholderValue = await emailField2.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})


test('Assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button');

    // Assert 
    const value = 5
    expect(value).toBeLessThan(6)

    const text = await basicFormButton.textContent();
    expect(text).toEqual('Submit')
});

/* 
Assert: Generic assertion (asercje ogólne)
Refers to universal conditions used to validate various UI elements or data without specifying detailed context or element specifics.

toBe - sprawdza, czy wartość jest równa oczekiwanej. Odpowiedni do porównywania wartości prymitywnych, takich jak liczby, ciągi znaków i wartości logiczne.
toEqual - sprawdza, czy wartość jest głęboko równa oczekiwanej. Odpowiedni do porównywania obiektów i tablic.
toBeGreaterThan - sprawdza, czy wartość jest większa niż oczekiwana.
toBeLessThan - sprawdza, czy wartość jest mniejsza niż oczekiwana.
toBeTruthy - sprawdza, czy wartość jest prawdziwa.
toBeFalsy - sprawdza, czy wartość jest fałszywa. 

/*
Assert: locator assertion
await expect(basicFormButton).toHaveText('Submit') 
Asercje dla lokalizatorów: Te asercje są specyficzne dla Playwright i służą do sprawdzania różnych stanów elementów na stronie.

toHaveText - sprawdza, czy element ma określony tekst.
toBeVisible - sprawdza, czy element jest widoczny.
toBeHidden - sprawdza, czy element jest ukryty.
toBeEnabled - sprawdza, czy element jest włączony.
toBeDisabled - sprawdza, czy element jest wyłączony.
toBeChecked - sprawdza, czy pole wyboru jest zaznaczone.
toBeEditable - sprawdza, czy element jest edytowalny.
toHaveAttribute - sprawdza, czy element ma określoną atrybut.
toHaveClass - sprawdza, czy element ma określoną klasę CSS.
toHaveCount - sprawdza, czy lokalizator znajduje określoną liczbę elementów.
toHaveCSS - sprawdza, czy element ma określoną wartość CSS.
toHaveId - sprawdza, czy element ma określone ID. 

/*
Assert: soft assertion
W razie wykrycia błędu test będzie kontynułowany (NOT good practice - mogą maskować problemy w testach)

await expect.soft(basicFormButton).toHaveText('Submitk')
await basicFormButton.click() 
*/