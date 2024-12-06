import { Suspense, lazy } from 'react';
import './App.css';

const WeatherMap = lazy(() => import('./components/WeatherMap'));

function App() {
  return (
    <div className="app w-full h-screen">
      <div className="map-container w-full h-full">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            Loading map...
          </div>
        }>
          <WeatherMap />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
