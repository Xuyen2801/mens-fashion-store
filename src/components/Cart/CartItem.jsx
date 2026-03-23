import { useCart } from "../../components/Cart/CartContext";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);

export default function CartItem({ item }) {
  const { dispatch } = useCart();
  const { product, selectedSize, selectedColor, quantity, key, selected } = item;

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
    <div className="cart-item" style={{ display: "flex", gap: 10 }}>

      {/* ✅ CHECKBOX */}
      <input
        type="checkbox"
        checked={selected || false}
        onChange={() =>
          dispatch({ type: "TOGGLE_SELECT_ITEM", payload: key })
        }
      />

      <div className="cart-item__img-wrap">
        <img src={product.image} alt={product.name} width={80} />
      </div>

      <div className="cart-item__info">
        <p>{product.name}</p>

        <p>
          Size: {selectedSize} | {selectedColor}
        </p>

        <p>{fmt(price)}</p>

        <div>
          <button onClick={() => handleQty(-1)}>−</button>
          <span style={{ margin: "0 10px" }}>{quantity}</span>
          <button onClick={() => handleQty(1)} disabled={quantity >= maxQty}>
            +
          </button>
        </div>

        <p>{fmt(price * quantity)}</p>

        <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: key })}>
          Xóa
        </button>
      </div>
    </div>
  );
}