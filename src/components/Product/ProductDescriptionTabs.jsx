'use client';
import { useState } from 'react';

export default function ProductDescriptionTabs({ product }) {
  const [activeTab, setActiveTab] = useState('mota');

  const displayImages = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : product?.image
      ? [product.image]
      : [];

  console.log("IMAGE DEBUG:", displayImages);

  const detailRows = [
    { label: 'Mã sản phẩm', value: product.id },
    { label: 'Danh mục', value: product.category },
    { label: 'Giá bán', value: product.salePrice ? `${product.salePrice.toLocaleString('vi-VN')}đ` : undefined },
    { label: 'Giá gốc', value: product.price ? `${product.price.toLocaleString('vi-VN')}đ` : undefined },
    { label: 'Form dáng', value: product.fit },
    { label: 'Chất liệu', value: product.material },
    { label: 'Xuất xứ', value: product.origin },
    { label: 'Thương hiệu', value: product.brand },
    { label: 'Đánh giá', value: product.rating ? `${product.rating}/5 (${product.reviewCount || 0} lượt)` : undefined },
    { label: 'Tồn kho', value: typeof product.totalStock === 'number' ? `${product.totalStock}` : undefined },
    { label: 'Màu sắc', value: Array.isArray(product.colors) ? `${product.colors.length}` : undefined },
    { label: 'Kích thước', value: Array.isArray(product.sizes) ? product.sizes.join(', ') : undefined },
    { label: 'Tags', value: Array.isArray(product.tags) ? product.tags.join(', ') : undefined },
  ].filter((item) => item.value !== undefined && item.value !== null && item.value !== '');

  const tabs = [
    { id: 'mota', label: 'MÔ TẢ' },
    { id: 'giaohang', label: 'CHÍNH SÁCH GIAO HÀNG' },
    { id: 'doihang', label: 'CHÍNH SÁCH ĐỔI HÀNG' },
  ];

  if (!product) return null;

  return (
    <div className="w-full mt-10 border-t border-gray-100 pt-10">
 
      <div className="flex border border-gray-200 w-fit rounded-t-sm shadow-sm overflow-hidden bg-gray-50/30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 md:px-10 py-4 text-[12px] font-bold transition-all relative border-r border-gray-200 last:border-r-0 uppercase tracking-widest ${
              activeTab === tab.id ? 'text-black bg-white' : 'text-gray-400 hover:text-black'
            }`}
          >
            {activeTab === tab.id && (
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#f97316]"></div>
            )}
            {tab.label}
          </button>
        ))}
      </div>


      <div className="mt-8 animate-fadeIn min-h-[400px]">
       
        {activeTab === 'mota' && (
          <div className="space-y-6 max-w-5xl">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
              {product.brand} {product.name}
            </h2>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
              <p><strong>• Chất liệu:</strong> {product.material}</p>
              <div className="whitespace-pre-line">
                {product.description || "Thông tin sản phẩm đang được cập nhật..."}
              </div>
            </div>

            {detailRows.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                {detailRows.map((item) => (
                  <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
               <img src={displayImages[1] || displayImages[0]} className="rounded-lg border w-full h-auto" alt="detail 1" />
               <img src={displayImages[2] || displayImages[0]} className="rounded-lg border w-full h-auto" alt="detail 2" />
            </div>
          </div>
        )}


        {activeTab === 'giaohang' && (
          <div className="w-full flex flex-col items-center">
            <img 
              src="/Chinh_sach/giao_hang.png" 
              className="max-w-full h-auto shadow-sm rounded-lg" 
              alt="Chính sách giao hàng"
            />
          </div>
        )}


        {activeTab === 'doihang' && (
          <div className="w-full flex flex-col items-center gap-0"> 

            <img src="/Chinh_sach/doi_tra_1.png" className="max-w-4xl w-full h-auto" alt="doi tra 1" />
            <img src="/Chinh_sach/doi_tra_2.png" className="max-w-4xl w-full h-auto" alt="doi tra 2" />
            <img src="/Chinh_sach/doi_tra_3.png" className="max-w-4xl w-full h-auto" alt="doi tra 3" />
            <img src="/Chinh_sach/doi_tra_4.png" className="max-w-4xl w-full h-auto" alt="doi tra 4" />
            <img src="/Chinh_sach/doi_tra_5.png" className="max-w-4xl w-full h-auto" alt="doi tra 5" />
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}