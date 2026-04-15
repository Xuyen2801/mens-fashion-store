# 📚 HƯỚNG DẪN CODE - Men's Fashion Store

Tài liệu này ghi chú những phần code khó hiểu và giải thích các hook, router pattern, cũng như logic phức tạp trong project.

---

## 🎣 REACT HOOKS - CÁCH DÙNG & MỤC ĐÍCH

### 1. **useState** - Quản lý State
📍 **File**: [src/components/Cart/CartContext.jsx]()  
```javascript
// State local component
const [openSearch, setOpenSearch] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

// State form
const [form, setForm] = useState({ fullName: "", phone: "", email: "" });
const [errors, setErrors] = useState({});
```

**Mục đích**: Lưu trữ dữ liệu mutable trong component

---

### 2. **useEffect** - Side Effects & Lifecycle
#### Loại 1: Fetch dữ liệu khi component mount
📍 **File**: [src/components/Collection/BestSeller.jsx]()
```javascript
useEffect(() => {
  let isMounted = true; // Flag để prevent memory leak
  
  const loadProducts = async () => {
    const data = await fetchCollection("productsAll");
    if (isMounted) setSanphamPYS(data); // ✅ Kiểm tra component còn mounted không
  };
  
  loadProducts();
  return () => { isMounted = false; }; // Cleanup
}, []); // [] = chạy 1 lần sau render đầu tiên
```

#### Loại 2: localStorage Hydration
📍 **File**: [src/components/Cart/CartContext.jsx]()
```javascript
// useEffect #1: Load từ localStorage
useEffect(() => {
  const saved = localStorage.getItem("dusk_cart_v2");
  if (saved) dispatch({ type: "HYDRATE_STATE", payload: JSON.parse(saved) });
  setHasHydrated(true); // Báo xong hydration
}, []);

// useEffect #2: Lưu vào localStorage (dependency: state, hasHydrated)
useEffect(() => {
  if (!hasHydrated) return; // Chĩ lưu sau khi hydrated
  localStorage.setItem("dusk_cart_v2", JSON.stringify(state));
}, [state, hasHydrated]);
```

**Mục đích**: 
- Fetch API, localStorage setup
- Trigger khi component mount/dependencies thay đổi
- Cleanup để prevent memory leak

---

### 3. **useContext & useReducer** - Global State Management
📍 **File**: [src/components/Cart/CartContext.jsx]()

```javascript
// Reducer: tập hợp các action xử lý cart
function cartReducer(state, action) {
  switch(action.type) {
    case "ADD_ITEM": 
      // Thêm sản phẩm, nếu đã có size/color giống thì cộng quantity
      return { ...state, items: [...state.items, newItem] };
    case "APPLY_VOUCHER":
      // Validate voucher, tính discount
      return { ...state, appliedVoucher: resolveVoucher(code) };
    case "PLACE_ORDER":
      // Di chuyển items khỏi cart vào orders
      return { ...state, orders: [newOrder, ...state.orders], items: [] };
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, DEFAULT_STATE);
  // ...
  return <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider>
}

// Dùng context
export function useCart() {
  return useContext(CartContext); // Sẽ throw error nếu không wrap CartProvider
}
```

**Mục đích**: Quản lý complex state (cart có 8+ action types) mà không rơi vào prop drilling

---

### 4. **useMemo** - Optimize Performance
📍 **File**: [src/components/layout/Header.jsx]()

```javascript
// Chỉ tính toán lại khi searchQuery hoặc searchProducts thay đổi
const searchResults = useMemo(() => {
  const keyword = normalizeText(searchQuery);
  if (!keyword) return searchProducts.slice(0, 12);
  
  return searchProducts
    .filter(p => normalizeText(p.name).includes(keyword))
    .slice(0, 24);
}, [searchProducts, searchQuery]); // Dependencies
```

**Mục đích**: Cache kết quả tính toán để tránh render lại không cần thiết
**Khi nào dùng**: Tính toán nặng (sorting, filtering, complex logic)

---

### 5. **useRef** - Truy cập DOM trực tiếp
📍 **File**: [src/components/layout/Header.jsx]()

