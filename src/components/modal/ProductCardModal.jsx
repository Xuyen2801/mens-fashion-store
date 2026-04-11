// src/components/product/ProductCardModal.jsx
"use client";
import React from "react";
import ProductGallery from "../Product/ProductGallery";
import ProductInfo from "../Product/ProductInfo";
import { useCart } from "../../components/Cart/CartContext";

export default function ProductCardModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const discountPercent =
    product.price && product.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  const modalImages = React.useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }

    const variantImages = Array.isArray(product.variants)
      ? product.variants
          .map((v) => v?.image)
          .filter((img) => typeof img === "string" && img.length > 0)
      : [];

    if (variantImages.length > 0) {
      return Array.from(new Set(variantImages));
    }

    if (typeof product.image === "string" && product.image.length > 0) {
      return [product.image];
    }

    return [];
  }, [product]);

  /**
   * Called by ProductInfo when the user picks a size/color and clicks "Thêm vào giỏ"
   * @param {{ size: string, color: string, quantity: number }} opts
   */
  const handleAddToCart = ({ size, color, quantity = 1 }) => {
    addToCart(product, size, color, quantity);
    // Optionally close modal after adding
    // onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div
        className="relative bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col md:flex-row animate-in fade-in duration-300"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-2xl text-gray-400 hover:text-black transition-colors"
        >
          ✕
        </button>

        {/* gallery */}
        <div className="relative md:w-1/2 bg-[#f9f9f9] p-8 flex items-center justify-center min-h-0">
          <ProductGallery images={modalImages} product={product} />
          {discountPercent > 0 && (
            <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-2.5 py-1.5 rounded-full shadow-lg z-20">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* info */}
        <div className="md:w-1/2 p-10 overflow-y-auto">
          {/*
            ProductInfo needs to call onAddToCart({ size, color, quantity })
            when the user clicks the add-to-cart button inside it.
          */}
          <ProductInfo
            product={product}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}