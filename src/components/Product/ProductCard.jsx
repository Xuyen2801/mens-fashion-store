// src/components/product/ProductCard.jsx
"use client";
import React, { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import toast from "react-hot-toast";

import "../../styles/Product/ProCart.css";
import { FiShoppingCart, FiEye } from "react-icons/fi";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n,
  );

/**
 * Backward-compatible: hoạt động với CẢ HAI cách gọi:
 *
 *   Cách cũ (props rời):
 *     <ProductCard image={...} name={...} price={...} salePrice={...} status={...} />
 *
 *   Cách mới (object):
 *     <ProductCard product={productObj} onOpenModal={fn} />
 */
const ProductCard = (props) => {
  const { addToCart } = useCart();
  const router = useRouter();

  // Chuẩn hóa dữ liệu sản phẩm
  const product =
    props.product && typeof props.product === "object"
      ? props.product
      : {
          id: props.id || props.sku,
          sku: props.sku || props.id,
          name: props.name,
          image: props.image,
          price: props.price,
          salePrice: props.salePrice,
          status: props.status,
          colors: props.colors ?? [],
          discount: props.discount || 0,
        };

  const { onOpenModal } = props;
  const {
    image,
    name,
    price,
    salePrice,
    status,
    colors = [],
    discount,
  } = product;

  if (!name && !image) return null;

  // Logic thêm vào giỏ hàng (giữ nguyên logic kiểm tra login của bạn)
  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();

    const rawUser = localStorage.getItem("user");
    if (!rawUser || rawUser === "null" || rawUser === "undefined") {
      toast.error("Hãy đăng nhập để thêm vào giỏ hàng!");
      setTimeout(() => router.push("/login"), 1000);
      return;
    }

    addToCart(product, "M", "Default", 1);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="product-card" onClick={() => onOpenModal?.(product)}>
      {/* 1. Nhãn Trạng thái (HÀNG MỚI / SALE) */}
      {status && <div className="badge-new">{status}</div>}
      {discount > 0 && !status && (
        <div className="badge-new" style={{ backgroundColor: "#ed1c24" }}>
          -{discount}%
        </div>
      )}

      {/* 2. Phần ảnh và Thanh công cụ ẩn */}
      <div className="image-container">
        <img src={image} alt={name} />

        {/* Thanh icon trắng hiện khi hover */}
        <div className="action-tools" onClick={(e) => e.stopPropagation()}>
          <FiShoppingCart
            title="Thêm nhanh vào giỏ"
            onClick={handleAddToCart}
          />
          <FiEye
            title="Xem nhanh sản phẩm"
            onClick={() => onOpenModal?.(product)}
          />
        </div>
      </div>

      {/* 3. Thông tin sản phẩm */}
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">
          {fmt(salePrice || price)}
          {salePrice && salePrice !== price && (
            <span
              style={{
                fontSize: "11px",
                color: "#999",
                textDecoration: "line-through",
                marginLeft: "8px",
                fontWeight: "400",
              }}
            >
              {fmt(price)}
            </span>
          )}
        </div>
      </div>

      {/* 4. Lựa chọn màu sắc dạng Thumbnail */}
      {colors && colors.length > 0 && (
        <div className="color-options">
          {colors.slice(0, 7).map(
            (
              c,
              i, // Giới hạn hiển thị 7 màu như ảnh
            ) => (
              <div
                key={i}
                className="color-dot"
                title={c.name}
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn chặn sự kiện mở Modal khi chọn màu
                  // Thêm logic đổi ảnh chính ở đây nếu cần
                }}
              >
                {/* Ưu tiên hiển thị ảnh thumbnail, nếu không có mới dùng màu HEX */}
                {c.thumbnail || c.image ? (
                  <img src={c.thumbnail || c.image} alt={c.name} />
                ) : (
                  <div
                    style={{
                      backgroundColor: c.hex || "#ccc",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
            ),
          )}
        </div>
      )}
      <div className="product-info">
        {/* ICON TRÒN THU NHỎ CỦA SẢN PHẨM */}
        <div className="product-symbol-circle">
          <img src={image} alt="symbol" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
