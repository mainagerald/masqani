import { getPropertyByPublicId } from '@/service/api/landlordPropertyApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const RentalDetail = () => {

  const { publicId } = useParams();
  const [property, setProperty] = useState(null);

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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        Rental View
      </div>
    </div>
  )
}

export default RentalDetail