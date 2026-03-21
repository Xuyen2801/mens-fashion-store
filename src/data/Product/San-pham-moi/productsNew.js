// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ)
const sanPhamMoiFAQ = [
  {
    title: "Sản phẩm mới của ICONDENIM có gì đột phá?",
    content:
      "Các mẫu mới nhất luôn được ứng dụng công nghệ vải tiên tiến như ProCOOL, AirFlex và các form dáng hiện đại nhất để đón đầu xu hướng thời trang 2026.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreNew = {
  pageDetails: {
    bannerImage: "/images/banners/hang-moi.jpg",
    sections: [
      {
        type: "hero",
        title: "HÀNG MỚI VỀ - NEW ARRIVALS 2026",
        description:
          "Khám phá những thiết kế mới nhất vừa cập bến ICONDENIM. Sự kết hợp giữa công nghệ vải đột phá và phong cách thời thượng.",
      },
    ],
  },
};

// 3. DANH SÁCH 30 SẢN PHẨM MỚI (ĐÃ ĐƯỢC SẮP XẾP ĐAN XEN)
const productsNew = [
  {
    id: 0,
    name: "Áo Khoác Varsity Nam Stallion Club",
    sku: "AKVS000",
    price: 699000,
    salePrice: 664000,
    image: "/images/products/ao_khoac/01.jpg",
    status: "HÀNG MỚI",
    category: "Áo Khoác",
  }, //
  {
    id: 103,
    name: "Quần Jean Nam AirFlex - Blue 1",
    sku: "QJAF003",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_gon/jeans_gon1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
  }, //
  {
    id: 2,
    name: "Áo Thun Nam Cotton L",
    sku: "ATCDL001",
    price: 329000,
    salePrice: 299000,
    image: "/images/productcart/2.jpg",
    status: "HÀNG MỚI",
    category: "Áo Thun",
  }, //
  {
    id: 501,
    name: "Quần Jogger Cargo Nam Military Form",
    sku: "QJ001",
    price: 579000,
    salePrice: 579000,
    image: "/images/products/quan_jogger/jogger_cargo_military.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  }, //
  {
    id: 401,
    name: "Quần Boxer Nam Base Layer",
    sku: "QB001",
    price: 119000,
    salePrice: 119000,
    image: "/images/products/quan_boxer/boxer_base_layer.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  }, //
  {
    id: 1,
    name: "Áo Khoác Gió Active Nam AirFlex Siêu Nhẹ",
    sku: "AKG001",
    price: 549000,
    salePrice: 521000,
    image: "/images/products/ao_khoac/02.jpg",
    status: "HÀNG MỚI",
    category: "Áo Khoác",
  }, //
  {
    id: 104,
    name: "Quần Jean Nam AirFlex - Blue 2",
    sku: "QJAF004",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_gon/jeans_gon2.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
  }, //
  {
    id: 10,
    name: "Áo Thun Nam Premium Cotton",
    sku: "ATPR010",
    price: 399000,
    salePrice: 349000,
    image: "/images/productcart/11.jpg",
    status: "HÀNG MỚI",
    category: "Áo Thun",
  }, //
  {
    id: 502,
    name: "Quần Dài Nam Linen Ease Trousers Form",
    sku: "QJ002",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_jogger/quan_dai_linen_ease.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  }, //
  {
    id: 402,
    name: "Quần Boxer Nam Basic Logo Form",
    sku: "QB002",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_basic_logo.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  }, //
  {
    id: 2,
    name: "Áo Khoác Gió Nam Phối Nón Rời",
    sku: "AKG002",
    price: 699000,
    salePrice: 664000,
    image: "/images/products/ao_khoac/03.jpg",
    status: "HÀNG MỚI",
    category: "Áo Khoác",
  }, //
  {
    id: 106,
    name: "Quần Jean Nam ProCOOL - Light Blue",
    sku: "QJPC006",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_jeans/jeans_mat/jeans_mat1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
  }, //
  {
    id: 4,
    name: "Áo Thun Nam Cotton Prime Label",
    sku: "ATPL004",
    price: 420000,
    salePrice: 350000,
    image: "/images/productcart/5.jpg",
    status: "HÀNG MỚI",
    category: "Áo Thun",
  }, //
  {
    id: 504,
    name: "Quần Dài Nam Tactical Geared Form",
    sku: "QJ004",
    price: 449000,
    salePrice: 449000,
    image: "/images/products/quan_jogger/quan_dai_tactical.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  }, //
  {
    id: 403,
    name: "Quần Boxer Nam Seamless Knit",
    sku: "QB003",
    price: 100000,
    salePrice: 100000,
    image: "/images/products/quan_boxer/boxer_seamless_knit.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  }, //
  {
    id: 5,
    name: "Áo Khoác Nam Heritage Varsity",
    sku: "AKVS005",
    price: 699000,
    salePrice: 664000,
    image: "/images/products/ao_khoac/06.jpg",
    status: "HÀNG MỚI",
    category: "Áo Khoác",
  }, //
  {
    id: 108,
    name: "Quần Jean Nam Mới 2026 - Indigo",
    sku: "QJNM008",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_moi/jeans_moi1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
  }, //
  {
    id: 6,
    name: "Áo Thun Nam Oversize Street",
    sku: "ATOS006",
    price: 379000,
    salePrice: 329000,
    image: "/images/productcart/7.jpg",
    status: "HÀNG MỚI",
    category: "Áo Thun",
  }, //
  {
    id: 505,
    name: "Quần Dài Kaki Nam Wanderlust Form",
    sku: "QJ005",
    price: 429000,
    salePrice: 429000,
    image: "/images/products/quan_jogger/quan_dai_kaki_wanderlust.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  }, //
  {
    id: 404,
    name: "Quần Boxer Nam Active Camo Form",
    sku: "QB004",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_active_camo.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  }, //
  {
    id: 6,
    name: "Áo Khoác Jean Nam Trucker Steel Mark",
    sku: "AKJ006",
    price: 629000,
    salePrice: 597000,
    image: "/images/products/ao_khoac/07.jpg",
    status: "HÀNG MỚI",
    category: "Áo Khoác",
  }, //
  {
    id: 109,
    name: "Quần Jean Nam Mới 2026 - Black",
    sku: "QJNM009",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_moi/jeans_moi2.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
  }, //
  {
    id: 1,
    name: "Quần Jeans Nam Paints Form Straight",
    sku: "QJID0249-02",
    price: 549000,
    salePrice: 521550,
    image: "/images/products/jeans1.jpg",
    status: "HÀNG MỚI",
    category: "Quần",
  }, //
  {
    id: 507,
    name: "Quần Jogger Linen Nam Basic Form",
    sku: "QJ007",
    price: 389000,
    salePrice: 389000,
    image: "/images/products/quan_jogger/jogger_linen_basic.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  }, //
  {
    id: 405,
    name: "Quần Boxer Nam Active Logo Box Trunks",
    sku: "QB005",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_active_logo.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  }, //
  {
    id: 9,
    name: "Áo Khoác Nam Chống Nắng UltraShade",
    sku: "AKCN009",
    price: 349000,
    salePrice: 249000,
    image: "/images/products/ao_khoac/10.jpg",
    status: "HÀNG MỚI",
    category: "Áo Khoác",
  }, //
  {
    id: 101,
    name: "Quần Smart Jeans™ Nam Org-Blue Faded Wash",
    sku: "QJSD001",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_jeans/jeans_dan/jeans_dan1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
  }, //
  {
    id: 8,
    name: "Áo Polo Nam Basic",
    sku: "PLB008",
    price: 459000,
    salePrice: 399000,
    image: "/images/productcart/9.jpg",
    status: "HÀNG MỚI",
    category: "Áo Polo",
  }, //
  {
    id: 503,
    name: "Quần Jogger Nam Dashfield Nỉ Form",
    sku: "QJ003",
    price: 439000,
    salePrice: 249000,
    image: "/images/products/quan_jogger/jogger_dashfield_ni.jpg",
    status: "HÀNG MỚI",
    category: "Quần Jogger",
  }, //
  {
    id: 406,
    name: "Quần Boxer Cooling Seam Press",
    sku: "QB006",
    price: 120000,
    salePrice: 120000,
    image: "/images/products/quan_boxer/boxer_cooling_seam.jpg",
    status: "HÀNG MỚI",
    category: "Quần Boxer",
  }, //
];

// 4. GỘP CHUNG THÀNH sanPhamMoiData
const sanPhamMoiData = {
  products: productsNew,
  pageDetails: contentSeeMoreNew.pageDetails,
  faqs: sanPhamMoiFAQ,
};

export default sanPhamMoiData;
