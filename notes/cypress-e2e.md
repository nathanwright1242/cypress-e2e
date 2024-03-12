## Cypress

Cypress is a test automation tool and framework for web developers. Cypress is used to write automated tests for web applications. Cypress supports two types of automated tests: end-to-end tests and component tests.

### End-to-end tests

End-to-end tests are used to test the entire application from the user's perspective. They typically test user flows, such as logging in, adding items to a shopping cart, and checking out.

i.e. user visits login page --> user enters username and password --> user clicks login button --> user is redirected to dashboard page

End-to-end tests are used to test the complete application workflow(s) and help ensure the correct functionality of the application's core features and processes. However, this doesn't necessarily cover all the building blocks of an application.

### Component tests

Component tests are tests which test individual components of an application. They typically test the functionality of a single component, such as a button, a form, or the look and feel of a modal overlay component.

### Unit tests

Unit tests are tests which test the logic of a single component. They typically test the logic of a single function or method i.e. the smallest application building blocks. They don't test the component in the context of the application so these tests can't guarantee the correct functionality of the component in the context of the whole application i.e. multiple components working together in the context of the application may lead to unexpected behavior.

**NOTE:** Unit and e2e tests compliment one another. Unit tests are great for testing the logic of a component, but they don't test the component in the context of the application. e2e tests are great for testing the component in the context of the application, but they don't test the logic of the individual component.

e2e + unit testing = ideally you achieve a state of automated testing in a given project which allows you to cover all the major building blocks and flows to catch any errors or bugs that may arise.

### Cypress Features & Commands

`npx cypress open` - opens cypress test studio, this is used to manage and run cypress tests. Can debug your tests w/ the cypress studio application, just be sure to add a debugger statement in your test file and run the tests w/in the cypress studio application w/ dev tools open.

`npx cypress run` - runs cypress tests headlessly, this is used to run cypress tests in a CI/CD pipeline

`.cy.js` is the file extension used for cypress tests

`describe` - used to group tests together into a test suite.

`it` - used to define a single test definition within a test suite.

`cy.visit` - used to visit a given url on your application for testing i.e. `cy.visit('http://localhost:3000/login')`. This command will ensure the test fails if the page doesn't load i.e it will not only assist in visiting a particular page but will also ensure that the page renders successfully, otherwise it will fail.

