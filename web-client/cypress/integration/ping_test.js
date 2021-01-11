it("successfully pings the backend", () => {
  cy.visit("/ping");

  cy.findByText("The ping endpoint is responding as expected.").should(
    "be.visible"
  );
});
