"use client";
import React, { useState, useEffect } from "react";
import { auth } from "@/src/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/users";

export default function ForgotPassword({ onSwitchTab }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(API_URL); 
      const allUsers = await res.json();

      console.log("Tất cả User trong DB:", allUsers);

      const validUser = allUsers.find(u => 
        u.phone.trim() === phone.trim() && u.password
      );

      if (!validUser) {
        setError("Số điện thoại này chưa được đăng ký hệ thống.");
        return;
      }

      console.log("Tìm thấy:", validUser.fullName);

      const rawPhone = phone.trim();
      const formattedPhone = `+84${rawPhone.startsWith('0') ? rawPhone.substring(1) : rawPhone}`;
      
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      window.confirmationResult = confirmationResult;
      setSuccess("Mã khôi phục đã được gửi!");
      setStep(2);

    } catch (err) {
      console.error("Lỗi chi tiết:", err);
      setError("Lỗi hệ thống");
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      await window.confirmationResult.confirm(otp);
      setStep(3);
      setSuccess("Xác thực thành công. Hãy đặt mật khẩu mới.");
    } catch (err) {
      setError("Mã OTP không đúng.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      const res = await fetch(API_URL); 
      const allUsers = await res.json();
      
      const validUser = allUsers.find(u => u.phone.trim() === phone.trim());

      if (!validUser) {
        setError("Lỗi: Không tìm thấy tài khoản để cập nhật.");
        return;
      }

      console.log("Đang cập nhật mật khẩu cho ID:", validUser.id);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const patchRes = await fetch(`${API_URL}/${validUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: hashedPassword }),
      });

      if (patchRes.ok) {
        toast.success("Mật khẩu mới đã được cập nhật! Đăng nhập thôi Vy ơi.", {
        duration: 4000
        });

        setTimeout(() => {
        onSwitchTab("login"); 
        }, 1500);
      } else {
        setError("Lỗi: Server từ chối cập nhật mật khẩu.");
      }
    } catch (err) {
      console.error("Lỗi cập nhật Bước 3:", err);
      setError("Lỗi cập nhật mật khẩu.");
    }
  };

  return (
    <div className="space-y-5">
      <div id="recaptcha-container"></div>
      {error && <p className="text-red-500 text-sm italic">{error}</p>}
      {success && <p className="text-green-600 text-sm italic">{success}</p>}

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập SĐT đã đăng ký" className="w-full border-b py-2 focus:outline-none" />
          <button type="submit" className="w-full bg-black text-white py-2 font-bold text-xs">GỬI MÃ KHÔI PHỤC</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Nhập mã OTP" className="w-full border-b py-2 focus:outline-none text-center tracking-widest" />
          <button type="submit" className="w-full bg-black text-white py-2 font-bold text-xs">XÁC MINH</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mật khẩu mới" className="w-full border-b py-2 focus:outline-none" />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Xác nhận mật khẩu" className="w-full border-b py-2 focus:outline-none" />
          <button type="submit" className="w-full bg-black text-white py-2 font-bold text-xs">ĐẶT LẠI MẬT KHẨU</button>
        </form>
      )}

      <button onClick={() => onSwitchTab("login")} className="w-full text-center text-gray-500 text-xs hover:underline">Quay lại đăng nhập</button>
    </div>
  );
}