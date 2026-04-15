"use client";

import { useEffect, useState } from "react";
import styles from "./CategorySection.module.css";
import { fetchCollection } from "../../../lib/api";

interface Props {
  bannerImage: string;
  onFilterClick: (type: string, banner: string) => void;
}

type JeansFilter = {
  id: string;
  label: string;
  banner: string;
};

type FilterItem = {
  value: string;
  on: string;
  off: string;
};

function CategorySection({ bannerImage, onFilterClick }: Props) {
  const [active, setActive] = useState("all");
  const [jeansFilters, setJeansFilters] = useState<JeansFilter[]>([]);
  const [filterItems, setFilterItems] = useState<FilterItem[]>([]);

  useEffect(() => {
    fetchCollection("filter_quan")
      .then((data) => {
        const list = Array.isArray(data) ? data[0]?.jeansFilters ?? data : [];
        setJeansFilters(Array.isArray(list) ? list : []);
      })
      .catch((error) => console.error("Failed to load jeans filters:", error));

    fetchCollection("filterItems")
      .then((data) => {
        const list = Array.isArray(data) ? data[0]?.filterItems ?? data : [];
        setFilterItems(Array.isArray(list) ? list : []);
      })
      .catch((error) => console.error("Failed to load filter icons:", error));
  }, []);

  const currentBanner =
    jeansFilters.find((f) => f.id === active)?.banner || bannerImage;

  const handleClick = (type: string) => {
    setActive(type);
    const selectedFilter = jeansFilters.find((f) => f.id === type);
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