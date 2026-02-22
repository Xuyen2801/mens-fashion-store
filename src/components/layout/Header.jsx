// src/components/Header/Header.jsx  (or .tsx)
"use client";

import "../../styles/Product/header.css";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import headerData from "../../data/Product/headerData.js";
import { useCart } from "../../components/Cart/CartContext";

export default function Header() {
  const { topbar, logo, mainMenu, icons } = headerData;
  // ─── Cart state from context ───────────────────────────────────────────────
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="site-header">
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-track">
          <div className="topbar-content">
            {topbar.promotions.map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
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
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              priority
            />
          </div>

          {/* MENU */}
          <nav className="header-menu">
            {mainMenu.map((item, index) => {
              if (item.type === "link") {
                return (
                  <a
                    key={index}
                    href="#"
                    className={item.highlight ? item.label.toLowerCase().replace(" ", "-") : ""}
                  >
                    {item.label}
                    {item.highlight && <span>{item.highlight}</span>}
                  </a>
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
                                <a key={linkIdx}>{link}</a>
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
                                <a key={linkIdx}>{link}</a>
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
                            <div key={colIdx} className="collection-card">
                              <Image src={col.img} alt={col.title} width={360} height={220} />
                              <h4>{col.title}</h4>
                              <a className="view-link">Xem ngay</a>
                            </div>
                          ))}
                          <div />
                          <div className="collection-footer">
                            <button className="view-all-btn">Xem tất cả</button>
                          </div>
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
            {icons.search && <FiSearch />}
            {icons.user && <FiUser />}

            {/* ── CART ICON — wired to drawer ── */}
            {icons.cart && (
              <button
                className="cart-icon-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Giỏ hàng${totalItems > 0 ? ` (${totalItems} sản phẩm)` : ""}`}
              >
                <FiShoppingCart />
                {totalItems > 0 && (
                  <span className="badge cart-badge-live">{totalItems > 99 ? "99+" : totalItems}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}