import { getPropertyByPublicId } from '@/service/api/landlordPropertyApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import h1 from '../../../assets/house-gallery/house1.jpg';
import h2 from '../../../assets/house-gallery/house2.jpg';
import h3 from '../../../assets/house-gallery/house3.jpg';
import h4 from '../../../assets/house-gallery/house4.jpg';

import ImageGallery from '@/components/ImageGallery';
import PropertyCategories from '@/service/model/PropertyCategory';
import { FaCar } from 'react-icons/fa';
import { PiCarFill, PiCarLight, PiPersonSimpleWalkBold, PiPersonSimpleWalkLight, PiVisorThin } from 'react-icons/pi';

const RentalDetail = () => {

  const { publicId } = useParams();
  const [property, setProperty] = useState(null);

  const prpty = {
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

  const getIconComponent = (category) => {
    const categoryData = PropertyCategories.find(prop => prop.id === category);
    const IconComponent = categoryData?.icon || FiHome;
    return <IconComponent className="w-5 h-5 text-black mr-2" />;
  };

  function formatCurrency(number) {
    return number.toLocaleString("en-US");
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className='flex-row flex gap-3'>
          <div className="relative max-w-full md:w-7/12 h-[65vh] lg:h-[65vh] rounded-lg">
            <ImageGallery images={prpty.pictures.map((picture) => picture.fileUrl)} length={prpty.pictures.length} />
          </div>
          {/* location handler with map*/}
          <div className="relative max-w-full md:w-5/12 h-[65vh] lg:h-[65vh] rounded-lg m-2">
            <div className='w-full h-1/2 p-0 bg-blue-400 rounded-md'>
            </div>
            <div className='flex-col items-center h-1/2'>
              <section className='h-1/2 justify-start items-center flex'>
              <button className='border-black border rounded-2xl p-2 ml-4 mr-4 flex-row flex items-center gap-2'><PiCarFill className='w-5 h-5'/>Check commute</button>
              </section>
              <section className=' h-1/2 justify-start items-center flex'>
              <button className='p-2 ml-4 mr-4 border text-white bg-black border-black rounded-2xl'>Request Visit</button>
              </section>
            </div>
          </div>
        </div>
        {/* the rest */}
        <div className='p-2 mt-4 flex flex-row gap-1'>
          {getIconComponent(prpty.category)}
          <p className='text-sm font-semibold'>{prpty.title.value}</p>
        </div>
        <div>
          <section className='flex flex-row gap-1 items-baseline'>
            <p className='font-bold text-xl'>KES</p>
            <p className='text-4xl font-bold'>{formatCurrency(prpty.price.value)}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RentalDetail