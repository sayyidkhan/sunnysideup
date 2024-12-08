import React, { useEffect, useState } from 'react';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { HumidityAndTemperatureChart } from '../../common/charts/HumidityAndTemperatureChart';
import { MinMaxTemperatureChart } from '../../common/charts/MinMaxTemperatureChart';
import { fetchSGMainForecast, fetchHumidityAndRadiationOnly, fetchTempOnly } from '../../../api/weather/sg-forecast';

function DetailInsightsTabs({ location }) {
  const [humidityAndRadiationMetadata, setHumidityAndRadiationMetadata] = useState({
    humidityAndRadiationMetadata: null,
    temperature: null
  });

  useEffect(() => {
    const fetchHumidityAndRadiationData = async () => {
      if (!location?.lat || !location?.lng) return;

      try {
        console.log('Fetching data for location:', location);
        const mainData = await fetchSGMainForecast({
          latitude: location.lat,
          longitude: location.lng
        });
        console.log('Received mainData:', mainData);

        const tempData = fetchTempOnly(mainData);
        console.log('Temperature data:', tempData);

        setHumidityAndRadiationMetadata({
          humidityAndRadiationMetadata: fetchHumidityAndRadiationOnly(mainData),
          temperature: tempData
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchHumidityAndRadiationData();
  }, [location?.lat, location?.lng]);

  console.log('Current humidityAndRadiationMetadata:', humidityAndRadiationMetadata);

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
              <HumidityAndTemperatureChart data={humidityAndRadiationMetadata.humidityAndRadiationMetadata} />
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="min_max_temperature" title="Min/Max Temperature">
          <Card className="bg-transparent shadow-none">
            <CardBody className="h-[380px] md:h-[400px] px-2 md:px-8 pt-1 pb-2 md:pb-4 w-[105%] -ml-[2.5%] md:w-full md:ml-0">
              <MinMaxTemperatureChart data={humidityAndRadiationMetadata.temperature} />
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}

export function DetailInsightsChart({ location }) {
  return (
    <div className="w-full h-full">
      <DetailInsightsTabs location={location} />
    </div>
  );
}
