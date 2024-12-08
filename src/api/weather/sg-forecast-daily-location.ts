import axios from 'axios';
import { Location } from './types';

interface LabelLocation {
  latitude: number;
  longitude: number;
}

interface AreaMetadata {
  name: string;
  label_location: LabelLocation;
}

interface Forecast {
  area: string;
  forecast: string;
}

interface ValidPeriod {
  start: string;
  end: string;
}

interface WeatherForecastResponse {
  area_metadata: AreaMetadata[];
  items: Array<{
    update_timestamp: string;
    timestamp: string;
    valid_period: ValidPeriod;
    forecasts: Forecast[];
  }>;
}

interface LocationForecast {
  name: string;
  latitude: number;
  longitude: number;
  forecast: string;
}

interface WeatherData {
  locations: LocationForecast[];
  update_timestamp: string;
  timestamp: string;
  valid_period: ValidPeriod;
}

const BASE_URL = 'https://api.data.gov.sg/v1/environment';

export const fetchDailyLocationAndForecast = async (): Promise<WeatherData> => {
  try {
    // Fetch 2-hour weather forecast
    const forecastResponse = await axios.get<WeatherForecastResponse>(`${BASE_URL}/2-hour-weather-forecast`);
    
    if (!forecastResponse.data || !forecastResponse.data.area_metadata || !forecastResponse.data.items) {
      throw new Error('Invalid forecast data structure');
    }

    const areaMetadata = forecastResponse.data.area_metadata;
    const item = forecastResponse.data.items[0];
    const forecasts = item.forecasts;

    // Combine location data with forecasts
    const locationForecasts = areaMetadata.map(area => {
      const forecast = forecasts.find(f => f.area === area.name);
      return {
        name: area.name,
        latitude: area.label_location.latitude,
        longitude: area.label_location.longitude,
        forecast: forecast ? forecast.forecast : 'No forecast available'
      };
    });

    return {
      locations: locationForecasts,
      update_timestamp: item.update_timestamp,
      timestamp: item.timestamp,
      valid_period: item.valid_period
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
