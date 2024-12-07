import axios from 'axios';

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

interface WeatherForecastResponse {
  area_metadata: AreaMetadata[];
  items: Array<{
    forecasts: Forecast[];
  }>;
}

interface LocationForecast {
  name: string;
  latitude: number;
  longitude: number;
  forecast: string;
}

const BASE_URL = 'https://api.data.gov.sg/v1/environment';

export const fetchLocationAndForecast = async (): Promise<LocationForecast[]> => {
  try {
    // Fetch 2-hour weather forecast
    const forecastResponse = await axios.get<WeatherForecastResponse>(`${BASE_URL}/2-hour-weather-forecast`);
    
    if (!forecastResponse.data || !forecastResponse.data.area_metadata || !forecastResponse.data.items) {
      throw new Error('Invalid forecast data structure');
    }

    const areaMetadata = forecastResponse.data.area_metadata;
    const forecasts = forecastResponse.data.items[0].forecasts;

    // Combine location data with forecasts
    const locationForecasts: LocationForecast[] = areaMetadata.map(area => {
      const forecast = forecasts.find(f => f.area === area.name);
      return {
        name: area.name,
        latitude: area.label_location.latitude,
        longitude: area.label_location.longitude,
        forecast: forecast ? forecast.forecast : 'No forecast available'
      };
    });

    return locationForecasts;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
