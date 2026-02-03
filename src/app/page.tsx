
// export default function HomePage() {
//   return (
//     <div>
//       <h1>Trang chủ</h1>
//       <button>Mua ngay</button>
//       <button>Xem sản phẩm</button>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import {Product} from '../types/product';
import { products } from '../data/products'; 
import ProductCardModal from '../components/modal/ProductCardModal';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div style={{ padding: '40px', fontFamily: '"Times New Roman", Times, serif' }}>
      <h1>Trang chủ</h1>
      <div className="flex gap-4 mt-4">
        <button className="border px-4 py-2 bg-black text-white">Mua ngay</button>
        <button 
         
          onClick={() => setSelectedProduct(products[0])} 
          className="border px-4 py-2 hover:bg-gray-100 transition-colors"
        >
          Xem sản phẩm
        </button>
      </div>

      {selectedProduct && (
        <ProductCardModal 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          product={selectedProduct}
        />
      )}
    </div>
  );
}