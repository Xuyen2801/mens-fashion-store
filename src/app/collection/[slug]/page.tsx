import { fetchCollection } from "../../../lib/api";
import CollectionDetail from "../../../components/Gallery/component-detail";
import Gallery from "../../../components/Gallery/gallery-details";
import ProductCard from "../../../components/Product/ProductCard";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const safeFetchCollection = async <T,>(name: string, fallback: T): Promise<T> => {
    try {
      return await fetchCollection<T>(name);
    } catch {
      return fallback;
    }
  };

  const [collections, basicCollections] = await Promise.all([
    safeFetchCollection<any[]>("collections", []),
    safeFetchCollection<any[]>("collection", []),
  ]);

  const hasRichCollectionSchema = (value: any) => {
    if (!value || typeof value !== "object") return false;

    // ✅ Có content nếu có products hoặc looks hoặc gallery
    const hasProducts = Array.isArray(value.products) && value.products.length > 0;
    const hasLooks = Array.isArray(value.looks) && value.looks.length > 0;
    const hasGallery = Array.isArray(value.gallery) && value.gallery.length > 0;

    return hasProducts || hasLooks || hasGallery;
  };

  // 🗺️ aliasMap: Map slug cũ -> new collection slug
  // Use case: URL cũ (procool) cần redirect đến collection mới (procool-new-gen)
  // Nên dùng object map thay vì redirect: performance tớt hơn + preserve URL
  // VD: ?????????????://domain.com/collection/procool
  //     -> fetch data từ collection "procool-new-gen" thay vì "procool"
  const aliasMap: Record<string, string> = {
    procool: "procool-new-gen",
    stitch: "stitch-better-together",
    icon105: "icon105-lightweight-collection",
    "smart-jeans": "smart-jeans-collection",
    smartjeans: "smart-jeans-collection", // Alias không có dash cũng map được
  };

  // Tím slug thực tế: Check alias trước, không có thì dùng slug gốc
  const targetSlug = aliasMap[slug.toLowerCase()] || slug;
  const normalizedTargetSlug = targetSlug.toLowerCase();
  const isProCoolCollection = normalizedTargetSlug === "procool" || normalizedTargetSlug === "procool-new-gen";
  const isStitchCollection = normalizedTargetSlug === "stitch" || normalizedTargetSlug === "stitch-better-together";
  const isSpecialCollection = isProCoolCollection || isStitchCollection;

  const specializedCollection = await safeFetchCollection<any[]>(targetSlug.toUpperCase(), []);
  const specializedDoc = Array.isArray(specializedCollection) ? specializedCollection[0] : undefined;

  const detailCollection = Array.isArray(collections)
    ? collections.find((item) => item.slug?.toLowerCase() === targetSlug.toLowerCase())
    : undefined;

  if (detailCollection && !isSpecialCollection) {
    // 🔧 Fix merge order: detailCollection (collection data) > specializedDoc (rich schema)
    // This ensures each collection shows its own data, not another collection's defaults
    const mergedDetail = {
      ...detailCollection,
      ...(specializedDoc && specializedDoc.looks ? { looks: specializedDoc.looks } : {}),
      ...(specializedDoc && specializedDoc.products ? { products: specializedDoc.products } : {}),
      ...(specializedDoc && specializedDoc.productShowcase ? { productShowcase: specializedDoc.productShowcase } : {}),
      ...(specializedDoc && specializedDoc.styles ? { styles: specializedDoc.styles } : {}),
    };

    const hasDetailTemplateData =
      (Array.isArray(mergedDetail.products) && mergedDetail.products.length > 0) ||
      (Array.isArray(mergedDetail.looks) && mergedDetail.looks.length > 0) ||
      (Array.isArray(mergedDetail.styles) && mergedDetail.styles.length > 0) ||
      Boolean(mergedDetail.productShowcase);

    const hasGalleryData = Array.isArray(mergedDetail.gallery) && mergedDetail.gallery.length > 0;

    if (hasDetailTemplateData) {
      return (
        <div>
          <Gallery images={mergedDetail.gallery} />
          <CollectionDetail data={mergedDetail} />
        </div>
      );
    }

    if (hasGalleryData) {
      return (
        <main className="max-w-7xl mx-auto px-4 py-10 space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{mergedDetail.name}</h1>
          <Gallery images={mergedDetail.gallery} />
        </main>
      );
    }

    if (!hasRichCollectionSchema(mergedDetail)) {
      return (
        <main className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">{mergedDetail.name}</h1>
          <img
            src={mergedDetail.image}
            alt={mergedDetail.name}
            className="w-full max-w-3xl rounded-lg"
          />
          <p className="mt-4 text-gray-600">Bộ sưu tập này hiện đang được cập nhật nội dung chi tiết.</p>
        </main>
      );
    }
  }

  const normalizedBasic = Array.isArray(basicCollections)
    ? basicCollections.map((item) => ({
        ...item,
        slug:
          item.slug ||
          item.name
            ?.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-"),
      }))
    : [];

  const basicCollection = normalizedBasic.find(
    (item) => item.slug?.toLowerCase() === targetSlug.toLowerCase()
  );

  if (isProCoolCollection) {
    const jeansCollection = await safeFetchCollection<any>("filter_quan", null);

    if (jeansCollection) {
      const jeansFilters = Array.isArray(jeansCollection.jeansFilters) ? jeansCollection.jeansFilters : [];
      const productsJeans = Array.isArray(jeansCollection.productsJeans) ? jeansCollection.productsJeans : [];

      const filterId = "sieu-mat";
      const keyword = /procool/i;

      const defaultMeta = { name: "ProCOOL NEW GEN", image: "/images/collection/6.jpg" };

      const collectionMeta = basicCollection || detailCollection || specializedDoc || defaultMeta;
      const activeFilter = jeansFilters.find((item: any) => item.id === filterId) || jeansFilters[0];
      const bannerImage = activeFilter?.banner || collectionMeta.image || "/images/banners/homepage/banner-all.png";
      const featuredProducts = productsJeans.filter(
        (item: any) => item?.type === filterId || keyword.test(String(item?.name || ""))
      );

      const collectionDescription =
        "Dòng ProCOOL tập trung vào cảm giác mát nhẹ, thoáng khí và form dễ mặc. Nội dung của bộ sưu tập này được lấy trực tiếp từ dữ liệu jeans chuyên biệt thay vì template Retro mặc định.";

      const productTitle = "Sản phẩm ProCOOL";

      return (
        <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
          <section className="space-y-4">
            <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
              <img src={bannerImage} alt={collectionMeta.name} className="w-full h-[320px] md:h-[420px] object-cover" />
            </div>
            <div className="max-w-4xl">
              <p className="text-sm font-semibold tracking-[0.25em] text-gray-500 uppercase">Collection</p>
              <h1 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">{collectionMeta.name}</h1>
              <p className="mt-4 text-gray-600 leading-7">{collectionDescription}</p>
            </div>
          </section>

          {jeansFilters.length > 0 && (
            <section className="flex flex-wrap gap-3">
              {jeansFilters.map((item: any) => (
                <span
                  key={item.id}
                  className={`rounded-full px-4 py-2 text-sm font-medium border ${
                    item.id === filterId ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </section>
          )}

          <section>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{productTitle}</h2>
                <p className="text-gray-600 mt-2">{featuredProducts.length} sản phẩm từ dữ liệu bộ sưu tập.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product.id || product.sku || product.name} product={product} />
              ))}
            </div>
          </section>
        </main>
      );
    }
  }

  if (isStitchCollection) {
    const stitchedData = await safeFetchCollection<any>("productsNew", null);
    const stitchedProducts = Array.isArray(stitchedData?.products)
      ? stitchedData.products
      : Array.isArray(stitchedData)
      ? stitchedData
      : [];

    const collectionMeta = basicCollection || detailCollection || {
      name: "STITCH ++BETTER TOGETHER",
      image: "/images/collection/7.jpg",
    };

    const featuredProducts = stitchedProducts.filter(
      (item: any) => item?.status === "HÀNG MỚI" || /stitch|oversize|street|cargo/i.test(String(item?.name || ""))
    ).slice(0, 12);

    return (
      <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <section className="space-y-4">
          <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-100">
            <img src={collectionMeta.image} alt={collectionMeta.name} className="w-full h-[320px] md:h-[420px] object-cover" />
          </div>
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.25em] text-gray-500 uppercase">Collection</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-bold text-gray-900">{collectionMeta.name}</h1>
            <p className="mt-4 text-gray-600 leading-7">
              STITCH là bộ sưu tập thiên về tinh thần streetwear và phối lớp năng động. Dữ liệu sản phẩm được lấy từ nhóm sản phẩm mới để đảm bảo trang luôn có nội dung hiển thị.
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sản phẩm STITCH</h2>
              <p className="text-gray-600 mt-2">{featuredProducts.length} sản phẩm đang hiển thị.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id || product.sku || product.name} product={product} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (!basicCollection && !specializedDoc) {
    return <div>Không tìm thấy bộ sưu tập</div>;
  }

  const fallbackDetail = {
    ...(basicCollection || {}),
    ...(specializedDoc && specializedDoc.looks ? { looks: specializedDoc.looks } : {}),
    ...(specializedDoc && specializedDoc.products ? { products: specializedDoc.products } : {}),
    ...(specializedDoc && specializedDoc.productShowcase ? { productShowcase: specializedDoc.productShowcase } : {}),
    ...(specializedDoc && specializedDoc.styles ? { styles: specializedDoc.styles } : {}),
  };

  if (hasRichCollectionSchema(fallbackDetail)) {
    return (
      <div>
        <Gallery images={fallbackDetail.gallery} />
        <CollectionDetail data={fallbackDetail} />
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{fallbackDetail.name}</h1>
      <img
        src={fallbackDetail.image}
        alt={fallbackDetail.name}
        className="w-full max-w-3xl rounded-lg"
      />
      <p className="mt-4 text-gray-600">Bộ sưu tập này hiện đang được cập nhật nội dung chi tiết.</p>
    </main>
  );
}