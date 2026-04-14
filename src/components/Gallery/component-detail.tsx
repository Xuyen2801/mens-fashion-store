"use client";
import "../../styles/retroSports.css";
import { useState } from "react";

const DEFAULT_RETRO_DATA = {
    name: "RETRO SPORTS",
    season: "Winter Drop 2026",
    subtitle: "Built For The Bold",
    hero: {
        image: "/images/collection/retro-sport-banner-pc.jpg",
    },
    intro: {
        title: "REWRITE THE STREETS",
        description:
            "Urban Legacy là sự kết hợp giữa tinh thần đường phố hiện đại và chất liệu cao cấp, mang đến diện mạo mạnh mẽ nhưng vẫn tinh tế cho thế hệ mới.",
    },
    galleryImage: "/images/Gallery/retro2.png",
    productShowcase: {
        defaultColor: "green",
        colors: {
            green: { name: "Forest Edge", image: "/images/Gallery/retro3.png" },
            cream: { name: "Soft Sand", image: "/images/Gallery/retro4.png" },
            blue: { name: "Midnight Navy", image: "/images/Gallery/retro5.png" },
            black: { name: "Urban Shadow", image: "/images/Gallery/retro6.png" },
        },
    },
    styles: [
        { name: "Street Minimal", image: "/images/Gallery/retro7.png" },
        { name: "Layered Motion", image: "/images/Gallery/retro8.png" },
        { name: "Modern Explorer", image: "/images/Gallery/retro9.png" },
        { name: "Cold Season Fit", image: "/images/Gallery/retro10.png" },
        { name: "After Dark", image: "/images/Gallery/retro11.png" },
    ],
    products: [
        { id: 1, name: "Urban Polo Signature", image: "/images/Gallery/aothuntron.jpg", price: 219000, oldPrice: 379000 },
        { id: 2, name: "Oxford Shirt Premium", image: "/images/Gallery/aosomi.png", price: 369000 },
        { id: 3, name: "Legacy Cap Limited", image: "/images/Gallery/non.png", price: 299000 },
        { id: 4, name: "Essential Jogger Pro", image: "/images/Gallery/quan.png", price: 339000, oldPrice: 429000 },
    ],
    looks: [
        {
            name: "City Pulse",
            images: [
                "/images/Gallery/look1.png",
                "/images/Gallery/look2.png",
                "/images/Gallery/look3.png",
                "/images/Gallery/look12.png",
            ],
        },
        {
            name: "Downtown Flow",
            images: [
                "/images/Gallery/look5.png",
                "/images/Gallery/look6.png",
                "/images/Gallery/look7.png",
                "/images/Gallery/look8.png",
            ],
        },
    ],
};

export default function CollectionDetail({ data }: { data: any }) {
    const retroData = {
        ...DEFAULT_RETRO_DATA,
        ...(data || {}),
        productShowcase: {
            ...DEFAULT_RETRO_DATA.productShowcase,
            ...(data?.productShowcase || {}),
            colors: {
                ...DEFAULT_RETRO_DATA.productShowcase.colors,
                ...(data?.productShowcase?.colors || {}),
            },
        },
        styles: Array.isArray(data?.styles) && data.styles.length > 0 ? data.styles : DEFAULT_RETRO_DATA.styles,
        products: Array.isArray(data?.products) && data.products.length > 0 ? data.products : DEFAULT_RETRO_DATA.products,
        looks: Array.isArray(data?.looks) && data.looks.length > 0 ? data.looks : DEFAULT_RETRO_DATA.looks,
    };

    const [activeLook, setActiveLook] = useState(0);
    const [activeStyle, setActiveStyle] = useState(0);

    const [activeProduct, setActiveProduct] = useState(
        retroData.productShowcase?.colors?.[
            retroData.productShowcase?.defaultColor
        ]?.image || ""
    );

    const colors = Object.entries(retroData.productShowcase.colors);

    const nextStyle = () => {
        setActiveStyle((prev) => (prev + 1) % data.styles.length);
    };

    const prevStyle = () => {
        setActiveStyle((prev) =>
            prev === 0 ? data.styles.length - 1 : prev - 1
        );
    };

    return (
        <div className="retro-page">

            {/* HERO */}
            <section className="retro-hero">
                <img src={retroData.hero.image} alt={retroData.name} />
                <div className="retro-hero-content">
                    <h1>{retroData.name}</h1>
                    <p className="subtitle">{retroData.subtitle}</p>
                    <span>{retroData.season}</span>
                </div>
            </section>

            {/* INTRO */}
            <section className="retro-intro">
                <h2>{retroData.intro.title}</h2>
                <p>{retroData.intro.description}</p>
            </section>

            {/* GALLERY */}
            <section className="retro-gallery">
                <img src={retroData.galleryImage} alt="Gallery" />
            </section>

            {/* PRODUCT SHOWCASE */}
            <section className="retro-product">
                <div className="product-image">
                    <img src={activeProduct} alt="Product" />
                </div>

                <div className="product-colors">
                    {colors.map(([key, value]: any) => (
                        <button
                            key={key}
                            className={key}
                            onClick={() => setActiveProduct(value.image)}
                        >
                            {value.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* STYLES */}
            <section className="retro-styles">
                <h2>PLAY YOUR STYLES</h2>

                <div className="style-tabs">
                    {retroData.styles.map((style: any, index: number) => (
                        <button
                            key={style.name}
                            className={activeStyle === index ? "active" : ""}
                            onClick={() => setActiveStyle(index)}
                        >
                            {style.name}
                        </button>
                    ))}
                </div>

                <div className="style-slider">
                    <button className="nav prev" onClick={prevStyle}>
                        ‹
                    </button>

                    <img src={retroData.styles[activeStyle].image} alt={retroData.styles[activeStyle].name} />

                    <button className="nav next" onClick={nextStyle}>
                        ›
                    </button>

                    <div className="style-title">
                        {retroData.styles[activeStyle].name}
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="retro-products">
                <div className="products-grid">
                    {retroData.products.map((item: any) => (
                        <div className="product-card" key={item.id}>
                            <div className="card-image">
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="card-info">
                                <h4>{item.name}</h4>

                                <div className="price">
                                    <span className="current">
                                        {item.price.toLocaleString()}đ
                                    </span>

                                    {item.oldPrice && (
                                        <span className="old">
                                            {item.oldPrice.toLocaleString()}đ
                                        </span>
                                    )}
                                </div>
                                <button className="buy-btn">
                                    MUA NGAY <span>+</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* LOOKS */}
            <section className="retro-looks">
                <h2>NEW RULES</h2>

                <div className="look-tabs">
                    {retroData.looks.map((look: any, index: number) => (
                        <button
                            key={look.name}
                            className={activeLook === index ? "active" : ""}
                            onClick={() => setActiveLook(index)}
                        >
                            {look.name}
                        </button>
                    ))}
                </div>

                <div className="look-grid">
                    <div className="look-left">
                        <img
                            src={retroData.looks[activeLook].images[0]}
                            alt=""
                        />
                    </div>

                    <div className="look-right">
                        <img
                            src={retroData.looks[activeLook].images[1]}
                            alt=""
                        />
                        <div className="look-right-bottom">
                            <img
                                src={retroData.looks[activeLook].images[2]}
                                alt=""
                            />
                            <img
                                src={retroData.looks[activeLook].images[3]}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}