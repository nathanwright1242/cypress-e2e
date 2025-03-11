## DataGrid React Component Example 

```javascript
// src/components/DataGrid/DataGrid.tsx
import React, { useCallback, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, CellClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Custom button cell renderer
const ButtonCellRenderer: React.FC<any> = (props) => {
  const onClick = () => {
    window.open(props.value.url, '_blank');
  };

  return (
    <button 
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      data-testid="button-cell"
    >
      {props.value.text}
    </button>
  );
};

// Custom status component
const StatusCellRenderer: React.FC<any> = (props) => {
  const status = props.value;
  const statusClass = 
    status === 'Active' ? 'bg-green-500' :
    status === 'Pending' ? 'bg-yellow-500' :
    status === 'Inactive' ? 'bg-red-500' : 'bg-gray-500';

  return (
    <div className="flex items-center" data-testid="status-cell">
      <div className={`${statusClass} w-3 h-3 rounded-full mr-2`}></div>
      <span>{status}</span>
    </div>
  );
};

// Interface for our row data
export interface RowData {
  id: number;
  button: {
    text: string;
    url: string;
  };
  name: string;
  age: number;
  email: string;
  status: string;
}

interface DataGridProps {
  initialRowData?: RowData[];
  onDataChanged?: (data: RowData[]) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ initialRowData = [], onDataChanged }) => {
  const [rowData, setRowData] = useState<RowData[]>(initialRowData);
  
  // Column Definitions
  const columnDefs = useMemo<ColDef[]>(() => [
    { 
      field: 'button', 
      headerName: 'Action', 
      cellRenderer: ButtonCellRenderer,
      minWidth: 120,
      sortable: false,
      filter: false
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      minWidth: 150,
      sortable: true,
      filter: true 
    },
    { 
      field: 'age', 
      headerName: 'Age', 
      minWidth: 100,
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      minWidth: 200,
      sortable: true,
      filter: true,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellEditorPopup: false
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      minWidth: 140,
      sortable: true,
      filter: true,
      cellRenderer: StatusCellRenderer 
    }
  ], []);

  // Default column configuration
  const defaultColDef = useMemo(() => ({
    resizable: true,
  }), []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    // If we wanted to fetch data from API, we would do it here
    console.log('Grid is ready');
  }, []);

  const onCellValueChanged = useCallback((event: any) => {
    const updatedRowData = [...rowData];
    const rowIndex = updatedRowData.findIndex(row => row.id === event.data.id);
    if (rowIndex !== -1) {
      updatedRowData[rowIndex] = { ...event.data };
      setRowData(updatedRowData);
      if (onDataChanged) {
        onDataChanged(updatedRowData);
      }
    }
  }, [rowData, onDataChanged]);

  const handleCellClicked = (event: CellClickedEvent) => {
    console.log('Cell clicked:', event);
  };

  return (
    <div className="ag-theme-alpine w-full h-96" data-testid="data-grid">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
        onGridReady={onGridReady}
        onCellClicked={handleCellClicked}
        onCellValueChanged={onCellValueChanged}
        rowSelection="multiple"
        suppressRowClickSelection={true}
      />
    </div>
  );
};

export default DataGrid;
```

## DataGrid Usage Example
```javascript
// src/pages/UserList.tsx
import React, { useState } from 'react';
import DataGrid, { RowData } from '../components/DataGrid/DataGrid';

const UserList: React.FC = () => {
  // Initial data for the grid
  const initialData: RowData[] = [
    {
      id: 1,
      button: { text: 'View', url: 'https://example.com/user/1' },
      name: 'John Doe',
      age: 32,
      email: 'john.doe@example.com',
      status: 'Active'
    },
    {
      id: 2,
      button: { text: 'View', url: 'https://example.com/user/2' },
      name: 'Jane Smith',
      age: 28,
      email: 'jane.smith@example.com',
      status: 'Pending'
    },
    {
      id: 3,
      button: { text: 'View', url: 'https://example.com/user/3' },
      name: 'Robert Johnson',
      age: 45,
      email: 'robert.johnson@example.com',
      status: 'Active'
    },
    {
      id: 4,
      button: { text: 'View', url: 'https://example.com/user/4' },
      name: 'Emily Williams',
      age: 36,
      email: 'emily.williams@example.com',
      status: 'Inactive'
    },
    {
      id: 5,
      button: { text: 'View', url: 'https://example.com/user/5' },
      name: 'Michael Brown',
      age: 29,
      email: 'michael.brown@example.com',
      status: 'Active'
    }
  ];

  const [userData, setUserData] = useState<RowData[]>(initialData);

  const handleDataChanged = (updatedData: RowData[]) => {
    setUserData(updatedData);
    // Here you could update your backend or state management system
    console.log('Data changed:', updatedData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <DataGrid 
          initialRowData={userData} 
          onDataChanged={handleDataChanged} 
        />
      </div>
    </div>
  );
};

export default UserList;
```

