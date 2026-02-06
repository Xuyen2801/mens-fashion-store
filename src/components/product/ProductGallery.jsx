'use client';
import { useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function ProductGallery({ images = [] }) {
  const [active, setActive] = useState(0);
  const nextSlide = () => {
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return <div className="w-full bg-gray-100 animate-pulse rounded-xl"></div>;
  }

  return (
    <div className="w-full relative group">
      <div className="relative bg-white border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
        <img 
          src={images[active]} 
          className="max-h-full w-auto object-contain transition-all duration-500" 
          alt={`Product image ${active + 1}`} 
        />
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <IoChevronBackOutline size={24} className="text-gray-700" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-10"
        >
          <IoChevronForwardOutline size={24} className="text-gray-700" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/20 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
          {active + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}