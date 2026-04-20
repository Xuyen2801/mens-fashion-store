"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/components/Cart/CartContext";
import DashboardOverview from "@/components/Admin/DashboardOverview";
import { toast } from "react-hot-toast";

const ADMIN_STATUSES = [
  { key: "PROCESSING", label: "Chờ xác nhận" },
  { key: "CONFIRMED", label: "Chờ lấy hàng" },
  { key: "SHIPPING", label: "Đang giao" },
  { key: "DELIVERED", label: "Đã giao" },
  { key: "CANCELLED", label: "Đã hủy" },
  { key: "RETURNED", label: "Đã trả hàng" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "PROCESSING": return "#f59e0b"; // Orange
    case "CONFIRMED": return "#f59e0b"; // Orange
    case "SHIPPING": return "#3b82f6"; // Blue
    case "DELIVERED": return "#10b981"; // Green
    case "CANCELLED": return "#ef4444"; // Red
    case "RETURNED": return "#8b5cf6"; // Purple
    default: return "#64748b";
  }
};

interface OrderItem {
  product: { name: string };
  quantity: number;
}

interface Order {
  id: string;
  status: string;
  total: number;
  shippingInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  items: OrderItem[];
}

export default function AdminOrders() {
  // Sửa dòng này
const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useCart() as { state: any; dispatch: any };
  const [filter, setFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");
const [customReason, setCustomReason] = useState("");

  const REASONS = [
    "Không liên lạc được khách hàng",
    "Đơn hàng bị hoàn về",
    "Khách hàng không chấp nhận đơn hàng",
    "Sai thông tin địa chỉ",
    "Lý do khác"
  ];

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders: any) =>
        prevOrders.map((order: any) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
        dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status: newStatus } });
        toast.success("Đã cập nhật trạng thái đơn hàng!");
      }
    } catch (err) { console.error(err); }
  };

  const confirmCancelOrder = async () => {
    if (!selectedOrder) return;

    const finalReason = cancelReason === "Lý do khác" ? customReason : cancelReason;

    if (!finalReason) return toast.error("Vui lòng chọn hoặc nhập lý do!");
    
  try {
    const res = await fetch(`http://localhost:5000/api/orders/${selectedOrder!.id}/cancel`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        status: "CANCELLED",
        reason: finalReason,
        customerEmail: selectedOrder?.shippingInfo.email 
      }),
    });

    if (res.ok) {
      // ✅ CẬP NHẬT STATE Ở ĐÂY ĐỂ UI THAY ĐỔI NGAY
      setOrders((prev) => prev.map(o => o.id === selectedOrder.id ? { ...o, status: "CANCELLED" } : o));
      toast.success("Đã hủy đơn và gửi mail!");
      setIsModalOpen(false);
      setCancelReason("");
      setCustomReason(""); // Reset lý do nhập tay
    } else {
      toast.error("Lỗi 404: Không tìm thấy đường dẫn API trên Server!");
    }
  } catch (err) {
    console.error("Lỗi:", err);
  }
};

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        // Gọi API lấy TẤT CẢ đơn hàng (không phải theo userId)
        const res = await fetch(`http://localhost:5000/api/orders`); 
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Lỗi lấy dữ liệu MongoDB:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  // Sửa dòng này
const filteredOrders = filter === "ALL" 
  ? orders 
  : orders.filter((o) => o.status?.toString().trim().toUpperCase() === filter.toUpperCase());

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-3 font-medium text-gray-500">Đang tải dữ liệu từ hệ thống...</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">QUẢN LÝ VẬN HÀNH</h1>
        <p className="text-slate-500 mt-1">Theo dõi và điều phối dòng hàng của ICONDENIM</p>
      </div>

      <DashboardOverview orders={orders} />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
           <div className="flex gap-2">
              {["ALL", "PROCESSING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELLED", "RETURNED"].map(st => (
                <button 
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                    filter === st ? "bg-black text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-black"
                  }`}
                >
                  {st === "ALL" && "TẤT CẢ"}
    {st === "PROCESSING" && "CHỜ XÁC NHẬN"}
    {st === "CONFIRMED" && "CHỜ LẤY HÀNG"}
    {st === "SHIPPING" && "ĐANG GIAO"}
    {st === "DELIVERED" && "ĐÃ GIAO"}
    {st === "CANCELLED" && "ĐÃ HỦY"}
    {st === "RETURNED" && "ĐÃ TRẢ HÀNG"}
                </button>
              ))}
           </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-black uppercase text-slate-400 tracking-widest bg-slate-50/30">
              <th className="p-5">Mã đơn</th>
              <th className="p-5">Khách hàng</th>
              <th className="p-5 text-center">Sản phẩm</th>
              <th className="p-5 text-right">Tổng thanh toán</th>
              <th className="p-5 text-center">Trạng thái</th>
              <th className="p-5 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredOrders.map((order: any) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="p-5 font-bold text-blue-600">#{order.id}</td>
                <td className="p-5">
                  <p className="text-sm font-bold text-slate-800">{order.shippingInfo.fullName}</p>
                  <p className="text-[11px] text-slate-400">{order.shippingInfo.phone}</p>
                </td>
                <td className="p-5 text-center font-medium text-slate-600">{order.items.length} món</td>
                <td className="p-5 text-right font-black text-slate-900">{order.total.toLocaleString()}đ</td>
                <td className="p-5 text-center">
                  <span className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tighter" 
                        style={{ backgroundColor: getStatusColor(order.status) + '15', color: getStatusColor(order.status) }}>
                    {ADMIN_STATUSES.find(s => s.key === order.status?.toUpperCase())?.label || order.status}
                  </span>
                </td>
                <td className="p-5 text-right">
  <div className="flex justify-end gap-2">
    
    {/* BƯỚC 1: Đang chờ xử lý -> Chỉ hiện nút Xác nhận */}
    {order.status?.toUpperCase() === "PROCESSING" && (
      <button
        onClick={() => updateStatus(order.id, "CONFIRMED")}
        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all shadow-sm"
      >
        xác nhận đơn
      </button>
    )}

    {/* BƯỚC 2: Đã xác nhận -> Hiện nút Bắt đầu giao & Nút Hủy (phòng trường hợp khách đổi ý) */}
    {order.status?.toUpperCase() === "CONFIRMED" && (
      <>
        <button
          onClick={() => updateStatus(order.id, "SHIPPING")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all shadow-sm"
        >
          Giao hàng
        </button>
        
      </>
    )}

{order.status?.toUpperCase() === "SHIPPING" && (
  <> 
    <button
      onClick={() => updateStatus(order.id, "DELIVERED")}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all shadow-sm"
    >
      Đã giao hàng
    </button> 
    
    <button
      onClick={() => {
        setSelectedOrder(order);
        setIsModalOpen(true);
      }}
      className="ml-2 border border-red-500 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all"
    >
      Hủy đơn
    </button>
  </> 
)}

    {[ "DELIVERED","CANCELLED", "RETURNED"].includes(order.status) && (
      <span className="text-[10px] text-slate-400 font-bold uppercase italic bg-slate-100 px-2 py-1 rounded">
        {order.status === "DELIVERED" ? "Giao dịch hoàn tất" : "Đơn đã đóng"}
      </span>
    )}
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
      <h3 className="text-lg font-bold mb-4">Lý do hủy đơn #{selectedOrder?.id}</h3>
      
      <div className="space-y-3">
        {REASONS.map((r) => (
          <label key={r} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
            <input 
              type="radio" 
              name="reason" 
              value={r} 
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-4 h-4 text-black focus:ring-black"
            />
            <span className="text-sm text-slate-700">{r}</span>
          </label>
        ))}
        {cancelReason === "Lý do khác" && (
    <textarea
      placeholder="Vui lòng nhập lý do chi tiết..."
      value={customReason}
      onChange={(e) => setCustomReason(e.target.value)}
      className="w-full mt-2 p-3 border border-slate-200 rounded-lg text-sm focus:ring-1 ring-black outline-none min-h-[80px]"
    />
  )}
      </div>

      <div className="flex gap-3 mt-6">
        <button 
          onClick={() => setIsModalOpen(false)}
          className="flex-1 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          Đóng
        </button>
        <button 
          onClick={confirmCancelOrder}
          className="flex-1 py-2 text-sm font-bold bg-black text-white rounded-lg hover:bg-slate-800"
        >
          Xác nhận hủy
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}