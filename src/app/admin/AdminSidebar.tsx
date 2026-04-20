"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut, Settings } from "lucide-react";

const menuItems = [
  { name: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Quản lý đơn hàng", href: "/admin/orders", icon: ShoppingCart },
  { name: "Danh mục sản phẩm", href: "/admin/products", icon: Package },
  { name: "Khách hàng", href: "/admin/customers", icon: Users },
  { name: "Quản lý voucher và phí ship", href: "/admin/vouchers", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="w-72 bg-[#0f172a] text-slate-300 flex flex-col h-screen sticky top-0 shadow-2xl">
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-white text-2xl font-black tracking-tighter">ICONDENIM</h1>
        <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-[0.2em]">Management Suite</p>
      </div>
      
      <nav className="flex-1 p-6 space-y-3 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
              pathname.startsWith(item.href) 
                ? "bg-blue-600 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]" 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon size={22} />
            <span className="font-semibold text-[14px]">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-5 py-4 w-full hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all font-bold text-[14px]"
        >
          <LogOut size={22} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}