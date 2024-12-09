import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { LoadingGlobe } from './LoadingGlobe';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// This component will handle the loading state
function MapLoadingHandler({ onLoad }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (map) {
      map.whenReady(() => {
        onLoad();
      });
    }
  }, [map, onLoad]);

  return null;
}

export function MiniMap({ location }) {
  const [isMapReady, setIsMapReady] = useState(false);
  const [shouldShowMap, setShouldShowMap] = useState(false);
  const [error, setError] = useState(null);
  const position = [location?.lat || 1.3521, location?.lng || 103.8198]; // Default to Singapore coordinates

  const handleMapLoad = React.useCallback(() => {
    setIsMapReady(true);
  }, []);

  // Force show map after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShowMap(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Error handling
  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-800 rounded-xl">
        <div className="text-white text-center p-4">
          <p>Unable to load map</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }
  
  // Show loading state for first 2 seconds or until map is ready
  if (!shouldShowMap && !isMapReady) {
    return <LoadingGlobe />;
  }

  return (
    <div className="relative h-full w-full">
      <MapContainer 
        center={position}
        zoom={13}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0, borderRadius: "0.75rem" }}
      >
        <MapLoadingHandler onLoad={handleMapLoad} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          onError={(e) => setError('Failed to load map tiles')}
        />
        <Marker position={position}>
          <Tooltip 
            direction="top" 
            offset={[0, -20]}
            opacity={1}
            permanent
          >
            <div className="font-semibold">{location?.locationName || 'Location'}</div>
            <div className="text-sm">{location?.forecast || ''}</div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MiniMap;
