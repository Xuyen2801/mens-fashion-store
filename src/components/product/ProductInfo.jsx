'use client';
import { useState, useEffect } from 'react';
import { SEASONAL_PROMOTIONS } from '../../data/configs';
import { useCart } from '../Cart/CartContext';

export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  useEffect(() => {
    if (!selectedColor) return;
    console.log("Click chọn màu mới:", selectedColor);
    setQuantity(1);

  }, [selectedColor]);
  
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
      alert("Hãy đăng nhập để thêm vào giỏ hàng!");
      window.location.href = "/login"; 
      return; 
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };
  if (!product) return null;
  return (
    <div className="flex flex-col gap-5" >
      <div>
        <h2 className="text-2xl font-bold uppercase leading-tight">{product.name}</h2>
        <p className="text-[11px] text-gray-400 uppercase mt-1 tracking-widest">SKU: {product.sku}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#1e3a8a] font-bold text-3xl">{product.salePrice?.toLocaleString('vi-VN')}đ</span>
        <span className="text-gray-400 line-through text-lg">{product.price?.toLocaleString('vi-VN')}đ</span>
      </div>
      <div>
        <p className="text-sm font-bold">Màu sắc: {selectedColor}</p>
        <div className="flex gap-3 mt-3">
          {product.colors?.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(color.name)}
              className={`w-11 h-11 rounded-full border-2 p-0.5 transition-all duration-300 ${selectedColor === color.name ? 'border-black scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'
                }`}
            >
              <img src={color.thumbnail} className="w-full h-full rounded-full object-cover" alt={color.name} />
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold mb-2">Kích thước: {selectedSize}</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes?.map((size) => {
            const isOut = product.outOfStockSizes?.includes(size);
            return (
              <button
                key={size}
                disabled={isOut}
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-11 border text-sm font-bold transition-all relative 
                  ${isOut ? 'text-gray-200 cursor-not-allowed' : 'hover:border-black'} 
                  ${selectedSize === size ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'bg-white text-gray-600 border-gray-200'}`}
              >
                {size}
                {isOut && <div className="absolute inset-0 border-t border-gray-200 top-1/2"></div>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="border border-dashed border-red-300 rounded-lg p-4 bg-red-50/30">
        <div className="flex items-center gap-2 mb-3">
          <img
            src="/icon/hop_qua.png"
            alt="Gift icon"
            className="w-4 h-4 object-contain"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <p className="text-red-700 font-bold text-xs uppercase italic">Ưu đãi Online</p>
        </div>
        <ul className="space-y-3">
          {SEASONAL_PROMOTIONS.map((promo, i) => (
            <li key={i} className="text-[12px] text-gray-600 flex items-start gap-2 italic leading-tight">
              <img
                src={promo.icon}
                alt="promo-icon"
                className="w-3.5 h-3.5 object-contain mt-0.5"
                onError={(e) => (e.target.style.display = 'none')}
              />
              <span>{promo.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex border border-gray-300 rounded overflow-hidden h-12">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 hover:bg-gray-100 border-r">-</button>
          <span className="px-6 flex items-center font-bold">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="px-4 hover:bg-gray-100 border-l">+</button>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium focus:outline-none"
        >
          Thêm giỏ hàng
        </button>
      </div>
      <div className='flex justify-start'>
        <a href={`/product/${product.sku}`} className='text-[15px] text-gray-500 hover:text-black transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-black'>
          Xem chi tiết
        </a>
      </div>
    </div>
  );
}
