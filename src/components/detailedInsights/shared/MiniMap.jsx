import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function MiniMap({ location }) {
  const position = [location?.lat || 0, location?.long || 0];
  
  return (
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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
}
