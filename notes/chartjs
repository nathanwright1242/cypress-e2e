```javascript
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const StackedBarChart = ({ statusMap }) => {
  // Extract status labels and values from the status map
  const labels = Object.keys(statusMap);
  const data = Object.values(statusMap);

  // Generate random colors for each status
  const getRandomColor = () => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
  const backgroundColors = labels.map(() => getRandomColor());

  // Create dataset for the chart
  const dataset = {
    labels: ['Status'],
    datasets: labels.map((label, index) => ({
      label: label,
      data: [data[index]],
      backgroundColor: [backgroundColors[index]],
    })),
  };

  // Chart options
  const options = {
    scales: {
      xAxes: [{ stacked: true }],
      yAxes: [{ stacked: true }],
    },
  };

  return <HorizontalBar data={dataset} options={options} />;
};

export default StackedBarChart;

```
