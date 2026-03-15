"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CollectionPage.module.css";
import collections from "../../data/Gallery/collections";

const CollectionPage = () => {
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
                key={item.id}
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