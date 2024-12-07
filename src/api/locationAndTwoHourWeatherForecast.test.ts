import { fetchLocationAndForecast } from './locationAndTwoHourWeatherForecast.js';

describe('Weather Forecast API', () => {
  it('should fetch weather data successfully', async () => {
    const weatherData = await fetchLocationAndForecast();
    
    // Test the main response structure
    expect(weatherData).toHaveProperty('locations');
    expect(weatherData).toHaveProperty('update_timestamp');
    expect(weatherData).toHaveProperty('timestamp');
    expect(weatherData).toHaveProperty('valid_period');
    
    // Test that locations is an array
    expect(Array.isArray(weatherData.locations)).toBe(true);
    expect(weatherData.locations.length).toBeGreaterThan(0);
    
    // Test the structure of a location object
    const firstLocation = weatherData.locations[0];
    expect(firstLocation).toHaveProperty('name');
    expect(firstLocation).toHaveProperty('latitude');
    expect(firstLocation).toHaveProperty('longitude');
    expect(firstLocation).toHaveProperty('forecast');
    
    // Test data types
    expect(typeof firstLocation.name).toBe('string');
    expect(typeof firstLocation.latitude).toBe('number');
    expect(typeof firstLocation.longitude).toBe('number');
    expect(typeof firstLocation.forecast).toBe('string');
    
    // Test timestamp formats
    expect(typeof weatherData.update_timestamp).toBe('string');
    expect(typeof weatherData.timestamp).toBe('string');
    expect(weatherData.valid_period).toHaveProperty('start');
    expect(weatherData.valid_period).toHaveProperty('end');
    expect(typeof weatherData.valid_period.start).toBe('string');
    expect(typeof weatherData.valid_period.end).toBe('string');
    
    // Log all weather data
    console.log('\nAll Weather Data:');
    console.log('=================');
    console.log(JSON.stringify(weatherData, null, 2));
    console.log('\nTotal Locations:', weatherData.locations.length);
  }, 10000); // Increased timeout for API call
});
