"use client";
import ServiceBar from "../components/home/ServiceBar/ServiceBar";
import HeroBanner from "../components/home/HeroBanner/HeroBanner";
import { useState } from "react";
import homeStore from "../data/Banner/homeStore";
import VoucherSection from "../components/home/VoucherSection/VoucherSection";
import CategorySection from "../components/home/CategorySection/CategorySection";
import ProductSection from "../components/home/ProductSection/ProductSection";
import CollectionSection from "../components/home/CollectionSection/CollectionSection";
import collections from "../data/collection";
import MixMatchSection from "../components/home/MixMatchSection/MixMatchSection";
import mixmatchData from "../data/mixmatch";

export default function HomePage() {

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
    </div>
  );
}