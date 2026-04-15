'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../Cart/CartContext';
import { useRouter } from 'next/navigation';
import { fetchCollection } from '../../lib/api';
import toast from 'react-hot-toast';

const INFO_FALLBACK_IMAGES = [
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

const pickInfoFallback = (seed) => {
  const text = String(seed || "variant");
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }

  return INFO_FALLBACK_IMAGES[hash % INFO_FALLBACK_IMAGES.length];
};

const resolveVariantImage = (url, seed) => {
  const value = String(url || "").trim();
  if (!value || value.startsWith("/images/products/ao-thun/")) {
    return pickInfoFallback(seed);
  }

  return value;
};

export default function ProductInfo({ product, onColorChange, showDetailButton = false }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [seasonalPromotions, setSeasonalPromotions] = useState([]);
  const { addToCart } = useCart();
  const router = useRouter();

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const categoryMap = {
    "ao-khoac": "ao-khoac",
    "ao-thun": "ao-thun",
    "ao-polo": "ao-polo",
    "ao-so-mi": "ao-so-mi",
    "so-mi": "ao-so-mi",
    "set-do": "set-do",
    "tank-top": "tank-top",
    hoodie: "hoodie",
    "quan-jeans": "quan-jean",
    "quan-jean": "quan-jean",
    "quan-short": "quan-short",
    "quan-kaki-chino": "quan-kaki",
    "quan-kaki": "quan-kaki",
    "quan-boxer": "quan-boxer",
    "quan-jogger": "quan-jogger",
    "quan-tay": "quan-tay",
  };

  const PRODUCT_VOUCHERS = [
    { id: "V01", title: "GIẢM 20K", code: "MAR20", desc: "Đơn từ 299K" },
    { id: "V02", title: "GIẢM 50K", code: "MAR50", desc: "Đơn từ 699K" },
    { id: "V03", title: "FREE SHIP", code: "FREESHIP", desc: "Đơn từ 199K" }
  ];

  const colorVariants =
    Array.isArray(product?.variants) && product.variants.length > 0
      ? product.variants
      : Array.isArray(product?.colors)
        ? product.colors.map((color, index) => ({
            color:
              (typeof color === 'string' && color.trim()) ||
              color?.name ||
              color?.color ||
              `Mau-${index + 1}`,
            image:
              (typeof color === 'object' && (color?.thumbnail || color?.image)) ||
              product?.images?.[0],
            sizes: product?.sizes || [],
          }))
        : [];

  useEffect(() => {
    if (colorVariants.length > 0) {
      setSelectedVariant(colorVariants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [colorVariants]);

  useEffect(() => {
    fetchCollection('configs')
      .then((data) => {
        const list = Array.isArray(data) ? data[0]?.SEASONAL_PROMOTIONS ?? data : [];
        setSeasonalPromotions(Array.isArray(list) ? list : []);
      })
      .catch((error) => console.error('Failed to load seasonal promotions:', error));
  }, []);


  useEffect(() => {
  if (!selectedVariant?.color) return; 
  
  console.log("Click chọn màu mới:", selectedVariant.color);
  setQuantity(1);

}, [selectedVariant?.color]);

  const handleColorChange = (variant) => {
    setSelectedVariant(variant);
    if (onColorChange) onColorChange(variant); 
  };

  const handleGoToDetail = (e) => {
    e.preventDefault();
    const targetSlug = product?.slug || product?.id || product?.sku;
    if (!targetSlug) return;

    const normalizedCategory = normalizeText(product?.category || "ao-polo");
    const safeCategory = categoryMap[normalizedCategory] || normalizedCategory || "ao-polo";

    try {
      sessionStorage.setItem(`product-detail:${targetSlug}`, JSON.stringify(product));
    } catch {
      // Ignore storage errors and continue navigation.
    }

    router.push(`/Product/${safeCategory}/${targetSlug}`);
  };
  
  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();

    const rawUser = localStorage.getItem("user");
    let isValidUser = false;

    try {
      if (rawUser && rawUser !== "null" && rawUser !== "undefined") {
        const userData = JSON.parse(rawUser);
        if (userData && (userData.id || userData.fullName || userData.phone)) {
          isValidUser = true;
        }
      }
    } catch (err) {
      isValidUser = false;
    }
    if (!isValidUser) {
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
        router.push('/login');
      }, 1500);
      return; 
    }

    const selectedColor =
      selectedVariant?.color ||
      selectedVariant?.name ||
      (typeof product?.colors?.[0] === 'string' ? product.colors[0] : product?.colors?.[0]?.name) ||
      "Tieu chuan";

    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success('Đã thêm vào giỏ hàng!');

  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  const availableVariant = selectedVariant || colorVariants[0] || null;

  if (!product) return null;

  return (
    <div className="flex flex-col gap-5">
   
      <div>
        <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight">{product.name}</h2>
        <p className="text-[10px] text-gray-400 uppercase mt-1 tracking-[0.2em]">Mã SP: {product.id}</p>
      </div>

      
      <div className="flex items-baseline gap-4">
        <span className="text-[#1e3a8a] font-extrabold text-3xl">{product.salePrice?.toLocaleString('vi-VN')}đ</span>
        <span className="text-gray-400 line-through text-lg">{product.price?.toLocaleString('vi-VN')}đ</span>
        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded italic">-{Math.round((1 - product.salePrice/product.price)*100)}%</span>
      </div>


      <div className="py-2">
        <p className="text-[12px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Mã giảm giá</p>
        <div className="flex flex-wrap gap-3">
          {PRODUCT_VOUCHERS.map((v) => (
            <div 
              key={v.id} 
              onClick={() => copyToClipboard(v.code)}
              className="relative flex flex-col items-center justify-center bg-[#f0f4ff] border border-[#d6e4ff] px-4 py-2 cursor-pointer hover:bg-[#e6efff] transition-all group min-w-[100px]"
            >
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-[#d6e4ff]"></div>
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-[#d6e4ff]"></div>
              <span className="text-[11px] font-bold text-[#1e3a8a]">{v.title}</span>
              <span className="text-[8px] text-blue-400 mt-0.5 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Copy mã</span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="border border-dashed border-red-200 rounded-lg p-4 bg-red-50/20">
        <p className="text-red-700 font-bold text-[11px] uppercase italic mb-3 flex items-center gap-2">
           <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span> Ưu đãi Online
        </p>
        <ul className="space-y-2">
          {seasonalPromotions.map((promo, i) => (
            <li key={i} className="text-[12px] text-gray-600 flex items-start gap-2 italic">
              <span className="text-red-400">•</span> {promo.text}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-bold">Màu sắc: <span className="text-gray-500 font-normal ml-1">{availableVariant?.color || (typeof product?.colors?.[0] === 'string' ? product.colors[0] : product?.colors?.[0]?.name) || 'Tieu chuan'}</span></p>
        <div className="flex gap-3 mt-3">
          {colorVariants.map((variant, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(variant)}
              className={`w-11 h-11 rounded-full border-2 p-0.5 transition-all duration-300 ${
                availableVariant?.color === variant.color 
                ? 'border-black scale-110 shadow-lg' 
                : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={resolveVariantImage(variant.image, `${product?.id || product?.name}-${variant.color || index}`)}
                className="w-full h-full rounded-full object-cover"
                alt={variant.color}
                onError={(event) => {
                  event.currentTarget.src = pickInfoFallback(`${product?.id || product?.name}-variant-${index}`);
                }}
              />
            </button>
          ))}
        </div>
      </div>


      <div>
        <p className="text-sm font-bold mb-3 tracking-wide">Kích thước: <span className="text-gray-500 font-normal ml-1">{selectedSize}</span></p>
        <div className="flex flex-wrap gap-2">
          {(availableVariant?.sizes || product.sizes || []).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-14 h-11 border text-sm font-bold transition-all 
                ${selectedSize === size 
                  ? 'bg-black text-white border-black shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-black'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>


      <div className="flex gap-4 items-center mt-4">
        <div className="flex border border-gray-300 rounded overflow-hidden h-12 bg-white">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 hover:bg-gray-100 border-r">-</button>
          <span className="px-6 flex items-center font-bold text-sm">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-4 hover:bg-gray-100 border-l">+</button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 px-6 rounded-sm hover:bg-gray-800 transition-all font-bold uppercase tracking-widest text-sm shadow-xl"
        >
          Thêm vào giỏ hàng
        </button>
      </div>

      {showDetailButton && (
      <div className='flex justify-start mt-2'>
        <button 
          onClick={handleGoToDetail} 
          className='text-[13px] text-gray-400 hover:text-black transition-all underline underline-offset-8 decoration-gray-200 hover:decoration-black uppercase tracking-wider'
        >
          Xem chi tiết sản phẩm
        </button>
      </div>
      )}
    </div>
  );
}