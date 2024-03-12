/// <reference types="cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173/');
    // verify about navigation
    cy.get('[data-cy="header-about-link"]').click();
    cy.location('pathname').should('eq', '/about');
    // verify home navigation from back button
    cy.go('back');
    cy.location('pathname').should('eq', '/');
    // verify home navigation from home link
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location('pathname').should('eq', '/');
  });
});
