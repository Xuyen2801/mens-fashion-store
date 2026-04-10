// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - QUẦN TÂY
const quanTayFAQ = [
  {
    title: "Quần tây nam ICONDENIM thường sử dụng chất liệu gì?",
    content:
      "Quần tây tại ICONDENIM được làm từ các chất liệu cao cấp như sợi Rayon, Polyester pha Spandex. Sự kết hợp này giúp quần có độ bền cao, ít nhăn, giữ form dáng phẳng phiu và có độ co giãn nhẹ tạo sự thoải mái khi mặc.",
  },
  {
    title: "Dòng Quần Tây Airflex có ưu điểm gì đặc biệt?",
    content:
      "Đây là dòng sản phẩm đột phá với chất liệu siêu gọn nhẹ và thoáng khí. Công nghệ vải Airflex giúp bạn luôn cảm thấy mát mẻ, phù hợp cho môi trường công sở năng động hoặc thời tiết nắng nóng.",
  },
  {
    title: "Sidetab trên quần tây có tác dụng gì?",
    content:
      "Sidetab (như mẫu Button Sidetab hay Ratchet Straps) là bộ phận điều chỉnh độ rộng lưng quần ở hai bên sườn. Nó giúp bạn tùy chỉnh vòng eo vừa vặn mà không cần dùng đến thắt lưng, tạo vẻ ngoài tối giản và lịch lãm.",
  },
  {
    title: "Nên chọn form Slimfit hay Ống Suông (Straight) khi mặc quần tây?",
    content:
      "Slimfit phù hợp với những người thích vẻ ngoài hiện đại, tôn dáng chân. Trong khi đó, form Ống Suông (như mẫu Hidden Waist) mang lại sự thoải mái tuyệt đối và vẻ đẹp cổ điển, trưởng thành.",
  },
  {
    title: "Cách bảo quản quần tây để giữ nếp ly quần lâu nhất?",
    content:
      "Bạn nên treo quần bằng móc chuyên dụng, lộn trái khi giặt và sử dụng bàn là hơi nước ở nhiệt độ vừa phải. Tránh giặt chung với các loại vải thô cứng để bảo vệ bề mặt sợi vải mịn màng.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreTay = {
  page: "quan-tay-nam-icondenim",
  pageDetails: {
    bannerImage: "/images/banners/quan-tay.jpg",
    sections: [
      {
        type: "hero",
        title: "Quần Tây Nam Lịch Lãm, Chuẩn Form Công Sở - ICONDENIM",
        description:
          "Quần tây nam là nền tảng của phong cách quý ông hiện đại. Tại ICONDENIM, chúng tôi mang đến những thiết kế tối giản, tinh tế, từ dòng Zenith Slimfit đến các mẫu Sidetab không cần thắt lưng.",
      },
      {
        type: "intro",
        title: "Đẳng cấp từ đường kim mũi chỉ",
        content: [
          "Mỗi chiếc quần tây ICONDENIM đều trải qua quy trình kiểm soát chất lượng nghiêm ngặt. Chúng tôi chú trọng vào bản rập thiết kế sao cho phù hợp nhất với vóc dáng đàn ông Việt, giúp che khuyết điểm và tôn lên chiều cao.",
          "Sự đa dạng về màu sắc từ đen cổ điển, xám sang trọng đến các tông màu be hiện đại giúp bạn dễ dàng phối cùng sơ mi, polo hay blazer.",
        ],
      },
      {
        type: "product_list",
        title: "Các dòng quần tây được yêu thích nhất",
        items: [
          {
            name: "Quần Tây Airflex Siêu Gọn Nhẹ",
            description:
              "Giải pháp hoàn hảo cho sự thoải mái suốt 8 tiếng làm việc nhờ trọng lượng siêu nhẹ.",
          },
          {
            name: "Quần Tây Sidetab (Không thắt lưng)",
            description:
              "Thiết kế hiện đại giúp tùy chỉnh vòng eo linh hoạt, mang lại phong cách gọn gàng, thanh thoát.",
          },
          {
            name: "Quần Tây Zenith Slimfit",
            description:
              "Form dáng ôm gọn tinh tế, là sự lựa chọn số một cho các dịp quan trọng.",
          },
        ],
      },
    ],
  },
};

// 3. DỮ LIỆU SẢN PHẨM QUẦN TÂY (DỰA TRÊN ẢNH DANH MỤC CỦA BẠN)
const productsTay = [
  {
    id: 601,
    name: "Quần Tây Nam Zenith Form Slimfit",
    sku: "QT001",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_tay/trousers_zenith_slimfit.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
  {
    id: 602,
    name: "Quần Tây Nam Airflex Siêu Gọn Nhẹ",
    sku: "QT002",
    price: 499000,
    salePrice: 499000,
    image: "/images/products/quan_tay/trousers_airflex_light.jpg",
    status: "BÁN CHẠY",
    category: "Quần Tây",
  },
  {
    id: 603,
    name: "Quần Tây Nam Urban Trousers Form...",
    sku: "QT003",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_tay/trousers_urban_form.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
  {
    id: 604,
    name: "Quần Tây Nam Monte Harrison Trousers...",
    sku: "QT004",
    price: 479000,
    salePrice: 479000,
    image: "/images/products/quan_tay/trousers_monte_harrison.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
  {
    id: 605,
    name: "Quần Tây Nam Ống Ôm Ratchet Straps...",
    sku: "QT005",
    price: 420000,
    salePrice: 420000,
    image: "/images/products/quan_tay/trousers_ratchet_straps.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
  {
    id: 606,
    name: "Quần Tây Nam Ống Ôm Button Sidetab...",
    sku: "QT006",
    price: 449000,
    salePrice: 449000,
    image: "/images/products/quan_tay/trousers_button_sidetab.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
  {
    id: 607,
    name: "Quần Tây Nam Ống Suông Hidden Waist",
    sku: "QT007",
    price: 439000,
    salePrice: 349000, // Đang giảm giá trong ảnh
    image: "/images/products/quan_tay/trousers_hidden_waist.jpg",
    status: "SALE",
    category: "Quần Tây",
  },
  {
    id: 608,
    name: "Quần Tây Nam Ống Suông Sidetab For...",
    sku: "QT008",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_tay/trousers_sidetab_straight.jpg",
    status: "BEST SELLER",
    category: "Quần Tây",
  },
  {
    id: 609,
    name: "Quần Tây Nam Ống Suông Co Giãn Basic",
    sku: "QT009",
    price: 419000,
    salePrice: 419000,
    image: "/images/products/quan_tay/trousers_stretch_basic.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
  {
    id: 610,
    name: "Quần Tây Nam Ống Ôm Basic Trousers",
    sku: "QT010",
    price: 390000,
    salePrice: 390000,
    image: "/images/products/quan_tay/trousers_basic_slim.jpg",
    status: "HÀNG MỚI",
    category: "Quần Tây",
  },
];

// 4. GỘP CHUNG THÀNH quanTayData
const quanTayData = {
  products: productsTay,
  pageDetails: contentSeeMoreTay.pageDetails,
  faqs: quanTayFAQ,
};

export default quanTayData;
