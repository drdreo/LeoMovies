describe("Search Form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("it focuses the input", () => {
        cy.focused();
    });


    it("searches for 'fast' ", () => {

        // enter a search query
        cy.get(".search__input")
          .type("fast")
          .type("{enter}");

        // this is not good, but works
        cy.wait(500);

        // check for data in table
        cy.get(".movie").its("length").should("be.gt", 1);
    });

    it("redirects to movie details", () => {

        // enter a search query
        cy.get(".search__input")
          .type("fast")
          .type("{enter}");

        // this is not good, but works
        cy.wait(500);

        // check if it redirects to details
        cy.get("a").contains("Go Fast").click();
        cy.location("pathname").should("contain", "/movie/");

    });

    it("should add favorite in local storage", () => {

        // enter a search query
        cy.get(".search__input")
          .type("fast")
          .type("{enter}");

        // this is not good, but works
        cy.wait(500);

        cy.get(".movie__menu").first().click().should(() => {
            cy.wait(50);
            cy.get("[data-test-id='add-fav-btn']").click().should(() => {
                expect(localStorage.getItem("favorites").length).to.be.gt(1);
            });
        });
    });
    it("should add watch later movie in local storage", () => {

        // enter a search query
        cy.get(".search__input")
          .type("fast")
          .type("{enter}");

        // this is not good, but works
        cy.wait(500);

        cy.get(".movie__menu").first().click().should(() => {
            cy.wait(50);
            cy.get("[data-test-id='add-later-btn']").click().should(() => {
                expect(localStorage.getItem("later").length).to.be.gt(1);
            });
        });
    });

});
