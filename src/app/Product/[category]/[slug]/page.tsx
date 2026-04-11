"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchCollection } from "@/lib/api";

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
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [cachedProduct, setCachedProduct] = useState<any | null>(null);

  const normalizeText = (value: string) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(`product-detail:${slug}`);
      if (cached) {
        setCachedProduct(JSON.parse(cached));
      }
    } catch {
      setCachedProduct(null);
    }

    const collections = [
      "ao-khoac",
      "ao-thun",
      "ao-polo",
      "so-mi",
      "set-do",
      "tank-top",
      "hoodie",
      "jean",
      "short",
      "kaki",
      "boxer",
      "jogger",
      "tay",
      "productsNew",
      "productsOutLet",
      "productsAll",
      "ao-khoac",
      "ao-thun",
      "jean",
      "short",
      "kaki",
      "boxer",
      "jogger",
      "tay",
      "productsNew",
      "productsOutLet",
    ];

    const loadProducts = async () => {
      try {
        const results = await Promise.all(
          collections.map((name) => fetchCollection<any[]>(name))
        );

        const merged = results.flatMap((items) => {
          const first = Array.isArray(items) ? items[0] : null;
          if (first && Array.isArray(first.products)) {
            return first.products;
          }
          return Array.isArray(items) ? items : [];
        });

        setAllProducts(merged);
      } catch (error) {
        console.error("Failed to load product collections:", error);
        setAllProducts([]);
      }
    };

    loadProducts();
  }, []);

  const product = useMemo(() => {
    const normalizedSlug = normalizeText(slug);

    return allProducts.find((p) => {
      const productSlug = normalizeText(p.slug || "");
      const productId = normalizeText(p.id?.toString?.() || p.id || "");
      return productSlug === normalizedSlug || productId === normalizedSlug;
    });
  }, [allProducts, slug]);

  const displayProduct = product || cachedProduct;

  const currentFaq = useMemo((): FAQItem[] => {
    if (!displayProduct) return [];
    if (Array.isArray(displayProduct.faqs)) {
      return displayProduct.faqs;
    }
    return [];
  }, [displayProduct]);

  if (!displayProduct) return <div className="p-20 text-center">Sản phẩm không tồn tại!</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/">Trang chủ</Link> / <span>{displayProduct.category}</span> / <span className="text-black">{displayProduct.name}</span>
      </nav>
      <ProductDetail product={displayProduct as any} faqData={currentFaq as any} />
    </div>
  );
}