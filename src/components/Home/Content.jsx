'use client'
import { IoCartOutline } from "react-icons/io5";
export default function Content() {
  return (
    <section style={{ padding: '60px 80px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>
        Về chúng tôi
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 30 }}>
        Mens Fashion là cửa hàng chuyên cung cấp các sản phẩm quần áo nam
        theo phong cách hiện đại, tối giản và dễ ứng dụng trong đời sống hằng ngày.
        Chúng tôi tập trung vào chất lượng, sự thoải mái và trải nghiệm mua sắm
        thân thiện cho khách hàng.
      </p>
    <IoCartOutline size={24} />
    </section>

  )
}

