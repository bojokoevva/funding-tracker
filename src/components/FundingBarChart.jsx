import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FundingBarChart = ({ data }) => {
  // Calculate total funding per year using 'amount'
  const totalsByYear = data.reduce((acc, item) => {
    acc[item.year] = (acc[item.year] || 0) + item.amount;
    return acc;
  }, {});

  const labels = Object.keys(totalsByYear);
  const values = Object.values(totalsByYear);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Funding',
        data: values,
        backgroundColor: [
          'rgba(173, 216, 230, 0.7)',
          'rgba(255, 182, 193, 0.7)',
          'rgba(144, 238, 144, 0.7)',
          'rgba(255, 255, 224, 0.7)',
          'rgba(221, 160, 221, 0.7)'
        ],
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Total Funding by Year',
        font: { size: 18 },
        color: '#333'
      }
    },
    scales: {
      x: { ticks: { color: '#666' }, grid: { color: '#f0f0f0' } },
      y: { ticks: { color: '#666' }, grid: { color: '#f0f0f0' } }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default FundingBarChart;


