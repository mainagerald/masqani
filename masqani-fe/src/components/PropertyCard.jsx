import React from 'react'

import h1 from '../assets/house-gallery/house1.jpg'; 
import h2 from '../assets/house-gallery/house2.jpg'; 
import h3 from '../assets/house-gallery/house3.jpg'; 
import h4 from '../assets/house-gallery/house4.jpg';
import ImageGallery from './ImageGallery';

const PropertyCard = ({ property }) => {
  const images=[h1,h2,h3,h4]
    return (
      <div className="shadow-sm rounded-xl flex flex-col bg-white border">
        <div className="mb-4 w-full">
          <ImageGallery images={images} length={images.length}/>
        </div>
        <div className="text-lg font-semibold text-neutral-900 m-2">{property?.price}</div>
        <div className="text-sm text-neutral-600 underline m2 ">{property?.amenity}</div>
        <div className="text-sm text-neutral-600 m-2">{property?.address}</div>
      </div>
    );
  };
export default PropertyCard