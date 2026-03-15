"use client";
import "../../styles/retroSports.css";
import { useState } from "react";

export default function CollectionDetail({ data }: { data: any }) {
    if (!data.productShowcase || !data.styles || !data.products || !data.looks) {
        return null;
    }
    const [activeLook, setActiveLook] = useState(0);
    const [activeStyle, setActiveStyle] = useState(0);

    const [activeProduct, setActiveProduct] = useState(
        data.productShowcase?.colors?.[
            data.productShowcase?.defaultColor
        ]?.image || ""
    );

    const colors = Object.entries(data.productShowcase.colors);

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
                <img src={data.hero.image} alt={data.name} />
                <div className="retro-hero-content">
                    <h1>{data.name}</h1>
                    <p className="subtitle">{data.subtitle}</p>
                    <span>{data.season}</span>
                </div>
            </section>

            {/* INTRO */}
            <section className="retro-intro">
                <h2>{data.intro.title}</h2>
                <p>{data.intro.description}</p>
            </section>

            {/* GALLERY */}
            <section className="retro-gallery">
                <img src={data.galleryImage} alt="Gallery" />
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
                    {data.styles.map((style: any, index: number) => (
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

                    <img
                        src={data.styles[activeStyle].image}
                        alt={data.styles[activeStyle].name}
                    />

                    <button className="nav next" onClick={nextStyle}>
                        ›
                    </button>

                    <div className="style-title">
                        {data.styles[activeStyle].name}
                    </div>
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="retro-products">
                <div className="products-grid">
                    {data.products.map((item: any) => (
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
                    {data.looks.map((look: any, index: number) => (
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
                            src={data.looks[activeLook].images[0]}
                            alt=""
                        />
                    </div>

                    <div className="look-right">
                        <img
                            src={data.looks[activeLook].images[1]}
                            alt=""
                        />
                        <div className="look-right-bottom">
                            <img
                                src={data.looks[activeLook].images[2]}
                                alt=""
                            />
                            <img
                                src={data.looks[activeLook].images[3]}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}