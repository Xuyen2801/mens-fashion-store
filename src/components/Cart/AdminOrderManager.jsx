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
  { key: "ALL", label: "Tất cả đơn hàng" },
  { key: "PROCESSING", label: "Chờ xử lý" },
  { key: "CONFIRMED", label: "Chờ lấy hàng" },
  { key: "SHIPPING", label: "Đang giao" },
  { key: "DELIVERED", label: "Đã giao" },
  { key: "CANCELLED", label: "Đã hủy" },
  { key: "RETURNED", label: "Đã trả hàng" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "PROCESSING": return "#f59e0b"; // Màu cam (Amber)
    case "CONFIRMED": return "#3b82f6";  // Màu xanh dương
    case "SHIPPING": return "#8b5cf6";   // Màu tím
    case "DELIVERED": return "#10b981";  // Màu xanh lá
    case "CANCELLED": return "#ef4444";  // Màu đỏ
    case "RETURNED": return "#64748b";   // Màu xám
    default: return "#94a3b8";
  }
};

// validate flow
const canUpdate = (current, next) => {
  const flow = ["PROCESSING", "CONFIRMED", "SHIPPING", "DELIVERED"];

  if (current === "CANCELLED" || current === "RETURNED") return false;

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

  const updateStatus = async (orderId, newStatus) => {
    if (newStatus === "CONFIRMED") {
      const order = state.orders.find(o => o.id === orderId);
      // Tại đây bạn có thể gọi API kiểm tra kho một lần nữa trước khi CONFIRMED
    }
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          updatedBy: "Admin_Operator",
          updatedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        dispatch({
          type: "UPDATE_ORDER_STATUS",
          payload: { orderId, status: newStatus },
        });
        if (newStatus === "CONFIRMED") {
          console.log("Hệ thống: Đã trừ tồn kho cho đơn hàng này.");
        }
        alert("Cập nhật trạng thái thành công!");
      } else {
        alert("Lỗi server: Không thể cập nhật đơn hàng.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const filteredOrders = filter === "ALL"
    ? state.orders
    : state.orders.filter((o) => o.status?.toUpperCase() === filter.toUpperCase());

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quản lý đơn hàng (Admin)</h2>

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
                {ADMIN_STATUSES.find(s => s.key === order.status)?.label || order.status}
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

function AdminDashboard({ orders }) {
  const totalRevenue = orders
    .filter(o => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingCount = orders.filter(o => o.status === "PENDING").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
        <p className="text-gray-500 text-sm uppercase">Doanh thu thực tế</p>
        <p className="text-2xl font-bold">{fmt(totalRevenue)}</p>
      </div>
      <div className="bg-white p-6 rounded shadow border-l-4 border-orange-500">
        <p className="text-gray-500 text-sm uppercase">Đơn chờ duyệt</p>
        <p className="text-2xl font-bold">{pendingCount} đơn</p>
      </div>
      <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
        <p className="text-gray-500 text-sm uppercase">Đơn thành công</p>
        <p className="text-2xl font-bold">{orders.filter(o => o.status === "DELIVERED").length} đơn</p>
      </div>
    </div>
  );
}