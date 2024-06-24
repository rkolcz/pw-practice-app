### Test Framework for Ngx-Admin Angular 14 Application
This test framework was created for the Ngx-Admin Angular 14 application. The application was developed by akveo.com. This is modified and more lightweight version of original application to practice UI Automation with Playwright. 

The original repo is here: https://github.com/akveo/ngx-admin
___
### Introduction to Test Framework

This framework automates and validates the UI of the Ngx-Admin application using Playwright. Built on the Page Object Model (POM) pattern, it enhances maintainability and scalability. The architecture is modular, divided into **Tests** and **Code** areas, making code management and testing easier. The `HelperBase` class avoids code duplication, increasing efficiency. The `PageManager` class centrally manages instances of all Page Objects, facilitating easy access to different application pages. Below is a detailed description of the framework's architecture and its components.

These tests were developed based on the training provided by Test Automation Engineer <a href="https://github.com/bondar-artem">Artem Bondar</a>

___
### Framework Architecture

Test framework has been carefully designed to ensure modularity and ease of code maintenance. Below is a detailed description of our project's architecture.

![alt text](framework-test-architecture.png)


#### Separation of Logic
Architecture is divided into two main areas: **Tests** and **Code**.

#### Tests Area
The tests area contains files with tests that use the Page Object Model (POM) to interact with the application pages.

- **usePageObjects.spec.ts**: This file contains tests that utilize the Page Object Model (POM) to interact with different pages of the application. It serves as an example of how to structure and use Page Objects in tests.

- **uiComponents.spec.ts**: This file contains a set of tests that validate various UI components of the application, ensuring that they function correctly and meet the specified requirements.

- **firstTest.spec.ts**: This file contains introductory tests that verify basic functionalities of the application. It is typically used as a starting point for setting up and running initial tests.

- **dragAndDropWithiFrames.spec.ts**: This file contains tests that focus on drag-and-drop functionalities, including interactions within iframes. It ensures that these complex interactions work as expected.

- **autoWaiting.spec.ts**: This file contains tests that demonstrate and verify the automatic waiting features provided by Playwright. It ensures that the application handles asynchronous operations and dynamic content loading correctly.

These test files use instances managed by the **PageManager** to interact with the application pages.

#### Code Area

The code area contains classes representing individual pages of the application and helper classes.

- **PageManager**: A class that manages instances of all Page Objects. It allows easy access to different pages of the application through centralized instance management.
  - **navigateTo()**: Method returning an instance of the `NavigationPage` class.
  - **onFormLayoutsPage()**: Method returning an instance of the `FormLayoutsPage` class.
  - **onDatepickerPage()**: Method returning an instance of the `DatepickerPage` class.

- **NavigationPage**: A class representing navigation in the application.
- **FormLayoutsPage**: A class representing the form layouts page.
- **DatepickerPage**: A class representing the date picker page.

#### HelperBase

- **HelperBase**: A base helper class that contains frequently used methods. This avoids code duplication, as methods defined in `HelperBase` can be used by all Page Object classes that inherit from it.

#### Integration

- Test files in the **Tests** area use instances managed by **PageManager** to interact with the application pages, allowing for easy and efficient testing.
- **PageManager** manages instances of the Page Object classes, providing a central place for their creation and access.
- Page Object classes can inherit from **HelperBase**, enabling the use of common methods without duplicating code.
___
### Installation Guidelines
Download the code. The easiest way to do that is to clone GitHub repository:
  ```sh
  git clone https://
  ```
After clone is completed, you need to install npm modules:
  ```sh
  cd ngx-admin && npm i
  ```
Run local copy in development mode by execute:
  ```sh
  npm start
  ```
In your browser, go to:
  ```sh
  http://localhost:4200
  ```
To run tests, make sure you have installed Playwright.
```
npm init playwright@latest
```
or
```
npm init playwright@latest --force
```

### Run tests Guidelines
###### Run all test in order
- Browser: all
- GUI: no
```
npx playwright test
```
###### Run all test at once
- Browser: all
- GUI: yes
```
npx playwright test --headed 
```
###### Run test in UI mode
```
npx playwright test --ui
```
---

need:
"@playwright/test": "^1.43.1",
"@faker-js/faker": "^8.4.1",