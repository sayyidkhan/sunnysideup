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

2. **Run a specific test file**
   ```bash
   # Replace with your test file path
   npm test src/api/locationAndTwoHourWeatherForecast.test.ts
   ```

3. **Run tests matching a pattern**
   ```bash
   # Replace "pattern" with your test name
   npm run test:pattern "should fetch weather data"
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

### Writing Tests

Test files should be created next to the file they are testing with a `.test.ts` or `.test.tsx` extension. For example:
```
src/
  api/
    locationAndTwoHourWeatherForecast.ts
    locationAndTwoHourWeatherForecast.test.ts
```

Example test structure:
```typescript
describe('Feature or Component Name', () => {
  it('should do something specific', () => {
    // Your test code
  });
});
```

To run a single test case during development, you can temporarily add `.only`:
```typescript
it.only('should do something specific', () => {
  // Only this test will run
});
