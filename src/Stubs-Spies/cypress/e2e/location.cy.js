/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    cy.clock();

    // access and load the data from the file as well as parse this data and converts JSON into a plain JS object
    cy.fixture('user-location.json').as('userLocation');

    // allows you to share a stub across multiple tests
    cy.visit('/').then((win) => {
      cy.get('@userLocation').then((fakePosition) => {
        // need to use then to get the window object as after visiting the page the window object is available
        // in general data w/in then block needs to use the data yielded by the previous command
        cy.stub(win.navigator.geolocation, 'getCurrentPosition')
          .as('getCurrentPosition')
          // provide a custom implementation for navigator.geolocation.getCurrentPosition
          .callsFake((cb) => {
            // slow down the response to make sure the button is disabled after the click can be verified
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });

      // resolves returns a promise that resolves with the given value
      cy.stub(win.navigator.clipboard, 'writeText').as('saveToClipboard').resolves();

      cy.spy(win.localStorage, 'getItem').as('getStoredLocation');
      cy.spy(win.localStorage, 'setItem').as('storeLocation');
    });
  });
  it('should fetch the user location', () => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getCurrentPosition').should('have.been.calledOnce');
    cy.get('[data-cy="get-loc-btn"]').should('be.disabled');
    cy.get('[data-cy="actions"]').should('contain', 'Location fetched');
  });

  it('should share a location URL', () => {
    cy.get('[data-cy="name-input"]').type('John Doe');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@saveToClipboard').should('have.been.calledOnce');
    cy.get('@userLocation').then((fakePosition) => {
      const { latitude, longitude } = fakePosition.coords;
      cy.get('@saveToClipboard').should(
        'have.been.calledWithMatch',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      );
      // validate local storage api was called correctly
      cy.get('@storeLocation').should('have.been.called');
      cy.get('@storeLocation').should(
        'have.been.calledWithMatch',
        /John Doe/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
      );
    });

    // validate local storage api used existing key if already present
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getStoredLocation').should('have.been.called');

    // validate the location banner is shown after the share location btn is clicked
    cy.get('[data-cy="info-message"]').should('be.visible');
    cy.get('[data-cy="info-message"]').should('have.class', 'visible');

    // manipulate the clock to make it as though 2 seconds passed w/out waiting for 2 seconds
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should('not.be.visible');
  });
});
