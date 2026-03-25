
'use client';
import { useState, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function ProductGallery({ images = [], product, selectedColor, hoverColor }) {
  const [active, setActive] = useState(0);
  const [displayImages, setDisplayImages] = useState(images);

  useEffect(() => {
    const activeColor = hoverColor || selectedColor;
    if (!product || !activeColor) return;

    const foundVariant = product.variants?.find(v => v.color === activeColor);
    const foundColor = product.colors?.find(c => c.name === activeColor);

    if (foundVariant && foundVariant.image) {
      setDisplayImages([foundVariant.image, ...images.filter(img => img !== foundVariant.image)]);
      setActive(0);
    } 
    else if (foundColor && foundColor.images) {
      setDisplayImages(foundColor.images);
      setActive(0);
    }
  }, [product, selectedColor, hoverColor, images]);

  useEffect(() => {
    setDisplayImages(images);
  }, [images]);

  if (!displayImages || displayImages.length === 0) {
    return <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse rounded-xl"></div>;
  }

  const nextSlide = () => setActive((p) => (p === displayImages.length - 1 ? 0 : p + 1));
  const prevSlide = () => setActive((p) => (p === 0 ? displayImages.length - 1 : p - 1));

  return (
    <div className="flex flex-row-reverse gap-3 group h-fit">

      <div className="flex-1 relative bg-[#f9f9f9] rounded-xl overflow-hidden flex items-center justify-center aspect-[3/4]">
        <img 
          key={displayImages[active]} 
          src={displayImages[active]} 
          className="h-full w-full object-cover transition-all duration-500" 
          alt="Main product" 
        />
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"><IoChevronBackOutline size={20}/></button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"><IoChevronForwardOutline size={20}/></button>
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded">
          {active + 1} / {displayImages.length}
        </div>
      </div>

      <div className="w-16 md:w-20 flex flex-col gap-2 overflow-y-auto max-h-[500px] pr-1 custom-scrollbar">
        {displayImages?.map((img, index) => (
          <div 
            key={index}
            onMouseEnter={() => setActive(index)} 
            onClick={() => setActive(index)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 aspect-[3/4] ${
              active === index ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

     
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
      `}</style>
    </div>
  );
}