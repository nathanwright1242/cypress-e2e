react-testing-library - a library for testing React components in a way that resembles the way the components are used by end users. It is a lightweight solution for testing React components.

### Key Ideas

**Philosophy**: React Testing Library is built on the principle of testing applications the way they are used by real users. It encourages writing tests that simulate user behavior, such as clicking buttons and entering text into input fields.

**Queries**: React Testing Library provides a set of queries to interact with components and elements in the DOM. These queries include getBy, queryBy, findBy, and more, allowing you to select elements based on their text, role, label, or test ID.

**Utilities**: Along with queries, React Testing Library offers utility functions to simulate user interactions, such as fireEvent for triggering events like clicks and waitFor for asynchronous actions.

**Accessibility**: It emphasizes testing for accessibility by encouraging developers to write tests that ensure components are usable by all users, including those who rely on assistive technologies like screen readers.

**Jest Integration**: React Testing Library is often used in conjunction with Jest, a popular testing framework for JavaScript. Jest provides tools for running tests and assertions, while React Testing Library provides utilities for interacting with React components.

**Community Support**: React Testing Library has a large and active community that provides support, documentation, and extensions. It is widely adopted in the React ecosystem and is maintained by a dedicated team.

**Examples and Tutorials**: Numerous tutorials and examples are available online to help developers get started with React Testing Library. These resources cover topics such as writing tests for different types of components, mocking dependencies, and testing asynchronous behavior.

Overall, React Testing Library is a powerful tool for testing React applications in a user-centric manner, focusing on behavior rather than implementation details, promoting accessibility, and providing a robust set of utilities and community support.

### Common Examples

- Rendering a Component

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders MyComponent', () => {
  const { getByText } = render(<MyComponent />);
  const element = getByText(/hello/i);
  expect(element).toBeInTheDocument();
});
```

another rendering example w/ a counter example

```javascript
import { render, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  it('displays the correct initial count', () => {
    // <h3 data-testid="count">{count}</h3>
    const { getByTestId } = render(<Counter initialCount={0} />);
    const countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(0);
  });

  it('increments the count', () => {
    // <button onClick={() => setCount(count + 1)}>Increment</button>
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />);
    const incrementButton = getByRole('button', { name: /increment/i });
    let countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(0);
    fireEvent.click(incrementButton);
    countValue = Number(getByTestId('count').textContent);
    expect(countValue).toEqual(1);
});
  }
});
```

- Simulating User Interaction

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonComponent from './ButtonComponent';

test('clicking button increments counter', () => {
  const { getByText } = render(<ButtonComponent />);
  const button = getByText('Click me');
  fireEvent.click(button);
  expect(getByText('You clicked: 1')).toBeInTheDocument();
});
```

- Testing Asynchronous Behavior

```javascript
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AsyncComponent from './AsyncComponent';

test('renders fetched data', async () => {
  const { getByText } = render(<AsyncComponent />);
  await waitFor(() => getByText('Loaded Data'));
  expect(getByText('Loaded Data')).toBeInTheDocument();
});
```

- Mocking Dependencies

```javascript
// axios.js
import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  return response.data;
};

// MyComponent.js
import React, { useState, useEffect } from 'react';
import { fetchData } from './axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData();
      setData(result);
    };
    fetchDataAsync();
  }, []);

  return <div>{data}</div>;
};

export default MyComponent;

// MyComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';
import { fetchData } from './axios';

jest.mock('./axios');

test('renders fetched data', async () => {
  fetchData.mockResolvedValue('Mocked Data');
  const { getByText } = render(<MyComponent />);
  expect(await getByText('Mocked Data')).toBeInTheDocument();
});
```

- Async Component Testing (More In-Depth)

```javascript
// AsyncComponent.js
import React, { useState, useEffect } from 'react';

const AsyncComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        // Simulating an asynchronous API call
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
};

export default AsyncComponent;
```

