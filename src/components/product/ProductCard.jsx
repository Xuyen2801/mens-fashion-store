'use client';
import { useState } from 'react';

export default function ProductCard({ product, onOpenModal }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
        <img 
          src={isHover && product.images[1] ? product.images[1] : product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenModal(product); }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 shadow-xl opacity-0 group-hover:opacity-100 transition-all font-bold text-xs uppercase"
        >
          Xem nhanh
        </button>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
        <p className="font-bold text-blue-700">{product.salePrice.toLocaleString()}đ</p>
      </div>
    </div>
  );
}