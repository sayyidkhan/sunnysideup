import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NoDataFallBackUIForCharts } from './NoDataFallBackUIForCharts';

const dummyData = [
  { time: '2024-01-01T00:00', relativehumidity_2m: 85, direct_radiation: 320 },
  { time: '2024-01-02T00:00', relativehumidity_2m: 80, direct_radiation: 350 },
  { time: '2024-01-03T00:00', relativehumidity_2m: 82, direct_radiation: 310 },
  { time: '2024-01-04T00:00', relativehumidity_2m: 78, direct_radiation: 380 },
  { time: '2024-01-05T00:00', relativehumidity_2m: 83, direct_radiation: 340 },
  { time: '2024-01-06T00:00', relativehumidity_2m: 81, direct_radiation: 360 },
  { time: '2024-01-07T00:00', relativehumidity_2m: 84, direct_radiation: 330 },
];

export function HumidityAndTemperatureChart({ data, rotateXAxis, isMainInsights }) {
  // Check if data is valid
  const isDataValid = data?.radiation_and_humidity_forecast?.length > 0 && 
    data.radiation_and_humidity_forecast.every(item => 
      typeof item.relativehumidity_2m === 'number' && 
      typeof item.direct_radiation === 'number'
    );

  if (!isDataValid) {
    return <NoDataFallBackUIForCharts />;
  }

  // Check if we're in MainInsights by checking the data structure
  const isMainInsightsLocal = data?.radiation_and_humidity_forecast?.length > 0;

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

  // Use API data if available, otherwise fallback to dummy data
  const chartData = data?.radiation_and_humidity_forecast?.length > 0
    ? data.radiation_and_humidity_forecast
    : dummyData;

  return (
    <ResponsiveContainer width="100%" height={rotateXAxis ? "100%" : "85%"}>
      <ComposedChart data={chartData} margin={{ 
        top: 5, 
        right: 0, 
        left: -20, 
        bottom: 10 
      }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ 
            fontSize: rotateXAxis ? 11.5 : 16, 
            fill: '#FFFFFF', 
            angle: rotateXAxis ? 0 : -20, 
            textAnchor: rotateXAxis ? 'middle' : 'end' 
          }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
          tickFormatter={(value) => value.split('T')[0].replace(/-/g, '/')}
          height={45}
          dy={10}
          interval={rotateXAxis ? 2 : 0}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 12, fill: '#FFFFFF' }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
          label={{ value: 'Humidity (%)', angle: -90, position: 'insideLeft', fill: '#FFFFFF', style: { textAnchor: 'middle' } }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 12, fill: '#FFFFFF' }}
          tickLine={{ stroke: '#FFFFFF' }}
          axisLine={{ stroke: '#FFFFFF' }}
          label={{ value: 'Radiation (W/m²)', angle: 90, position: 'insideRight', fill: '#FFFFFF', style: { textAnchor: 'middle' } }}
        />
        <Tooltip {...tooltipStyle} />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            color: '#FFFFFF',
            position: 'relative',
            top: rotateXAxis ? "-47.5px" : "-12.5px",
            paddingTop: '0px'
          }}
          formatter={(value, entry) => {
            const color = entry.dataKey === 'direct_radiation' ? '#FF7F50' : '#39FF14';
            return <span style={{ color }}>{value}</span>;
          }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="relativehumidity_2m"
          stroke="#39FF14"
          strokeWidth={2}
          name="Humidity (Avg)"
          dot={false}
        />
        <Bar
          yAxisId="right"
          dataKey="direct_radiation"
          fill="#FF7F50"
          fillOpacity={0.6}
          name="Radiation (Sum)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}