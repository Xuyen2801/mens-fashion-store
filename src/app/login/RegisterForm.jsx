"use client";
import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import bcrypt from "bcryptjs";
import toast from "react-hot-toast";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState({ id: "", name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ id: "", name: "" });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
  const [detailAddress, setDetailAddress] = useState("");

  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleResendOTP = async () => {
    if (resendCountdown > 0) return; 

    setError("");
    setSuccess("Đang gửi lại mã xác nhận mới...");

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("otp_demo", newOtp);

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: newOtp }),
      });

      if (res.ok) {
        setSuccess("Mã OTP mới đã được gửi thành công!");
        setResendCountdown(60); 
      } else {
        throw new Error("Gửi mail thất bại");
      }
    } catch (err) {
      setError("Lỗi: Không thể gửi lại mã xác nhận.");
    }
  };

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch(() => setError("Không thể tải danh sách tỉnh thành."));
  }, []);

  const handleProvinceChange = (e) => {
    const pId = e.target.value;
    const pName = provinces.find((p) => p.code == pId)?.name || "";
    setSelectedProvince({ id: pId, name: pName });
    setSelectedDistrict({ id: "", name: "" });
    setSelectedWard({ id: "", name: "" });
    setDistricts([]);
    setWards([]);

    if (pId) {
      fetch(`https://provinces.open-api.vn/api/p/${pId}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
    }
  };

  const handleDistrictChange = (e) => {
    const dId = e.target.value;
    const dName = districts.find((d) => d.code == dId)?.name || "";
    setSelectedDistrict({ id: dId, name: dName });
    setSelectedWard({ id: "", name: "" });
    setWards([]);

    if (dId) {
      fetch(`https://provinces.open-api.vn/api/d/${dId}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
    }
  };

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
    const { fullName, email, password, confirmPassword, phone } = formData;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    if (!selectedProvince.id || !selectedDistrict.id || !selectedWard.id || !detailAddress) {
      setError("Vui lòng nhập đầy đủ địa chỉ giao hàng.");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const randomId = Math.random().toString(36).substr(2, 9).toUpperCase();

      const payload = {
        id: randomId,
        userId: "USER_" + randomId,
        phone: phone,
        fullName: fullName,
        email: email,
        addresses: [
          {
            id: "addr_" + Date.now(),
            receiverName: fullName,
            phone: phone,
            detail: detailAddress,
            ward: selectedWard?.name || "",
            district: selectedDistrict?.name || "",
            province: selectedProvince?.name || "",
            isDefault: true
          }
        ],
        passwordHash: hashedPassword,
        role: "customer",
        schemaVersion: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Dữ liệu gửi đi:", payload);

      const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => { window.location.href = "/login"; }, 2000);
      } else {
        setError(result.message || "Thiếu thông tin hoặc định dạng không hợp lệ.");
        console.log("Chi tiết lỗi từ Server:", result);
      }
    } catch (err) {
      console.error("Register Error:", err);
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
          <div className="text-center">
            <p className="text-sm text-gray-500 italic mb-1">Mã xác nhận đã gửi đến Email:</p>
            <p className="text-sm font-bold text-black mb-4">{formData.email}</p>
          </div>

          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            placeholder="------"
            className="w-full border-b py-3 text-center text-2xl font-bold tracking-[10px] focus:outline-none focus:border-black"
            required
          />

          <button type="submit" className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest">
            XÁC THỰC MÃ
          </button>

          <div className="text-center mt-4">
            {resendCountdown > 0 ? (
              <p className="text-xs text-gray-400">
                Gửi lại mã sau <span className="font-bold text-black">{resendCountdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase underline-offset-4 hover:underline"
              >
                Gửi lại mã OTP
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-gray-400 text-[10px] uppercase hover:text-black transition-colors"
          >
            Thay đổi địa chỉ Email
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleRegister} className="space-y-5">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Họ và tên" className="w-full border-b py-3 focus:outline-none" required />

          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Số điện thoại" className="w-full border-b py-3 focus:outline-none" required />

          <div className="space-y-3 pt-2">
            <p className="text-xs text-gray-400 font-bold uppercase">Địa chỉ giao hàng</p>

            <select required className="w-full border-b py-2 text-sm outline-none" value={selectedProvince.id} onChange={handleProvinceChange}>
              <option value="">* Chọn Tỉnh / Thành phố</option>
              {provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
            </select>

            <select required className="w-full border-b py-2 text-sm outline-none disabled:opacity-50" disabled={!selectedProvince.id} value={selectedDistrict.id} onChange={handleDistrictChange}>
              <option value="">* Chọn Quận / Huyện</option>
              {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
            </select>

            <select required className="w-full border-b py-2 text-sm outline-none disabled:opacity-50" disabled={!selectedDistrict.id} value={selectedWard.id} onChange={(e) => setSelectedWard({ id: e.target.value, name: wards.find(w => w.code == e.target.value)?.name })}>
              <option value="">* Chọn Phường / Xã</option>
              {wards.map(w => <option key={w.code} value={w.code}>{w.name}</option>)}
            </select>

            <input type="text" placeholder="Số nhà, tên đường..." className="w-full border-b py-3 focus:outline-none text-sm" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} required />
          </div>

          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} placeholder="Mật khẩu" className="w-full border-b py-3 focus:outline-none" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-3 text-gray-400">
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <div className="relative">
            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Xác nhận mật khẩu" className="w-full border-b py-3 focus:outline-none" required />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-3 text-gray-400">
              {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest mt-4">Hoàn tất đăng ký</button>
        </form>
      )}
    </div>
  );
}