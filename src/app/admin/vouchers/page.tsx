// src/app/admin/vouchers/page.tsx
"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Voucher {
  _id?: string;
  id?: string;
  code: string;
  category: "product" | "shipping" | "holiday"; // Dùng category thay vì type
  type: string; // "fixed"
  discountType?: "fixed" | "percent";
  value: number; // Số tiền giảm
  minSubtotal: number; // Giá trị đơn hàng tối thiểu (Trong DB bạn là minSubtotal)
  expiryDate: string;
  status: string;
}

export default function AdminVoucherSettings() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [shippingFee, setShippingFee] = useState(30000);
  const [filterType, setFilterType] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Load dữ liệu từ API
  useEffect(() => {
    fetch("http://localhost:5000/api/vouchers")
      .then(res => res.json())
      .then(data => setVouchers(data));
  }, []);

  const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "DUSK";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

  const [newVoucher, setNewVoucher] = useState({
  code: generateRandomCode(),
  title: "",
  description: "",
  category: "product",
  discountType: "fixed", 
  value: 0,
  minSubtotal: 0,
  expiryDate: "",
});

// Hàm xử lý gửi dữ liệu
const handleCreateVoucher = async () => {
  if (!newVoucher.code || !newVoucher.value || !newVoucher.title) {
    return toast.error("Vui lòng nhập đủ Tiêu đề, Mã và Giá trị giảm!");
  }

  // Tự động tạo description nếu admin không nhập
  const autoDescription = newVoucher.discountType === "percent"
    ? `Giảm ${newVoucher.value}% cho hóa đơn từ ${new Intl.NumberFormat("vi-VN").format(newVoucher.minSubtotal)}đ`
    : `Giảm ${new Intl.NumberFormat("vi-VN").format(newVoucher.value)}đ cho hóa đơn từ ${new Intl.NumberFormat("vi-VN").format(newVoucher.minSubtotal)}đ`;

  const payload = {
    ...newVoucher,
    voucherId: "V" + Math.floor(100 + Math.random() * 900), // Sinh ID dạng V123
    description: newVoucher.description || autoDescription,
    type: newVoucher.discountType, // Lưu fixed hoặc percent vào trường type
    status: "active",
    image: `/images/vouchers/${newVoucher.category}.png` // Tự động gán link ảnh theo category
  };

  try {
    const res = await fetch("http://localhost:5000/api/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const result = await res.json();
      setVouchers(prev => [...prev, result.data]);
      setIsModalOpen(false);
      toast.success("Kích hoạt Voucher thành công!");
      // Reset với mã mới
      setNewVoucher({ code: generateRandomCode(), title: "", description: "", category: "product", discountType: "fixed", value: 0, minSubtotal: 0, expiryDate: "" });
    }
  } catch (error) {
    toast.error("Lỗi kết nối Server!");
  }
};

  // Logic xóa Voucher
