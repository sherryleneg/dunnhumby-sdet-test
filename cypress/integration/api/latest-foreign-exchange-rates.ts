describe("Latest Foreign Exchange Rates", () => {
  const ratesApiBaseUrl = "https://api.ratesapi.io/api/latest";
  const todaysDate = Cypress.moment().format("YYYY-MM-DD");
  const baseCurrencyUSD = "USD";
  const baseCurrencyEUR = "EUR";
  const symbols = "AUD,GBP";

  describe("Latest foreign exchange rates with symbols", () => {
    it("should return today's AUD and GBP rates against the default base rate EUR", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          symbols: symbols,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", baseCurrencyEUR);
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("AUD");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("GBP");

        //I believe these rates are updated at a specific time during the day hence
        //this assertion won't always pass. For example: I ran the tests this morning
        // at 9am and it was sending back data from last Friday.
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
        expect(response.body).to.have.property("base", baseCurrencyUSD);

        //I believe these rates are updated at a specific time during the day hence
        //this assertion won't always pass. For example: I ran the tests this morning
        // at 9am and it was sending back data from last Friday.
        expect(response.body).to.have.property("date", todaysDate);
      });
    });
  });

  describe("Latest foreign exchange rates with base and symbols", () => {
    it("should return today's rates for GBP and AUD against base rate USD", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          base: baseCurrencyUSD,
          symbols: symbols,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", baseCurrencyUSD);
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("AUD");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("GBP");

        //I believe these rates are updated at a specific time during the day hence
        //this assertion won't always pass. For example: I ran the tests this morning
        // at 9am and it was sending back data from last Friday.
        expect(response.body).to.have.property("date", todaysDate);
      });
    });
  });
});
