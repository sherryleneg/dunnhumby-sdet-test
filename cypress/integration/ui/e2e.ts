describe("E2E tests", () => {
  /* eslint-disable */
  const colours = require("../../fixtures/colours.json");
  const shippingCountries = require("../../fixtures/shippingCountries.json");
  const shippingPrices = require("../../fixtures/shippingPrices.json");

  beforeEach(() => {
    cy.visit("https://snipcart-react-gatsby.netlify.app/");
    cy.get('a[href="/bow-ties/"]').click();
  });

  describe("Scenario 1", () => {
    it("should verify the dropdown options, buy button and the relative url ", () => {
      //verify dropdown options
      colours.forEach((element: string) => {
        //logging values passed on from fixture file
        cy.log(element.toString());
        cy.get('[id="Color"] option').should("contain", element);
      });

      //verify buy for button is visible
      cy.get('[id="buyButton"]').should("be.visible");
      //verify buy for button is black
      cy.get('[id="buyButton"]').should(
        "have.css",
        "background-color",
        "rgb(33, 33, 33)"
      );

      //verify the relative url contains the correct product name
      cy.url().should("contain", "bow-ties");
    });
  });

  /*This is where I encountered difficulties. Upon clicking the buy button, the iframe which loads the cart is blocked because
    of CORS policy. Cypress is not able to load or interact with the iframe. I spent a few good hours trying to debug this but I couldn't get it to work. 
    he rest of the code I've added is untested but I wanted to show how I would go about the other parts of the journey.
    I would have used fixtures files here to remove hardcoding of data but was unable to test most of this code.*/
  describe("Scenario 2", () =>
    it("should verify the checkout journey", () => {
      cy.get("a#buyButton.snipcart-add-item.buyBtn").click();

      //CART SHOULD LOAD IFRAME HERE!!

      //since we only have one product in the cart,I've decided not to overcomplicate the locator logic
      //verify checkout button colour
      cy.get('[id="snipcart_custom_Color"]')
        .parent()
        .invoke("value")
        .should("eq", "Blue Red");
      //verify checkout button colour
      cy.get('[data-bind="unitPrice"]')
        .parent()
        .find('[data-bind-method="formatMoney"]')
        .should("contain", "7.00");

      //increase the quantity of the item
      cy.get(
        '[class="snip-quantity-trigger__btn snip-quantity-trigger__btn--add"]'
      ).click();
      //assert total price
      cy.get('[data-bind="unitPrice"]')
        .parent()
        .find('[data-bind-method="formatMoney"]')
        .should("contain", "14.00");

      //verify remove product (x) colour
      cy.get('[class="snip-product__remove snip-ico snip-ico--close"]').should(
        "have.css",
        "color",
        "#f10"
      );

      //click on next step
      cy.get(
        '[class="js-next snip-btn snip-btn--highlight snip-btn--right"]'
      ).click();

      //verify subtotal
      cy.get('[id="snipcart-header-total"]').should("have.text", "14.00");
      //verify guest checkout container exists
      cy.get('[id="snipcart-guest-checkout-container"]').should("exist");
      //verify login container exists
      cy.get('[id="snipcart-login-form-container"]').should("exist");
      //verify new account container
      cy.get("[id=snipcart-newaccount-form-container]").should("exist");
      //verify checkout button colour
      cy.get('id="snipcart-guest-checkout"').should(
        "have.css",
        "background",
        "#efe778"
      );
      //verify relative url contains login
      cy.url().contains("login");

      //click on checkout button
      cy.get("[id=snipcart-newaccount-form-container]").click();
      //fill in form
      cy.fillInCheckoutForm();

      //click on next
      cy.get(
        '[class="js-next snip-btn snip-btn--highlight snip-btn--right"]'
      ).click();

      //verify shipping methods
      shippingCountries.forEach((element: string) => {
        cy.get('[id=id="snipcart-shippings-list"]').contains(element);
      });

      //verify shipping prices
      shippingPrices.forEach((element: string) => {
        cy.get('[id=id="snipcart-shippings-list"]').contains(element);
      });

      //click on next
      cy.get(
        '[class="js-next snip-btn snip-btn--highlight snip-btn--right"]'
      ).click();

      /*There were a few steps left for verification before the checkout process is successful, however
          due to time limitations I didn't manage to finish them. I also couldn't test them.*/
    }));
});