In this modified example, AsyncComponent fetches data asynchronously using the fetch API. While waiting for the data to be fetched, it displays a loading indicator. Once the data is fetched (or if there's an error), it renders the fetched data or an error message accordingly.

You can test this component using React Testing Library to ensure that it correctly renders the loading state and the fetched data. Here's a test example:

```javascript
// AsyncComponent.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AsyncComponent from './AsyncComponent';

test('renders fetched data', async () => {
  // Mocking the fetch API to return fake data
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => 'Mocked Data',
  });

  const { getByText } = render(<AsyncComponent />);
  expect(getByText('Loading...')).toBeInTheDocument();

  // Wait for the loading state to resolve
  await waitFor(() => expect(getByText('Mocked Data')).toBeInTheDocument());
});
```

In this test, we mock the fetch function to return fake data. We then render the AsyncComponent, wait for the loading state to resolve, and assert that the fetched data is rendered correctly.

### Other Examples

Coming Soon Component:

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import ComingSoon from './ComingSoon';

test('renders coming soon message', () => {
  const { getByText, getByRole } = render(<ComingSoon />);

  // Assert that the heading and paragraph elements are rendered
  const heading = getByText('🤖 Coming Soon 🤖');
  const paragraph = getByText('blah blah');

  // Assert that the heading has the appropriate role for accessibility
  expect(heading).toHaveAttribute('role', 'heading');

  // Assert that the heading and paragraph have the appropriate classes
  expect(heading).toHaveClass('text-center');
  expect(paragraph).toHaveClass('mt-5');

  // Assert that the elements are present in the document
  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});
```

Navbar Component (1st example):
https://reactstrap.github.io/?path=/docs/components-navbar--navbar

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Example from './Example';

test('navbar toggles correctly', () => {
  const { getByText, queryByText } = render(<Example />);

  // Verify the initial state: Navbar should be collapsed
  expect(queryByText('Components')).not.toBeInTheDocument();
  expect(queryByText('Option 1')).not.toBeInTheDocument();
  expect(queryByText('Option 2')).not.toBeInTheDocument();
  expect(queryByText('Reset')).not.toBeInTheDocument();

  // Click on the NavbarToggler
  fireEvent.click(getByText('reactstrap'));

  // Verify the state after clicking: Navbar should be expanded
  expect(getByText('Components')).toBeInTheDocument();
  expect(getByText('Option 1')).toBeInTheDocument();
  expect(getByText('Option 2')).toBeInTheDocument();
  expect(getByText('Reset')).toBeInTheDocument();

  // Click on the dropdown toggle
  fireEvent.click(getByText('Options'));

  // Verify dropdown items are visible
  expect(getByText('Option 1')).toBeInTheDocument();
  expect(getByText('Option 2')).toBeInTheDocument();
  expect(getByText('Reset')).toBeInTheDocument();

  // Click on an option
  fireEvent.click(getByText('Option 1'));

  // Verify option action
  // For example, you might expect a function to be called or a navigation to occur
});
```

Navbar Toggler Component (last example):

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matchers like toBeInTheDocument
import Example from './Example'; // Assuming your component file is named Example.js

test('navbar toggles correctly', () => {
  const { getByText, queryByText } = render(<Example />);

  // Verify the initial state: Navbar should be collapsed
  expect(queryByText('Components')).not.toBeInTheDocument();

  // Click on the NavbarToggler
  fireEvent.click(getByText('reactstrap'));

  // Verify the state after clicking: Navbar should be expanded
  expect(getByText('Components')).toBeInTheDocument();
});
```

Axios API Tests:

```javascript
// Import the Axios module and the API function to be tested
import Axios from 'axios';
import { fetchData } from './api.index';

// Mock Axios to prevent actual HTTP requests during testing
jest.mock('axios');

// Define test data
const mockResponseData = { id: 1, name: 'Test User', email: 'test@example.com' };
const mockApiResponse = { data: mockResponseData };

// Define test cases
describe('fetchData', () => {
  it('fetches data successfully from the API', async () => {
    // Mock Axios.get implementation to return a successful response
    (Axios.get as jest.MockedFunction<typeof Axios.get>).mockResolvedValue(mockApiResponse);

    // Call the API function
    const response = await fetchData('param1', 'param2');

    // Expectations
    expect(response).toEqual(mockResponseData);
    expect(Axios.get).toHaveBeenCalledWith('<endpoint>');
  });

  it('handles errors from the API', async () => {
    // Mock Axios.get implementation to throw an error
    (Axios.get as jest.MockedFunction<typeof Axios.get>).mockRejectedValue(new Error('API Error'));

    // Call the API function
    await expect(fetchData('param1', 'param2')).rejects.toThrow('API Error');
  });
});

```

```javascript
// Import the API function to be tested
import { fetchData } from './api.index';

// Mock the Axios module
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

// Define test data
const mockResponseData = { id: 1, name: 'Test User', email: 'test@example.com' };
const mockApiResponse = { data: mockResponseData };

// Define test cases
describe('fetchData', () => {
  it('fetches data successfully from the API', async () => {
    // Mock Axios.create().get implementation to return a successful response
    (axios.create().get as jest.Mock).mockResolvedValue(mockApiResponse);

    // Call the API function
    const response = await fetchData('param1', 'param2');

    // Expectations
    expect(response).toEqual(mockResponseData);
    expect(axios.create().get).toHaveBeenCalledWith('<endpoint>');
  });

  it('handles errors from the API', async () => {
    // Mock Axios.create().get implementation to throw an error
    (axios.create().get as jest.Mock).mockRejectedValue(new Error('API Error'));

    // Call the API function
    await expect(fetchData('param1', 'param2')).rejects.toThrow('API Error');
  });
});

```

```javascript
// Import the API function to be tested
import { fetchData } from './api.index';
import axios from 'axios';

// Mock the Axios module
jest.mock('axios');

// Define test data
const mockResponseData = { id: 1, name: 'Test User', email: 'test@example.com' };
const mockApiResponse = { data: mockResponseData };

// Define test cases
describe('fetchData', () => {
  it('fetches data successfully from the API', async () => {
    // Mock Axios.create().get implementation to return a successful response
    (axios.create as jest.MockedFunction<typeof axios.create>).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockApiResponse)
    });

    // Call the API function
    const response = await fetchData('param1', 'param2');

    // Expectations
    expect(response).toEqual(mockResponseData);
    expect(axios.create().get).toHaveBeenCalledWith('<endpoint>');
  });

  it('handles errors from the API', async () => {
    // Mock Axios.create().get implementation to throw an error
    (axios.create as jest.MockedFunction<typeof axios.create>).mockReturnValue({
      get: jest.fn().mockRejectedValue(new Error('API Error'))
    });

    // Call the API function
    await expect(fetchData('param1', 'param2')).rejects.toThrow('API Error');
  });
});

