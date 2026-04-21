
'use client';
import { useState, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const GALLERY_FALLBACK_IMAGES = [
  "/images/productcart/2.jpg",
  "/images/productcart/3.jpg",
  "/images/productcart/4.jpg",
  "/images/productcart/5.jpg",
  "/images/productcart/6.jpg",
  "/images/productcart/7.jpg",
  "/images/productcart/8.jpg",
  "/images/productcart/9.jpg",
  "/images/productcart/10.jpg",
  "/images/productcart/11.jpg",
];

const pickFallbackImage = (seed) => {
  const text = String(seed || "gallery");
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return GALLERY_FALLBACK_IMAGES[hash % GALLERY_FALLBACK_IMAGES.length];
};

const sanitizeImageUrl = (url, seed) => {
  const value = String(url || "").trim();
  if (!value) {
    return pickFallbackImage(seed);
  }

  if (value.startsWith("/images/products/ao-thun/")) {
    return pickFallbackImage(seed);
  }

  return value;
};

const buildImageList = (input, seed) => {
  const raw = Array.isArray(input) ? input : [];
  const normalized = raw
    .map((url, index) => sanitizeImageUrl(url, `${seed}-${index}`))
    .filter(Boolean);

  if (normalized.length === 0) {
    return [pickFallbackImage(seed)];
  }

  return Array.from(new Set(normalized));
};

export default function ProductGallery({ images = [], product, selectedColor, hoverColor }) {
  const productSeed = product?.id || product?.sku || product?.name || "product";
  const initialImageList = buildImageList(
    images.length > 0 ? images : product?.image ? [product.image] : [],
    productSeed
  );

  const [active, setActive] = useState(0);
  const [displayImages, setDisplayImages] = useState(initialImageList);

  useEffect(() => {
    const activeColor = hoverColor || selectedColor;
    let nextList = [];

    if (product && activeColor) {
      const foundVariant = product.variants?.find(v => v.color === activeColor);
      const foundColor = product.colors?.find(c => c.name === activeColor);

      if (foundVariant && foundVariant.image) {
        nextList = buildImageList(
          [foundVariant.image, ...images.filter(img => img !== foundVariant.image)],
          `${productSeed}-${activeColor}`
        );
      } else if (foundColor && foundColor.images) {
        nextList = buildImageList(foundColor.images, `${productSeed}-${activeColor}`);
      }
    }

    if (nextList.length === 0) {
      nextList = buildImageList(
        images.length > 0 ? images : product?.image ? [product.image] : [],
        productSeed
      );
    }

    const currentListStr = JSON.stringify(displayImages);
    const nextListStr = JSON.stringify(nextList);

    if (currentListStr !== nextListStr) {
      setDisplayImages(nextList);
      setActive(0);
    }

  }, [
    product,
    selectedColor,
    hoverColor,
    productSeed,
    JSON.stringify(images)
  ]);

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
          onError={(event) => {
            event.currentTarget.src = pickFallbackImage(`${productSeed}-main-${active}`);
          }}
        />
        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"><IoChevronBackOutline size={20} /></button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"><IoChevronForwardOutline size={20} /></button>
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
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 aspect-[3/4] ${active === index ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-300'
              }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.src = pickFallbackImage(`${productSeed}-thumb-${index}`);
              }}
            />
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