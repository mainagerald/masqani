import React from 'react'

const PropertyCard = ({ property }) => {
    return (
      <div className="shadow-sm rounded-xl flex flex-col bg-white border">
        <div className="mb-4 w-full ">
          <img
            src={property.image}
            alt={property.address}
            className="h-60 object-cover rounded-t-xl"
          />
        </div>
        <div className="text-lg font-semibold text-neutral-900 m-2">{property.price}</div>
        <div className="text-sm text-neutral-600 underline m2 ">{property.amenities}</div>
        <div className="text-sm text-neutral-600 m-2">{property.address}</div>
      </div>
    );
  };
export default PropertyCard