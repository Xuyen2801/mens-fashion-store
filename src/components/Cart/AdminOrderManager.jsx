"use client";
import { useState } from "react";
import { useCart } from "./CartContext";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);

// 5 trạng thái admin
const ADMIN_STATUSES = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xác nhận" },
  { key: "CONFIRMED", label: "Đã xác nhận" },
  { key: "SHIPPING", label: "Đang giao" },
  { key: "DELIVERED", label: "Đã giao" },
  { key: "CANCELLED", label: "Đã hủy" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING": return "#f39c12";
    case "CONFIRMED": return "#3498db";
    case "SHIPPING": return "#9b59b6";
    case "DELIVERED": return "#2ecc71";
    case "CANCELLED": return "#e74c3c";
    default: return "#7f8c8d";
  }
};

// validate flow
const canUpdate = (current, next) => {
  const flow = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED"];

  if (current === "CANCELLED") return false;

  if (next === "CANCELLED") {
    return current !== "DELIVERED";
  }

  const curIndex = flow.indexOf(current);
  const nextIndex = flow.indexOf(next);

  return nextIndex === curIndex + 1;
};

export default function AdminOrderManager() {
  const { state, dispatch } = useCart();
  const [filter, setFilter] = useState("ALL");

  // const updateStatus = (orderId, status) => {
  //   dispatch({
  //     type: "UPDATE_ORDER_STATUS",
  //     payload: { orderId, status },
  //   });
  // };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        dispatch({
          type: "UPDATE_ORDER_STATUS",
          payload: { orderId, status: newStatus },
        });
        alert("Cập nhật trạng thái thành công!");
      } else {
        alert("Lỗi server: Không thể cập nhật đơn hàng.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // lọc đơn hàng
  const filteredOrders =
    filter === "ALL"
      ? state.orders
      : state.orders.filter((o) => o.status === filter);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý đơn hàng (Admin)</h2>

      {/* 🔥 Tabs filter */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {ADMIN_STATUSES.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: filter === s.key ? "2px solid #111" : "1px solid #ccc",
              background: filter === s.key ? "#111" : "#fff",
              color: filter === s.key ? "#fff" : "#333",
              cursor: "pointer",
            }}
          >
            {s.label}
            {s.key !== "ALL" && (
              <span style={{ marginLeft: 6 }}>
                ({state.orders.filter((o) => o.status === s.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 🔥 List đơn */}
      {filteredOrders.length === 0 ? (
        <p>Không có đơn hàng</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>#{order.id}</h3>
            <p>Khách: {order.shippingInfo.fullName}</p>
            <p>Tổng tiền: {fmt(order.total)}</p>

            {/* <p>
              Trạng thái:
              <strong style={{ marginLeft: 5 }}>{order.status}</strong>
            </p> */}

            <p>
              Trạng thái:
              <span style={{
                marginLeft: 10,
                padding: "4px 12px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: getStatusColor(order.status) // Áp dụng hàm màu của bạn
              }}>
                {ADMIN_STATUSES.find(s => s.key === order.status)?.label}
              </span>
            </p>

            {/* đổi trạng thái */}
            <select
              value={order.status}
              onChange={(e) => {
                const next = e.target.value;
                if (canUpdate(order.status, next)) {
                  updateStatus(order.id, next);
                } else {
                  alert("Không thể chuyển trạng thái này!");
                }
              }}
            >
              {ADMIN_STATUSES.filter((s) => s.key !== "ALL").map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* sản phẩm */}
            <div style={{ marginTop: "10px" }}>
              {order.items.map((item) => (
                <div key={item.key}>
                  - {item.product.name} x{item.quantity}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}