"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../Product/ProductCard"
import { fetchCollection } from "../../../lib/api"
import styles from "./ProductSection.module.css"

interface Props {
  filter: string;
  tag: string;
}

type Product = {
  id: string;
  slug: string;
  type: string;
  image: string;
  name: string;
  price: number;
  salePrice: number;
  status?: string;
};

function ProductSection({ filter, tag }: Props) {
  const [productsJeans, setProductsJeans] = useState<Product[]>([]);

  useEffect(() => {
    fetchCollection("filter_quan")
      .then((data) => {
        const list = Array.isArray(data) ? data[0]?.productsJeans ?? data : [];
        setProductsJeans(Array.isArray(list) ? list : []);
      })
      .catch((error) => console.error("Failed to load products:", error));
  }, []);

  const filtered = useMemo(() => productsJeans.filter((p) => {
    if (filter === "all") return true;
    return p.type === filter;
  }), [filter, productsJeans]);

  let displayProducts: Product[];
  if (filter === "all") {
    displayProducts = [...filtered].slice(0, 5);
  } else {
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