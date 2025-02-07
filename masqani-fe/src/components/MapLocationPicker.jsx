import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const MapLocationPicker = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map) return;

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      onLocationSelect({ lat, lng });
    });

    return () => {
      map.off('click');
    };
  }, [map, onLocationSelect]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      ref={setMap}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker && <Marker position={[marker.lat, marker.lng]} />}
    </MapContainer>
  );
};

export default MapLocationPicker;