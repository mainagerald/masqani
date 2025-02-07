import React, { useState } from "react";
import { PiArrowArcLeft, PiArrowArcRight } from "react-icons/pi";
import { FaRegFolder } from "react-icons/fa";

const ImageGallery = ({ images, length }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = length;

  const nextImage = () => {
    if (currentIndex < totalImages - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="w-full h-full">
        <img
          src={images[currentIndex]}
          alt="Gallery"
          className="max-h-full w-full object-fill rounded-lg"
        />
      </div>
      
      {currentIndex === 0 && totalImages > 1 && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <FaRegFolder size={12} /> +{totalImages - 1}
        </div>
      )}
      
      <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
        {currentIndex + 1}/{totalImages}
      </div>
      
      {totalImages > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <PiArrowArcLeft size={20} />
            </button>
          )}
          {currentIndex < totalImages - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <PiArrowArcRight size={20} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ImageGallery;