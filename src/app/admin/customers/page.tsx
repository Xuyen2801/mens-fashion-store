"use client";
import { useEffect, useState } from "react";

interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  orderCount?: number; 
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          fetch("http://localhost:5000/users"),
          fetch("http://localhost:5000/api/orders")
        ]);

        const users = await userRes.json();
        const orders = await orderRes.json();

        const clientList = users
          .filter((u: Customer) => u.role === "customer")
          .map((user: Customer) => {
            const count = orders.filter((o: any) => 
              o.shippingInfo?.email === user.email || o.userId === user.id
            ).length;

            return { ...user, orderCount: count };
          });

        setCustomers(clientList);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi dữ liệu:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-500 font-medium">Đang truy xuất dữ liệu CRM...</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">DANH SÁCH KHÁCH HÀNG</h1>
        <p className="text-slate-500 mt-1">Phân tích hành vi mua sắm của khách hàng ICON DENIM</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-400 tracking-widest">
              <th className="p-5">Khách hàng</th>
              <th className="p-5">Thông tin liên hệ</th>
              <th className="p-5 text-center">Ngày gia nhập</th>
              <th className="p-5 text-right">Tổng đơn hàng</th> 
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center font-black text-xs border border-slate-200">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{user.fullName}</p>
                      <p className="text-[10px] text-slate-400 font-mono uppercase">ID: {user.id.slice(-8)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <p className="text-sm text-slate-600 font-medium">{user.email}</p>
                  <p className="text-[11px] text-slate-400 tracking-tighter">{user.phone}</p>
                </td>
                <td className="p-5 text-center text-sm text-slate-500">
                   {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-5 text-right">
                  {/* Hiển thị số đơn kèm Badge nếu là khách quen */}
                  <span className={`inline-block px-3 py-1 rounded-lg font-black text-xs ${
                    (user.orderCount || 0) > 5 ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"
                  }`}>
                    {user.orderCount} ĐƠN
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <div className="p-20 text-center text-slate-400 italic font-medium">Hệ thống chưa ghi nhận khách hàng nào.</div>
        )}
      </div>
    </div>
  );
}