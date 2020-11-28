# dunnhumby-sdet-test

## Introduction
This test repository contains tests for the Exchange Rates API(http://ratesapi.io/documentation/) and UI tests for Snipcart shopping cart platform (https://snipcart.com/). 

## Running the tests locally
You can run the code base using an IDE like Visual Studio Code.

To run these tests on your machine you will need to open the command line and make sure you're in the project directory(dunnhumby-sdet-test)

The tests will run on Chrome browser headless by default.

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

## UI Tests
The main issue with Scenario 2 in the UI tests was loading the iframe to view the cart contents. Cypress has difficulty loading and interacting with cross-origin iframes. (https://docs.cypress.io/guides/guides/web-security.html#Cross-origin-iframes). 

Several attempts were made to find a workaround for the issue:

- Setting chromeWebSecurity flag to false in cypress.json (https://docs.cypress.io/guides/guides/web-security.html#Disabling-Web-Security)

- Installing a cypress-iframe plugin (https://www.npmjs.com/package/cypress-iframe)

- Force clicking the buyButton, although this was a tentative fix. According to the Cypress docs, the click() action will fail the test case if it links to a different super domain (https://docs.cypress.io/guides/guides/web-security.html#Examples-of-test-cases-that-will-error-due-to-superdomain-limitations) 

- Researching mocking mechanisms for iframes (https://github.com/cypress-io/cypress/issues/2014)

## Assumptions

- API requests in the tests do not require authentication

## Future improvements

 - Use of Docker to containerize the tests
 
 - Use of fixture files to pass on data to API tests
 
 - Tagging the tests with test tags
 
 - Use a BDD framework (for example cucumber.js)
 
 
 
