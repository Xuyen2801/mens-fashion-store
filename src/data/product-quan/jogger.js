// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - QUẦN JOGGER
const quanJoggerFAQ = [
  {
    title: "Làm sao để chọn size quần jogger vừa vặn nhất?",
    content:
      "Bạn nên dựa vào chiều cao, cân nặng và các số đo cụ thể như vòng eo, vòng mông. Nếu muốn mặc ôm sát ở phần gối, hãy chọn size có chiều dài phù hợp với chiều cao của bạn theo bảng quy đổi.",
  },
  {
    title: "Quần jogger trơn phù hợp với phong cách nào?",
    content:
      "Đây là mẫu quần đơn giản, basic, không họa tiết, mang lại vẻ đẹp tinh tế và thanh lịch. Bạn có thể phối linh hoạt từ phong cách năng động đến lịch lãm.",
  },
  {
    title: "Chất liệu Linen trên quần jogger có ưu điểm gì?",
    content:
      "Quần jogger chất liệu Linen (như dòng Linen Ease) mang lại cảm giác nhẹ nhàng, thoáng khí tuyệt đối, cực kỳ phù hợp cho thời tiết mùa hè và phong cách phóng khoáng.",
  },
  {
    title: "Quần Jogger Cargo (túi hộp) có gì khác biệt?",
    content:
      "Dòng Cargo như mẫu Military Form thường có thiết kế túi hộp ở hai bên đùi, tạo vẻ ngoài mạnh mẽ, bụi bặm và rất tiện dụng để đựng các vật dụng nhỏ.",
  },
  {
    title: "Tôi có thể mua quần jogger ICONDENIM trực tiếp ở đâu?",
    content:
      "Bạn có thể ghé thăm hệ thống cửa hàng ICONDENIM tại TPHCM để trải nghiệm trực tiếp chất liệu cao cấp và độ hoàn thiện tỉ mỉ của sản phẩm.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreJogger = {
  page: "quan-jogger-nam-icondenim",
  pageDetails: {
    bannerImage: "/images/banners/quan-jogger.jpg",
    sections: [
      {
        type: "hero",
        title: "Quần Jogger Nam Hàng Hiệu, Cao Cấp - ICONDENIM",
        description:
          "Quần jogger là item thời trang đa năng, chinh phục mọi phong cách từ quần jogger trơn, jogger túi hộp đến jogger suông năng động.",
      },
      {
        type: "intro",
        title: "Các kiểu dáng quần jogger phổ biến hiện nay",
        content: [
          "Quần jogger đã trở thành item bất hủ trong tủ đồ phái nam nhờ form dáng rộng rãi, cổ chân bo gọn mang lại phong cách mới mẻ, trẻ trung.",
          "Mẫu quần jogger trơn với thiết kế tối giản là lựa chọn thông minh giúp bạn dễ dàng mix-match với nhiều kiểu trang phục khác nhau.",
        ],
      },
      {
        type: "guide",
        title: "Hướng dẫn cách chọn size quần jogger chuẩn chỉnh",
        steps: [
          "Đo vòng eo: Sử dụng thước dây để đo vòng eo và chọn size có kích thước tương ứng.",
          "Đo vòng mông: Đo phần lớn nhất của mông để đảm bảo sự thoải mái khi vận động.",
          "Chú ý chiều dài quần: Chọn size có chiều dài vừa vặn với chiều cao để tránh bị trùng gấu quá nhiều.",
        ],
        media: {
          type: "image",
          src: "/images/products/quan_jogger/bang_size_jogger.jpg", // Ảnh bảng size bạn đã chụp
        },
      },
    ],
  },
};

// 3. DỮ LIỆU SẢN PHẨM JOGGER (DỰA TRÊN HÌNH ẢNH DANH MỤC)
const productsJogger = [
  {
    id: 501,
    name: "Quần Jogger Cargo Nam Military Form",
    sku: "QJ001",
    price: 579000,
    salePrice: 579000,
    image: "/images/products/quan_jogger/jogger_cargo_military.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  },
  {
    id: 502,
    name: "Quần Dài Nam Linen Ease Trousers Form",
    sku: "QJ002",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_jogger/quan_dai_linen_ease.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  },
  {
    id: 503,
    name: "Quần Jogger Nam Dashfield Nỉ Form",
    sku: "QJ003",
    price: 439000,
    salePrice: 249000, // Đang giảm giá 43%
    image: "/images/products/quan_jogger/jogger_dashfield_ni.jpg",
    status: "SALE",
    category: "Quần Jogger",
  },
  {
    id: 504,
    name: "Quần Dài Nam Tactical Geared Form",
    sku: "QJ004",
    price: 449000,
    salePrice: 449000,
    image: "/images/products/quan_jogger/quan_dai_tactical.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  },
  {
    id: 505,
    name: "Quần Dài Kaki Nam Wanderlust Form",
    sku: "QJ005",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_jogger/quan_dai_kaki_wanderlust.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  },
  {
    id: 506,
    name: "Set Đồ Thun Cotton Jersey Nam",
    sku: "QJ006",
    price: 398000,
    salePrice: 199000, // Giá từ 199k
    image: "/images/products/quan_jogger/set_thun_jersey.jpg",
    status: "HOT DEAL",
    category: "Quần Jogger",
  },
  {
    id: 507,
    name: "Quần Jogger Linen Nam Basic Form",
    sku: "QJ007",
    price: 389000,
    salePrice: 389000,
    image: "/images/products/quan_jogger/jogger_linen_basic.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  },
];

// 4. GỘP CHUNG THÀNH joggerData
const joggerData = {
  products: productsJogger,
  pageDetails: contentSeeMoreJogger.pageDetails,
  faqs: quanJoggerFAQ,
};

export default joggerData;