`cy.get` - used to select an element from the DOM using a CSS selector or a data attribute selector i.e. `cy.get('button')` or `cy.get('[data-cy="submit"]')`. You can hover over any cmd ran within the cypress test runner to see the element(s) which were selected. This command will find all elements matching the selector unlike `document.querySelector` which only finds the first element matching the selector. See [Common CSS Selectors & Cypress](#common-css-selectors) for more information.

`cy` is the Cypress global object. It is used to access all the Cypress commands.

`/// <reference types="cypress" />` - used to reference the Cypress global object in a test file, this is required for intellisense to work in VS Code i.e. auto complete.

`cy.should` - used to assert that a given element has a particular property or value i.e. `cy.get('button').should('be.visible')` or `cy.get('button').should('have.text', 'Submit')`. This command will ensure the test fails if the assertion is not met. Adds expectations to cypress tests. By default all cypress validation timeouts are set to 4 seconds. You can change this default timeout by passing in a timeout value as the second argument to the should command i.e. `cy.get('button').should('be.visible', 10000)`.

`.and` - used to chain multiple assertions together i.e. `cy.get('button').should('be.visible').and('have.text', 'Submit')`. It is an alias for `.should()` and is useful for making a test more readable.

[Cypress Assertions](https://docs.cypress.io/guides/references/assertions#Common-Assertions)

```javascript
/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/');
    cy.get('.main-header img').should('be.visible');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1);
    cy.get('h1').contains('My Cypress Course Tasks');
    // if you don't want to select based on element type use contains
    // cy.contains('My Cypress Course Tasks');
  });
});
```

**Beware of this common gotcha:** selecting elements which results in a successful test when the test should fail: For example, selecting nested elements with chained `.get()` calls: `cy.get('main-header').get('img')`. These chained get calls do not use the previous element as the context for the next get call. Instead, they are two separate get calls that both select the entire DOM. Instead chain `.find()` calls to select nested elements: `cy.get('main-header').find('img')`.

By default on click events will click the center of the element. You can specify where to click on the element by passing in an object with the x and y coordinates of the element i.e. `cy.get('button').click({ force: true })`

```javascript
describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    // test simulating user interaction to ensure the modal isn't displayed when the user clicks outside of the modal or clicks the cancel button
    // setup
    cy.visit('http://localhost:5173/');
    // interaction
    cy.contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    // assertion / expectation
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');

    cy.contains('Add Task').click();
    cy.contains('Cancel').click();
    cy.get('.backdrop').should('not.exist');
    cy.get('.modal').should('not.exist');
  });
});
```

`cy.contains` can be safely chained after `.get()` to select a nested element i.e. `cy.get('button').contains('Submit')`. It can also be used to search for partial text (case sensitive) matches and will fail the test implicitly if no match is found.

For cypress you can select, select elements, by their options value types

Cypress runs tests in isolation i.e. for each test the browser context is new and any cookies or local storage data is cleared. This is to ensure that tests are not dependent on each other and that they can be run in any order.

`data-cy` attribute is the recommended way to select elements for testing: `cy.get('data-cy="header-about-link"]').click()`. It is recommended to use this attribute instead of using classes or ids because classes and ids can change over time and can be used for styling purposes. `data-cy` attributes are not used for styling purposes and are not likely to change over time. Best practice is to have unique `data-cy` attributes for each dom element. It is ok to use the same `data-cy` attribute for different elements if they are the same type of element i.e. all list items for which you want to perform a test against.

`cy.location('pathname')` - useful for getting the current url path and where the application is currently navigated to.

If you create a variable to hold a shared element by using `.get()` be aware that this is not the actual element rather it is a chainable object that represents the element (Cypress.Chainable). It is not recommended to store elements in variables instead create an alias for the element using `cy.as()`.

`cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');`
`cy.get('@submitBtn').click();`

Nice thing about aliases is you have a single point of reference to update if the data-cy attribute changes.

To directly access a DOM element (technically not the native DOM element but is a wrapper around the native DOM element):

Instead of:
`cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").should('not.have.attr', 'disabled')`

You can do the following:

```javascript
cy.get('[data-cy="contact-btn-submit"]').then((el) => {
  expect(el.attr('disabled')).to.be.undefined;
  expect(el.text()).to.eq('Send Message');
});

// el[0] for direct access to the DOM element
```

You no longer have access to the `.should()` command when using the `.then()` command. You can use the `expect()` command to make assertions.

**In General:**
The then() method can be chained after other Cypress queries to get direct access to the "subjects" of those queries. For example, the subject of get('form') would be the selected form element(s). Therefore, the concrete value received by the function passed to then() depends on the query before then().

When receiving an element (e.g., as it's the case for `get('form').then(el => ...))`, you can inspect the element inside of the function passed to then(). As mentioned earlier you actually get a "wrapper object" around the DOM element(s) that was / were selected. However, you can also get (even more) direct access to the actual DOM element(s) via el[0] (for the first selected element), el[1] (for the second selected element, if available) etc.

**Simulate User Keyboard Events:**

To stimulate keyboard events use the {action} after the last input field is filled out:
`cy.get('[data-cy="contact-input-email"]').type('test@mail.com{enter}')`

[Supported Cypress Keyboard Events](https://docs.cypress.io/api/commands/type#Arguments)

**Note** after calling `.blur()` on an input field, the field will lose focus and the cursor will no longer be in the input field. This is useful for testing form validation. Once you call `.blur()` for the first element the next element won't be focused until you call `.focus()` on it.

Cypress will automatically take screenshots of any failing tests and will save them in the `cypress/screenshots` directory. You can also take screenshots manually using the `cy.screenshot()` command. You can also take screenshots of a specific element using the `cy.get('button').screenshot()` command. Videos are also recorded for each test and are saved in the `cypress/videos` directory.

There are use cases where cypress tests will pass w/in the cypress studio application (`npx cypress open`) but will fail when running the tests headlessly (`npx cypress run`). This is due to the fact that cypress studio runs tests in a different environment than the headless mode. It is recommended to run tests headless to ensure that the tests will pass in a CI/CD pipeline. In general you should test both modes to ensure that your tests will pass in both environments. Most developers will use cypress studio to write and debug tests and then run the tests headless to ensure that they will pass in a CI/CD pipeline.

Ways to avoid inconsistent test results between cypress studio and headless mode:

- Instead of traversing the DOM to find elements (`.parent()`, `.children()`, etc), use data-cy attributes to select elements.
- Use `.should()` instead of `.then()` and diving into an element to avoid inconsistent test results.
- A good safeguard is to check that an attribute exists before checking for correctness:

```javascript
// match uses regular expressions and for most cases should will yield the same subject to the next assertion
.should('have.attr', 'class').and('match', /invalid/)
```

cypress.config.js - used to configure global cypress settings for your application.

baseURL - used to set the base url for your application w/in the e2e entry. This is useful for avoiding repeating the base url in your tests. Also prevents you from having to update the base url in multiple places if it changes.

browser - used to set the browser that cypress will use to run tests. By default cypress uses electron. You can set this to chrome or firefox to run tests in those browsers.

If you want to use a different configuration you can pass a local configuration object to a particular test or testsuite.

```javascript
describe('Contact Form', {defaultCommandTimeout: 10000} () => {...})

it('should submit the Form', {defaultCommandTimeout: 10000} () => {...})
```

Cypress test hooks:

beforeEach - runs before each test. Useful for encapsulating shared test setup code: visiting a page, setting up test data, seeding a database, etc.

before - runs once before all tests. Useful for setting up test data that is shared across all tests.

afterEach - runs after each test. Useful for cleaning up test data after each test.

after - runs once after all tests. Useful for cleaning up test data that is shared across all tests.

Cypress doesn't recommend using after / afterEach for clean up work rather their recommendation is to do all clean up work w/in the before hooks to ensure before any tests are ran the environment is in a clean state.

```javascript
beforeEach(() => {
  cy.visit('/about');
});
```

Custom command and custom queries allow you to outsource common steps, command chains, your selectors into custom commands and queries. This is useful for reusing code across multiple tests and keeping test code lean.

Commands - reusable shortcuts for complex command chains i.e. cy.submitForm() or cy.login() could be used to create custom commands to submit a form or login to an application. Best practice is to not use custom commands for all behavior but rather use your best judgement as the commands can make the tests harder to read and understand.

Queries - synchronous, chainable, retirable commands. A key difference between custom commands is the ability to retry while waiting for the visibility of an element. `cy.getById('abc)` could be a custom query which finds all elements with `data-cy="abc"`. Since Cypress commands are an instruction set for the browser, they are not executed immediately. Instead, they are queued and executed in the order they were called. Therefore, use the `.now()` command to execute a command immediately and to tell cypress not to schedule the command for later execution.

cypress --> support --> commands.js - used to define custom commands and queries.

```javascript
Cypress.Commands.add('submitForm', () => {
  cy.get('data-cy="contact-btn-submit"').click();
});

//  use the custom command in a test
cy.submitForm();

Cypress.Commands.addQuery('getById', (id) => {
  return () => {
    const getFn = cy.now('get', `[data-cy="${id}"]`);
    // this will retry the getFn command until the element is found
    return getFn();
  };
});
```

`cy.task()` - let you run any predefined tasks at anytime w/in your tests and hooks. This is useful for running tasks that are not related to the application under test i.e. seeding a database, sending an email, etc.

The corresponding event listeners w/in your cypress config file will listen for the task event and run the task. These events can run code outside the context of the browser and can be used to run any node.js code. By default any code you write as part of your tests or in your custom commands runs w/in the context of the browser.

```javascript
// w/in your test file
cy.task('seedDatabase');

// w/in your cypress config file

import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        seedDatabase() {
            // code to seed the database
            // add any nodeJS code i.e. edit a file, send an email, etc.
        },
        },
      };
    },
});
```

Stubs - are a replacement for an existing function or method. Used for evaluation and controlling function calls. They are useful for testing code that depends on external services or functions. They are used to replace a function or method with a custom implementation.

When writing a test you want to test your code not third party code or apis. Stubs are used to replace third party code or apis with a custom implementation. This is useful for testing your code in isolation.

`cy.stub()` - used to create a stub. It takes in an object and a method name. It returns a stub object which can be used to control the behavior of the method.

```javascript
describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/').then((win) => {
      // need to use then to get the window object as after visiting the page the window object is available
      // in general data w/in then block needs to use the data yielded by the previous command
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').as(
        'getCurrentPosition'
      );
    });
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@getCurrentPosition').should('have.been.calledOnce');
  });
});
```

fixtures - used to store static data (as a JSON file) that can be used across multiple tests. Fixtures are stored in the cypress/fixtures directory.

```javascript
// access and load the data from the file as well as parse this data and converts JSON into a plain JS object
cy.fixture('user-location.json').as('userLocation');

cy.get('@userLocation').then((fakePosition) => {
  const { latitude, longitude } = fakePosition.coords;
  cy.get('@saveToClipboard').should(
    'have.been.calledWithMatch',
    new RegExp(`${latitude}.*${longitude}.*${encodeURI('John Doe')}`)
  );
});
```

Spies - a listener which is attached to a function or method. It's used to evaluate and assert function calls. It's used to assert that a function or method was called with the correct arguments and the correct number of times. However, it does not replace the function or method with a custom implementation.

It is not uncommon for e2e tests to become rather long and to test multiple steps inside a single test as you are testing the entire application and a user flow.

It is a good idea to manipulate the clock (i.e. timers, setInterval, alerts, etc..) for performance reasons w/in your tests as to keep your tests suites running efficiently i.e. 60 tests w/ 2 seconds timeout = 2 minutes of idle time

cy.clock() - used to manipulate the clock. Must be called before initializing your tests. It is used to manipulate the clock to speed up or slow down time. It is useful for testing time based functionality i.e. timers, intervals, etc.

```javascript
// manipulate the clock to make it as though 2 seconds passed w/out waiting for 2 seconds
cy.clock(); // setup in beforeEach
// cy.tick(2000);
```

Interesting way to catch cypress errors and prevent cypress test failures due to unrelated application bugs:

cypress --> support --> commands.js

```javascript
// the below code snippet is required to handle a React hydration bug that would cause tests to fail
// it's only a workaround until this React behavior / bug is fixed
Cypress.on('uncaught:exception', (err) => {
  // we check if the error is
  if (
    err.message.includes('Minified React error #418;') ||
    err.message.includes('Minified React error #423;') ||
    err.message.includes('hydrating') ||
    err.message.includes('Hydration')
  ) {
    return false;
  }
});
```

Best practice is to use a dedicated test database for your e2e tests. This will ensure you don't pollute your production or development database with test data. It will also ensure that your tests are not dependent on the state of the database. SQLite is a good choice for a test database as it is an in-memory database and is easy to setup / seed / tear down. (lecture 81). You should seed the database before every test run to ensure that the database is in a clean state before each test run.

```javascript
// example of seeding a test database
// testfile.cy.js

/// <reference types="Cypress" />
describe('Takeaways', () => {
  beforeEach(() => {
    // cypress will execute the seedDatabase task before each test, ensuring the database is seeded with the expected data
    cy.task('seedDatabase');
  });
  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
});

// cypress config file
import { defineConfig } from 'cypress';
import { seed } from './prisma/seed-test';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async seedDatabase() {
          await seed();
          // must return a value w/in your task functions for cy.task() to work
          return null;
        },
      });
    },
  },
});

// prisma/seed-test.js
// seed prisma database
const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');
const prisma = new PrismaClient();

export async function seed() {
  console.log('Seeding...');
  await prisma.user.deleteMany({});
  await prisma.newsletterSignup.deleteMany({});
  await prisma.takeaway.deleteMany({});

  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: await hash('testpassword', 12),
    },
  });
  await prisma.newsletterSignup.create({
    data: {
      email: 'test2@example.com',
    },
  });
  await prisma.takeaway.create({
    data: {
      title: 'Cypress queues commands',
      body: "Your commands (e.g., cy.get()) don't run immediately. They are scheduled to run at some point in the future.",
    },
  });
  await prisma.takeaway.create({
    data: {
      title: 'Cypress acts on subjects',
      body: 'You can use then() to get direct access to the subject (e.g., HTML element, stub) of the previous command.',
    },
  });
}
```

Intercept - used to intercept and control network requests. It is used to stub network requests and to control the behavior of the network requests. It is useful for testing code that depends on network requests. It is used to replace network requests with a custom implementation.

If your page is rendered on the server you can't use cy.intercept() to intercept network requests as there is no network request to intercept. Instead you must use a test database to seed the database w/ the data you need to test your application.

```javascript
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
});
```

With Cypress you can test your API and front end together by not intercepting the network request and checking for the expected result w/in the front end. This is useful for testing the integration between the front end and the back end.

However another common approach is to decouple testing b/t the frontend and backend by using `cy.request` to test your API. cy.request will send the request to the backend api (without UI integration) and will return the response. You can then assert that the response is what you expect. i.e

```javascript
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
```

**Dealing w/ Network Requests Summary**

| Allow Requests                              | Intercept Requests                                                | Trigger Requests (Manually)                                    |
| ------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| Let the website do its requests             | _Intercept + spy_: Request passes & you can spy on it             | Test API endpoints from inside your tests i.e. cy.request(...) |
| _Potential Problem_: Db is hit w/ test data | _Intercept + stub_: Request is blocked & stubbed response is used | Ideal for API testing or for decoupling frontend and backend   |
| _Solution_: Use a separate testing DB       | X                                                                 | X                                                              |

`its` - is used to test the properties of an object. It is used to test the properties of the subject of the previous command. It is useful for testing the properties of an object that you are working with.

```javascript
it('should signup', () => {
  cy.visit('/signup');
  // click is normally not needed but first need to focus the first input field due to a bug
  cy.get('[data-cy="auth-email"]').click();
  cy.get('[data-cy="auth-email"]').type('test2@example.com');
  cy.get('[data-cy="auth-password"]').type('password');
  cy.get('[data-cy="auth-submit"]').click();
  // validate successful login
  // takeaways is a authenticated route, so we should be redirected to it after successful signup
  cy.location('pathname').should('eq', '/takeaways');
  cy.getCookie('__session').its('value').should('not.be.empty');
});
```

Best way to look into what `its` values you can access is by pinning a cypress instruction within the cypress studio editor and using dev tools to inspect the object.

While intercepting a request one useful thing is to stub out the API and check that the request was made with the correct parameters:

```javascript
it('should add a new takeaway', () => {
  cy.intercept('POST', '/takeaways/new*', 'success').as('createTakeaway');
  cy.login();
  cy.visit('/takeaways/new');
  cy.get('[data-cy="title"]').click();
  cy.get('[data-cy="title"]').type('TestTitle1');
  cy.get('[data-cy="body"]').type('TestBody1');
  cy.get('[data-cy="create-takeaway"]').click();
  cy.wait('@createTakeaway')
    .its('request.body')
    // .should('match', /title=TestTitle1&body=TestBody1/);
    .should('match', /TestTitle1.*TestBody1/);
});
```

### [Common CSS Selectors & Cypress](#common-css-selectors)

CSS provides various selectors to select elements from the DOM. Cypress supports all the common CSS selectors. Here are some of the most common CSS selectors:

1. **Element Selector**: Selects HTML elements by their tag name i.e. `cy.get('button')`
2. **ID Selector**: Selects an element by its unique id i.e. `cy.get('#submit')`
3. **Class Selector**: Selects elements by their class name i.e. `cy.get('.submit')`
4. **Attribute Selector**: Selects elements based on the presence or value of attributes. i.e. `cy.get('[data-cy="submit-btn"]')`
5. **Descendant Selector**: Selects all elements that are descendants of a specified element i.e. `cy.get('form input')`
6. **Adjacent Sibling Selector**: Selects an element that is directly preceded by a specified element. i.e. `cy.get('h2 + p')`
7. **Child Selector**: Selects all direct child elements specified by a specific selector i.e. `cy.get('ul > li')`
8. **Pseudo-classes and Pseudo-Elements**: Selects elements based on a certain state or position i.e. `cy.get('input:disabled')`
   - Pseudo-classes like :hover, :active, :focus, etc.
   - Pseudo-elements like ::before, ::after, etc.
9. **Universal Selector**: Selects all elements i.e. `cy.get('*')`

### Resources

[Cypress Real World App](https://github.com/cypress-io/cypress-realworld-app)
