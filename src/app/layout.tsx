// src/app/layout.tsx
import "./globals.css";
import Footer from "../components/layout/Footer";
import AppShell from "../components/layout/Appsell";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICONDENIM | Thời trang nam",
  description: "Thời trang nam chính hãng ICONDENIM",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {/*
          AppShell là "use client" — bọc CartProvider + Header + CartDrawer.
          Header nằm BÊN TRONG CartProvider nên useCart() hoạt động đúng.
        */}
        <AppShell>
          <main>{children}</main>
        </AppShell>

        {/* Footer là Server Component, không dùng useCart nên để ngoài cũng được */}
        <Footer />
      </body>
    </html>
  );
}