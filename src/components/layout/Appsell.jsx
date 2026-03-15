// src/components/layout/AppShell.jsx
// Đây là một Client Component bọc Header + CartDrawer + CartProvider lại với nhau.
// Dùng component này trong layout.tsx THAY cho việc import Header trực tiếp.
"use client";

import { CartProvider } from "../../components/Cart/CartContext";
import CartDrawer from "../../components/Cart/Cartdrawer";
import Header from "./Header";

export default function AppShell({ children }) {
  return (
    <CartProvider>
      {/* Header đọc totalItems từ CartContext — phải nằm BÊN TRONG CartProvider */}
      <Header />

      {/* CartDrawer slide-in từ phải — cũng phải nằm BÊN TRONG CartProvider */}
      <CartDrawer />

      {/* Nội dung trang */}
      {children}
    </CartProvider>
  );
}