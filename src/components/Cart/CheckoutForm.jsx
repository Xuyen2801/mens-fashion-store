// src/components/cart/CheckoutForm.jsx
import { useState } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { paymentMethods, shippingMethods, ORDER_STATUS } from "../../data/Product/Ao-thun/productsAoThun";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const genOrderId = () =>
  "DUSK" + Date.now().toString().slice(-8);

export default function CheckoutForm({ onBack, onSuccess }) {
  const { state, dispatch, subtotal } = useCart();
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

  const selectedShipping = shippingMethods.find((s) => s.id === state.shippingMethod) || shippingMethods[0];
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
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsPlacing(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));

    const order = {
      id: genOrderId(),
      items: state.items,
      shippingInfo: form,
      shippingMethod: selectedShipping,
      paymentMethod: state.paymentMethod,
      voucher: state.appliedVoucher,
      note: state.note,
      subtotal,
      discount,
      shippingFee,
      total,
      status: ORDER_STATUS.PENDING.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: ORDER_STATUS.PENDING.key,
          label: ORDER_STATUS.PENDING.label,
          time: new Date().toISOString(),
          note: "Đơn hàng đã được đặt thành công",
        },
      ],
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
        {/* Left — address & payment */}
        <div className="checkout-left">
          <section className="cf-section">
            <h3 className="cf-section-title">
              <span className="step-num">1</span> Thông tin giao hàng
            </h3>
            <div className="cf-fields">
              {fields.map((f) => (
                <div key={f.id} className={`cf-field ${errors[f.id] ? "has-error" : ""}`}>
                  <label className="cf-label" htmlFor={f.id}>{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
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

          <section className="cf-section">
            <h3 className="cf-section-title">
              <span className="step-num">2</span> Phương thức thanh toán
            </h3>
            <div className="payment-options">
              {paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`payment-opt ${state.paymentMethod === pm.id ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={pm.id}
                    checked={state.paymentMethod === pm.id}
                    onChange={() => dispatch({ type: "SET_PAYMENT", payload: pm.id })}
                  />
                  <span className="pm-icon">{pm.icon}</span>
                  <span className="pm-name">{pm.name}</span>
                  {state.paymentMethod === pm.id && (
                    <span className="pm-check">✓</span>
                  )}
                </label>
              ))}
            </div>

            {state.paymentMethod === "bank_transfer" && (
              <div className="bank-info">
                <p className="bank-info__title">Thông tin chuyển khoản</p>
                <p>Ngân hàng: <strong>Vietcombank</strong></p>
                <p>STK: <strong>1234567890</strong></p>
                <p>Chủ TK: <strong>DUSK FASHION</strong></p>
                <p className="bank-info__note">Nội dung: <strong>Mã đơn hàng</strong></p>
              </div>
            )}
          </section>
        </div>

        {/* Right — order review */}
        <div className="checkout-right">
          <section className="cf-section sticky-top">
            <h3 className="cf-section-title">
              <span className="step-num">3</span> Xác nhận đơn hàng
            </h3>

            <div className="review-items">
              {state.items.map((item) => (
                <div key={item.key} className="review-item">
                  <img src={item.product.image} alt={item.product.name} className="review-img" />
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
                <span>Tạm tính</span><span>{fmt(subtotal)}</span>
              </div>
              <div className="total-row">
                <span>Vận chuyển</span>
                <span>{shippingFee === 0 ? "Miễn phí" : fmt(shippingFee)}</span>
              </div>
              {discount > 0 && (
                <div className="total-row discount-row">
                  <span>Giảm giá ({v?.code})</span>
                  <span>−{fmt(discount)}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Tổng cộng</span><span>{fmt(total)}</span>
              </div>
            </div>

            {state.note && (
              <p className="review-note">📝 Ghi chú: {state.note}</p>
            )}

            <button
              className={`checkout-btn place-order-btn ${isPlacing ? "loading" : ""}`}
              onClick={handleSubmit}
              disabled={isPlacing}
            >
              {isPlacing ? (
                <>
                  <span className="spinner" /> Đang xử lý...
                </>
              ) : (
                <>Đặt hàng ngay · {fmt(total)}</>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}