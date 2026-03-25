// src/components/product/ProductCard.jsx
"use client";
import React, { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import toast from 'react-hot-toast';



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
  const router = useRouter();


const handleGoToDetail = (e) => {
    e.preventDefault();
    const safeCategory = "ao-polo";
    const slug = props.slug || props.id || "product-detail";
    router.push(`Product/${safeCategory}/${slug}`);
}


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
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  const rawUser = localStorage.getItem("user");
  
  if (!rawUser || rawUser === "null" || rawUser === "undefined") {
    toast.error("Hãy đăng nhập để thêm sản phẩm vào giỏ hàng!", {
      style: {
        border: '1px solid #ff4b4b',
        padding: '16px',
        color: '#ff4b4b',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      iconTheme: {
        primary: '#ff4b4b',
        secondary: '#FFFAEE',
      },
    });

    setTimeout(() => {
      router.push("/login");
    }, 1500);
    
    return; 
  }

  addToCart(product, "M", "Default", 1);
  toast.success("Đã thêm vào giỏ hàng!"); 
  
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
          <div onClick={(e) => e.stopPropagation()}>
            <AddToCartButton 
              onClick={handleAddToCart} 
              added={added} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;