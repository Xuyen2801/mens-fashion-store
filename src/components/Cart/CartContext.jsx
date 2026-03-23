"use client";
import { createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext(null);

const DEFAULT_STATE = {
  items: [],
  orders: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, selectedSize, selectedColor, quantity = 1 } = action.payload;

      const key = `${product.id || product.sku || product.name}_${selectedSize}_${selectedColor}`;
      const existing = state.items.find((i) => i.key === key);

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            key,
            product,
            selectedSize,
            selectedColor,
            quantity,
            selected: true, // 🔥 mặc định chọn
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.key !== action.payload),
      };

    case "UPDATE_QUANTITY": {
      const { key, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.key !== key),
        };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.key === key ? { ...i, quantity } : i
        ),
      };
    }

    // ✅ toggle từng item
    case "TOGGLE_SELECT_ITEM":
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.payload
            ? { ...i, selected: !i.selected }
            : i
        ),
      };

    // ✅ chọn tất cả
    case "TOGGLE_SELECT_ALL":
      return {
        ...state,
        items: state.items.map((i) => ({
          ...i,
          selected: action.payload,
        })),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "PLACE_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        items: [],
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.orderId
            ? {
                ...o,
                status: action.payload.status,
                updatedAt: new Date().toISOString(),
              }
            : o
        ),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, DEFAULT_STATE, (init) => {
    if (typeof window === "undefined") return init;

    try {
      const saved = localStorage.getItem("dusk_cart_v2");
      if (!saved) return init;

      const parsed = JSON.parse(saved);

      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      };
    } catch {
      return init;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("dusk_cart_v2", JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  // 🔥 CHỈ tính item được chọn
  const subtotal = state.items
    .filter((i) => i.selected)
    .reduce(
      (s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity,
      0
    );

  const addToCart = (product, size, color, quantity = 1) => {
    if (typeof window !== 'undefined' && !localStorage.getItem("user")) {
    return; 
    }
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        selectedSize: size,
        selectedColor: color,
        quantity,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}