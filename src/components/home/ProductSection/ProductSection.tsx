import ProductCard from "../../Product/ProductCard"
import { productsJeans } from "../../../data/product-quan/filter_quan" 
import styles from "./ProductSection.module.css"

interface Props {
  filter: string;
  tag: string;
}

function ProductSection({ filter, tag }: Props) {
  // 1. Lọc sản phẩm
  const filtered = productsJeans.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  });

  // 2. Logic hiển thị
  let displayProducts;
  if (filter === "all") {
    // Nếu là 'Tất cả', xáo trộn mảng rồi mới lấy 5 cái để nhìn cho đa dạng
    displayProducts = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 5);
  } else {
    // Nếu lọc theo loại, cứ lấy 5 cái đầu tiên của loại đó
    displayProducts = filtered.slice(0, 5);
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {displayProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            slug={p.slug}
            image={p.image}
            name={p.name}
            price={p.price}
            salePrice={p.salePrice}
            status={tag} 
          />
        ))}
      </div>
    </section>
  );
}
export default ProductSection;