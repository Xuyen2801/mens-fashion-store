"use client";
import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../lib/firebase";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";


const API_URL = "http://localhost:5000/users";

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

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible", 
        callback: (response) => {
        },
      });
    }
  }, []);

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

    if (!formData.phone || formData.phone.length < 10) {
      setError("Vui lòng nhập số điện thoại hợp lệ.");
      return;
    }

    try {
      const res = await fetch(API_URL); 
      const allUsers = await res.json();
      
      const existingUser = allUsers.find(
        (u) => u.phone.trim() === formData.phone.trim() && u.password
      );

      if (existingUser) {
        setError("Số điện thoại này đã được đăng ký tài khoản.");
        return; 
      }
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear(); 
      }
      
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const rawPhone = formData.phone.trim();
      const formattedPhone = `+84${rawPhone.startsWith('0') ? rawPhone.substring(1) : rawPhone}`;
      const appVerifier = window.recaptchaVerifier;

      setSuccess("Đang gửi mã xác nhận...");

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      window.confirmationResult = confirmationResult;

      setSuccess("Mã xác nhận đã được gửi thành công!");
      setStep(2);

    } catch (err) {
      console.error(err);
      setError("Lỗi gửi SMS. Có thể do SĐT sai hoặc yêu cầu quá nhiều lần.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.otp || formData.otp.length < 6) {
      setError("Vui lòng nhập đủ 6 số OTP.");
      return;
    }

    try {
      await window.confirmationResult.confirm(formData.otp);
      
      setSuccess("Xác thực OTP thành công!");
      setStep(3);
    } catch (err) {
      setError("Mã OTP không chính xác. Vui lòng kiểm tra lại.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, address, password, confirmPassword, phone } = formData;

    if (!fullName || !email || !address || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          fullName,
          email,
          address,
          password: hashedPassword,
          role: "customer",
          createdAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, fullName: fullName }),
          });
          console.log("Đã gửi lệnh gửi mail thành công!");
        } catch (mailErr) {
          console.error("Lỗi khi gọi API gửi mail:", mailErr);
        }

        toast.success("Đăng ký thành công! Kiểm tra email nhé.", {
        duration: 4000
        });

    setTimeout(() => {
      window.location.href = "/login"; 
    }, 2000);
      } else {
        setError("Lỗi từ DB: Không thể lưu tài khoản.");
      }

    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối khi lưu dữ liệu.");
    }
  };

  return (
    <div className="space-y-5">
      <div id="recaptcha-container"></div>

      {error && (
        <div className="border border-red-500 text-red-600 text-[14px] p-3 flex items-start gap-2">
          <span>•</span><span>{error}</span>
        </div>
      )}

      {success && (
        <div className="border border-green-500 text-green-700 text-[14px] p-3 flex items-start gap-2 bg-green-50">
          <span>✓</span><span>{success}</span>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-5">
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nhập số điện thoại" className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black text-[14px]" />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold tracking-wider">GỬI MÃ XÁC NHẬN</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <p className="text-gray-500 text-[13px] italic">Số điện thoại: <span className="font-bold text-black">{formData.phone}</span></p>
          <input type="text" name="otp" value={formData.otp} onChange={handleInputChange} placeholder="Nhập 6 số OTP" className="w-full border-b border-gray-300 py-3 tracking-widest text-[14px] focus:outline-none focus:border-black" />
          <button type="submit" className="w-full bg-black text-white py-3 font-bold tracking-wider">XÁC THỰC MÃ OTP</button>
          <button type="button" onClick={() => setStep(1)} className="w-full text-center text-gray-500 text-[13px] hover:underline mt-2">Quay lại</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleRegister} className="space-y-5">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Họ và tên" className="w-full border-b border-gray-300 py-3 text-[14px] focus:outline-none focus:border-black" />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full border-b border-gray-300 py-3 text-[14px] focus:outline-none focus:border-black" />
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Địa chỉ giao hàng" className="w-full border-b border-gray-300 py-3 text-[14px] focus:outline-none focus:border-black" />
          
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="Mật khẩu" className="w-full border-b border-gray-300 py-3 text-[14px] focus:outline-none focus:border-black w-full" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 p-2">
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Xác nhận mật khẩu" className="w-full border-b border-gray-300 py-3 text-[14px] focus:outline-none focus:border-black w-full" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 p-2">
              {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 font-bold tracking-wider mt-4">HOÀN TẤT ĐĂNG KÝ</button>
        </form>
      )}
    </div>
  );
}