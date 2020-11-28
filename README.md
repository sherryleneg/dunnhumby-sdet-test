# dunnhumby-sdet-test

## Introduction
This test repository contains tests for the Exchange Rates API(http://ratesapi.io/documentation/) and UI tests for the Snipcart shopping cart app (https://snipcart.com/). 

## Running the tests locally
You can run the code base using an IDE like Visual Studio Code.

To run these tests on your machine you will need to open the command line and make sure you are in the project directory(dunnhumby-sdet-test)

The tests will run headless on Chrome browser by default.

### Running the API tests

Type ```npm run cy:api```

### Running the UI tests

Type ```npm run cy:ui```

### Running all tests

Type ```npm run cy:all```

Optional:
You can also run eslint and prettier using these commands:

eslint - ```npm run cy:lint```

prettier - ```npm run cy:format```

## Issues identified

### UI Tests
The main issue with Scenario 2 in the UI tests was loading the iframe to view the cart contents. Cypress has difficulty loading and interacting with cross-origin iframes. (https://docs.cypress.io/guides/guides/web-security.html#Cross-origin-iframes). 

Several attempts were made to find a workaround for the issue:

- Setting chromeWebSecurity flag to false in cypress.json (https://docs.cypress.io/guides/guides/web-security.html#Disabling-Web-Security)

- Installing a cypress-iframe plugin (https://www.npmjs.com/package/cypress-iframe)

- Force clicking the buyButton, although this was a tentative fix. According to the Cypress docs, the click() action will fail the test case if it links to a different super domain (https://docs.cypress.io/guides/guides/web-security.html#Examples-of-test-cases-that-will-error-due-to-superdomain-limitations) 

- Researching mocking mechanisms for iframes (https://github.com/cypress-io/cypress/issues/2014)

Cypress have an ongoing issue open to hopefully resolve it: https://github.com/cypress-io/cypress/issues/136

## API Tests

The date assertion for the API tests will fail when the latest exchange rate tests are run during the weekend. This is because the exchange rate for the Rates API seem to be updated only from Monday - Friday. I believe this is a limitation of the Rates API and I decided not to overcomplicate the date logic.

## Assumptions

- API requests in the tests do not require authentication


## Future improvements

 - Use of Docker to containerise the tests
 
 - Use of fixture files to pass on data to API tests
 
 - Create two separate cypress.json files for the UI and API tests
 
 - Tagging the tests with test tags
 
 - Use a BDD framework (for example cucumber.js)
 
 ## Comments
 
I decided to make some practical decisions wherever possible. I am aware that the project could be improved, however I decided to time box myself whenever I encountered an issue and made some priority calls. The API tests were fairly straightforward but the UI tests presented some challenges. I have left comments on the UI tests because I felt they needed to be explained in detail.
 
 
 
