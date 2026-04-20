"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "../../lib/api"; // Đảm bảo đúng đường dẫn tới file api của bạn

interface MixMatch {
  slug: string;
  mainImage: string;
  title: string;
}

export default function MixMatchPage() {
  const [list, setList] = useState<MixMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/mixmatch`)
      .then((res) => res.json())
      .then((data) => {
        // Nếu data trả về là mảng trực tiếp
        setList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải dữ liệu MixMatch:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 uppercase tracking-widest">Đang tải phong cách...</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Breadcrumb & Title */}
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <nav className="text-[12px] uppercase text-gray-400 mb-10 tracking-wider">
          <Link href="/" className="hover:text-black">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/pages" className="hover:text-black">Danh mục</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Combo Mix & Match</span>
        </nav>

        <h1 className="text-center text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-16">
          Mix & Match
        </h1>

        {/* 2. Grid hiển thị danh sách */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {list.map((item) => (
            <Link 
              href={`/mix-match/${item.slug}`} 
              key={item.slug} 
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={item.mainImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                
                {/* Icon giỏ hàng nhỏ ở góc dưới (giống mẫu) */}
                <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                   </svg>
                </div>
              </div>
              
              {/* Nếu bạn muốn hiện tên bộ phối bên dưới (tùy chọn) */}
              <h3 className="mt-4 text-[13px] font-bold uppercase tracking-widest text-center group-hover:text-gray-600 transition-colors">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}