import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Content from "../components/Home/Content"
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Content />
        <Footer />
      </body>
    </html>
  );
}
