// src/components/cart/OrderTracker.jsx
import { useEffect, useState } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { loadAoThunMeta } from "../../lib/aoThunMeta";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const fmtDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

function StatusBadge({ statusKey, orderStatus }) {
  const s = orderStatus?.[statusKey] || orderStatus?.PENDING || {
    label: statusKey,
    color: "#6B7280",
  };
  return (
    <span className="status-badge" style={{ "--badge-color": s.color }}>
      {s.label}
    </span>
  );
}

function OrderDetail({ order, onClose, onCancel, onReturnRequest, orderStatus }) {
  const flowSteps = orderStatus
    ? [
        orderStatus.PENDING,
        orderStatus.CONFIRMED,
        orderStatus.PROCESSING,
        orderStatus.SHIPPING,
        orderStatus.DELIVERED,
      ]
    : [];

  const isCancellable = ["PENDING", "CONFIRMED"].includes(order.status);
  const isReturnable = ["DELIVERED", "PAID"].includes(order.status);
  const isTerminal = ["CANCELLED", "RETURNED", "REFUNDED"].includes(order.status);

  const currentStep = flowSteps.findIndex((s) => s.key === order.status);

  return (
    <div className="order-detail">
      <div className="od-header">
        <div>
          <h3 className="od-id">#{order.id}</h3>
          <p className="od-date">Đặt lúc: {fmtDate(order.createdAt)}</p>
        </div>
        <div className="od-header-right">
          <StatusBadge statusKey={order.status} orderStatus={orderStatus} />
          <button className="icon-btn" onClick={onClose} aria-label="Đóng">✕</button>
        </div>
      </div>

      {/* Progress tracker */}
      {!isTerminal && (
        <div className="progress-tracker">
          {flowSteps.map((step, idx) => {
            const done = currentStep >= idx;
            const active = currentStep === idx;
            return (
              <div key={step.key} className={`prog-step ${done ? "done" : ""} ${active ? "active" : ""}`}>
                <div className="prog-circle">
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <p className="prog-label">{step.label}</p>
                {idx < flowSteps.length - 1 && (
                  <div className={`prog-line ${currentStep > idx ? "done" : ""}`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {isTerminal && (
        <div className="terminal-banner" data-status={order.status}>
          {order.status === "CANCELLED" && "❌ Đơn hàng đã bị hủy"}
          {order.status === "RETURN_REQUESTED" && "🔄 Yêu cầu hoàn hàng đang được xử lý"}
          {order.status === "RETURNED" && "📦 Hàng đã được hoàn trả"}
          {order.status === "REFUNDED" && "💰 Đã hoàn tiền thành công"}
        </div>
      )}

      {/* Items */}
      <div className="od-items">
        <p className="od-section-label">Sản phẩm ({order.items.length})</p>
        {order.items.map((item) => (
          <div key={item.key} className="od-item">
            <img src={item.product.image} alt={item.product.name} className="od-item-img" />
            <div className="od-item-info">
              <p className="od-item-name">{item.product.name}</p>
              <p className="od-item-meta">
                Size {item.selectedSize} · {item.selectedColor} · ×{item.quantity}
              </p>
            </div>
            <span className="od-item-price">
              {fmt((item.product.salePrice ?? item.product.price) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping & payment info */}
      <div className="od-meta-grid">
        <div>
          <p className="od-section-label">Giao hàng</p>
          <p>{order.shippingInfo.fullName}</p>
          <p>{order.shippingInfo.phone}</p>
          <p>{[order.shippingInfo.address, order.shippingInfo.district, order.shippingInfo.city].filter(Boolean).join(", ")}</p>
          <p className="od-ship-method">🚚 {order.shippingMethod.name}</p>
        </div>
        <div>
          <p className="od-section-label">Thanh toán</p>
          <p>{order.paymentMethod.toUpperCase()}</p>
          {order.note && <p className="od-note">📝 {order.note}</p>}
        </div>
      </div>

      {/* Totals */}
      <div className="od-totals">
        <div className="total-row"><span>Tạm tính</span><span>{fmt(order.subtotal)}</span></div>
        <div className="total-row"><span>Vận chuyển</span><span>{order.shippingFee === 0 ? "Miễn phí" : fmt(order.shippingFee)}</span></div>
        {order.discount > 0 && (
          <div className="total-row discount-row"><span>Giảm giá</span><span>−{fmt(order.discount)}</span></div>
        )}
        <div className="total-row grand-total"><span>Tổng cộng</span><span>{fmt(order.total)}</span></div>
      </div>

      {/* Actions */}
      <div className="od-actions">
        {isCancellable && (
          <button className="action-btn cancel-btn" onClick={onCancel}>
            Hủy đơn hàng
          </button>
        )}
        {isReturnable && (
          <button className="action-btn return-btn" onClick={onReturnRequest}>
            Yêu cầu hoàn hàng
          </button>
        )}
        {order.status === "DELIVERED" || order.status === "PAID" ? (
          <button className="action-btn rebuy-btn">Mua lại</button>
        ) : null}
      </div>
    </div>
  );
}

export default function OrderTracker() {
  const { state, dispatch } = useCart();
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    loadAoThunMeta()
      .then(({ ORDER_STATUS }) => setOrderStatus(ORDER_STATUS))
      .catch((error) => console.error("Failed to load order status meta:", error));
  }, []);

  const statusFilters = [
    { key: "ALL", label: "Tất cả" },
    { key: "PENDING", label: "Chờ xác nhận" },
    { key: "SHIPPING", label: "Đang giao" },
    { key: "DELIVERED", label: "Đã giao" },
    { key: "CANCELLED", label: "Đã hủy" },
    { key: "RETURNED", label: "Hoàn hàng" },
  ];

  const filtered = state.orders.filter(
    (o) => filterStatus === "ALL" || o.status === filterStatus
  );

  const handleCancel = (orderId) => {
    if (window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      dispatch({
        type: "UPDATE_ORDER_STATUS",
        payload: { orderId, status: orderStatus?.CANCELLED?.key || "CANCELLED" },
      });
      setSelected(null);
    }
  };

  const handleReturnRequest = (orderId) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status: orderStatus?.RETURN_REQUESTED?.key || "RETURN_REQUESTED" },
    });
    setSelected(null);
  };

  if (selected) {
    const order = state.orders.find((o) => o.id === selected);
    if (order) {
      return (
        <OrderDetail
          order={order}
          onClose={() => setSelected(null)}
          onCancel={() => handleCancel(order.id)}
          onReturnRequest={() => handleReturnRequest(order.id)}
          orderStatus={orderStatus}
        />
      );
    }
  }

  return (
    <div className="order-tracker">
      <h2 className="section-heading">Đơn hàng của tôi</h2>

      <div className="status-filter-tabs">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filterStatus === f.key ? "active" : ""}`}
            onClick={() => setFilterStatus(f.key)}
          >
            {f.label}
            {f.key !== "ALL" && (
              <span className="filter-count">
                {state.orders.filter((o) => o.status === f.key).length || ""}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-orders">
          <p>📦</p>
          <p>Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map((order) => (
            <div key={order.id} className="order-card" onClick={() => setSelected(order.id)}>
              <div className="oc-top">
                <span className="oc-id">#{order.id}</span>
                <StatusBadge statusKey={order.status} orderStatus={orderStatus} />
              </div>
              <div className="oc-items-preview">
                {order.items.slice(0, 3).map((item) => (
                  <img key={item.key} src={item.product.image} alt={item.product.name} className="oc-thumb" />
                ))}
                {order.items.length > 3 && (
                  <span className="oc-more">+{order.items.length - 3}</span>
                )}
                <span className="oc-summary">
                  {order.items.length} sản phẩm
                </span>
              </div>
              <div className="oc-bottom">
                <span className="oc-date">{fmtDate(order.createdAt)}</span>
                <span className="oc-total">{fmt(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}