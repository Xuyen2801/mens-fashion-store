"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import stores from "../../../store/stores"; // Trở ra ngoài 4 cấp để lấy data

export default function StoreDetailPage({ params }) {
  // Lấy id từ trên đường dẫn (URL)
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  // Tìm cửa hàng có id tương ứng trong file data/stores.js
  const store = stores.find((s) => s.id === id);

  // Nếu nhập sai link hoặc không có cửa hàng đó
  if (!store) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Không tìm thấy cửa hàng!</h1>
        <Link
          href="/he-thong-cua-hang"
          className="text-blue-600 hover:underline"
        >
          &larr; Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Nút quay lại */}
        <Link
          href="/he-thong-cua-hang"
          className="text-blue-600 hover:underline mb-8 inline-block font-medium"
        >
          &larr; Xem tất cả cửa hàng
        </Link>

        {/* Tên cửa hàng (Tiêu đề lớn) */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 uppercase text-gray-800">
          {store.name}
        </h1>

        {/* Hộp thông tin (Bao quanh bằng viền mỏng giống thiết kế) */}
        <div className="border border-gray-200 p-6 md:p-8 mb-8 text-[15px] md:text-[16px]">
          <div className="font-bold text-black mb-6">
            Cửa hàng nhượng quyền thương hiệu
          </div>

          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-2 mb-6">
            <div className="max-w-2xl">
              <div className="font-bold text-black mb-1">Địa chỉ</div>
              <p className="text-gray-700">{store.address}</p>
            </div>
            <a
              href={store.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0057D9] hover:underline shrink-0"
            >
              Chỉ đường
            </a>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-bold text-black">Giờ mở cửa</div>
            <div className="text-gray-700 uppercase">
              {/* Sửa lại format giờ giống mẫu thiết kế */}
              {store.time
                .replace(":", "H")
                .replace(" - ", " - ")
                .replace(":", "H")}
            </div>
          </div>
        </div>

        {/* Hình ảnh cửa hàng cỡ lớn */}
        <div className="w-full relative aspect-[16/9] md:aspect-[2/1] bg-gray-100 mt-6">
          <Image
            src={store.image}
            alt={store.name}
            layout="fill"
            objectFit="cover" // Cắt ảnh cho vừa khung hình
            className="rounded shadow-sm"
          />
        </div>
      </main>
    </div>
  );
}
