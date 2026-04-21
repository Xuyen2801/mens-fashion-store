import { useEffect, useMemo, useState } from "react";
import { fetchCollection } from "@/lib/api";
import ProductDetail from "@/components/Product/ProductDetail"; 
import Link from "next/link";

export default function Page({ params }) {
  const { slug } = params; 
  const [allProducts, setAllProducts] = useState([]);
  const [cachedProduct, setCachedProduct] = useState(null);
  const [productFaqBundles, setProductFaqBundles] = useState([]);

  const normalizeText = (value) =>
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

    const collections = ["ao-khoac",
  "ao-thun",
  "ao-polo",
  "so-mi",
  "hoodie",
  "tank-top",
  "jean",
  "short",
  "kaki",
  "boxer",
  "jogger",
  "tay",
  "set-do",
  "productsNew",
  "productsOutLet",
  "productsAll"];

    const loadProducts = async () => {
      try {
        const results = await Promise.all(
          collections.map((name) => fetchCollection(name))
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
        console.error("Failed to load product detail data:", error);
        setAllProducts([]);
        setProductFaqBundles([]);
      }
    };

    loadProducts();
  }, []);

const product = useMemo(() => {
  if (!slug || allProducts.length === 0) return null;

  const target = normalizeText(slug); 

  return allProducts.find((p) => {
    const productId = normalizeText(String(p.id || ""));
    const productSlug = normalizeText(p.slug || "");
    const productSku = normalizeText(p.sku || "");

    return productId === target || productSlug === target || productSku === target;
  });
}, [allProducts, slug]);

  const displayProduct = product || cachedProduct;

  const currentFaq = useMemo(() => {
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

    return Array.isArray(matchedBundle?.faqs) ? matchedBundle.faqs : [];
  }, [displayProduct, productFaqBundles]);

  
  if (!displayProduct) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">Sản phẩm không tồn tại!</h2>
        <p className="text-gray-500">Có vẻ như liên kết đã hỏng hoặc sản phẩm đã ngừng kinh doanh.</p>
        <Link href="/" className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }


  return (
    <main className="max-w-7xl mx-auto p-4 min-h-screen">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{displayProduct.category?.replace('-', ' ')}</span>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{displayProduct.name}</span>
      </nav>

      <ProductDetail product={displayProduct} faqData={currentFaq} />
    </main>
  );
}