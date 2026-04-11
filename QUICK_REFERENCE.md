# ⚡ QUICK REFERENCE - Hooks & Patterns

## 🎣 Hooks Cheat Sheet

### useState - Quản lý state local
```javascript
const [count, setCount] = useState(0);
const [form, setForm] = useState({ name: "", email: "" });

// Setter function form (để update dựa trên state cũ)
setForm(prev => ({ ...prev, name: value }));
```

### useEffect - Side effects (API, localStorage, listeners)
```javascript
// Run 1 lần (mount)
useEffect(() => { ... }, []);

// Run mỗi khi dependency thay đổi
useEffect(() => { ... }, [dependency1, dependency2]);

// Cleanup khi unmount
useEffect(() => {
  const handler = () => {...};
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);

// Pattern: Prevent state update after unmount
useEffect(() => {
  let isMounted = true;
  fetchData().then(d => {
    if (isMounted) setState(d); // ✅ Chỉ update nếu component còn mounted
  });
  return () => { isMounted = false; }; // Cleanup
}, []);
```

### useContext - Share state globally
```javascript
// Provider (wrap your app)
<CartProvider>
  <App />
</CartProvider>

// Consumer (dùng trong component)
const { state, dispatch } = useCart();
```

### useReducer - Complex state + actions
```javascript
const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: "ADD_ITEM", payload: product });
dispatch({ type: "APPLY_VOUCHER", payload: code });
```

### useMemo - Cache expensive calculations
```javascript
const filteredItems = useMemo(() => {
  return items.filter(i => i.name.includes(keyword));
}, [items, keyword]); // Recalculate chỉ khi dependencies thay đổi
```

### useRef - Direct DOM access
```javascript
const inputRef = useRef(null);

const focus = () => inputRef.current?.focus();
const getValue = () => inputRef.current?.value;

<input ref={inputRef} />
```

---

## 🛣️ Router Patterns

### Dynamic route [slug]
```
/src/app/collection/[slug]/page.tsx
↓
URL: /collection/procool -> slug="procool"
URL: /collection/icon105 -> slug="icon105"
```

### Slug aliasing
```javascript
const aliasMap = {
  procool: "procool-new-gen",         // Old -> New
  icon105: "icon105-lightweight",
};
const targetSlug = aliasMap[slug] || slug; // Map hay giữ original
```

### useRouter vs useParams
```javascript
// Client-side routing & reading params
const router = useRouter();
const params = useParams();
const pathname = usePathname();

router.push("/new-url");
if (pathname.includes("/admin")) { ... }
```

---

## 🎯 Common Patterns

### API Normalization (handle multiple formats)
```javascript
const normalize = (payload) => {
  if (payload[0]?.products) return payload[0].products;
  if (payload[0]?.productsAll) return payload[0].productsAll;
  return Array.isArray(payload) ? payload : [];
};
```

### Deduplication with Set
```javascript
const dedup = (items) => {
  const seen = new Set();
  return items.filter(item => {
    const key = item.id.toString();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
```

### Vietnamese Text Normalization
```javascript
const normalize = (text) => 
  text
    .toLowerCase()
    .normalize("NFD")                     // "á" -> "a" + accent
    .replace(/[\u0300-\u036f]/g, "")     // remove accents
    .replace(/[^a-z0-9\s-]/g, " ")       // keep alphanumeric only
    .replace(/\s+/g, "-")                // space -> dash
    .replace(/-+/g, "-");                // collapse dashes

// "Áo Thun Nam" -> "ao-thun-nam"
```

### Curried Functions (form handlers)
```javascript
const handleInput = (field) => (e) => {
  setForm(prev => ({ ...prev, [field]: e.target.value }));
};

<input onChange={handleInput("name")} />  // ✓ Clean
```

### Promise.allSettled (fault-tolerant)
```javascript
// Fetch multiple endpoints, continue even if some fail
const responses = await Promise.allSettled(
  endpoints.map(url => fetch(url))
);

const data = responses
  .filter(r => r.status === "fulfilled")
  .map(r => r.value);
```

---

## 🔴 Common Mistakes

| ❌ Mistake | ✅ Fix |
|-----------|-------|
| Directly mutate state | Use spread operator: `{...state, key: value}` |
| Missing dependency in useEffect | Include all used variables in deps array |
| State update after unmount | Add `isMounted` flag in cleanup |
| Multiple renders (no useMemo) | Wrap expensive logic with useMemo |
| Infinite loops | Check useEffect dependencies |
| Plain JS `sort()` on array | Use `[...array].sort()` to avoid mutation |

---

## 📂 File Structure to Know

```
src/
├── components/
│   ├── Cart/CartContext.jsx         ← Reducer + Cart logic
│   ├── layout/Header.jsx            ← Hooks + Search logic
│   └── Collection/BestSeller.jsx    ← Sorting + Fetching
├── app/
│   ├── collection/[slug]/page.tsx   ← Dynamic routes + Alias map
│   └── Product/[category]/[slug]/   ← Unicode normalization
├── lib/
│   └── api.ts                       ← Fetch utility
└── store/
    └── cartStore.js                 ← Zustand store (alternative to context)
```

---

## 💬 Debug Tips

```javascript
// Debug hook state
console.log("Cart state:", state);
console.log("Selected items:", state.items.filter(i => 
  state.selectedItemKeys.includes(i.key)
));

// Debug async flow
const loadData = async () => {
  console.log("1. Start loading...");
  const data = await fetch(...);
  console.log("2. Fetch done:", data);
  console.log("3. Mounted?", isMounted);
  if (isMounted) setState(data);
  console.log("4. Done");
};

// React DevTools
// → Inspect component props/state
// → Trace which component re-rendered
// → Performance profiling
```

---

## 🚀 Quick Start for Beginners

1. **Learn hooks order**: useState → useEffect → useMemo/useCallback → useContext/useReducer
2. **Understand dependency array**: `[]` = run once, `[x]` = run when x changes, no array = run every render
3. **Master destructuring**: `const {state, dispatch} = useCart()`
4. **Remember event handlers**: `(e) => setState(e.target.value)`
5. **Know context pattern**: Wrap provider → use hook in child components

---

**More details**: See [CODE_GUIDE_VI.md](./CODE_GUIDE_VI.md)
