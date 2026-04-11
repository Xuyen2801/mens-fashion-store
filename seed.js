const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopDB";
const DATA_DIR = path.resolve(__dirname, "data-migration");

function normalizeDocs(jsonValue) {
  if (Array.isArray(jsonValue)) return jsonValue;
  if (jsonValue && typeof jsonValue === "object") return [jsonValue];
  return [];
}

async function seedCollection(db, collectionName, docs) {
  const collection = db.collection(collectionName);

  // Replace old data to keep frontend/backend data shape consistent.
  await collection.deleteMany({});

  if (docs.length > 0) {
    await collection.insertMany(docs);
  }

  return docs.length;
}

async function runSeed() {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Không tìm thấy thư mục dữ liệu: ${DATA_DIR}`);
  }

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.toLowerCase().endsWith(".json"))
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    throw new Error("Không có file JSON nào trong data-migration");
  }

  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  console.log(`Connected MongoDB: ${MONGO_URI}`);
  console.log(`Seeding ${files.length} collection(s) from data-migration...`);

  let totalDocs = 0;
  const skippedFiles = [];

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const collectionName = path.basename(file, ".json");

    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      const docs = normalizeDocs(parsed);

      const count = await seedCollection(db, collectionName, docs);
      totalDocs += count;

      console.log(`- ${collectionName}: ${count} document(s)`);
    } catch (error) {
      skippedFiles.push({ file, reason: error.message });
      console.warn(`- ${collectionName}: skipped (${error.message})`);
    }
  }

  console.log(`Seed hoàn tất. Tổng document: ${totalDocs}`);

  if (skippedFiles.length > 0) {
    console.warn(`Đã bỏ qua ${skippedFiles.length} file lỗi:`);
    for (const item of skippedFiles) {
      console.warn(`  • ${item.file} -> ${item.reason}`);
    }
  }
}

runSeed()
  .catch((error) => {
    console.error("Seed thất bại:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });