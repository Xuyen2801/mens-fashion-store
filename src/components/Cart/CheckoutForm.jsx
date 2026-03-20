"use client";
import { useState } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { shippingMethods, ORDER_STATUS } from "../../data/Product/product-ao/ao-thun.js";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const genOrderId = () =>
  "DUSK" + Date.now().toString().slice(-8);

export default function CheckoutForm({ onBack, onSuccess }) {
  const { state, dispatch, subtotal } = useCart();

  // ✅ CHỈ LẤY SẢN PHẨM ĐƯỢC CHỌN
  const selectedItems = state.items.filter((i) => i.selected);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  });

  const [errors, setErrors] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);

  const selectedShipping =
    shippingMethods.find((s) => s.id === state.shippingMethod) || shippingMethods[0];

  const v = state.appliedVoucher;

  let discount = 0;
  let shippingFee = selectedShipping.price;

  if (v && !v.error) {
    if (v.type === "percent") discount = Math.round((subtotal * v.value) / 100);
    else if (v.type === "fixed") discount = Math.min(v.value, subtotal);
    else if (v.type === "shipping") shippingFee = 0;
  }

  const total = subtotal - discount + shippingFee;

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Vui lòng nhập họ tên";
    if (!/^0[0-9]{9}$/.test(form.phone)) errs.phone = "Số điện thoại không hợp lệ";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email không hợp lệ";
    if (!form.address.trim()) errs.address = "Vui lòng nhập địa chỉ";
    if (!form.city.trim()) errs.city = "Vui lòng chọn tỉnh/thành";
    return errs;
  };

  const handleInput = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // ❗ Không cho checkout nếu chưa chọn sản phẩm
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm!");
      return;
    }

    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));

    const order = {
      id: genOrderId(),
      items: selectedItems, // ✅ FIX QUAN TRỌNG
      shippingInfo: form,
      shippingMethod: selectedShipping,
      paymentMethod: "cod", // ✅ chỉ 1 hình thức
      voucher: state.appliedVoucher,
      note: state.note,
      subtotal,
      discount,
      shippingFee,
      total,
      status: ORDER_STATUS.PENDING.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "PLACE_ORDER", payload: order });

    setIsPlacing(false);
    onSuccess(order);
  };

  const fields = [
    { id: "fullName", label: "Họ và tên *", type: "text", placeholder: "Nguyễn Văn A" },
    { id: "phone", label: "Số điện thoại *", type: "tel", placeholder: "0901234567" },
    { id: "email", label: "Email", type: "email", placeholder: "email@example.com" },
    { id: "address", label: "Địa chỉ *", type: "text", placeholder: "Số nhà, tên đường..." },
    { id: "city", label: "Tỉnh / Thành phố *", type: "text", placeholder: "Hồ Chí Minh" },
    { id: "district", label: "Quận / Huyện", type: "text", placeholder: "Quận 1" },
    { id: "ward", label: "Phường / Xã", type: "text", placeholder: "Phường Bến Nghé" },
  ];

  return (
    <div className="checkout-form">
      <button className="back-link" onClick={onBack}>
        ← Quay lại giỏ hàng
      </button>

      <div className="checkout-grid">
        {/* LEFT */}
        <div className="checkout-left">
          <section className="cf-section">
            <h3 className="cf-section-title">
              <span className="step-num">1</span> Thông tin giao hàng
            </h3>

            <div className="cf-fields">
              {fields.map((f) => (
                <div key={f.id} className={`cf-field ${errors[f.id] ? "has-error" : ""}`}>
                  <label className="cf-label">{f.label}</label>
                  <input
                    className="cf-input"
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={handleInput(f.id)}
                  />
                  {errors[f.id] && <p className="cf-error">{errors[f.id]}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* ✅ CHỈ 1 HÌNH THỨC THANH TOÁN */}
          <section className="cf-section">
            <h3 className="cf-section-title">
              <span className="step-num">2</span> Thanh toán
            </h3>

            <div className="payment-opt active">
              💵 Thanh toán khi nhận hàng (COD)
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="checkout-right">
          <section className="cf-section sticky-top">
            <h3 className="cf-section-title">
              <span className="step-num">3</span> Sản phẩm đã chọn
            </h3>

            <div className="review-items">
              {/* ✅ FIX CHÍNH */}
              {selectedItems.map((item) => (
                <div key={item.key} className="review-item">
                  <img src={item.product.image} className="review-img" />

                  <div className="review-info">
                    <p className="review-name">{item.product.name}</p>
                    <p className="review-meta">
                      {item.selectedSize} · {item.selectedColor} · x{item.quantity}
                    </p>
                  </div>

                  <span className="review-price">
                    {fmt((item.product.salePrice ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="review-totals">
              <div className="total-row">
                <span>Tạm tính</span>
                <span>{fmt(subtotal)}</span>
              </div>

              <div className="total-row">
                <span>Vận chuyển</span>
                <span>{shippingFee === 0 ? "Miễn phí" : fmt(shippingFee)}</span>
              </div>

              {discount > 0 && (
                <div className="total-row discount-row">
                  <span>Giảm giá</span>
                  <span>−{fmt(discount)}</span>
                </div>
              )}

              <div className="total-row grand-total">
                <span>Tổng cộng</span>
                <span>{fmt(total)}</span>
              </div>
            </div>

            <button
              className={`checkout-btn ${isPlacing ? "loading" : ""}`}
              onClick={handleSubmit}
            >
              {isPlacing ? "Đang xử lý..." : `Đặt hàng · ${fmt(total)}`}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}