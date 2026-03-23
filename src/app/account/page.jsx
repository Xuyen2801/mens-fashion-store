"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiBox, FiTruck, FiStar } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Đã đăng xuất thành công!");
    router.push("/login");
  };

  if (!user) return <div className="text-center mt-20">Đang tải thông tin...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#F8F9FA] min-h-screen">
      <div className="bg-gray-100 py-3 px-4 rounded-md text-[13px] text-gray-500 mb-6">
        Trang chủ <span className="mx-2">/</span> <span className="text-gray-800">Thông tin của tôi</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="font-bold text-lg mb-6 text-gray-800">Trung tâm cá nhân</h2>

          <div className="mb-6">
            <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-black block"></span> Tài khoản của tôi
            </h3>
            <ul className="pl-5 space-y-3 text-[14px] text-gray-500">
              <li className="font-semibold text-black cursor-pointer">Thông tin của tôi</li>
              <li className="hover:text-black cursor-pointer transition-colors">Sổ địa chỉ</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đo lường của tôi</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-black block"></span> Trạng thái đơn hàng
            </h3>
            <ul className="pl-5 space-y-3 text-[14px] text-gray-500">
              <li className="hover:text-black cursor-pointer transition-colors">Tất cả các đơn hàng</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đơn hàng xử lý</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đơn hàng chờ lấy hàng</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đơn hàng đang giao</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đơn hàng đã giao</li>
              <li className="hover:text-black cursor-pointer transition-colors">Chưa đánh giá</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đã đánh giá</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đơn hàng đã hủy</li>
              <li className="hover:text-black cursor-pointer transition-colors">Đơn hàng trả lại</li>
            </ul>
          </div>

          <button 
            onClick={handleLogout}
            className="font-bold text-[15px] text-black hover:text-red-600 transition-colors"
          >
            Đăng xuất
          </button>
        </div>

        <div className="flex-1 space-y-6">
          
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">Chào, {user.fullName}</h1>
              <button className="text-[13px] text-gray-500 hover:text-black">Thông tin của tôi &gt;</button>
            </div>

            <div className="flex gap-10">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold">0</span>
                <span className="text-[14px] text-gray-700 font-medium">Phiếu giảm giá</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCrown className="text-yellow-500 text-xl mb-1" />
                <span className="text-[14px] text-gray-700 font-medium">Member</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-lg font-bold">Đơn hàng của tôi</h2>
              <button className="text-[13px] text-gray-500 hover:text-black">Xem tất cả &gt;</button>
            </div>

            <div className="flex justify-around items-center">
              
              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative mb-2">
                  <FiCreditCard className="text-3xl text-gray-700 group-hover:text-black" />
                  <span className="absolute -top-1 -right-2 bg-[#E1251B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                </div>
                <span className="text-[13px] text-gray-700 font-medium group-hover:text-black">Chờ xác nhận</span>
              </div>

              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative mb-2">
                  <FiBox className="text-3xl text-gray-700 group-hover:text-black" />
                  <span className="absolute -top-1 -right-2 bg-[#E1251B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                </div>
                <span className="text-[13px] text-gray-700 font-medium group-hover:text-black">Chờ lấy hàng</span>
              </div>

              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative mb-2">
                  <FiTruck className="text-3xl text-gray-700 group-hover:text-black" />
                  <span className="absolute -top-1 -right-2 bg-[#E1251B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                </div>
                <span className="text-[13px] text-gray-700 font-medium group-hover:text-black">Đang giao</span>
              </div>

              <div className="flex flex-col items-center cursor-pointer group">
                <div className="relative mb-2">
                  <FiStar className="text-3xl text-gray-700 group-hover:text-black" />
                  <span className="absolute -top-1 -right-2 bg-[#E1251B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
                </div>
                <span className="text-[13px] text-gray-700 font-medium group-hover:text-black">Đánh giá</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}