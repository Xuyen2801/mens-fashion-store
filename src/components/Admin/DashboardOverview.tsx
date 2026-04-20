// src/components/Admin/DashboardOverview.tsx
export default function DashboardOverview({ orders }: { orders: any[] }) {
  const stats = [
    { 
      label: "Doanh thu (Net)", 
      value: orders.filter(o => o.status === "DELIVERED").reduce((s, o) => s + o.total, 0), 
      color: "text-green-600",
      bg: "bg-green-50" 
    },
    { 
      label: "Đơn chờ duyệt", 
      value: orders.filter(o => o.status?.toString().trim().toUpperCase() === "PROCESSING").length, 
      color: "text-orange-600",
      bg: "bg-orange-50" 
    },
    { 
      label: "Đơn đang giao", 
      value: orders.filter(o => o.status?.toString().trim().toUpperCase() === "SHIPPING").length, 
      color: "text-blue-600",
      bg: "bg-blue-50" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((s, i) => (
        <div key={i} className={`${s.bg} p-6 rounded-xl border border-white shadow-sm`}>
          <p className="text-gray-500 text-[12px] uppercase font-bold tracking-wider">{s.label}</p>
          <p className={`text-2xl font-black mt-2 ${s.color}`}>
            {typeof s.value === "number" && s.label.includes("Doanh thu") 
              ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(s.value) 
              : s.value}
          </p>
        </div>
      ))}
    </div>
  );
}