describe("Movie Details", () => {
    beforeEach(() => {
        cy.visit("/movie/15942");
    });

    it("renders overview", () => {
        // enter a search query
        cy.get(".movie-details__overview")
          .should("contain.text", "Marek, a crime");
    });
});
