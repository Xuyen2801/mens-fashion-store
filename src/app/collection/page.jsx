"use client";
"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CollectionPage.module.css";
import { fetchCollection } from "../../lib/api";

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    Promise.all([fetchCollection("collections"), fetchCollection("collection")])
      .then(([detailed, basic]) => {
        const detailedList = Array.isArray(detailed) ? detailed : [];
        const basicList = Array.isArray(basic) ? basic : [];

        const merged = [...detailedList, ...basicList]
          .filter((item) => item?.image && item?.name)
          .map((item) => ({
            ...item,
            slug:
              item.slug ||
              item.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-"),
          }))
          .filter(
            (item, index, arr) =>
              index === arr.findIndex((x) => x.slug === item.slug)
          );

        setCollections(merged);
      })
      .catch((error) => console.error("Failed to load collections:", error));
  }, []);

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.breadcrumbBar}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbNav}>
            <Link href="/" className={styles.blueLink}>Trang chủ</Link>
            <span className={styles.slash}>/</span>
            <Link href="/category" className={styles.blueLink}>Danh mục</Link>
            <span className={styles.slash}>/</span>
            <span className={styles.currentPath}><p>Bộ Sưu Tập Của ICONDENIM</p></span>
          </nav>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>
            BỘ SƯU TẬP CỦA ICONDENIM
          </h1>
        </div>

        <div className={styles.collectionsGrid}>
          {collections.map((item) => (

            <Link
              href={`/collection/${item.slug}`}
              key={item._id}
              className={styles.collectionItem}
            >
              <div className={styles.imgContainer}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.actualImg}
                  priority={item.id <= 3}
                />
              </div>
              <div className={styles.itemMeta}>
                <h3 className={styles.itemTitle}>{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CollectionPage;