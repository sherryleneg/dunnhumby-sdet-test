describe("Latest Foreign Exchange Rates", () => {
  const ratesApiBaseUrl = "https://api.ratesapi.io/api/latest";
  const todaysDate = Cypress.moment().format("YYYY-MM-DD");
  const baseCurrencyUSD = "USD";
  const symbols = "USD,GBP";

  describe("Latest foreign exchange rates with symbols", () => {
    it("should return today's USD and GBP rates against the default base rate EUR", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          symbols: symbols,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", "EUR");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("USD");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("GBP");
        expect(response.body).to.have.property("date", todaysDate);
      });
    });
  });

  describe("Latest foreign exchange rates with base", () => {
    it("should return today's rates against base rate USD", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          base: baseCurrencyUSD,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", "USD");
        expect(response.body).to.have.property("date", todaysDate);
      });
    });
  });

  describe("Latest foreign exchange rates with base and symbols", () => {
    it("should return today's rates against base rate USD", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          base: baseCurrencyUSD,
          symbols: symbols,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", "USD");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("USD");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("GBP");
        expect(response.body).to.have.property("date", todaysDate);
      });
    });
  });
});
