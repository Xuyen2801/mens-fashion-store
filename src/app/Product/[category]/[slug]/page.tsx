"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Import dữ liệu
import poloData from "@/data/Product/product-ao/ao-polo"; 
import somiData from "@/data/Product/product-ao/so-mi";
import setdoData from "@/data/Product/product-ao/set-do";
import tanktopData from "@/data/Product/product-ao/tank-top";
import hoodieData from "@/data/Product/product-ao/hoodie";
import aoKhoacData from "@/data/Product/product-ao/ao-khoac";
import aoThunData from "@/data/Product/product-ao/ao-thun";
import { productsJeans } from "@/data/product-quan/filter_quan";
import ProductDetail from "@/components/Product/ProductDetail";

// 1. Định nghĩa Interface để TypeScript không báo lỗi gạch đỏ
interface ProductItem {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  images: string[];
  variants?: any[];
  [key: string]: any; 
}

interface FAQItem {
  title: string;
  content: string;
}

export default function Page() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = useMemo(() => {
    const allProducts: any[] = [
      ...(poloData?.products || []),
      ...(somiData?.products || []),
      ...(setdoData?.products || []),
      ...(tanktopData?.products || []),
      ...(hoodieData?.products || []),
      ...(aoKhoacData?.products || []),
      ...(aoThunData?.products || []),
      ...(Array.isArray(productsJeans) ? productsJeans : []) 
    ];

    return allProducts.find((p) => p.slug === slug);
  }, [slug]);

  const currentFaq = useMemo((): FAQItem[] => {
    if (!product) return [];
    const cat = product.category;
   
    if (cat === "Áo Polo") return poloData.faqs || [];
    if (cat === "Áo Sơ Mi") return somiData.faqs || [];
    if (cat === "Set-do") return setdoData.faqs || [];
    if (cat === "Tanktop") return tanktopData.faqs || [];
    if (cat === "Áo Hoodie") return hoodieData.faqs || [];
    if (cat === "Áo Khoác") return aoKhoacData.faqs || [];
    if (cat === "Áo Thun") return aoThunData.faqs || [];
    if (cat === "Quần Jeans") return []; 

    return [];
  }, [product]);

  if (!product) return <div className="p-20 text-center">Sản phẩm không tồn tại!</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/">Trang chủ</Link> / <span>{product.category}</span> / <span className="text-black">{product.name}</span>
      </nav>
      <ProductDetail product={product as any} faqData={currentFaq as any} />
    </div>
  );
}