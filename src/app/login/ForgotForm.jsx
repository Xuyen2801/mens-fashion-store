"use client";
import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import { chooseLatestUserByPhone, normalizePhone } from "../../lib/userSchema";
import { USERS_API_URL } from "../../lib/api";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ForgotPassword({ onSwitchTab }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Vui lòng nhập email.");
      return;
    }

    try {
      const resUsers = await fetch(USERS_API_URL);
      const allUsers = await resUsers.json();
      const validUser = allUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());

      if (!validUser) {
        setError("Email này chưa được đăng ký trong hệ thống.");
        return;
      }
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      localStorage.setItem("otp_reset", generatedOtp);

      const resMail = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, otp: generatedOtp }),
      });

      if (resMail.ok) {
        setSuccess("Mã khôi phục đã được gửi vào Email của bạn!");
        setStep(2);
      } else {
        throw new Error("Gửi mail thất bại");
      }

    } catch (err) {
      console.error("Lỗi gửi OTP:", err);
      setError("Không thể gửi mã. Vui lòng thử lại sau.");
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError("");

    const savedOtp = localStorage.getItem("otp_reset");
    if (otp === savedOtp) {
      setSuccess("Xác thực thành công. Hãy đặt mật khẩu mới.");
      localStorage.removeItem("otp_reset"); 
      setStep(3);
    } else {
      setError("Mã OTP không chính xác.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      const resUsers = await fetch(USERS_API_URL);
      const allUsers = await resUsers.json();
      const validUser = allUsers.find(u => u.email?.toLowerCase() === email.toLowerCase());

      if (!validUser) {
        setError("Lỗi: Không tìm thấy tài khoản.");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const patchRes = await fetch(`${USERS_API_URL}/${validUser.id || validUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordHash: hashedPassword,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (patchRes.ok) {
        toast.success("Mật khẩu mới đã được cập nhật thành công!");
        setTimeout(() => {
          onSwitchTab("login");
        }, 1500);
      } else {
        setError("Lỗi từ server khi cập nhật mật khẩu.");
      }
    } catch (err) {
      console.error("Lỗi cập nhật mật khẩu:", err);
      setError("Lỗi hệ thống.");
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs italic rounded">{error}</div>}
      {success && <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs italic rounded">{success}</div>}

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <p className="text-gray-500 text-[11px] uppercase font-bold">Nhập Email khôi phục</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full border-b py-2 focus:outline-none focus:border-black transition-all"
            required
          />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all">
            Gửi mã qua Email
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="text-center">
            <p className="text-gray-400 text-[10px]">Mã đã gửi đến: <span className="text-black font-bold">{email}</span></p>
          </div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="------"
            className="w-full border-b py-3 focus:outline-none text-center text-2xl font-bold tracking-[10px]"
            required
          />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all">
            Xác minh mã OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <p className="text-gray-500 text-[11px] uppercase font-bold">Thiết lập mật khẩu mới</p>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Mật khẩu mới"
              className="w-full border-b py-2 pr-10 focus:outline-none focus:border-black transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2 text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
              className="w-full border-b py-2 pr-10 focus:outline-none focus:border-black transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-2 text-gray-400 hover:text-black transition-colors"
            >
              {showConfirmPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all mt-4">
            Đặt lại mật khẩu
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() => onSwitchTab("login")}
        className="w-full text-center text-gray-400 text-[10px] uppercase hover:text-black transition-colors"
      >
        ← Quay lại đăng nhập
      </button>
    </div>
  );
}