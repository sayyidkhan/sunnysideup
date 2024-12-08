import axios from 'axios';
import { MAP_CONFIG } from '../../constants/data';
import { Location, Metadata } from './types';

// ==========================================
// TYPE DEFINITIONS
// ==========================================
interface ForecastParams {
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    direct_radiation: string;
  };
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    direct_radiation: number[];
    temperature_2m: number[];
  };
}

interface WeatherForecastResponse {
  location: Location;
  metadata: Metadata;
  units: {
    temperature: string;
    time: string;
  };
  temp_forecast: Array<{
    date: string;
    temperature_2m_min: number;
    temperature_2m_max: number;
  }>;
}

interface HumidityAndRadiationResponse {
  location: Location;
  metadata: Metadata;
  units: {
    humidity: string;
    radiation: string;
    time: string;
  };
  radiation_and_humidity_forecast: Array<{
    time: string;
    relativehumidity_2m: number;
    direct_radiation: number;
  }>;
}

// ==========================================
// CONFIGURATION
// ==========================================
const DEFAULT_PARAMS = {
  latitude: MAP_CONFIG.DEFAULT_CENTER[0],
  longitude: MAP_CONFIG.DEFAULT_CENTER[1],
  timezone: MAP_CONFIG.TIMEZONE,
};

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast';

// ==========================================
// MAIN FUNCTIONS
// ==========================================

/**
 * Main function to fetch all Singapore weather forecast data from Open-Meteo API
 */
export const fetchSGMainDailyForecast = async (params: ForecastParams = {}): Promise<OpenMeteoResponse> => {
  try {
    const {
      latitude = DEFAULT_PARAMS.latitude,
      longitude = DEFAULT_PARAMS.longitude,
      timezone = DEFAULT_PARAMS.timezone,
    } = params;

    const response = await axios.get<OpenMeteoResponse>(OPEN_METEO_URL, {
      params: {
        latitude,
        longitude,
        timezone,
        daily: ['temperature_2m_max', 'temperature_2m_min'],
        hourly: ['relativehumidity_2m', 'direct_radiation', 'temperature_2m'],
        forecast_days: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Function to extract humidity and radiation data from the main response
 */
export const fetchDailyHumidityAndRadiation = (data: OpenMeteoResponse): HumidityAndRadiationResponse => {
  // Aggregate hourly data into daily averages for humidity and sum for radiation
  const dailyData = [];
  for (let i = 0; i < data.hourly.time.length; i += 24) {
    // Get 24 hours of data for each day
    const dayHumidity = data.hourly.relativehumidity_2m.slice(i, i + 24);
    const dayRadiation = data.hourly.direct_radiation.slice(i, i + 24);

    // Calculate daily average for humidity and sum for radiation
    const avgHumidity = Math.round(
      dayHumidity.reduce((sum, val) => sum + val, 0) / dayHumidity.length
    );
    const sumRadiation = Math.round(
      dayRadiation.reduce((sum, val) => sum + val, 0)
    );

    // Extract just the date part (YYYY-MM-DD) from the timestamp
    const date = data.hourly.time[i].split('T')[0];

    dailyData.push({
      time: date,
      relativehumidity_2m: avgHumidity,
      direct_radiation: sumRadiation,
    });
  }

  return {
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      elevation: data.elevation
    },
    metadata: {
      generation_time_ms: data.generationtime_ms,
      utc_offset_seconds: data.utc_offset_seconds
    },
    units: {
      humidity: data.hourly_units.relativehumidity_2m,
      radiation: data.hourly_units.direct_radiation,
      time: data.hourly_units.time,
    },
    radiation_and_humidity_forecast: dailyData,
  };
};

/**
 * Function to extract temperature data from the main response
 */
export const fetchDailyTemp = (data: OpenMeteoResponse): WeatherForecastResponse => {
  // Get only the first 10 days of data (240 hours -> 10 days)
  const dailyData = [];
  for (let i = 0; i < data.hourly.time.length; i += 24) {
    const dayData = {
      date: data.hourly.time[i],
      temperature_2m_min: Math.min(...data.hourly.temperature_2m.slice(i, i + 24)),
      temperature_2m_max: Math.max(...data.hourly.temperature_2m.slice(i, i + 24)),
    };
    dailyData.push(dayData);
  }

  return {
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      elevation: data.elevation
    },
    metadata: {
      generation_time_ms: data.generationtime_ms,
      utc_offset_seconds: data.utc_offset_seconds
    },
    units: {
      temperature: data.hourly_units.temperature_2m,
      time: data.hourly_units.time,
    },
    temp_forecast: dailyData,
  };
};
