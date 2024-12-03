import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MyMap() {
  return (
    <MapContainer 
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