const deleteVoucher = async (id: string) => {
  // Sử dụng Custom Toast để hỏi xác nhận như Vy mong muốn
  toast((t) => (
    <div className="flex flex-col gap-3 p-1">
      <span className="text-sm font-bold text-slate-800">
        🗑️ Xác nhận xóa voucher này khỏi hệ thống?
      </span>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1.5 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 rounded-md transition-all"
        >
          Quay lại
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            const loadingToast = toast.loading("Đang xử lý...");
            
            try {
              const res = await fetch(`http://localhost:5000/api/vouchers/${id}`, { 
                method: "DELETE" 
              });

              if (res.ok) {
                // Xóa khỏi State để UI biến mất ngay
                setVouchers(prev => prev.filter(v => v._id !== id && v.id !== id));
                toast.success("Đã xóa voucher thành công!", { id: loadingToast });
              } else {
                toast.error("Lỗi: Không tìm thấy voucher trên hệ thống!", { id: loadingToast });
              }
            } catch (err) {
              toast.error("Lỗi kết nối Server!", { id: loadingToast });
            }
          }}
          className="px-3 py-1.5 text-[10px] font-bold uppercase bg-red-600 text-white hover:bg-red-700 rounded-md shadow-lg transition-all"
        >
          Xóa ngay
        </button>
      </div>
    </div>
  ), { position: "top-center", duration: 2000 });
};

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER & PHÍ SHIP */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase">Khuyến mãi & Vận chuyển</h1>
          <div className="mt-4 p-4 bg-white border rounded-2xl flex items-center gap-4 shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Phí giao hàng hiện tại</p>
              <input 
                type="number" 
                value={shippingFee} 
                onChange={(e) => setShippingFee(Number(e.target.value))}
                className="text-xl font-black outline-none w-32"
              />
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold">CẬP NHẬT PHÍ SHIP</button>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100"
        >
          + TẠO VOUCHER MỚI
        </button>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 mb-6">
        {["ALL", "PRODUCT", "SHIPPING"].map(t => (
          <button 
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
              filterType === t ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200"
            }`}
          >
            {t === "ALL" ? "Tất cả" : t === "PRODUCT" ? "Voucher Sản phẩm" : "Voucher Phí ship"}
          </button>
        ))}
      </div>

      {/* DANH SÁCH VOUCHER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {Array.isArray(vouchers) && vouchers
    .filter(v => {
  if (filterType === "ALL") return true;
  
  // Lấy category từ DB (product, shipping, holiday)
  const vCategory = v.category?.toLowerCase().trim();
  
  if (filterType === "PRODUCT") {
    // Voucher sản phẩm bao gồm cả hàng ngày (product) và sự kiện (holiday)
    return vCategory === "product" || vCategory === "holiday";
  }
  
  if (filterType === "SHIPPING") {
    return vCategory === "shipping";
  }
  
  return false;
})
    .map((v) => (
      <div key={v._id} className="bg-white border border-slate-200 rounded-xl p-4 relative overflow-hidden group hover:border-black transition-all shadow-sm">
        {/* Badge loại voucher nhỏ gọn hơn */}
        <div className={`absolute top-0 right-0 px-2 py-0.5 text-[8px] font-black text-white uppercase ${v.type?.toUpperCase() === 'PRODUCT' ? 'bg-orange-500' : 'bg-blue-500'}`}>
          {v.type?.toUpperCase() === 'PRODUCT' ? 'Sản phẩm' : 'Phí ship'}
        </div>

        {/* Mã Code */}
        <h3 className="text-lg font-black tracking-tighter text-slate-900 truncate pr-8">{v.code}</h3>
        
        {/* Số tiền giảm - Dùng logic an toàn */}
        <p className="text-xs font-bold text-blue-600 mt-0.5">
  {v.discountType === "percent" 
    ? `Giảm ${v.value}%` 
    : `Giảm ${new Intl.NumberFormat("vi-VN").format(v.value || 0)}đ`}
</p>

<div className="absolute top-8 right-0 px-2 py-0.5 text-[7px] font-bold bg-slate-100 text-slate-500 uppercase border-l border-b border-slate-200">
  {v.discountType === "percent" ? "% Chiết khấu" : "Trừ tiền mặt"}
</div>

        {/* Thông tin phụ nhỏ gọn */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
          <div>
             <p className="text-[9px] text-slate-400 font-medium">
                HSD: {v.expiryDate ? new Date(v.expiryDate).toLocaleDateString('vi-VN') : "Vô hạn"}
             </p>
             <p className="text-[8px] text-slate-300 font-bold">
  Điều kiện: {Number(v.minSubtotal || 0) > 0 
    ? `Đơn từ ${new Intl.NumberFormat("vi-VN").format(v.minSubtotal)}đ` 
    : "Mọi đơn hàng"}
</p>
          </div>
          
          <button 
            onClick={() => deleteVoucher(v._id!)}
            className="text-red-500 font-bold text-[9px] uppercase hover:underline"
          >
            Xóa
          </button>
        </div>
      </div>
    ))}
</div>
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

    <div className="relative bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl border border-slate-100">
      <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase">Thiết lập Voucher Hệ thống</h2>
      
      <div className="space-y-5">
        {/* Hàng 1: Mã voucher (Read-only) và Loại */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã Voucher (Tự động)</label>
            <div className="flex gap-2 mt-1">
              <input 
                type="text" 
                readOnly
                value={newVoucher.code}
                className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-blue-600"
              />
              <button 
                onClick={() => setNewVoucher({...newVoucher, code: generateRandomCode()})}
                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold"
              > 🔄 </button>
            </div>
          </div>
          <div>
  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phân loại</label>
  <select 
    value={newVoucher.category}
    onChange={(e) => setNewVoucher({...newVoucher, category: e.target.value as any})}
    className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none focus:ring-1 ring-black font-bold"
  >
    <option value="product">Voucher Sản phẩm</option>
    <option value="shipping">Voucher Phí ship</option>
    <option value="holiday">Voucher Ngày lễ (Holiday)</option>
  </select>
</div>
        </div>

        <div>
  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiêu đề Voucher (VD: Kỷ Niệm 1 Năm)</label>
  <input 
    type="text" 
    placeholder="Nhập tên chương trình..."
    value={newVoucher.title}
    onChange={(e) => setNewVoucher({...newVoucher, title: e.target.value})}
    className="w-full mt-1 p-3 border border-slate-200 rounded-xl font-bold outline-none focus:ring-1 ring-black"
  />
</div>

        {/* Hàng 2: Hình thức giảm giá */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Hình thức giảm giá</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="dType" checked={newVoucher.discountType === 'fixed'} onChange={() => setNewVoucher({...newVoucher, discountType: 'fixed', value: 0})} />
              <span className="text-sm font-bold">Số tiền cố định</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="dType" checked={newVoucher.discountType === 'percent'} onChange={() => setNewVoucher({...newVoucher, discountType: 'percent', value: 10})} />
              <span className="text-sm font-bold">Theo phần trăm (%)</span>
            </label>
          </div>

          <div className="mt-4">
            {newVoucher.discountType === 'percent' ? (
              <select 
                value={newVoucher.value}
                onChange={(e) => setNewVoucher({...newVoucher, value: Number(e.target.value)})}
                className="w-full p-3 border border-slate-200 rounded-xl font-black text-blue-600"
              >
                {[5, 10, 15, 20, 25, 50, 70].map(v => (
                  <option key={v} value={v}>Giảm {v}% giá trị đơn hàng</option>
                ))}
              </select>
            ) : (
              <input 
                type="number" 
                placeholder="Nhập số tiền giảm (VD: 50000)"
                value={newVoucher.value || ""}
                onChange={(e) => setNewVoucher({...newVoucher, value: Number(e.target.value)})}
                className="w-full p-3 border border-slate-200 rounded-xl font-black text-blue-600"
              />
            )}
          </div>
        </div>

        {/* Hàng 3: Điều kiện & Ngày hết hạn */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Điều kiện đơn từ (VNĐ)</label>
            <input 
              type="number" 
              value={newVoucher.minSubtotal || ""}
              onChange={(e) => setNewVoucher({...newVoucher, minSubtotal: Number(e.target.value)})}
              className="w-full mt-1 p-3 border border-slate-200 rounded-xl font-bold"
              placeholder="0 = Mọi đơn hàng"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày hết hạn</label>
            <input 
              type="date" 
              value={newVoucher.expiryDate}
              onChange={(e) => setNewVoucher({...newVoucher, expiryDate: e.target.value})}
              className="w-full mt-1 p-3 border border-slate-200 rounded-xl font-bold"
            />
          </div>
        </div>

        <div>
  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mô tả chi tiết (Tùy chọn)</label>
  <textarea 
    placeholder="Để trống hệ thống sẽ tự tạo mô tả dựa trên điều kiện..."
    value={newVoucher.description}
    onChange={(e) => setNewVoucher({...newVoucher, description: e.target.value})}
    className="w-full mt-1 p-3 border border-slate-200 rounded-xl text-sm h-20 outline-none focus:ring-1 ring-black"
  />
</div>
      </div>

      <div className="flex gap-3 mt-10">
        <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-xs font-black text-slate-400 hover:bg-slate-50 rounded-xl">ĐÓNG</button>
        <button 
          onClick={handleCreateVoucher}
          className="flex-1 py-4 bg-black text-white rounded-xl font-black text-xs hover:bg-slate-800 shadow-xl transition-all uppercase tracking-widest"
        >
          Kích hoạt Voucher
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}