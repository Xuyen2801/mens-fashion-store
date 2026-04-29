"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Variant {
  color: string;
  hex: string;
  sizes: string[];
  image: string;
}

interface Product {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  material: string;
  description: string;
  promotions: string[];
  variants: Variant[];
  colors?: string[]; 
  sizes?: string[];  
}

export default function AdminProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasPromotion, setHasPromotion] = useState(false);

  const categoriesList = [
    { id: "ao-thun", label: "Áo Thun" },
    { id: "ao-polo", label: "Áo Polo" },
    { id: "ao-khoac", label: "Áo Khoác" },
    { id: "jean", label: "Quần Jean" },
    { id: "short", label: "Quần Short" },
    { id: "kaki", label: "Quần Kaki" },
    { id: "tay", label: "Quần Tây" },
    { id: "jogger", label: "Quần Jogger" },
    { id: "hoodie", label: "Hoodie" },
    { id: "so-mi", label: "Sơ Mi" }
  ];

  const imageFolders = ["ao_khoac", "hoodie", "polo", "quan_boxer", "quan_jeans", "quan_jogger", "quan_kaki", "quan_short", "quan_tay", "so_mi", "tanktop", "Product_seemore_aoThun"];
  const allAvailableSizes = ["S", "M", "L", "XL", "XXL", "28", "29", "30", "31", "32"];

  const initialProductState: Product = {
    id: "",
    name: "",
    slug: "",
    price: 0,
    salePrice: 0,
    image: "",
    images: [],
    category: "",
    brand: "ICONDENIM®",
    material: "",
    description: "",
    promotions: [],
    variants: [{ color: "", hex: "#000000", sizes: [], image: "" }]
  };

  const [newProduct, setNewProduct] = useState<Product>(initialProductState);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const requests = categoriesList.map(cat => fetch(`http://localhost:5000/api/${cat.id}`).then(res => res.json()));
      const results = await Promise.all(requests);
      const combined = results.flatMap((data, index) => {
        if (!data) return [];
        let items = Array.isArray(data) ? (data[0]?.products || data) : (data.products || []);
        return items.map((item: any) => ({ ...item, category: categoriesList[index].id }));
      });
      setAllProducts(combined);
      setFilteredProducts(combined);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setHasPromotion(false);
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    setNewProduct({ ...initialProductState, id: `PROD-${randomChars}` });
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setIsEditing(true);
    setNewProduct({ ...product });
    setHasPromotion(product.promotions && product.promotions.length > 0);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!newProduct.category || !newProduct.name || !newProduct.image) {
      return toast.error("Vui lòng điền đủ thông tin bắt buộc!");
    }

    const productData = {
  ...newProduct,
  colors: (newProduct.variants || []).map(v => v.color).filter(c => c !== ""),
  sizes: Array.from(new Set((newProduct.variants || []).flatMap(v => v.sizes || []))),
  updatedAt: new Date().toISOString()
};

    const endpoint = isEditing ? 'update' : 'add-to-collection';

    try {
      const res = await fetch(`http://localhost:5000/api/products/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        toast.success(isEditing ? "Đã cập nhật kho hàng!" : "Đã thêm vào kho hàng!");
        setIsAddModalOpen(false);
        fetchAllData();
      }
    } catch (error) {
      toast.error("Lỗi kết nối server!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 pt-10">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase italic">Hệ thống Kho hàng</h1>
          <p className="text-slate-500 mt-1 font-medium">Quản lý sản phẩm ICONDENIM real-time</p>
        </div>
        <button onClick={openAddModal} className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs shadow-xl hover:bg-slate-800 transition-all uppercase tracking-widest flex items-center gap-2">
          <span className="text-lg">+</span> THÊM SẢN PHẨM MỚI
        </button>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit font-black text-[10px] uppercase">
        <button onClick={() => {setActiveTab("ALL"); setFilteredProducts(allProducts)}} className={`px-5 py-2.5 rounded-xl transition-all ${activeTab === "ALL" ? "bg-white text-black shadow-sm" : "text-slate-400"}`}>Tất cả</button>
        {categoriesList.map((cat) => (
          <button key={cat.id} onClick={() => {setActiveTab(cat.id); setFilteredProducts(allProducts.filter(p => p.category === cat.id))}} className={`px-5 py-2.5 rounded-xl transition-all ${activeTab === cat.id ? "bg-white text-black shadow-sm" : "text-slate-400"}`}>{cat.label}</button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <th className="p-6">Sản phẩm</th>
              <th className="p-6 text-center">Biến thể</th>
              <th className="p-6 text-right">Giá niêm yết</th>
              <th className="p-6 text-right">Giá sau giảm</th>
              <th className="p-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProducts.map((item, idx) => (
              <tr key={`${item.id}-${idx}`} className="hover:bg-slate-50/50 transition-all">
                <td className="p-6 flex items-center gap-4">
                  <img src={item.image} className="w-12 h-12 object-cover rounded-lg border" alt="" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm leading-tight">{item.name}</p>
                    <span className="text-[9px] font-black text-blue-500 uppercase">{item.category}</span>
                  </div>
                </td>
                <td className="p-6 text-center text-[10px] font-bold text-slate-500">
                  {item.variants?.length || 0} Màu | {item.sizes?.length || 0} Size
                </td>
                <td className="p-6 text-right text-slate-400 line-through text-xs font-bold">{new Intl.NumberFormat("vi-VN").format(item.price)}đ</td>
                <td className="p-6 text-right font-black text-red-500 text-sm">{new Intl.NumberFormat("vi-VN").format(item.salePrice || item.price)}đ</td>
                <td className="p-6 text-center">
                  <button onClick={() => openEditModal(item)} className="text-blue-600 font-black text-[10px] uppercase hover:underline">Sửa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="p-20 text-center font-black text-slate-300 animate-pulse text-xs uppercase tracking-widest">Đang kết nối Database...</div>}
      </div>

      {/* MODAL (THÊM & SỬA) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-10 scrollbar-hide">
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <h2 className="text-2xl font-black text-slate-900 uppercase italic">
                {isEditing ? `Chỉnh sửa: ${newProduct.name}` : "Thêm Sản phẩm mới"}
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-black transition-colors text-2xl">✕</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* CỘT TRÁI: THÔNG TIN CHI TIẾT */}
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Mã ID</label>
                    <input type="text" value={newProduct.id} readOnly className="w-full mt-1 p-3 bg-slate-50 border rounded-xl font-mono font-bold text-blue-600" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Thương hiệu</label>
                    <input type="text" value={newProduct.brand} readOnly className="w-full mt-1 p-3 border rounded-xl font-bold bg-slate-50 text-slate-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Loại hàng</label>
                    <select disabled={isEditing} className="w-full mt-1 p-3 border rounded-xl font-bold bg-white outline-none focus:ring-2 ring-blue-500" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                      <option value="">-- Chọn --</option>
                      {categoriesList.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên sản phẩm & Slug</label>
                  <input type="text" value={newProduct.name} placeholder="Áo Polo Nam League..." className="w-full mt-1 p-3 border rounded-xl font-bold outline-none" 
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
                      setNewProduct({...newProduct, name, slug});
                    }} />
                  <p className="text-[9px] text-blue-500 mt-1 font-mono italic">Slug: /{newProduct.slug}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Giá niêm yết (đ)</label>
                    <input type="number" value={newProduct.price} className="w-full mt-1 p-3 border rounded-xl font-bold" onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase text-red-500">Giá thực tế (đ)</label>
                    <input type="number" value={newProduct.salePrice} className="w-full mt-1 p-3 border rounded-xl font-bold text-red-500" onChange={(e) => setNewProduct({...newProduct, salePrice: Number(e.target.value)})} />
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Kho ảnh dự án</label>
                  <select className="w-full p-3 border rounded-xl font-bold bg-white" onChange={(e) => setNewProduct({...newProduct, image: `/images/products/${e.target.value}/`})}>
                    <option value="">-- Chọn Folder Public --</option>
                    {imageFolders.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <input type="text" value={newProduct.image} placeholder="Ảnh chính (VD: 1.png)" className="w-full p-3 border rounded-xl font-mono text-[10px]" onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
                  <textarea value={newProduct.images.join('\n')} placeholder="Ảnh chi tiết (Mỗi dòng 1 ảnh)..." className="w-full p-3 border rounded-xl font-mono text-[10px] h-24" 
                    onChange={(e) => setNewProduct({...newProduct, images: e.target.value.split('\n').filter(s => s.trim() !== "")})} />
                </div>
              </div>

              {/* CỘT PHẢI: VARIANTS & PROMO */}
              <div className="space-y-6">
                <div className={`p-5 rounded-2xl border transition-all ${hasPromotion ? "bg-orange-50 border-orange-200" : "bg-slate-50 border-slate-200"}`}>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase">Khuyến mãi kèm theo</label>
                    <div onClick={() => { setHasPromotion(!hasPromotion); if(hasPromotion) setNewProduct({...newProduct, promotions: []}) }} 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${hasPromotion ? "bg-orange-500" : "bg-slate-300"}`}>
                      <div className={`bg-white w-4 h-4 rounded-full shadow transition-transform ${hasPromotion ? "translate-x-6" : "translate-x-0"}`} />
                    </div>
                  </div>
                  {hasPromotion && (
                    <input type="text" value={newProduct.promotions && newProduct.promotions[0] || ""} placeholder="Nhập quà tặng..." className="w-full p-3 bg-white border border-orange-200 rounded-xl font-bold text-sm text-orange-700" 
                      onChange={(e) => setNewProduct({...newProduct, promotions: [e.target.value]})} />
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black text-slate-900 uppercase">Phân loại Màu sắc & Size</label>
                  <button onClick={() => setNewProduct({...newProduct, variants: [...newProduct.variants, { color: "", hex: "#000000", sizes: [], image: "" }]})} 
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">+ THÊM MÀU</button>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-3 scrollbar-hide">
                  {newProduct.variants?.map((v, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border relative">
                      {idx > 0 && <button onClick={() => setNewProduct({...newProduct, variants: newProduct.variants.filter((_, i) => i !== idx)})} className="absolute top-3 right-3 text-slate-300 hover:text-red-500">✕</button>}
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Tên màu</label>
                          <input type="text" value={v.color} placeholder="VD: Đen" className="w-full mt-1 p-2 text-xs font-bold border rounded-lg" onChange={(e) => { const upd = [...newProduct.variants]; upd[idx].color = e.target.value; setNewProduct({...newProduct, variants: upd}); }} />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Mã Hex</label>
                          <input type="color" value={v.hex} className="w-12 h-9 mt-1 block cursor-pointer border-none bg-transparent" onChange={(e) => { const upd = [...newProduct.variants]; upd[idx].hex = e.target.value; setNewProduct({...newProduct, variants: upd}); }} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Kích cỡ có sẵn:</label>
                        <div className="flex flex-wrap gap-1.5">
                          {allAvailableSizes.map(size => (
                            <button key={size} onClick={() => {
                              const upd = [...newProduct.variants];
                              const cur = upd[idx].sizes;
                              upd[idx].sizes = cur.includes(size) ? cur.filter(s => s !== size) : [...cur, size];
                              setNewProduct({...newProduct, variants: upd});
                            }} className={`px-2 py-1 rounded text-[10px] font-black border transition-all ${v.sizes.includes(size) ? "bg-black text-white border-black" : "bg-white text-slate-300 border-slate-100"}`}>{size}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 border-t pt-8">
              <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 font-bold text-slate-400 hover:bg-slate-50 rounded-2xl uppercase text-xs tracking-widest">Đóng</button>
              <button onClick={handleSaveProduct} className="flex-1 py-4 bg-black text-white rounded-2xl font-black shadow-2xl hover:bg-blue-600 transition-all uppercase tracking-widest text-xs">
                {isEditing ? "Cập nhật dữ liệu" : "Lưu vào hệ thống"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}