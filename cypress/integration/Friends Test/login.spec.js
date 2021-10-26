/// <reference types="cypress" />

context("Login Test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("cy.go() - Login and dashboard load", () => {
    // https://on.cypress.io/go

    cy.visit("localhost:3000", {
      auth: {
        username: "koelen.milan@gmail.com",
        password: "pindakaas",
      },
    });
    cy.get(".makeStyles-buttonBox-10 > :nth-child(1)").click();
    cy.get("#-basic").type("koelen.milan@gmail.com");
    cy.get("#outlined-basic").type("pindakaas");
    cy.get(".makeStyles-buttonBox-14 > .MuiButton-root").click();
  });

  // it("cy.reload() - reload the page", () => {
  //   cy.reload();
  //   cy.reload(true);
  // });
});
