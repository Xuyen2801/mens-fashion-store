"use client";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast"; 
import { chooseLatestUserByPhone, normalizePhone } from "../../lib/userSchema";
import { USERS_API_URL } from "../../lib/api";

export default function LoginForm({ onSwitchTab }) {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 10) setFormData({ ...formData, [name]: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.phone || !formData.password) {
      setError("Vui lòng nhập đầy đủ số điện thoại và mật khẩu.");
      return;
    }

    try {
      const response = await fetch(USERS_API_URL);
      const allUsers = await response.json();

      const user = chooseLatestUserByPhone(allUsers, normalizePhone(formData.phone));

      if (!user) {
        setError("Số điện thoại này chưa được đăng ký.");
        return;
      }

      const isMatch = await bcrypt.compare(formData.password, user.password);

      if (!isMatch) {
        setError("Mật khẩu không chính xác.");
        toast.error("Mật khẩu không chính xác!");
        return;
      }

      toast.success(`Chào mừng ${user.fullName} đã quay trở lại!`, {
        duration: 3000
    });
      
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        fullName: user.fullName,
        phone: user.phone
      }));

    setTimeout(() => {
        window.location.href = "/account";
    }, 1000);

    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="border border-red-500 text-red-600 text-[14px] p-3 flex items-start gap-2 bg-red-50">
          <span>•</span>
          <span>{error}</span>
        </div>
      )}

      <div>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Nhập số điện thoại"
          className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black text-[14px] placeholder-gray-400"
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Mật khẩu"
          className="w-full border-b border-gray-300 py-3 pr-10 focus:outline-none focus:border-black text-[14px] placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black p-2 transition-colors"
        >
          {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 mt-2 hover:bg-gray-800 transition-colors text-[14px] uppercase font-bold tracking-wider"
      >
        ĐĂNG NHẬP
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => onSwitchTab("forgot")}
          className="text-gray-600 text-[14px] hover:text-black hover:underline"
        >
          Quên mật khẩu?
        </button>
      </div>
    </form>
  );
}