"use client";
import React, { useState } from "react";
import StoreCard from "../../components/store/StoreCard";
import stores from "../../store/stores";

export default function StoreLocatorPage() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const provinces = [...new Set(stores.map((store) => store.province))];
  const districts = selectedProvince
    ? [
        ...new Set(
          stores
            .filter((store) => store.province === selectedProvince)
            .map((store) => store.district),
        ),
      ]
    : [];

  const filteredStores = stores.filter((store) => {
    if (selectedProvince && store.province !== selectedProvince) return false;
    if (selectedDistrict && store.district !== selectedDistrict) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 uppercase text-gray-800">
          Hệ thống cửa hàng
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <select
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64 bg-white focus:outline-none focus:border-blue-500"
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedDistrict(""); 
            }}
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded px-4 py-2 w-full sm:w-64 bg-white focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedProvince} 
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              Không tìm thấy cửa hàng nào phù hợp với lựa chọn của bạn.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
