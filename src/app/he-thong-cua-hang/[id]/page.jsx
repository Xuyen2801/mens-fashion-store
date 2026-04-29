"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import stores from "../../../store/stores"; 

export default function StoreDetailPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const store = stores.find((s) => s.id === id);

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
        <Link
          href="/he-thong-cua-hang"
          className="text-blue-600 hover:underline mb-8 inline-block font-medium"
        >
          &larr; Xem tất cả cửa hàng
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 uppercase text-gray-800">
          {store.name}
        </h1>

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
              {store.time
                .replace(":", "H")
                .replace(" - ", " - ")
                .replace(":", "H")}
            </div>
          </div>
        </div>

        <div className="w-full relative aspect-[16/9] md:aspect-[2/1] bg-gray-100 mt-6">
          <Image
            src={store.image}
            alt={store.name}
            layout="fill"
            objectFit="cover" 
            className="rounded shadow-sm"
          />
        </div>
      </main>
    </div>
  );
}
