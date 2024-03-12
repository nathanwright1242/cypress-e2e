describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should display a success message', () => {
    // best practice is to setup intercepts early in the test
    cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe'); // intercept any HTTP request localhost:3000/newsletter?anyQueryParams
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    // not necessary but is used to ensure the next instruction will only be executed by cypress after the request has been properly intercepted
    cy.wait('@subscribe');
    cy.contains('Thanks for signing up');
  });
  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', { message: 'Email exists already' }).as(
      'subscribe'
    );
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Email exists already');
  });
  it('should successfully create a new contact', () => {
    // test the api endpoint
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'test@example.com' },
      form: true, // sets the request Content-Type to application/x-www-form-urlencoded
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
});
