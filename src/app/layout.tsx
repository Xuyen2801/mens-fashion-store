
import "./globals.css";
import Footer from "../components/layout/Footer";
import AppShell from "../components/layout/Appsell";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ICONDENIM | Thời trang nam",
  description: "Thời trang nam chính hãng ICONDENIM",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              fontSize: '14px',
            },
          }}
        />

        <AppShell>
          {children}
        </AppShell>

        {/* Footer là Server Component */}
      </body>
    </html>
  );
}