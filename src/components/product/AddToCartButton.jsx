"use client";
import React from "react";
import { FiEye, FiShoppingCart } from "react-icons/fi";

const AddToCartButton = ({ onClick, onView, added }) => {
  return (
    <div className="flex items-center rounded-lg bg-white shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!added && onClick) onClick(e);
        }}
        className={`w-11 h-10 flex items-center justify-center transition-colors ${
          added ? "text-green-600 bg-green-50 cursor-default" : "text-gray-900 hover:bg-gray-100 cursor-pointer"
        }`}
        disabled={added}
        aria-label="Thêm vào giỏ hàng"
        title={added ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
      >
        <FiShoppingCart size={18} />
      </button>

      <div className="w-px h-6 bg-gray-200" />

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onView) onView(e);
        }}
        className="w-11 h-10 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Xem sản phẩm"
        title="Xem sản phẩm"
      >
        <FiEye size={18} />
      </button>
    </div>
  );
};

export default AddToCartButton;