import { fetchCollection } from "./api";

type StatusShape = {
  key: string;
  label: string;
  color: string;
  step: number;
};

const fallbackStatus = (key: string, label: string, color: string, step: number): StatusShape => ({
  key,
  label,
  color,
  step,
});

export async function loadAoThunMeta() {
  const data = await fetchCollection<any[]>("ao-thun");
  const source = Array.isArray(data) ? data[0] ?? {} : {};

  const shippingMethods = Array.isArray(source.shippingMethods) ? source.shippingMethods : [];
  const rawPaymentMethods = Array.isArray(source.paymentMethods) ? source.paymentMethods : [];
  const paymentMethods = rawPaymentMethods.filter((method: any) =>
    ["cod", "bank_transfer"].includes(method?.id)
  );
  const orderStatus = source.orderStatus ?? {};

  return {
    shippingMethods,
    paymentMethods,
    ORDER_STATUS: {
      CART: orderStatus.CART ?? fallbackStatus("CART", "Giỏ hàng", "#6B7280", 0),
      PENDING: orderStatus.PENDING ?? fallbackStatus("Processing", "Chờ xác nhận", "#F59E0B", 1),
      CONFIRMED: orderStatus.CONFIRMED ?? fallbackStatus("Confirmed", "Đã xác nhận", "#3B82F6", 2),
      PROCESSING: orderStatus.PROCESSING ?? fallbackStatus("Packed", "Đóng gói", "#8B5CF6", 3),
      SHIPPING: orderStatus.SHIPPING ?? fallbackStatus("Shipping", "Đang giao", "#8B5CF6", 4),
      DELIVERED: orderStatus.DELIVERED ?? fallbackStatus("Delivered", "Đã giao", "#10B981", 5),
      PAID: fallbackStatus("PAID", "Đã thanh toán", "#10B981", 6),
      CANCELLED: orderStatus.CANCELLED ?? fallbackStatus("Cancelled", "Đã hủy", "#EF4444", -1),
      RETURN_REQUESTED: fallbackStatus("RETURN_REQUESTED", "Yêu cầu hoàn hàng", "#F59E0B", 7),
      RETURNED: fallbackStatus("RETURNED", "Đã hoàn hàng", "#10B981", 8),
      REFUNDED: fallbackStatus("REFUNDED", "Đã hoàn tiền", "#10B981", 9),
    },
  };
}