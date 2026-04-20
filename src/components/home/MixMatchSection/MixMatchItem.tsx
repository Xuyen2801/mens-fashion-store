import Link from "next/link";
import Image from "next/image";
import styles from "./mixmatch.module.css";

interface Props {
  image: string; // mainImage truyền vào đây
  title: string;
  link: string;
}

export default function MixMatchItem({ image, title, link }: Props) {
  return (
    <Link href={link} className={styles.item}>
      <div className={styles.imageWrapper}>
        <Image 
          src={image || "/images/placeholder.png"} 
          alt={title} 
          fill 
          className={styles.image}
        />
      </div>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}