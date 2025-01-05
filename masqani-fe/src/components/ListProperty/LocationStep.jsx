/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Spinner from "../Spinner";

const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

const LocationMarker = ({ position, onPositionChange }) => {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

export const LocationStep = ({ onLocationSelect, location }) => {
  const DEFAULT_MAP_POINTER = [0.0236, 37.9062];

  const [addressCounty, setAddressCounty]=useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [position, setPosition] = useState(DEFAULT_MAP_POINTER);
  const [selectedAddress, setSelectedAddress] = useState(location || "");
  const [showResults, setShowResults] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const searchLocation = useDebounce(async (query) => {
    if (query.length < 3) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, 300);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSelectedAddress(value);
    searchLocation(value);
  };

  const handleResultClick = (result) => {
    const newPosition = [parseFloat(result.lat), parseFloat(result.lon)];
    setPosition(newPosition);
    setSelectedAddress(result.display_name);
    setSearchInput(result.display_name);
    setShowResults(false);
    
    onLocationSelect({
      location: result.display_name,
      coordinates: {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      },
    });
  };

  const handleMapClick = async (lat, lng) => {
    setPosition([lat, lng]);
    setIsAddressLoading(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const result = await response.json();
      
      setSelectedAddress(result.display_name);
      setSearchInput(result.display_name);
      extractCounty(result.display_name);
      onLocationSelect({
        location: result.display_name,
        coordinates: {
          latitude: lat,
          longitude: lng,
        },
      });
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    } finally {
      setIsAddressLoading(false);
    }
  };

  const extractCounty = (address) => {
    const parts = address.split(", ");    
    const county = parts.find(part => part.endsWith("County"));
    if(county)setAddressCounty(county);
      };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search location..."
            className="w-full p-2 pr-10 border rounded"
          />
          <span className="absolute right-3 top-2.5">🔍</span>
        </div>
        
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
            {searchResults.map((result, index) => (
              <button
                key={index}
                className="w-full p-2 text-left hover:bg-gray-100"
                onClick={() => handleResultClick(result)}
              >
                {result.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-[500px] rounded-lg overflow-hidden relative" style={{ zIndex: 0 }}>
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full"
          style={{ position: 'relative', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            onPositionChange={handleMapClick}
          />
        </MapContainer>
      </div>

      {selectedAddress && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Selected Location</h3>
          <p className="text-gray-600">
            {isAddressLoading ? "Loading address..." : selectedAddress}
          </p>
          {position[0] !== 0 && (
            <p className="text-sm text-gray-500">
              Coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          )}
        </div>
      )}
      {isAddressLoading && (<Spinner/>)}
    </div>
  );
};
