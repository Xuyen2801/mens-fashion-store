"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../../styles/Product/header.css";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import headerData from "../../data/Product/headerData.js";
import { useCart } from "../../components/Cart/CartContext";
import { FiMapPin } from "react-icons/fi";
import { usePathname } from "next/navigation";


export default function Header() {
  const router = useRouter();
  const { topbar, logo, mainMenu, icons } = headerData;

  const { totalItems, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
  setIsMounted(true); 
  }, []);

  const handleUserClick = (e) => {
    e.preventDefault();
    const loggedInUser = localStorage.getItem("user"); 

    if (loggedInUser) {
      router.push("/account"); 
    } else {
      router.push("/login");   
    }
  };

  // ─── THÊM TRẠNG THÁI KIỂM TRA MOUNTED ──────────────────────────────────────
  // const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // ───────────────────────────────────────────────────────────────────────────

  const [openSearch, setOpenSearch] = useState(false);
  // ─── Cart state from context ───────────────────────────────────────────────
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
                  <Link
                    key={index}
                    href={item.path || "#"}
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
                        <div className="denim-left">
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
              <button
                onClick={handleUserClick}
                className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-none p-0 flex items-center"
                aria-label="Tài khoản của tôi"
              >
                <FiUser className="text-[20px]" />
              </button>
            )}

            <Link
              href="/he-thong-cua-hang"
              className="cursor-pointer hover:text-blue-600 transition-colors"
            >
              <FiMapPin />
            </Link>

            {icons.cart && (

  <button
    className="cart-icon-btn"
    onClick={() => {
      if (!isMounted) return; 
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        setIsCartOpen(true);
      } else {
        alert("Vui lòng đăng nhập!");
        router.push("/login");
      }
    }}
  >
    <FiShoppingCart />
    {isMounted && totalItems > 0 && (
      <span className="badge">{totalItems}</span>
    )}
  </button>
)}
{/* =======
              <button
                className="cart-icon-btn"
                onClick={() => setIsCartOpen(true)}
                // THÊM KIỂM TRA isMounted ĐỂ ĐỒNG BỘ ARIA-LABEL
                aria-label={!isMounted ? "Giỏ hàng" : `Giỏ hàng${totalItems > 0 ? ` (${totalItems} sản phẩm)` : ""}`}
              >
                <FiShoppingCart />

                {/* THÊM KIỂM TRA isMounted Ở ĐÂY ĐỂ TRÁNH LỖI ĐỎ */}
                {/* {isMounted && totalItems > 0 && (
                  <span className="badge cart-badge-live">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            )}
>>>>>>> 59093de9880acb17b3eefae9083fbc66ab237ac2 */} 
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