"use client";
import ServiceBar from "../../components/Home/ServiceBar/ServiceBar";
import HeroBanner from "../../components/Home/HeroBanner/HeroBanner";
import { useState } from "react";
import homeStore from "../../data/Banner/homeStore";
import VoucherSection from "../../components/Home/VoucherSection/VoucherSection";
import CategorySection from "../../components/Home/CategorySection/CategorySection";
import ProductSection from "../../components/Home/ProductSection/ProductSection";
import CollectionSection from "../../components/Home/CollectionSection/CollectionSection";
import collections from "../../data/collection";
import MixMatchSection from "../../components/Home/MixMatchSection/MixMatchSection";
import mixmatchData from "../../data/mixmatch";
import InstagramSection from "../../components/home/InstagramSection/InstagramSection";
import NewsSection from "../../components/home/NewsSection/NewsSection";


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
      <InstagramSection />
      <NewsSection />
    </div>
  );
}