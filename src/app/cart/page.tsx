// src/app/Cart/page.tsx
"use client";
import { useState, useEffect } from "react";
import "../../styles/Cart.css";
import { CartProvider, useCart } from "../../components/Cart/CartContext";
import CartItem from "../../components/Cart/CartItem";
import OrderSummary from "../../components/Cart/OrderSumary";
import CheckoutForm from "../../components/Cart/CheckoutForm";
import OrderSuccess from "../../components/Cart/OrderSuccess";
import OrderTracker from "../../components/Cart/Ordertracker";

type View = "cart" | "checkout" | "success" | "orders";

function CartApp() {
  const { state, totalItems } = useCart();
  const [view, setView] = useState<View>("cart");
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");

  const ordersCount = state.orders?.length ?? 0;

  const handleOrderSuccess = (order: any) => {
    setPlacedOrder(order);
    setView("success");
  };

  const goToCart = () => {
    setActiveTab("cart");
    setView("cart");
  };

  const goToOrders = () => {
    setActiveTab("orders");
    setView("orders");
  };

  return (
    <div className="cart-app">
      {/* Header */}
      <header className="ca-header">
        <nav className="ca-nav">
          <button
            className={"nav-tab" + (activeTab === "cart" ? " active" : "")}
            onClick={goToCart}
          >
            Giỏ hàng
            {totalItems > 0 && (
              <span className="nav-badge">{totalItems}</span>
            )}
          </button>
          <button
            className={"nav-tab" + (activeTab === "orders" ? " active" : "")}
            onClick={goToOrders}
          >
            Đơn hàng
            {ordersCount > 0 && (
              <span className="nav-badge">{ordersCount}</span>
            )}
          </button>
        </nav>
      </header>

      {/* Breadcrumb */}
      {view !== "orders" && (
        <div className="breadcrumb">
          <span className={view === "cart" ? "bc-active" : "bc-done"}>
            Giỏ hàng
          </span>
          <span className="bc-sep">›</span>
          <span
            className={
              view === "checkout"
                ? "bc-active"
                : view === "success"
                ? "bc-done"
                : "bc-pending"
            }
          >
            Thanh toán
          </span>
          <span className="bc-sep">›</span>
          <span className={view === "success" ? "bc-active" : "bc-pending"}>
            Hoàn tất
          </span>
        </div>
      )}

      {/* Content */}
      <main className="ca-main">
        {/* CART */}
        {activeTab === "cart" && view === "cart" && (
          <div className="cart-layout">
            <div className="cart-left">
              <h2 className="section-heading">
                Giỏ hàng
                {totalItems > 0 && (
                  <span className="heading-count">({totalItems} sản phẩm)</span>
                )}
              </h2>

              {state.items.length === 0 ? (
                <div className="empty-cart">
                  <svg
                    width="64" height="64" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="1.2"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p>Giỏ hàng trống</p>
                  <p className="empty-sub">Hãy thêm sản phẩm vào giỏ hàng</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {state.items.map((item) => (
                    <CartItem key={item.key} item={item} />
                  ))}
                </div>
              )}
            </div>

            <div className="cart-right">
              <OrderSummary onCheckout={() => setView("checkout")} />
            </div>
          </div>
        )}

        {/* CHECKOUT */}
        {view === "checkout" && (
          <CheckoutForm
            onBack={() => setView("cart")}
            onSuccess={handleOrderSuccess}
          />
        )}

        {/* SUCCESS */}
        {view === "success" && placedOrder && (
          <OrderSuccess
            order={placedOrder}
            onGoShopping={goToCart}
            onViewOrders={goToOrders}
          />
        )}

        {/* ORDERS */}
        {activeTab === "orders" && view === "orders" && <OrderTracker />}
      </main>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartApp />
    </CartProvider>
  );
}