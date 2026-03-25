"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotForm from "./ForgotForm";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login"); // login, register, forgot

  useEffect(() => {
    document.title = "Tài khoản";
  }, []);

  return (
    <div className="bg-white min-h-[70vh] flex flex-col font-sans">
      <div className="max-w-7xl mx-auto w-full px-4 py-4 text-[15px] flex items-center gap-2">
        <Link href="/" className="text-blue-500 hover:text-blue-700">Trang chủ</Link>
        <span className="text-gray-300">/</span>
        <Link href="/category" className="text-blue-500 hover:text-blue-700">Danh mục</Link>
        <span className="text-gray-300">/</span>
        <Link href="/account" className="text-blue-500 hover:text-blue-700">Tài khoản</Link>
        <span className="text-gray-300">/</span>
        <span className="text-black capitalize">
          {activeTab === "forgot" ? "Quên mật khẩu" : activeTab === "login" ? "Đăng nhập" : "Đăng ký"}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-8 px-4">
        <h1 className="text-3xl font-light text-gray-800 mb-8 uppercase tracking-wide">
          {activeTab === "forgot" ? "PHỤC HỒI MẬT KHẨU" : activeTab === "login" ? "ĐĂNG NHẬP TÀI KHOẢN" : "ĐĂNG KÝ TÀI KHOẢN"}
        </h1>

        <div className="bg-white p-8 border border-gray-200 shadow-sm w-full max-w-[480px]">
          
          {activeTab !== "forgot" && (
            <div className="flex items-center justify-center mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`pb-3 px-6 font-bold text-[16px] uppercase relative ${
                  activeTab === "login" 
                    ? "text-black after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-black" 
                    : "text-gray-400 font-normal"
                }`}
              >
                ĐĂNG NHẬP
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`pb-3 px-6 font-bold text-[16px] uppercase relative ${
                  activeTab === "register" 
                    ? "text-black after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-black" 
                    : "text-gray-400 font-normal"
                }`}
              >
                ĐĂNG KÝ
              </button>
            </div>
          )}

          {activeTab === "login" && <LoginForm onSwitchTab={setActiveTab} />}
          {activeTab === "register" && <RegisterForm />}
          {activeTab === "forgot" && <ForgotForm onSwitchTab={setActiveTab} />}

        </div>
      </div>
    </div>
  );
}
