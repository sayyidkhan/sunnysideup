# React + Vite + TypeScript + ESLint + Prettier + TailwindCSS

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Testing

The project uses Jest for testing. Test files are located next to the files they are testing with the `.test.ts` or `.test.tsx` extension.

### Running Tests

There are several ways to run tests:

1. **Run all tests**
   ```bash
   npm test
   ```

2. **Run all weather API tests**
   ```bash
   npx jest src/api/weather
   ```

3. **Run specific test files**
   ```bash
   # Singapore 10-day forecast
   npx jest src/api/weather/sg-forecast-singapore.test.ts
   
   # Ang Mo Kio 10-day forecast
   npx jest src/api/weather/sg-forecast-angmokio.test.ts
   
   # Singapore 2-hour location forecast
   npx jest src/api/weather/sg-location-singapore.test.ts
   ```

4. **Run tests in watch mode**
   ```bash
   npm run test:watch
   ```
   In watch mode, you can:
   - Press `f` to run only failed tests
   - Press `p` to filter by a filename regex pattern
   - Press `t` to filter by a test name regex pattern
   - Press `q` to quit watch mode

### Weather API Tests

The project includes several test files for weather-related functionality:

1. **10-Day Weather Forecast Tests**
   - `sg-forecast-singapore.test.ts`: Tests Singapore's 10-day weather forecast
   - `sg-forecast-angmokio.test.ts`: Tests Ang Mo Kio's 10-day weather forecast
   
   These tests verify:
   - Temperature forecasts (min/max)
   - Humidity levels
   - Solar radiation data
   - Location data accuracy
   - Data structure and types

2. **2-Hour Location Forecast Tests**
   - `sg-location-singapore.test.ts`: Tests the 2-hour weather forecast for all Singapore locations
   
   This test verifies:
   - Weather data for 47 locations across Singapore
   - Location coordinates
   - Current weather conditions
   - Forecast timestamps and validity periods

### Writing Tests

Test files should be created next to the file they are testing with a `.test.ts` or `.test.tsx` extension. For example:
```
src/
  api/
    weather/
      sg-forecast.ts
      sg-forecast-singapore.test.ts
      sg-forecast-angmokio.test.ts
      sg-location.ts
      sg-location-singapore.test.ts
```

Example test structure:
```typescript
describe('Feature Name', () => {
  it('TEST DESCRIPTION', async () => {
    // First fetch the data
    const data = await fetchSomeData();
    
    // Test data structure with example JSON
    //   "exampleField": {
    //     "key": "value"
    //   }
    expect(data.exampleField).toBeDefined();
    
    // Test specific values
    expect(data.exampleField.key).toBe('value');
    
    // Log sample data
    console.log('Sample Data:', JSON.stringify(data, null, 2));
  });
});
```

### Best Practices

1. **Comment Structure**
   - Include example JSON structures in comments before testing them
   - Use clear section headers (e.g., "Test location structure", "Test metadata")
   - Add helpful console logs for debugging

2. **API Testing**
   - Test both successful and error cases
   - Verify data types and structures
   - Check for required fields
   - Test with different parameters when applicable

3. **Timeouts**
   - Add longer timeouts for API calls if needed:
     ```typescript
     it('TEST NAME', async () => {
       // ... test code
     }, 10000); // 10 second timeout
     ```
