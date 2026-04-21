"use client"

import { useState } from "react"
import CategorySection from "../CategorySection/CategorySection"
import ProductSection from "./ProductSection"

export default function JeansPage() {
  const [filter, setFilter] = useState("all")
  const [currentBanner, setCurrentBanner] = useState("/images/banners/homepage/banner-all.png")

  const handleFilterChange = (type, banner) => {
    setFilter(type)
    if (banner) setCurrentBanner(banner)
  }

  return (
    <>
      <CategorySection
        onFilterChange={handleFilterChange}
      />


      <h2 style={{ textAlign: 'center', margin: '40px 0' }}>
        {filter === 'all' ? 'TẤT CẢ SẢN PHẨM' : filter.toUpperCase().replace(/-/g, ' ')}
      </h2>

      <ProductSection filter={filter} />
    </>
  )
}