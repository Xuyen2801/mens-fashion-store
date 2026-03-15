import React from 'react';
import styles from './NewsSection.module.css';
import newsData from '../../../data/news';

const NewsSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.mainTitle}>Tin Thời Trang</h2>
      <div className={styles.newsGrid}>
        {newsData.map((item) => (
          <a href={item.url} key={item.id} className={styles.newsCard}>
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