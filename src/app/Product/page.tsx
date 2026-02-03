"use client";
import React, { useState } from "react";
import ProductCard from "../../components/product/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Áo Polo Đen",
    price: 299000,
    image: "/images/products/polo1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Áo Polo Trắng",
    price: 279000,
    image: "/images/products/polo1.jpg",
    quantity: 1,
  },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Tăng số lượng
  const handleIncrease = (id: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng
  const handleDecrease = (id: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="product-list-container">
      <h1>Danh Sách Sản Phẩm</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ))}
      </div>
    </div>
  );
}