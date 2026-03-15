"use client"

import { useState } from "react"
import CategorySection from "../CategorySection/CategorySection"
import ProductSection from "./ProductSection"

export default function JeansPage() {
  const [filter, setFilter] = useState("all")

  return (
    <>
      <CategorySection
        bannerImage="/images/banner.jpg"
        onFilterClick={setFilter}
      />

      <ProductSection filter={filter} tag="all" />
    </>
  )
}