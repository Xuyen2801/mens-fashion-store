import React from "react";
// Lưu ý: Ở trang chủ thì chỉ cần lùi 1 cấp thư mục (../) là tới components
// File: src/app/page.jsx
import CollectionBanner from "../components/Collection/CollectionBanner";
import ProductFilter from "../components/Collection/ProductFilter";

// Data giả lập
const mockProducts = [
  {
    id: 1,
    name: "Áo Thun Nam Cotton L",
    price: "329,000đ",
    image: "https://placehold.co/400x500",
    status: "HÀNG MỚI",
  },
  {
    id: 2,
    name: "Áo Thun Nam In Find New",
    price: "350,000đ",
    salePrice: "299,000đ",
    image: "https://placehold.co/400x500",
    status: "GIẢM GIÁ",
  },
  {
    id: 3,
    name: "Áo Thun Nam Cotton Prime",
    price: "299,000đ",
    image: "https://placehold.co/400x500",
  },
  {
    id: 4,
    name: "Áo Thun Nam Iconic Form",
    price: "329,000đ",
    image: "https://placehold.co/400x500",
    status: "HÀNG MỚI",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* 1. Banner */}
      <CollectionBanner backgroundImage="/images/banner-trang-chu.jpg" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Filter */}
        <ProductFilter
          conditions={["Giá thấp đến cao", "Giá cao đến thấp", "Mới nhất"]}
        />

        {/* 3. Grid Sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              status={product.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
