```javascript
import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

// Simplified data structure with subRows
const data = [
  {
    firstName: 'John',
    lastName: 'Doe',
    subRows: [
      { firstName: 'Child 1', lastName: 'Doe' },
      { firstName: 'Child 2', lastName: 'Doe' }
    ]
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    subRows: [
      { firstName: 'Child A', lastName: 'Smith' }
    ]
  }
]

function App() {
  const columns = React.useMemo(() => [
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: ({ row, getValue }) => (
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          {row.getCanExpand() ? (
            <button
              onClick={row.getToggleExpandedHandler()}
              style={{ cursor: 'pointer' }}
            >
              {row.getIsExpanded() ? '👇' : '👉'}
            </button>
          ) : (
            '🔵'
          )}{' '}
          {getValue()}
        </div>
      ),
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      cell: info => info.getValue(),
    },
  ], [])

  const [expanded, setExpanded] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
```
