import { fetchSGMainForecast, fetchTempOnly, fetchHumidityAndRadiationOnly } from './sg-forecast';

const ANGMOKIO_PARAMS = {
  latitude: 1.375,
  longitude: 103.839,
};

describe('Ang Mo Kio Temperature Forecast', () => {
  it('TEST AMK TEMP FORECAST', async () => {
    // First fetch all weather data
    const mainData = await fetchSGMainForecast(ANGMOKIO_PARAMS);
    expect(mainData).toBeDefined();
    
    // Then extract temperature data
    const tempData = fetchTempOnly(mainData);
    
    // Test location structure
    //   "location": {
    //     "latitude": 1.375,
    //     "longitude": 103.839,
    //     "timezone": "Asia/Singapore",
    //     "timezone_abbreviation": "+08",
    //     "elevation": 27
    //   },
    expect(tempData.location).toBeDefined();
    expect(tempData.location.latitude).toBeCloseTo(ANGMOKIO_PARAMS.latitude, 1);
    expect(tempData.location.longitude).toBeCloseTo(ANGMOKIO_PARAMS.longitude, 1);
    expect(tempData.location.timezone).toBe('Asia/Singapore');
    expect(tempData.location.timezone_abbreviation).toBe('+08');
    expect(typeof tempData.location.elevation).toBe('number');

    // Test metadata structure
    //   "metadata": {
    //     "generation_time_ms": 0.08296966552734375,
    //     "utc_offset_seconds": 28800
    //   },
    expect(tempData.metadata).toBeDefined();
    expect(typeof tempData.metadata.generation_time_ms).toBe('number');
    expect(tempData.metadata.utc_offset_seconds).toBe(28800);

    // Test units structure
    //   "units": {
    //     "temperature": "°C",
    //     "time": "iso8601"
    //   },
    expect(tempData.units.temperature).toBe('°C');
    expect(tempData.units.time).toBe('iso8601');
    
    // Test forecast data structure
    //   "temp_forecast": [
    //     {
    //       "date": "2024-12-08T00:00",
    //       "temperature_2m_min": 25.9,
    //       "temperature_2m_max": 32.4
    //     },
    //     ...
    //   ]
    expect(tempData.temp_forecast).toBeDefined();
    expect(tempData.temp_forecast.length).toBe(10); // Should have 10 days of data
    
    // Test first day data structure
    const firstDay = tempData.temp_forecast[0];
    expect(firstDay).toHaveProperty('date');
    expect(firstDay).toHaveProperty('temperature_2m_min');
    expect(firstDay).toHaveProperty('temperature_2m_max');
    expect(typeof firstDay.temperature_2m_min).toBe('number');
    expect(typeof firstDay.temperature_2m_max).toBe('number');
    expect(firstDay.temperature_2m_max).toBeGreaterThan(firstDay.temperature_2m_min);
    
    // Log sample of the data
    console.log('\nAng Mo Kio 10-Day Temperature Forecast:');
    console.log(JSON.stringify(tempData, null, 2));
  });
});

describe('Ang Mo Kio Humidity and Radiation', () => {
  it('TEST AMK HUMIDITY AND RADIATION', async () => {
    // First fetch all weather data
    const mainData = await fetchSGMainForecast(ANGMOKIO_PARAMS);
    expect(mainData).toBeDefined();
    
    // Then extract humidity and radiation data
    const humidityRadiation = fetchHumidityAndRadiationOnly(mainData);

    // Test location structure
    //   "location": {
    //     "latitude": 1.375,
    //     "longitude": 103.839,
    //     "timezone": "Asia/Singapore",
    //     "timezone_abbreviation": "+08",
    //     "elevation": 27
    //   },
    expect(humidityRadiation).toBeDefined();
    expect(humidityRadiation.location).toBeDefined();
    expect(humidityRadiation.location.latitude).toBeCloseTo(ANGMOKIO_PARAMS.latitude, 1);
    expect(humidityRadiation.location.longitude).toBeCloseTo(ANGMOKIO_PARAMS.longitude, 1);
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
    //       "time": "2024-12-08",
    //       "relativehumidity_2m": 78,
    //       "direct_radiation": 2786
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
    console.log('\nAng Mo Kio Daily Humidity and Radiation (Full 10-day forecast):');
    console.log(JSON.stringify(humidityRadiation, null, 2));
  });
});
