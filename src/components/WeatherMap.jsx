import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MAP_CONFIG } from '../constants/data';
import { SearchBarAndZoomControls, RightSideIcons } from './common/SearchBar';
import { MainInsightsDashboard } from './mainInsights/MainInsightsDashboard';

export default function WeatherMap() {
  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        attributionControl={false}
        zoomControl={false}
      >
        <SearchBarAndZoomControls />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={MAP_CONFIG.DEFAULT_CENTER}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <MainInsightsDashboard />
      <div className="mobile-icons">
        <RightSideIcons />
      </div>
    </div>
  );
}
