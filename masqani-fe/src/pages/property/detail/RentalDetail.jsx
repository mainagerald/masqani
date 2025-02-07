import { getPropertyByPublicId } from '@/service/api/landlordPropertyApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import h1 from '../../../assets/house-gallery/house1.jpg'; 
import h2 from '../../../assets/house-gallery/house2.jpg'; 
import h3 from '../../../assets/house-gallery/house3.jpg'; 
import h4 from '../../../assets/house-gallery/house4.jpg';

import ImageGallery from '@/components/ImageGallery';

const RentalDetail = () => {

  const { publicId } = useParams();
  const [property, setProperty] = useState(null);

  const prpty={
    "category": "STUDIOS",
    "createdAt": 1738136077,
    "description": {
      "value": "BIG HOUSE WITH HELLA SPACE BRUV"
    },
    "title": {
      "value": "4 BEDROOM MANSIONETTE"
    },
    "infos": {
      "baths": {
        "value": 1
      },
      "bedrooms": {
        "value": 1
      }
    },
    "landlord": "593a455c-142f-4296-8f02-0d596b6115ee",
    "location": "Imenti North, Meru County, Eastern, 60200, Kenya",
    "pictures": [
      // {
      //   "fileUrl": "https://masqani-listing-props-s3.s3.eu-north-1.amazonaws.com/listing-images/3f990f53-3dab-4c0e-8b17-c841edc09c32.jpeg",
      //   "fileName": "listing-images/3f990f53-3dab-4c0e-8b17-c841edc09c32.jpeg",
      //   "fileContentType": "image/jpeg",
      //   "isCover": true
      // },
      {
        "fileUrl": h1,
        "fileName": "listing-images/3f990f53-3dab-4c0e-8b17-c841edc09c32.jpeg",
        "fileContentType": "image/jpeg",
        // "isCover": true
      },
      {
        "fileUrl": h2,
        "fileName": "listing-images/3f990f53-3dab-4c0e-8b17-c841edc09c32.jpeg",
        "fileContentType": "image/jpeg",
        // "isCover": true
      },
      {
        "fileUrl": h3,
        "fileName": "listing-images/3f990f53-3dab-4c0e-8b17-c841edc09c32.jpeg",
        "fileContentType": "image/jpeg",
        // "isCover": true
      },
      {
        "fileUrl": h4,
        "fileName": "listing-images/3f990f53-3dab-4c0e-8b17-c841edc09c32.jpeg",
        "fileContentType": "image/jpeg",
        // "isCover": true
      }
    ],
    "price": {
      "value": 90000
    }
  }


  useEffect(() => {
    loadProperty();
  })

  const loadProperty = async () => {
    const res = await getPropertyByPublicId(publicId);
    console.log("res for prop detail", res);
    if (res) {
      setProperty(property);
    }
  }

  return (
    <div className="h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 h-screen bg-blue-400">
        <div className='w-2/3 p-0 h-72 bg-amber-400'>
          <ImageGallery images={prpty.pictures.map((picture)=>picture.fileUrl)} length={prpty.pictures.length}/>
        </div>
      </div>
    </div>
  )
}

export default RentalDetail