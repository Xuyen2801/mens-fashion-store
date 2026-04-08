"use client";
import React, { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { productsAll } from "../../data/Product/Tat-ca-san-pham/productsAll";
import "../../styles/search.css";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return productsAll.filter((p) =>
      normalize(p.name).includes(normalize(query.trim()))
    );
  }, [query]);

  return (
    <div className="search-page">
      {/* Breadcrumb */}
      <nav className="search-breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span>/</span>
        <Link href="/collections/all">Danh mục</Link>
        <span>/</span>
        <span>Tìm kiếm</span>
      </nav>

      {/* Tiêu đề */}
      <div className="search-header">
        <h1 className="search-title">Tìm kiếm</h1>
        <p className="search-subtitle">
          {results.length > 0
            ? `Có ${results.length} sản phẩm cho tìm kiếm`
            : query
            ? "Không tìm thấy sản phẩm nào"
            : "Nhập từ khóa để tìm kiếm"}
        </p>
        {query && (
          <p className="search-query-label">
            Kết quả tìm kiếm cho &ldquo;<strong>{query}</strong>&rdquo;:
          </p>
        )}
      </div>

      {/* Grid sản phẩm */}
      {results.length > 0 ? (
        <div className="search-grid">
          {results.map((product) => {
            const discount =
              product.salePrice && product.price > product.salePrice
                ? Math.round(((product.price - product.salePrice) / product.price) * 100)
                : null;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="search-product-card"
              >
                <div className="search-product-img-wrap">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="search-product-img"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  {product.status && (
                    <span className={`search-product-badge ${
                      product.status.includes("SALE") ? "badge-sale" :
                      product.status === "HOT" ? "badge-hot" : "badge-new"
                    }`}>
                      {product.status}
                    </span>
                  )}
                  {discount && (
                    <span className="search-product-discount">SALE</span>
                  )}
                  <div className="search-product-actions">
                    <button className="search-action-btn" title="Thêm vào giỏ" onClick={(e) => e.preventDefault()}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    </button>
                    <button className="search-action-btn" title="Xem nhanh" onClick={(e) => e.preventDefault()}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                </div>

                <div className="search-product-info">
                  <p className="search-product-name">{product.name}</p>
                  <div className="search-product-price-row">
                    {product.salePrice && product.salePrice < product.price ? (
                      <>
                        <span className="search-price-sale">
                          {product.salePrice.toLocaleString("vi-VN")}đ
                        </span>
                        <span className="search-price-original">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        {discount && (
                          <span className="search-price-percent">-{discount}%</span>
                        )}
                      </>
                    ) : (
                      <span className="search-price-sale">
                        {product.price.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                  {/* Color swatches */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="search-product-colors">
                      {product.colors.map((color, i) => (
                        <div
                          key={i}
                          className="search-color-dot"
                          title={color.name}
                          style={{ backgroundImage: `url(${color.thumbnail})` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : query ? (
        <div className="search-empty">
          <p>Không tìm thấy sản phẩm nào cho &ldquo;<strong>{query}</strong>&rdquo;</p>
          <Link href="/collections/all" className="search-empty-btn">
            Xem tất cả sản phẩm
          </Link>
        </div>
      ) : null}
    </div>
  );
}
