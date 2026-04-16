// src/components/cart/CheckoutForm.jsx
import { useEffect, useState } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { loadAoThunMeta } from "../../lib/aoThunMeta";
import toast from "react-hot-toast";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const genOrderId = () =>
  "DUSK" + Date.now().toString().slice(-8);

export default function CheckoutForm({ onBack, onSuccess }) {
  const { state, dispatch } = useCart();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [ORDER_STATUS, setORDER_STATUS] = useState(null);
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
  const selectedItemKeys = Array.isArray(state.selectedItemKeys) ? state.selectedItemKeys : [];
  const selectedItems = state.items.filter((item) => selectedItemKeys.includes(item.key));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity,
    0
  );

  useEffect(() => {
    loadAoThunMeta()
      .then(({ paymentMethods, shippingMethods, ORDER_STATUS }) => {
        const allowedPaymentMethods = paymentMethods.filter((pm) => ["cod", "bank_transfer"].includes(pm.id));

        setPaymentMethods(allowedPaymentMethods);
        setShippingMethods(shippingMethods);
        setORDER_STATUS(ORDER_STATUS);

        if (!state.shippingMethod && shippingMethods.length > 0) {
          dispatch({ type: "SET_SHIPPING", payload: shippingMethods[0].id });
        }

        if (!allowedPaymentMethods.some((pm) => pm.id === state.paymentMethod) && allowedPaymentMethods.length > 0) {
          dispatch({ type: "SET_PAYMENT", payload: allowedPaymentMethods[0].id });
        }
      })
      .catch((error) => console.error("Failed to load ao-thun meta:", error));
  }, [dispatch, state.paymentMethod, state.shippingMethod]);

  const selectedShipping =
    shippingMethods.find((s) => s.id === state.shippingMethod) || shippingMethods[0] || { price: 0, name: "" };

  // 💰 TÍnh giá: subtotal -> áp voucher -> + shipping fee = total
  const v = state.appliedVoucher; // voucher đã áp dụng
  let discount = 0;
  let shippingFee = selectedShipping.price;

  // Kiểm tra voucher có hợp lệ (không có error)
  if (v && !v.error) {
    // 3 loại voucher: percent (%), fixed (cố định), shipping (miễn phí vận chuyển)
    if (v.type === "percent") {
      // Giảm theo %: VD 10% off = 10% của subtotal
      discount = Math.round((subtotal * v.value) / 100);
    } else if (v.type === "fixed") {
      // Giảm số tiền cố định: VD -20k
      // Math.min() đảm bảo discount không vượt quá subtotal (không được âm tiền)
      discount = Math.min(v.value, subtotal);
    } else if (v.type === "shipping") {
      // Miễn phí vận chuyển: set shipping fee = 0
      shippingFee = 0;
    }
  }

  // Tổng tiền cuối cùng
  const total = subtotal - discount + shippingFee;

  const validate = () => {
    const errs = {};
    if (!selectedItems.length) errs.items = "Vui lòng chọn ít nhất 1 sản phẩm để thanh toán";
    if (!form.fullName.trim()) errs.fullName = "Vui lòng nhập họ tên";
    if (!/^0[0-9]{9}$/.test(form.phone)) errs.phone = "Số điện thoại không hợp lệ";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email không hợp lệ";
    if (!form.address.trim()) errs.address = "Vui lòng nhập địa chỉ";
    if (!form.city.trim()) errs.city = "Vui lòng chọn tỉnh/thành";
    if (!state.paymentMethod) errs.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    if (!selectedShipping?.id && shippingMethods.length > 0) errs.shippingMethod = "Vui lòng chọn phương thức vận chuyển";
    return errs;
  };

  // 🔗 CURRIED FUNCTION: handleInput(field) trả về function (e) => {...}
  // Ưu điểm:
  // - Tạo unique handler cho mỗi field mà không cần useState cho từng field
  // - Syntax ngắn gọn: onChange={handleInput("fullName")} thay vì onChange={(e) => handleInput(e, "fullName")}
  // - Pattern này hay dùng trong React forms
  // VD: User gõ vào fullName input -> handleInput("fullName")(e) được gọi
  // -> Cập nhật form["fullName"] = e.target.value + clear errors["fullName"]
  const handleInput = (field) => (e) => {
    // Cập nhật form data
    setForm((f) => ({ ...f, [field]: e.target.value }));
    // Clear error message khi user bắt đầu gõ
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);

      const missingRequired = [];
      if (errs.items) missingRequired.push("sản phẩm cần thanh toán");
      if (errs.fullName) missingRequired.push("họ tên");
      if (errs.phone) missingRequired.push("số điện thoại");
      if (errs.address) missingRequired.push("địa chỉ");
      if (errs.city) missingRequired.push("tỉnh/thành phố");
      if (errs.paymentMethod) missingRequired.push("phương thức thanh toán");

      toast.error(
        missingRequired.length > 0
          ? `Vui lòng điền/chọn: ${missingRequired.join(", ")}`
          : "Vui lòng điền đầy đủ thông tin bắt buộc"
      );

      return;
    }

    setIsPlacing(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      setIsPlacing(false);
      return;
    }

    const pendingStatus = ORDER_STATUS?.PENDING || {
      key: "PENDING",
      label: "Chờ xác nhận",
    };

    const order = {
      id: genOrderId(),
      userId: user.id,
      items: selectedItems,
      shippingInfo: form,
      shippingMethod: selectedShipping,
      paymentMethod: state.paymentMethod || "cod",
      voucher: state.appliedVoucher,
      note: state.note,
      subtotal,
      discount,
      shippingFee,
      total,
      status: pendingStatus.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          status: pendingStatus.key,
          label: pendingStatus.label,
          time: new Date().toISOString(),
          note: "Đơn hàng đã được đặt thành công",
        },
      ],
    };

    try {
      // GỬI DỮ LIỆU LÊN MONGODB
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        // Nếu lưu DB thành công mới xóa giỏ hàng và chuyển trang
        dispatch({ type: "PLACE_ORDER", payload: { order, itemKeys: selectedItemKeys } });
        toast.success("Đặt hàng thành công!");
        onSuccess(order);
      } else {
        throw new Error("Không thể lưu đơn hàng vào Database");
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      toast.error("Lỗi kết nối Server. Vui lòng thử lại!");
    } finally {
      setIsPlacing(false);
    }
  }

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
            {errors.items && <p className="cf-error">{errors.items}</p>}
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
            {errors.paymentMethod && <p className="cf-error" style={{ marginBottom: 8 }}>{errors.paymentMethod}</p>}
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
              {selectedItems.map((item) => (
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
              disabled={isPlacing || !selectedItems.length}
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