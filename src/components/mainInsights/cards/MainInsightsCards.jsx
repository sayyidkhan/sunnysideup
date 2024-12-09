import React, { useEffect, useState } from 'react';
import { fetchSGHourlyRadiationForecast } from '../../../api/weather/sg-forecast-hourly';
import { getTodayAverageMegaWatts, formatDateTime } from '../../../utils/radiationCalculator';

export function MainInsightsCards() {
  const [radiationData, setRadiationData] = useState(null);

  useEffect(() => {
    const fetchRadiationData = async () => {
      try {
        const data = await fetchSGHourlyRadiationForecast();
        setRadiationData(data);
      } catch (error) {
        console.error('Error fetching radiation data:', error);
      }
    };

    fetchRadiationData();
    // Fetch data every 5 minutes
    const interval = setInterval(fetchRadiationData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full gap-2">
      <div className="flex-1 performance-card p-3 md:p-4">
        <div className="card-header">
          <h2 className="text-xl md:text-4xl font-semibold mb-2">Assets</h2>
          <div className="invisible text-sm text-gray-300 mb-3">Placeholder</div>
        </div>
        <div className="card-content">
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {radiationData?.radiation_sum.toFixed(2) || 'Loading...'}
          </div>
          <div>
            <span className="text-3xl md:text-4xl">
              {radiationData?.radiation_peak_hour.toFixed(2) || 'Loading...'}
            </span>
            <span className="text-xs md:text-lg ml-1">MWp</span>
          </div>
        </div>
      </div>

      <div className="flex-1 performance-card p-3 md:p-4">
        <div className="card-header">
          <h2 className="text-xl md:text-4xl font-semibold mb-2">Today's Performance</h2>
          <div className="text-xs md:text-sm text-white mb-3">
            <div className="flex flex-col md:flex-row md:gap-1">
              <span>Last Updated</span>
              <span>{radiationData ? formatDateTime(radiationData.last_updated_date) : 'Loading...'}</span>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="mb-2">
            <span className="text-4xl md:text-5xl font-bold">
              {radiationData ? getTodayAverageMegaWatts(radiationData.radiation_sum).toLocaleString('en-US') : 'Loading...'}
            </span>
            <span className="text-base md:text-lg ml-1">MWh</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl">
              {radiationData?.radiation_current_hour.toFixed(2) || 'Loading...'}
            </span>
            <span className="text-base md:text-lg ml-1">MW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
