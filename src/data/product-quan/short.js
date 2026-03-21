// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - QUẦN SHORT
const quanShortFAQ = [
  {
    title: "Nên chọn quần short dài đến đâu là đẹp nhất cho nam giới?",
    content:
      "Độ dài lý tưởng nhất là gấu quần nằm trên đầu gối khoảng 2-3cm. Độ dài này giúp đôi chân trông dài hơn và tạo vẻ ngoài năng động, hiện đại.",
  },
  {
    title: "Quần short Kaki và quần short Nỉ (Base Unit) khác nhau thế nào?",
    content:
      "Quần short Kaki có form đứng, lịch sự, phù hợp đi chơi hoặc dạo phố. Quần short Nỉ có bề mặt mềm mại, co giãn tốt, cực kỳ thoải mái để mặc ở nhà hoặc tập thể thao.",
  },
  {
    title: "Dòng Quần Short Tây AirFlex có gì đặc biệt?",
    content:
      "Đây là dòng sản phẩm sử dụng chất liệu vải tây cao cấp kết hợp công nghệ AirFlex siêu gọn nhẹ, ít nhăn, phù hợp cho phong cách Smart Casual khi phối cùng áo sơ mi hoặc polo.",
  },
  {
    title: "Làm sao để phối quần short jean mà không bị trông quá 'bụi bặm'?",
    content:
      "Bạn nên chọn các dòng Jean Siêu Nhẹ với màu trung tính như Dark Grey hoặc Blue Navy, phối cùng một chiếc áo thun trơn basic và giày sneaker trắng để giữ vẻ thanh lịch.",
  },
  {
    title: "Quần short ICONDENIM có bị ra màu khi giặt không?",
    content:
      "Với các dòng vải Orgnik và Wash, chúng tôi đã xử lý cầm màu công nghiệp. Tuy nhiên, ở lần giặt đầu tiên, bạn vẫn nên giặt riêng với nước lạnh để đảm bảo độ bền màu tốt nhất.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreShorts = {
  page: "quan-short-nam-icondenim",
  bannerImage: "/images/banners/quan-short.jpg",
  sections: [
    {
      type: "hero",
      title: "Quần Short Nam Năng Động, Đa Dạng Chất Liệu - ICONDENIM",
      description:
        "Bộ sưu tập quần short nam ICONDENIM tập trung vào sự thoải mái và tính ứng dụng cao. Từ chất liệu Kaki Stretch, Orgnik Wash đến dòng AirFlex đột phá, giúp bạn luôn tự tin trong mọi hoạt động mùa hè.",
    },
    {
      type: "intro",
      title: "Phong cách thoải mái cùng Short ICONDENIM",
      content: [
        "Quần short nam tại ICONDENIM được thiết kế với nhiều form dáng như Loose (rộng rãi), Regular (vừa vặn) và Slim (ôm nhẹ). Chúng tôi sử dụng các chất liệu thân thiện với làn da và có độ bền cao.",
        "Dòng sản phẩm 'Orgnik' tập trung vào các tông màu tự nhiên và kỹ thuật nhuộm an toàn, trong khi dòng 'AirFlex' mang lại trải nghiệm nhẹ tênh cho người mặc.",
      ],
    },
    {
      type: "product_list",
      title: "Các dòng quần short nổi bật",
      items: [
        {
          name: "Short Kaki Movement",
          description:
            "Chất liệu kaki co giãn nhẹ, bền bỉ, phù hợp cho mọi di chuyển hàng ngày.",
        },
        {
          name: "Short Tây AirFlex",
          description:
            "Phẳng phiu, ít nhăn và siêu thoáng khí, mang lại diện mạo chỉn chu.",
          media: {
            type: "image",
            // Đã sửa thành .jpg
            src: "/images/products/quan_short/short_tay_airflex.jpg",
          },
        },
        {
          name: "Short Nỉ Base Unit",
          description:
            "Mềm mại, thấm hút mồ hôi tốt, lý tưởng cho các hoạt động vận động mạnh.",
        },
      ],
    },
  ],
};

// 3. DỮ LIỆU SẢN PHẨM QUẦN SHORT (TẤT CẢ ĐÃ ĐỔI THÀNH .JPG)
const productsShorts = [
  {
    id: 201,
    name: "Quần Short Nam Speckled Form Loose",
    sku: "QS001",
    price: 329000,
    salePrice: 329000,
    image: "/images/products/quan_short/short_loose_1.jpg",
    status: "MỚI",
    category: "Quần Short",
  },
  {
    id: 202,
    name: "Set Đồ Nam Ngắn Orgnik Form Regular",
    sku: "QS002",
    price: 399000,
    salePrice: 399000,
    image: "/images/products/quan_short/set_orgnik.jpg",
    status: "HOT",
    category: "Quần Short",
  },
  {
    id: 203,
    name: "Quần Short Nam Orgnik Wash Form",
    sku: "QS003",
    price: 419000,
    salePrice: 419000,
    image: "/images/products/quan_short/short_wash.jpg",
    status: "BÁN CHẠY",
    category: "Quần Short",
  },
  {
    id: 204,
    name: "Set Đồ Jean Nam Lunary",
    sku: "QS004",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_short/set_jean_lunary.jpg",
    status: "MỚI",
    category: "Quần Short",
  },
  {
    id: 205,
    name: "Quần Short Tây Nam AirFlex Siêu Gọn",
    sku: "QS005",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_short/short_tay_airflex.jpg",
    status: "HOT",
    category: "Quần Short",
  },
  {
    id: 206,
    name: "Quần Short Nam Orgnik Raw Edge",
    sku: "QS006",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_short/short_raw_edge.jpg",
    status: "MỚI",
    category: "Quần Short",
  },
  {
    id: 207,
    name: "Quần Short Nam Kaki Stretch Cargo",
    sku: "QS007",
    price: 379000,
    salePrice: 379000,
    image: "/images/products/quan_short/short_cargo.jpg",
    status: "HOT",
    category: "Quần Short",
  },
  {
    id: 208,
    name: "Quần Short Nỉ Nam Base Unit Form",
    sku: "QS008",
    price: 249000,
    salePrice: 249000,
    image: "/images/products/quan_short/short_ni_base.jpg",
    status: "MỚI",
    category: "Quần Short",
  },
  {
    id: 209,
    name: "Quần Jean Nam Siêu Nhẹ Dark Grey",
    sku: "QS009",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_short/short_jean_grey.jpg",
    status: "HOT",
    category: "Quần Short",
  },
  {
    id: 210,
    name: "Quần Short Jean Nam Siêu Nhẹ ICON10",
    sku: "QS010",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_short/short_jean_icon10.jpg",
    status: "BÁN CHẠY",
    category: "Quần Short",
  },
];

// 4. GỘP CHUNG THÀNH shortData
const shortData = {
  products: productsShorts,
  pageDetails: contentSeeMoreShorts,
  faqs: quanShortFAQ,
};

export default shortData;
