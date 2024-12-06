import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import { MAP_CONFIG } from '../constants/data';
import { SearchBarAndZoomControls, RightSideIcons } from './common/SearchBar';
import { MainInsightsDashboard } from './mainInsights/MainInsightsDashboard';

export default function WeatherMap() {
  const [showDashboard, setShowDashboard] = useState(true);

  const toggleDashboard = () => {
    setShowDashboard(prev => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        attributionControl={false}
        zoomControl={false}
        className="md:pt-0 pt-4"
      >
        <SearchBarAndZoomControls toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
        />
        <Marker position={MAP_CONFIG.DEFAULT_CENTER}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <MainInsightsDashboard show={showDashboard} />
      <div className="mobile-icons">
        <RightSideIcons toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
      </div>
    </div>
  );
}
