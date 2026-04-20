import { useEffect, useState } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { loadAoThunMeta } from "../../lib/aoThunMeta";
import OrderDetail from "@/app/account/orders/[id]/page";
import { useRouter } from "next/navigation";

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


export default function OrderTracker() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [orderStatus, setOrderStatus] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAoThunMeta()
      .then(({ ORDER_STATUS }) => setOrderStatus(ORDER_STATUS))
      .catch((error) => console.error("Failed to load order status meta:", error));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId || user?.id;
      if (userId) {
        try {
          const res = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch (error) {
          console.error("Lỗi lấy đơn hàng từ server:", error);
        }
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const statusFilters = [
    { key: "ALL", label: "Tất cả" },
    { key: "Processing", label: "Chờ xác nhận" },
    { key: "Shipping", label: "Đang giao" },
    { key: "Delivered", label: "Đã giao" },
    { key: "Cancelled", label: "Đã hủy" },
    { key: "Returned", label: "Hoàn hàng" },
  ];

  const filtered = orders.filter(
    (o) => filterStatus === "ALL" || o.status === filterStatus
  );

  const handleCancel = async (orderId) => {
    if (window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "CANCELLED" }),
        });

        if (res.ok) {
          dispatch({
            type: "UPDATE_ORDER_STATUS",
            payload: { orderId, status: "CANCELLED" },
          });
          setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "CANCELLED" } : o));
          setSelected(null);
        }
      } catch (err) {
        console.error("Lỗi khi hủy đơn:", err);
      }
    }
  };

  const handleReturnRequest = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: orderStatus?.RETURN_REQUESTED?.key || "RETURN_REQUESTED" }),
      });

      if (res.ok) {
        dispatch({
          type: "UPDATE_ORDER_STATUS",
          payload: { orderId, status: orderStatus?.RETURN_REQUESTED?.key || "RETURN_REQUESTED" },
        });
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: orderStatus?.RETURN_REQUESTED?.key || "RETURN_REQUESTED" } : o));
        setSelected(null);
      }
    } catch (err) {
      console.error("Lỗi khi yêu cầu hoàn hàng:", err);
    }
  };

  return (
    <div className="order-tracker">
      <h2 className="section-heading">Đơn hàng của tôi</h2>

      <div className="status-filter-tabs">
        {statusFilters.map((f) => {
          // 1. Tính toán số lượng dựa trên danh sách orders đã fetch từ API
          const count = orders.filter((o) => {
            if (f.key === "ALL") return true;
            // Đảm bảo so sánh chính xác Key (Ví dụ: "Processing" hoặc "PENDING")
            return o.status === f.key;
          }).length;

          // 2. Trả về giao diện nút bấm
          return (
            <button
              key={f.key}
              className={`filter-tab ${filterStatus === f.key ? "active" : ""}`}
              onClick={() => setFilterStatus(f.key)}
            >
              {f.label}
              <span className="filter-count">
                {count > 0 ? `(${count})` : "(0)"}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-orders">
          <p>📦</p>
          <p>Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="orders-list space-y-6">
          {filtered.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 1. Header Đơn hàng */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50" style={{margin:"20px"}}>
                <div>
                  <h3 className="text-[14px] font-bold uppercase tracking-tight text-gray-900">
                    Mã đơn hàng: <span className="text-blue-700 ml-1">#{order.id}</span>
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-0.5 tracking-wider">
                    Ngày đặt: {fmtDate(order.createdAt)}
                  </p>
                </div>
                <StatusBadge statusKey={order.status} orderStatus={orderStatus} />
              </div>

              {/* 2. Danh sách sản phẩm chi tiết */}
              <div className="px-6 py-4 divide-y divide-gray-50" style={{margin:"20px"}}>
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex gap-6 items-center first:pt-0 last:pb-0" style={{margin:"10px"}}>
                    {/* Ảnh sản phẩm */}
                    <div className="w-[80px] h-[100px] flex-shrink-0 bg-gray-50">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover border border-gray-100"
                      />
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-gray-800 uppercase truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[12px] text-gray-600 mt-2 font-medium">
                        Số lượng: <span className="text-black font-bold ml-1">{item.quantity}</span>
                      </p>
                      <p className="text-[11px] text-gray-400 italic mt-1">
                        Phân loại: {item.selectedSize || 'Free'} - {item.selectedColor || 'N/A'}
                      </p>
                    </div>

                    {/* Giá của từng sản phẩm */}
                    <div className="text-[14px] font-bold text-gray-900 text-right">
                      {fmt((item.product.salePrice ?? item.product.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Footer: Tổng tiền và Nút xem chi tiết */}
              <div className="px-6 py-5 border-t border-gray-100 flex justify-between items-end bg-white" style={{margin:"20px"}}>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase font-bold tracking-[0.1em] mb-1">
                    Tổng tiền thanh toán:
                  </p>
                  <p className="text-[20px] font-black text-red-600 leading-none">
                    {fmt(order.total)}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const idToNav = order.id || order._id;
                    router.push(`/account/orders/${idToNav}`);
                  }}
                  style={{padding:"5px"}}
                  className="bg-black text-white px-6 py-2 text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-md"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
