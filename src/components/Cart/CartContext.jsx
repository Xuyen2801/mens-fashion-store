"use client";
import { createContext, useContext, useReducer, useEffect, useState } from "react";

const CartContext = createContext(null);

const DEFAULT_STATE = {
  items: [],
  orders: [],
  selectedItemKeys: [],
  shippingMethod: "",
  paymentMethod: "cod",
  appliedVoucher: null,
  note: "",
};

// ✨ VOUCHER_DEFINITIONS: Định nghĩa tất cả các mã giảm giá
// - type: "fixed" = giảm số tiền cố định (VD: 20k), "shipping" = miễn phí vận chuyển
// - minSubtotal: giá trị tối thiểu của đơn hàng để dùng được voucher
// - value: số tiền/phần trăm giảm giá
// VD: SALE20K chỉ áp dụng khi tổng hàng >= 499.000đ
const VOUCHER_DEFINITIONS = {
  SALE20K: { code: "SALE20K", type: "fixed", value: 20000, minSubtotal: 499000, label: "Giảm 20.000đ cho đơn từ 499.000đ" },
  SALE60K: { code: "SALE60K", type: "fixed", value: 60000, minSubtotal: 749000, label: "Giảm 60.000đ cho đơn từ 749.000đ" },
  SALE90K: { code: "SALE90K", type: "fixed", value: 90000, minSubtotal: 999000, label: "Giảm 90.000đ cho đơn từ 999.000đ" },
  SALE150K: { code: "SALE150K", type: "fixed", value: 150000, minSubtotal: 1599000, label: "Giảm 150.000đ cho đơn từ 1.599.000đ" },
  FREESHIP: { code: "FREESHIP", type: "shipping", value: 100, minSubtotal: 399000, label: "Miễn phí vận chuyển cho đơn từ 399.000đ" },
};

// 🔄 VOUCHER_ALIASES: Cho phép dùng code ngắn thay vì code dài
// VD: User nhập "20K" hoặc "SALE20K" đều có thể (sẽ map thành "SALE20K")
const VOUCHER_ALIASES = {
  "20K": "SALE20K",
  "60K": "SALE60K",
  "90K": "SALE90K",
  "150K": "SALE150K",
};

// 🎟️ resolveVoucher: Kiểm tra & validate mã voucher
// Logic:
// 1. Normalize code (trim + uppercase) để tránh lỗi cách nhập
// 2. Check alias mapping ("20K" -> "SALE20K")
// 3. Verify mã có trong VOUCHER_DEFINITIONS không
// 4. Kiểm tra subtotal >= minSubtotal yêu cầu
// Return: object voucher nếu hợp lệ, hoặc {error: ...} nếu không
const resolveVoucher = (rawCode, subtotal) => {
  const normalized = String(rawCode || "").trim().toUpperCase();
  if (!normalized) {
    return { error: "Vui lòng nhập mã voucher" };
  }

  // Thử ánh xạ alias trước, nếu không có thì dùng code gốc
  const canonicalCode = VOUCHER_ALIASES[normalized] || normalized;
  const voucher = VOUCHER_DEFINITIONS[canonicalCode];

  if (!voucher) {
    return { error: "Mã voucher không hợp lệ" };
  }

  // Kiểm tra ghi chú: Tổng tiền phải >= minSubtotal thì mới được dùng voucher này
  if (subtotal < voucher.minSubtotal) {
    return {
      error: `Đơn hàng cần tối thiểu ${new Intl.NumberFormat("vi-VN").format(voucher.minSubtotal)}đ để áp dụng ${voucher.code}`,
    };
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
        appliedVoucher: action.payload?.appliedVoucher || null,
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

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        selectedItemKeys: [],
        appliedVoucher: null,
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
      // 🎟️ APPLY_VOUCHER: Áp dụng mã voucher
      // - Tính subtotal của những items được chọn (selected items)
      // - Gọi resolveVoucher để validate code & kiểm tra điều kiện
      // - Lưu kết quả (voucher object hoặc error) vào state
      const selectedSet = new Set(state.selectedItemKeys);
      // Tính tổng tiền chỉ của những sản phẩm được chọn
      const subtotal = state.items.reduce(
        (sum, item) => selectedSet.has(item.key)
          ? sum + (item.product.salePrice ?? item.product.price) * item.quantity
          : sum,
        0
      );

      return {
        ...state,
        appliedVoucher: resolveVoucher(action.payload, subtotal), // Validate & resolve voucher
      };
    }

    case "REMOVE_VOUCHER":
      return {
        ...state,
        appliedVoucher: null,
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
        appliedVoucher: null,
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

  // 💾 useEffect #1: Load cart từ localStorage khi component mount
  // Cần setup "hasHydrated" flag để tránh lưu state trước khi hydrate xong
  // Try-catch để xử lý nếu localStorage bị corrupt
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dusk_cart_v2");
      if (saved) {
        dispatch({ type: "HYDRATE_STATE", payload: JSON.parse(saved) });
      }
    } catch {
      // Ignore invalid localStorage payload and keep default state.
    } finally {
      setHasHydrated(true); // Flag này ngăn việc lưu state ngay lập tức (trước khi hydrate xong)
    }
  }, []);

  // 💾 useEffect #2: Lưu cart vào localStorage mỗi khi state thay đổi
  // Chỉ lưu sau khi hydrate xong (hasHydrated=true) để tránh overwrite data gốc
  useEffect(() => {
    if (!hasHydrated) return; // Bỏ qua nếu chưa hydrate xong
    localStorage.setItem("dusk_cart_v2", JSON.stringify(state));
  }, [state, hasHydrated]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);

  const subtotal = state.items.reduce(
    (s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity,
    0
  );

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