'use client';
import React from 'react';
import ProductGallery from '../product/ProductGallery';
import ProductInfo from '../product/ProductInfo';

export default function ProductCardModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null; 

  const discountPercent = product.price && product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        className="relative bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col md:flex-row animate-in fade-in duration-300"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 text-2xl text-gray-400 hover:text-black">✕</button>
        <div className="relative md:w-1/2 bg-[#f9f9f9] p-8 flex items-center justify-center min-h-0min-h-0">
          <ProductGallery images={product.images || []} />
          {discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-2.5 py-1.5 rounded-full shadow-lg z-20">
              -{discountPercent}%
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-10 overflow-y-auto">
          <ProductInfo 
            product={product}
            //gắn console log cho hàm thêm giỏ hàng
          />
        </div>
      </div>
    </div>
  );
}