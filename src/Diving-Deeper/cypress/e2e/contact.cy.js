/// <reference types="cypress" />

describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should submit contact form', () => {
    // setup
    cy.getById('contact-input-message').type('Hello, World!');
    cy.getById('contact-input-name').type('John Doe');
    // cy.get('[data-cy="contact-input-email"]').type('test@example.com');
    // pre-validate the button

    // preferred method of validation
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');

    // alternative to directly access the button for validation
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr('disabled')).to.be.undefined;
      expect(el.text()).to.equal('Send Message');
    });

    // interact
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
    // simulate keyboard enter instead of clicking the button
    // cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}');
    // cy.screenshot();

    // cy.get('@submitBtn').click();

    // verify expectations
    cy.submitForm();
    cy.get('@submitBtn').contains('Sending...').should('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    // cy.visit('http://localhost:5173/about');
    // validate no form submission on empty form
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // better to validate the button state does not change with empty form submission
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });

    // not good to validate the button text as cypress by default will allow 4 seconds
    // for validation before failing the test and after 4 seconds the button text will change back
    // cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
  });

  it('should show error styling on empty form fields', () => {
    // cy.visit('http://localhost:5173/about');
    // weird need to focus before blur to trigger the validation
    cy.get('[data-cy="contact-input-message"]').focus().blur();

    // this doesn't work as expected
    // cy.get('[data-cy="contact-input-message"]')
    //   .parent()
    //   .then((el) => {
    //     // nice way to debug w/in your cypress test, just make sure your dev tools are open on the cypress test runner
    //     // debugger;
    //     expect(el.attr('class')).to.contains('invalid');
    //   });

    // instead do the following:
    cy.getById('contact-input-message')
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.not.be.undefined;
        expect(el.attr('class')).to.contains('invalid');
      });

    // could alternatively use the following:
    cy.getById('contact-input-message')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/);
  });
});
