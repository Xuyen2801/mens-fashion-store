"use client";

import Link from "next/link";
import { IoSearchOutline, IoPersonOutline, IoCartOutline } from "react-icons/io5";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <span>🔥 Mua 02 sản phẩm quần Jeans tặng 1 set quà</span>
        <span>VOUCHER 10% TỐI ĐA 10K</span>
        <span>VOUCHER 20K ĐƠN TỪ 499K</span>
        <span>🚚 Freeship đơn từ 399K</span>
      </div>

      <div className="main-header">
        <div className="logo">
          <Link href="/">ICONDENIM</Link>
        </div>

        <nav className="nav">
          <Link href="/product">Sản phẩm</Link>
          <Link href="#">Hàng mới</Link>
          <Link href="#">Hàng bán chạy</Link>
          <Link href="#">DENIM</Link>
          <Link href="#" className="sale">SALE TẾT</Link>
          <Link href="#">Collection</Link>
        </nav>

        <div className="actions">
          <IoSearchOutline />
          <IoPersonOutline />
          <div className="cart">
            <IoCartOutline />
            <span className="badge">0</span>
          </div>
        </div>
      </div>
    </header>
  );
}
