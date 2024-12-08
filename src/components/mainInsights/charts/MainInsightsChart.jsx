import React from 'react';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { HumidityAndTemperatureChart } from '../../common/charts/HumidityAndTemperatureChart';
import { MinMaxTemperatureChart } from '../../common/charts/MinMaxTemperatureChart';
import { useMediaQuery } from '@react-hook/media-query';

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

function MainInsightsTabs({ detailedWeatherData }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col w-full h-full md:px-4 md:py-4">
      <Tabs 
        aria-label="Options" 
        classNames={{
          tab: "text-[11px] md:text-base whitespace-normal h-[32px] md:h-auto py-1 md:py-2 min-h-[32px] md:min-h-[40px] bg-white/5 data-[selected=true]:bg-white/70 hover:bg-white/15 border border-white/20 rounded-lg focus:outline-none focus-visible:ring-0 data-[selected=true]:text-gray-800",
          tabList: "gap-2 md:gap-4 w-full flex justify-center",
          cursor: "w-full bg-white/30",
          panel: "pt-2",
          base: "w-full",
          tabContent: "group-data-[selected=true]:text-gray-800"
        }}
      >
        <Tab key="humidity_and_radiation" title="Humidity and Radiation">
          <Card className="bg-transparent shadow-none">
            <CardBody className="h-[300px] w-[110%] -ml-[5%] -mt-2 md:mt-0 md:w-full md:ml-0 md:h-[420px] px-4 md:px-8 pb-8">
              <HumidityAndTemperatureChart data={detailedWeatherData?.humidityAndRadiationMetadata} rotateXAxis={isMobile} />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="min_max_temperature" title="Min/Max Temperature">
          <Card className="bg-transparent shadow-none">
            <CardBody className="h-[300px] w-[110%] -ml-[5%] -mt-2 md:mt-0 md:w-full md:ml-0 md:h-[420px] px-4 md:px-8 pb-8">
              <MinMaxTemperatureChart data={detailedWeatherData?.temperature} rotateXAxis={isMobile} />
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}

export function MainInsightsChart({ detailedWeatherData }) {
  return (
    <div className="w-full h-[275px] -mt-3 md:mt-0 md:h-[450px]">
      <div className="w-full h-full scale-95 md:scale-100">
        <MainInsightsTabs detailedWeatherData={detailedWeatherData} />
      </div>
    </div>
  );
}
