// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - QUẦN KAKI & CHINO
const quanKakiFAQ = [
  {
    title: "Quần kaki nam ICONDENIM có những form dáng nào?",
    content:
      "Chúng tôi cung cấp đa dạng form dáng từ Slim-fit (ôm gọn), Skinny (ôm sát), Straight (ống suông cổ điển) đến Baggy (phóng khoáng), phù hợp với mọi nhu cầu từ công sở đến dạo phố.",
  },
  {
    title: "Chất liệu vải kaki tại ICONDENIM có ưu điểm gì?",
    content:
      "Quần được dệt từ sợi cotton bền chắc, có khả năng giữ form đứng rất tốt, ít nhăn và thường được pha thêm sợi Spandex để đảm bảo độ co giãn, giúp người mặc thoải mái vận động cả ngày.",
  },
  {
    title: "Làm sao để chọn size quần kaki chuẩn xác nhất?",
    content:
      "Bạn nên dựa vào số đo vòng lưng và vòng đùi. Ví dụ, với form Slim size 32, vòng lưng khoảng 81cm và dài quần 97cm. Bạn có thể đối chiếu trực tiếp với bảng size chi tiết trên trang sản phẩm.",
  },
  {
    title: "Quần Kaki túi hộp (Cargo Pants) phù hợp với phong cách nào?",
    content:
      "Đây là kiểu quần mang đậm chất Streetstyle, năng động và bụi bặm. Bạn có thể phối cùng áo Hoodie hoặc áo thun Oversize để có vẻ ngoài cool ngầu, cá tính.",
  },
  {
    title: "Cách bảo quản quần kaki để không bị sờn vải hoặc phai màu?",
    content:
      "Nên lộn trái quần khi giặt máy, tránh sử dụng chất tẩy mạnh và không nên phơi trực tiếp dưới ánh nắng gắt để bảo vệ kết cấu sợi vải và màu sắc bền lâu.",
  },
  {
    title: "Quần Chino và Quần Kaki khác nhau điểm nào?",
    content:
      "Về cơ bản chúng khá giống nhau, nhưng dòng Chino thường có chất liệu nhẹ hơn, form dáng thiên về sự thanh lịch, tinh tế (Smart Casual), còn Kaki thường có chất vải dày và thô hơn.",
  },
  {
    title: "Tôi có thể phối quần kaki với áo blazer để đi làm không?",
    content:
      "Hoàn toàn được. Một chiếc quần kaki form Straight hoặc Slim màu trung tính (be, đen, navy) phối cùng sơ mi và blazer sẽ tạo nên set đồ công sở chuyên nghiệp nhưng vẫn trẻ trung.",
  },
  {
    title: "Quần kaki có bị rút sau khi giặt không?",
    content:
      "Tại ICONDENIM, vải kaki đã được qua xử lý ổn định bề mặt nên độ co rút là rất thấp, gần như không đáng kể nếu bạn tuân thủ đúng hướng dẫn giặt ủi.",
  },
  {
    title: "Chính sách đổi trả nếu tôi mua online nhưng mặc không vừa đùi?",
    content:
      "ICONDENIM hỗ trợ đổi size hoặc đổi mẫu trong vòng 7 ngày kể từ khi nhận hàng, miễn là sản phẩm còn nguyên tem mác và chưa qua sử dụng/giặt ủi.",
  },
  {
    title: "Mua quần kaki có được miễn phí vận chuyển không?",
    content:
      "Chúng tôi áp dụng chính sách Freeship toàn quốc cho mọi đơn hàng có giá trị từ 399.000đ trở lên.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreKaki = {
  page: "quan-kaki-nam-icondenim",
  bannerImage: "/images/banners/quan-kaki.jpg",
  sections: [
    {
      type: "hero",
      title: "Quần Kaki Nam Cao Cấp, Đa Dạng Kiểu Dáng - ICONDENIM",
      description:
        "Quần kaki nam luôn là item thời trang vượt thời gian, được phái mạnh yêu thích nhờ vẻ đẹp lịch lãm và tính linh hoạt. Khám phá ngay những mẫu kaki thiết kế mới nhất, từ ống suông túi hộp đến kaki stretch co giãn.",
    },
    {
      type: "intro",
      title: "Tại sao Quần Kaki ICONDENIM được ưa chuộng?",
      content: [
        "Sản phẩm được làm từ chất liệu vải kaki cao cấp với cấu trúc bền bỉ, giúp quần luôn giữ được form dáng đứng sang trọng. Thiết kế tối giản nhưng tinh tế với các chi tiết túi hông và túi sau tiện dụng.",
        "Chúng tôi không ngừng cập nhật các xu hướng mới như Garment Dye (nhuộm sau khi may) hay các dòng túi hộp (Combat Trousers) để mang lại sự mới mẻ cho phong cách người mặc.",
      ],
    },
    {
      type: "product_list",
      title: "Một số dòng quần kaki tiêu biểu",
      items: [
        {
          name: "Quần Kaki Ống Suông Túi Hộp (Cargo)",
          description:
            "Thiết kế năng động với nhiều túi chức năng, phù hợp cho những chuyến đi trải nghiệm hoặc dạo phố.",
          media: {
            type: "video",
            src: "https://youtu.be/3K_IIdJujN0", // Dựa trên video trong ảnh của bạn
          },
        },
        {
          name: "Quần Kaki Classic Five",
          description:
            "Form dáng Slimfit gọn gàng với 5 túi truyền thống, lựa chọn hoàn hảo cho phong cách thường nhật.",
        },
        {
          name: "Quần Kaki Stretch-Band",
          description:
            "Ứng dụng cạp lưng co giãn kín đáo, mang lại sự thoải mái tuyệt đối cho những người phải ngồi làm việc nhiều.",
        },
      ],
    },
    {
      type: "guide",
      title: "Hướng dẫn chọn size quần kaki chuẩn chỉnh",
      steps: [
        "Nắm rõ số đo vòng lưng (eo) và chiều dài chân của bạn.",
        "Chọn size theo bảng quy đổi chi tiết (Ví dụ: Size 30 cho người có vòng lưng 76cm).",
        "Nếu bạn có đùi to, hãy ưu tiên chọn form Straight hoặc tăng 1 size để thoải mái hơn.",
        "Đối với dòng Kaki Stretch (co giãn), bạn có thể chọn size vừa khít để tôn dáng hơn.",
      ],
      media: {
        type: "image",
        src: "/images/products/quan_kaki/bang_size_kaki.jpg", // Bạn bỏ ảnh bảng size vào đây
      },
    },
  ],
};

// 3. DỮ LIỆU SẢN PHẨM QUẦN KAKI (DỰA TRÊN HÌNH ẢNH DANH MỤC)
const productsKaki = [
  {
    id: 301,
    name: "Quần Cargo Nam Washed Khaki Form Straight",
    sku: "QK001",
    price: 449000,
    salePrice: 449000,
    image: "/images/products/quan_kaki/kaki_cargo_washed.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 302,
    name: "Quần Kaki Nam Classic Five Form Slim",
    sku: "QK002",
    price: 449000,
    salePrice: 449000,
    image: "/images/products/quan_kaki/kaki_classic_slim.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 303,
    name: "Quần Kaki Nam Wash ID Form Straight",
    sku: "QK003",
    price: 479000,
    salePrice: 479000,
    image: "/images/products/quan_kaki/kaki_wash_id.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 304,
    name: "Quần Kaki Nam Ống Ôm Stretch-Band",
    sku: "QK004",
    price: 479000,
    salePrice: 479000,
    image: "/images/products/quan_kaki/kaki_stretch_band.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 305,
    name: "Quần Kaki Nam Classic Fit Sideband",
    sku: "QK005",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_kaki/kaki_sideband.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 306,
    name: "Quần Kaki Nam Essential Baggy Pants",
    sku: "QK006",
    price: 449000,
    salePrice: 449000,
    image: "/images/products/quan_kaki/kaki_essential_baggy.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 307,
    name: "Quần Kaki Nam Ống Suông Dual Pocket",
    sku: "QK007",
    price: 529000,
    salePrice: 529000,
    image: "/images/products/quan_kaki/kaki_dual_pocket.jpg",
    status: "BÁN CHẠY",
    category: "Quần Kaki",
  },
  {
    id: 308,
    name: "Quần Kaki Nam Garment Dye With Belt",
    sku: "QK008",
    price: 529000,
    salePrice: 529000,
    image: "/images/products/quan_kaki/kaki_garment_dye.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
  {
    id: 309,
    name: "Quần Kaki Nam Ống Suông Street-Style",
    sku: "QK009",
    price: 299000,
    salePrice: 269100, // Đang SALE trong ảnh của bạn
    image: "/images/products/quan_kaki/kaki_street_style.jpg",
    status: "SALE",
    category: "Quần Kaki",
  },
  {
    id: 310,
    name: "Quần Kaki Nam Ống Ôm Detail",
    sku: "QK010",
    price: 419000,
    salePrice: 419000,
    image: "/images/products/quan_kaki/kaki_slim_detail.jpg",
    status: "HÀNG MỚI",
    category: "Quần Kaki",
  },
];

// 4. GỘP CHUNG THÀNH kakiData
const kakiData = {
  products: productsKaki,
  pageDetails: contentSeeMoreKaki,
  faqs: quanKakiFAQ,
};

export default kakiData;
