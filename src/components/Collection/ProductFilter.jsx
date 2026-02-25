"use client";
import React from "react";

const ProductFilter = ({ conditions, value, onChange }) => {
  console.log("ProductFilter props:", { conditions, value });
  
  return (
    <select
      value={value || "default"} 
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
    >
      {conditions && conditions.map((cond, index) => (
        <option key={cond.value || index} value={cond.value}>
          {cond.label}
        </option>
      ))}
    </select>
  );
};

export default ProductFilter;