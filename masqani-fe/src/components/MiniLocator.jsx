import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Default Leaflet size
  iconAnchor: [12, 41], // Centered at the bottom
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MiniLocator = ({ coordinates, zoom = 10, className = '' }) => {
  const { latitude, longitude } = coordinates;

  if (!latitude || !longitude) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-lg">
        <p className="text-gray-500">Location not available</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-5/6
     rounded-md overflow-hidden ${className}`}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        className="w-full h-full"
        scrollWheelZoom={false}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={customIcon} />
      </MapContainer>
    </div>
  );
};

export default MiniLocator;
