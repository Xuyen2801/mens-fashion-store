"use client";
import ServiceBar from "../../components/home/ServiceBar/ServiceBar";
import HeroBanner from "../../components/home/HeroBanner/HeroBanner";
import { useEffect, useState } from "react";
import VoucherSection from "../../components/home/VoucherSection/VoucherSection";
import CategorySection from "../../components/home/CategorySection/CategorySection";
import ProductSection from "../../components/home/ProductSection/ProductSection";
import CollectionSection from "../../components/home/CollectionSection/CollectionSection";
import MixMatchSection from "../../components/home/MixMatchSection/MixMatchSection";
import InstagramSection from "../../components/home/InstagramSection/InstagramSection";
import NewsSection from "../../components/home/NewsSection/NewsSection";
import { API_BASE_URL } from "../../lib/api";

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
  slug: string;      
  mainImage: string; 
  title: string;     
  link: string;      
  id?: number;       
  image?: string;
};


export default function HomePage() {
  const apiBaseUrl = API_BASE_URL;

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
        const [homeStoreRes, collectionsRes, mixmatchRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/homestore`),
          fetch(`${apiBaseUrl}/api/collections`),
          fetch(`${apiBaseUrl}/api/mixmatch`),
        ]);

        const [homeStoreJson, collectionsJson, mixmatchJson] = await Promise.all([
          homeStoreRes.json(),
          collectionsRes.json(),
          mixmatchRes.json(),
        ]);

        const homeImages = Array.isArray(homeStoreJson)
          ? homeStoreJson
              .map((item: { image?: string }) => item.image)
              .filter((image): image is string => Boolean(image))
          : [];

        const normalizedCollections: NormalizedCollectionItem[] = Array.isArray(collectionsJson)
          ? collectionsJson
              .filter((item: CollectionItem) => item?.image && item?.name)
              .map((item: CollectionItem) => ({
                ...item,
                slug: item.slug || toSlug(item.name),
                title: item.title || item.name,
                link: normalizeCollectionLink(item.link, item.slug || toSlug(item.name)),
              }))
          : [];

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
  }, [apiBaseUrl]);

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