import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICONDENIM | Thời trang nam",
  description: "Thời trang nam chính hãng ICONDENIM",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}