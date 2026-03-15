// src/components/cart/CartDrawer.jsx
"use client";
import { useEffect, useRef } from "react";
import { useCart } from "../../components/Cart/CartContext";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

function DrawerItem({ item }) {
  const { dispatch } = useCart();
  const { product, selectedSize, selectedColor, quantity, key } = item;
  const price = product.salePrice ?? product.price;

  return (
    <div className="di-row">
      {/* thumbnail */}
      <div className="di-thumb-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="di-thumb"
        />
        {/* quantity bubble */}
        <span className="di-qty-bubble">{quantity}</span>
      </div>

      {/* info */}
      <div className="di-info">
        <p className="di-name">{product.name}</p>
        <p className="di-meta">
          {selectedSize} · {selectedColor}
        </p>
        <div className="di-price-row">
          <span className="di-price">{fmt(price)}</span>
          {product.discount > 0 && (
            <span className="di-disc">-{product.discount}%</span>
          )}
        </div>
      </div>

      {/* qty controls */}
      <div className="di-controls">
        <div className="di-qty">
          <button
            className="dq-btn"
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { key, quantity: quantity - 1 },
              })
            }
          >
            −
          </button>
          <span className="dq-val">{quantity}</span>
          <button
            className="dq-btn"
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { key, quantity: quantity + 1 },
              })
            }
          >
            +
          </button>
        </div>
        <button
          className="di-remove"
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: key })}
          aria-label="Xóa"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { state, totalItems, subtotal, isCartOpen, setIsCartOpen } = useCart();
  const overlayRef = useRef(null);

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  // close on ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setIsCartOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setIsCartOpen]);

  return (
    <>
      <style>{drawerStyles}</style>

      {/* overlay */}
      <div
        ref={overlayRef}
        className={`cd-overlay ${isCartOpen ? "cd-overlay--open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* drawer panel */}
      <div className={`cd-panel ${isCartOpen ? "cd-panel--open" : ""}`} role="dialog" aria-modal="true">
        {/* header */}
        <div className="cd-header">
          <div className="cd-header-left">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cd-title">Giỏ hàng</span>
            {totalItems > 0 && <span className="cd-count">{totalItems}</span>}
          </div>
          <button className="cd-close" onClick={() => setIsCartOpen(false)} aria-label="Đóng">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="cd-body">
          {state.items.length === 0 ? (
            <div className="cd-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="cd-empty-text">Giỏ hàng đang trống</p>
              <button className="cd-shop-btn" onClick={() => setIsCartOpen(false)}>
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="cd-items">
              {state.items.map((item) => (
                <DrawerItem key={item.key} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* footer — only show when there are items */}
        {state.items.length > 0 && (
          <div className="cd-footer">
            <div className="cd-subtotal-row">
              <span className="cd-subtotal-label">Tạm tính ({totalItems} sản phẩm)</span>
              <span className="cd-subtotal-val">{fmt(subtotal)}</span>
            </div>
            <p className="cd-shipping-note">Phí vận chuyển tính khi thanh toán</p>
            <a href="/cart" className="cd-checkout-btn" onClick={() => setIsCartOpen(false)}>
              Xem giỏ hàng &amp; thanh toán
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <button
              className="cd-continue-btn"
              onClick={() => setIsCartOpen(false)}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const drawerStyles = `
  /* ── Overlay ── */
  .cd-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0);
    pointer-events: none;
    transition: background 0.3s ease;
  }
  .cd-overlay--open {
    background: rgba(0,0,0,0.35);
    pointer-events: auto;
  }

  /* ── Panel ── */
  .cd-panel {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 420px; max-width: 100vw;
    background: #fff;
    box-shadow: -4px 0 40px rgba(0,0,0,0.12);
    z-index: 201;
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    font-family: 'DM Sans', -apple-system, sans-serif;
  }
  .cd-panel--open { transform: translateX(0); }

  /* ── Header ── */
  .cd-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid #F3F4F6;
  }
  .cd-header-left {
    display: flex; align-items: center; gap: 0.6rem;
    color: #111;
  }
  .cd-title { font-size: 1rem; font-weight: 700; letter-spacing: 0.02em; }
  .cd-count {
    background: #111; color: #fff;
    font-size: 0.68rem; font-weight: 700;
    min-width: 20px; height: 20px; border-radius: 100px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 5px;
  }
  .cd-close {
    background: none; border: none; cursor: pointer;
    color: #6B7280; padding: 4px;
    border-radius: 6px; transition: background 0.15s;
  }
  .cd-close:hover { background: #F9FAFB; color: #111; }

  /* ── Body ── */
  .cd-body { flex: 1; overflow-y: auto; }

  /* empty */
  .cd-empty {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 100%; gap: 1rem; padding: 3rem;
    text-align: center;
  }
  .cd-empty-text { font-size: 0.9rem; color: #9CA3AF; }
  .cd-shop-btn {
    margin-top: 0.5rem;
    padding: 0.65rem 1.5rem;
    border: 1.5px solid #111; background: none; color: #111;
    font-family: inherit; font-size: 0.85rem; font-weight: 600;
    border-radius: 100px; cursor: pointer; transition: all 0.2s;
  }
  .cd-shop-btn:hover { background: #111; color: #fff; }

  /* items list */
  .cd-items {
    display: flex; flex-direction: column;
    padding: 0.5rem 0;
  }

  /* ── DrawerItem ── */
  .di-row {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #F9FAFB;
    transition: background 0.15s;
  }
  .di-row:hover { background: #FAFAFA; }

  .di-thumb-wrap { position: relative; flex-shrink: 0; }
  .di-thumb {
    width: 76px; height: 96px; object-fit: cover;
    border-radius: 8px; background: #F3F4F6;
    display: block;
  }
  .di-qty-bubble {
    position: absolute; top: -6px; right: -6px;
    background: #111; color: #fff;
    font-size: 0.62rem; font-weight: 700;
    min-width: 18px; height: 18px; border-radius: 100px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 4px;
  }

  .di-info { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .di-name { font-size: 0.85rem; font-weight: 500; color: #111; line-height: 1.35; }
  .di-meta { font-size: 0.75rem; color: #9CA3AF; }
  .di-price-row { display: flex; align-items: center; gap: 0.4rem; margin-top: 2px; }
  .di-price { font-size: 0.88rem; font-weight: 700; color: #111; }
  .di-disc {
    font-size: 0.68rem; font-weight: 700; color: #EF4444;
    background: #FEF2F2; padding: 1px 5px; border-radius: 4px;
  }

  .di-controls { display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; flex-shrink: 0; }
  .di-qty {
    display: flex; align-items: center;
    border: 1.5px solid #E5E7EB; border-radius: 8px; overflow: hidden;
  }
  .dq-btn {
    width: 28px; height: 28px; background: none; border: none;
    font-size: 1rem; color: #374151; cursor: pointer; transition: background 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .dq-btn:hover { background: #F3F4F6; }
  .dq-val { width: 28px; text-align: center; font-size: 0.82rem; font-weight: 600; color: #111; }
  .di-remove {
    background: none; border: none; color: #D1D5DB; cursor: pointer;
    padding: 4px; border-radius: 4px; transition: color 0.15s;
  }
  .di-remove:hover { color: #EF4444; }

  /* ── Footer ── */
  .cd-footer {
    padding: 1.25rem 1.5rem 1.5rem;
    border-top: 1px solid #F3F4F6;
    display: flex; flex-direction: column; gap: 0.75rem;
    background: #fff;
  }
  .cd-subtotal-row {
    display: flex; justify-content: space-between; align-items: center;
  }
  .cd-subtotal-label { font-size: 0.85rem; color: #6B7280; }
  .cd-subtotal-val { font-size: 1.05rem; font-weight: 800; color: #111; }
  .cd-shipping-note { font-size: 0.75rem; color: #9CA3AF; margin-top: -0.25rem; }
  .cd-checkout-btn {
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    width: 100%; padding: 0.875rem;
    background: #111; color: #fff;
    border: none; border-radius: 10px;
    font-family: inherit; font-size: 0.9rem; font-weight: 700;
    cursor: pointer; text-decoration: none;
    transition: background 0.2s, transform 0.15s;
  }
  .cd-checkout-btn:hover { background: #222; transform: translateY(-1px); }
  .cd-continue-btn {
    background: none; border: 1.5px solid #E5E7EB; color: #374151;
    width: 100%; padding: 0.75rem;
    font-family: inherit; font-size: 0.85rem; font-weight: 500;
    border-radius: 10px; cursor: pointer; transition: all 0.2s;
  }
  .cd-continue-btn:hover { border-color: #111; color: #111; }

  @media (max-width: 480px) {
    .cd-panel { width: 100vw; }
  }
`;