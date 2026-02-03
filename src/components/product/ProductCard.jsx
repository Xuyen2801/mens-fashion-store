import React from "react";
import "../../styles/Product/productCard.css";

export default function ProductCard({ product, onIncrease, onDecrease }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="sale-badge">SALE</span>
      </div>

      <h3 className="product-name">{product.name}</h3>

      <p className="product-price">{product.price.toLocaleString()}đ</p>

      <div className="quantity-control">
        <button
          onClick={() => onDecrease(product.id)}
          disabled={product.quantity <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity-value">{product.quantity}</span>
        <button
          onClick={() => onIncrease(product.id)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
    </div>
  );
}