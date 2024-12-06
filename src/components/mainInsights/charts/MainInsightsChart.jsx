import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', power: 0 },
  { time: '04:00', power: 300 },
  { time: '08:00', power: 1200 },
  { time: '12:00', power: 1463 },
  { time: '16:00', power: 800 },
  { time: '20:00', power: 200 },
  { time: '23:59', power: 0 },
];

export function MainInsightsChart() {
  return (
    <div className="w-full h-[200px] md:h-[400px]">
      <h2 className="text-2xl md:text-3xl font-semibold mt-2 mb-4 text-center text-white">Daily Power Generation</h2>
      <div className="w-full h-full flex justify-center">
        <div className="w-full md:w-full h-full">
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{fontSize: 12, fill: '#FFFFFF'}} 
                height={40}
                stroke="#FFFFFF"
              />
              <YAxis 
                unit=" MW" 
                domain={[0, 'auto']}
                tick={{fontSize: 12, fill: '#FFFFFF'}} 
                width={60}
                tickFormatter={(value) => value === 0 ? '0' : value}
                stroke="#FFFFFF"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff'
                }}
                itemStyle={{
                  color: '#32CD32'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="power" 
                stroke="#39FF14"
                name="Power Output"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
