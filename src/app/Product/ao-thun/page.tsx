"use client";

import React, { useState } from "react";
import CollectionBanner from "../../../components/Collection/CollectionBanner";
import ProductFilter from "../../../components/Collection/ProductFilter";
import ProductCard from "../../../components/Product/ProductCard";
import ProductCardModal from "../../../components/modal/ProductCardModal";
import SeeMore from "../../../components/Product/SeeMore";
import FAQAccordion from "../../../components/Product/FAQAccordion";
import Breadcrumb from "../../../components/layout/Breadcrumb";

import { products } from "../../../data/Product/products";
import content from "../../../data/Product/contentSeeMore.json";

import "../../../styles/Product/SeeMore.css";
import "../../../styles/Product/Fad.css";

/* ===== YouTube embed helper ===== */
const getYoutubeEmbed = (url: string) => {
  if (!url) return "";
  if (url.includes("youtu.be"))
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
  if (url.includes("watch?v="))
    return `https://www.youtube.com/embed/${url
      .split("v=")[1]
      .split("&")[0]}`;
  if (url.includes("youtube.com/embed")) return url;
  return url;
};

/* ===== Media renderer ===== */
const renderMedia = (
  media: { type: string; src: string } | undefined,
  alt = ""
) => {
  if (!media) return null;

  if (media.type === "image") {
    return (
      <img
        src={media.src}
        alt={alt}
        className="w-full h-auto rounded-lg"
      />
    );
  }

  if (media.type === "video") {
    const isYoutube =
      media.src.includes("youtube.com") ||
      media.src.includes("youtu.be");

    if (isYoutube) {
      return (
        <div className="relative w-full max-w-[800px] mx-auto rounded-lg overflow-hidden shadow-md">
          <div className="aspect-video relative">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={getYoutubeEmbed(media.src)}
              title={alt || "YouTube video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full max-w-[800px] mx-auto rounded-lg overflow-hidden shadow-md">
        <video
          controls
          src={media.src}
          className="w-full max-h-[300px] object-contain bg-black rounded-lg"
        />
      </div>
    );
  }

  return null;
};

export default function Home() {
  const [selectedProduct, setSelectedProduct] =
    useState<(typeof products)[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 ">
      <main className="flex-grow">
        {/* Breadcrumb */}
        <Breadcrumb
          className="ml-5"
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Danh mục", href: "/collections" },
            { label: "Áo thun nam" }
          ]}
        />

        {/* Banner */}
        <div className="w-full overflow-hidden shadow-lg">
          <CollectionBanner backgroundImage="/images/banners/banner_nhom_sp_ao_thunjpg.jpg" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="my-8 md:my-10 lg:my-12">
            <ProductFilter
              conditions={["Giá thấp đến cao", "Giá cao đến thấp", "Mới nhất"]}
            />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 pb-10 lg:pb-16">
            {products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
                onClick={() => setSelectedProduct(product)}
              >
                <ProductCard
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  salePrice={product.salePrice}
                  status={product.status}
                />
              </div>
            ))}
          </div>


          {/* See more */}
          <div className="body py-10 border-t border-gray-200">
            <SeeMore maxHeight={700}>
              {content.sections.map((section, index) => {
                switch (section.type) {
                  case "hero":
                    return (
                      <section key={index} className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                          {section.title}
                        </h1>
                        <p className="text-lg text-gray-700">
                          {section.description}
                        </p>
                      </section>
                    );

                  case "intro":
                    return (
                      <section key={index} className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                          {section.title}
                        </h2>
                        {section.content?.map((text, i) => (
                          <p key={i} className="text-gray-600 mb-3">
                            {text}
                          </p>
                        ))}
                      </section>
                    );

                  default:
                    return (
                      <section key={index} className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6">
                          {section.title}
                        </h2>

                        {section.items?.map((item: any, i: number) => (
                          <div key={i} className="mb-8">
                            <h3 className="text-xl font-medium mb-2">
                              {item.name || item.step}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {item.description}
                            </p>
                            {renderMedia(
                              item.media,
                              item.name || section.title
                            )}
                          </div>
                        ))}

                        {section.groups?.map((group: any, i: number) => (
                          <div key={i} className="mb-8">
                            <h3 className="text-xl font-medium mb-4">
                              {group.title}
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                              {group.items.map(
                                (item: string, j: number) => (
                                  <li key={j} className="text-gray-600">
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                            {renderMedia(group.media, group.title)}
                          </div>
                        ))}
                      </section>
                    );
                }
              })}
            </SeeMore>

            <section className="faq-section mt-16">
              <h2 className="text-3xl font-bold text-center mb-10">
                FAQ – Áo thun ICONDENIM
              </h2>
              <FAQAccordion />
            </section>
          </div>
        </div>

        {/* ===== MODAL ===== */}
        {selectedProduct && (

          <ProductCardModal
            isOpen={true}
            onClose={() => setSelectedProduct(null)}
            product={selectedProduct}
          />
        )}
      </main>
    </div>
  );
}
