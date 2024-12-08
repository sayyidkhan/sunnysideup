import { fetchSGMainForecast, fetchTempOnly, fetchHumidityAndRadiationOnly } from './sgMainForecast.js';

jest.setTimeout(15000); // Set timeout to 15 seconds for all tests

describe('Singapore Temperature Forecast', () => {
  it('TEST TEMP FORECAST', async () => {
    // First fetch all weather data
    const mainData = await fetchSGMainForecast();
    expect(mainData).toBeDefined();
    
    // Then extract temperature data
    const tempForecast = fetchTempOnly(mainData);
    
    // Test that we get a valid response structure
    // sample response for temperature
    // {
    //   "location": {
    //     "latitude": 1.125,
    //     "longitude": 104,
    //     "timezone": "Asia/Singapore",
    //     "timezone_abbreviation": "+08",
    //     "elevation": 27
    //   },
    //   "metadata": {
    //     "generation_time_ms": 7.79497623443604,
    //     "utc_offset_seconds": 28800
    //   },
    //   "units": {
    //     "temperature": "°C",
    //     "time": "iso8601"
    //   },
    //   "temp_forecast": [
    //     {
    //       "date": "2024-12-08T00:00",
    //       "temperature_2m_min": 26.8,
    //       "temperature_2m_max": 31.5
    //     },
    //     ...
    //   ]
    // }
    expect(tempForecast).toBeDefined();
    expect(tempForecast.location).toBeDefined();
    expect(tempForecast.location.timezone).toBe('Asia/Singapore');
    expect(tempForecast.location.timezone_abbreviation).toBe('+08');
    expect(typeof tempForecast.location.elevation).toBe('number');
    expect(tempForecast.metadata).toBeDefined();
    expect(typeof tempForecast.metadata.generation_time_ms).toBe('number');
    expect(tempForecast.metadata.utc_offset_seconds).toBe(28800); // +8 hours in seconds
    // Test units
    expect(tempForecast.units.temperature).toBe('°C');
    expect(tempForecast.units.time).toBe('iso8601');
    // Test forecast data
    expect(tempForecast.temp_forecast).toBeDefined();
    expect(tempForecast.temp_forecast.length).toBe(10);
    
    // Test first day forecast structure
    const todayForecast = tempForecast.temp_forecast[0];
    expect(todayForecast).toHaveProperty('date');
    expect(todayForecast).toHaveProperty('temperature_2m_min');
    expect(todayForecast).toHaveProperty('temperature_2m_max');
    expect(typeof todayForecast.temperature_2m_min).toBe('number');
    expect(typeof todayForecast.temperature_2m_max).toBe('number');
    
    // Log the forecast data
    console.log('\nSingapore 10-Day Temperature Forecast:');
    console.log(JSON.stringify(tempForecast, null, 2));
  });
});

describe('Singapore Humidity and Radiation', () => {
  it('TEST HUMIDITY AND RADIATION', async () => {
    // First fetch all weather data
    const mainData = await fetchSGMainForecast();
    expect(mainData).toBeDefined();
    
    // Then extract humidity and radiation data
    const humidityRadiation = fetchHumidityAndRadiationOnly(mainData);

    // Test location structure
    //   "location": {
    //     "latitude": 1.125,
    //     "longitude": 104,
    //     "timezone": "Asia/Singapore",
    //     "timezone_abbreviation": "+08",
    //     "elevation": 27
    //   },
    expect(humidityRadiation).toBeDefined();
    expect(humidityRadiation.location).toBeDefined();
    expect(humidityRadiation.location.timezone).toBe('Asia/Singapore');
    expect(humidityRadiation.location.timezone_abbreviation).toBe('+08');
    expect(typeof humidityRadiation.location.elevation).toBe('number');

    // Test metadata structure
    //   "metadata": {
    //     "generation_time_ms": 7.79497623443604,
    //     "utc_offset_seconds": 28800
    //   },
    expect(humidityRadiation.metadata).toBeDefined();
    expect(typeof humidityRadiation.metadata.generation_time_ms).toBe('number');
    expect(humidityRadiation.metadata.utc_offset_seconds).toBe(28800);

    // Test units structure
    //   "units": {
    //     "humidity": "%",
    //     "radiation": "W/m²",
    //     "time": "iso8601"
    //   },
    expect(humidityRadiation.units.humidity).toBe('%');
    expect(humidityRadiation.units.radiation).toBe('W/m²');
    expect(humidityRadiation.units.time).toBe('iso8601');
    
    // Test forecast data structure
    //   "radiation_and_humidity_forecast": [
    //     {
    //       "time": "2024-11-01",
    //       "relativehumidity_2m": 84,
    //       "direct_radiation": 150
    //     },
    //     ...
    //   ]
    expect(humidityRadiation.radiation_and_humidity_forecast).toBeDefined();
    expect(humidityRadiation.radiation_and_humidity_forecast.length).toBe(10); // Should have 10 days of data
    
    // Test first day data structure
    const firstDay = humidityRadiation.radiation_and_humidity_forecast[0];
    expect(firstDay).toHaveProperty('time');
    expect(firstDay).toHaveProperty('relativehumidity_2m');
    expect(firstDay).toHaveProperty('direct_radiation');
    expect(typeof firstDay.relativehumidity_2m).toBe('number');
    expect(typeof firstDay.direct_radiation).toBe('number');
    // Verify date format (YYYY-MM-DD)
    expect(firstDay.time).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    
    // Log sample of the data
    console.log('\nSingapore Daily Humidity and Radiation (Full 10-day forecast):');
    console.log(JSON.stringify({
      ...humidityRadiation,
      radiation_and_humidity_forecast: humidityRadiation.radiation_and_humidity_forecast // Show all 10 days
    }, null, 2));
  });
});
