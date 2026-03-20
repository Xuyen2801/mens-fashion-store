// src/components/product/ProductCard.jsx
"use client";
import React, { useState } from "react";
import { useCart } from "../../components/Cart/CartContext";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

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
  const [added, setAdded] = useState(false);

  // ── Normalize props ────────────────────────────────────────────────────────
  // Nếu `product` được truyền vào là object đầy đủ thì dùng luôn.
  // Nếu không thì tổng hợp từ các props rời (cách gọi cũ).
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
        sizes: props.sizes ?? [],
        colors: props.colors ?? [],
      };
  const { onOpenModal } = props;

  // Destructure từ object đã normalize
  const {
    image,
    name,
    price,
    salePrice,
    status,
    sizes = [],
    colors = [],
    discount,
  } = product;

  // Guard: không render nếu thiếu dữ liệu tối thiểu
  if (!name && !image) return null;

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleAddToCart = (e) => {
    e.stopPropagation();

    const defaultSize = sizes.length > 0 ? sizes[0] : "M";
    const defaultColor =
      colors.length > 0
        ? colors[0].name || colors[0]
        : "Default";

    addToCart(
      {
        ...product,
        image: image || product.images?.[0],
        price: salePrice || price,
      },
      defaultSize,
      defaultColor,
      1
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="group flex flex-col bg-white border border-transparent hover:border-gray-200 transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-md rounded-[8px] p-[5px] cursor-pointer"
      style={{ aspectRatio: "334/558" }}
      onClick={() => onOpenModal?.(product)}
    >
      {/* IMAGE */}
      <div className="relative w-full" style={{ aspectRatio: "334/455" }}>
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {status && (
          <span className="absolute top-0 right-0 bg-[#0057D9] text-white text-[10px] font-bold px-3 py-1 uppercase z-10">
            {status}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-0 left-0 bg-red-500 text-white text-[9px] font-bold px-2 py-1 z-10">
            -{discount}%
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-col flex-grow mt-2 px-1">
        <h3 className="text-[clamp(12px,1vw,14px)] leading-tight font-medium text-gray-700 line-clamp-2 hover:text-blue-600">
          {name}
        </h3>

        <div className="flex items-end justify-between mb-1 mt-auto">
          <div className="flex flex-col">
            {/* price */}
            <div className="flex items-center gap-2">
              <span className="text-[clamp(13px,1vw,15px)] font-bold text-[#1F2937]">
                {fmt(salePrice || price)}
              </span>
              {salePrice && salePrice !== price && (
                <span className="text-gray-400 text-[10px] line-through">
                  {fmt(price)}
                </span>
              )}
            </div>

            {/* color swatches */}
            {colors.length > 0 && (
              <div className="flex gap-1 mt-1">
                {colors.slice(0, 4).map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-gray-200 inline-block"
                    style={{ background: c.hex ?? "#ccc" }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`
              text-white text-[10px] font-medium py-1.5 px-2 sm:px-3
              rounded transition-all duration-200 whitespace-nowrap flex items-center gap-1
              ${added ? "bg-green-600 scale-95" : "bg-[#0044BB] hover:bg-blue-800"}
            `}
          >
            {added ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Đã thêm
              </>
            ) : (
              "Thêm giỏ hàng"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;