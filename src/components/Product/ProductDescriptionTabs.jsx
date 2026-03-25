'use client';
import { useState } from 'react';

export default function ProductDescriptionTabs({ product }) {
  const [activeTab, setActiveTab] = useState('mota');

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
               <img src={product.images?.[1] || product.image} className="rounded-lg border w-full h-auto" alt="detail 1" />
               <img src={product.images?.[2] || product.image} className="rounded-lg border w-full h-auto" alt="detail 2" />
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