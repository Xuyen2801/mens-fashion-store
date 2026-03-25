// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - QUẦN BOXER
const quanBoxerFAQ = [
  {
    title: "Chất liệu nào của boxer ICONDENIM mang lại cảm giác mát lạnh nhất?",
    content:
      "Dòng Boxer Cooling Seam Press và Coolmax Polyester là những lựa chọn hàng đầu. Chúng sử dụng sợi vải công nghệ cao giúp tản nhiệt nhanh và thấm hút mồ hôi vượt trội.",
  },
  {
    title:
      "Quần boxer Seamless Knit có ưu điểm gì so với quần lót thông thường?",
    content:
      "Seamless Knit là dòng dệt không đường may, giúp loại bỏ các vết hằn trên da và giảm thiểu ma sát khi vận động, mang lại cảm giác thoải mái tối đa cho người mặc.",
  },
  {
    title: "Bao lâu thì nam giới nên thay mới quần lót để đảm bảo vệ sinh?",
    content:
      "Các chuyên gia khuyến cáo bạn nên thay mới quần lót sau khoảng 3 đến 6 tháng sử dụng để đảm bảo tính kháng khuẩn và độ đàn hồi của sợi vải.",
  },
  {
    title: "Tôi nên chọn size boxer như thế nào để không bị quá chật?",
    content:
      "Bạn nên chọn size dựa trên số đo vòng bụng và cân nặng. Nếu bạn có vòng đùi to, hãy cân nhắc tăng 1 size để phần ống quần không bị bó thắt gây khó chịu.",
  },
  {
    title: "Quần boxer Active Camo phù hợp cho hoạt động nào?",
    content:
      "Với thiết kế co giãn mạnh và họa tiết năng động, dòng Active Camo cực kỳ phù hợp cho các hoạt động thể thao, tập gym hoặc vận động cường độ cao.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreBoxer = {
  page: "quan-boxer-nam-icondenim",
  bannerImage: "/images/banners/banner-boxer.jpg",
  pageDetails: {
    bannerImage: "/images/banners/quan-boxer.jpg", // Đảm bảo khớp với logic currentCategoryData.pageDetails.bannerImage
    sections: [
      {
        type: "hero",
        title: "Quần Boxer Nam Thoải Mái, Kháng Khuẩn - ICONDENIM",
        description:
          "Sự thoải mái bắt đầu từ lớp nền bên trong. Bộ sưu tập boxer ICONDENIM ứng dụng công nghệ dệt không đường may và sợi vải làm mát, giúp bạn tự tin trong mọi hoạt động hàng ngày.",
      },
      {
        type: "intro",
        title: "Trải nghiệm sự êm ái cùng Boxer ICONDENIM",
        content: [
          "Quần lót nam tại ICONDENIM không chỉ chú trọng vào thiết kế mà còn đặc biệt quan tâm đến chất liệu. Từ dòng Cotton Base Layer mềm mại đến Coolmax Polyester mát lạnh, mỗi sản phẩm đều hướng tới sự dễ chịu tuyệt đối.",
          "Thiết kế lưng thun co giãn tốt, không gây hằn bụng và logo tinh tế khẳng định đẳng cấp phái mạnh.",
        ],
      },
      {
        type: "service",
        title: "Cam kết chất lượng tại ICONDENIM",
        content: [
          "Chất liệu kháng khuẩn, an toàn cho làn da nhạy cảm.",
          "Độ bền màu cao, không bị giãn sau nhiều lần giặt.",
          "Giao hàng nhanh chóng và đóng gói bảo mật thông tin khách hàng.",
        ],
      },
    ],
  },
};

// 3. DỮ LIỆU SẢN PHẨM BOXER (DỰA TRÊN HÌNH ẢNH CỦA BẠN)
const productsBoxer = [
  {
    id: 401,
    name: "Quần Boxer Nam Base Layer",
    sku: "QB001",
    price: 119000,
    salePrice: 119000,
    image: "/images/products/quan_boxer/boxer_base_layer.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
  {
    id: 402,
    name: "Quần Boxer Nam Basic Logo Form",
    sku: "QB002",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_basic_logo.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
  {
    id: 403,
    name: "Quần Boxer Nam Seamless Knit",
    sku: "QB003",
    price: 100000,
    salePrice: 100000,
    image: "/images/products/quan_boxer/boxer_seamless_knit.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
  {
    id: 404,
    name: "Quần Boxer Nam Active Camo Form",
    sku: "QB004",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_active_camo.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
  {
    id: 405,
    name: "Quần Boxer Nam Active Logo Box Trunks",
    sku: "QB005",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_active_logo.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
  {
    id: 406,
    name: "Quần Boxer Cooling Seam Press",
    sku: "QB006",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_cooling_seam.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
  {
    id: 407,
    name: "Quần Boxer Coolmax Polyester Fabric",
    sku: "QB007",
    price: 100000,
    salePrice: 100000,
    image: "/images/products/quan_boxer/boxer_coolmax_poly.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  },
];

// 4. GỘP CHUNG THÀNH boxerData
const boxerData = {
  products: productsBoxer,
  pageDetails: contentSeeMoreBoxer.pageDetails,
  faqs: quanBoxerFAQ,
};

export default boxerData;
