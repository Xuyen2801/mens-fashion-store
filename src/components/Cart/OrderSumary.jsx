// src/components/cart/OrderSummary.jsx
import { useState } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { shippingMethods } from "../../data/Product/product-ao/ao-thun";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function OrderSummary({ onCheckout }) {
  const { state, dispatch, subtotal } = useCart();
  const [voucherInput, setVoucherInput] = useState("");

  const selectedShipping =
    shippingMethods.find((s) => s.id === state.shippingMethod) || shippingMethods[0];

  // Calculate discount
  let discount = 0;
  let shippingFee = selectedShipping.price;
  const v = state.appliedVoucher;
  if (v && !v.error) {
    if (v.type === "percent") discount = Math.round((subtotal * v.value) / 100);
    else if (v.type === "fixed") discount = Math.min(v.value, subtotal);
    else if (v.type === "shipping") shippingFee = 0;
  }

  const total = subtotal - discount + shippingFee;

  const applyVoucher = () => {
    dispatch({ type: "APPLY_VOUCHER", payload: voucherInput });
  };

  return (
    <div className="order-summary">
      <h3 className="summary-title">Tóm tắt đơn hàng</h3>

      {/* Shipping method */}
      <div className="summary-section">
        <p className="section-label">Phương thức vận chuyển</p>
        <div className="shipping-options">
          {shippingMethods.map((sm) => (
            <label key={sm.id} className={`shipping-opt ${state.shippingMethod === sm.id ? "active" : ""}`}>
              <input
                type="radio"
                name="shipping"
                value={sm.id}
                checked={state.shippingMethod === sm.id}
                onChange={() => dispatch({ type: "SET_SHIPPING", payload: sm.id })}
              />
              <span className="ship-info">
                <span className="ship-name">{sm.name}</span>
                <span className="ship-desc">{sm.description}</span>
              </span>
              <span className="ship-price">{sm.price === 0 ? "Miễn phí" : fmt(sm.price)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Voucher */}
      <div className="summary-section">
        <p className="section-label">Mã giảm giá</p>
        {v && !v.error ? (
          <div className="voucher-applied">
            <span>🎟️ {v.code} — {v.label}</span>
            <button className="remove-voucher" onClick={() => dispatch({ type: "REMOVE_VOUCHER" })}>✕</button>
          </div>
        ) : (
          <div className="voucher-input-row">
            <input
              type="text"
              className="voucher-input"
              placeholder="Nhập mã voucher..."
              value={voucherInput}
              onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && applyVoucher()}
            />
            <button className="apply-btn" onClick={applyVoucher}>Áp dụng</button>
          </div>
        )}
        {v?.error && <p className="voucher-error">{v.error}</p>}
      </div>

      {/* Note */}
      <div className="summary-section">
        <p className="section-label">Ghi chú đơn hàng</p>
        <textarea
          className="order-note"
          placeholder="Ghi chú cho người bán..."
          value={state.note}
          onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
          rows={2}
        />
      </div>

      {/* Totals */}
      <div className="summary-totals">
        <div className="total-row">
          <span>Tạm tính</span>
          <span>{fmt(subtotal)}</span>
        </div>
        <div className="total-row">
          <span>Vận chuyển ({selectedShipping.name})</span>
          <span>{shippingFee === 0 ? <span className="free-tag">Miễn phí</span> : fmt(shippingFee)}</span>
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
        className="checkout-btn"
        onClick={onCheckout}
        disabled={!state.items.length}
      >
        Tiến hành thanh toán
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}