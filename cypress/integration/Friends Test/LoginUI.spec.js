const email = "koelen.milan@gmail.com";
const pass = "pindakaas";

context("Login UI", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Login and out through UI", () => {
    cy.wait(500);
    cy.visit("localhost:3000/login").get('[data-cy="loginContainer"]');
    cy.contains("Login").should("be.visible").click();
    cy.wait(500);

    // Login
    cy.get('[data-cy="loginContainer"]').should("be.visible");
    cy.get('[data-cy="emailField"]').should("be.visible").type(email);
    cy.get('[data-cy="passField"]').should("be.visible").type(pass);
    cy.get('[data-cy="loginBtn"]').click();

    cy.wait(500);

    cy.get('[aria-label="account of current user"]').click();
    cy.get('[data-cy="logoutButton"]').click();
  });
});
