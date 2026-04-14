import Link from "next/link"
import Image from "next/image"
import styles from "./mixmatch.module.css"

interface Item {
  id: number
  image: string
  link: string
}

interface Props {
  items: Item[]
}

export default function MixMatchSection({ items }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Mix & Match Đón Tết</h2>

      <div className={styles.grid}>
        {items.map(item => (
          <Link href={item.link} key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt="mix-match"
                fill
                className={styles.image}
              />
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.btnWrapper}>
        <Link href="/collection/tet" className="btn-see-more-unified">
          Xem thêm
        </Link>
      </div>
    </section>
  )
}