import { fetchDailyLocationAndForecast } from './sg-forecast-daily-location';

describe('Singapore 2-Hour Weather Forecast', () => {
  it('TEST LOCATION AND FORECAST', async () => {
    // First fetch the weather data
    const weatherData = await fetchDailyLocationAndForecast();
    expect(weatherData).toBeDefined();
    
    // Test location structure
    //   "locations": [
    //     {
    //       "name": "Ang Mo Kio",
    //       "latitude": 1.375,
    //       "longitude": 103.839,
    //       "forecast": "Cloudy"
    //     },
    //     ...
    //   ]
    expect(Array.isArray(weatherData.locations)).toBe(true);
    expect(weatherData.locations.length).toBeGreaterThan(0);
    
    // Test first location structure
    const firstLocation = weatherData.locations[0];
    expect(firstLocation).toHaveProperty('name');
    expect(firstLocation).toHaveProperty('latitude');
    expect(firstLocation).toHaveProperty('longitude');
    expect(firstLocation).toHaveProperty('forecast');
    
    // Test location data types
    expect(typeof firstLocation.name).toBe('string');
    expect(typeof firstLocation.latitude).toBe('number');
    expect(typeof firstLocation.longitude).toBe('number');
    expect(typeof firstLocation.forecast).toBe('string');
    
    // Test timestamp and period structure
    //   "update_timestamp": "2024-01-01T12:00:00+08:00",
    //   "timestamp": "2024-01-01T12:00:00+08:00",
    //   "valid_period": {
    //     "start": "2024-01-01T12:00:00+08:00",
    //     "end": "2024-01-01T14:00:00+08:00"
    //   }
    expect(typeof weatherData.update_timestamp).toBe('string');
    expect(typeof weatherData.timestamp).toBe('string');
    expect(weatherData.valid_period).toHaveProperty('start');
    expect(weatherData.valid_period).toHaveProperty('end');
    expect(typeof weatherData.valid_period.start).toBe('string');
    expect(typeof weatherData.valid_period.end).toBe('string');
    
    // Log sample of the data
    console.log('\nSingapore 2-Hour Weather Forecast:');
    console.log(JSON.stringify({
      ...weatherData,
      locations: weatherData.locations.slice(0, 5) // Show first 5 locations only
    }, null, 2));
    console.log('\nTotal Locations:', weatherData.locations.length);
  }, 10000); // Increased timeout for API call
});
