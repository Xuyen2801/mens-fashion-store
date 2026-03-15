"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CategorySection.module.css";

interface Props {
  bannerImage: string;
  onFilterClick: (type: string) => void;
}

function CategorySection({bannerImage, onFilterClick}: Props) {
  const [active, setActive] = useState("all");
  const router = useRouter();

  const handleClick = (type: string) => {
    setActive(type);
    onFilterClick(type); 
  };

  const handleBannerClick = () => {
    router.push("/products"); 
  };

  return (
    <section className={styles.section}>
      
      {/* Sự kiện chuyển trang khi click banner */}
      <img
        src={bannerImage}
        alt="Smart Jeans"
        className={styles.banner}
        onClick={handleBannerClick}
      />

      {/* Filter bar */}
      <div className={styles.filterBar}>
        {[
          { label: "TẤT CẢ JEANS", value: "all" },
          { label: "SIÊU GỌN NHẸ", value: "skinny" },
          { label: "SIÊU MÁT", value: "cool" },
          { label: "SIÊU NHẸ", value: "light" },
          { label: "SIÊU CO DÃN", value: "stretch" },
        ].map((item) => (
          <button
            key={item.value}
            className={`${styles.filterButton} ${
              active === item.value ? styles.active : ""
            }`}
            onClick={() => handleClick(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;