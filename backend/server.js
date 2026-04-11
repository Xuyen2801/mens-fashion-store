const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();

app.use(cors());
app.use(express.json());

console.log("MONGO_URI loaded:", process.env.MONGO_URI ? "✅ Yes" : "❌ No");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Error:", err.message));

// API lấy dữ liệu theo collection (không phân biệt hoa thường)
app.get("/api/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection.toLowerCase();

    const collections = await mongoose.connection.db.listCollections().toArray();
    const target = collections.find(c => c.name.toLowerCase() === collectionName);

    if (!target) {
      return res.status(404).json({ error: `Không tìm thấy collection: ${collectionName}` });
    }

    const data = await mongoose.connection.db
      .collection(target.name)
      .find({})
      .toArray();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("API Running..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});