"use client";
import "../../styles/retroSports.css";
import Image from "next/image";
import { useState } from "react";
import sanphamPYS from "../../data/Gallery/sanphamPYS";
import retroLook from "../../data/Gallery/retroLook";

export default function GalleryPage() {
  const productImages = {
  green: "/images/Gallery/retro3.png",
  cream: "/images/Gallery/retro4.png",
  blue: "/images/Gallery/retro5.png",
  black: "/images/Gallery/retro6.png",
};
const [activeLook, setActiveLook] = useState(0);
const [activeProduct, setActiveProduct] = useState(productImages.green);
const styles = [
  {
    name: "Campus Classic",
    image: "/images/Gallery/retro7.png",
  },
  {
    name: "Everyday Ready",
    image: "/images/Gallery/retro8.png",
  },
  {
    name: "Everyday Hangout",
    image: "/images/Gallery/retro9.png",
  },
  {
    name: "Easy Layers",
    image: "/images/Gallery/retro10.png",
  },
  {
    name: "Always Cool",
    image: "/images/Gallery/retro11.png",
  },
  {
    name: "Weekend Mode",
    image: "/images/Gallery/retro12.png",
  },
  {
    name: "Play Together",
    image: "/images/Gallery/retro13.png",
  },

];

const [activeStyle, setActiveStyle] = useState(0);

const nextStyle = () => {
  setActiveStyle((prev) => (prev + 1) % styles.length);
};

const prevStyle = () => {
  setActiveStyle((prev) =>
    prev === 0 ? styles.length - 1 : prev - 1
  );
};
  return (
    <div className="retro-page">
      {/* HERO */}
      <section className="retro-hero">
        <img src="/images/Gallery/retro1.png" alt="Retro Sports" />
        <div className="retro-hero-content">
          <h1>RETRO SPORTS</h1>
          <p className="subtitle">The Playbook – New Rules</p>
          <span>Fall Collection 2025</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="retro-marquee">
        <div className="track">
          <span>FALL COLLECTION 2025</span>
          <span>RETRO SPORTS</span>
          <span>FALL COLLECTION 2025</span>
          <span>RETRO SPORTS</span>
        </div>
      </div>

      {/* INTRO */}
      <section className="retro-intro">
        <h2>NEW SEASON - NEW STYLE</h2>
        <p>
          Retro Sports không chỉ là trang phục mà là cách thể hiện phong cách sống, nơi chất cổ điển gặp gỡ tinh thần thời trang hiện đại.
        </p>
      </section>

      {/* GALLERY */}
      <section className="retro-gallery">
        <img src="/images/Gallery/retro2.png" />
      </section>

      {/* PRODUCT SHOWCASE SECTION */}
<section className="retro-product">
  <div className="product-image">
    <img src={activeProduct} alt="Retro Jacket" />
  </div>

  <div className="product-colors">
    <button
      className="green"
      onClick={() => setActiveProduct(productImages.green)}
    >
      Eden Green
    </button>

    <button
      className="cream"
      onClick={() => setActiveProduct(productImages.cream)}
    >
      Marshmallow
    </button>

    <button
      className="blue"
      onClick={() => setActiveProduct(productImages.blue)}
    >
      Dark Blue
    </button>

    <button
      className="black"
      onClick={() => setActiveProduct(productImages.black)}
    >
      Moonless Night
    </button>
  </div>
</section>
        {/* MARQUEE */}
      <div className="retro-marquee">
        <div className="track">
          <span>FALL COLLECTION 2025</span>
          <span>RETRO SPORTS</span>
          <span>FALL COLLECTION 2025</span>
          <span>RETRO SPORTS</span>
        </div>
      </div>
      {/* PLAY YOUR STYLES */}
<section className="retro-styles">
  <h2>PLAY YOUR STYLES</h2>
  <p className="styles-sub">Mix it your way, own the game</p>

  {/* STYLE TABS */}
  <div className="style-tabs">
    {styles.map((item, index) => (
      <button
        key={item.name}
        className={activeStyle === index ? "active" : ""}
        onClick={() => setActiveStyle(index)}
      >
        {item.name}
      </button>
    ))}
  </div>

  {/* SLIDER */}
  <div className="style-slider">
    <button className="nav prev" onClick={prevStyle}>‹</button>

    <img
      src={styles[activeStyle].image}
      alt={styles[activeStyle].name}
    />

    <button className="nav next" onClick={nextStyle}>›</button>

    <div className="style-title">
      {styles[activeStyle].name}
    </div>
  </div>
</section>
      {/* PRODUCT CARDS */}
<section className="retro-products">
  <div className="products-grid">
    {sanphamPYS.map((item) => (
      <div className="product-card" key={item.id}>
        <div className="card-image">
          <img src={item.image} alt={item.name} />
          <span className="heart">♡</span>
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
          <section className="retro-looks">
  <h2>NEW RULES</h2>

  {/* LOOK TABS */}
  <div className="look-tabs">
    {retroLook.map((look, index) => (
      <button
        key={look.name}
        className={activeLook === index ? "active" : ""}
        onClick={() => setActiveLook(index)}
      >
        {look.name}
      </button>
    ))}
  </div>

  {/* LOOK GRID */}
  <div className="look-grid">
    {/* LEFT BIG IMAGE */}
    <div className="look-left">
      <img src={retroLook[activeLook].images[0]} alt="" />
    </div>

    {/* RIGHT */}
    <div className="look-right">
      <img src={retroLook[activeLook].images[1]} alt="" />
      <div className="look-right-bottom">
        <img src={retroLook[activeLook].images[2]} alt="" />
        <img src={retroLook[activeLook].images[3]} alt="" />
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
}