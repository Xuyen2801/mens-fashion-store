"use client";

import React, { useEffect, useState } from 'react';
import styles from './NewsSection.module.css';
import { fetchCollection } from '../../../lib/api';

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchCollection('news')
      .then((data) => {
        const list = Array.isArray(data) ? data[0]?.newsData ?? data : [];
        setNewsData(Array.isArray(list) ? list : []);
      })
      .catch((error) => console.error('Failed to load news:', error));
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.mainTitle}>Tin Thời Trang</h2>
      <div className={styles.newsGrid}>
        {newsData.map((item) => (
          <a href={item.url} key={item._id} className={styles.newsCard}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.newsImage} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <p className={styles.date}>{item.date}</p>
              <p className={styles.description}>{item.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;