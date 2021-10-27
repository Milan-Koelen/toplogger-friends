// <reference types="cypress" />;

context("End 2 End Test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Load page", () => {
    cy.reload();
  });

  it("Load and Login", () => {
    cy.wait(500);

    cy.contains("Log In").should("be.visible").click();
    cy.wait(500);

    // Login page
    cy.get("#profileMenu").should("not.exist");
    cy.contains("Login").should("be.visible");
    cy.get("#-basic").should("be.visible").type("koelen.milan@gmail.com");
    cy.get("#outlined-basic").should("be.visible").type("pindakaas");
    cy.get(".makeStyles-buttonBox-14 > .MuiButton-root")
      .should("be.visible")
      .click();
    cy.wait(500);
  });
  // it("Login and dashboard load", () => {
  //   // Landing page
  //   cy.wait(500);

  //   cy.contains("Log In").should("be.visible").click();
  //   cy.wait(500);

  //   // Login page
  //   cy.get("#profileMenu").should("not.exist");
  //   cy.contains("Login").should("be.visible");
  //   cy.get("#-basic").should("be.visible").type("koelen.milan@gmail.com");
  //   cy.get("#outlined-basic").should("be.visible").type("pindakaas");
  //   cy.get(".makeStyles-buttonBox-14 > .MuiButton-root")
  //     .should("be.visible")
  //     .click();
  //   cy.wait(500);

  //   // Dashboard
  //   cy.get("#profileMenu").should("be.visible");
  //   cy.get(".MuiBottomNavigation-root > :nth-child(2)")
  //     .should("be.visible")
  //     .click();
  //   // Leaderboard
  //   cy.get(".MuiPaper-root > .MuiTypography-root").should("be.visible");
  //   cy.wait(500);

  //   // Search
  //   cy.get("#profileMenu").should("be.visible");
  //   cy.get(".MuiBottomNavigation-root > :nth-child(3)")
  //     .should("be.visible")
  //     .click();
  //   // Search Results - perform search Nick Remijn
  //   cy.get("#searchField").should("be.visible").type("Nick Remijn {enter}");
  //   cy.get(".MuiListItemAvatar-root > .MuiAvatar-root").should("be.visible");
  //   cy.wait(500);
  //   // Search Results - perform search Charlotte
  //   cy.get("#searchField")
  //     .should("be.visible")
  //     .type("{selectall}{backspace}Charlotte {enter}");
  //   cy.get(".MuiListItemAvatar-root > .MuiAvatar-root").should("be.visible");
  //   cy.wait(500);
  //   // Search Results - perform search Stijn
  //   cy.get("#searchField")
  //     .should("be.visible")
  //     .type("{selectall}{backspace}Stijn {enter}");
  //   cy.get(".MuiListItemAvatar-root > .MuiAvatar-root").should("be.visible");
  //   cy.wait(500);
  //   // Search Results - perform search Willem
  //   cy.get("#searchField")
  //     .should("be.visible")
  //     .type("{selectall}{backspace}Willem {enter}");
  //   cy.get(".MuiListItemAvatar-root > .MuiAvatar-root").should("be.visible");
  //   cy.wait(500);
  //   cy.get(".MuiBottomNavigation-root > :nth-child(1)")
  //     .should("be.visible")
  //     .click();
  //   cy.wait(500);

  //   cy.get("#profileMenu").should("be.visible").click();
  //   cy.get('.MuiList-root > [tabindex="-1"]').click();
  // });
});
// });
