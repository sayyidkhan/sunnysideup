import { Suspense, lazy } from 'react';
import './App.css';

const MyMap = lazy(() => import('./components/MyMap'));

function App() {
  return (
    <div className="app">
      <div className="map-container">
        <Suspense fallback={<div>Loading map...</div>}>
          <MyMap />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
