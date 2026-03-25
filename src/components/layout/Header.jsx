// <<<<<<< HEAD
"use client";
import React, { useState, useEffect } from "react";
// =======
// src/components/Header/Header.jsx
// "use client";

// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMapPin } from "react-icons/fi";
import { useCart } from "../../components/Cart/CartContext";
// <<<<<<< HEAD
// import { FiMapPin } from "react-icons/fi";
// import { usePathname } from "next/navigation";

// =======
import headerData from "../../data/Product/headerData.js";
import "../../styles/Product/header.css";
// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef

export default function Header() {
  const router = useRouter();
  const { topbar, logo, mainMenu, icons } = headerData;
// <<<<<<< HEAD
// =======
//   const { totalItems, setIsCartOpen } = useCart();
// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef

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
      {/* 1. TOP BAR - Chạy chữ khuyến mãi */}
      <div className="topbar">
        <div className="topbar-track">
          <div className="topbar-content">
            {topbar.promotions.map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
{/* <<<<<<< HEAD
=======
            {/* Nhân đôi nội dung để tạo hiệu ứng chạy vô hạn */}
{/* >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef */} 
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
// <<<<<<< HEAD
//               if (item.type === "link") {
//   return (
//     <Link
//       key={index}
//       href={item.path || "#"}
//       style={{ position: "relative" }} 
//       className={item.highlight ? item.label.toLowerCase().replace(" ", "-") : ""}
//     >
//       {item.label}
//       {item.highlight && (
//         <span className={item.highlight === "New" ? "tag-new" : "tag-sale"}>
//           {item.highlight}
//         </span>
//       )}
//     </Link>
//   );
// }
// =======
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
// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef

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
{/* <<<<<<< HEAD
                        <div className="denim-right"> 
    {item.denim.rightCards.map((card, cardIdx) => (
        <div key={cardIdx} className="denim-card" onClick={() => router.push(card.path || "#")}>
            <Image src={card.src} alt={card.text} width={260} height={160} />
            <span>{card.text}</span>
        </div>
    ))}
</div>
======= */}
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
{/* >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef */}
                      </div>
                    )}
{/* 
<<<<<<< HEAD
                if (item.label === "Collection") {
                  return (
                    <div key={index} className="menu-item has-dropdown">
                      <a href="#" className="menu-link">
                        {item.label} <span className="arrow">▾</span>
                      </a>
======= */}
                    {item.label === "Collection" && (
// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef
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
// <<<<<<< HEAD
//                             onClick={(e) => {
//                               e.preventDefault();
//                               router.push("/collection");
//                             }}
// =======
                            onClick={() => router.push("/collection")}
// {/* >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef */}
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
// <<<<<<< HEAD
//   <button
//     className="search-btn"
//     onClick={() => setOpenSearch(!openSearch)}
//   >
//     <FiSearch />
//   </button>
// )}

//             {icons.user && (
//               <button
//                 onClick={handleUserClick}
//                 className="cursor-pointer hover:text-blue-600 transition-colors bg-transparent border-none p-0 flex items-center"
//                 aria-label="Tài khoản của tôi"
// =======
              <button className="icon-btn">
                <FiSearch />
              </button>
            )}

            {icons.user && (
              <Link
                href="/login"
                className="icon-btn hover:text-blue-600 transition-colors"
// {/* >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef */}
              >
                <FiUser className="text-[20px]" />
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
<<<<<<< HEAD
                // THÊM KIỂM TRA isMounted ĐỂ ĐỒNG BỘ ARIA-LABEL
                aria-label={!isMounted ? "Giỏ hàng" : `Giỏ hàng${totalItems > 0 ? ` (${totalItems} sản phẩm)` : ""}`}
              >
                <FiShoppingCart />

                {/* THÊM KIỂM TRA isMounted Ở ĐÂY ĐỂ TRÁNH LỖI ĐỎ */}
                {/* {isMounted && totalItems > 0 && (
=======
                aria-label={`Giỏ hàng (${totalItems} sản phẩm)`}
              >
                <FiShoppingCart />
                {totalItems > 0 && (
>>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef
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