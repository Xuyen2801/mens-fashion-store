"use client";

import { useState } from "react";
import styles from "./CategorySection.module.css";
import { jeansFilters } from "../../../data/product-quan/filter_quan"; 
import filterItems from "@/data/filterItems";      

interface Props {
  bannerImage: string;
  onFilterClick: (type: string, banner: string) => void;
}

function CategorySection({ bannerImage, onFilterClick }: Props) {
  const [active, setActive] = useState("all");

  const currentBanner = jeansFilters.find(f => f.id === active)?.banner || jeansFilters[0].banner;

  const handleClick = (type: string) => {
    setActive(type);
    const selectedFilter = jeansFilters.find(f => f.id === type);
    onFilterClick(type, selectedFilter?.banner || "");
  };

  return (
    <section className={styles.container}>
      <div className={styles.bannerWrapper}>
        <div className={styles.imageFrame}>
          <img
            src={currentBanner}
            alt="Smart Jeans Banner"
            className={styles.banner}
          />
        </div>

        <div className={styles.filterBar}>
          {filterItems.map((item) => (
            <div
              key={item.value}
              className={styles.filterItem}
              onClick={() => handleClick(item.value)}
            >
              <img 
                src={active === item.value ? item.on : item.off} 
                alt={item.value}
                className={styles.filterIcon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;