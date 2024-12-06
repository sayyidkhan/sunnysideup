import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import { MAP_CONFIG } from '../constants/data';
import { SearchBarAndZoomControls, RightSideIcons } from './common/SearchBar';
import { MainInsightsDashboard } from './mainInsights/MainInsightsDashboard';
import { DetailInsightsDashboard } from './detailedInsights/DetailInsightsDashboard';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapEvents({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

export default function WeatherMap() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showSiteDetails, setShowSiteDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const toggleDashboard = () => {
    setShowDashboard(prev => !prev);
  };

  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    setShowSiteDetails(true);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%", zIndex: 0 }}
        attributionControl={false}
        zoomControl={false}
        className="md:pt-0 pt-4"
      >
        <SearchBarAndZoomControls toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
          className="z-0"
        />
        <MapEvents onMapClick={handleMapClick} />
        <Marker 
          position={MAP_CONFIG.DEFAULT_CENTER}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              setShowSiteDetails(true);
            },
          }}
          zIndexOffset={1000}
        >
          {/* <Popup className="z-[1000]">
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
      </MapContainer>
      <MainInsightsDashboard show={showDashboard} />
      <DetailInsightsDashboard 
        show={showSiteDetails}
        onClose={() => setShowSiteDetails(false)}
        siteData={{
          location: selectedLocation
        }}
      />
      <div className="mobile-icons">
        <RightSideIcons toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
      </div>
    </div>
  );
}
