## Role Based Entitlements
To implement role-based entitlements in your React app, you can create a higher-order component (HOC) or a custom hook to manage role-based access. Here's a step-by-step approach:

1. Parse Roles from the Cookie: Ensure you have a utility function to parse and decode the authentication cookie to extract roles.
2. Create a Utility Function to Check Roles: This function will check if a user has the required role to perform a specific action.
3. Higher-Order Component (HOC) or Custom Hook: Use an HOC or a custom hook to wrap components that need role-based access control.
4. Conditional Rendering of Execute Button: Use the HOC or hook to conditionally render the execute button based on the user's roles.

Here's how you can achieve this:

### Step 1: Parse Roles from the Cookie
Create a utility function to decode the token and extract roles:

```javascript
import jwtDecode from 'jwt-decode';

const parseRolesFromCookie = (cookie) => {
  const decodedToken = jwtDecode(cookie);
  return decodedToken.roles || [];
};
```

### Step 2: Create a Utility Function to Check Roles
Create a function to check if a user has a specific role:

```javascript
const hasRole = (roles, roleToCheck) => {
  return roles.some(role => role.includes(roleToCheck));
};
```

### Step 3: Create an HOC or Custom Hook
The HOC or custom hook abstracts the role-checking logic, making your component code cleaner and more maintainable.

HOC Example:

```javascript
import React from 'react';

const withRoleBasedAccess = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const roles = parseRolesFromCookie(document.cookie);
    const isAllowed = allowedRoles.every(role => !hasRole(roles, role));
    
    return <WrappedComponent {...props} isAllowed={isAllowed} />;
  };
};

export default withRoleBasedAccess;
```

Custom Hook
```javascript
import { useState, useEffect } from 'react';

const useRoleBasedAccess = (allowedRoles) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const roles = parseRolesFromCookie(document.cookie);
    const hasForbiddenRole = allowedRoles.some(role => hasRole(roles, role));
    setIsAllowed(!hasForbiddenRole);
  }, [allowedRoles]);

  return isAllowed;
};

export default useRoleBasedAccess;
```

### Step 4: Conditional Rendering of Execute Button

Using HOC
```javascript
import React from 'react';
import withRoleBasedAccess from './withRoleBasedAccess';

const ExecuteButton = ({ isAllowed }) => {
  return isAllowed ? <button>Execute</button> : null;
};

export default withRoleBasedAccess(ExecuteButton, ['DEVELOPER', 'ADMIN']);
```

Using Custom Hook
```javascript
import React from 'react';
import useRoleBasedAccess from './useRoleBasedAccess';

const ExecuteButton = () => {
  const isAllowed = useRoleBasedAccess(['DEVELOPER', 'ADMIN']);

  return isAllowed ? <button>Execute</button> : null;
};

export default ExecuteButton;
```
## Auth Based Entilements w/ Context

### Step 1: Context Setup
Assuming you already have an AuthContext or a similar context that provides user roles, ensure it has a method to check roles.

```javascript
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, authData }) => {
  const { roles } = authData;

  const hasRole = (roleToCheck) => {
    return roles.some(role => role.includes(roleToCheck));
  };

  return (
    <AuthContext.Provider value={{ roles, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### Step 2: Custom Hook to Check Roles
Create a custom hook that uses the context to check if a user has the required role:

```javascript
const useRoleBasedAccess = (allowedRoles) => {
  const { hasRole } = useAuth();
  const isAllowed = allowedRoles.every(role => !hasRole(role));
  return isAllowed;
};

export default useRoleBasedAccess;
```

### Step 3: Conditional Rendering of Execute Button
Use the custom hook in your button component to conditionally disable the button and show an informative message.

```javascript
import React from 'react';
import useRoleBasedAccess from './useRoleBasedAccess';

const ExecuteButton = () => {
  const isAllowed = useRoleBasedAccess(['DEVELOPER', 'ADMIN']);
  const message = isAllowed ? '' : 'You do not have the required permissions to execute this action.';

  return (
    <div>
      <button disabled={!isAllowed}>Execute</button>
      {!isAllowed && <p>{message}</p>}
    </div>
  );
};

export default ExecuteButton;
```

### Putting It All Together
Make sure your app wraps the relevant part of the component tree with the AuthProvider:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';

const authData = {
  roles: ['12345_PROJECT1-DEVELOPER_RES1', '67890_PROJECT2-ADMIN_RES2'] // Example roles from your decoded token
};

ReactDOM.render(
  <AuthProvider authData={authData}>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
```

With this setup:

The AuthContext provides user roles and a method to check roles.
The custom hook useRoleBasedAccess leverages the context to determine if the user has the required role.
The ExecuteButton component uses this hook to disable the button and show an informative message if the user lacks the required role.
This approach maintains clean separation of concerns and makes your component logic more maintainable and reusable.

