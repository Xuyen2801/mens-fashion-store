import Link from "next/link"
import ProductCard from "../../Product/ProductCard"
import products from "../../../data/promotions"
import styles from "./ProductSection.module.css"

interface Props {
  filter: string
  tag: string
}

function ProductSection({ filter, tag }: Props) {

  const filtered = products.filter((p) => {
    if (filter === "all") {
      return p.category === "all"
    }
    return p.category === filter
  })

  const displayProducts =
    filter === "all" ? filtered.slice(0, 5) : filtered

  return (
    <section className={styles.section}>
      
      {/* {tag && <h2 style={{ marginBottom: "20px" }}>{tag}</h2>} */}

      <div className={styles.grid}>
        {displayProducts.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            name={p.name}
            price={p.price}
            salePrice={p.salePrice}
            status={p.status}
          />
        ))}
      </div>

      {filter === "all" && (
        <div className={styles.btnWrapper}>
          <Link href={`/products?category=${filter}`}>
            <button className={styles.button}>
              Xem tất cả
            </button>
          </Link>
        </div>
      )}
    </section>
  )
}

export default ProductSection