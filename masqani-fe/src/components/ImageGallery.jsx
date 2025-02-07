import React, { useState } from "react";
import { PiArrowArcLeft, PiArrowArcRight } from "react-icons/pi";
import { FaRegFolder } from "react-icons/fa";


const ImageGallery = ({images, length}) => {

    console.log("images------------------", images);
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = length;


  const nextImage = () => {
    if (currentIndex < totalImages - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="relative border overflow-y-auto shadow-lg">
      <div className="">
        <img
          src={images[currentIndex]}
          alt="Gallery"
          className="w-full h-auto object-cover transition-opacity duration-500"
        />
        {currentIndex === 0 && totalImages > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
            <FaRegFolder size={12} /> +{totalImages - 1}
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {currentIndex + 1}/{totalImages}
        </div>
        {totalImages > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <PiArrowArcLeft size={20} />
              </button>
            )}
            {currentIndex < totalImages - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <PiArrowArcRight size={20} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
