"use client";

import { CartProvider } from "../Cart/CartContext";
import CartDrawer from "../Cart/Cartdrawer";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// ✅ Thêm isAdminPage vào props ở đây
export default function AppShell({ children }: { children: ReactNode }){
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  return (
    <CartProvider>
      {/* Bây giờ biến này đã được định nghĩa và có thể sử dụng */}
      {!isAdminPage && <Header />}
      {!isAdminPage && <CartDrawer />}

      {/* Nội dung trang */}
      <main>{children}</main>
      {!isAdminPage && <Footer />}
    </CartProvider>
  );
}