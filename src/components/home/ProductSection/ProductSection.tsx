"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../Product/ProductCard"
import { fetchCollection } from "../../../lib/api"
import styles from "./ProductSection.module.css"

interface Props {
  filter: string;
  tag: string;
}

type Product = {
  id: string;
  sku?: string;
  slug: string;
  type: string;
  image: string;
  name: string;
  price: number;
  salePrice: number;
  status?: string;
  colors?: any[]; 
  category?: string;
};

function ProductSection({ filter, tag }: Props) {
  const [productsJeans, setProductsJeans] = useState<Product[]>([]);
useEffect(() => {
  // Đảm bảo fetch đúng tên collection trên MongoDB (ví dụ: filter_quan)
  fetchCollection("jean") 
    .then((data: any) => {
      let list = [];
      
      // Kiểm tra dữ liệu từ MongoDB Atlas
      if (Array.isArray(data) && data.length > 0) {
        // Nếu Mongo trả về mảng chứa Document to, ta lấy trường 'products'
        list = data[0]?.products || (Array.isArray(data) ? data : []);
      }

      if (Array.isArray(list) && list.length > 0) {
        // Lọc những sản phẩm thực sự tồn tại
        const validProducts = list.filter(p => p && p.name);
        // Lấy ngẫu nhiên
        const shuffled = [...validProducts].sort(() => 0.5 - Math.random());
        setProductsJeans(shuffled);
        console.log("✅ Đã tải thành công sản phẩm từ MongoDB");
      }
    })
    .catch((error) => console.error("Lỗi tải dữ liệu:", error));
}, []);

  const filtered = useMemo(() => {
  const result = productsJeans.filter((p) => {
    if (filter === "all") return true;
    return p.type?.toLowerCase() === filter.toLowerCase();
  });
  
  console.log("📦 Số lượng sau khi lọc (filtered):", result.length);
  return result;
}, [filter, productsJeans]);

// 2. Sau đó mới lấy 5 cái đầu tiên từ danh sách ĐÃ LỌC
const displayProducts = useMemo(() => {
  const result = filtered.slice(0, 5);
  console.log("🚀 Số lượng hiển thị thực tế (display):", result.length);
  return result;
}, [filtered]);

return (
  <section className={styles.section}>
    {/* Kiểm tra nếu không có sản phẩm nào sau khi lọc */}
    {displayProducts.length === 0 && (
      <p className="text-center py-10">Không tìm thấy sản phẩm phù hợp.</p>
    )}
    
    <div className={styles.grid}>
      {displayProducts.map((p, index) => (
        <ProductCard
          key={p.id || `home-jean-${index}`}
          product={{
            ...p,
            category: "jean", 
            id: p.id, 
          }}
        />
      ))}
    </div>
  </section>
);
}
export default ProductSection;