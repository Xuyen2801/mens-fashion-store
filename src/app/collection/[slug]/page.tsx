import { fetchCollection } from "../../../lib/api";
import CollectionDetail from "../../../components/Gallery/component-detail";
import Gallery from "../../../components/Gallery/gallery-details";

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

  const aliasMap: Record<string, string> = {
    procool: "procool-new-gen",
    stitch: "stitch-better-together",
    icon105: "icon105-lightweight-collection",
    "smart-jeans": "smart-jeans-collection",
    smartjeans: "smart-jeans-collection",
  };

  const targetSlug = aliasMap[slug.toLowerCase()] || slug;

  const specializedCollection = await safeFetchCollection<any[]>(targetSlug.toUpperCase(), []);
  const specializedDoc = Array.isArray(specializedCollection) ? specializedCollection[0] : undefined;

  const detailCollection = Array.isArray(collections)
    ? collections.find((item) => item.slug?.toLowerCase() === targetSlug.toLowerCase())
    : undefined;

  if (detailCollection) {
    const mergedDetail = {
      ...specializedDoc,
      ...detailCollection,
    };

    return (
      <div>
        <Gallery images={mergedDetail.gallery}/>

        <CollectionDetail data={mergedDetail} />
      </div>
    );
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

  if (!basicCollection && !specializedDoc) {
    return <div>Không tìm thấy bộ sưu tập</div>;
  }

  const fallbackDetail = {
    ...(basicCollection || {}),
    ...(specializedDoc || {}),
  };

  if (
    fallbackDetail.productShowcase &&
    fallbackDetail.styles &&
    fallbackDetail.products &&
    fallbackDetail.looks
  ) {
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