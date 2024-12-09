import { fetchSGHourlyRadiationForecast } from './sg-forecast-hourly';

describe('Singapore Hourly Radiation Forecast', () => {
  it('should fetch and validate radiation data', async () => {
    // Fetch the radiation data
    const data = await fetchSGHourlyRadiationForecast();
    expect(data).toBeDefined();

    // Test data structure
    expect(data).toHaveProperty('last_updated_date');
    expect(data).toHaveProperty('last_updated_time');
    expect(data).toHaveProperty('timezone_abbreviation');
    expect(data).toHaveProperty('radiation_current_hour');
    expect(data).toHaveProperty('radiation_peak_hour');
    expect(data).toHaveProperty('radiation_sum');

    // Test data types
    expect(typeof data.last_updated_date).toBe('string');
    expect(typeof data.last_updated_time).toBe('string');
    expect(typeof data.timezone_abbreviation).toBe('string');
    expect(typeof data.radiation_current_hour).toBe('number');
    expect(typeof data.radiation_peak_hour).toBe('number');
    expect(typeof data.radiation_sum).toBe('number');

    // Validate datetime format (YYYY-MM-DDThh:mm:ss)
    expect(data.last_updated_date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    
    // Validate time format (HH:00)
    expect(data.last_updated_time).toMatch(/^([0-1][0-9]|2[0-3]):00$/);

    // Log the response
    console.log('\nRadiation Data:');
    console.log('----------------------------------------');
    console.log('Last Updated Date:', data.last_updated_date);
    console.log('Last Updated Time:', data.last_updated_time);
    console.log('Timezone:', data.timezone_abbreviation);
    console.log('Current Hour Radiation:', data.radiation_current_hour.toFixed(2), 'W/m²');
    console.log('Peak Hour Radiation:', data.radiation_peak_hour.toFixed(2), 'W/m²');
    console.log('Total Daily Radiation:', data.radiation_sum.toFixed(2), 'W/m²');
    console.log('----------------------------------------');
  });
});
