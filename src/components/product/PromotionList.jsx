import React from 'react';
import { IoGiftOutline } from "react-icons/io5";

export default function PromotionList({ promotions = [] }) {
  if (promotions.length === 0) return null;

  return (
    <div className="mt-4 border border-dashed border-red-600 rounded-lg p-3 bg-red-50/50">
      <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-sm">
        <IoGiftOutline size={18} />
        <span>ƯU ĐÃI ONLINE</span>
      </div>
      <ul className="space-y-2">
        {promotions.map((promo, index) => (
          <li key={index} className="flex items-start gap-2 text-[13px] text-gray-800 leading-tight">
            <span className="text-red-600 mt-1">•</span>
            <span>{promo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}