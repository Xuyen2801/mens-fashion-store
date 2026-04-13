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

const CART_COLLECTION = "carts";

app.get("/api/cart/:userId", async (req, res) => {
  try {
    const cartCol = mongoose.connection.db.collection(CART_COLLECTION);
    const cart = await cartCol.findOne({ userId: req.params.userId });
    if (cart) {
      res.json(cart);
    } else {
      res.json({ items: [], selectedItemKeys: [] });
    }
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy giỏ hàng" });
  }
});

app.post("/api/cart/sync", async (req, res) => {
  const { userId, cartState } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Thiếu userId" });
  }
  try {
    const cartCol = mongoose.connection.db.collection(CART_COLLECTION);
    await cartCol.updateOne(
      { userId: userId },
      {
        $set: {
          items: cartState.items,
          selectedItemKeys: cartState.selectedItemKeys,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log(`Đã đồng bộ giỏ hàng cho user: ${userId}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Lỗi cập nhật giỏ hàng:", err);
    res.status(500).json({ message: "Lỗi cập nhật giỏ hàng" });
  }
});

app.patch("/api/orders/:id/cancel", async (req, res) => {
  const { id } = req.params;
  const { status, reason, customerEmail } = req.body;

  try {
    const ordersCol = mongoose.connection.db.collection("orders");

    const filter = {
      $or: [
        { id: id },
        { _id: id.length === 24 ? new mongoose.Types.ObjectId(id) : null }
      ].filter(Boolean)
    };

    const result = await ordersCol.updateOne(filter, {
      $set: {
        status: status,
        cancelReason: reason,
        updatedAt: new Date().toISOString()
      }
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng để hủy" });
    }


    const mailOptions = {
      from: '"ICON DENIM Support" <khavy05092005@gmail.com>',
      to: customerEmail,
      subject: `Thông báo hủy đơn hàng #${id}`,
      html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px;">
          <h2 style="color: #d9534f;">THÔNG BÁO HỦY ĐƠN HÀNG</h2>
          <p>Chào bạn, chúng tôi rất tiếc phải thông báo rằng đơn hàng <b>#${id}</b> của bạn đã bị hủy.</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #d9534f; margin: 20px 0;">
            <p style="margin: 0;"><b>Lý do hủy:</b> ${reason}</p>
          </div>
          <p>Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua số hotline hoặc phản hồi email này.</p>
          <p>Trân trọng,<br>Đội ngũ ICON DENIM</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Đã hủy đơn và gửi mail thành công" });
  } catch (err) {
    console.error("Lỗi khi hủy đơn hàng:", err);
    res.status(500).json({ message: "Lỗi Server khi hủy đơn" });
  }
});

app.post("/api/vouchers", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const vouchersCol = db.collection("vouchers");

    const data = req.body;

    const newVoucher = {
      ...data,
      createdAt: new Date().toISOString(),
      status: "active"
    };

    const result = await vouchersCol.insertOne(newVoucher);

    res.status(201).json({
      success: true,
      data: { ...newVoucher, _id: result.insertedId }
    });
  } catch (err) {
    console.error("Lỗi tạo voucher:", err);
    res.status(500).json({ message: "Lỗi Server: Không thể tạo voucher" });
  }
});


app.delete("/api/vouchers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = mongoose.connection.db;
    const vouchersCol = db.collection("vouchers");
    const filter = {
      $or: [
        { _id: id.length === 24 ? new mongoose.Types.ObjectId(id) : null },
        { id: id }
      ].filter(Boolean)
    };

    const result = await vouchersCol.deleteOne(filter);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy voucher để xóa" });
    }

    console.log(`🗑️ Đã xóa voucher: ${id}`);
    res.json({ success: true, message: "Xóa voucher thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa voucher:", err);
    res.status(500).json({ message: "Lỗi Server khi xóa voucher" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const orderCol = mongoose.connection.db.collection("orders");
    const newOrder = {
      ...req.body,
      orderDate: new Date().toISOString(),
      status: "Processing"
    };
    const result = await orderCol.insertOne(newOrder);
    res.status(201).json({ success: true, orderId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo đơn hàng" });
  }
});

// Thêm địa chỉ mới
app.post("/api/users/:userId/addresses", async (req, res) => {
  const { userId } = req.params;
  const newAddress = { ...req.body };
  try {
    const usersCol = mongoose.connection.db.collection("users");
    const result = await usersCol.updateOne(
      { userId: userId },
      { $push: { addresses: newAddress } }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: "Không thấy user" });
    res.json({ success: true, address: newAddress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cập nhật địa chỉ
app.patch("/api/users/:userId/addresses/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;
  const updatedData = req.body;

  try {
    const usersCol = mongoose.connection.db.collection("users");

    if (updatedData.isDefault) {
      await usersCol.updateOne(
        { userId: userId },
        { $set: { "addresses.$[].isDefault": false } }
      );
    }

    const result = await usersCol.updateOne(
      { userId: userId, "addresses.id": addressId },
      { $set: { "addresses.$": { ...updatedData, id: addressId } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy user hoặc địa chỉ" });
    }

    res.json({ success: true, message: "Cập nhật địa chỉ thành công!" });
  } catch (err) {
    console.error("Lỗi cập nhật địa chỉ:", err);
    res.status(500).json({ error: err.message });
  }
});


// Xóa địa chỉ
app.delete("/api/users/:userId/addresses/:addressId", async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    const usersCol = mongoose.connection.db.collection("users");
    await usersCol.updateOne(
      { userId: userId },
      { $pull: { addresses: { id: addressId } } }
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/vouchers", async (req, res) => {
  try {
    const vouchers = await mongoose.connection.db.collection("vouchers").find({}).toArray();
    console.log("Backend đã gửi dữ liệu:", vouchers);
    res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/mixmatch/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const db = mongoose.connection.db;

    const mixMatch = await db.collection("mixmatch").findOne({ slug: slug });
    if (!mixMatch) return res.status(404).json({ message: "Không tìm thấy bộ phối" });

    const productCollections = ["ao-thun", "kaki", "tay", "ao-khoac", "jean", "short", "jogger", "hoodie", "ao-polo"];

    const detailedProducts = await Promise.all(
      mixMatch.items.map(async (item) => {
        const colName = item.category;

        const parentDoc = await db.collection(colName).findOne({
          "products.id": item.product_id
        });

        if (parentDoc && parentDoc.products) {
          const product = parentDoc.products.find(p => p.id === item.product_id);
          if (product) {
            return { ...product, category: colName };
          }
        }
        return null;
      })
    );

    res.json({
      ...mixMatch,
      fullProducts: detailedProducts.filter(p => p !== null)
    });
  } catch (err) {
    console.error("Lỗi API MixMatch:", err);
    res.status(500).json({ message: "Lỗi Server" });
  }
});

app.get("/api/orders/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const ordersCol = mongoose.connection.db.collection("orders");
    const userOrders = await ordersCol.find({
      $or: [
        { userId: userId },
        { userId: userId }
      ]
    }).toArray();
    res.json(userOrders);
  } catch (err) {
    console.error("Lỗi lấy đơn hàng:", err);
    res.status(500).json({ message: "Lỗi server khi lấy đơn hàng" });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ordersCol = mongoose.connection.db.collection("orders");

    const order = await ordersCol.findOne({
      $or: [
        { id: id },
        { _id: id.length === 24 ? new mongoose.Types.ObjectId(id) : null }
      ].filter(Boolean)
    });

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server" });
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
    const firstAddress = payload.addresses && payload.addresses.length > 0
      ? toText(payload.addresses[0].detail)
      : "";
    const passwordHash = toText(payload.passwordHash);

    if (!phone || !email || !fullName || !passwordHash) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc (Phone, Email, Tên hoặc Mật khẩu)." });
    }

    const duplicated = await usersCollection.findOne({
      $or: [{ phone }, { email }],
    });

    if (duplicated) {
      return res.status(409).json({ message: "Số điện thoại hoặc email đã tồn tại." });
    }

    const now = new Date().toISOString();
    const newUser = {
      id: toText(payload.id) || toText(payload.userId) || new Types.ObjectId().toString(),
      userId: toText(payload.userId) || toText(payload.id) || new Types.ObjectId().toString(),
      phone,
      fullName,
      email,
      addresses: [
        {
          id: "addr_" + Date.now(),
          receiverName: toText(payload.fullName),
          phone: normalizePhone(payload.phone),
          detail: firstAddress,
          province: toText(payload.province),
          district: toText(payload.district),
          ward: toText(payload.ward),
          isDefault: true
        }
      ],
      passwordHash,
      role: toText(payload.role) || "customer",
      createdAt: toText(payload.createdAt) || now,
      updatedAt: toText(payload.updatedAt) || now,
      schemaVersion: Number(payload.schemaVersion) || 1,
    };



    await usersCollection.insertOne(newUser);
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ message: "Không thể tạo user." });
  }
});


app.patch("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const ordersCol = mongoose.connection.db.collection("orders");

    const filter = {
      $or: [
        { id: id },
        { _id: id.length === 24 ? new mongoose.Types.ObjectId(id) : null }
      ].filter(Boolean)
    };

    const result = await ordersCol.updateOne(filter, {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString()
      }
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng để cập nhật" });
    }

    res.json({ success: true, message: "Đã cập nhật đơn hàng thành công" });
  } catch (err) {
    console.error("Lỗi cập nhật đơn hàng:", err);
    res.status(500).json({ message: "Lỗi Server khi cập nhật đơn hàng" });
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
    return res.status(500).json({ message: "Không thể cập nhật user." });
  }
});

app.patch("/api/users/:userId/measurements", async (req, res) => {
  const { userId } = req.params;
  const measurements = req.body;

  try {
    const usersCol = mongoose.connection.db.collection("users");
    const result = await usersCol.updateOne(
      { userId: userId },
      {
        $set: {
          measurements: measurements,
          updatedAt: new Date().toISOString()
        }
      }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: "Không tìm thấy user" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/send-order-success', async (req, res) => {
  const { email, order } = req.body;

  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.product.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.selectedSize} / ${item.selectedColor}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${new Intl.NumberFormat('vi-VN').format((item.product.salePrice || item.product.price) * item.quantity)}đ</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: '"ICON DENIM Order" <khavy05092005@gmail.com>',
    to: email,
    subject: `Xác nhận đơn hàng #${order.id} - Cảm ơn bạn đã mua sắm!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
        <h2 style="text-align: center; color: #000;">CẢM ƠN BẠN ĐÃ ĐẶT HÀNG!</h2>
        <p>Chào <b>${order.shippingInfo.fullName}</b>,</p>
        <p>Đơn hàng <b>#${order.id}</b> của bạn đã được nhận và đang trong quá trình xử lý.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #f8f8f8;">
              <th style="text-align: left; padding: 10px;">Sản phẩm</th>
              <th style="padding: 10px;">Size/Màu</th>
              <th style="padding: 10px;">SL</th>
              <th style="text-align: right; padding: 10px;">Giá</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>

        <div style="text-align: right; font-size: 16px;">
          <p>Tạm tính: ${new Intl.NumberFormat('vi-VN').format(order.subtotal)}đ</p>
          <p>Phí vận chuyển: ${new Intl.NumberFormat('vi-VN').format(order.shippingFee)}đ</p>
          <p>Giảm giá: -${new Intl.NumberFormat('vi-VN').format(order.discount)}đ</p>
          <h3 style="color: #d9534f;">Tổng cộng: ${new Intl.NumberFormat('vi-VN').format(order.total)}đ</h3>
        </div>

        <div style="background: #f9f9f9; padding: 15px; margin-top: 20px; border-radius: 5px;">
          <p style="margin: 0;"><b>Địa chỉ nhận hàng:</b></p>
          <p style="margin: 5px 0 0 0;">${order.shippingInfo.address}, ${order.shippingInfo.ward}, ${order.shippingInfo.district}, ${order.shippingInfo.city}</p>
          <p style="margin: 5px 0 0 0;">Số điện thoại: ${order.shippingInfo.phone}</p>
        </div>
        
        <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">
          Đây là email tự động, vui lòng không phản hồi email này.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Đã gửi mail xác nhận!" });
  } catch (error) {
    console.error("Lỗi gửi mail đơn hàng:", error);
    res.status(500).json({ error: "Không thể gửi email thông báo." });
  }
});

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

    if (localData.length > 0) {
      return res.json(localData);
    }

    return res.json([]);
  } catch (err) {
    console.error(` API error for /api/${req.params.collection}:`, err.message);
    res.json([]);
  }
});

app.post("/api/products/add-to-collection", async (req, res) => {
  try {
    const productData = req.body;
    const { category } = productData;

    if (!category) {
      return res.status(400).json({ message: "Thiếu thông tin Category (Collection)" });
    }

    const db = mongoose.connection.db;
    const result = await db.collection(category).updateOne(
      {},
      {
        $push: {
          products: {
            ...productData,
            createdAt: new Date().toISOString()
          }
        }
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Đã thêm sản phẩm ${productData.id} vào collection ${category}`);
      res.status(201).json({ success: true, message: "Thêm sản phẩm thành công" });
    } else {
      await db.collection(category).insertOne({
        products: [productData]
      });
      res.status(201).json({ success: true, message: "Đã tạo document mới và thêm sản phẩm" });
    }
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm:", err);
    res.status(500).json({ error: "Lỗi Server không thể thêm sản phẩm" });
  }
});

app.post("/api/products/update", async (req, res) => {
  try {
    const productData = req.body;
    const { category, id } = productData;

    if (!category || !id) {
      return res.status(400).json({ message: "Thiếu Category hoặc ID sản phẩm" });
    }

    const db = mongoose.connection.db;

    const result = await db.collection(category).updateOne(
      { "products.id": id },
      {
        $set: {
          "products.$": {
            ...productData,
            updatedAt: new Date().toISOString()
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm trong hệ thống" });
    }

    if (result.modifiedCount > 0) {
      console.log(`✅ Đã cập nhật sản phẩm ${id} thành công`);
      res.json({ success: true, message: "Cập nhật sản phẩm thành công" });
    } else {
      res.json({ success: true, message: "Không có thay đổi nào được thực hiện" });
    }
  } catch (err) {
    console.error("Lỗi khi cập nhật sản phẩm:", err);
    res.status(500).json({ error: "Lỗi Server không thể cập nhật sản phẩm" });
  }
});

app.get("/", (req, res) => res.send("API Running..."));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
