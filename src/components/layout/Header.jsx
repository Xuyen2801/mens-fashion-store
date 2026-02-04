"use client";

import "../../styles/Product/header.css";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

export default function Header() {
  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-container">
          <span>🔥 Mua 02 sản phẩm quần Jeans tặng 1 set quà</span>
          <span>VOUCHER 10% TỐI ĐA 10K</span>
          <span>VOUCHER 20K ĐƠN TỪ 499K</span>
          <span>🚚 Freeship đơn từ 399K</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        <div className="header-container">

          {/* LOGO */}
          <div className="header-logo">
            <Image
              src="/images/header/logo-header.png"
              alt="ICONDENIM"
              width={140}
              height={32}
              priority
            />
          </div>

          {/* MENU */}
          <nav className="header-menu">

            {/* SẢN PHẨM */}
            <div className="menu-item has-dropdown">
              <a href="#" className="menu-link">
                Sản phẩm <span className="arrow">▾</span>
              </a>

              <div className="dropdown">
                <div className="dropdown-container">
                  <div className="dropdown-col">
                    <h4>TẤT CẢ SẢN PHẨM</h4>
                    <a>Tất cả sản phẩm</a>
                    <a>Sản phẩm mới</a>
                    <a>Bán chạy nhất</a>
                    <a>OUTLET - Sale up to 50%</a>
                  </div>

                  <div className="dropdown-col">
                    <h4>ÁO NAM</h4>
                    <a>Áo thun</a>
                    <a>Áo polo</a>
                    <a>Áo sơ mi</a>
                    <a>Áo khoác</a>
                    <a>Hoodie</a>
                    <a>Tank top</a>
                    <a>Set đồ</a>
                  </div>

                  <div className="dropdown-col">
                    <h4>QUẦN NAM</h4>
                    <a>Quần jean</a>
                    <a>Quần short</a>
                    <a>Quần kaki & chino</a>
                    <a>Quần jogger</a>
                    <a>Quần tây</a>
                    <a>Quần boxer</a>
                  </div>

                  <div className="dropdown-col">
                    <h4>GIÀY & PHỤ KIỆN</h4>
                    <a>Giày & dép</a>
                    <a>Balo, túi & ví</a>
                    <a>Nón</a>
                    <a>Thắt lưng</a>
                    <a>Vớ</a>
                    <a>Mắt kính</a>
                  </div>
                </div>
              </div>
            </div>

            {/* HÀNG MỚI */}
            <a href="#" className="new">
              Hàng mới <span>New</span>
            </a>

            <a href="#">Hàng bán chạy</a>

            {/* DENIM */}
            <div className="menu-item has-dropdown">
              <a href="#" className="menu-link">
                DENIM <span className="arrow">▾</span>
              </a>

              <div className="dropdown denim-dropdown">
                <div className="denim-left">
                  <div className="dropdown-col">
                    <h4>JEANS</h4>
                    <a>Quần Jeans</a>
                    <a>Quần Short Jeans</a>
                    <a>Áo Khoác Jeans</a>
                  </div>

                  <div className="dropdown-col">
                    <h4>SIGNATURE</h4>
                    <a>AIRFLEX™</a>
                    <a>ProCOOL++™</a>
                    <a>SMART JEANS™</a>
                    <a>ICON105 Lightweight™</a>
                  </div>

                  <div className="dropdown-col">
                    <h4>FORM DÁNG</h4>
                    <a>Smart-Fit</a>
                    <a>Straight</a>
                    <a>Slim-Fit</a>
                  </div>
                </div>

                <div className="denim-right">
                  {[
                    { src: "/images/header/gonnhe.png", text: "AIRFLEX - Gọn nhẹ" },
                    { src: "/images/header/sieumat.png", text: "ProCOOL - Siêu mát" },
                    { src: "/images/header/sieunhe.png", text: "ICON105 - Siêu nhẹ" },
                    { src: "/images/header/cogian.png", text: "Smart Jeans - Co giãn" },
                  ].map((item, i) => (
                    <div className="denim-card" key={i}>
                      <Image src={item.src} alt={item.text} width={260} height={160} />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SALE */}
            <a href="#" className="sale">
              SALE TẾT <span>-50%</span>
            </a>

            {/* COLLECTION */}
            <div className="menu-item has-dropdown">
              <a href="#" className="menu-link">
                Collection <span className="arrow">▾</span>
              </a>

              <div className="dropdown collection-dropdown">
                <div className="collection-grid">
                  {[
                    {
                      title: "AIRFLEX™ COLLECTION",
                      img: "/images/header/gonnhe.png",
                    },
                    {
                      title: "Retro Sports",
                      img: "/images/header/sieunhe.png",
                    },
                    {
                      title: "Snoopy",
                      img: "/images/header/cogian.png",
                    },
                  ].map((item, i) => (
                    <div className="collection-card" key={i}>
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={360}
                        height={220}
                      />
                      <h4>{item.title}</h4>
                      <a className="view-link">Xem ngay</a>
                    </div>
                  ))}
                  {/* BUTTON */}
                  <div className="collection-footer">
                  <button className="view-all-btn">Xem tất cả</button>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* ICONS */}
          <div className="header-icons">
            <FiSearch />
            <FiUser />
            <div className="cart">
              <FiShoppingCart />
              <span className="badge">0</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
