// src/components/Header/Header.jsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMapPin } from "react-icons/fi";
import { useCart } from "../../components/Cart/CartContext";
import headerData from "../../data/Product/headerData.js";
import "../../styles/Product/header.css";

export default function Header() {
  const router = useRouter();
  const { topbar, logo, mainMenu, icons } = headerData;
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="site-header">
      {/* 1. TOP BAR - Chạy chữ khuyến mãi */}
      <div className="topbar">
        <div className="topbar-track">
          <div className="topbar-content">
            {topbar.promotions.map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
            {/* Nhân đôi nội dung để tạo hiệu ứng chạy vô hạn */}
            {topbar.promotions.map((text, idx) => (
              <span key={`clone-${idx}`}>{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="header">
        <div className="header-container">
          {/* LOGO */}
          <div className="header-logo">
            <Link href="/">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                priority
              />
            </Link>
          </div>

          {/* MENU CHÍNH */}
          <nav className="header-menu">
            {mainMenu.map((item, index) => {
              // TRƯỜNG HỢP 1: CÁC LINK ĐƠN (Hàng mới, Sale, Hot...)
              if (item.type === "link") {
                return (
                  <Link
                    key={index}
                    href={item.path || "#"}
                    className={`menu-link-item ${item.highlight ? "has-highlight" : ""}`}
                  >
                    {item.label}
                    {item.highlight && (
                      <span
                        className={`badge-tag ${item.label === "SIÊU SALE" ? "sale-tag" : "new-tag"}`}
                      >
                        {item.highlight}
                      </span>
                    )}
                  </Link>
                );
              }

              // TRƯỜNG HỢP 2: DROPDOWN (Sản phẩm, Denim, Collection)
              if (item.type === "dropdown") {
                return (
                  <div key={index} className="menu-item has-dropdown">
                    <span className="menu-link cursor-default">
                      {item.label} <span className="arrow">▾</span>
                    </span>

                    {/* Render Dropdown theo nhãn tên */}
                    {item.label === "Sản phẩm" && (
                      <div className="dropdown drop_pro">
                        <div className="dropdown-container">
                          {item.items.map((col, colIdx) => (
                            <div key={colIdx} className="dropdown-col">
                              <h4>{col.title}</h4>
                              {col.links.map((link, linkIdx) => (
                                <Link key={linkIdx} href={link.path}>
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.label === "DENIM" && (
                      <div className="dropdown denim-dropdown">
                        <div className="denim-left">
                          {item.denim.left.map((col, colIdx) => (
                            <div key={colIdx} className="dropdown-col">
                              <h4>{col.title}</h4>
                              {col.links.map((link, linkIdx) => (
                                <Link key={linkIdx} href={link.path}>
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="denim-right">
                          {item.denim.rightCards.map((card, cardIdx) => (
                            <div
                              key={cardIdx}
                              className="denim-card"
                              onClick={() => router.push(card.path || "#")}
                            >
                              <Image
                                src={card.src}
                                alt={card.text}
                                width={260}
                                height={160}
                              />
                              <span>{card.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.label === "Collection" && (
                      <div className="dropdown collection-dropdown">
                        <div className="collection-grid">
                          {item.collections.map((col, colIdx) => (
                            <Link
                              key={colIdx}
                              href={col.path}
                              className="collection-card"
                            >
                              <Image
                                src={col.img}
                                alt={col.title}
                                width={360}
                                height={220}
                              />
                              <h4>{col.title}</h4>
                              <span className="view-link">Xem ngay</span>
                            </Link>
                          ))}
                        </div>
                        <div className="collection-footer">
                          <button
                            type="button"
                            className="view-all-btn"
                            onClick={() => router.push("/collection")}
                          >
                            Xem tất cả
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </nav>

          {/* 3. CÁC ICON TIỆN ÍCH */}
          <div className="header-icons">
            {icons.search && (
              <button className="icon-btn">
                <FiSearch />
              </button>
            )}

            {icons.user && (
              <Link
                href="/login"
                className="icon-btn hover:text-blue-600 transition-colors"
              >
                <FiUser />
              </Link>
            )}

            <Link
              href="/he-thong-cua-hang"
              className="icon-btn hover:text-blue-600 transition-colors"
            >
              <FiMapPin />
            </Link>

            {icons.cart && (
              <button
                className="cart-icon-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Giỏ hàng (${totalItems} sản phẩm)`}
              >
                <FiShoppingCart />
                {totalItems > 0 && (
                  <span className="badge cart-badge-live">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
