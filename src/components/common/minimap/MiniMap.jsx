import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { LoadingGlobe } from './LoadingGlobe';
import 'leaflet/dist/leaflet.css';

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
  const position = [location?.lat || 0, location?.lng || 0];

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
        />
        <Marker position={position}>
          <Tooltip 
            direction="top" 
            offset={[0, -20]}
            opacity={1}
            permanent
          >
            <div className="font-semibold">{location?.locationName}</div>
            <div className="text-sm">{location?.forecast || ''}</div>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MiniMap;
