"use client";
import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../lib/firebase";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";
import {
  hasDuplicateIdentity,
  normalizePhone,
  validateRegistrationData,
} from "../../lib/userSchema";
import { USERS_API_URL } from "../../lib/api";

export default function RegisterForm() {
  // 🔞 3-STEP REGISTRATION FLOW (Quản lý 3 bước đăng ký)
  // Step 1: Gửi mã OTP
  // Step 2: Xác thực OTP
  // Step 3: Đống ý đăng ký tài khoản
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

    const normalizedPhone = normalizePhone(formData.phone);

    if (!normalizedPhone || normalizedPhone.length !== 10) {
      setError("Vui lòng nhập số điện thoại hợp lệ.");
      return;
    }

    try {
      // 🔍 Bước 1: Kiểm tra số điện thoại có đã đăng ký
      const res = await fetch(USERS_API_URL);
      const allUsers = await res.json();
      
      const existingUser = hasDuplicateIdentity(allUsers, normalizedPhone, "");

      if (existingUser) {
        setError("Số điện thoại này đã được đăng ký tài khoản.");
        return; // Stop néu đã đăng ký
      }

      // 🔍 Bước 2: Clear reCAPTCHA cũ (nếu có) để tạo mới
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear(); 
      }
      
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      // 🔍 Bước 3: Format phone number: 0901234567 -> +84901234567 (căn duy tapi theo FireBase)
      const rawPhone = normalizedPhone;
      const formattedPhone = `+84${rawPhone.startsWith('0') ? rawPhone.substring(1) : rawPhone}`;
      const appVerifier = window.recaptchaVerifier;

      setSuccess("Đang gửi mã xác nhận...");

      // 🔍 Bước 4: Gửi SMS OTP thông qua Firebase
      // confirmationResult sẽ lưu số điện thoại + session info
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      // Lưu confirmationResult vào window để sử dụng ở step kế tiếp (handleVerifyOTP)
      // (Chú: Cảnh báo: Không safe lưu trìn window, nên dùng state thật sự)
      window.confirmationResult = confirmationResult;

      setSuccess("Đối xác nhận đã được gửi thành công!");
      setStep(2); // Chuyển sang step 2 (verify OTP)

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
      // 🔍 Bước 2: Xác thực OTP được gửi
      // Dùng confirmationResult từ step 1 (để xác nhận đÚng số điện thoại)
      await window.confirmationResult.confirm(formData.otp);
      
      setSuccess("Xác thực OTP thành công!");
      setStep(3); // Chuyển sang step 3 (đăng ký thành công)
    } catch (err) {
      setError("Mã OTP không chính xác. Vui lòng kiểm tra lại.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, address, password, confirmPassword, phone } = formData;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      const validation = validateRegistrationData({
        fullName,
        email,
        address,
        password,
        phone,
      });

      if (!validation.valid) {
        setError(validation.errors[0]);
        return;
      }

      const checkRes = await fetch(USERS_API_URL);
      const allUsers = await checkRes.json();

      if (hasDuplicateIdentity(allUsers, validation.user.phone, validation.user.email)) {
        setError("Số điện thoại hoặc email đã được đăng ký.");
        return;
      }

      // 🔍 Bước 3.1: Mã hóa mật khẩu bằng bcryptjs (security best practice)
      const salt = await bcrypt.genSalt(10); // Đồng độ 10 (stronger = slower)
      const hashedPassword = await bcrypt.hash(password, salt);

      // 🔍 Bước 3.2: Lưu tài khoản vào database
      const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: validation.user.phone,
          fullName: validation.user.fullName,
          email: validation.user.email,
          address: validation.user.address,
          password: hashedPassword, // Lưu password đã mã hóa (NEVER lưu mãt khẩu raw)
          role: "customer",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          schemaVersion: 1,
        }),
      });

      if (response.ok) {
        // 🔍 Bước 3.3: Gửi email chào mừng (non-blocking - không bỏ cảnh báo nếu fail)
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, fullName: fullName }),
          });
          console.log("Đã gửi lệnh gửi mail thành công!");
        } catch (mailErr) {
          // Bỏ qua lỗi email - registration vẫn thành công
          console.error("Lỗi khi gọi send-email API:", mailErr);
        }

        toast.success("Đăng ký thành công! Kiểm tra email nhé.", {
          duration: 4000
        });

        // 🔍 Bước 3.4: Redirect sang trang login
        setTimeout(() => {
          window.location.href = "/login"; // Hard redirect để load lại session
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