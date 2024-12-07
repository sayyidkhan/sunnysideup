import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

const data = [
  { time: '00:00', power: 0, consumption: 200 },
  { time: '02:40', power: 100, consumption: 300 },
  { time: '05:20', power: 300, consumption: 400 },
  { time: '08:00', power: 600, consumption: 500 },
  { time: '10:40', power: 800, consumption: 600 },
  { time: '13:20', power: 1000, consumption: 700 },
  { time: '16:00', power: 800, consumption: 500 },
  { time: '18:40', power: 400, consumption: 400 },
  { time: '21:20', power: 200, consumption: 300 },
  { time: '23:59', power: 0, consumption: 200 },
];

export function HumidityAndTemperatureChart() {
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

  return <ResponsiveContainer width="100%" height="85%">
    <ComposedChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        tick={{ fontSize: 12, fill: '#FFFFFF' }}
        height={40}
        stroke="#FFFFFF" />
      <YAxis
        unit=" MW"
        domain={[0, 'auto']}
        tick={{ fontSize: 12, fill: '#FFFFFF' }}
        width={85}
        tickFormatter={(value) => value === 0 ? '0' : value}
        stroke="#FFFFFF" />
      <Tooltip
        wrapperClassName="hidden md:block"
        contentStyle={tooltipStyle.contentStyle}
        itemStyle={tooltipStyle.itemStyle}
        labelStyle={tooltipStyle.labelStyle}
      />
      <Legend 
        verticalAlign="bottom"
        height={30}
      />
      <Bar
        dataKey="consumption"
        fill="#FF6B6B"
        name="Power Consumption"
        opacity={0.8} />
      <Line
        type="monotone"
        dataKey="power"
        stroke="#39FF14"
        name="Power Generation"
        strokeWidth={2}
        dot={true} />
    </ComposedChart>
  </ResponsiveContainer>;
}