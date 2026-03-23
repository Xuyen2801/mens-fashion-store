'use client';
import { useState, useEffect } from 'react';
import { SEASONAL_PROMOTIONS } from '../../data/configs';
import { useCart } from '../Cart/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductInfo({ product, onColorChange }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const PRODUCT_VOUCHERS = [
    { id: "V01", title: "GIẢM 20K", code: "MAR20", desc: "Đơn từ 299K" },
    { id: "V02", title: "GIẢM 50K", code: "MAR50", desc: "Đơn từ 699K" },
    { id: "V03", title: "FREE SHIP", code: "FREESHIP", desc: "Đơn từ 199K" }
  ];

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  const handleColorChange = (variant) => {
    setSelectedVariant(variant);
    if (onColorChange) onColorChange(variant); 
  };

  const handleGoToDetail = (e) => {
    e.preventDefault();
    if (!product?.slug) return;
    const safeCategory = product.category 
      ? product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') 
      : 'ao-polo';
    router.push(`/Product/${safeCategory}/${product.slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedVariant?.color, quantity);
    alert(`Đã thêm ${product.name} màu ${selectedVariant?.color} vào giỏ hàng!`);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  if (!product || !selectedVariant) return null;

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
          {SEASONAL_PROMOTIONS.map((promo, i) => (
            <li key={i} className="text-[12px] text-gray-600 flex items-start gap-2 italic">
              <span className="text-red-400">•</span> {promo.text}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-bold">Màu sắc: <span className="text-gray-500 font-normal ml-1">{selectedVariant.color}</span></p>
        <div className="flex gap-3 mt-3">
          {product.variants?.map((variant, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(variant)}
              className={`w-11 h-11 rounded-full border-2 p-0.5 transition-all duration-300 ${
                selectedVariant.color === variant.color 
                ? 'border-black scale-110 shadow-lg' 
                : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img src={variant.image} className="w-full h-full rounded-full object-cover" alt={variant.color} />
            </button>
          ))}
        </div>
      </div>


      <div>
        <p className="text-sm font-bold mb-3 tracking-wide">Kích thước: <span className="text-gray-500 font-normal ml-1">{selectedSize}</span></p>
        <div className="flex flex-wrap gap-2">
          {selectedVariant.sizes?.map((size) => (
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

      <div className='flex justify-start mt-2'>
        <button 
          onClick={handleGoToDetail} 
          className='text-[13px] text-gray-400 hover:text-black transition-all underline underline-offset-8 decoration-gray-200 hover:decoration-black uppercase tracking-wider'
        >
          Xem chi tiết sản phẩm
        </button>
      </div>
    </div>
  );
}