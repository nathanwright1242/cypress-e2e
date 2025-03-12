```javascript
import React, { useState, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ModuleRegistry, AllCommunityModules } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme

// Register AG Grid Modules
ModuleRegistry.registerModules(AllCommunityModules);

const GridExample = () => {
    // Reference to the grid
    const gridRef = useRef();
    
    // Track changes to send on save
    const [hasChanges, setHasChanges] = useState(false);
    
    // Row Data: The data to be displayed
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed
    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        // Make the second last column (price) editable
        { 
            field: "price", 
            editable: true,
            // Optional: Add a value formatter to display as currency
            valueFormatter: params => {
                return '$' + params.value.toLocaleString();
            },
            // Optional: Add a number editor for validation
            cellEditor: 'agNumberCellEditor',
            cellEditorParams: {
                precision: 0, // No decimal places
                min: 0 // Minimum price
            }
        },
        { field: "electric" }
    ]);

    // Default properties to apply to all columns
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };

    // Handle cell value changes
    const onCellValueChanged = useCallback((event) => {
        console.log('Cell value changed:', event);
        // Mark that we have changes to save
        setHasChanges(true);
    }, []);

    // Save button handler
    const handleSave = useCallback(() => {
        // Get the current row data from the grid
        const updatedData = [];
        gridRef.current.api.forEachNode(node => {
            updatedData.push(node.data);
        });
        
        // In a real application, you would send this to your backend
        console.log('Saving updated data:', updatedData);
        
        // Example API call (uncomment and modify for your API)
        /*
        fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Reset the changes flag after successful save
            setHasChanges(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        */
        
        // For this example, just reset the flag
        setHasChanges(false);
        
        // Optionally show success message to user
        alert('Changes saved successfully!');
    }, []);

    return (
        <div>
            {/* AG Grid Component */}
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    onCellValueChanged={onCellValueChanged}
                    // Optional: Enable row selection if needed
                    rowSelection="multiple"
                />
            </div>
            
            {/* Save Button - only enabled when there are changes */}
            <div style={{ marginTop: 20 }}>
                <button 
                    onClick={handleSave}
                    disabled={!hasChanges}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: hasChanges ? '#4CAF50' : '#e0e0e0',
                        color: hasChanges ? 'white' : '#888',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: hasChanges ? 'pointer' : 'not-allowed'
                    }}
                >
                    Save Changes
                </button>
                
                {/* Optional: Display a message when there are changes */}
                {hasChanges && (
                    <span style={{ marginLeft: 10, color: '#666' }}>
                        You have unsaved changes
                    </span>
                )}
            </div>
        </div>
    );
};

export default GridExample;
```
