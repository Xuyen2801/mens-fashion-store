"use client";
import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import axios from "axios";
const API_URL = "http://localhost:5000/users";

import {
  hasDuplicateIdentity,
  normalizePhone,
  validateRegistrationData,
} from "../../lib/userSchema";
import { USERS_API_URL } from "../../lib/api";


export default function RegisterForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    fullName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "otp") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (name === "phone" && onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      } else if (name === "otp" && onlyNums.length <= 6) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (error) setError("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email) {
      setError("Vui lòng nhập Email để nhận mã xác nhận.");
      return;
    }

    try {
      const checkRes = await fetch(USERS_API_URL);
      const allUsers = await checkRes.json();
      if (hasDuplicateIdentity(allUsers, formData.email)) {
        setError("Email này đã được đăng ký.");
        return;
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem("otp_demo", otp);

      setSuccess("Đang gửi mã đến email của bạn...");

      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otp }),
      });

      if (res.ok) {
        setSuccess("Mã OTP đã được gửi vào Email. Hãy kiểm tra hộp thư!");
        setStep(2); 
      } else {
        throw new Error("Gửi mail thất bại");
      }
    } catch (err) {
      setError("Lỗi: Không thể gửi mã xác nhận.");
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.otp || formData.otp.length < 6) {
      setError("Vui lòng nhập đủ 6 số OTP.");
      return;
    }

    const savedOtp = localStorage.getItem("otp_demo");
    if (formData.otp === savedOtp) {
      setSuccess("Xác thực email thành công!");
      localStorage.removeItem("otp_demo");
      setStep(3);
    } else {
      setError("Mã OTP không chính xác. Vui lòng kiểm tra lại.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullName, email, address, password, confirmPassword, phone } = formData;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      const validation = validateRegistrationData({ fullName, email, address, password, phone });
      if (!validation.valid) {
        setError(validation.errors[0]);
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          fullName: fullName,
          email: email,
          address: address,
          passwordHash: hashedPassword,
          role: "customer",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => { window.location.href = "/login"; }, 2000);
      } else {
        setError("Lỗi từ Database: Không thể lưu tài khoản.");
      }
    } catch (err) {
      setError("Lỗi kết nối khi lưu dữ liệu.");
    }
  };

  return (
    <div className="space-y-5">
      {error && <div className="p-3 border border-red-500 text-red-600 text-sm bg-red-50">{error}</div>}
      {success && <div className="p-3 border border-green-500 text-green-700 text-sm bg-green-50">{success}</div>}

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-5">
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Nhập Email để nhận mã" className="w-full border-b py-3 focus:outline-none focus:border-black" />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold uppercase">Gửi mã qua Email</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <p className="text-sm text-gray-500 italic">Mã xác nhận đã được gửi đến Email của bạn.</p>
          <input type="text" name="otp" value={formData.otp} onChange={handleInputChange} placeholder="Nhập 6 số OTP" className="w-full border-b py-3 text-center tracking-widest focus:outline-none" />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold">XÁC THỰC MÃ</button>
          <button type="button" onClick={() => setStep(1)} className="w-full text-gray-400 text-xs hover:underline">Thay đổi Email</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleRegister} className="space-y-5">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Họ và tên" className="w-full border-b py-3 focus:outline-none" />
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Địa chỉ giao hàng" className="w-full border-b py-3 focus:outline-none" />
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Số điện thoại" className="w-full border-b py-3 focus:outline-none" />
          
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="Mật khẩu" className="w-full border-b py-3 focus:outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-3 text-gray-400">
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Xác nhận mật khẩu" className="w-full border-b py-3 focus:outline-none" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-3 text-gray-400">
              {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 font-bold uppercase">Hoàn tất đăng ký</button>
        </form>
      )}
    </div>
  );
}