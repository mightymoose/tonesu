it("links to the ping page", () => {
  cy.visit("/");

  cy.findByText("Ping").click();

  cy.url().should("contain", "/ping");
});
