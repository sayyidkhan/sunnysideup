import React from 'react';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

const data = [
  { time: '00:00', power: 0, consumption: 200 },
  { time: '02:40', power: 150, consumption: 300 },
  { time: '05:20', power: 450, consumption: 450 },
  { time: '08:00', power: 1000, consumption: 800 },
  { time: '10:40', power: 1300, consumption: 1000 },
  { time: '13:20', power: 1463, consumption: 1200 },
  { time: '16:00', power: 1100, consumption: 900 },
  { time: '18:40', power: 600, consumption: 700 },
  { time: '21:20', power: 200, consumption: 400 },
  { time: '23:59', power: 0, consumption: 200 },
];

function HumidityAndTemperatureChart() {
  return <ResponsiveContainer width="100%" height="85%">
    <ComposedChart data={data} margin={{ top: 10, right: 0, left: -30, bottom: 10 }}>
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
        width={60}
        tickFormatter={(value) => value === 0 ? '0' : value}
        stroke="#FFFFFF" />
      <Tooltip
        contentStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: 'none',
          borderRadius: '4px',
          color: '#fff'
        }}
        itemStyle={{
          color: '#fff'
        }} />
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

function MainInsightsTabs() {
  return (
    <div className="flex flex-col max-w-[700px] mx-auto px-2 md:px-3 pt-0 md:pt-4">
      <Tabs aria-label="Options" classNames={{
        tab: "text-[11px] md:text-base whitespace-normal h-[32px] md:h-auto py-1 md:py-2 min-h-[32px] md:min-h-[40px]",
        tabList: "gap-2 md:gap-4",
        cursor: "w-full",
      }}>
        <Tab key="humidity_and_radiation" title="Humidity and Radiation">
          <Card className="bg-transparent shadow-none">
            <CardBody className="h-[250px] md:h-[380px]">
              <HumidityAndTemperatureChart />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="min_max_temperature" title="Min/Max Temperature">
          <Card className="bg-transparent shadow-none">
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>

      </Tabs>
    </div>  
  );
}

export function MainInsightsChart() {
  return (
    <div className="w-full h-[240px] md:h-[400px]">
      <div className="w-full h-full flex justify-center">
        <div className="w-full md:w-full h-full">
          <MainInsightsTabs />
        </div>
      </div>
    </div>
  );
}
