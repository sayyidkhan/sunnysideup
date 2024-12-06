import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', maxTemp: 28, minTemp: 24 },
  { time: '02:40', maxTemp: 27, minTemp: 23 },
  { time: '05:20', maxTemp: 26, minTemp: 22 },
  { time: '08:00', maxTemp: 29, minTemp: 25 },
  { time: '10:40', maxTemp: 32, minTemp: 27 },
  { time: '13:20', maxTemp: 34, minTemp: 28 },
  { time: '16:00', maxTemp: 33, minTemp: 27 },
  { time: '18:40', maxTemp: 31, minTemp: 26 },
  { time: '21:20', maxTemp: 29, minTemp: 25 },
  { time: '23:59', maxTemp: 28, minTemp: 24 },
];

export function MinMaxTemperatureChart() {
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
    <AreaChart data={data} margin={{ top: 10, right: 0, left: -40, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        tick={{ fontSize: 12, fill: '#FFFFFF' }}
        height={40}
        stroke="#FFFFFF" />
      <YAxis
        unit="°C"
        domain={[20, 40]}
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
      <Area
        type="monotone"
        dataKey="maxTemp"
        stroke="#39FF14"
        fill="#39FF14"
        fillOpacity={0.6}
        name="Max Temperature"
        strokeWidth={2} />
      <Area
        type="monotone"
        dataKey="minTemp"
        stroke="#FF0000"
        fill="#FF0000"
        fillOpacity={0.6}
        name="Min Temperature"
        strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>;
}
