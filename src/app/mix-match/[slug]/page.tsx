"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { useCart } from "../../../components/Cart/CartContext";
import MixMatchSection from "../../../components/home/MixMatchSection/MixMatchSection";

export default function MixMatchDetail() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(""); 
  const [otherMixes, setOtherMixes] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
  try {
    const [detailRes, listRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/mixmatch/${slug}`), 
      fetch(`${API_BASE_URL}/api/mixmatch`)          
    ]);

    const detailResult = await detailRes.json();
    const allMixes = await listRes.json();

    if (detailResult) {
      setData(detailResult);
      setActiveImg(detailResult.mainImage || "");
    }

    const filtered = allMixes
      .filter((m: any) => m.slug !== slug)
      .slice(0, 4);
    setOtherMixes(filtered);

    setLoading(false);
  } catch (err) {
    console.error("Lỗi fetch dữ liệu:", err);
    setLoading(false);
  }
};
    loadData();
  }, [slug]);

  if (loading) return <div className="p-20 text-center font-bold">ĐANG TẢI SET ĐỒ...</div>;
  if (!data) return <div className="p-20 text-center uppercase">Không tìm thấy phối đồ.</div>;

  const { fullProducts } = data;

  return (
    <div className="max-w-[1440px] mx-auto bg-white min-h-screen">
      {/* 1. Breadcrumb */}
      <nav className="px-6 py-4 text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-50">
        <Link href="/">Trang chủ</Link> <span>/</span>
        <Link href="/mix-match">Danh mục</Link> <span>/</span>
        <span className="text-black font-semibold">{data.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row">
        {/* 2. CỘT TRÁI: THUMBNAILS & ẢNH CHÍNH */}
        <div className="w-full lg:w-[60%] flex border-r border-gray-100">
          <div className="hidden md:flex flex-col w-[90px] border-r border-gray-100 p-2 gap-2 bg-white">
            {/* Thumb ảnh chính */}
            <div 
              className={`border p-0.5 cursor-pointer ${activeImg === data.mainImage ? 'border-black' : 'border-transparent'}`}
              onClick={() => setActiveImg(data.mainImage)}
            >
              <img src={data.mainImage} className="w-full aspect-[3/4] object-cover " />
            </div>
            {/* Thumbs ảnh các sản phẩm lẻ */}
            {fullProducts.map((p: any, i: number) => (
              <div 
                key={i} 
                className={`opacity-60 hover:opacity-100 cursor-pointer transition-all border ${activeImg === p.image ? 'border-black opacity-100' : 'border-gray-100'}`}
                onClick={() => setActiveImg(p.image)}
              >
                <img src={p.image} className="w-full aspect-[3/4] object-cover" />
              </div>
            ))}
          </div>
          
          <div className="flex-1 relative bg-[#f9f9f9]">
            {/* Ảnh lớn hiển thị theo State activeImg */}
            <img src={activeImg} alt={data.title} className="w-full h-auto object-contain sticky top-0 transition-all duration-300 h-[600px] lg:h-[800px]" />
          </div>
        </div>

        {/* 3. CỘT PHẢI: HIỂN THỊ SẢN PHẨM LẺ DÙNG COMPONENT RIÊNG */}
        <div className="w-full lg:w-[40%] px-10 py-10 overflow-y-auto max-h-screen">
          <h2 className="text-[13px] font-bold uppercase mb-10 tracking-[0.1em] border-b border-black pb-4">CÁC SẢN PHẨM TRONG SET ĐỒ</h2>
          <div className="space-y-16">
            {fullProducts.map((product: any, index: number) => (
              <ProductItem key={index} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <MixMatchSection 
          title="Các cách phối đồ khác"
          items={otherMixes.map(mix => ({
            slug: mix.slug,
            mainImage: mix.mainImage,
            title: mix.title,
            link: `/mix-match/${mix.slug}`
          }))} 
        />
      </div>
    </div>
  );
}

function ProductItem({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart() as any;

  const isReady = selectedColor && selectedSize;

  const handleButtonClick = () => {
    if (!isReady) {
      alert("Vui lòng chọn màu sắc và kích thước!");
      return;
    }

    if (isAdded) return;
    addToCart(product, selectedSize, selectedColor, 1);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 border-b border-gray-50 pb-12 last:border-0">
      <div className="flex gap-6">
        {/* Ảnh sản phẩm */}
        <div className="w-[150px] h-[200px] bg-gray-50 flex-shrink-0">
          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="text-[14px] font-bold uppercase mb-2 leading-tight">{product.name}</h3>
          <div className="mb-4 text-[#002b5c] font-black text-lg">{product.salePrice?.toLocaleString()}đ</div>
          
          {/* Chọn Màu sắc */}
          <div className="flex gap-2 mb-4">
            {product.colors?.map((v: any, i: number) => (
              <button 
                key={i} 
                onClick={() => setSelectedColor(v.name)}
                className={`w-8 h-8 rounded-full border p-0.5 transition-all ${selectedColor === v.name ? 'ring-2 ring-black' : 'border-gray-200'}`}
              >
                <div className="w-full h-full rounded-full" style={{ background: v.hex }} />
              </button>
            ))}
          </div>

          {/* Chọn Size */}
          <div className="flex gap-2 mb-6">
            {product.sizes?.map((s: string) => (
              <button 
                key={s} 
                onClick={() => setSelectedSize(s)}
                className={`w-10 h-10 border flex items-center justify-center text-[11px] font-bold transition-all ${selectedSize === s ? 'bg-black text-white' : 'border-gray-200 hover:border-black'}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ✨ NÚT BẤM THÔNG MINH GIỐNG HÌNH 1 */}
          <button 
            onClick={handleButtonClick}
            disabled={isAdded}
            className={`w-full py-4 text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300
              ${isReady 
                ? isAdded 
                  ? "bg-green-600 text-white cursor-default" 
                  : "bg-[#002b5c] text-white hover:bg-black" 
                : "bg-gray-100 text-gray-400 cursor-pointer"
              }`}
          >
            {isAdded 
              ? "ĐÃ THÊM VÀO GIỎ" 
              : isReady 
                ? "THÊM VÀO GIỎ HÀNG" 
                : "CHỌN MÀU VÀ CHỌN SIZE"
            }
          </button>

          {/* Icon Xem chi tiết (Nằm riêng bên dưới nút nếu Vy vẫn muốn giữ tính năng xem sản phẩm) */}
          <button 
            onClick={() => window.location.href = `/Product/${product.category}/${product.id}`}
            className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 hover:text-black transition-all uppercase tracking-widest self-start"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Xem chi tiết sản phẩm
          </button>

        </div>
      </div>
    </div>
  );
}