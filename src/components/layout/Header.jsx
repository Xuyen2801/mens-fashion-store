// <<<<<<< HEAD
"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
// =======
// src/components/Header/Header.jsx
// "use client";

// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiUser, FiShoppingCart, FiMapPin, FiX } from "react-icons/fi";
import { useCart } from "../../components/Cart/CartContext";
import ProductCard from "../../components/Product/ProductCard";
// <<<<<<< HEAD
// import { FiMapPin } from "react-icons/fi";
// import { usePathname } from "next/navigation";

// =======
import { fetchCollection } from "../../lib/api";
import "../../styles/Product/header.css";
// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef

const DEFAULT_HEADER_DATA = {
  topbar: { promotions: [] },
  logo: { src: "/images/header/logo-header.png", alt: "ICONDENIM", width: 140, height: 32 },
  mainMenu: [],
  icons: { search: true, user: true, cart: { showBadge: true, initialCount: 0 } },
};

export default function Header() {
  const router = useRouter();
// <<<<<<< HEAD
// =======
//   const { totalItems, setIsCartOpen } = useCart();
// >>>>>>> 0d68f9c0895bf05a23d565e611982d87e0a89eef

  const { totalItems, setIsCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [headerData, setHeaderData] = useState(DEFAULT_HEADER_DATA);
  const { topbar, logo, mainMenu, icons } = headerData;

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    fetchCollection("headerData")
      .then((data) => {
        const source = Array.isArray(data)
          ? data[0]?.headerData ?? data[0] ?? null
          : data?.headerData ?? data ?? null;

        if (source) {
          setHeaderData({
            ...DEFAULT_HEADER_DATA,
            ...source,
          });
        }
      })
      .catch((error) => console.error("Failed to load header data:", error));
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const searchWrapperRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchToggleButtonRef = useRef(null);
  // ─── Cart state from context ───────────────────────────────────────────────
  const pathname = usePathname();


  const openSearchPanel = () => {
    setOpenSearch(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const closeSearchPanel = ({ keepQuery = true } = {}) => {
    setOpenSearch(false);
    if (!keepQuery) {
      setSearchQuery("");
    }
    setTimeout(() => searchToggleButtonRef.current?.focus(), 0);
  };

  useEffect(() => {
    closeSearchPanel();
  }, [pathname]);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

    const normalizeText = (value) =>
      String(value || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const normalizeProductsPayload = (payload) => {
      if (!Array.isArray(payload) || payload.length === 0) return [];

      const first = payload[0];
      if (first && typeof first === "object") {
        if (Array.isArray(first.productsAll)) return first.productsAll;
        if (Array.isArray(first.products)) return first.products;
      }

      return payload;
    };

    const SEARCH_COLLECTIONS = [
      "productsAll",
      "productsNew",
      "productsOutLet",
      "ao-polo",
      "ao-thun",
      "ao-khoac",
      "so-mi",
      "set-do",
      "tank-top",
      "hoodie",
      "jean",
      "short",
      "kaki",
      "boxer",
      "jogger",
      "tay",
    ];

    const dedupeProducts = (items) => {
      const seen = new Set();

      return items.filter((product) => {
        const key = String(product?.slug || product?.id || product?.sku || product?.name || "").trim().toLowerCase();
        if (!key) return false;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    };

    useEffect(() => {
      if (!openSearch || searchProducts.length > 0) return;

      let isCancelled = false;

      const loadSearchProducts = async () => {
        try {
          setIsSearchLoading(true);
          const responses = await Promise.allSettled(
            SEARCH_COLLECTIONS.map((collectionName) => fetchCollection(collectionName))
          );

          const mergedProducts = responses.flatMap((response) => {
            if (response.status !== "fulfilled") return [];
            return normalizeProductsPayload(response.value);
          });

          if (isCancelled) return;
          setSearchProducts(dedupeProducts(mergedProducts));
        } catch (error) {
          if (!isCancelled) {
            console.error("Failed to load search products:", error);
            setSearchProducts([]);
          }
        } finally {
          if (!isCancelled) {
            setIsSearchLoading(false);
          }
        }
      };

      loadSearchProducts();

      return () => {
        isCancelled = true;
      };
    }, [openSearch, searchProducts.length]);

    useEffect(() => {
      if (!openSearch) return;

      const handleClickOutside = (event) => {
        if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
          closeSearchPanel();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openSearch]);

    useEffect(() => {
      if (!openSearch) return;

      const handleEscToClose = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeSearchPanel();
        }
      };

      document.addEventListener("keydown", handleEscToClose);
      return () => document.removeEventListener("keydown", handleEscToClose);
    }, [openSearch]);

    useEffect(() => {
      if (!openSearch) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [openSearch]);

    const searchResults = useMemo(() => {
      // 🔍 useMemo: Cache search results để optimize render performance
      // Chỉ tính toán lại khi dependencies thay đổi (searchQuery, searchProducts)
      // Nếu user chỉ gõ đôi xong (render liên tiếp) -> reuse kết quả cũ để avoid lag
      const keyword = normalizeText(searchQuery);

      if (!keyword) {
        return searchProducts.slice(0, 12); // Nếu không search gì -> hiện thị 12 sản phẩm đầu
      }

      return searchProducts
        .filter((product) => {
          const name = normalizeText(product?.name);
          const category = normalizeText(product?.category);
          const sku = normalizeText(product?.sku || product?.id);

          // Tìm kiếm trong cả 3 field: name, category, sku
          return name.includes(keyword) || category.includes(keyword) || sku.includes(keyword);
        })
        .slice(0, 24); // Giới hạn 24 kết quả
    }, [searchProducts, searchQuery]);

    const getProductDetailPath = (product) => {
      const targetSlug = String(product?.slug || product?.id || "").trim();
      if (!targetSlug) return null;
      return `/Product/best-seller/${targetSlug}`;
    };

    const handleSearchResultClick = (product) => {
      const path = getProductDetailPath(product);
      if (!path) return;

      const targetSlug = String(product?.slug || product?.id || "").trim();

      try {
        sessionStorage.setItem(`product-detail:${targetSlug}`, JSON.stringify(product));
      } catch {
        // Ignore browser storage errors to avoid blocking navigation.
      }

      closeSearchPanel({ keepQuery: false });
      router.push(path);
    };

    const handleSearchSubmit = () => {
      if (searchResults.length === 0) return;
      handleSearchResultClick(searchResults[0]);
    };

  const resolveDenimCardPath = (card) => {
    // 🧭 Chuyển card text thành URL path
    // Logic: Nếu card có path được set rồi -> dùng nó
    // Nếu không -> match text của card để tìm collection path tương ứng
    // VD: "AirFlex" -> "/collection/AIRFLEX", "ProCOOL" -> "/collection/ProCOOL"
    if (card?.path && card.path !== "#") return card.path;

    const text = (card?.text || "").toLowerCase();

    if (text.includes("airflex")) return "/collection/AIRFLEX";
    if (text.includes("procool")) return "/collection/ProCOOL";
    if (text.includes("icon105") || text.includes("siêu nhẹ") || text.includes("sieu nhe")) {
      return "/collection/icon105";
    }
    if (text.includes("smart jeans") || text.includes("co giãn") || text.includes("co gian")) {
      return "/collection/smart-jeans";
    }

    return "/collection"; // Default fallback
  };

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
                  <div
                    key={index}
                    className={`menu-item has-dropdown ${openDropdown === item.label ? "is-open" : ""}`}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      className="menu-link cursor-default menu-dropdown-trigger"
                      onClick={() =>
                        setOpenDropdown((current) => (current === item.label ? null : item.label))
                      }
                    >
                      {item.label} <span className="arrow">▾</span>
                    </button>

                    {/* Render Dropdown theo nhãn tên */}
                    {item.label === "Sản phẩm" && (
                      <div className="dropdown drop_pro">
                        <div className="dropdown-container">
                          {item.items.map((col, colIdx) => (
                            <div key={colIdx} className="dropdown-col">
                              <h4>{col.title}</h4>
                              {col.links.map((link, linkIdx) => (
                                <Link key={linkIdx} href={link.path} onClick={() => setOpenDropdown(null)}>
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
                                <Link key={linkIdx} href={link.path} onClick={() => setOpenDropdown(null)}>
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="denim-right">
                          {item.denim.rightCards.map((card, cardIdx) => (
                            <Link
                              key={cardIdx}
                              href={resolveDenimCardPath(card)}
                              className="denim-card"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <Image
                                src={card.src}
                                alt={card.text}
                                width={260}
                                height={160}
                              />
                              <span>{card.text}</span>
                            </Link>
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
                              onClick={() => setOpenDropdown(null)}
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
                            onClick={() => {
                              setOpenDropdown(null);
                              router.push("/collection");
                            }}
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
              <button
                type="button"
                className="icon-btn"
                aria-label="Mở tìm kiếm"
                ref={searchToggleButtonRef}
                onClick={() => (openSearch ? closeSearchPanel() : openSearchPanel())}
              >
                {openSearch ? <FiX /> : <FiSearch />}
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
    <div className="search-dropdown-inner" ref={searchWrapperRef}>
      <div className="search-toolbar">
        <p>Tìm kiếm sản phẩm</p>
        <button type="button" className="search-close-btn" onClick={() => closeSearchPanel()} aria-label="Đóng tìm kiếm">
          <FiX />
        </button>
      </div>

    <div className="search-box">
      <input
        type="text"
        ref={searchInputRef}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearchSubmit();
          }
        }}
        placeholder="Tìm kiếm tên sản phẩm, SKU, danh mục..."
      />
      <button type="button" className="search-submit-btn" onClick={handleSearchSubmit}>
        <FiSearch className="search-icon" />
      </button>
    </div>

    {!searchQuery.trim() && (
      <div className="search-suggestions">
        <p>Từ khóa nổi bật hôm nay</p>

        <div className="tags">
          {["smartjean", "áo thun", "áo polo", "quần short", "áo khoác", "quần tây"].map((tag) => (
            <button key={tag} type="button" onClick={() => setSearchQuery(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    )}

    <div className="search-result-list">
      {isSearchLoading && <p className="search-state">Đang tải dữ liệu sản phẩm...</p>}

      {!isSearchLoading && searchResults.length === 0 && (
        <p className="search-state">Không tìm thấy sản phẩm phù hợp.</p>
      )}

      {!isSearchLoading &&
        searchResults.map((product) => {
          const path = getProductDetailPath(product);

          return (
            <div key={`${product?.id || product?.name}-${path || "unknown"}`} className="search-result-card">
              <ProductCard product={product} />
            </div>
          );
        })}
    </div>
    </div>
  </div>
)}
    </div>
  );
}