```javascript
const searchInputRef = useRef(null);
const searchWrapperRef = useRef(null);

// Focus input khi mở search panel
const openSearchPanel = () => {
  setOpenSearch(true);
  setTimeout(() => searchInputRef.current?.focus(), 0); // Tìm input DOM & focus
};

// Check click outside search panel
useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
      closeSearchPanel();
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
```

**Mục đích**: Truy cập DOM element directly (focus, blur, measure size, etc)
**Chú ý**: Tránh dùng ref khi có thể dùng state thay thế

---

## 🛣️ ROUTER & DYNAMIC ROUTES - Next.js Routing

### 1. **Dynamic Route [slug]**
📍 **File**: [src/app/collection/[slug]/page.tsx]()

```typescript
// URL: /collection/procool
// File structure: src/app/collection/[slug]/page.tsx

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Lấy "procool" từ URL
  // ...
}
```

**Mục đích**: Tạo dynamic URL từ slug, không cần tạo file riêng cho mỗi collection

---

### 2. **Slug Aliasing Pattern**
📍 **File**: [src/app/collection/[slug]/page.tsx]()

```javascript
// URL cũ: /collection/procool -> cần redirect đến /collection/procool-new-gen
// Solution: Map slug cũ -> slug mới

const aliasMap = {
  procool: "procool-new-gen",
  icon105: "icon105-lightweight-collection",
  smartjeans: "smart-jeans-collection", // Hỗ trợ cả old naming
};

const targetSlug = aliasMap[slug.toLowerCase()] || slug; // Tìm slug thực
const collection = await fetchCollection(targetSlug.toUpperCase());
```

**Lợi thế**: Giữ URL cũ + fetch data mới mà không cần redirect 301

---

### 3. **useRouter vs useParams**
📍 **File**: [src/components/layout/Header.jsx](), [src/app/collection/[slug]/page.tsx]()

```javascript
// Client component - Thay đổi URL + đọc params
"use client";
import { useRouter, useParams, usePathname } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Điều hướng khi click button
  const handleUserClick = () => {
    if (loggedInUser) {
      router.push("/account");
    } else {
      router.push("/login");
    }
  };
  
  // Đóng search panel khi pathname thay đổi
  useEffect(() => {
    closeSearchPanel();
  }, [pathname]); // Trigger khi URL thay đổi
}
```

```typescript
// Server component - Đọc params từ URL
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Đợi params promise
}
```

---

## 🤔 CODE PHỨC TẠP & KHÁM PHÁ

### 1. **Data Normalization** (Xử lý API response format khác nhau)
📍 **File**: [src/components/layout/Header.jsx]()

```javascript
// API có thể trả về 2 format:
// Format 1: [{ productsAll: [...] }]
// Format 2: [product1, product2, ...]

const normalizeProductsPayload = (payload) => {
  if (!Array.isArray(payload) || payload.length === 0) return [];
  
  const first = payload[0];
  if (first && typeof first === "object") {
    if (Array.isArray(first.productsAll)) return first.productsAll;
    if (Array.isArray(first.products)) return first.products;
  }
  
  return payload; // Trả về ngay nếu đã là flat array
};
```

**Tại sao cần**: API có thể update structure, backend có bug, hoặc legacy data
**Lợi ích**: Normalize ở một chỗ, codebase khác dùng dạng flat array nhất quán

---

### 2. **Deduplication with Set**
📍 **File**: [src/components/layout/Header.jsx]()

```javascript
// Xóa duplicate products từ 16 collections khác nhau
const dedupeProducts = (items) => {
  const seen = new Set(); // Lưu keys đã thấy

  return items.filter((product) => {
    // Tạo unique key từ slug/id/sku/name
    const key = String(product?.slug || product?.id || product?.sku || product?.name || "")
      .trim()
      .toLowerCase();
      
    if (!key) return false; // Bỏ sản phẩm không có key
    if (seen.has(key)) return false; // Đã thấy -> skip
    seen.add(key); // Thêm vào seen set
    return true; // Keep sản phẩm này lần đầu
  });
};
```

