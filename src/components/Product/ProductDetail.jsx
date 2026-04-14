"use client";

import React, { useState, useEffect } from "react";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductDescriptionTabs from "./ProductDescriptionTabs";
import FAQAccordion from "./FAQAccordion";

export default function ProductDetail({ product, faqData = [] }) {
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="sticky top-24 h-fit">
          <ProductGallery 
            images={product.images} 
            product={product} 
            selectedColor={selectedVariant?.color} 
          />
        </div>
        <div>
          <ProductInfo 
            product={product} 
            selectedVariant={selectedVariant}
            showDetailButton={false}
            onColorChange={(variant) => setSelectedVariant(variant)} 
          />
        </div>
      </div>

      <div className="w-full">
        <ProductDescriptionTabs product={product} />
      </div>

      <div className="mt-10 border-t pt-16">
        <h3 className="text-xl font-bold mb-6 text-center uppercase tracking-wider text-gray-800">
          Khách hàng thường hỏi
        </h3>
        <FAQAccordion faqData={faqData} />
      </div>
    </div>
  );
}