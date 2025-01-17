import React, { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { deleteLandlordProperty, getLandlordProperties } from "../../service/api/landlordPropertyApi";
import { toast } from "react-toastify";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { CgEye } from "react-icons/cg";
import Spinner from "../../components/Spinner";
import PropertyCategories from "../../service/model/PropertyCategory";
import { SlLocationPin } from "react-icons/sl";


const MyProperties = () => {

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [icon, setIcon]=useState(null);

  async function fetchProperties() {
    setIsLoading(true);
    try {
      const response = await getLandlordProperties();
      console.log("---properties response----", response);
      setProperties(response);
    } catch (error) {
      toast.error("Error fetching your properties. Please try again.")
      console.error("Error encountered: ", error?.message);
    }finally{
      setIsLoading(false);
    }
  }

  async function handleListingDelete(publicId){
    console.log("handle delete clicked");
    setIsLoading(true);    
    try {
      const response = await deleteLandlordProperty(publicId)
      console.log("response from delete action", response);
      if(response.status==200){
        setProperties(properties=>
          properties.filter((prop)=> prop.publicId!=publicId)
        );
      }
      
    } catch (error) {
      console.error('Error executing delete property')
      toast.error("Property deletion failed")
    }finally{
      setIsLoading(false);
    }
    
  }
  function handleListingEdit(){
    console.log("handle edit clicked");
    
  }
  function handleListingView(){
    console.log("handle view clicked");
    
  }

  const getIconComponent = (category) => {
    const categoryData = PropertyCategories.find(prop => prop.id === category);
    const IconComponent = categoryData?.icon || FiHome;
    return <IconComponent className="w-5 h-5 text-black mr-2" />;
  };

  useEffect(() => {
    fetchProperties();
  }, [])

  if ((!properties || properties.length === 0) &&!isLoading) {
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <FiHome className="w-16 h-16 text-gray-700 animate-bounce" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          No listings found
        </h1>
        <p className="text-gray-700 mt-2">
          Please add properties to view them here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="pt-16">
        <header className="p-4 bg-white/50 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-medium text-gray-800 transition-colors">
              My Listings
            </h1>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.publicId}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={property.cover.fileUrl}
                    alt={property.cover.fileName}
                    className="w-full h-5/6 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 from-gray-500 bg-gradient-to-br to-gray-950 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.propertyCategory}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex mb-3 flex-col">
                    <>
                    <div className="flex flex-row items-start">
                    {getIconComponent(property.propertyCategory)}
                    <p className="font-semibold">{property.title}</p>
                    </div></>
                    <>
                    <div className="flex flex-row items-center space-x-1">
                    <SlLocationPin className="text-black"/><p className="text-gray-600 text-start text-sm italic">{property.location}</p></div></>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-black">
                      ${property.price.value.toLocaleString()}
                    </p>
                    <>
                      <div className="space-x-2">
                        <button 
                        type="button"
                        onClick={handleListingView}
                        className="bg-white hover:bg-gray-200 text-white px-2 py-2 rounded-lg transition-colors duration-300">
                          <CgEye className="text-black" />
                        </button>
                        <button 
                        type="button"
                        onClick={handleListingEdit}
                        className="bg-white hover:bg-gray-200 text-white px-2 py-2 rounded-lg transition-colors duration-300">
                          <BiEditAlt className="text-black" />
                        </button>
                        <button
                        type="button"
                        onClick={()=>handleListingDelete(property.publicId)} 
                        className="bg-white hover:bg-gray-200 text-white px-2 py-2 rounded-lg transition-colors duration-300">
                          <BiTrash className="text-black" />
                        </button></div></>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isLoading && <Spinner/>}
    </div>
  );
};

export default MyProperties;