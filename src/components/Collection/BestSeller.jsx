"use client";
import { useEffect, useState } from "react";
import "../../styles/bestseller.css";
import { fetchCollection } from "../../lib/api";
import ProductCard from "../../components/Product/ProductCard";

export default function BestSeller() {

  // ===== STATE =====
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sản phẩm nổi bật");
  const [sanphamPYS, setSanphamPYS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🖾 normalizeProducts: Standardize API response format
  // API có thể trả về 2 format:
  // 1. [{ productsAll: [...] }] hoặc [{ products: [...] }] - wrapped format
  // 2. [product1, product2, ...] - flat array format
  // Function này kiểm tra và extract array thực tế từ bất kỳ format nào
  const normalizeProducts = (payload) => {
    if (Array.isArray(payload)) {
      if (payload.length === 0) return [];

      if (payload[0] && typeof payload[0] === "object") {
        // Nếu first element có productsAll/products -> lấy array đó
        if (Array.isArray(payload[0].productsAll)) return payload[0].productsAll;
        if (Array.isArray(payload[0].products)) return payload[0].products;
      }

      return payload; // Nếu đã là flat array thì trả về ngay
    }

    if (payload && typeof payload === "object") {
      // Handle object payload
      if (Array.isArray(payload.productsAll)) return payload.productsAll;
      if (Array.isArray(payload.products)) return payload.products;
    }

    return [];
  };

  useEffect(() => {
    let isMounted = true; // Flag để prevent state update sau khi unmount

    const loadProducts = async () => {
      try {
        const data = await fetchCollection("productsAll");
        const list = normalizeProducts(data);

        // 🛡 Safety check: Chỉ update state nếu component vẫn mounted
        // Tránh warning: "Can't perform a React state update on an unmounted component"
        if (isMounted) {
          setSanphamPYS(Array.isArray(list) ? list : []);
        }
      } catch (error) {
        console.error("Failed to load best seller products:", error);
      } finally {
        // Đều set loading = false, bốc chả isMounted
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    // Cleanup function: được chạy khi component unmount
    // Set flag = false để block mọi state update sau đó
    return () => {
      isMounted = false;
    };
  }, []);

  const sortOptions = [
    "Sản phẩm nổi bật",
    "Giá: Tăng dần",
    "Giá: Giảm dần",
    "Tên: A-Z",
    "Tên: Z-A",
    "Cũ nhất",
    "Mới nhất",
    "Bán chạy nhất",
  ];

  // 📁 SORT LOGIC: Sắp xếp sản phẩm theo tiêu chí
  // ⚠️ ISSUE: Tính toán lại mỗi render mặc dù data không thay đổi
  // ɵ FIX: Nên wrap bằng useMemo để cache kết quả và třnh optimizer performance
  // Pattern: Pre-extract values (priceA, nameA) thay vì tính trong comparator
  const sortedProducts = [...sanphamPYS].sort((a, b) => {
    // Pre-extract values để tránh calculate lặp lại trong switch
    const nameA = String(a?.name || "");
    const nameB = String(b?.name || "");
    const priceA = Number(a?.salePrice ?? a?.price ?? 0); // Sale price has priority
    const priceB = Number(b?.salePrice ?? b?.price ?? 0);
    const idA = Number(a?.id ?? 0);
    const idB = Number(b?.id ?? 0);

    switch (selectedSort) {
      case "Giá: Tăng dần":
        // Tăng: theo thứ tự tăng (thấp -> cao)
        return priceA - priceB;

      case "Giá: Giảm dần":
        // Giảm: theo thứ tự giảm (cao -> thấp)
        return priceB - priceA;

      case "Tên: A-Z":
        // Sắp xếp chữ cái A-Z (localeCompare hỗ trợ Vietnamese diacritics)
        return nameA.localeCompare(nameB);

      case "Tên: Z-A":
        // Sắp xếp chữ cái Z-A (ngược)
        return nameB.localeCompare(nameA);

      case "Mới nhất":
        // Sắp xếp theo ID giảm dần (giả định ID cao = sản phẩm mới)
        return idB - idA;

      case "Cũ nhất":
        // Sắp xếp theo ID tăng dần
        return idA - idB;

      default:
        return 0;
    }
  });

  return (
    <div className="collection-page">

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        Trang chủ / Danh mục / <span>Sản phẩm mới</span>
      </div>

      {/* BANNER */}
      <div className="collection-banner">
        <div className="banner-right">
          <img src="/images/products/hangbanchay.png" alt="" />
        </div>
      </div>

      {/* SORT */}
      <div className="collection-top">
        <div></div>

        <div
          className="sort"
          onClick={(e) => {
            e.stopPropagation();
            setOpenSort(!openSort);
          }}
        >
          {selectedSort} ⬇

          {openSort && (
            <div className="sort-dropdown">
              {sortOptions.map((item, index) => (
                <div
                  key={index}
                  className={`sort-item ${selectedSort === item ? "active" : ""}`}
                  onClick={() => {
                    setSelectedSort(item);
                    setOpenSort(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="bestseller-grid">
        {isLoading ? (
          <div className="bestseller-empty">Đang tải sản phẩm bán chạy...</div>
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((item, index) => (
            <ProductCard
              key={item?.id ?? item?.sku ?? item?.slug ?? `best-${index}`}
              product={item}
            />
          ))
        ) : (
          <div className="bestseller-empty">Chưa có sản phẩm bán chạy.</div>
        )}
      </div>

    </div>
  );
}