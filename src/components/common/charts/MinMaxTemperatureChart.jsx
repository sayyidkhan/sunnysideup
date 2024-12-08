import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NoDataFallBackUIForCharts } from './NoDataFallBackUIForCharts';

const dummyData = [
  { date: '2024-01-01', min: 24, max: 32 },
  { date: '2024-01-02', min: 23, max: 31 },
  { date: '2024-01-03', min: 25, max: 33 },
  { date: '2024-01-04', min: 22, max: 30 },
  { date: '2024-01-05', min: 24, max: 31 },
  { date: '2024-01-06', min: 23, max: 32 },
  { date: '2024-01-07', min: 25, max: 34 },
];

export function MinMaxTemperatureChart({ data }) {
  console.log('MinMaxTemperatureChart received data:', data);

  // Check if data is valid
  const isDataValid = data?.temp_forecast?.length > 0 && 
    data.temp_forecast.every(item => 
      typeof item.temperature_2m_min === 'number' && 
      typeof item.temperature_2m_max === 'number'
    );

  if (!isDataValid) {
    return <NoDataFallBackUIForCharts />;
  }

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      border: 'none',
      borderRadius: '4px',
      color: '#fff',
      fontSize: '14px',
      padding: '12px',
      maxWidth: '300px'
    },
    itemStyle: {
      color: '#fff',
      fontSize: '14px',
      padding: '4px 0'
    },
    labelStyle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px'
    }
  };

  // If no data is provided, use dummy data
  const chartData = data?.temp_forecast?.length > 0
    ? data.temp_forecast.map(item => ({
        date: item.date,
        min: item.temperature_2m_min,
        max: item.temperature_2m_max
      }))
    : dummyData;
  
  console.log('Final chartData:', chartData);

  return (
    <ResponsiveContainer width="100%" height="85%">
      <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#FFFFFF' }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
          tickFormatter={(value) => value.split('T')[0]}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#FFFFFF' }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
          label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#FFFFFF', style: { textAnchor: 'middle' } }}
        />
        <Tooltip {...tooltipStyle} />
        <Legend 
          wrapperStyle={{ color: '#FFFFFF' }} 
          formatter={(value, entry) => {
            const color = entry.dataKey === 'max' ? '#FFB6C1' : '#39FF14';
            return <span style={{ color }}>{value}</span>;
          }}
        />
        <Area
          type="monotone"
          dataKey="max"
          stroke="#FF7F50"
          fill="#FF7F50"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Max Temperature"
        />
        <Area
          type="monotone"
          dataKey="min"
          stroke="#39FF14"
          fill="#39FF14"
          fillOpacity={0.3}
          strokeWidth={2}
          name="Min Temperature"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
