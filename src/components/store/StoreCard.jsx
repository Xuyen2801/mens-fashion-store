"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const StoreCard = ({ store }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* 1. Phần hình ảnh cửa hàng */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={store.image}
          alt={store.name}
          layout="fill"
          objectFit="cover"
        />
        {/* Icon phóng to nhỏ ở góc phải dưới ảnh giống thiết kế */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1.5 cursor-pointer">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </div>
      </div>

      {/* 2. Phần thông tin cửa hàng */}
      <div className="p-4 flex flex-col gap-3 flex-grow">
        {/* Tên cửa hàng + Nhãn NEW */}
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-[16px] text-gray-800">{store.name}</h3>
          {store.isNew && (
            <span className="bg-[#003399] text-[#FFD700] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              New
            </span>
          )}
        </div>

        {/* Địa chỉ, Giờ, SĐT */}
        <div className="text-[13px] text-gray-600 flex flex-col gap-2.5">
          {/* Địa chỉ */}
          <div className="flex items-start gap-2">
            <span className="mt-0.5">📍</span>
            <p className="line-clamp-2">{store.address}</p>
          </div>

          {/* Giờ mở cửa + Nút trạng thái */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>⏰</span>
              <p>{store.time}</p>
            </div>
            {store.isOpen ? (
              <span className="bg-[#E6F0FF] text-[#0057D9] px-3 py-1 rounded text-[11px] font-medium">
                Đang mở
              </span>
            ) : (
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded text-[11px] font-medium">
                Đóng cửa
              </span>
            )}
          </div>

          {/* Số điện thoại + Nút Xem bản đồ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>📞</span>
              <p>{store.phone}</p>
            </div>
            <a
              href={store.mapLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded text-[11px] font-medium hover:bg-gray-50 transition-colors text-black"
            >
              <span>🗺️</span> Xem bản đồ
            </a>
          </div>
        </div>

        {/* Link Xem chi tiết (Nằm dưới cùng) */}
        <div className="mt-auto pt-2">
          <Link
            href={`/he-thong-cua-hang/${store.id}`}
            className="text-[#0057D9] text-[13px] font-medium flex items-center gap-1 hover:underline w-fit"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Xem Chi Tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
