"use client";
import React from "react";

const AddToCartButton = ({ onClick, added }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!added) onClick(e); 
      }}
      className={`
        text-white text-[10px] font-medium py-1.5 px-2 sm:px-3
        rounded transition-all duration-200 whitespace-nowrap flex items-center gap-1
        ${added ? "bg-green-600 scale-95 cursor-default" : "bg-[#0044BB] hover:bg-blue-800"}
      `}
      disabled={added} 
    >
      {added ? "Đã thêm" : "Thêm giỏ hàng"}
    </button>
  );
};

export default AddToCartButton;