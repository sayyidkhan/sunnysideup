import React from 'react';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { HumidityAndTemperatureChart } from '../../common/charts/HumidityAndTemperatureChart';
import { MinMaxTemperatureChart } from '../../common/charts/MinMaxTemperatureChart';

function DetailInsightsTabs() {
  return (
    <div className="flex flex-col w-[120%] -ml-[10%] md:w-full md:ml-0 h-full">
      <Tabs 
        aria-label="Options" 
        classNames={{
          tab: "text-[10px] md:text-sm text-gray-700 whitespace-normal h-[32px] md:h-[44px] py-1 md:py-2.5 min-h-[32px] md:min-h-[44px] bg-white/5 data-[selected=true]:bg-white/70 hover:bg-white/20 border border-white/10 rounded-lg focus:outline-none focus-visible:ring-0 data-[selected=true]:text-gray-800 data-[selected=true]:border-white/30",
          tabList: "gap-2 md:gap-3 xl:gap-4 w-full flex justify-center px-2 md:px-3 xl:px-4 2xl:px-6",
          cursor: "w-full bg-white/30",
          panel: "pt-2",
          base: "w-full",
          tabContent: "group-data-[selected=true]:text-gray-800"
        }}
      >
        <Tab key="humidity_and_radiation" title="Humidity and Radiation">
          <Card className="bg-transparent shadow-none">
            <CardBody className="h-[380px] md:h-[400px] px-2 md:px-8 pt-1 pb-2 md:pb-4 w-[105%] -ml-[2.5%] md:w-full md:ml-0">
              <HumidityAndTemperatureChart />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="min_max_temperature" title="Min/Max Temperature">
          <Card className="bg-transparent shadow-none">
            <CardBody className="h-[380px] md:h-[400px] px-2 md:px-8 pt-1 pb-2 md:pb-4 w-[105%] -ml-[2.5%] md:w-full md:ml-0">
              <MinMaxTemperatureChart />
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}

export function DetailInsightsChart() {
  return (
    <div className="w-full h-full">
      <DetailInsightsTabs />
    </div>
  );
}
