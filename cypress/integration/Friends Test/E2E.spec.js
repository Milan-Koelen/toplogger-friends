// <reference types="cypress" />;

context("End 2 End Test", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Landing Page & Private routes test", () => {
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

  it("Login and out through UI", () => {
    cy.wait(500);

    cy.contains("Log In").should("be.visible").click();
    cy.wait(500);

    // Login

    cy.contains("Login").should("be.visible");
    cy.get("#-basic").should("be.visible").type("koelen.milan@gmail.com");
    cy.get("#outlined-basic").should("be.visible").type("pindakaas");
    cy.get(".makeStyles-buttonBox-14 > .MuiButton-root")
      .should("be.visible")
      .click();
    cy.wait(500);
    cy.get(".MuiBottomNavigation-root > :nth-child(1)")
      .should("be.visible")
      .click();
    cy.wait(500);

    cy.get("#profileMenu").should("be.visible").click();
    cy.get('.MuiList-root > [tabindex="-1"]').click();
  });

  const email = "koelen.milan@gmail.com";
  const password = "pindakaas";

  // it("Login witouth UI", () => {
  //   cy.request("POST", "https://api.friends.milankoelen.nl/signin", {
  //     email: email,
  //     password: password,
  //   });
  //   // dashboard
  //   cy.request("localhost:3000/");
  //   // Search
  //   cy.visit("localhost:3000/search");
  //   cy.url().should("include", "/search");
  //   cy.wait(500);
  // });

  // it("Search results", () => {
  //   cy.request("POST", "85.145.226.121:7000/signin", {
  //     email: email,
  //     password: password,
  //   });
  //   // dashboard
  //   cy.request("localhost:3000/");
  //   // Search
  //   cy.request("localhost:3000/search");
  //   cy.wait(500);
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
  // });

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
