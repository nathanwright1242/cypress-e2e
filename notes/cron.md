# React Cron Scheduler Widget

This guide demonstrates how to create a React widget that allows a user to input schedule details and generate a cron expression behind the scenes.

## Cron Expression Overview

A cron expression is a string representing a schedule in the following format:

```bash
* * * * *  (Minute Hour Day-of-Month Month Day-of-Week)
```

Where:
- `Minute` (0-59)
- `Hour` (0-23)
- `Day of the month` (1-31)
- `Month` (1-12)
- `Day of the week` (0-6, where 0 is Sunday and 6 is Saturday)

## Creating the Widget

### 1. Basic Form Layout

You will need a form that allows the user to input values for:
- Minutes
- Hours
- Day of the month
- Month
- Day of the week

### 2. Generate Cron Expression

The form will dynamically generate the cron expression based on user input.

### 3. Widget Code Example

Below is an example of a React widget that collects schedule inputs and generates a cron expression:

```jsx
import React, { useState } from 'react';

const CronScheduler = () => {
  const [minutes, setMinutes] = useState('*');
  const [hours, setHours] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');

  // Generate the cron expression
  const cronExpression = \`\${minutes} \${hours} \${dayOfMonth} \${month} \${dayOfWeek}\`;

  // Handle changes for each input
  const handleMinutesChange = (e) => setMinutes(e.target.value);
  const handleHoursChange = (e) => setHours(e.target.value);
  const handleDayOfMonthChange = (e) => setDayOfMonth(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleDayOfWeekChange = (e) => setDayOfWeek(e.target.value);

  return (
    <div>
      <h3>Cron Schedule Generator</h3>
      
      <div>
        <label>Minutes (0-59):</label>
        <input type="text" value={minutes} onChange={handleMinutesChange} />
      </div>
      
      <div>
        <label>Hours (0-23):</label>
        <input type="text" value={hours} onChange={handleHoursChange} />
      </div>
      
      <div>
        <label>Day of Month (1-31):</label>
        <input type="text" value={dayOfMonth} onChange={handleDayOfMonthChange} />
      </div>
      
      <div>
        <label>Month (1-12):</label>
        <input type="text" value={month} onChange={handleMonthChange} />
      </div>
      
      <div>
        <label>Day of Week (0-6, where 0 is Sunday):</label>
        <input type="text" value={dayOfWeek} onChange={handleDayOfWeekChange} />
      </div>
      
      <div>
        <h4>Cron Expression:</h4>
        <p>{cronExpression}</p>
      </div>
      
      {/* You can add a submit button or process the cron expression as needed */}
      <button onClick={() => console.log(cronExpression)}>Submit</button>
    </div>
  );
};

export default CronScheduler;
```

### 4. Improvements

- **Validation**: Add validation to ensure users input values within valid ranges (e.g., minutes 0-59, hours 0-23).
- **Dropdowns**: Replace the text inputs with dropdowns for a better user experience.
- **Use Cron Libraries**: You can use libraries like [`cron-parser`](https://www.npmjs.com/package/cron-parser) for building and validating cron expressions.

### 5. Using Cron Expression Libraries

To simplify, you can use libraries like `react-cron-generator`:

1. Install the package:

   ```bash
   npm install react-cron-generator
   ```

2. Use it in your React component:

   ```jsx
   import React, { useState } from 'react';
   import Cron from 'react-cron-generator';
   import 'react-cron-generator/dist/cron-builder.css';

   const CronSchedulerWithLibrary = () => {
     const [cronValue, setCronValue] = useState('0 0 * * *');

     const handleCronChange = (newCron) => {
       setCronValue(newCron);
     };

     return (
       <div>
         <h3>Cron Schedule Generator with Library</h3>
         <Cron value={cronValue} onChange={handleCronChange} />
         <div>
           <h4>Generated Cron Expression:</h4>
           <p>{cronValue}</p>
         </div>
       </div>
     );
   };

   export default CronSchedulerWithLibrary;
   ```

### Cron Expression to Run Immediately

To schedule a task to run immediately using cron, you cannot directly specify "immediate" execution. However, the closest solution is to schedule it to run every minute, which is represented by:

```
* * * * *
```

This will execute the task every minute.

If you need a task to run immediately once, you may need to trigger it manually or programmatically before cron handles future schedules.

```javascript
import React, { useState } from 'react';
import { Cron } from 'react-js-cron';
import 'react-js-cron/dist/styles.css';

export default function CronScheduler({ value, onChange }) {
  const [mode, setMode] = useState('visual'); // 'visual' or 'manual'

  return (
    <div style={{ width: '100%' }}>
      {/* Toggle Switch */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '16px' 
      }}>
        <span style={{ fontSize: '14px', color: '#666' }}>Mode:</span>
        <div style={{ 
          display: 'inline-flex', 
          border: '1px solid #d9d9d9', 
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <button
            onClick={() => setMode('visual')}
            style={{
              padding: '6px 16px',
              border: 'none',
              background: mode === 'visual' ? '#1890ff' : 'white',
              color: mode === 'visual' ? 'white' : '#666',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: mode === 'visual' ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            Visual Editor
          </button>
          <button
            onClick={() => setMode('manual')}
            style={{
              padding: '6px 16px',
              border: 'none',
              borderLeft: '1px solid #d9d9d9',
              background: mode === 'manual' ? '#1890ff' : 'white',
              color: mode === 'manual' ? 'white' : '#666',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: mode === 'manual' ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            Manual Input
          </button>
        </div>
      </div>

      {/* Conditional Rendering Based on Mode */}
      {mode === 'visual' ? (
        <Cron
          value={value}
          setValue={onChange}
          mode="multiple"
          defaultPeriod="day"
          clockFormat="12-hour-clock"
          humanizeLabels
          allowedPeriods={['month', 'week', 'day']}
          allowedDropdowns={['period', 'months', 'month-days', 'week-days', 'hours', 'minutes']}
          periodicityOnDoubleClick={false}  // ← Prevents "every X hours" selection
          allowEmpty="never"
          clearButtonAction="empty"
        />
      ) : (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="30 17,21 * * *"
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              fontFamily: 'monospace',
              border: '1px solid #d9d9d9',
              borderRadius: '4px'
            }}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            <strong>Format:</strong> minute hour day month day-of-week
          </div>
        </div>
      )}
    </div>
  );
}
```
