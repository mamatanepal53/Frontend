import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://new1q.azurewebsites.net/SensorReading')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  const chartData = [
    ['Index', 'Dry Value', 'Wet Value'],
    ...(Array.isArray(data) ? data.map((item, index) => [(index + 1).toString(), item.dryvalue, item.wetvalue]) : [])
  ];

  const options = {
    title: 'Dry and Wet Values Over Index',
    legend: { position: 'bottom' },
    hAxis: { title: 'Index' },
    vAxis: { title: 'Values' },
    colors: ['#FFB6C1', '#9370DB'], // Darker lavender color
    backgroundColor: '#F5F5F5', // Light grey background
    chartArea: { backgroundColor: '#FFF0F5' }, // Light pink chart area
    titleTextStyle: { color: '#696969', fontSize: 18 }, // Dark grey title
    legendTextStyle: { color: '#696969' }, // Dark grey legend text
  };

  return (
    <div>
      <header style={{ backgroundColor: '#FFB6C1', color: '#FFF', padding: '10px', textAlign: 'center' }}>
        <h1>Sensor Data Collection</h1>
      </header>
      <main>
        {error && <div>Error: {error.message}</div>}
        {data && (
          <Chart
            chartType="LineChart"
            width="800px"
            height="400px"
            data={chartData}
            options={options}
          />
        )}
      </main>
      <footer style={{ backgroundColor: '#FFB6C1', color: '#FFF', padding: '10px', textAlign: 'center' }}>
        <p>&copy; 2025 Mamata Sensor Data</p>
      </footer>
    </div>
  );
}

export default App;
