const email = "koelen.milan@gmail.com";
const pass = "pindakaas";

context("Login UI", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Login and out through UI", () => {
    cy.wait(500);
    cy.visit("localhost:3000/login").get("#loginContainer");
    cy.contains("Login").should("be.visible").click();
    cy.wait(500);

    // Login

    cy.contains("Login").should("be.visible");
    cy.get("#-basic").should("be.visible").type(email);
    cy.get("#outlined-basic").should("be.visible").type(pass);
    cy.get("Button[id='loginBtn']").should("be.visible").click();

    cy.wait(500);

    cy.get('[data-cy="logoutButton"]').should("be.visible").click();
    cy.get('li[id="logoutButton"]').click();
  });
});
