import React, { useEffect, useState } from 'react';
import FundingBarChart from './components/FundingBarChart';
import IndustryTrendChart from './components/IndustryTrendChart';
import './index.css'; // Import your styles

const App = () => {
  const [fundingData, setFundingData] = useState([]);

  useEffect(() => {
    fetch('/funding.json')
      .then(response => response.json())
      .then(data => {
        setFundingData(data);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  return (
    <div id="root">
      <h1>Funding Tracker</h1>
      <div className="chart-container">
        <FundingBarChart data={fundingData} />
      </div>
      <div className="chart-container">
        <IndustryTrendChart data={fundingData} />
      </div>
    </div>
  );
};

export default App;

