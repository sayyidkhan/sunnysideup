import { fetchLocationAndForecast } from './locationAndTwoHourWeatherForecast.js';

describe('Weather Forecast API', () => {
  // To run only this test, uncomment the .only
  // it.only('should fetch weather data successfully', async () => {
  it('should fetch weather data successfully', async () => {
    const weatherData = await fetchLocationAndForecast();
    
    // Test that we get an array of locations
    expect(Array.isArray(weatherData)).toBe(true);
    expect(weatherData.length).toBeGreaterThan(0);
    
    // Test the structure of a location object
    const firstLocation = weatherData[0];
    expect(firstLocation).toHaveProperty('name');
    expect(firstLocation).toHaveProperty('latitude');
    expect(firstLocation).toHaveProperty('longitude');
    expect(firstLocation).toHaveProperty('forecast');
    
    // Test data types
    expect(typeof firstLocation.name).toBe('string');
    expect(typeof firstLocation.latitude).toBe('number');
    expect(typeof firstLocation.longitude).toBe('number');
    expect(typeof firstLocation.forecast).toBe('string');
    
    // Log sample data for manual verification
    console.log('Sample location data:', firstLocation);
  }, 10000); // Increased timeout for API call
  
  it('should have valid coordinate ranges for Singapore', async () => {
    const weatherData = await fetchLocationAndForecast();
    
    weatherData.forEach(location => {
      // Singapore's approximate coordinate ranges
      expect(location.latitude).toBeGreaterThan(1.2); // South of Singapore
      expect(location.latitude).toBeLessThan(1.5); // North of Singapore
      expect(location.longitude).toBeGreaterThan(103.6); // West of Singapore
      expect(location.longitude).toBeLessThan(104.1); // East of Singapore (adjusted for actual data)
    });
  }, 10000);
});
