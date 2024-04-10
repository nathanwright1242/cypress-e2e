## Route Navigation - API Call

```javascript
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function YourComponent() {
  const [certId, setCertId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Make API call to fetch the value
    // Assuming the API call is asynchronous
    async function fetchData() {
      try {
        const response = await fetch('your-api-url');
        const data = await response.json();
        // Extract the certId value from the API response
        const certIdValue = data.certId;
        setCertId(certIdValue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []); // Run only once when component mounts

  useEffect(() => {
    // Navigate to the desired route once certId is available
    if (certId !== null) {
      history.push(`/gb-session?certId=${certId}`);
    }
  }, [certId, history]);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default YourComponent;

```
