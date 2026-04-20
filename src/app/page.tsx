"use client";
import ServiceBar from "../components/home/ServiceBar/ServiceBar";
import HeroBanner from "../components/home/HeroBanner/HeroBanner";
import { useEffect, useState } from "react";
import VoucherSection from "../components/home/VoucherSection/VoucherSection";
import CategorySection from "../components/home/CategorySection/CategorySection";
import ProductSection from "../components/home/ProductSection/ProductSection";
import CollectionSection from "../components/home/CollectionSection/CollectionSection";
import MixMatchSection from "../components/home/MixMatchSection/MixMatchSection";
import InstagramSection from "../components/home/InstagramSection/InstagramSection";
import NewsSection from "../components/home/NewsSection/NewsSection";
import { API_BASE_URL } from "../lib/api";

type CollectionItem = {
  _id?: string;
  id?: number;
  slug?: string;
  title?: string;
  name: string;
  image: string;
  link?: string;
};

type NormalizedCollectionItem = {
  _id?: string;
  id?: number;
  slug?: string;
  title: string;
  name: string;
  image: string;
  link: string;
};

type MixMatchItem = {
  slug: string;      // Dùng slug làm định danh chính
  mainImage: string; // Tên trường ảnh chính xác từ Mongo
  title: string;     // Tên bộ phối
  link: string;      // Link dẫn tới /mix-match/[slug]
  id?: number;       // (Tùy chọn) Để không lỗi nếu còn sót dữ liệu cũ
  image?: string;
};


export default function HomePage() {
  const toSlug = (value?: string) =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

  const normalizeCollectionLink = (link?: string, slug?: string) => {
    const fallback = slug ? `/collection/${slug}` : "/collection";
    if (!link) return fallback;

    if (link.startsWith("/collections/")) {
      return link.replace("/collections/", "/collection/");
    }

    return link;
  };

  const bannerData = {
    all: "/images/banners/homepage/banner-all.png",
    skinny: "/images/banners/homepage/banner-skinny.png",
    cool: "/images/banners/homepage/banner-cool.png",
    light: "/images/banners/homepage/banner-light.png",
    stretch: "/images/banners/homepage/banner-stretch.png",
  };

  const tagData = {
    all: "HÀNG MỚI",
    skinny: "SIÊU GỌN NHẸ",
    cool: "SIÊU MÁT",
    light: "SIÊU NHẸ",
    stretch: "SIÊU CO DÃN",
  }

  const [filter, setFilter] = useState("all");
  const [currentBanner, setCurrentBanner] = useState(bannerData.all);
  const [homeStore, setHomeStore] = useState<string[]>([]);
  const [collections, setCollections] = useState<NormalizedCollectionItem[]>([]);
  const [mixmatchData, setMixmatchData] = useState<MixMatchItem[]>([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [homeStoreRes, collectionsRes, collectionRes, mixmatchRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/homestore`),
          fetch(`${API_BASE_URL}/api/collections`),
          fetch(`${API_BASE_URL}/api/collection`),
          fetch(`${API_BASE_URL}/api/mixmatch`),
        ]);

        const [homeStoreJson, collectionsJson, collectionJson, mixmatchJson] = await Promise.all([
          homeStoreRes.json(),
          collectionsRes.json(),
          collectionRes.json(),
          mixmatchRes.json(),
        ]);

        const homeImages = Array.isArray(homeStoreJson)
          ? homeStoreJson
              .map((item: { image?: string }) => item.image)
              .filter((image): image is string => Boolean(image))
          : [];

        const mergedCollections = [
          ...(Array.isArray(collectionsJson) ? collectionsJson : []),
          ...(Array.isArray(collectionJson) ? collectionJson : []),
        ];

        const normalizedCollections: NormalizedCollectionItem[] = Array.isArray(collectionsJson)
          ? collectionsJson
              .filter((item: CollectionItem) => item?.image && (item?.name || item?.title))
              .map((item: CollectionItem) => {
                const itemSlug = item.slug || toSlug(item.name || item.title);
                return {
                  ...item,
                  slug: itemSlug,
                  title: item.title || item.name || "Bộ sưu tập",
                  link: item.link || `/collection/${itemSlug}` || "/collection"
                };
              })
          : [];

        const normalizedMixMatch = Array.isArray(mixmatchJson)
          ? mixmatchJson.map((item: any) => {
              // Nếu là dữ liệu object đơn (Cấu trúc mới Vy vừa nạp)
              if (item.slug) {
                return {
                  slug: item.slug,
                  mainImage: item.mainImage || item.image || "",
                  title: item.title || "Mix & Match",
                  link: `/mix-match/${item.slug}`
                };
              }
              // Nếu vẫn còn dữ liệu cũ lọt vào (mảng mixmatchData)
              return {
                slug: item.id?.toString() || Math.random().toString(),
                mainImage: item.image || "",
                title: item.title || "Mix & Match",
                link: item.link || "#"
              };
            }).slice(0,4)
          : [];

        setHomeStore(homeStoreJson.map((i: any) => i.image).filter(Boolean));
        setCollections(normalizedCollections); 

        setMixmatchData(normalizedMixMatch);
      } catch (error) {
        console.error("Failed to load homepage data:", error);
      }
    };

    loadHomeData();
  }, [API_BASE_URL]);

  const handleFilterClick = (type: string) => {
    setFilter(type);  
    setCurrentBanner(bannerData[type as keyof typeof bannerData]);
  };

  return (
    <div>
      <HeroBanner images={homeStore} />
      <ServiceBar />
      <VoucherSection />

      <CategorySection 
        bannerImage={currentBanner} 
        onFilterClick={handleFilterClick} 
      />

      <ProductSection 
        filter={filter}
        tag={tagData[filter as keyof typeof tagData]}
      />
      <CollectionSection collections={collections} />
      <MixMatchSection items={mixmatchData} />
      <InstagramSection />
      <NewsSection />
    </div>
  );
}