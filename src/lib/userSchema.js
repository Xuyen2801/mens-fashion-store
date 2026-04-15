const PHONE_REGEX = /^0\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toTimestamp(value) {
  const time = Date.parse(value || "");
  return Number.isNaN(time) ? 0 : time;
}

export function normalizePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (digits.startsWith("84") && digits.length === 11) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

export function normalizeEmail(email) {
  return toText(email).toLowerCase();
}

export function normalizeUser(user = {}) {
  return {
    ...user,
    id: toText(user.id),
    phone: normalizePhone(user.phone),
    fullName: toText(user.fullName),
    email: normalizeEmail(user.email),
    address: toText(user.address),
    password: toText(user.password),
    role: toText(user.role) || "customer",
    createdAt: toText(user.createdAt) || new Date().toISOString(),
    updatedAt: toText(user.updatedAt) || new Date().toISOString(),
    schemaVersion: Number(user.schemaVersion) || 1,
  };
}

export function validateRegistrationData(user = {}) {
  const normalized = normalizeUser(user);
  const errors = [];

  if (!PHONE_REGEX.test(normalized.phone)) {
    errors.push("Số điện thoại phải đủ 10 số và bắt đầu bằng 0.");
  }

  if (normalized.fullName.length < 2) {
    errors.push("Họ và tên chưa hợp lệ.");
  }

  if (!EMAIL_REGEX.test(normalized.email)) {
    errors.push("Email chưa đúng định dạng.");
  }

  if (!normalized.address) {
    errors.push("Vui lòng nhập địa chỉ giao hàng.");
  }

  if (normalized.password.length < 6) {
    errors.push("Mật khẩu phải có ít nhất 6 ký tự.");
  }

  return {
    valid: errors.length === 0,
    errors,
    user: normalized,
  };
}

export function chooseLatestUserByPhone(users = [], phone = "") {
  const normalizedPhone = normalizePhone(phone);

  return users
    .filter((user) => normalizePhone(user.phone) === normalizedPhone)
    .sort((a, b) => toTimestamp(b.updatedAt || b.createdAt) - toTimestamp(a.updatedAt || a.createdAt))[0];
}

export function hasDuplicateIdentity(users = [], phone = "", email = "") {
  const normalizedPhone = normalizePhone(phone);
  const normalizedEmail = normalizeEmail(email);

  return users.some(
    (user) =>
      normalizePhone(user.phone) === normalizedPhone ||
      normalizeEmail(user.email) === normalizedEmail
  );
}
