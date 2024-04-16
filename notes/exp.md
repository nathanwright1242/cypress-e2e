```javascript
import React, { useState, useEffect } from 'react';

const CertificationDetails = ({ certId }) => {
  const [certDetails, setCertDetails] = useState(null);

  useEffect(() => {
    const fetchCertDetails = async () => {
      try {
        const response = await fetch(`/${host}/certification/${certId}`); // Replace host with your hostname
        if (!response.ok) {
          throw new Error('Failed to fetch certification details');
        }
        const data = await response.json();
        setCertDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(fetchCertDetails, 20000); // Fetch every 20 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, [certId]); // Fetch whenever certId changes

  useEffect(() => {
    // Check if status field indicates success, and stop fetching if it does
    if (certDetails && certDetails.status === 'success') {
      clearInterval(intervalId);
    }
  }, [certDetails]);

  return (
    <div>
      {/* Render certification details */}
      {certDetails && (
        <div>
          <h2>{certDetails.title}</h2>
          <p>Status: {certDetails.status}</p>
          {/* Render other certification details */}
        </div>
      )}
    </div>
  );
};

export default CertificationDetails;

```

```javascript

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('your-api-endpoint');
        setData(response.data);
        // Check if the status is 'success' and stop polling if it is
        if (response.data.status === 'success') {
          setPolling(false);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    let intervalId;
    if (polling) {
      // Call the function every 30 seconds
      intervalId = setInterval(fetchData, 30000);
    }

    // Clean up the interval on component unmount or if polling stops
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [polling]); // Re-run effect if polling state changes

  // Render your table with the data
  return (
    <table>
      {/* Render your table rows with the data here */}
    </table>
  );
};

export default DataTable;

```
