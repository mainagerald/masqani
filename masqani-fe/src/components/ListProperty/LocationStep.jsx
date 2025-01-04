/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

export const LocationStep = ({ onLocationSelect, address }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const [selectedAddress, setSelectedAddress] = useState(address || "");
  const [showResults, setShowResults] = useState(false);

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
      address: result.display_name,
      coordinates: {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      },
    });
  };

  const handleMapClick = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const result = await response.json();
      
      setSelectedAddress(result.display_name);
      setSearchInput(result.display_name);
      onLocationSelect({
        address: result.display_name,
        coordinates: {
          latitude: lat,
          longitude: lng,
        },
      });
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
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
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
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

      <div className="h-[500px] rounded-lg overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full"
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
          <p className="text-gray-600">{selectedAddress}</p>
          {position[0] !== 0 && (
            <p className="text-sm text-gray-500">
              Coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          )}
        </div>
      )}
    </div>
  );

}







// /* eslint-disable react/prop-types */
// import { OpenStreetMapProvider } from "leaflet-geosearch";
// import { useCallback, useState } from "react";
// import { BiSearch } from "react-icons/bi";
// import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

// const provider = new OpenStreetMapProvider();

// const LocationMarker = ({ position, onPositionChange }) => {
//   useMapEvents({
//     click(e) {
//       onPositionChange(e.latlng.lat, e.latlng.lng);
//     },
//   });

//   return <Marker position={position} />;
// };

// export const LocationStep = ({ 
//   onLocationSelect 
// }) => {
//   const [searchInput, setSearchInput] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [position, setPosition] = useState([0, 0]);
//   const [address, setAddress] = useState('');
//   const [showResults, setShowResults] = useState(false);

//   const searchLocation = useCallback(
//     debounce(async (query) => {
//       if (query.length < 3) return;
//       try {
//         const results = await provider.search({ query });
//         setSearchResults(results);
//         setShowResults(true);
//       } catch (error) {
//         console.error('Search failed:', error);
//       }
//     }, 300),
//     []
//   );

//   const handleSearchInputChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     searchLocation(value);
//   };

//   const handleResultClick = (result) => {
//     const newPosition = [result.y, result.x];
//     setPosition(newPosition);
//     setAddress(result.label);
//     setSearchInput(result.label);
//     setShowResults(false);
    
//     onLocationSelect({
//       address: result.label,
//       coordinates: {
//         latitude: result.y,
//         longitude: result.x,
//       },
//     });
//   };

//   const handleMapClick = async (lat, lng) => {
//     try {
//       const results = await provider.search({ query: `${lat}, ${lng}` });
//       if (results.length > 0) {
//         setAddress(results[0].label);
//         setSearchInput(results[0].label);
//         onLocationSelect({
//           address: results[0].label,
//           coordinates: {
//             latitude: lat,
//             longitude: lng,
//           },
//         });
//       }
//     } catch (error) {
//       console.error('Reverse geocoding failed:', error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="relative">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchInput}
//             onChange={handleSearchInputChange}
//             placeholder="Search location..."
//             className="w-full p-2 pl-10 border rounded"
//           />
//           <BiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>
        
//         {showResults && searchResults.length > 0 && (
//           <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
//             {searchResults.map((result, index) => (
//               <button
//                 key={index}
//                 className="w-full p-2 text-left hover:bg-gray-100"
//                 onClick={() => handleResultClick(result)}
//               >
//                 {result.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="h-[500px] rounded-lg overflow-hidden">
//         <MapContainer
//           center={position}
//           zoom={13}
//           className="h-full w-full"
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <LocationMarker
//             position={position}
//             onPositionChange={handleMapClick}
//           />
//         </MapContainer>
//       </div>

//       {address && (
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h3 className="font-medium">Selected Location</h3>
//           <p className="text-gray-600">{address}</p>
//           <p className="text-sm text-gray-500">
//             Coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };