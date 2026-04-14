const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });

const MONGO_URI = process.env.MONGO_URI;
const TARGET_DB_NAME = process.env.MONGO_TARGET_DB || "IconDenim";
const SOURCE_DIR = path.resolve(__dirname, "../data-migration");
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const IS_DRY_RUN = process.argv.includes("--dry-run");
const AO_THUN_FALLBACK_IMAGES = [
  "/images/productcart/2.jpg",
  "/images/productcart/3.jpg",
  "/images/productcart/4.jpg",
  "/images/productcart/5.jpg",
  "/images/productcart/6.jpg",
  "/images/productcart/7.jpg",
  "/images/productcart/8.jpg",
  "/images/productcart/9.jpg",
  "/images/productcart/10.jpg",
  "/images/productcart/11.jpg",
];

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI in .env.local");
}

function toText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toSlug(value) {
  return toText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function readJsonFile(fileName) {
  const filePath = path.join(SOURCE_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
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

function addMedia(mediaMap, productKey, mediaUrl, mediaType, sortOrder) {
  const url = toText(mediaUrl);
  if (!url) {
    return;
  }

  const key = `${productKey}|${url}`;
  if (!mediaMap.has(key)) {
    mediaMap.set(key, {
      productKey,
      type: mediaType,
      url,
      sortOrder,
    });
  }
}

function publicAssetExists(assetUrl) {
  const url = toText(assetUrl);
  if (!url || !url.startsWith("/")) {
    return false;
  }

  return fs.existsSync(path.resolve(PUBLIC_DIR, `.${url}`));
}

function resolvePublicAsset(assetUrl, fallbackUrl) {
  const url = toText(assetUrl);
  if (publicAssetExists(url)) {
    return url;
  }

  return toText(fallbackUrl);
}

function normalizeAoThunLegacyDoc(doc) {
  const products = toArray(doc.products).map((product, index) => {
    const fallbackImage = AO_THUN_FALLBACK_IMAGES[index % AO_THUN_FALLBACK_IMAGES.length];
    const primaryImage = resolvePublicAsset(product.image, fallbackImage);
    const images = toArray(product.images)
      .map((image) => resolvePublicAsset(image, primaryImage))
      .filter(Boolean);

    const normalizedColors = toArray(product.colors).map((color) => {
      if (!color || typeof color !== "object") {
        return color;
      }

      return {
        ...color,
        thumbnail: resolvePublicAsset(color.thumbnail, primaryImage),
      };
    });

    const normalizedVariants = toArray(product.variants).map((variant) => {
      if (!variant || typeof variant !== "object") {
        return variant;
      }

      const variantImage = resolvePublicAsset(variant.image || variant.thumbnail, primaryImage);

      return {
        ...variant,
        image: variantImage,
        thumbnail: resolvePublicAsset(variant.thumbnail, variantImage),
      };
    });

    return {
      ...product,
      image: primaryImage,
      images: images.length > 0 ? images : [primaryImage],
      colors: normalizedColors,
      variants: normalizedVariants.length > 0 ? normalizedVariants : product.variants,
    };
  });

  return {
    ...doc,
    products,
  };
}

function buildStockBySize(sizes, outOfStockSizes) {
  const outOfStockSet = new Set(toArray(outOfStockSizes).map((size) => toText(size)));
  const stockBySize = {};

  toArray(sizes).forEach((size) => {
    const normalizedSize = toText(size);
    if (!normalizedSize) {
      return;
    }
    stockBySize[normalizedSize] = outOfStockSet.has(normalizedSize) ? 0 : null;
  });

  return stockBySize;
}

function createProductKey(product) {
  const sku = toText(product.sku);
  const slug = toText(product.slug);
  const name = toText(product.name);

  if (sku) {
    return `sku:${sku.toLowerCase()}`;
  }

  if (slug) {
    return `slug:${slug.toLowerCase()}`;
  }

  return `name:${toSlug(name)}`;
}

function mergeProduct(target, source) {
  const merged = { ...target };

  const fields = [
    "productId",
    "sku",
    "slug",
    "name",
    "category",
    "price",
    "salePrice",
    "status",
    "material",
    "fit",
    "brand",
    "description",
  ];

  fields.forEach((field) => {
    const incoming = source[field];
    if (incoming === undefined || incoming === null || incoming === "") {
      return;
    }

    if (field === "price" || field === "salePrice") {
      merged[field] = toNumber(incoming, merged[field] || 0);
      return;
    }

    if (!merged[field] || String(merged[field]).length < String(incoming).length) {
      merged[field] = incoming;
    }
  });

  const sourceFiles = new Set([...(merged.sourceFiles || []), ...(source.sourceFiles || [])]);
  merged.sourceFiles = [...sourceFiles];

  return merged;
}

function extractProducts() {
  const productSources = [
    { file: "productsAll.json", path: [] },
    { file: "ao-thun.json", path: ["products"] },
    { file: "ao-polo.json", path: ["products"] },
    { file: "ao-khoac.json", path: ["products"] },
    { file: "jean.json", path: ["products"] },
    { file: "jogger.json", path: ["products"] },
    { file: "kaki.json", path: ["products"] },
    { file: "boxer.json", path: ["products"] },
    { file: "short.json", path: ["products"] },
    { file: "tay.json", path: ["products"] },
    { file: "so-mi.json", path: ["products"] },
    { file: "set-do.json", path: ["products"] },
    { file: "hoodie.json", path: ["products"] },
    { file: "filter_quan.json", path: ["productsJeans"] },
    { file: "sanphamPYS.json", path: ["products"] },
  ];

  const productsByKey = new Map();
  const mediaMap = new Map();
  const variantMap = new Map();

  for (const source of productSources) {
    const json = readJsonFile(source.file);
    if (!json) {
      continue;
    }

    let list = json;
    for (const segment of source.path) {
      list = list?.[segment];
    }

    if (!Array.isArray(list)) {
      continue;
    }

    for (const item of list) {
      const rawName = toText(item.name);
      if (!rawName) {
        continue;
      }

      const productKey = createProductKey(item);
      const normalizedProduct = {
        productKey,
        productId: item.id != null ? String(item.id) : "",
        name: rawName,
        category: toText(item.category) || "uncategorized",
        price: toNumber(item.price),
        salePrice: toNumber(item.salePrice, toNumber(item.price)),
        status: toText(item.status),
        material: toText(item.material),
        fit: toText(item.fit),
        brand: toText(item.brand),
        description: toText(item.description),
        sourceFiles: [source.file],
      };

      const sku = toText(item.sku);
      const slug = toText(item.slug) || toSlug(rawName);

      if (sku) {
        normalizedProduct.sku = sku;
      }

      if (slug) {
        normalizedProduct.slug = slug;
      }

      const existing = productsByKey.get(productKey);
      productsByKey.set(
        productKey,
        existing ? mergeProduct(existing, normalizedProduct) : normalizedProduct
      );

      addMedia(mediaMap, productKey, item.image, "image", 0);
      toArray(item.images).forEach((image, index) => {
        addMedia(mediaMap, productKey, image, "image", index + 1);
      });

      if (Array.isArray(item.variants) && item.variants.length > 0) {
        item.variants.forEach((variant, index) => {
          const colorName = toText(variant.color || variant.name || `variant-${index + 1}`);
          const sizes = toArray(variant.sizes);
          const variantKey = `${productKey}|${colorName.toLowerCase()}`;
          variantMap.set(variantKey, {
            productKey,
            colorName,
            colorThumbnail: toText(variant.thumbnail || variant.image),
            sizes: sizes.map((s) => toText(s)).filter(Boolean),
            stockBySize: buildStockBySize(sizes, []),
          });
        });
      } else {
        const colors = toArray(item.colors);
        const sizes = toArray(item.sizes);
        const outOfStockSizes = toArray(item.outOfStockSizes);

        if (colors.length > 0) {
          colors.forEach((color, index) => {
            const colorName = toText(color?.name || color || `color-${index + 1}`);
            const colorThumbnail = toText(color?.thumbnail);
            const variantKey = `${productKey}|${colorName.toLowerCase()}`;
            variantMap.set(variantKey, {
              productKey,
              colorName,
              colorThumbnail,
              sizes: sizes.map((s) => toText(s)).filter(Boolean),
              stockBySize: buildStockBySize(sizes, outOfStockSizes),
            });
          });
        } else if (sizes.length > 0) {
          const variantKey = `${productKey}|default`;
          variantMap.set(variantKey, {
            productKey,
            colorName: "Default",
            colorThumbnail: "",
            sizes: sizes.map((s) => toText(s)).filter(Boolean),
            stockBySize: buildStockBySize(sizes, outOfStockSizes),
          });
        }
      }
    }
  }

  return {
    products: [...productsByKey.values()],
    productMedia: [...mediaMap.values()],
    productVariants: [...variantMap.values()],
  };
}

function extractCategories(products) {
  const categoriesBySlug = new Map();

  products.forEach((product) => {
    const categoryName = toText(product.category) || "uncategorized";
    const slug = toSlug(categoryName) || "uncategorized";

    if (!categoriesBySlug.has(slug)) {
      categoriesBySlug.set(slug, {
        categoryKey: `cat:${slug}`,
        slug,
        name: categoryName,
      });
    }

    product.categorySlug = slug;
    product.categoryKey = `cat:${slug}`;
  });

  return [...categoriesBySlug.values()];
}

function extractUsers() {
  const json = readJsonFile("user.json");
  const users = toArray(json?.users);
  const usersByIdentity = new Map();

  users.forEach((user) => {
    const phone = normalizePhone(user.phone);
    const email = normalizeEmail(user.email);
    const userId = toText(user.id);

    const identityKey = phone || email || userId;
    if (!identityKey) {
      return;
    }

    usersByIdentity.set(identityKey, {
      userId: userId || `u:${identityKey}`,
      phone,
      email,
      fullName: toText(user.fullName),
      address: toText(user.address),
      passwordHash: toText(user.password),
      role: toText(user.role) || "customer",
      createdAt: toText(user.createdAt) || new Date().toISOString(),
      updatedAt: toText(user.updatedAt) || toText(user.createdAt) || new Date().toISOString(),
    });
  });

  return [...usersByIdentity.values()];
}

function extractCollections(products) {
  const collectionDocs = [];
  const galleryDocs = [];
  const collectionProducts = [];

  const byProductName = new Map();
  products.forEach((product) => {
    byProductName.set(toSlug(product.name), product.productKey);
  });

  const collectionsJson = toArray(readJsonFile("collections.json"));
  const collectionJson = toArray(readJsonFile("collection.json"));

  const collectionMap = new Map();

  function upsertCollection(collectionLike) {
    const slug = toText(collectionLike.slug) || toSlug(collectionLike.name);
    if (!slug) {
      return null;
    }

    const current = collectionMap.get(slug) || {
      collectionKey: `col:${slug}`,
      slug,
      name: toText(collectionLike.name),
      image: toText(collectionLike.image),
      season: toText(collectionLike.season),
      subtitle: toText(collectionLike.subtitle),
    };

    if (!current.name) current.name = toText(collectionLike.name);
    if (!current.image) current.image = toText(collectionLike.image);
    if (!current.season) current.season = toText(collectionLike.season);
    if (!current.subtitle) current.subtitle = toText(collectionLike.subtitle);

    collectionMap.set(slug, current);
    return current;
  }

  collectionsJson.forEach((item) => {
    const collection = upsertCollection(item);
    if (!collection) {
      return;
    }

    toArray(item.gallery).forEach((image, index) => {
      const imageUrl = toText(image);
      if (!imageUrl) return;
      galleryDocs.push({
        collectionKey: collection.collectionKey,
        imageUrl,
        type: "gallery",
        lookName: "",
        sortOrder: index,
      });
    });
  });

  collectionJson.forEach((item) => {
    const collection = upsertCollection(item);
    if (!collection) {
      return;
    }

    if (item.image) {
      galleryDocs.push({
        collectionKey: collection.collectionKey,
        imageUrl: toText(item.image),
        type: "cover",
        lookName: "",
        sortOrder: 0,
      });
    }
  });

  [
    { file: "AIRFLEX.json", slug: "airflex" },
    { file: "RETRO.json", slug: "retro" },
  ].forEach((source) => {
    const json = readJsonFile(source.file);
    if (!json) {
      return;
    }

    const collection = upsertCollection({
      slug: source.slug,
      name: source.slug.toUpperCase(),
      image: "",
    });

    if (!collection) {
      return;
    }

    toArray(json.looks).forEach((look, lookIndex) => {
      toArray(look.images).forEach((image, imageIndex) => {
        const imageUrl = toText(image);
        if (!imageUrl) return;
        galleryDocs.push({
          collectionKey: collection.collectionKey,
          imageUrl,
          type: "lookbook",
          lookName: toText(look.name),
          sortOrder: lookIndex * 100 + imageIndex,
        });
      });
    });

    toArray(json.products).forEach((card, index) => {
      const productKey = byProductName.get(toSlug(card.name));
      if (!productKey) {
        return;
      }

      collectionProducts.push({
        collectionKey: collection.collectionKey,
        productKey,
        sortOrder: index,
      });
    });
  });

  toArray(readJsonFile("retroLook.json")).forEach((look, lookIndex) => {
    const retroCollection = collectionMap.get("retro") || upsertCollection({ slug: "retro", name: "RETRO" });
    toArray(look.images).forEach((image, imageIndex) => {
      const imageUrl = toText(image);
      if (!imageUrl) return;
      galleryDocs.push({
        collectionKey: retroCollection.collectionKey,
        imageUrl,
        type: "lookbook",
        lookName: toText(look.name),
        sortOrder: 1000 + lookIndex * 100 + imageIndex,
      });
    });
  });

  collectionMap.forEach((collection) => collectionDocs.push(collection));

  const dedupGallery = new Map();
  galleryDocs.forEach((item) => {
    const key = `${item.collectionKey}|${item.imageUrl}`;
    if (!dedupGallery.has(key)) {
      dedupGallery.set(key, item);
    }
  });

  const dedupCollectionProducts = new Map();
  collectionProducts.forEach((item) => {
    const key = `${item.collectionKey}|${item.productKey}`;
    if (!dedupCollectionProducts.has(key)) {
      dedupCollectionProducts.set(key, item);
    }
  });

  return {
    collections: collectionDocs,
    collectionGallery: [...dedupGallery.values()],
    collectionProducts: [...dedupCollectionProducts.values()],
  };
}

function extractPageContent() {
  const files = [
    "ao-thun.json",
    "ao-polo.json",
    "ao-khoac.json",
    "jean.json",
    "jogger.json",
    "kaki.json",
    "boxer.json",
    "short.json",
    "tay.json",
    "so-mi.json",
    "set-do.json",
    "hoodie.json",
    "productsNew.json",
    "productsOutLet.json",
  ];

  const pageFaqs = [];
  const pageSections = [];
  const shippingMethods = [];
  const paymentMethods = [];

  files.forEach((file) => {
    const json = readJsonFile(file);
    if (!json || typeof json !== "object") {
      return;
    }

    const pageSlug = toSlug(file.replace(/\.json$/i, ""));

    toArray(json.faqs).forEach((faq, index) => {
      pageFaqs.push({
        pageSlug,
        title: toText(faq.title),
        content: toText(faq.content),
        sortOrder: index,
      });
    });

    toArray(json.pageDetails?.sections).forEach((section, index) => {
      const payload = { ...section };
      delete payload.type;
      delete payload.title;
      delete payload.description;

      pageSections.push({
        pageSlug,
        sectionType: toText(section.type),
        title: toText(section.title),
        description: toText(section.description),
        payload,
        sortOrder: index,
      });
    });

    toArray(json.shippingMethods).forEach((method, index) => {
      shippingMethods.push({
        pageSlug,
        shippingMethodId: method.id != null ? String(method.id) : `${pageSlug}-${index}`,
        name: toText(method.name),
        description: toText(method.description),
        price: toNumber(method.price),
        estimatedDays: toText(method.estimatedDays),
        sortOrder: index,
      });
    });

    toArray(json.paymentMethods).forEach((method, index) => {
      paymentMethods.push({
        pageSlug,
        paymentMethodId: method.id != null ? String(method.id) : `${pageSlug}-${index}`,
        name: toText(method.name),
        icon: toText(method.icon),
        sortOrder: index,
      });
    });
  });

  return { pageFaqs, pageSections, shippingMethods, paymentMethods };
}

function extractVouchers() {
  return toArray(readJsonFile("voucher.json")).map((item) => ({
    voucherId: item.id != null ? String(item.id) : toSlug(item.title),
    title: toText(item.title),
    description: toText(item.description),
    image: toText(item.image),
  }));
}

function extractNews() {
  return toArray(readJsonFile("news.json")?.newsData).map((item) => ({
    newsId: item.id != null ? String(item.id) : toSlug(item.url || item.title),
    title: toText(item.title),
    date: toText(item.date),
    image: toText(item.image),
    description: toText(item.description),
    url: toText(item.url),
  }));
}

function extractPromotionsAndFilters() {
  const promotions = toArray(readJsonFile("configs.json")?.SEASONAL_PROMOTIONS).map((item, index) => ({
    promotionId: `seasonal-${index + 1}`,
    icon: toText(item.icon),
    text: toText(item.text),
    sortOrder: index,
  }));

  const filters = [];

  toArray(readJsonFile("filterItems.json")?.filterItems).forEach((item, index) => {
    filters.push({
      filterId: `base-${toText(item.value) || index}`,
      filterType: "base",
      value: toText(item.value),
      label: toText(item.value),
      onIcon: toText(item.on),
      offIcon: toText(item.off),
      sortOrder: index,
    });
  });

  toArray(readJsonFile("filter_quan.json")?.jeansFilters).forEach((item, index) => {
    filters.push({
      filterId: `jeans-${item.id != null ? String(item.id) : index}`,
      filterType: "jeans",
      value: toSlug(item.label),
      label: toText(item.label),
      banner: toText(item.banner),
      folder: toText(item.folder),
      sortOrder: index,
    });
  });

  return { promotions, filters };
}

function extractLegacyCollections() {
  const legacyFiles = [
    "homeStore.json",
    "headerData.json",
    "mixmatch.json",
    "contentSeeMoreAll.json",
    "configs.json",
    "filterItems.json",
    "filter_quan.json",
    "collection.json",
    "productsAll.json",
    "productsNew.json",
    "productsOutLet.json",
    "voucher.json",
    "AIRFLEX.json",
    "RETRO.json",
    "retroLook.json",
    "sanphamPYS.json",
    "ao-thun.json",
    "ao-polo.json",
    "ao-khoac.json",
    "jean.json",
    "jogger.json",
    "kaki.json",
    "boxer.json",
    "short.json",
    "tay.json",
    "so-mi.json",
    "set-do.json",
    "hoodie.json",
  ];

  const compat = {};

  legacyFiles.forEach((file) => {
    const json = readJsonFile(file);
    if (!json) {
      return;
    }

    const collectionName = file.replace(/\.json$/i, "");
    if (collectionName === "ao-thun" && !Array.isArray(json) && json && typeof json === "object") {
      compat[collectionName] = [normalizeAoThunLegacyDoc(json)];
      return;
    }

    compat[collectionName] = Array.isArray(json) ? json : [json];
  });

  return compat;
}

async function replaceCollection(db, name, docs) {
  const collection = db.collection(name);
  await collection.deleteMany({});
  if (docs.length > 0) {
    await collection.insertMany(docs);
  }
}

async function createIndexes(db) {
  await db.collection("users").createIndex({ userId: 1 }, { unique: true });
  await db.collection("users").createIndex({ phone: 1 }, { unique: true, sparse: true });
  await db.collection("users").createIndex({ email: 1 }, { unique: true, sparse: true });

  await db.collection("categories").createIndex({ slug: 1 }, { unique: true });

  await db.collection("products").createIndex({ productKey: 1 }, { unique: true });
  await db.collection("products").createIndex({ sku: 1 }, { unique: true, sparse: true });
  await db.collection("products").createIndex({ slug: 1 }, { unique: true, sparse: true });
  await db.collection("products").createIndex({ categorySlug: 1 });

  await db.collection("collections").createIndex({ slug: 1 }, { unique: true });
  await db
    .collection("collection_products")
    .createIndex({ collectionKey: 1, productKey: 1 }, { unique: true });
  await db
    .collection("collection_gallery")
    .createIndex({ collectionKey: 1, imageUrl: 1 }, { unique: true });

  await db.collection("vouchers").createIndex({ voucherId: 1 }, { unique: true });
  await db.collection("news").createIndex({ newsId: 1 }, { unique: true });

  await db.collection("page_faqs").createIndex({ pageSlug: 1, sortOrder: 1 });
  await db.collection("page_sections").createIndex({ pageSlug: 1, sortOrder: 1 });
}

async function run() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`);
  }

  const sourceDbName = (() => {
    try {
      return new URL(MONGO_URI).pathname.replace(/^\//, "") || "(unknown)";
    } catch {
      return "(unknown)";
    }
  })();

  console.log(`Source database: ${sourceDbName}`);
  console.log(`Target database: ${TARGET_DB_NAME}`);

  const { products, productMedia, productVariants } = extractProducts();
  const categories = extractCategories(products);
  const users = extractUsers();
  const { collections, collectionGallery, collectionProducts } = extractCollections(products);
  const { pageFaqs, pageSections, shippingMethods, paymentMethods } = extractPageContent();
  const vouchers = extractVouchers();
  const news = extractNews();
  const { promotions, filters } = extractPromotionsAndFilters();
  const legacyCollections = extractLegacyCollections();

  const dataset = {
    users,
    categories,
    products,
    product_media: productMedia,
    product_variants: productVariants,
    collections,
    collection_products: collectionProducts,
    collection_gallery: collectionGallery,
    page_faqs: pageFaqs,
    page_sections: pageSections,
    shipping_methods: shippingMethods,
    payment_methods: paymentMethods,
    vouchers,
    news,
    promotions,
    filters,
    ...legacyCollections,
  };

  console.log("Prepared dataset:");
  Object.entries(dataset).forEach(([name, docs]) => {
    console.log(`- ${name}: ${docs.length}`);
  });

  if (IS_DRY_RUN) {
    console.log("Dry-run mode enabled. No data written to MongoDB.");
    return;
  }

  const client = new MongoClient(MONGO_URI);
  await client.connect();

  try {
    const db = client.db(TARGET_DB_NAME);

    for (const [name, docs] of Object.entries(dataset)) {
      await replaceCollection(db, name, docs);
    }

    await createIndexes(db);
    console.log("Import completed successfully.");
  } finally {
    await client.close();
  }
}

run().catch((error) => {
  console.error("Import failed:", error.message);
  process.exitCode = 1;
});
