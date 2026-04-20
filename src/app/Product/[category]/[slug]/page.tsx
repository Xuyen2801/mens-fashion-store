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
  const [productFaqBundles, setProductFaqBundles] = useState<Array<{ products: any[]; faqs: FAQItem[] }>>([]);

  console.log("🔍 [DEBUG] URL Slug hiện tại:", slug);

  // 🔤 normalizeText: Convert Vietnamese text với dấu -> URL-friendly slug
  // VD: "Áo Thun Nam" -> "ao-thun-nam" (dùng để match với URL slug parameter)
  // 
  // Kỳ thuựt Unicode NFD (Normalization Form Decomposed):
  // 1. .normalize("NFD"): Phá dấu ra riêng
  //    - "á" (single char) -> "a" + combining acute accent (mark)
  // 2. .replace(/[\u0300-\u036f]/g, ""): Xóa combining marks
  //    - Unicode range \u0300-\u036f là khoảng "Combining Diacritical Marks"
  //    - Xóa hết: "a" + mark -> "a"
  // 3. .replace(/[^a-z0-9\s-]/g, " "): Xóa special characters
  // 4. .replace(/\s+/g, "-"): Thế space = dash
  // 5. .replace(/-+/g, "-"): Multiple dash -> single dash
  // 6. .replace(/^-|-$/g, ""): Xóa leading/trailing dash
  const normalizeText = (value: string) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD") // Decompose dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa combining marks
      .replace(/[^a-z0-9\s-]/g, " ") // Xóa special chars
      .replace(/\s+/g, "-") // Space -> dash
      .replace(/-+/g, "-") // Multiple dash -> single
      .replace(/^-|-$/g, ""); // Remove leading/trailing dash

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
    ];

    const loadProducts = async () => {
      try {
        const results = await Promise.all(
          collections.map((name) => fetchCollection<any[]>(name))
        );

        const bundles = results.map((items) => {
          const first = Array.isArray(items) ? items[0] : null;

          const products = first && Array.isArray(first.products)
            ? first.products
            : Array.isArray(items)
              ? items
              : [];

          const faqs = first && Array.isArray(first.faqs) ? first.faqs : [];

          return { products, faqs };
        });

        const merged = results.flatMap((items) => {
          const first = Array.isArray(items) ? items[0] : null;
          if (first && Array.isArray(first.products)) {
            return first.products;
          }
          return Array.isArray(items) ? items : [];
        });

        setAllProducts(merged);
        setProductFaqBundles(bundles);
      } catch (error) {
        console.error("Failed to load product collections:", error);
        setAllProducts([]);
        setProductFaqBundles([]);
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

    const normalizedDisplaySlug = normalizeText(displayProduct.slug || displayProduct.id || "");

    const matchedBundle = productFaqBundles.find((bundle) =>
      bundle.products?.some((item) => {
        const itemSlug = normalizeText(item?.slug || item?.id || "");
        return itemSlug === normalizedDisplaySlug;
      })
    );

    if (matchedBundle && Array.isArray(matchedBundle.faqs)) {
      return matchedBundle.faqs;
    }

    return [];
  }, [displayProduct, productFaqBundles]);

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