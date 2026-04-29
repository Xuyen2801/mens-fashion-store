"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(userStr);
    
    if (user.role === "admin") {
      setIsAdmin(true); 
    } else {
      router.push("/login");
    }
  } catch (error) {
    console.error("Lỗi kiểm tra quyền Admin:", error);
    router.push("/login");
  }
}, [router, pathname]);

  if (!isAdmin) return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar />
      
      {/* Nội dung chính bên phải */}
      <main className="flex-1 overflow-x-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Hệ thống quản trị nội bộ</h2>
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Super Admin</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}