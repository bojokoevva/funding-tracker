import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IndustryTrendChart = ({ data }) => {
  const industryYearData = {};

  // Group data by industry and year using 'amount'
  data.forEach(item => {
    const { industry, year, amount } = item;
    if (!industryYearData[industry]) {
      industryYearData[industry] = {};
    }
    industryYearData[industry][year] = (industryYearData[industry][year] || 0) + amount;
  });

  const years = Array.from(new Set(data.map(item => item.year))).sort();

  const pastelColors = [
    'rgba(255, 179, 186, 0.8)',
    'rgba(255, 223, 186, 0.8)',
    'rgba(186, 255, 201, 0.8)',
    'rgba(186, 225, 255, 0.8)',
    'rgba(221, 160, 221, 0.8)'
  ];

  const datasets = Object.entries(industryYearData).map(([industry, yearData], index) => ({
    label: industry,
    data: years.map(year => yearData[year] || 0),
    borderColor: pastelColors[index % pastelColors.length],
    backgroundColor: pastelColors[index % pastelColors.length],
    fill: false,
    tension: 0.3,
    pointRadius: 4
  }));

  const chartData = {
    labels: years,
    datasets: datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#444', font: { size: 12 } }
      },
      title: {
        display: true,
        text: 'Funding Trends by Industry',
        font: { size: 18 },
        color: '#333'
      }
    },
    scales: {
      x: { ticks: { color: '#666' }, grid: { color: '#f0f0f0' } },
      y: { ticks: { color: '#666' }, grid: { color: '#f0f0f0' } }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default IndustryTrendChart;


