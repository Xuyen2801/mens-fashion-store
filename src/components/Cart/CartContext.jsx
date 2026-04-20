"use client";
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import toast from "react-hot-toast";
const CartContext = createContext(null);

const DEFAULT_STATE = {
  items: [],
  orders: [],
  selectedItemKeys: [],
  shippingMethod: "",
  paymentMethod: "cod",
  appliedShipVoucher: null,
  appliedProdVoucher: null,
  note: "",
};


const validateVoucher = (voucher, subtotal) => {
  if (!voucher) return { error: "Voucher không tồn tại" };
  if (subtotal < voucher.minSubtotal) {
    return { error: `Đơn hàng tối thiểu ${new Intl.NumberFormat("vi-VN").format(voucher.minSubtotal)}đ` };
  }
  return voucher;
};

// 🔧 cartReducer: Hàm reducer để quản lý state của giỏ hàng
// Mỗi action.type đại diện cho một thay đổi (thêm sản phẩm, xóa, apply voucher, v.v.)
// Return: state mới sau khi xử lý action
function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE_STATE":
      // ⚙️ HYDRATE_STATE: Load state đã lưu từ localStorage khi component mount
      // Thực hiện strict validation để đảm bảo dữ liệu hợp lệ:
      // - Kiểm tra items & selectedItemKeys có phải array
      // - Filter selectedItemKeys để chỉ giữ những key có trong items (prevent invalid data)
      {
        const hydratedItems = Array.isArray(action.payload?.items) ? action.payload.items : [];
        const hydratedItemKeys = hydratedItems.map((item) => item.key);
        // Chỉ giữ những selected key nếu item tương ứng vẫn tồn tại
        const hydratedSelectedKeys = Array.isArray(action.payload?.selectedItemKeys)
          ? action.payload.selectedItemKeys.filter((key) => hydratedItemKeys.includes(key))
          : hydratedItemKeys;

        return {
          ...state,
          items: hydratedItems,
          orders: Array.isArray(action.payload?.orders) ? action.payload.orders : [],
          selectedItemKeys: hydratedSelectedKeys,
          shippingMethod: action.payload?.shippingMethod || "",
          paymentMethod: action.payload?.paymentMethod || "cod",
          appliedShipVoucher: action.payload?.appliedShipVoucher || null,
          appliedProdVoucher: action.payload?.appliedProdVoucher || null,
          note: action.payload?.note || "",
        };
      }

    case "ADD_ITEM": {
      // 🛒 ADD_ITEM: Thêm sản phẩm vào giỏ hàng
      // Nếu sản phẩm cùng size/color đã có -> cộng quantity
      // Nếu chưa có -> thêm mới
      const { product, selectedSize, selectedColor, quantity = 1 } = action.payload;

      // Tạo unique key từ product ID + size + color (để phân biệt sản phẩm khác nhau)
      const key = `${product.id || product.sku || product.name}_${selectedSize}_${selectedColor}`;
      const existing = state.items.find((i) => i.key === key);

      // Nếu item này đã tồn tại, chỉ cập nhật quantity (tăng thêm)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }

      // Item chưa tồn tại -> thêm mới vào danh sách items
      return {
        ...state,
        items: [...state.items, { key, product, selectedSize, selectedColor, quantity }],
        selectedItemKeys: [...state.selectedItemKeys, key], // Mặc định check item mới thêm
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.key !== action.payload),
        selectedItemKeys: state.selectedItemKeys.filter((k) => k !== action.payload),
      };

    case "UPDATE_QUANTITY": {
      const { key, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.key !== key),
          selectedItemKeys: state.selectedItemKeys.filter((k) => k !== key),
        };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.key === key ? { ...i, quantity } : i
        ),
      };
    }

    case "SET_SHIP_VOUCHER":
      return { ...state, appliedShipVoucher: action.payload };

    case "REMOVE_SHIP_VOUCHER":
      return { ...state, appliedShipVoucher: null };

    case "SET_PROD_VOUCHER":
      return { ...state, appliedProdVoucher: action.payload };

    case "REMOVE_PROD_VOUCHER":
      return { ...state, appliedProdVoucher: null };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        selectedItemKeys: [],
        appliedShipVoucher: null,
        appliedProdVoucher: null,
        note: "",
      };

    case "TOGGLE_ITEM_SELECTION": {
      const targetKey = action.payload;
      const isSelected = state.selectedItemKeys.includes(targetKey);

      return {
        ...state,
        selectedItemKeys: isSelected
          ? state.selectedItemKeys.filter((key) => key !== targetKey)
          : [...state.selectedItemKeys, targetKey],
      };
    }

    case "TOGGLE_ALL_SELECTION": {
      const itemKeys = Array.isArray(action.payload?.itemKeys) ? action.payload.itemKeys : [];
      const shouldSelectAll = Boolean(action.payload?.checked);

      return {
        ...state,
        selectedItemKeys: shouldSelectAll ? itemKeys : [],
      };
    }

    case "SET_SHIPPING":
      return {
        ...state,
        shippingMethod: action.payload,
      };

    case "SET_PAYMENT":
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case "SET_NOTE":
      return {
        ...state,
        note: action.payload,
      };

    case "APPLY_VOUCHER": {
      const { voucher, subtotal } = action.payload;
      const result = validateVoucher(voucher, subtotal);

      if (result.error) {
        return { ...state, appliedShipVoucher: result };
      }

      return { ...state, appliedShipVoucher: result };
    }

    case "REMOVE_VOUCHER":
      return {
        ...state,
        appliedShipVoucher: null,
        appliedProdVoucher: null,
      };

    case "PLACE_ORDER":
      {
        const orderPayload = action.payload?.order ?? action.payload;
        const orderedItemKeys = Array.isArray(action.payload?.itemKeys)
          ? action.payload.itemKeys
          : state.items.map((item) => item.key);

        return {
          ...state,
          orders: [orderPayload, ...state.orders],
          items: state.items.filter((item) => !orderedItemKeys.includes(item.key)),
          selectedItemKeys: state.selectedItemKeys.filter((key) => !orderedItemKeys.includes(key)),
          appliedShipVoucher: null,
          appliedProdVoucher: null,
          note: "",
        };
      }

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
  const [state, dispatch] = useReducer(cartReducer, DEFAULT_STATE);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  const subtotal = state.items.reduce(
    (s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity,
    0
  );


  // 💾 useEffect #1: Load cart từ localStorage khi component mount
  // Cần setup "hasHydrated" flag để tránh lưu state trước khi hydrate xong
  // Try-catch để xử lý nếu localStorage bị corrupt
  useEffect(() => {
    const syncFromDB = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.id) {
        try {
          const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
          if (res.ok) {
            const dbData = await res.json();
            if (dbData.items && dbData.items.length > 0) {
              dispatch({
                type: "HYDRATE_STATE",
                payload: dbData.items ? dbData : { items: [], selectedItemKeys: [] }
              });
            }
          }
        } catch (error) {
          // Ignore invalid localStorage payload and keep default state.
          console.error("Lỗi đồng bộ giỏ hàng từ DB:", error);
        }
      } else {
        // Nếu khách chưa login, có thể dùng lại localStorage hoặc để trống
        const saved = localStorage.getItem("dusk_cart_v2");
        if (saved) dispatch({ type: "HYDRATE_STATE", payload: JSON.parse(saved) });
      }
      setHasHydrated(true);
    };

    syncFromDB();
  }, []);
  // 💾 useEffect #2: Lưu cart vào localStorage mỗi khi state thay đổi
  // Chỉ lưu sau khi hydrate xong (hasHydrated=true) để tránh overwrite data gốc
  useEffect(() => {
    if (!hasHydrated) return;

    const saveToDB = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      // Nếu có user -> Lưu vào MongoDB
      if (user && user.id) {
        try {
          await fetch("http://localhost:5000/api/cart/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              cartState: {
                items: state.items, selectedItemKeys: state.selectedItemKeys, appliedShipVoucher: state.appliedShipVoucher,
                appliedProdVoucher: state.appliedProdVoucher
              }
            }),
          });
        } catch (error) {
          console.warn("Tạm thời không thể lưu vào DB, vẫn lưu local dự phòng.");
        }
      }

      // Luôn lưu local dự phòng (để trải nghiệm mượt mà hơn)
      localStorage.setItem("dusk_cart_v2", JSON.stringify(state));
    };

    const timeoutId = setTimeout(saveToDB, 1000); // Debounce 1s để tránh gọi API quá nhiều
    return () => clearTimeout(timeoutId);
  }, [state, hasHydrated]);

  const addToCart = (product, size, color, quantity = 1) => {
    // 🔐 Kiểm tra user đã login chưa
    // Nếu chưa login (localStorage không có "user") -> không thêm vào giỏ hàng
    if (typeof window !== 'undefined' && !localStorage.getItem("user")) {
      // TODO: Có thể redirect sang trang login thay vì chỉ return
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