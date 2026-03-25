"use client";
import { useState } from "react";
import sanphamPYS from "../../data/Product/Tat-ca-san-pham/productsAll";
import "../../styles/bestseller.css";
import { useCart } from "../../components/Cart/CartContext";

export default function BestSeller() {

  // ===== STATE =====
  const [openSort, setOpenSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sản phẩm nổi bật");

  const { addToCart } = useCart();

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
    switch (selectedSort) {
      case "Giá: Tăng dần":
        return a.price - b.price;

      case "Giá: Giảm dần":
        return b.price - a.price;

      case "Tên: A-Z":
        return a.name.localeCompare(b.name);

      case "Tên: Z-A":
        return b.name.localeCompare(a.name);

      case "Mới nhất":
        return b.id - a.id;

      case "Cũ nhất":
        return a.id - b.id;

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
      <div className="collection-grid">
        {sortedProducts.map((item) => (
          <div className="product-card" key={item.id}>

            <div className="card-img">
              <img src={item.image} alt={item.name} />
              <span className="badge-new">HÀNG MỚI</span>
            </div>

            <div className="card-info">
              <h4>{item.name}</h4>

              <div className="price">
                <span className="current">
                  {item.price.toLocaleString()}đ
                </span>

                {item.oldPrice && (
                  <span className="old">
                    {item.oldPrice.toLocaleString()}đ
                  </span>
                )}
              </div>

              {/* ADD TO CART */}
              <button
                className="add-cart-btn"
                onClick={() => addToCart(item)}
              >
                Thêm vào giỏ
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}