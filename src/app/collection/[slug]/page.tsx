import collections from "../../../data/Gallery/collections";
import CollectionDetail from "../../../components/Gallery/component-detail";
import Gallery from "../../../components/Gallery/gallery-details";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = collections.find(
    (item) => item.slug === slug
  );

  if (!collection) {
    return <div>Không tìm thấy bộ sưu tập</div>;
  }

  return (
    <div>
      <Gallery images={collection.gallery}/>

      <CollectionDetail data={collection} />
    </div>
  );
}