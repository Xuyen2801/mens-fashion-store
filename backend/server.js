const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const nodemailer = require('nodemailer');
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const { Types } = mongoose;

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "Yes" : "No");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Atlas Connected Successfully"))
  .catch(err => console.error("MongoDB Error:", err.message));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠ MongoDB disconnected. API will return empty arrays until reconnected.");
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khavy05092005@gmail.com',
    pass: 'dmgndsnbceqhmngn'
  }
});

app.post('/api/auth/send-otp', async (req, res) => {
  const { email, otp } = req.body;
  console.log("Đang yêu cầu gửi mã đến:", email);

  const mailOptions = {
    from: '"ICON DENIM Support" <icondenim@gmail.com>',
    to: email,
    subject: 'Mã xác nhận đăng ký tài khoản',
    html: `
      <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
        <h2 style="color: #000;">XÁC THỰC EMAIL</h2>
        <p>Chào bạn, mã OTP của bạn là:</p>
        <h1 style="color: #000; letter-spacing: 5px;">${otp}</h1>
        <p>Mã này có hiệu lực trong 5 phút. Vui lòng không chia sẻ cho bất kỳ ai.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Đã gửi mail thành công!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Không thể gửi email." });
  }
});

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

function mapUserDoc(doc) {
  return {
    ...doc,
    id: toText(doc.id) || String(doc._id),
  };
}

async function getUsersCollection() {
  if (!mongoose.connection?.db) {
    return null;
  }

  return mongoose.connection.db.collection("users");
}

app.get("/users", async (_req, res) => {
  try {
    const usersCollection = await getUsersCollection();

    if (!usersCollection) {
      return res.json([]);
    }

    const docs = await usersCollection.find({}).toArray();
    return res.json(docs.map(mapUserDoc));
  } catch (err) {
    console.error("❌ API error for /users:", err.message);
    return res.json([]);
  }
});

app.post("/users", async (req, res) => {
  try {
    const usersCollection = await getUsersCollection();

    if (!usersCollection) {
      return res.status(503).json({ message: "MongoDB chưa sẵn sàng." });
    }

    const payload = req.body || {};
    const phone = normalizePhone(payload.phone);
    const email = normalizeEmail(payload.email);
    const fullName = toText(payload.fullName);
    const address = toText(payload.address);
    const passwordHash = toText(payload.passwordHash);

    if (!phone || !email || !fullName || !address || !passwordHash) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    const duplicated = await usersCollection.findOne({
      $or: [{ phone }, { email }],
    });

    if (duplicated) {
      return res.status(409).json({ message: "Số điện thoại hoặc email đã tồn tại." });
    }

    const now = new Date().toISOString();
    const newUser = {
      id: toText(payload.id) || new Types.ObjectId().toString(),
      phone,
      fullName,
      email,
      address,
      passwordHash,
      role: toText(payload.role) || "customer",
      createdAt: toText(payload.createdAt) || now,
      updatedAt: toText(payload.updatedAt) || now,
      schemaVersion: Number(payload.schemaVersion) || 1,
    };

    await usersCollection.insertOne(newUser);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error("❌ API error for POST /users:", err.message);
    return res.status(500).json({ message: "Không thể tạo user." });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const usersCollection = await getUsersCollection();

    if (!usersCollection) {
      return res.status(503).json({ message: "MongoDB chưa sẵn sàng." });
    }

    const userId = toText(req.params.id);
    const updates = req.body || {};
    const updateDoc = { ...updates, updatedAt: new Date().toISOString() };

    if (updateDoc.phone) {
      updateDoc.phone = normalizePhone(updateDoc.phone);
    }

    if (updateDoc.email) {
      updateDoc.email = normalizeEmail(updateDoc.email);
    }

    const filter = { id: userId };
    const result = await usersCollection.updateOne(filter, { $set: updateDoc });

    if (result.matchedCount === 0 && Types.ObjectId.isValid(userId)) {
      const objectIdFilter = { _id: new Types.ObjectId(userId) };
      const fallbackResult = await usersCollection.updateOne(objectIdFilter, { $set: updateDoc });

      if (fallbackResult.matchedCount === 0) {
        return res.status(404).json({ message: "Không tìm thấy user." });
      }
    } else if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy user." });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ API error for PATCH /users/:id:", err.message);
    return res.status(500).json({ message: "Không thể cập nhật user." });
  }
});


// API lấy dữ liệu theo collection (không phân biệt hoa thường)
// ✅ Fallback to local JSON files if MongoDB unavailable
app.get("/api/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection.toLowerCase();
    const fs = require("fs");
    const filePath = path.join(__dirname, `../data-migration/${collectionName}.json`);

    const toKey = (item) => {
      const slug = String(item?.slug || "").trim().toLowerCase();
      if (slug) return slug;

      return String(item?.name || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    };

    let localData = [];
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(jsonData);
      localData = Array.isArray(parsed) ? parsed : [parsed];
    }

    // 1️⃣ Try MongoDB first
    if (mongoose.connection?.db) {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const target = collections.find(c => c.name.toLowerCase() === collectionName);

      if (target) {
        const data = await mongoose.connection.db
          .collection(target.name)
          .find({})
          .toArray();

        if (data && data.length > 0) {
          if (localData.length === 0) {
            return res.json(data);
          }

          // Merge Mongo + local JSON: keep Mongo values, fill missing fields from local
          const localMap = new Map(localData.map((item) => [toKey(item), item]));
          const mergedMongo = data.map((item) => {
            const localItem = localMap.get(toKey(item));
            return localItem ? { ...localItem, ...item } : item;
          });

          const mongoKeySet = new Set(mergedMongo.map((item) => toKey(item)));
          const localOnly = localData.filter((item) => !mongoKeySet.has(toKey(item)));

          return res.json([...mergedMongo, ...localOnly]);
        }
      }
    }

    // 2️⃣ Fallback to local JSON files from data-migration folder
    if (localData.length > 0) {
      return res.json(localData);
    }

    // 3️⃣ Return empty array as last resort
    return res.json([]);
  } catch (err) {
    console.error(` API error for /api/${req.params.collection}:`, err.message);
    res.json([]);
  }
});

app.get("/", (req, res) => res.send("API Running..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

