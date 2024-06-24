import { Locator, Page } from '@playwright/test'

export class NavigationPage { 
    readonly page: Page 
    readonly formLayoutsManuItem: Locator
    readonly datepickerPageManuItem: Locator
    readonly smartTablePageManuItem: Locator
    readonly toastrPageManuItem: Locator
    readonly tooltipPageManuItem: Locator

    constructor(page: Page) { 
        this.page = page 
        this.formLayoutsManuItem = page.getByText('Form Layouts')
        this.datepickerPageManuItem = page.getByText('Datepicker')
        this.smartTablePageManuItem = page.getByText('Smart Table')
        this.toastrPageManuItem = page.getByText('Toastr')
        this.tooltipPageManuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() { 
        await this.selectGoupMenuItem('Forms') //await this.page.getByText('Forms').click() 
        await this.formLayoutsManuItem.click() 
    }

    
    async datepickerPage() { 
        await this.selectGoupMenuItem('Forms') 
        await this.datepickerPageManuItem.click() 
    }

    async smartTablePage() { 
        await this.selectGoupMenuItem('Tables & Data')
        await this.smartTablePageManuItem.click();
    }

    async toastrPage() { 
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.toastrPageManuItem.click();
    }

    async tooltipPage() { 
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.tooltipPageManuItem.click();
    }

    private async selectGoupMenuItem(groupItemTitle: string) { // Definiuje prywatną asynchroniczną metodę o nazwie 'selectGoupMenuItem', która przyjmuje jeden argument 'groupItemTitle' typu string. Metoda jest prywatna, więc może być używana tylko wewnątrz klasy.
        const groupMenuItem = this.page.getByTitle(groupItemTitle) // Znajduje element menu na stronie na podstawie jego tytułu (atrybut 'title') i przypisuje go do zmiennej 'groupMenuItem'.
        const expandedState = await groupMenuItem.getAttribute('aria-expanded') // Pobiera atrybut 'aria-expanded' z elementu 'groupMenuItem', który wskazuje, czy element jest rozwinięty ('true') czy zwinięty ('false').
        if (expandedState == "false") // Sprawdza, czy atrybut 'aria-expanded' jest ustawiony na 'false', co oznacza, że element jest zwinięty.
            await groupMenuItem.click() // Jeśli element jest zwinięty, wykonuje kliknięcie na 'groupMenuItem', aby go rozwinąć.
    }
}


