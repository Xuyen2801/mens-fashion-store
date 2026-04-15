// src/components/cart/CartItem.jsx
import { useCart } from "../../components/Cart/CartContext";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function CartItem({ item, isSelected = true, onToggleSelect }) {
  const { dispatch } = useCart();
  const { product, selectedSize, selectedColor, quantity, key } = item;
  const price = product.salePrice ?? product.price;
  const maxQty = product.stock?.[selectedSize] ?? 99;

  const handleQty = (delta) => {
    const next = quantity + delta;
    if (next < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: key });
    } else if (next <= maxQty) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { key, quantity: next } });
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item__select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect?.(item.key)}
          aria-label={`Chọn sản phẩm ${product.name}`}
        />
      </div>

      <div className="cart-item__img-wrap">
        <img src={product.image} alt={product.name} className="cart-item__img" />
        {product.status && (
          <span className="cart-item__badge">{product.status}</span>
        )}
      </div>

      <div className="cart-item__info">
        <p className="cart-item__name">{product.name}</p>
        <p className="cart-item__meta">
          <span className="tag">Size: {selectedSize}</span>
          <span className="tag">{selectedColor}</span>
          <span className="tag sku">SKU: {product.sku}</span>
        </p>

        <div className="cart-item__price-row">
          <span className="price-sale">{fmt(price)}</span>
          {product.salePrice && product.price !== product.salePrice && (
            <span className="price-original">{fmt(product.price)}</span>
          )}
          {product.discount > 0 && (
            <span className="badge-discount">-{product.discount}%</span>
          )}
        </div>

        <div className="cart-item__actions">
          <div className="qty-control">
            <button className="qty-btn" onClick={() => handleQty(-1)} aria-label="Giảm">
              −
            </button>
            <span className="qty-val">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => handleQty(1)}
              disabled={quantity >= maxQty}
              aria-label="Tăng"
            >
              +
            </button>
          </div>
          <span className="cart-item__subtotal">{fmt(price * quantity)}</span>
          <button
            className="remove-btn"
            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: key })}
            aria-label="Xóa sản phẩm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}