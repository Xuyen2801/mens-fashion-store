// src/components/Header/Header.jsx  (or .tsx)
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/Product/header.css";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import headerData from "../../data/Product/headerData.js";
import { useCart } from "../../components/Cart/CartContext";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const { topbar, logo, mainMenu, icons } = headerData;
  const [openSearch, setOpenSearch] = useState(false);
  // ─── Cart state from context ───────────────────────────────────────────────
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();

  useEffect(() => {
  setOpenSearch(false); // 🔥 đóng search khi đổi trang
}, [pathname]);
  return (
    <div className="site-header">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-track">
          <div className="topbar-content">
            {topbar.promotions.map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
            {/* nhân đôi để chạy vô hạn */}

            {topbar.promotions.map((text, idx) => (
              <span key={`clone-${idx}`}>{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER */}
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

          {/* MENU */}
          <nav className="header-menu">
            {mainMenu.map((item, index) => {
              if (item.type === "link") {
                return (
                  <a
                    key={index}
                    href="#"
                    className={
                      item.highlight
                        ? item.label.toLowerCase().replace(" ", "-")
                        : ""
                    }
                  >
                    {item.label}
                    {item.highlight && <span>{item.highlight}</span>}
                  </a>
                );
              }
              if (item.type === "link") {
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className={item.highlight ? item.label.toLowerCase().replace(" ", "-") : ""}
                  >
                    {item.label}
                    {item.highlight && <span>{item.highlight}</span>}
                  </Link>
                );
              }

              if (item.type === "dropdown") {
                if (item.label === "Sản phẩm") {
                  return (
                    <div key={index} className="menu-item has-dropdown">
                      <a href="#" className="menu-link">
                        {item.label} <span className="arrow">▾</span>
                      </a>
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
                    </div>
                  );
                }

                if (item.label === "DENIM") {
                  return (
                    <div key={index} className="menu-item has-dropdown">
                      <a href="#" className="menu-link">
                        {item.label} <span className="arrow">▾</span>
                      </a>
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
                            <div key={cardIdx} className="denim-card">
                              <Image src={card.src} alt={card.text} width={260} height={160} />
                              <span>{card.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }


                if (item.label === "Collection") {
                  return (
                    <div key={index} className="menu-item has-dropdown">
                      <a href="#" className="menu-link">
                        {item.label} <span className="arrow">▾</span>
                      </a>
                      <div className="dropdown collection-dropdown">
                        <div className="collection-grid">
                          {item.collections.map((col, colIdx) => (
                            <Link key={colIdx} href={col.path} className="collection-card">
                              <Image src={col.img} alt={col.title} width={360} height={220} />
                              <h4>{col.title}</h4>
                              <span className="view-link">Xem ngay</span>
                            </Link>
                          ))}

                          
                        </div>
                        <div className="collection-footer">
                            <button
                              type="button"
                              className="view-all-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                router.push("/collection");
                              }}
                            >
                              Xem tất cả
                            </button>
                          </div>
                      </div>
                    </div>
                  );
                }
              }
              return null;
            })}
          </nav>

          {/* ICONS */}
          <div className="header-icons">
            {icons.search && (
  <button
    className="search-btn"
    onClick={() => setOpenSearch(!openSearch)}
  >
    <FiSearch />
  </button>
)}

            {icons.user && (
              <Link
                href="/login"
                className="cursor-pointer hover:text-blue-600 transition-colors"
              >
                <FiUser />
              </Link>
            )}

            {/* MAP ICON */}
            <Link
              href="/he-thong-cua-hang"
              className="cursor-pointer hover:text-blue-600 transition-colors"
            >
              <FiMapPin />
            </Link>

            {icons.cart && (
              <button
                className="cart-icon-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Giỏ hàng${totalItems > 0 ? ` (${totalItems} sản phẩm)` : ""}`}
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
      {openSearch && (
  <div className="search-dropdown">
    <div className="search-box">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
      />
      <FiSearch className="search-icon" />
    </div>

    <div className="search-suggestions">
      <p>Từ khóa nổi bật hôm nay</p>

      <div className="tags">
        {["smartjean", "áo thun", "áo polo", "quần short", "áo khoác", "quần tây"].map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
