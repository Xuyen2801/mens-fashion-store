// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - SƠ MI
export const somiFAQ = [
  {
    title: "Vải Cotton Silk có ưu điểm gì so với vải sơ mi thông thường?",
    content: "Vải Cotton Silk tại ICONDENIM kết hợp giữa độ bền của Cotton và độ bóng nhẹ, mềm mịn của Silk. Loại vải này ít nhăn hơn sơ mi thông thường, thấm hút mồ hôi tốt và mang lại cảm giác sang trọng khi mặc công sở."
  },
  {
    title: "Áo sơ mi Cuban form Relaxed nên phối đồ như thế nào?",
    content: "Với form Relaxed phóng khoáng, bạn nên phối cùng quần Short Khaki hoặc quần Tây ống suông. Để chuẩn phong cách dã ngoại, bạn có thể mặc khoác ngoài áo thun trơn bên trong."
  }
];

// ==============
export const contentSeeMoreSomi = {
  page: "ao-so-mi-nam-icondenim",
  bannerImage: "/images/banners/2000x900_-_banner_nhom_sp_-_ao_somi.png",
  sections: [
    {
      type: "hero",
      title: "Áo Sơ Mi Nam Cao Cấp - Đa Dạng Phong Cách",
      description: "Bộ sưu tập sơ mi nam ICONDENIM mang đến sự cân bằng giữa nét lịch lãm công sở và sự phóng khoáng của thời trang dạo phố. Chất liệu Cotton Silk, Linen và Rayon giúp bạn luôn thoải mái.",
    },
    {
      type: "intro",
      title: "Thương hiệu áo sơ mi nam thiết kế ICONDENIM",
      content: [
        "Chúng tôi chú trọng vào trải nghiệm chất liệu: từ Linen thoáng mát cho mùa hè, Flannel ấm áp cho mùa thu, đến Cotton Silk ít nhăn cho môi trường chuyên nghiệp.",
        "Thiết kế đa dạng từ cổ đức truyền thống, cổ trụ (Grandad) đến cổ Cuban hiện đại. Mỗi sản phẩm đều được chăm chút từ đường kim mũi chỉ và cúc áo logo độc quyền.",
        "Form dáng đa dạng: Slim-fit tôn dáng, Regular-fit chỉn chu và Relaxed/Boxy cho những ai yêu thích sự phá cách."
      ],
    },
    {
      type: "guide",
      title: "Cách bảo quản áo sơ mi luôn như mới",
      steps: [
        "Nên giặt tay hoặc dùng túi giặt ở chế độ nhẹ để giữ form cổ áo.",
        "Phơi bằng móc có đệm vai để tránh tạo vết hằn trên vai áo.",
        "Ủi (là) ở nhiệt độ phù hợp với từng chất liệu: thấp cho Rayon/Silk và trung bình cho Cotton/Linen."
      ],
      media: {
        type: "image",
        src: "/images/products/Product_seemore_aoThun/bang_size.jpg",
      },
    },
    {
      type: "service",
      title: "Trải nghiệm mua sắm tại ICONDENIM",
      content: [
        "Miễn phí vận chuyển toàn quốc cho đơn hàng từ 399.000đ.",
        "Đổi trả trong 7 ngày nếu không vừa size.",
        "Cộng dồn điểm thành viên nhận ưu đãi lên đến 15%."
      ],
    },
  ],
};
// ==============
const productsSomi = [
  {
    id: "SMID0401",
    name: "Áo Sơ Mi Cuban Nam Blue Code Linen Form Relaxed",
    slug: "ao-so-mi-cuban-nam-blue-code-linen-form-relaxed",
    price: 395000,
    salePrice: 395000,
    image: "/images/products/so-mi/Blue_Code_Linen/code_linen_1.png",
    images: [
      "/images/products/so-mi/Blue_Code_Linen/code_linen_1.png",
      "/images/products/so-mi/Blue_Code_Linen/code_linen_2.png",
      "/images/products/so-mi/Blue_Code_Linen/code_linen_3_trang.png",
      "/images/products/so-mi/Blue_Code_Linen/code_linen_4_xanh.png",
      "/images/products/so-mi/Blue_Code_Linen/code_linen_5.png",
    ],
    variants: [
      { color: "Xanh", hex: "#007FFF", sizes: ["S", "M", "L", "XL"], image: "/images/products/so-mi/Blue_Code_Linen/code_linen_4_xanh.png" },
      { color: "Trắng", hex: "#FFFFFF", sizes: ["S", "M", "L", "XL"], image: "/images/products/so-mi/Blue_Code_Linen/code_linen_3_trang.png" }
    ],
    category: "Áo Sơ Mi",
    brand: "ICONDENIM®",
    material: "Vải Linen (Lanh) cao cấp, thoáng mát",
    description: "Mẫu sơ mi Cuban với họa tiết Blue Code độc đáo mang đậm hơi thở mùa hè.",
    promotions: ["Tặng Bao lì xì 'Tết Mới Có Tất'"]
  },
  {
    id: "SMID0402",
    name: "Áo Sơ Mi Nam Caro Flannel Mississippi Form Regular",
    slug: "ao-so-mi-nam-caro-flannel-mississippi-form-regular",
    price: 395000,
    salePrice: 395000,
    image: "/images/products/so-mi/Flannel_Mississippi/flannel_1.png",
    images: [
      "/images/products/so-mi/Flannel_Mississippi/flannel_1.png",
      "/images/products/so-mi/Flannel_Mississippi/flannel_2.png",
      "/images/products/so-mi/Flannel_Mississippi/flannel_3.png",
        "/images/products/so-mi/Flannel_Mississippi/flannel_4.png",
        "/images/products/so-mi/Flannel_Mississippi/flannel_5.png",
        "/images/products/so-mi/Flannel_Mississippi/flannel_6.png",
    ],
    variants: [
      { color: "Caro Đen", hex: "#8B0000", sizes: ["S", "M", "L", "XL"], image: "/images/products/so-mi/Flannel_Mississippi/flannel_1.png" },
    ],
    category: "Áo Sơ Mi",
    brand: "ICONDENIM®",
    material: "Vải Flannel mềm mại, giữ ấm nhẹ",
    description: "Họa tiết caro cổ điển. Thích hợp làm áo khoác nhẹ bên ngoài.",
    promotions: ["Mua 2 giảm thêm 5%"]
  },
  {
    id: "SMID0408",
    name: "Áo Sơ Mi Nam Tay Dài Rogne Bear Form Slim",
    slug: "ao-so-mi-nam-tay-dai-rogne-bear-form-slim",
    price: 395000,
    salePrice: 395000,
    image: "/images/products/so-mi/Rogne_Bear/bear_1.png",
    images: [
      "/images/products/so-mi/Rogne_Bear/bear_1.png",
      "/images/products/so-mi/Rogne_Bear/bear_2.png",
      "/images/products/so-mi/Rogne_Bear/bear_3_blue.png",
      "/images/products/so-mi/Rogne_Bear/bear_4_green.png",
      "/images/products/so-mi/Rogne_Bear/bear_5.png",
      "/images/products/so-mi/Rogne_Bear/bear_6.png"
    ],
    variants: [
      { color: "Xanh dương", hex: "#FFFFFF", sizes: ["S", "M", "L", "XL"], image: "/images/products/so-mi/Rogne_Bear/bear_3_blue.png" },
      { color: "Xanh lá", hex: "#000080", sizes: ["S", "M", "L", "XL"], image: "/images/products/so-mi/Rogne_Bear/bear_4_green.png" }
    ],
    category: "Áo Sơ Mi",
    brand: "ICONDENIM®",
    material: "Vải Cotton Silk cao cấp (Mềm mịn, ít nhăn)",
    description: "Phong cách trẻ trung với họa tiết Rogne Bear thêu ngực. Form Slim tôn dáng công sở.",
    promotions: ["Tặng hộp quà ICONDENIM cho đơn hàng Sơ mi"]
  },
  {
    id: "SMID0411",
    name: "Áo Sơ Mi Nam Cuban Simplify Form Relaxed",
    slug: "ao-so-mi-nam-cuban-simplify-form-relaxed",
    price: 395000,
    salePrice: 395000,
    image: "/images/products/so-mi/Simplify/simplify_1.png",
    images: ["/images/products/so-mi/Simplify/simplify_1.png", 
      "/images/products/so-mi/Simplify/simplify_2.png",
      "/images/products/so-mi/Simplify/simplify_3.png",
      "/images/products/so-mi/Simplify/simplify_4.png",
      "/images/products/so-mi/Simplify/simplify_5.png"
    ],
    variants: [
      { color: "Kem", hex: "#FFFFFF", sizes: ["S", "M", "L", "XL"], image: "/images/products/so-mi/Simplify/simplify_1.png" },
    ],
    category: "Áo Sơ Mi",
    brand: "ICONDENIM®",
    material: "Vải Rayon mềm mịn, thoáng mát",
    description: "Thiết kế tối giản Minimalism, cổ Cuban phóng khoáng.",
    promotions: ["Sản phẩm bán chạy nhất hè 2026"]
  }
];
// ==============
const somiData = {
  products: productsSomi,
  pageDetails: contentSeeMoreSomi,
  faqs: somiFAQ
};

export default somiData;

// ===============
export const shippingMethods = [
  { id: "standard", name: "Giao hàng tiêu chuẩn", price: 30000, estimatedDays: "3–5 ngày" },
  { id: "express", name: "Giao hàng nhanh", price: 50000, estimatedDays: "1–2 ngày" },
];