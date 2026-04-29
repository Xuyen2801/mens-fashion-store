"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DashboardOverview from "@/components/Admin/DashboardOverview";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        processChartData(data);
        processBestSellers(data);
      });
  }, []);

  const processChartData = (allOrders: any[]) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        dateStr: d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        dayName: days[d.getDay()],
        total: 0
      };
    });

    allOrders.forEach(order => {
      if (order.status?.toUpperCase() === "DELIVERED") {
        const orderDate = new Date(order.orderDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
        const daySlot = last7Days.find(d => d.dateStr === orderDate);
        if (daySlot) daySlot.total += order.total;
      }
    });
    setChartData(last7Days);
  };

  const processBestSellers = (allOrders: any[]) => {
    const productMap: any = {};
    allOrders.forEach(order => {
      order.items?.forEach((item: any) => {
        const name = item.product.name;
        productMap[name] = (productMap[name] || 0) + item.quantity;
      });
    });

    const sorted = Object.entries(productMap)
      .map(([name, sales]) => ({ name, sales: sales as number }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5); 

    setBestSellers(sorted);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">TỔNG QUAN HỆ THỐNG</h1>
        <p className="text-slate-500 mt-1">Phân tích số liệu kinh doanh thực tế</p>
      </div>

      <DashboardOverview orders={orders} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BIỂU ĐỒ DOANH THU */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest">Doanh thu 7 ngày gần nhất</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="dayName" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="total" fill="#000" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SẢN PHẨM BÁN CHẠY */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 uppercase text-xs tracking-widest">Sản phẩm bán chạy</h3>
          <div className="space-y-3">
            {bestSellers.map((prod, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-black transition-all">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-white truncate max-w-[150px]">
                    {prod.name}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Top {i+1} Seller</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-blue-600 group-hover:text-white">
                    {prod.sales}
                  </span>
                  <span className="ml-1 text-[10px] text-slate-400 group-hover:text-slate-300">sales</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}