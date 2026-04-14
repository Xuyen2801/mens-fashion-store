const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PHONE_REGEX = /^0\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (digits.startsWith("84") && digits.length === 11) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

function normalizeEmail(email) {
  return toText(email).toLowerCase();
}

function toTimestamp(value) {
  const time = Date.parse(value || "");
  return Number.isNaN(time) ? 0 : time;
}

function normalizeUser(user = {}) {
  return {
    id: toText(user.id) || crypto.randomBytes(6).toString("base64url"),
    phone: normalizePhone(user.phone),
    fullName: toText(user.fullName),
    email: normalizeEmail(user.email),
    address: toText(user.address),
    password: toText(user.password),
    role: toText(user.role) || "customer",
    createdAt: toText(user.createdAt) || new Date().toISOString(),
    updatedAt: toText(user.updatedAt) || new Date().toISOString(),
    schemaVersion: 1,
  };
}

function validateUser(user = {}) {
  if (!PHONE_REGEX.test(user.phone)) {
    return "invalid phone";
  }

  if (user.fullName.length < 2) {
    return "invalid fullName";
  }

  if (!EMAIL_REGEX.test(user.email)) {
    return "invalid email";
  }

  if (!user.address) {
    return "empty address";
  }

  if (!user.password) {
    return "empty password";
  }

  return "";
}

function dedupeUsers(users = []) {
  const sortedUsers = [...users].sort(
    (a, b) => toTimestamp(b.updatedAt || b.createdAt) - toTimestamp(a.updatedAt || a.createdAt)
  );

  const seenPhones = new Set();
  const seenEmails = new Set();
  const result = [];

  for (const user of sortedUsers) {
    if (seenPhones.has(user.phone) || seenEmails.has(user.email)) {
      continue;
    }

    seenPhones.add(user.phone);
    seenEmails.add(user.email);
    result.push(user);
  }

  return result.reverse();
}

function runMigration() {
  const filePath = path.resolve(__dirname, "../src/data/user/user.json");
  const rawContent = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(rawContent);
  const users = Array.isArray(parsed.users) ? parsed.users : [];

  const cleanedUsers = [];
  const invalidUsers = [];

  for (const user of users) {
    const normalizedUser = normalizeUser(user);
    const reason = validateUser(normalizedUser);

    if (reason) {
      invalidUsers.push({ id: normalizedUser.id, reason });
      continue;
    }

    cleanedUsers.push(normalizedUser);
  }

  const dedupedUsers = dedupeUsers(cleanedUsers);

  const output = {
    users: dedupedUsers,
    $schema: "./node_modules/json-server/schema.json",
  };

  fs.writeFileSync(filePath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Users before: ${users.length}`);
  console.log(`Users after cleanup: ${dedupedUsers.length}`);
  console.log(`Invalid users removed: ${invalidUsers.length}`);
}

runMigration();
