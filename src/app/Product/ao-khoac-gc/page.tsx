"use client";

import React, { useState } from "react";
import CollectionBanner from "../../../components/Collection/CollectionBanner";
import ProductFilter from "../../../components/Collection/ProductFilter";
import ProductCard from "../../../components/Product/ProductCard";
import ProductCardModal from "../../../components/modal/ProductCardModal";
import SeeMore from "../../../components/Product/SeeMore";
import FAQAccordion from "../../../components/Product/FAQAccordion";
import Breadcrumb from "../../../components/layout/Breadcrumb";

import { IoCaretDownOutline } from "react-icons/io5";

import content from "../../../data/Product/Ao-khoac/contentSeeMoreAoKhoac";
import faqaothun from "../../../data/Product/Ao-khoac/aoKhoacFAQ";
import products from "../../../data/Product/Ao-khoac/productsAoKhoac";
import "../../../styles/Product/SeeMore.css";
import "../../../styles/Product/Fad.css";

export default function Home() {

    console.log("Content data:", content);
    console.log("Sections:", content?.sections);
    console.log("Is array?", Array.isArray(content?.sections));
    const FILTER_OPTIONS = [
        { label: "Sản phẩm nổi bật", value: "default" },
        { label: "Giá thấp đến cao", value: "price_asc" },
        { label: "Giá cao đến thấp", value: "price_desc" },
        { label: "Mới nhất", value: "newest" },
        { label: "Đang giảm giá", value: "sale" },
        { label: "Hàng HOT", value: "hot" },
    ];
    const [filter, setFilter] = useState("default");
    const filteredProducts = React.useMemo(() => {
        let result = [...products];

        switch (filter) {
            case "price_asc":
                result.sort((a, b) => a.salePrice - b.salePrice);
                break;

            case "price_desc":
                result.sort((a, b) => b.salePrice - a.salePrice);
                break;

            case "newest":
                // id lớn hơn = sản phẩm mới hơn
                result.sort((a, b) => b.id - a.id);
                break;

            case "sale":
                result = result.filter(p => p.salePrice < p.price);
                break;

            case "hot":
                result = result.filter(p => p.status === "HOT");
                break;

            default:
                break;
        }

        return result;
    }, [filter]);


    const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
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

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 ">
            <main className="flex-grow">
                {/* Breadcrumb */}
                <Breadcrumb
                    className="ml-5"
                    items={[
                        { label: "Trang chủ", href: "/" },
                        { label: "Danh mục", href: "/collections" },
                        { label: "Áo khoác nam" }
                    ]}
                />

                {/* Banner */}
                <div className="w-full overflow-hidden shadow-lg">
                    <CollectionBanner backgroundImage="/images/banners/2000x900_-_banner_nhom_sp_-_ao_khoac.jpg" />
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter */}
                    <div className="my-6 flex justify-end">
                        <ProductFilter
                            conditions={FILTER_OPTIONS}
                            value={filter}
                            onChange={setFilter}
                        />
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 pb-10 lg:pb-16">
                        {filteredProducts.map((product) => (
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
                            {Array.isArray(content?.sections) &&
                                content.sections.map((section: any, index: number) => {
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
                                                    {section.content?.map((text: string, i: number) => (
                                                        <p key={i} className="text-gray-600 mb-3">
                                                            {text}
                                                        </p>
                                                    ))}
                                                </section>
                                            );

                                        case "guide":
                                            return (
                                                <section key={index} className="mb-12">
                                                    <h2 className="text-2xl font-semibold mb-6">
                                                        {section.title}
                                                    </h2>
                                                    <ol className="list-decimal pl-6 space-y-3 mb-6">
                                                        {section.steps?.map((step: string, i: number) => (
                                                            <li key={i} className="text-gray-600">
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ol>
                                                    {section.media && renderMedia(section.media, section.title)}
                                                </section>
                                            );

                                        case "service":
                                            return (
                                                <section key={index} className="mb-12">
                                                    <h2 className="text-2xl font-semibold mb-6">
                                                        {section.title}
                                                    </h2>
                                                    <ul className="list-disc pl-6 space-y-3 mb-6">
                                                        {section.content?.map((item: string, i: number) => (
                                                            <li key={i} className="text-gray-600">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {section.media && renderMedia(section.media, section.title)}
                                                </section>
                                            );

                                        case "cta":
                                            return (
                                                <section key={index} className="mb-10 text-center bg-gray-100 p-8 rounded-lg">
                                                    <h2 className="text-2xl font-semibold mb-4">
                                                        {section.title}
                                                    </h2>
                                                    <p className="text-gray-600 text-lg">
                                                        {section.description}
                                                    </p>
                                                </section>
                                            );

                                        case "product_list":
                                            return (
                                                <section key={index} className="mb-12">
                                                    <h2 className="text-2xl font-semibold mb-6">
                                                        {section.title}
                                                    </h2>
                                                    {section.items?.map((item: any, i: number) => (
                                                        <div key={i} className="mb-8">
                                                            <h3 className="text-xl font-medium mb-2">
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-gray-600 mb-4">
                                                                {item.description}
                                                            </p>
                                                            {item.media && renderMedia(item.media, item.name)}
                                                        </div>
                                                    ))}
                                                </section>
                                            );

                                        case "style_guide":
                                            return (
                                                <section key={index} className="mb-12">
                                                    <h2 className="text-2xl font-semibold mb-6">
                                                        {section.title}
                                                    </h2>
                                                    {section.groups?.map((group: any, i: number) => (
                                                        <div key={i} className="mb-8">
                                                            <h3 className="text-xl font-medium mb-4">
                                                                {group.title}
                                                            </h3>
                                                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                                                {group.items?.map((item: string, j: number) => (
                                                                    <li key={j} className="text-gray-600">
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            {group.media && renderMedia(group.media, group.title)}
                                                        </div>
                                                    ))}
                                                </section>
                                            );

                                        default:
                                            return null;
                                    }
                                })}
                        </SeeMore>
                        <section className="faq-section mt-16">
                            <h2 className="text-3xl font-bold text-center mb-10">
                                FAQ – Áo thun ICONDENIM
                            </h2>
                            <div className="body">
                                <div className="faq-accordion">
                                    {faqaothun.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`faq-item ${openIndex === index ? "active" : ""}`}
                                        >
                                            <button
                                                className="faq-question"
                                                onClick={() => toggleAccordion(index)}
                                                aria-expanded={openIndex === index}
                                            >
                                                {item.title}
                                                <span className="faq-icon">
                                                    <IoCaretDownOutline />
                                                </span>
                                            </button>

                                            <div className="faq-answer">
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