**Mục đích**: Tránh hiển thị cùng product 2 lần ở search
**Tại sao dùng Set**: O(1) lookup vs O(n) array.includes()

---

### 3. **Promise.allSettled** - Fault Tolerant Loading
📍 **File**: [src/components/layout/Header.jsx]()

```javascript
// Khác Promise.all:
// - Promise.all: 1 request fail -> TẤT CẢ fail
// - Promise.allSettled: Từng request kết thúc riêng (success/fail)

const SEARCH_COLLECTIONS = [
  "productsAll", "ao-polo", "ao-thun", "ao-khoac", // ... 16 collections
];

const loadSearchProducts = async () => {
  // Fetch 16 collections song song
  const responses = await Promise.allSettled(
    SEARCH_COLLECTIONS.map((name) => fetchCollection(name))
  );
  
  // Lọc chỉ successful requests, bỏ failed
  const mergedProducts = responses.flatMap((response) => {
    if (response.status !== "fulfilled") return []; // Skip failed
    return normalizeProductsPayload(response.value);
  });
};
```

**Khi nào dùng**: 
- ✅ Search: Cần partial data (5/16 collections là ok)
- ❌ Checkout: Cần ALL data (payment methods, shipping methods, etc) - dùng Promise.all

---

### 4. **Unicode NFD Normalization** - Vietnamese Text Processing
📍 **File**: [src/app/Product/[category]/[slug]/page.tsx]()

```javascript
// Chuyển "Áo Thun Nam" -> "ao-thun-nam" để match URL slug
const normalizeText = (value: string) =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")              // ← Tách dấu: "á" -> "a" + combining mark
    .replace(/[\u0300-\u036f]/g, "") // ← Xóa combining marks (unicode range)
    .replace(/[^a-z0-9\s-]/g, " ") // ← Xóa special chars
    .replace(/\s+/g, "-")          // ← Space thành dash
    .replace(/-+/g, "-")           // ← Multiple dash thành single
    .replace(/^-|-$/g, "");        // ← Xóa leading/trailing dash

// Input: "Áo Thun Nam"
// 1. lowercase: "áo thun nam"
// 2. NFD: "a' o thun nam" (dấu tách ra)
// 3. remove marks: "ao thun nam"
// 4. remove special: "ao thun nam"
// 5. space->dash: "ao-thun-nam"
// Output: "ao-thun-nam" ✓
```

**Mục đích**: Match Vietnamese text từ product name vs URL slug
**Nên học**: Unicode normalization cho text processing multilingual

---

### 5. **3-Step Registration Flow** - Multi-step Async
📍 **File**: [src/app/login/RegisterForm.jsx]()

```javascript
// Step 1: Gửi OTP
const handleSendOTP = async (e) => {
  // 1. Check phone chưa đăng ký
  const allUsers = await fetch(API_URL).then(r => r.json());
  if (allUsers.some(u => u.phone === inputPhone)) return;
  
  // 2. Init reCAPTCHA
  window.recaptchaVerifier = new RecaptchaVerifier(...);
  
  // 3. Format phone: 0901234567 -> +84901234567
  const phoneFormatted = "+84" + phone.substring(1);
  
  // 4. Gửi SMS
  const confirmationResult = await signInWithPhoneNumber(auth, phoneFormatted, verifier);
  window.confirmationResult = confirmationResult; // Lưu đây để step 2 dùng
  
  setStep(2); // Next step
};

// Step 2: Xác thực OTP
const handleVerifyOTP = async (e) => {
  // Dùng confirmationResult từ step 1 để verify OTP
  await window.confirmationResult.confirm(inputOTP);
  setStep(3); // Next step
};

// Step 3: Tạo tài khoản
const handleRegister = async (e) => {
  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // 2. Lưu DB
  await fetch(API_URL, { method: "POST", body: JSON.stringify({...}) });
  
  // 3. Gửi email chào mừng (non-blocking)
  try {
    await fetch("/api/send-email", { ... }); 
  } catch (mailErr) {
    console.error(mailErr); // Bỏ qua nếu fail
  }
  
  // 4. Redirect login
  window.location.href = "/login";
};
```

