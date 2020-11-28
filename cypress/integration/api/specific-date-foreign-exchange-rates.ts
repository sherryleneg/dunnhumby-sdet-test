describe("Specific Date Foreign Exchange Rates", () => {
  const pastDate = "2020-10-30";
  const ratesApiBaseUrl = `https://api.ratesapi.io/api/${pastDate}`;
  const baseCurrencyUSD = "USD";
  const symbols = "USD,GBP";

  describe("Specific date foreign exchange rates with symbols", () => {
    it("should return USD and GBP rates for a past date against the default base rate EUR", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          symbols: symbols,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", "EUR");
        expect(response.body).to.have.property("date", pastDate);
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("GBP");
        expect(response.body)
          .to.have.property("rates")
          .to.have.deep.property("USD");
      });
    });
  });

  describe("Specific date foreign exchange rates with base", () => {
    it("should return rates against base rate USD for a past date", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          base: baseCurrencyUSD,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", "USD");
        expect(response.body).to.have.property("date", pastDate);
      });
    });
  });

  describe("Specific date foreign exchange rates with base and symbols", () => {
    it("should return rates against base rate USD for a past date", () => {
      cy.request({
        url: ratesApiBaseUrl,
        qs: {
          base: baseCurrencyUSD,
          symbols: symbols,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("base", "USD");
        expect(response.body).to.have.property("date", pastDate);
      });
    });
  });
});
