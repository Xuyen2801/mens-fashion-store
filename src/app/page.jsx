"use client";
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CollectionBanner from "../components/Collection/CollectionBanner";
import ProductFilter from "../components/Collection/ProductFilter";
import ProductCard from "../components/product/ProductCard";
import { products } from "../data/products";

// Giữ nguyên hàm tạo data
const generateProducts = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: index % 2 === 0 ? "Áo Thun Nam Cotton L" : "Áo Thun Nam In Find New",
    price: "329,000đ",
    salePrice: index % 3 === 0 ? "299,000đ" : null,
    image: "https://placehold.co/334x425",
    status: index < 5 ? "HÀNG MỚI" : null,
  }));
};

const mockProducts = generateProducts(30);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-grow bg-gray-50 pb-10">
        {/* QUAN TRỌNG: Container chính điều khiển độ rộng của TOÀN BỘ nội dung */}
        <div className=" mx-auto px-4 ">
          {/* 1. Banner nằm TRONG container để thẳng hàng với sản phẩm */}
          <div className="mt-6 mb-8 rounded-lg overflow-hidden">
            {/* Bạn có thể thay height bên dưới nếu muốn banner cao hơn/thấp hơn */}
            <CollectionBanner backgroundImage="/1.jpg" />
          </div>

          {/* 2. Bộ lọc */}
          <ProductFilter
            conditions={["Giá thấp đến cao", "Giá cao đến thấp", "Mới nhất"]}
          />

          {/* 3. Lưới sản phẩm 5 cột */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                // Truyền dữ liệu vào (Props)
                image={product.image}
                name={product.name}
                price={product.price}
                salePrice={product.salePrice}
                status={product.status}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
