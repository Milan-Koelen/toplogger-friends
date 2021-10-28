const email = "koelen.milan@gmail.com";
const password = "pindakaas";

context("Private routes", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Private routes test NO LOGIN", () => {
    cy.visit("localhost:3000/user");
    cy.url().should("contain", "landing");
    cy.visit("localhost:3000/search");
    cy.url().should("contain", "landing");
    cy.visit("localhost:3000/profile");
    cy.url().should("contain", "landing");
    cy.visit("localhost:3000/");
    cy.url().should("contain", "landing");
    cy.reload();
  });
});
