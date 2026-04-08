"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMapPin, FiX } from "react-icons/fi";
import { useCart } from "../../components/Cart/CartContext";
import headerData from "../../data/Product/headerData.js";
import { productsAll } from "../../data/Product/Tat-ca-san-pham/productsAll";
import "../../styles/Product/header.css";

const SEARCH_TAGS = ["smartjean", "áo thun", "áo polo", "quần short", "áo khoác", "quần tây"];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { topbar, logo, mainMenu, icons } = headerData;
  const { totalItems, setIsCartOpen } = useCart();

  const [isMounted, setIsMounted] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  // Lọc sản phẩm theo từ khóa
  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredProducts = searchQuery.trim()
    ? productsAll.filter((p) =>
        normalize(p.name).includes(normalize(searchQuery.trim()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Đóng search khi đổi trang
  useEffect(() => {
    setOpenSearch(false);
  }, [pathname]);

  // Đóng search khi click ra ngoài
  useEffect(() => {
    if (!openSearch) return;
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSearch]);

  const handleUserClick = (e) => {
    e.preventDefault();
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      router.push("/account");
    } else {
      router.push("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setOpenSearch(false);
    }
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    router.push(`/search?q=${encodeURIComponent(tag)}`);
    setOpenSearch(false);
  };

  return (
    <div className="site-header">
      {/* 1. TOP BAR */}
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

          {/* SEARCH INLINE (hiện khi openSearch = true, thay thế menu) */}
          {openSearch ? (
            <div className="header-search-inline" ref={searchRef}>
              <form onSubmit={handleSearch} className="search-form-inline">
                <div className="search-input-wrap">
                  <input
                    type="text"
                    className="search-input-inline"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="search-submit-btn" aria-label="Tìm">
                    <FiSearch />
                  </button>
                </div>
              </form>

              {/* Tags gợi ý — chỉ hiện khi chưa nhập */}
              {!searchQuery.trim() && (
                <div className="search-tags-inline">
                  <span className="search-tags-label">Từ khóa nổi bật hôm nay</span>
                  <div className="search-tags-list">
                    {SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="search-tag"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dropdown kết quả — bên dưới toàn bộ header */}
              {searchQuery.trim() && (
                <div className="search-results-dropdown">
                  {filteredProducts.length > 0 ? (
                    <>
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="search-result-item"
                          onClick={() => {
                            router.push(`/products/${product.slug}`);
                            setOpenSearch(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="search-result-img-wrap">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={56}
                              height={56}
                              className="search-result-img"
                            />
                          </div>
                          <div className="search-result-info">
                            <span className="search-result-name">{product.name}</span>
                            <span className="search-result-price">
                              {(product.salePrice ?? product.price).toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                        </div>
                      ))}
                      <button
                        className="search-results-all"
                        onClick={() => {
                          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                          setOpenSearch(false);
                          setSearchQuery("");
                        }}
                      >
                        Xem tất cả kết quả cho &ldquo;{searchQuery}&rdquo;
                      </button>
                    </>
                  ) : (
                    <div className="search-no-result">
                      Không tìm thấy sản phẩm nào cho &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* MENU CHÍNH */
            <nav className="header-menu">
              {mainMenu.map((item, index) => {
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

                if (item.type === "dropdown") {
                  return (
                    <div key={index} className="menu-item has-dropdown">
                      <span className="menu-link cursor-default">
                        {item.label} <span className="arrow">▾</span>
                      </span>

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
          )}

          {/* ICONS */}
          <div className="header-icons">
            {icons.search && (
              <button
                className={`icon-btn search-btn ${openSearch ? "active" : ""}`}
                onClick={() => setOpenSearch(!openSearch)}
                aria-label={openSearch ? "Đóng tìm kiếm" : "Tìm kiếm"}
              >
                {openSearch ? <FiX /> : <FiSearch />}
              </button>
            )}

            {icons.user && (
              <button
                onClick={handleUserClick}
                className="icon-btn"
                aria-label="Tài khoản của tôi"
              >
                <FiUser />
              </button>
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
                aria-label={!isMounted ? "Giỏ hàng" : `Giỏ hàng${totalItems > 0 ? ` (${totalItems} sản phẩm)` : ""}`}
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
                  <span className="badge">{totalItems > 99 ? "99+" : totalItems}</span>
                )}
              </button>
            )}
          </div>

        </div>
      </header>
    </div>
  );
}
