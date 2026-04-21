"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./mixmatch.module.css";

interface Item {
  slug: string;
  mainImage: string;
  title: string;
  link: string;
}

interface Props {
  items: Item[];
  title?: string;
}

export default function MixMatchSection({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section className={styles.section} >
      <h2 className={styles.heading}>Mix & Match</h2>

      <div className={styles.grid} style={{margin:"50px"}}>
        {items.map((item) => (
          <Link 
            href={item.link || "#"} 
            key={item.slug} 
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={item.mainImage}
                alt={item.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.btnWrapper}>
        {/* Sửa link dẫn vào trang Hình 1 (Danh sách tất cả bộ phối) */}
        <Link href="/mix-match" className="btn-see-more-unified">
          Xem thêm
        </Link>
      </div>
    </section>
  );
}