```

```javascript
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { initiatebuild } from './api'; // Assuming api.ts is where initiatebuild is defined

describe('initiatebuild', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = new MockAdapter(Axios);
  });

  afterEach(() => {
    axiosMock.restore();
  });

  it('sends a POST request to the correct endpoint with provided data', async () => {
    const data = { /* your test data */ };
    const responseData = { /* mock response data */ };

    axiosMock.onPost('<hostname>/cd-certification', data).reply(200, responseData);

    const response = await initiatebuild(data);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it('sends a POST request with default data when no data is provided', async () => {
    const defaultData = {}; // Your default data object here

    axiosMock.onPost('<hostname>/cd-certification', defaultData).reply(200, {});

    const response = await initiatebuild();

    expect(response.status).toBe(200);
    // Add more assertions if necessary
  });

  // Add more test cases as needed
});

```
Form Submissions

```javascript
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import YourComponent from './YourComponent'; // Import your component to be tested

// Mock API function
const mockStartCertificationProcess = jest.fn();

jest.mock('./api', () => ({
  startCertificationProcess: mockStartCertificationProcess
}));

describe('YourComponent', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockStartCertificationProcess.mockClear();
  });

  it('submits the form with correct data', async () => {
    const { getByLabelText, getByText, getByTestId } = render(<YourComponent />);

    // Fill out form fields
    fireEvent.change(getByLabelText('Test Artifact'), { target: { value: 'test artifact value' } });
    fireEvent.change(getByLabelText('Field 1'), { target: { value: 'value 1' } });
    // Add more fields as needed

    // Mock the API call
    mockStartCertificationProcess.mockResolvedValueOnce({ success: true });

    // Submit the form
    fireEvent.click(getByText('Submit'));

    // Wait for the API call to be made
    await waitFor(() => expect(mockStartCertificationProcess).toHaveBeenCalledTimes(1));

    // Verify that the API was called with the correct data
    expect(mockStartCertificationProcess).toHaveBeenCalledWith({
      testArtifact: 'test artifact value',
      field1: 'value 1'
      // Add more fields as needed
    });

    // Assert success message or any other UI changes upon successful submission
    expect(getByTestId('success-message')).toBeInTheDocument();
  });
});

```

Utils 
```javascript
import { hasEmptyFields } from './utils'; // Adjust the import path as needed

describe('hasEmptyFields', () => {
  it('returns true if any field is empty', () => {
    const obj = {
      name: 'John',
      age: 30,
      email: '',
    };
    expect(hasEmptyFields(obj)).toBe(true);
  });

  it('returns false if all fields are filled', () => {
    const obj = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
    };
    expect(hasEmptyFields(obj)).toBe(false);
  });

  it('returns false for an empty object', () => {
    const obj = {};
    expect(hasEmptyFields(obj)).toBe(false);
  });

  it('returns false for an object with only non-empty arrays', () => {
    const obj = {
      items: ['apple', 'banana'],
      prices: [10, 20],
    };
    expect(hasEmptyFields(obj)).toBe(false);
  });

  it('returns true if any field is null or undefined', () => {
    const obj = {
      name: 'John',
      age: null,
      email: 'john@example.com',
    };
    expect(hasEmptyFields(obj)).toBe(true);
  });
});

```

### Resources

- [React Testing Library](https://www.youtube.com/watch?v=JBSUgDxICg8)
