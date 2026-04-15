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
      PENDING: orderStatus.PENDING ?? fallbackStatus("PENDING", "Chờ xác nhận", "#F59E0B", 1),
      CONFIRMED: orderStatus.CONFIRMED ?? fallbackStatus("CONFIRMED", "Đã xác nhận", "#3B82F6", 2),
      PROCESSING: orderStatus.PROCESSING ?? orderStatus.SHIPPED ?? fallbackStatus("PROCESSING", "Đang xử lý", "#8B5CF6", 3),
      SHIPPING: orderStatus.SHIPPED ?? fallbackStatus("SHIPPING", "Đang giao", "#8B5CF6", 3),
      SHIPPED: orderStatus.SHIPPED ?? fallbackStatus("SHIPPED", "Đang giao", "#8B5CF6", 3),
      DELIVERED: orderStatus.DELIVERED ?? fallbackStatus("DELIVERED", "Đã giao", "#10B981", 4),
      PAID: fallbackStatus("PAID", "Đã thanh toán", "#10B981", 4),
      CANCELLED: orderStatus.CANCELLED ?? fallbackStatus("CANCELLED", "Đã hủy", "#EF4444", -1),
      RETURN_REQUESTED: fallbackStatus("RETURN_REQUESTED", "Yêu cầu hoàn hàng", "#F59E0B", 5),
      RETURNED: fallbackStatus("RETURNED", "Đã hoàn hàng", "#10B981", 6),
      REFUNDED: fallbackStatus("REFUNDED", "Đã hoàn tiền", "#10B981", 7),
    },
  };
}