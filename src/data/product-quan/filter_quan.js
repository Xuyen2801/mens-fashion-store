// filter_quan.js
export const jeansFilters = [
  { id: "all", label: "TẤT CẢ JEANS", banner: "https://file.hstatic.net/1000360022/file/thumb_-_1_desktop.jpg", folder: "jeans_moi" }, 
  { id: "sieu-co-dan", label: "SIÊU CO DÃN", banner: "/images/banners/homepage/banner-stretch.png", folder: "jeans_dan" },
  { id: "sieu-gon-nhe", label: "SIÊU GỌN NHẸ", banner: "/images/banners/homepage/banner-skinny.png", folder: "jeans_gon" },
  { id: "sieu-mat", label: "SIÊU MÁT", banner: "/images/banners/homepage/banner-cool.png", folder: "jeans_mat" },
  { id: "sieu-nhe", label: "SIÊU NHẸ", banner: "/images/banners/homepage/banner-light.png", folder: "jeans_nhe" },
];

export const productsJeans = [
    // Nhóm SIÊU CO DÃN
  {
    id: "QJ_DAN_01",
    name: "Quần Smart Jeans Nam Siêu Co Giãn Đen Trơn",
    slug: "quan-smart-jeans-nam-sieu-co-dan-den-tron",
    type: "sieu-co-dan", // Khóa để filter
    price: 550000,
    salePrice: 479200,
    image: "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_1.png",
    images: [
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_1.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_2.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_3.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_4.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_5.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_6.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_7.png",
        "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_8.png",
    ],
    variants: [
      { color: "Đen", hex: "#000000", sizes: ["29", "30", "31", "32", "33", "34"], image: "/images/products/quan_jeans/jeans_dan/den_tron/den_tron_1.png" },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Denim co giãn 4 chiều cao cấp",
    description: "Quần Jeans Siêu Co Giãn với chất liệu đặc biệt giúp bạn thoải mái vận động cả ngày dài.",
    promotions: ["Giảm 15% khi mua kèm Áo Thun Siêu Co Giãn"]
  },
  {
    id: "QJ_DAN_02", // ID tiếp theo trong nhóm siêu co giãn
    name: "Quần Smart Jean Nam Siêu Co Giãn Deep Rinse Indigo Form Smart Fit",
    slug: "quan-smart-jean-nam-sieu-co-dan-deep-rinse-indigo-form-smart-fit",
    type: "sieu-co-dan", // Khóa để Chi filter đồng bộ với các mẫu khác
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_1.png",
    images: [
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_1.png",
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_2.png",
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_3.png",
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_4.png",
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_5.png",
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_6.png",
        "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_7.png",
    ],
    variants: [
        { 
        color: "Indigo", 
        hex: "#1A237E", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_dan/indigo_smart/indigo_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim co giãn (Cotton & Spandex)",
    description: "Dòng Smart Jeans với màu Deep Rinse Indigo (xanh đậm nguyên bản) cực kỳ thanh lịch. Công nghệ nhuộm bền màu và vải siêu co giãn giúp giữ form tuyệt đối sau nhiều lần giặt.",
    promotions: ["Tặng Bao lì xì 'Tết Mới Có Tất'"]
    },
    {
    id: "QJ_DAN_03",
    name: "Quần Smart Jeans Nam Siêu Co Giãn Xanh Nhạt Form Smart Fit",
    slug: "quan-smart-jeans-nam-sieu-co-dan-xanh-nhat-form-smart-fit",
    type: "sieu-co-dan",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_1.png",
    images: [
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_1.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_2.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_3.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_4.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_5.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_6.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_7.png",
        "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_8.png",
    ],
    variants: [
        { 
        color: "Xanh Nhạt", 
        hex: "#D1EAF5", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_dan/nhat_smart/nhat_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu co giãn (Cotton pha Spandex)",
    description: "Màu Xanh Nhạt (Light Blue) trẻ trung, được wash nhẹ nhàng tạo độ tự nhiên. Form dáng Smart Fit kết hợp cùng chất liệu siêu co giãn mang lại vẻ ngoài năng động và sự thoải mái tuyệt đối.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_DAN_04",
    name: "Quần Smart Jeans Nam Siêu Co Giãn Xám Trơn Form Smart Fit",
    slug: "quan-smart-jeans-nam-sieu-co-dan-xam-tron-form-smart-fit",
    type: "sieu-co-dan",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_dan/smart_fit/smart_1.png",
    images: [
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_1.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_2.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_3.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_4.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_5.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_6.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_7.png",
        "/images/products/quan_jeans/jeans_dan/smart_fit/smart_8.png", 
    ],
    variants: [
        { 
        color: "Xám Trơn", 
        hex: "#808080", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_dan/smart_fit/smart_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu co giãn (Cotton, Polyester & Spandex)",
    description: "Tông màu Xám Trơn (Solid Grey) trung tính, dễ dàng phối hợp với nhiều phong cách khác nhau. Chất liệu vải được tối ưu độ co giãn, giúp Chi thoải mái trong mọi cử động mà không lo mất form quần.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_DAN_05",
    name: "Quần Smart Jeans Nam Siêu Co Giãn Xanh Đậm Form Smart Fit",
    slug: "quan-smart-jeans-nam-sieu-co-dan-xanh-dam-form-smart-fit",
    type: "sieu-co-dan",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_1.png",
    images: [
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_1.png",
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_2.png",
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_3.png",
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_4.png",
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_5.png",
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_7.png",
        "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_8.png",
    ],
    variants: [
        { 
        color: "Xanh Đậm", 
        hex: "#102C57", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_dan/xanh_dam/xanh_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim co giãn cao cấp (98% Cotton, 2% Spandex)",
    description: "Màu Xanh Đậm (Dark Blue) nam tính, lịch lãm, dễ dàng phối hợp với áo sơ mi hoặc áo polo. Chất liệu vải dày dặn nhưng vẫn đảm bảo độ co giãn tuyệt đối nhờ sợi Spandex, giúp Chi thoải mái trong mọi môi trường.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },

    // Nhóm SIÊU GỌN NHẸ
    {
    id: "QJ_GON_01",
    name: "Quần Jeans Nam Airflex Siêu Gọn Nhẹ Black Form Regular",
    slug: "quan-jeans-nam-airflex-sieu-gon-nhe-black-form-regular",
    type: "sieu-gon-nhe", 
    price: 550000,
    salePrice: 550000, 
    image: "/images/products/quan_jeans/jeans_gon/black_regular/regular_1.png",
    images: [
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_1.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_2.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_3.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_4.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_5.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_6.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_7.png",
        "/images/products/quan_jeans/jeans_gon/black_regular/regular_8.png",
    ],
    variants: [
        { 
        color: "Đen", 
        hex: "#000000", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_gon/black_regular/regular_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Airflex (Siêu nhẹ, thoáng khí)",
    description: "Dòng Airflex đột phá với trọng lượng siêu nhẹ, giúp Chi mặc như không mặc. Form dáng Regular thoải mái, không quá ôm, cực kỳ phù hợp cho những ngày cần vận động nhiều hoặc di chuyển trong thời tiết nóng ẩm.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_GON_02",
    name: "Quần Jeans Nam Airflex Siêu Gọn Nhẹ Grey Form Regular",
    slug: "quan-jeans-nam-airflex-sieu-gon-nhe-grey-form-regular",
    type: "sieu-gon-nhe",
    price: 550000,
    salePrice: 550000, 
    image: "/images/products/quan_jeans/jeans_gon/grey_regular/grey_1.png",
    images: [
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_1.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_2.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_3.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_4.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_5.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_6.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_7.png",
        "/images/products/quan_jeans/jeans_gon/grey_regular/grey_8.png",
    ],
    variants: [
        { 
        color: "Xám", 
        hex: "#A9A9A9", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_gon/grey_regular/grey_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Airflex (Cotton & Polyester nhẹ)",
    description: "Mẫu quần Jeans Airflex màu Xám trung tính mang lại vẻ ngoài trẻ trung và thanh lịch. Trọng lượng siêu nhẹ giúp giảm bớt sự nặng nề khi mặc Jeans, mang lại cảm giác thông thoáng tối đa cho người mặc.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_GON_03",
    name: "Quần Jeans Nam Airflex Siêu Gọn Nhẹ Light Grey Form Regular",
    slug: "quan-jeans-nam-airflex-sieu-gon-nhe-light-grey-form-regular",
    type: "sieu-gon-nhe",
    price: 550000,
    salePrice: 550000, 
    image: "/images/products/quan_jeans/jeans_gon/light_grey/light_1.png",
    images: [
        "/images/products/quan_jeans/jeans_gon/light_grey/light_1.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_2.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_3.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_4.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_5.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_6.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_7.png",
        "/images/products/quan_jeans/jeans_gon/light_grey/light_8.png",
    ],
    variants: [
        { 
        color: "Xám Nhạt", 
        hex: "#D3D3D3", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_gon/light_grey/light_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Airflex mỏng nhẹ, thoáng khí",
    description: "Màu Light Grey (Xám Nhạt) cực kỳ nịnh mắt và dễ phối đồ, mang lại cảm giác nhẹ nhàng ngay từ cái nhìn đầu tiên. Chất liệu Airflex giúp quần có trọng lượng tối ưu, là lựa chọn số 1 cho những ngày hè năng động.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },

    // nhóm SIÊU MÁT
    {
    id: "QJ_MAT_01", // ID đầu tiên cho nhóm Siêu Mát
    name: "Quần Jeans Nam Siêu Mát Ống Ôm Procool Bright Sky Blue Form Slim",
    slug: "quan-jeans-nam-sieu-mat-ong-om-procool-bright-sky-blue-form-slim",
    type: "sieu-mat", // Khóa để Chi lọc sang nhóm sản phẩm "Siêu Mát"
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_1.png",
    images: [
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_1.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_2.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_3.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_4.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_5.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_6.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_7.png",
        "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_8.png",
    ],
    variants: [
        { 
        color: "Bright Sky Blue", 
        hex: "#87CEEB", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_mat/bright_sky_slim/bright_sky_2.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Procool (Công nghệ làm mát tức thì)",
    description: "Dòng quần Jeans Procool đột phá với khả năng thoát nhiệt vượt trội, giúp hạ nhiệt cơ thể ngay khi mặc. Màu Bright Sky Blue (Xanh trời sáng) mang lại cảm giác tươi mới, cực kỳ phù hợp cho những ngày nắng nóng.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_MAT_02",
    name: "Quần Jeans Nam Siêu Mát Ống Ôm Procool Dark Grey Form Slim Fit",
    slug: "quan-jeans-nam-sieu-mat-ong-om-procool-dark-grey-form-slim-fit",
    type: "sieu-mat",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_1.png",
    images: [
        "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_1.png",
        "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_2.png",
        "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_3.png",
        "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_4.png",
        "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_5.png",
        "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_6.png",
    ],
    variants: [
        { 
        color: "Xám Đậm", 
        hex: "#4F4F4F", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_mat/dark_grey_fit/dark_grey_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Procool công nghệ mới (Thoáng mát, co giãn nhẹ)",
    description: "Mẫu quần Jeans màu Xám Đậm (Dark Grey) thuộc dòng Procool với tính năng làm mát chủ động. Form Slim Fit ôm gọn năng động giúp Chi vừa giữ được vẻ lịch sự vừa cảm nhận được sự thông thoáng tối đa trong mọi điều kiện thời tiết.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_MAT_03",
    name: "Quần Jeans Nam Siêu Mát Ống Ôm Procool Performance Indigo Form Slim Fit",
    slug: "quan-jeans-nam-sieu-mat-ong-om-procool-performance-indigo-form-slim-fit",
    type: "sieu-mat",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_1.png",
    images: [
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_1.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_2.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_3.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_4.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_5.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_6.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_7.png",
        "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_8.png",
    ],
    variants: [
        { 
        color: "Indigo", 
        hex: "#1E3A5F", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_mat/indigo_slim/indigo_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Procool Performance (Thoáng khí, bền màu)",
    description: "Sắc xanh Indigo cổ điển kết hợp cùng công nghệ làm mát Procool giúp Chi luôn thoải mái mà vẫn giữ được vẻ ngoài chỉn chu. Form Slim Fit hiện đại giúp tôn dáng hiệu quả.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_MAT_04",
    name: "Quần Jeans Nam Siêu Mát Ống Ôm Procool Light Grey Form Slim",
    slug: "quan-jeans-nam-sieu-mat-ong-om-procool-light-grey-form-slim",
    type: "sieu-mat",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_1.png",
    images: [
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_1.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_2.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_3.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_4.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_5.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_6.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_7.png",
        "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_8.png",
    ],
    variants: [
        { 
        color: "Xám Nhạt", 
        hex: "#CFD8DC", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_mat/light_grey_slim/light_slim_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Procool siêu nhẹ (Thoát nhiệt tối ưu)",
    description: "Phiên bản màu Xám Nhạt hiện đại dành riêng cho dòng Siêu Mát. Công nghệ Procool giúp hạ nhiệt tức thì, cực kỳ dễ chịu khi mặc đi làm hoặc đi dạo phố dưới trời nắng.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_MAT_05",
    name: "Quần Jeans Nam Siêu Mát Ống Ôm Procool Sand Blue Form Slim Fit",
    slug: "quan-jeans-nam-sieu-mat-ong-om-procool-sand-blue-form-slim-fit",
    type: "sieu-mat",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_1.png",
    images: [
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_1.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_2.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_3.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_4.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_5.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_6.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_7.png",
        "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_8.png",
    ],
    variants: [
        { 
        color: "Sand Blue", 
        hex: "#708090", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_mat/sand_blue_slim/sand_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Vải Procool (Công nghệ sợi làm mát)",
    description: "Màu Sand Blue (Xanh cát) độc đáo, mang sắc thái trầm mặc và hiện đại. Sản phẩm thuộc dòng Siêu Mát với công nghệ Procool giúp điều hòa nhiệt độ cơ thể hiệu quả, đặc biệt là trong khí hậu nóng ẩm.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    // Nhóm SIÊU NHẸ
    {
    id: "QJ_NHE_01", // ID đầu tiên cho nhóm Siêu Nhẹ
    name: "Quần Jeans Nam Siêu Nhẹ Ống Suông Indigo ICON105 Form Straight",
    slug: "quan-jeans-nam-sieu-nhe-ong-suong-indigo-icon105-form-straight",
    type: "sieu-nhe",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_1.png",
    images: [
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_1.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_2.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_3.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_4.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_5.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_6.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_7.png",
        "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_8.png",
    ],
    variants: [
        { 
        color: "Indigo", 
        hex: "#203354", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_nhe/indigo_nhe/indigo_nhe_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu nhẹ (Lightweight Denim)",
    description: "Dòng sản phẩm ICON105 trọng lượng siêu nhẹ, giúp giải phóng đôi chân khỏi sự nặng nề của vải jeans truyền thống. Form Straight suông thẳng mang lại vẻ ngoài cổ điển và cực kỳ thoải mái.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_NHE_02",
    name: "Quần Jean Nam Siêu Nhẹ Ống Suông Light Grey ICON105 Form Straight",
    slug: "quan-jean-nam-sieu-nhe-ong-suong-light-grey-icon105-form-straight",
    type: "sieu-nhe",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_1.png",
    images: [
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_1.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_2.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_3.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_4.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_5.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_6.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_7.png",
        "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_8.png",
    ],
    variants: [
        { 
        color: "Xám Nhạt", 
        hex: "#BDBDBD", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_nhe/light_grey_nhe/light_nhe_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu nhẹ cao cấp",
    description: "Sự kết hợp hoàn hảo giữa công nghệ vải nhẹ và form dáng Straight rộng rãi. Màu Light Grey hiện đại giúp Chi dễ dàng mix-match với mọi loại trang phục hằng ngày.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_NHE_03",
    name: "Quần Jeans Nam Siêu Nhẹ Ống Suông ICON105 Lightweight Off-White Form Straight",
    slug: "quan-jeans-nam-sieu-nhe-ong-suong-icon105-lightweight-off-white-form-straight",
    type: "sieu-nhe",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_1.png",
    images: [
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_1.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_2.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_3.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_4.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_5.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_6.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_7.png",
        "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_8.png",
    ],
    variants: [
        { 
        color: "Trắng Kem", 
        hex: "#F5F5DC", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_nhe/lightweight/lightweight_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu nhẹ (Cotton đặc biệt)",
    description: "Mẫu quần ICON105 với tông màu Off-White hiện đại, mang lại sự tươi mới cho bộ sưu tập Jeans của Chi. Form dáng Straight phóng khoáng kết hợp cùng chất liệu siêu nhẹ giúp Chi thoải mái tuyệt đối trong mọi chuyển động.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_NHE_04",
    name: "Quần Jeans Nam Siêu Nhẹ Ống Suông Xanh Nhạt Trơn ICON105 Form Straight",
    slug: "quan-jeans-nam-sieu-nhe-ong-suong-xanh-nhat-tron-icon105-form-straight",
    type: "sieu-nhe",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_1.png",
    images: [
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_1.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_2.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_3.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_4.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_5.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_6.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_7.png",
        "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_8.png",
    ],
    variants: [
        { 
        color: "nhat Nhạt Trơn", 
        hex: "#B0C4DE", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_nhe/nhat_tron/nhat_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu nhẹ (ICON105 technology)",
    description: "Sắc xanh nhạt trơn trẻ trung, mang lại cảm giác dễ chịu và tươi sáng. Thuộc dòng ICON105 siêu nhẹ với form dáng Straight ống suông, mẫu quần này là sự lựa chọn tối ưu cho phong cách hằng ngày phóng khoáng.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_NHE_05",
    name: "Quần Jeans Nam Siêu Nhẹ Ống Suông Xanh Nhạt ICON105 Form Straight",
    slug: "quan-jeans-nam-sieu-nhe-ong-suong-xanh-nhat-icon105-form-straight",
    type: "sieu-nhe",
    price: 599000,
    salePrice: 599000, 
    image: "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_1.png",
    images: [
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_1.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_2.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_3.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_4.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_5.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_6.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_7.png",
        "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_8.png",
    ],
    variants: [
        { 
        color: "Xanh Nhạt Wash", 
        hex: "#99B3CC", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_nhe/suong_nhat/suong_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim siêu nhẹ (ICON105 technology)",
    description: "Sắc xanh nhạt được wash nhẹ tạo độ phai tự nhiên, mang lại vẻ ngoài bụi bặm nhưng vẫn giữ được sự thanh lịch. Trọng lượng siêu nhẹ kết hợp cùng form Straight giúp Chi vận động cả ngày mà không thấy mệt mỏi.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    // Nhóm MẪU MỚI
    {
    id: "QJ_MOI_01",
    name: "Quần Jeans Nam Dune Form Straight",
    slug: "quan-jeans-nam-dune-form-straight",
    type: "all", 
    price: 650000,
    salePrice: 650000,
    image: "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_1.png",
    images: [
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_1.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_2.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_3.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_4.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_5.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_6.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_7.png",
        "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_8.png",
    ],
    variants: [{
        color: "Dune", hex: "#C2B280", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_moi/dune_strainght/dune_1.png" 
    }],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim cao cấp dòng Dune",
    description: "Mẫu quần Jeans Dune với màu sắc lấy cảm hứng từ những đồi cát, form dáng Straight ống suông mạnh mẽ, mang lại vẻ ngoài bụi bặm và thời thượng."
    },
    {
    id: "QJ_MOI_02",
    name: "Quần Jeans Nam Ống Suông Elevyn Form Straight",
    slug: "quan-jeans-nam-ong-suong-elevyn-form-straight",
    type: "all", 
    price: 680000,
    salePrice: 680000,
    image: "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_1.png",
    images: [
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_1.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_2.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_3.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_4.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_5.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_6.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_7.png",
        "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_8.png",
    ],
    variants: [
        { 
        color: "Xanh Elevyn", 
        hex: "#4682B4", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_moi/elevyn_straight/elevyn_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim cao cấp, bền màu",
    description: "Dòng Elevyn mang phong cách hiện đại với form dáng Straight ống suông, tạo sự thoải mái tối đa cho người mặc mà vẫn giữ được nét cá tính, thời thượng.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_MOI_03",
    name: "Quần Jeans Nam Ống Suông Scar Form Straight",
    slug: "quan-jeans-nam-ong-suong-scar-form-straight-1",
    type: "all", 
    price: 650000,
    salePrice: 650000,
    image: "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_1.png",
    images: [
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_1.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_2.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_3.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_4.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_5.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_6.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_7.png",
        "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_8.png",
    ],
    variants: [
        { 
        color: "Xanh Scar", 
        hex: "#2F4F4F", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_moi/scar_strainght/scar_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim bền bỉ, phong cách bụi bặm",
    description: "Mẫu quần Jeans Scar với những đường nét thiết kế mạnh mẽ, form dáng Straight ống suông mang lại sự phóng khoáng và cá tính cho người mặc.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    },
    {
    id: "QJ_MOI_04",
    name: "Quần Jeans Nam Stallion Prime Form Slim Straight",
    slug: "quan-jeans-nam-stallion-prime-form-slim-straight",
    type: "all", 
    price: 680000,
    salePrice: 650000, // Đang có ưu đãi nhẹ cho dòng Prime
    image: "/images/products/quan_jeans/jeans_moi/slim_straight/slim_1.png",
    images: [
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_1.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_2.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_3.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_4.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_5.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_6.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_7.png",
        "/images/products/quan_jeans/jeans_moi/slim_straight/slim_8.png",
    ],
    variants: [
        { 
        color: "Xanh Stallion", 
        hex: "#3B444B", 
        sizes: ["29", "30", "31", "32", "34", "36"], 
        image: "/images/products/quan_jeans/jeans_moi/slim_straight/slim_1.png" 
        },
    ],
    category: "Quần Jeans",
    brand: "ICONDENIM®",
    material: "Denim Prime cao cấp, dày dặn nhưng thoáng khí",
    description: "Dòng Stallion Prime là sự kết hợp giữa form Slim hiện đại và Straight ống suông cổ điển. Chất liệu Denim Prime mang lại độ bền vượt trội và cảm giác sang trọng cho người mặc.",
    promotions: ["Tặng Bao lì xì cho mọi đơn hàng"]
    }
]
  