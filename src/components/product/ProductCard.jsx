"use client";
import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ image, name, price, salePrice, status }) => {
  // Đây là phần LOGIC
  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Sau này bạn Logic có thể thêm code gọi API, cập nhật Redux/Context ở đây
    alert(`Đã thêm ${name} vào giỏ hàng!`);
  };

  return (
    <div
      className="group flex flex-col bg-white border border-transparent hover:border-gray-200 transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-md rounded-[8px] p-[5px]"
      style={{ aspectRatio: "334/558" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "334/455" }}>
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {status && (
          <span className="absolute top-0 right-0 bg-[#0057D9] text-white text-[10px] font-bold px-3 py-1 uppercase z-10">
            {status}
          </span>
        )}
      </div>

      {/* 2. PHẦN THÔNG TIN */}
      <div className="flex flex-col  flex-grow mt-2 px-1">
        <div>
          <h3 className="text-[clamp(12px,1vw,14px)] leading-tight font-medium text-gray-700 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {name}
          </h3>
        </div>

        <div className="flex items-end justify-between mb-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[clamp(13px,1vw,15px)] font-bold text-[#1F2937]">
                {salePrice || price}
              </span>
              {salePrice && (
                <span className="text-gray-400 text-[10px] line-through">
                  {price}
                </span>
              )}
            </div>
            <div className="flex gap-1 mt-1">
              <div className="flex gap-1 mt-1">
                <img
                  src={image} // Dùng lại biến image của sản phẩm
                  alt="icon-mau"
                  className="w-5 h-5 object-cover rounded-sm border border-gray-200" // Style cho nó nhỏ lại, hơi bo góc và có viền mờ
                  title={name} // Hover vào sẽ hiện tên sản phẩm
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#0044BB] text-white text-[10px] sm:text-[12px] font-medium py-1.5 px-2 sm:px-3 rounded hover:bg-blue-800 transition-colors whitespace-nowrap"
          >
            Thêm giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
