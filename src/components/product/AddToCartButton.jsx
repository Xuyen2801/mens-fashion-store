// File: src/components/product/AddToCartButton.jsx
"use client";
import React from "react";

// Component này chỉ nhận nhiệm vụ hiển thị và báo lại khi bị bấm (onClick)
const AddToCartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#0044BB] text-white text-[10px] sm:text-[12px] font-medium py-1.5 px-2 sm:px-3 rounded hover:bg-blue-800 transition-colors whitespace-nowrap"
    >
      Thêm giỏ hàng
    </button>
  );
};

export default AddToCartButton;
