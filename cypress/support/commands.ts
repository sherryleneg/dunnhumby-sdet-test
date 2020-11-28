// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//We need to specify the type of function since we are using typescript.
/* eslint-disable */
declare namespace Cypress {
  interface Chainable {
    fillInCheckoutForm(): Chainable<Element>;
  }
}

/*This is an example of how I would have reused this method across the project. Since it is defined in commands.ts
it can be called from different tests. I also used a fixtures file to pass on the checkout data without needing to
hardcode it.*/
Cypress.Commands.add("fillInCheckoutForm", () => {
  cy.fixture("snipcartTestData.json").then((checkoutData) => {
    cy.get('id="snip-name"]').type(checkoutData.name);
    cy.get('[id="snip-address1"]').type(checkoutData.address);
    cy.get('[id="snip-city"]').type(checkoutData.city);
    cy.get('[id="snip-country"]').select(checkoutData.country);
    cy.get('[id="snip-postalCode"]').type(checkoutData.postCode);
    cy.get('[id="snip-email"]').type(checkoutData.email);
  });
});
