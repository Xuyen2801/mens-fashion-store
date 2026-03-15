"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login"); // login, register, forgot
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (error) setError("");
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // LOGIC CHO QUÊN MẬT KHẨU
    if (activeTab === "forgot") {
      if (!formData.phone) {
        setError("Vui lòng nhập số điện thoại để nhận mã!");
        return;
      }
      if (!validatePhone(formData.phone)) {
        setError("Số điện thoại không hợp lệ!");
        return;
      }
      setSuccess("Mã xác thực đã được gửi đến số " + formData.phone);
      return;
    }

    // LOGIC CHO ĐĂNG NHẬP / ĐĂNG KÝ
    if (
      !formData.phone ||
      !formData.password ||
      (activeTab === "register" && !formData.confirmPassword)
    ) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Số điện thoại không hợp lệ!");
      return;
    }

    if (
      activeTab === "register" &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Mật khẩu xác nhận không trùng khớp!");
      return;
    }

    alert("Dữ liệu hợp lệ! Hệ thống đang xử lý...");
  };

  return (
    <div className="bg-white min-h-[70vh] flex flex-col font-sans">
      {/* BREADCRUMB */}
      <div className="max-w-6xl mx-auto w-full px-4 py-4 text-[13px] text-blue-600 flex items-center gap-2">
        <Link href="/" className="hover:underline">
          Trang chủ
        </Link>
        <span className="text-gray-300 text-[10px]">/</span>
        <span className="text-gray-500">Tài khoản</span>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow py-12 px-4">
        <h1 className="text-2xl font-normal text-gray-800 mb-8 uppercase tracking-[3px]">
          {activeTab === "forgot"
            ? "Phục hồi mật khẩu"
            : activeTab === "login"
              ? "Đăng nhập"
              : "Đăng ký"}
        </h1>

        <div
          style={{ borderRadius: "24px", maxWidth: "420px" }}
          className="bg-white p-8 md:p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full transition-all"
        >
          {activeTab !== "forgot" ? (
            /* TAB SWITCHER CHO LOGIN/REGISTER */
            <div className="flex items-center justify-center mb-6 border-b border-gray-100 relative">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setError("");
                  setSuccess("");
                }}
                className={`pb-4 font-bold text-[14px] uppercase relative ${activeTab === "login" ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black" : "text-gray-400"}`}
              >
                ĐĂNG NHẬP
              </button>
              <div style={{ width: "60px" }}></div>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setError("");
                  setSuccess("");
                }}
                className={`pb-4 font-bold text-[14px] uppercase relative ${activeTab === "register" ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black" : "text-gray-400"}`}
              >
                ĐĂNG KÝ
              </button>
            </div>
          ) : (
            <h2 className="text-center text-gray-600 text-[14px] mb-8 italic">
              Vui lòng nhập số điện thoại để lấy lại mật khẩu
            </h2>
          )}

          {/* THÔNG BÁO */}
          {error && (
            <div className="mb-4 text-red-500 text-[13px] bg-red-50 p-2.5 rounded-lg text-center border border-red-100 italic">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-green-600 text-[13px] bg-green-50 p-2.5 rounded-lg text-center border border-green-100">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input SĐT dùng chung cho cả 3 mode */}
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-black text-[15px]"
            />

            {/* Ẩn Password khi ở mode Quên mật khẩu */}
            {activeTab !== "forgot" && (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Mật khẩu"
                    className="w-full border-b border-gray-200 py-3 pr-10 focus:outline-none focus:border-black text-[15px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] font-bold p-2"
                  >
                    {showPassword ? "ẨN" : "HIỆN"}
                  </button>
                </div>

                {activeTab === "register" && (
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Xác nhận mật khẩu"
                      className="w-full border-b border-gray-200 py-3 pr-10 focus:outline-none focus:border-black text-[15px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] font-bold p-2"
                    >
                      {showConfirmPassword ? "ẨN" : "HIỆN"}
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              style={{ borderRadius: "12px" }}
              className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-gray-800 transition-all text-[14px] uppercase tracking-[1.5px]"
            >
              {activeTab === "forgot"
                ? "GỬI MÃ XÁC NHẬN"
                : activeTab === "login"
                  ? "ĐĂNG NHẬP"
                  : "ĐĂNG KÝ"}
            </button>
          </form>

          {/* LINK CHUYỂN ĐỔI PHỤ */}
          <div className="text-center mt-6">
            {activeTab === "login" ? (
              <button
                onClick={() => {
                  setActiveTab("forgot");
                  setError("");
                }}
                className="text-gray-400 text-[12px] hover:text-black hover:underline transition-all"
              >
                Quên mật khẩu?
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab("login");
                  setError("");
                  setSuccess("");
                }}
                className="text-gray-400 text-[12px] hover:text-black hover:underline transition-all flex items-center justify-center gap-1 mx-auto"
              >
                <span className="text-[14px]">←</span> Quay lại đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
