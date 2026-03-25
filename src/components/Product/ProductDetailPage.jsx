import poloData from "@/data/Product/product-ao/ao-polo"; 
import hoodieData from "@/data/Product/product-ao/hoodie";
import somiData from "@/data/Product/product-ao/so-mi";
import setdoData from "@/data/Product/product-ao/set-do";
import tanktopData from "@/data/Product/product-ao/tank-top"; 
import ProductDetail from "@/components/Product/ProductDetail"; 
import Link from "next/link";

export default function Page({ params }) {
  const { slug } = params; 


  const allProducts = [
    ...(poloData?.products || []),
    ...(hoodieData?.products || []),
    ...(somiData?.products || []),
    ...(setdoData?.products || []),
    ...(tanktopData?.products || []),
  ];


  const product = allProducts.find((p) => p.slug === slug);

  
  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">Sản phẩm không tồn tại!</h2>
        <p className="text-gray-500">Có vẻ như liên kết đã hỏng hoặc sản phẩm đã ngừng kinh doanh.</p>
        <Link href="/" className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }


  return (
    <main className="max-w-7xl mx-auto p-4 min-h-screen">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black">Trang chủ</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category?.replace('-', ' ')}</span>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      <ProductDetail product={product} />
    </main>
  );
}