## Typescript Based Auth

### Step 1: Context Setup
AuthContext.tsx
```typescript
import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of the auth context
interface AuthContextType {
  roles: string[];
  hasRole: (roleToCheck: string) => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide a custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the provider component
interface AuthProviderProps {
  authData: { roles: string[] };
  children: ReactNode;
}

export const AuthProvider = ({ children, authData }: AuthProviderProps): JSX.Element => {
  const { roles } = authData;

  const hasRole = (roleToCheck: string): boolean => {
    return roles.some(role => role.includes(roleToCheck));
  };

  return (
    <AuthContext.Provider value={{ roles, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Step 2: Custom Hook to Check Roles
useRoleBasedAccess.ts
```typescript
import { useMemo } from 'react';
import { useAuth } from './AuthContext';

const useRoleBasedAccess = (restrictedRoles: string[]): boolean => {
  const { hasRole } = useAuth();

  const isAllowed = useMemo(() => {
    return !restrictedRoles.some(role => hasRole(role));
  }, [restrictedRoles, hasRole]);

  return isAllowed;
};

export default useRoleBasedAccess;
```

### Step 3: Conditional Rendering of Execute Button
ExecuteButton.tsx
```typescript
import React from 'react';
import useRoleBasedAccess from './useRoleBasedAccess';

const ExecuteButton = (): JSX.Element => {
  const isAllowed = useRoleBasedAccess(['DEVELOPER', 'ADMIN']);
  const message = isAllowed ? '' : 'You do not have the required permissions to execute this action.';

  return (
    <div>
      <button disabled={!isAllowed}>Execute</button>
      {!isAllowed && <p>{message}</p>}
    </div>
  );
};

export default ExecuteButton;
```

### Step 4: Wrapping Your App
index.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const authData = {
  roles: ['12345_PROJECT1-DEVELOPER_RES1', '67890_PROJECT2-ADMIN_RES2'] // Example roles from your decoded token
};

ReactDOM.render(
  <AuthProvider authData={authData}>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
```

### Unit Tests
We’ll use Jest and React Testing Library for unit testing.

AuthContext.test.tsx
```typescript
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './AuthContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider authData={{ roles: ['12345_PROJECT1-DEVELOPER_RES1'] }}>
    {children}
  </AuthProvider>
);

test('should throw error if useAuth is used outside AuthProvider', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.error).toEqual(new Error('useAuth must be used within an AuthProvider'));
});

test('should provide roles and hasRole function', () => {
  const { result } = renderHook(() => useAuth(), { wrapper });
  expect(result.current.roles).toEqual(['12345_PROJECT1-DEVELOPER_RES1']);
  expect(result.current.hasRole('DEVELOPER')).toBe(true);
});
```

useRoleBasedAccess.test.ts
```typescript
import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider } from './AuthContext';
import useRoleBasedAccess from './useRoleBasedAccess';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider authData={{ roles: ['12345_PROJECT1-DEVELOPER_RES1'] }}>
    {children}
  </AuthProvider>
);

test('should return false if user has restricted role', () => {
  const { result } = renderHook(() => useRoleBasedAccess(['DEVELOPER']), { wrapper });
  expect(result.current).toBe(false);
});

test('should return true if user does not have restricted role', () => {
  const { result } = renderHook(() => useRoleBasedAccess(['ADMIN']), { wrapper });
  expect(result.current).toBe(true);
});
```

ExecuteButton.test.tsx
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import ExecuteButton from './ExecuteButton';

test('should disable button and show message for restricted role', () => {
  render(
    <AuthProvider authData={{ roles: ['12345_PROJECT1-DEVELOPER_RES1'] }}>
      <ExecuteButton />
    </AuthProvider>
  );
  expect(screen.getByRole('button')).toBeDisabled();
  expect(screen.getByText('You do not have the required permissions to execute this action.')).toBeInTheDocument();
});

test('should enable button for allowed role', () => {
  render(
    <AuthProvider authData={{ roles: ['12345_PROJECT1-USER_RES1'] }}>
      <ExecuteButton />
    </AuthProvider>
  );
  expect(screen.getByRole('button')).not.toBeDisabled();
  expect(screen.queryByText('You do not have the required permissions to execute this action.')).toBeNull();
});
```

#### Setting Up Testing
Make sure you have the necessary testing dependencies installed:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/react-hooks jest
```
Configure Jest in your project by adding a jest.config.js file or by updating your package.json:

jest.config.js
```javascript
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jsdom',
};
```
setupTests.ts
```typescript
import '@testing-library/jest-dom';
```

This implementation includes setting up context, creating a custom hook, using the custom hook in a component, and writing unit tests to ensure everything works as expected.