**Mục đích**: Xác thực phone qua SMS trước khi đăng ký
**Pattern**: Lưu intermediate state (confirmationResult) trong window/state để dùng step kế tiếp

---

### 6. **Curried Function** - Event Handler Factory
📍 **File**: [src/components/Cart/CheckoutForm.jsx]()

```javascript
// CURRIED function: handleInput(field) trả về function (e) => {...}
const handleInput = (field) => (e) => {
  setForm((f) => ({ ...f, [field]: e.target.value }));
  setErrors((er) => ({ ...er, [field]: undefined }));
};

// Cách dùng:
{fields.map((f) => (
  <input 
    key={f.id}
    onChange={handleInput(f.id)} // ← handleInput("fullName") trả về function
  />
))}

// Thay vì:
const handleInput = (field, value) => {
  setForm((f) => ({ ...f, [field]: value }));
};
{fields.map((f) => (
  <input onChange={(e) => handleInput(f.id, e.target.value)} /> // ← Dài hơn
))}
```

**Lợi ích**: 
- Tạo handler unique cho mỗi field
- Syntax sạch sẽ hơn
- Functional programming pattern

---

### 7. **Price Calculation Logic** - Voucher System
📍 **File**: [src/components/Cart/CheckoutForm.jsx]()

```javascript
const v = state.appliedVoucher;
let discount = 0;
let shippingFee = selectedShipping.price;

if (v && !v.error) {
  if (v.type === "percent") {
    // Giảm theo %
    discount = Math.round((subtotal * v.value) / 100);
  } else if (v.type === "fixed") {
    // Giảm số tiền cố định (VD 20k)
    // Math.min() đảm bảo discount không vượt subtotal (không được âm tiền)
    discount = Math.min(v.value, subtotal);
  } else if (v.type === "shipping") {
    // Miễn phí vận chuyển
    shippingFee = 0;
  }
}

const total = subtotal - discount + shippingFee;

// VD: Subtotal 600k, voucher -20k fixed, shipping 40k
// total = 600k - 20k + 40k = 620k ✓
```

---

## 🚀 BEST PRACTICES ĐÃ DÙNG

| Pattern | Nơi dùng | Lợi ích |
|---------|----------|---------|
| **isMounted flag** | Fetch data in useEffect | Prevent "Can't set state on unmounted component" warning |
| **normalizeText** | Search, URL matching | Handle Vietnamese diacritics |
| **hasHydrated** | localStorage setup | Sync client/server state safely |
| **Promise.allSettled** | Search (partial data ok) | Fault tolerant, partial success |
| **Promise.all** | Checkout data load | Fail fast, all data required |
| **Set deduplication** | Search results | Fast O(1) lookup vs O(n) array |
| **Curried handlers** | Form inputs | Clean syntax, maintain closure |
| **Reducer** | Complex state (cart) | Predictable state transitions |
| **useRef** | DOM manipulation | Direct access without render |
| **useMemo** | Heavy filtering/sorting | Skip re-computation |
| **Slug aliasing** | Collection routing | Maintain old URLs with new data |

---

## 📋 CHECKLIST KHI THÊM FEATURES

- [ ] Dùng `isMounted` flag khi fetch data
- [ ] Normalize input data từ API
- [ ] Handle multiple data formats (nested vs flat array)
- [ ] Validate trước save DB (backend + frontend)
- [ ] Hash password trước lưu
- [ ] Xóa duplicate nếu merge từ multiple sources
- [ ] Dùng `useMemo` cho heavy computations
- [ ] Test error cases (network, validation, edge cases)
- [ ] Add comments cho logic phức tạp

---

## 📞 CẦN GIÚP?

Nếu bạn gặp các phần khó hiểu trong code:
1. **Search file**: Grep các keywords từ section này
2. **Read comments**: Mỗi phần logic phức tạp đều có comment giải thích
3. **Trace data flow**: Follow `console.log` từ component -> reducer -> state
4. **Run debugger**: Set breakpoint ở complex functions để xem step-by-step

**Happy coding! 🚀**
