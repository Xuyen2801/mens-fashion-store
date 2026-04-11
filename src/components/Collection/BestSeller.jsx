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

  const normalizeProducts = (payload) => {
    if (Array.isArray(payload)) {
      if (payload.length === 0) return [];

      if (payload[0] && typeof payload[0] === "object") {
        if (Array.isArray(payload[0].productsAll)) return payload[0].productsAll;
        if (Array.isArray(payload[0].products)) return payload[0].products;
      }

      return payload;
    }

    if (payload && typeof payload === "object") {
      if (Array.isArray(payload.productsAll)) return payload.productsAll;
      if (Array.isArray(payload.products)) return payload.products;
    }

    return [];
  };

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const data = await fetchCollection("productsAll");
        const list = normalizeProducts(data);

        if (isMounted) {
          setSanphamPYS(Array.isArray(list) ? list : []);
        }
      } catch (error) {
        console.error("Failed to load best seller products:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

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

  // ===== SORT LOGIC =====
  const sortedProducts = [...sanphamPYS].sort((a, b) => {
    const nameA = String(a?.name || "");
    const nameB = String(b?.name || "");
    const priceA = Number(a?.salePrice ?? a?.price ?? 0);
    const priceB = Number(b?.salePrice ?? b?.price ?? 0);
    const idA = Number(a?.id ?? 0);
    const idB = Number(b?.id ?? 0);

    switch (selectedSort) {
      case "Giá: Tăng dần":
        return priceA - priceB;

      case "Giá: Giảm dần":
        return priceB - priceA;

      case "Tên: A-Z":
        return nameA.localeCompare(nameB);

      case "Tên: Z-A":
        return nameB.localeCompare(nameA);

      case "Mới nhất":
        return idB - idA;

      case "Cũ nhất":
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