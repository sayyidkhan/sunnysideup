import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MAP_CONFIG } from '../constants/data';

function MyMap() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer 
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={MAP_CONFIG.DEFAULT_CENTER}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MyMap;
