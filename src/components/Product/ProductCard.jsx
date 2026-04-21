
"use client";
import React, { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import ProductCardModal from "../modal/ProductCardModal";
import toast from 'react-hot-toast';
import ClientPortal from "../Common/ClientPortal";



const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const PRODUCTCARD_FALLBACK_IMAGES = [
  "/images/productcart/2.jpg",
  "/images/productcart/3.jpg",
  "/images/productcart/4.jpg",
  "/images/productcart/5.jpg",
  "/images/productcart/6.jpg",
  "/images/productcart/7.jpg",
  "/images/productcart/8.jpg",
  "/images/productcart/9.jpg",
  "/images/productcart/10.jpg",
  "/images/productcart/11.jpg",
];

const pickFallbackImage = (seed) => {
  const text = String(seed || "fallback");
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return PRODUCTCARD_FALLBACK_IMAGES[hash % PRODUCTCARD_FALLBACK_IMAGES.length];
};

const ProductCard = (props) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const categoryMap = {
    "ao-khoac": "Áo khoác nam",
    "ao-thun": "Áo thun nam",
    "ao-polo": "Áo polo nam",
    "so-mi": "Áo sơ mi nam",
    "hoodie": "Áo Hoodie",
    "tank-top": "Áo Tank top",

    // Nhóm Quần
    "jean": "Quần jean nam",
    "short": "Quần short nam",
    "kaki": "Quần kaki nam",
    "boxer": "Quần boxer nam",
    "jogger": "Quần jogger nam",
    "tay": "Quần tây nam",

    // Nhóm khác
    "set-do": "Set đồ nam",
    "productsNew": "Sản phẩm mới",
    "productsOutLet": "Hàng Outlet",
    "productsAll": "Tất cả sản phẩm"
  };

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const product = props.product && typeof props.product === "object"
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
      category: props.category
    };

  const { onOpenModal } = props;

  const {
    id,
    sku,
    image,
    images = [],
    thumbnail,
    name,
    price,
    salePrice,
    status,
    sizes = [],
    colors = [],
    discount,
  } = product;

  const firstColor = colors[0];
  const defaultColorName =
    (typeof firstColor === "string" && firstColor.trim()) ||
    (typeof firstColor === "object" && (firstColor?.name || firstColor?.color)) ||
    product?.variants?.[0]?.color ||
    "Tieu chuan";

  const fallbackImage = pickFallbackImage(id || sku || name);
  const resolvedImage =
    (typeof image === "string" && image.trim()) ||
    (Array.isArray(images) && typeof images[0] === "string" && images[0].trim()) ||
    (typeof thumbnail === "string" && thumbnail.trim()) ||
    fallbackImage;

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

    addToCart(product, "M", defaultColorName, 1);
    toast.success("Đã thêm vào giỏ hàng!");

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOpenQuickView = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsModalOpen(true);
  };

  const handleGoToDetail = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const targetId = props.product?.id || props.id;

    if (!targetId) {
      console.error("❌ Lỗi: Không tìm thấy ID sản phẩm", props.product);
      return;
    }

    const normalizedCategory = normalizeText(product?.category || "ao-polo");
    const safeCategory = categoryMap[normalizedCategory] || normalizedCategory || "ao-polo";

    router.push(`/Product/${safeCategory}/${targetId}`);
  };

  const handleOpenModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (typeof onOpenModal === "function") {
      onOpenModal(product);
      return;
    }

    setIsModalOpen(true);
  };

  const handleCardClick = () => {
    handleOpenModal();
  };
  return (
    <>
      <div
        className="group flex flex-col bg-white border border-transparent hover:border-gray-200 transition-all duration-300 overflow-hidden relative shadow-sm hover:shadow-md rounded-[8px] p-[5px] cursor-pointer"
        style={{ aspectRatio: "334/558" }}
        onClick={handleGoToDetail}
      >
        {/* IMAGE */}
        <div className="relative w-full" style={{ aspectRatio: "334/455" }}>
          <div className="absolute inset-0 overflow-hidden rounded-[4px]">
            <img
              src={resolvedImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(event) => {
                if (event.currentTarget.src !== fallbackImage) {
                  event.currentTarget.src = fallbackImage;
                }
              }}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-20" onClick={(e) => e.stopPropagation()}>
            <AddToCartButton
              onClick={handleOpenQuickView}
              onView={handleGoToDetail}
              added={false}
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

        <div className="flex flex-col flex-grow mt-2 px-1">
          <h3 className="text-[clamp(12px,1vw,14px)] leading-tight font-medium text-gray-700 line-clamp-2 hover:text-blue-600">
            {name}
          </h3>

          <div className="flex items-end justify-between mb-1 mt-auto">
            <div className="flex flex-col">

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

              {colors.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {colors.slice(0, 4).map((c, i) => (
                    <span
                      key={`${(typeof c === "string" ? c : c?.name || c?.color || "color")}-${i}`}
                      className="w-4 h-4 rounded-full border border-gray-200 inline-block bg-center bg-cover"
                      style={{
                        backgroundImage:
                          typeof c === "object" && (c?.thumbnail || c?.image)
                            ? `url(${c.thumbnail || c.image})`
                            : undefined,
                        backgroundColor:
                          typeof c === "object" && c?.hex ? c.hex : "#9CA3AF",
                      }}
                      title={typeof c === "string" ? c : c?.name || c?.color || `Mau ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {isModalOpen && (
        <ClientPortal>
          <ProductCardModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={product}
          />
        </ClientPortal>
      )}
    </>
  );
};

export default ProductCard;