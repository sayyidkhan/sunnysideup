import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { MAP_CONFIG } from '../constants/data';
import { SearchBarAndZoomControls } from './common/SearchBar';
import { MainInsightsDashboard } from './mainInsights/MainInsightsDashboard';
import { DetailInsightsDashboard } from './detailedInsights/DetailInsightsDashboard';
import { fetchDailyLocationAndForecast } from '../api/weather/sg-forecast-daily-location';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create custom icons for different marker types
const defaultIcon = L.icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -30],
});

const singaporeIcon = L.icon({
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -30],
});

export default function WeatherMap() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [showSiteDetails, setShowSiteDetails] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [singaporeForecast, setSingaporeForecast] = useState(null);

  // Default Location set to Singapore
  const defaultLocation = {
    locationName: 'Singapore',
    lat: MAP_CONFIG.DEFAULT_CENTER[0],
    lng: MAP_CONFIG.DEFAULT_CENTER[1],
    forecast: singaporeForecast,
  };

  // Fetch locations from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const weatherData = await fetchDailyLocationAndForecast();
        setLocations(weatherData.locations);
        setSingaporeForecast(weatherData.singaporeForecast);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const toggleDashboard = () => {
    setShowDashboard(prev => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%", zIndex: 0, background: "#13151C" }}
        attributionControl={false}
        zoomControl={false}
        className="md:pt-0 pt-4"
        ref={(mapInstance) => {
          window.leafletMap = mapInstance;
        }}
      >
        <SearchBarAndZoomControls 
          toggleDashboard={toggleDashboard} 
          showDashboard={showDashboard} 
          setShowSiteDetails={setShowSiteDetails}
          setSelectedLocation={setSelectedLocation}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains={['a', 'b', 'c']}
          className="z-0"
        />
        {/* Singapore default marker */}
        <Marker 
          position={MAP_CONFIG.DEFAULT_CENTER}
          icon={singaporeIcon}
          eventHandlers={{
            click: (e) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(defaultLocation);
              setShowSiteDetails(true);
            },
          }}
          zIndexOffset={1000}
        >
          <Tooltip 
            direction="top" 
            offset={[0, -20]}
            opacity={1}
            permanent={false}
          >
            <div className="font-semibold">Singapore</div>
            <div className="text-sm">{singaporeForecast}</div>
          </Tooltip>
        </Marker>
        {/* Location markers */}
        {locations.map((location, index) => (
          <Marker 
            key={`${location.name}-${index}`}
            position={[location.latitude, location.longitude]}
            icon={defaultIcon}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                const locationData = {
                  locationName: location.name,
                  lat: location.latitude,
                  lng: location.longitude,
                  forecast: location.forecast
                };
                if (locationData) {
                  setSelectedLocation(locationData);
                  setShowDashboard(false);
                  setShowSiteDetails(true);
                }
              },
            }}
            zIndexOffset={100}
          >
            <Tooltip 
              direction="top" 
              offset={[0, -20]}
              opacity={1}
              permanent={false}
            >
              <div className="font-semibold">{location.name}</div>
              <div className="text-sm">{location.forecast}</div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
      <MainInsightsDashboard 
        show={showDashboard}
        selectedLocation={defaultLocation}
      />
      <DetailInsightsDashboard 
        show={showSiteDetails}
        onClose={() => setShowSiteDetails(false)}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}
