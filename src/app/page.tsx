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
  id: number;
  image: string;
  link: string;
};


export default function HomePage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

        const normalizedCollections: NormalizedCollectionItem[] = mergedCollections
          .filter((item: CollectionItem) => item?.image && item?.name)
          .map((item: CollectionItem) => ({
            ...item,
            title: item.title || item.name,
            link: normalizeCollectionLink(item.link, item.slug),
          }))
          .filter(
            (item, index, arr) =>
              index ===
              arr.findIndex((x) =>
                x.slug
                  ? x.slug === item.slug
                  : `${x.name}-${x.image}` === `${item.name}-${item.image}`
              )
          );

        const normalizedMixMatch = Array.isArray(mixmatchJson)
          ? (() => {
              const first = mixmatchJson[0] as { mixmatchData?: MixMatchItem[] } | undefined;
              if (Array.isArray(first?.mixmatchData)) {
                return first.mixmatchData;
              }
              return mixmatchJson as MixMatchItem[];
            })()
          : [];

        setHomeStore(homeImages);
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