// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ)
export const setdoFAQ = [
  {
    title: "Lợi ích khi mua set đồ phối sẵn so với mua lẻ?",
    content: "Mua theo Set giúp bạn tiết kiệm thời gian phối đồ mà vẫn đảm bảo tính thẩm mỹ, đồng bộ về chất liệu và màu sắc. Đặc biệt, giá thành theo Set thường ưu đãi hơn so với khi mua lẻ từng món."
  },
  {
    title: "Chất liệu Scuba trong các set đồ có bị nóng không?",
    content: "Vải Scuba tại ICONDENIM là dòng Scuba cải tiến, có cấu trúc dệt thoáng khí ở giữa các lớp vải, giúp giữ form dáng đứng cực tốt nhưng vẫn đảm bảo sự mướt mịn và không gây bí bách khi mặc."
  }
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
export const contentSeeMoreSetDo = {
  page: "set-do-nam-icondenim",
  bannerImage: "/images/banners/2000x900_banner_nhom_sp_-_set_-_quan_-_ao.png",
  sections: [
    {
      type: "hero",
      title: "Set Đồ Nam - Thời Trang Nhanh, Phong Cách Chất",
      description: "Giải pháp thời trang hoàn hảo cho những ngày bận rộn. Các set đồ nỉ, set đồ ngắn cotton được ICONDENIM thiết kế tỉ mỉ, giúp bạn tự tin dạo phố chỉ trong 30 giây.",
    },
    {
      type: "intro",
      title: "Xu hướng Mix & Match đồng bộ từ ICONDENIM",
      content: [
        "Các bộ Set (Matching Sets) đang là xu hướng dẫn đầu trong thời trang nam hiện đại. Tại ICONDENIM, chúng tôi không chỉ phối sẵn quần và áo mà còn đảm bảo sự tương đồng tuyệt đối về định lượng vải và tông màu.",
        "Từ các dòng Set nỉ chân cua ấm áp cho mùa lạnh, Set Jacquard Denim phá cách cho đến các bộ Scuba chống nhăn, chúng tôi đáp ứng mọi nhu cầu từ tập luyện, dạo phố đến du lịch.",
        "Thiết kế tập trung vào sự đa năng, bạn hoàn toàn có thể tách set để phối cùng các món đồ khác trong tủ đồ, tối ưu hóa tính ứng dụng của sản phẩm."
      ],
    },
    {
      type: "guide",
      title: "Hướng dẫn bảo quản Set đồ phối sẵn",
      steps: [
        "Nên giặt chung cả quần và áo trong cùng một lần giặt để đảm bảo độ bền màu đồng đều theo thời gian.",
        "Với các set có hình in thêu (Embroidery/Golden Script): Lộn trái bề mặt trước khi giặt máy.",
        "Tránh treo móc làm giãn cổ áo đối với các dòng vải thun Cotton 2 chiều."
      ],
      media: {
        type: "image",
        src: "/images/products/Product_seemore_aoThun/bang_size.jpg",
      },
    },
    {
      type: "service",
      title: "Dịch vụ mua sắm tại ICONDENIM",
      content: [
        "Miễn phí vận chuyển toàn quốc cho đơn hàng từ 399.000đ.",
        "Hỗ trợ đổi size linh hoạt cho cả quần và áo trong vòng 7 ngày.",
        "Tặng kèm túi vải Canvas hoặc hộp quà cao cấp cho các dòng Set đặc biệt."
      ],
    },
  ],
};

// 3. DỮ LIỆU SẢN PHẨM (ĐÃ CHUẨN HÓA VARIANTS)
const productsSetDo = [
  {
    id: "SET0601",
    name: "Set Đồ Nỉ Nam Distance",
    slug: "set-do-ni-nam-distance",
    price: 650000,
    salePrice: 650000,
    image: "/images/products/setdo/Distance/distance_1.png",
    images: [
      "/images/products/setdo/Distance/distance_1.png",
      "/images/products/setdo/Distance/distance_2.png",
      "/images/products/setdo/Distance/distance_3_den.png",
      "/images/products/setdo/Distance/distance_4.png",
      "/images/products/setdo/Distance/distance_5.png",
      "/images/products/setdo/Distance/distance_6_trang.png",
      "/images/products/setdo/Distance/distance_7.png",
      "/images/products/setdo/Distance/distance_8.png",
      "/images/products/setdo/Distance/distance_9_nau.png"
      ],
    variants: [
      { color: "Trắng", hex: "#808080", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Distance/distance_6_trang.png" },
      { color: "Đen", hex: "#000000", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Distance/distance_3_den.png" },
      { color: "Nâu", hex: "#4B5320", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Distance/distance_9_nau.png" }
    ],
    category: "Set-do",
    brand: "ICONDENIM®",
    material: "Vải nỉ chân cua (French Terry) cao cấp",
    description: "Set đồ nỉ Distance mang lại giải pháp thời trang nhanh gọn nhưng vẫn cực kỳ phong cách.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
  },
  {
    id: "SET0603",
    name: "Set Đồ Ngắn Nam Embroidery IO Form Regular",
    slug: "set-do-ngan-nam-embroidery-io-form-regular",
    price: 585000,
    salePrice: 585000,
    image: "/images/products/setdo/Embroidery/embroidery_1.png",
    images: [
      "/images/products/setdo/Embroidery/embroidery_1.png",
      "/images/products/setdo/Embroidery/embroidery_2.png",
      "/images/products/setdo/Embroidery/embroidery_3.png",
      "/images/products/setdo/Embroidery/embroidery_4.png",
      "/images/products/setdo/Embroidery/embroidery_5.png",

    ],
    variants: [
      { color: "Kem", hex: "#F5F5DC", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Embroidery/embroidery_1.png" },
    ],
    category: "Set-do",
    brand: "ICONDENIM®",
    material: "Vải thun Cotton 2 chiều cao cấp (Dày dặn, đứng form)",
    description: "Gây ấn tượng bởi chi tiết thêu (Embroidery) tỉ mỉ, sang trọng.",
    promotions: ["Tặng hộp quà ICONDENIM cho đơn hàng Set đồ"]
  },
  {
    id: "SET0607",
    name: "Set Đồ Ngắn Jacquard Jean Nam Form Regular",
    slug: "set-do-ngan-jacquard-jean-nam-form-regular",
    price: 650000,
    salePrice: 650000,
    image: "/images/products/setdo/Jacquard/jacquard_1.png",
    images: [
      "/images/products/setdo/Jacquard/jacquard_1.png",
      "/images/products/setdo/Jacquard/jacquard_2_blue.png",
      "/images/products/setdo/Jacquard/jacquard_3.png",
      "/images/products/setdo/Jacquard/jacquard_4.png",
      "/images/products/setdo/Jacquard/jacquard_5.png",
      "/images/products/setdo/Jacquard/jacquard_6_sky.png",
      "/images/products/setdo/Jacquard/jacquard_7.png",
        "/images/products/setdo/Jacquard/jacquard_8.png"

    ],
    variants: [
      { color: "Xanh nhạt", hex: "#5D7687", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Jacquard/jacquard_6_sky.png" },
      { color: "Xanh đậm", hex: "#1A1A1A", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Jacquard/jacquard_2_blue.png" }
    ],
    category: "Set-do",
    brand: "ICONDENIM®",
    material: "Vải Jacquard Denim (Dệt họa tiết trên nền Jean nhẹ)",
    description: "Sự kết hợp độc đáo giữa chất liệu Denim và kỹ thuật dệt Jacquard tinh xảo.",
    promotions: ["Hàng giới hạn: Tặng kèm túi vải canvas"]
  },
  {
    id: "SET0611",
    name: "Set Đồ Nam ORGNLS Scuba Form Regular",
    slug: "set-do-nam-orgnls-scuba-form-regular",
    price: 650000,
    salePrice: 650000,
    image: "/images/products/setdo/Scuba/scuba_1.png",
    images: ["/images/products/setdo/Scuba/scuba_1.png", 
      "/images/products/setdo/Scuba/scuba_2_xanh_min.png",
      "/images/products/setdo/Scuba/scuba_3.png",
      "/images/products/setdo/Scuba/scuba_4.png",
      "/images/products/setdo/Scuba/scuba_5.png",
      "/images/products/setdo/Scuba/scuba_6_hong.png",
      "/images/products/setdo/Scuba/scuba_7.png",
      "/images/products/setdo/Scuba/scuba_8.png"
    ],
    variants: [
      { color: "Hồng", hex: "#0A0A0A", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Scuba/scuba_6_hong.png" },
      { color: "Xanh", hex: "#555555", sizes: ["S", "M", "L", "XL"], image: "/images/products/setdo/Scuba/scuba_2_xanh_min.png" }
    ],
    category: "Set-do",
    brand: "ICONDENIM®",
    material: "Vải Scuba cao cấp (Dày dặn, giữ form tốt, mướt mịn)",
    description: "Chất liệu vải Scuba hiện đại, chống nhăn cực tốt.",
    promotions: ["Vải Scuba độc quyền - Không nhăn"]
  }
];
// ======================
const setdoData = {
  products: productsSetDo,
  pageDetails: contentSeeMoreSetDo,
  faqs: setdoFAQ
};

export default setdoData;

// =======================
export const shippingMethods = [
  { id: "standard", name: "Giao hàng tiêu chuẩn", price: 30000, estimatedDays: "3–5 ngày" },
  { id: "express", name: "Giao hàng nhanh", price: 50000, estimatedDays: "1–2 ngày" },
];