## DataGrid Unit Tests
```javascript
// src/components/DataGrid/DataGrid.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataGrid, { RowData } from './DataGrid';

// Mock the ag-grid module
jest.mock('ag-grid-react', () => {
  const AgGridReact = jest.fn().mockImplementation(({ rowData, columnDefs, onCellValueChanged }) => {
    // Create a simplified representation of the grid for testing
    return (
      <div data-testid="mock-ag-grid">
        <table>
          <thead>
            <tr>
              {columnDefs.map((col: any, index: number) => (
                <th key={index}>{col.headerName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData.map((row: RowData, rowIndex: number) => (
              <tr key={rowIndex} data-testid={`row-${rowIndex}`}>
                <td>
                  <button data-testid="button-cell">{row.button.text}</button>
                </td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>
                  <input 
                    data-testid={`email-cell-${rowIndex}`}
                    defaultValue={row.email}
                    onChange={(e) => {
                      // Simulate cell value change
                      const updatedRow = { ...row, email: e.target.value };
                      onCellValueChanged({ 
                        data: updatedRow, 
                        oldValue: row.email,
                        newValue: e.target.value,
                        column: { colId: 'email' } 
                      });
                    }}
                  />
                </td>
                <td>
                  <div data-testid="status-cell">{row.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
  
  return { AgGridReact };
});

describe('DataGrid Component', () => {
  const mockRowData: RowData[] = [
    {
      id: 1,
      button: { text: 'View', url: 'https://example.com/user/1' },
      name: 'John Doe',
      age: 32,
      email: 'john.doe@example.com',
      status: 'Active'
    },
    {
      id: 2,
      button: { text: 'View', url: 'https://example.com/user/2' },
      name: 'Jane Smith',
      age: 28,
      email: 'jane.smith@example.com',
      status: 'Pending'
    }
  ];

  const mockOnDataChanged = jest.fn();

  beforeEach(() => {
    mockOnDataChanged.mockClear();
  });

  test('renders the DataGrid component', () => {
    render(<DataGrid initialRowData={mockRowData} />);
    expect(screen.getByTestId('mock-ag-grid')).toBeInTheDocument();
  });

  test('renders the correct number of rows', () => {
    render(<DataGrid initialRowData={mockRowData} />);
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });

  test('renders button cell renderer', () => {
    render(<DataGrid initialRowData={mockRowData} />);
    const buttons = screen.getAllByTestId('button-cell');
    expect(buttons.length).toBe(2);
    expect(buttons[0]).toHaveTextContent('View');
  });

  test('renders status cell renderer', () => {
    render(<DataGrid initialRowData={mockRowData} />);
    const statusCells = screen.getAllByTestId('status-cell');
    expect(statusCells.length).toBe(2);
    expect(statusCells[0]).toHaveTextContent('Active');
    expect(statusCells[1]).toHaveTextContent('Pending');
  });

  test('calls onDataChanged when email cell is edited', async () => {
    render(<DataGrid initialRowData={mockRowData} onDataChanged={mockOnDataChanged} />);
    
    const emailInput = screen.getByTestId('email-cell-0');
    fireEvent.change(emailInput, { target: { value: 'new.email@example.com' } });
    
    await waitFor(() => {
      expect(mockOnDataChanged).toHaveBeenCalledTimes(1);
    });
    
    const expectedUpdatedData = [...mockRowData];
    expectedUpdatedData[0] = {
      ...mockRowData[0],
      email: 'new.email@example.com'
    };
    
    expect(mockOnDataChanged).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({
        id: 1,
        email: 'new.email@example.com'
      })
    ]));
  });

  // Additional test for component with no initial data
  test('renders with empty data', () => {
    render(<DataGrid />);
    expect(screen.getByTestId('mock-ag-grid')).toBeInTheDocument();
  });
});
```

## Setup Doc
```javascript
# AG Grid Setup Guide for React/TypeScript

## Installation

Install AG Grid packages in your React/TypeScript project:

```bash
npm install --save ag-grid-community ag-grid-react
# For Enterprise features (optional)
# npm install --save ag-grid-enterprise
```

## Required Dependencies

Make sure you have the following dependencies:

```bash
npm install --save react react-dom
npm install --save-dev typescript @types/react @types/react-dom
```

## Testing Dependencies

For unit testing, install these packages:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest jest-environment-jsdom
```

## Project Structure

Here's the recommended structure for your AG Grid implementation:

```
src/
├── components/
│   └── DataGrid/
│       ├── DataGrid.tsx         # Main component
│       ├── DataGrid.test.tsx    # Unit tests
│       └── renderers/           # Custom cell renderers (optional)
├── pages/
│   └── UserList.tsx             # Page using DataGrid
├── types/
│   └── grid.types.ts            # Type definitions (if needed)
```

## TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## Jest Configuration

Create a `jest.config.js` file:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
```

And a `src/setupTests.ts` file:

```typescript
import '@testing-library/jest-dom';
```

## CSS Setup

Make sure to import AG Grid styles in your application:

```typescript
// In your App.tsx or index.tsx
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
```

## Implementation Notes

1. **Column Definition Types**: Always use `ColDef` type from AG Grid for proper type checking
2. **Cell Renderers**: Create custom components for specialized cell rendering
3. **Pagination**: Enable with the `pagination` and `paginationPageSize` properties
4. **Editable Columns**: Set `editable: true` and specify `cellEditor`
5. **Event Handling**: Use callbacks like `onCellValueChanged` for data updates

## AG Grid Enterprise Features (Optional)

If you're using AG Grid Enterprise, include the license key:

```typescript
import { LicenseManager } from 'ag-grid-enterprise';

// Add this before rendering your app
LicenseManager.setLicenseKey('YOUR_LICENSE_KEY');
```

## Performance Considerations

- Use `useMemo` for `columnDefs` and `defaultColDef` to avoid unnecessary re-renders
- For large datasets, consider server-side row model
- Implement pagination for better performance with large datasets

## Styling with Tailwind CSS

If using Tailwind CSS, make the container responsive:

```jsx
<div className="ag-theme-alpine w-full h-96 md:h-[600px]">
  <AgGridReact ... />
</div>
```
