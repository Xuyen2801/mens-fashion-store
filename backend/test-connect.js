const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://mongobasic:12345678%40iconDemin@cluster0.b2fi4.mongodb.net/shopDB?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Kết nối MongoDB Atlas THÀNH CÔNG!");

    const db = client.db("shopDB");
    const collections = await db.listCollections().toArray();
    console.log("📋 Collections có:", collections.map(c => c.name));
  } catch (err) {
    console.log("❌ Lỗi:", err.message);
  } finally {
    await client.close();
  }
}

run();