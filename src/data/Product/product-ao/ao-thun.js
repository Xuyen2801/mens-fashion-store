// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ)
const aothunFAQ = [
  {
    title: "Tôi nên chọn form áo thun nào cho dáng người bình thường, muốn mặc gọn nhưng không bó?",
    content: "Với dáng người trung bình và muốn mặc gọn vừa mà vẫn thoải mái, bạn nên chọn form Regular. Form này giúp vai, tay và thân rơi tự nhiên, không ôm sát bụng, dễ mặc đi làm lẫn đi chơi. Nếu thích rộng rãi hơn, bạn có thể cân nhắc form Relaxed hoặc Oversize."
  },
  {
    title: "Nên chọn áo thun form slim, regular hay relaxed nếu vai to và hơi có bụng?",
    content: "Bạn nên chọn form Regular để giữ vai ngực gọn nhưng không ôm bụng, giúp tổng thể cân đối và thoải mái hơn so với slim, đồng thời không bị rộng quá như relaxed."
  },
  {
    title: "Form áo thun nào thì hợp với quần ống suông?",
    content: "Form Regular hoặc Relaxed hợp nhất. Thân áo vừa hoặc hơi rộng nhẹ giúp cân bằng độ suông của quần, nhìn tự nhiên và gọn mắt hơn."
  },
  {
    title: "Áo thun nào phù hợp để đi chạy bộ?",
    content: "Bạn nên chọn áo thun chất liệu mát và nhanh khô như dòng ProCOOL, với bề mặt nhẹ, thoáng khí và thấm hút tốt để di chuyển nhiều vẫn thoải mái."
  },
  {
    title: "Áo thun oversize có hợp với dáng người thấp không, cần chú ý gì về chiều dài áo?",
    content: "Vẫn hợp nếu bạn chọn chiều dài vừa chạm hoặc hơi qua hông một chút. Tránh áo quá dài vì sẽ làm dáng người trông thấp hơn."
  },
  {
    title: "Tôi muốn mặc áo thun với quần tây theo phong cách smart casual, cần lưu ý gì khi chọn áo?",
    content: "Bạn nên chọn áo thun form Regular với tông màu trung tính và thiết kế tối giản. Chất liệu mịn, bề mặt sạch sẽ sẽ giúp tổng thể lịch sự khi phối với quần tây."
  },
  {
    title: "Mua áo thun online làm sao chọn size cho chuẩn, sợ mặc không vừa?",
    content: "Bạn chỉ cần cung cấp chiều cao, cân nặng và kiểu mặc yêu thích (ôm vừa hay rộng), đội ngũ tư vấn sẽ gợi ý size phù hợp. Bạn cũng có thể so với chiếc áo thun đang mặc vừa ở nhà và đối chiếu bảng size trên trang sản phẩm để tự tự tin hơn."
  },
  {
    title: "Nếu nhận áo thun bị lỗi (rách chỉ, in lỗi, lem màu) thì ICONDENIM hỗ trợ thế nào?",
    content: "Nếu áo thun có lỗi từ sản xuất hoặc khác biệt rõ so với mô tả, bạn chỉ cần chụp lại tình trạng và liên hệ ICONDENIM. Shop sẽ kiểm tra và hỗ trợ đổi mới hoặc xử lý theo chính sách đổi trả để đảm bảo quyền lợi."
  },
  {
    title: "Tôi mua áo thun về mặc không hợp size hoặc không hợp màu, có đổi được không?",
    content: "Được, miễn áo còn nguyên tem mác, chưa giặt, chưa sử dụng và còn trong thời gian đổi trả. Bạn có thể đổi sang size khác hoặc mẫu áo thun khác; nếu có chênh lệch giá sẽ xử lý theo quy định tại thời điểm đổi."
  },
  {
    title: "Mua áo thun online và mua tại cửa hàng, chính sách đổi trả có khác nhau không?",
    content: "Không. Đơn online và tại cửa hàng đều áp dụng chung chính sách. Bạn chỉ cần cung cấp mã đơn hoặc hóa đơn để shop hỗ trợ đổi size, đổi mẫu hoặc xử lý các trường hợp lỗi."
  }
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreAoThun = {
  page: "ao-thun-nam-icondenim",
  bannerImage: "/images/banners/banner_nhom_sp_ao_thunjpg.jpg",
  sections: [
    {
      type: "hero",
      title: "Áo Thun Nam Đẹp Giá Tốt, Đa Dạng Mẫu Mã - ICONDENIM",
      description:
        "Nắm bắt được xu hướng thời trang nhanh gọn giữa nhịp sống tất bật, ICONDENIM tự hào mang đến những mẫu áo thun cao cấp, đa dạng phong cách giúp bạn tự tin thể hiện bản thân. Hãy cùng ICONDENIM khẳng định phong cách với bộ sưu tập áo thun thiết kế độc quyền đầy ấn tượng!",
    },
    {
      type: "intro",
      title: "Thương hiệu áo thun thời trang nam ICONDENIM",
      content: [
        "Là thương hiệu thời trang đồng hành cùng nam giới Việt, ICONDENIM luôn chú trọng vào chất lượng và sự đa dạng mẫu mã. Áo thun hàng hiệu của chúng tôi được làm từ cotton cao cấp với định lượng từ 220gsm đến 240gsm. Những chiếc áo thun có độ chắc tay nhất định khi sờ vào, nhưng luôn đảm bảo thấm hút, mềm mại, thoải mái khi mặc. Cùng với đó là form dáng regular tôn lên hình thể, phù hợp nhiều dáng người.",
        "Chúng tôi không đơn thuần là thương hiệu thời trang, mà còn là địa chỉ của những thiết kế độc đáo, thể hiện cá tính riêng. Với đội ngũ thiết kế tâm huyết, chúng tôi luôn cập nhật những xu hướng thời trang mới nhất. Đồng thời sáng tạo những mẫu áo thun mang đậm dấu ấn riêng.",
        "Form dáng regular giúp tôn hình thể, phù hợp nhiều dáng người.",
      ],
    },
    {
      type: "product_list",
      title: "Một số dòng áo thun nam đơn giản cao cấp đang bán chạy",
      items: [
        {
          name: "Áo thun trơn basic",
          description:
            "Kiểu dáng kinh điển, phù hợp cho mọi hoạt động và dễ phối đồ. Áo có nhiều màu sắc để bạn lựa chọn, từ trung tính như đen, trắng, xám đến nổi bật như xanh dương, đỏ, vàng.",
          colors: [],
        },
        {
          name: "Áo thun in hình / thêu nổi",
          description:
            "Thiết kế với các hình ảnh xuất hiện trên áo bằng kỹ thuật in cao thành hoặc thêu đắp nổi, thể hiện các thông điệp hướng tới tinh thần \"Enjoy Life!\".",
          media: {
            type: "image",
            src: "/images/products/Product_seemore_aoThun/ao-thun-nam_01.jpg",
          },
        },
        {
          name: "Áo thun Typo",
          description:
            "Khai thác về nghệ thuật sắp xếp chữ cái, như logo, tên thương hiệu, các câu quotes truyền cảm hứng.",
        },
        {
          name: "Áo thun Pattern",
          description:
            "Họa tiết lặp lại dàn trải toàn bộ bề mặt, nổi bật nhưng sang trọng bởi tính đồng bộ, thường cách điệu từ hai chữ cái I và D trong tên thương hiệu.",
        },
        {
          name: "Áo thun ProCool",
          description:
            "Sản phẩm được nghiên cứu và phát triển bởi đội ngũ ICONDENIM®, mang đến cảm giác mát lạnh ngay từ lần chạm đầu tiên, được thiết kế với chất liệu 83% Polyamide và 17% Spandex, giúp bề mặt vải mát lạnh, co giãn linh hoạt và nhanh khô.",
          media: {
            type: "video",
            provider: "youtube",
            src: "https://www.youtube.com/embed/CYlsY93sEMY",
          },
        },
      ],
    },
    {
      type: "guide",
      title: "Hướng dẫn chọn size áo thun nam chuẩn",
      steps: [
        "Nắm rõ số đo cơ thể để dễ dàng tra cứu bảng size của từng thương hiệu.",
        "Nếu bạn có số đo nằm giữa hai size, hãy ưu tiên chọn size lớn hơn để đảm bảo sự thoải mái.",
        "Nếu bạn có vòng ngực đầy đặn, nên chọn áo có độ co giãn tốt hoặc tăng 1 size so với bảng size gợi ý.",
        "Đối với áo thun form rộng, bạn có thể chọn size theo sở thích về độ rộng rãi mong muốn.",
      ],
      media: {
        type: "image",
        src: "/images/products/Product_seemore_aoThun/bang_size.jpg",
      },
    },
    {
      type: "style_guide",
      title: "Cách phối đồ áo thun nam theo kiểu áo và gam màu",
      groups: [
        {
          title: "Phối đồ áo thun trơn",
          items: [
            "Áo thun nam cổ tròn và quần jean: Chọn áo trơn màu trắng, đen, xám hoặc xanh navy. Quần jean skinny, slimfit hay mom jeans đều phù hợp.",
            "Kết hợp với quần short: Chọn áo cotton thoáng mát và quần short để tạo vẻ ngoài năng động.",
            "Kết hợp với áo khoác bomber: Chọn áo khoác bomber có màu sắc nổi bật hoặc họa tiết bắt mắt.",
            "Kết hợp với áo khoác denim: Chọn áo khoác denim lửng hoặc dài tùy sở thích.",
            "Kết hợp với áo blazer: Chọn áo màu trung tính như đen, trắng hoặc xám để dễ dàng phối với áo blazer.",
          ],
          media: {
            type: "video",
            src: "https://youtu.be/otdfcqyALOQ",
          },
        },
        {
          title: "Phối đồ áo thun tay dài",
          items: [
            "Áo thun nam tay dài là một món đồ cực kỳ linh hoạt, dễ dàng phối đồ cho nhiều phong cách khác nhau. Một số gợi ý phối đồ:",
            "Kết hợp với quần short: Chọn áo cotton thoáng mát và quần short để tạo vẻ ngoài năng động.",
            "Phối với quần kaki: Chọn áo trơn màu hoặc họa tiết đơn giản, kết hợp với quần kaki be, đen, hay xanh navy.",
            "Phối với quần jogger: Phong cách năng động, cá tính khi kết hợp áo tay dài với quần jogger.",
            "Phối với quần short: Vào những ngày mát mẻ, phối áo tay dài với quần short để tạo vẻ ngoài trẻ trung, năng động.",
            "Phối với áo khoác: Khi trời lạnh, phối áo tay dài với áo khoác bomber, denim, hay kaki để giữ ấm.",
          ],
        },
        {
          title: "Phối đồ áo thun trắng",
          items: [
            "Áo thun tay lỡ trắng và quần jogger hoặc quần jeans rách gối: Tạo vẻ ngoài bụi bặm, cá tính. Thêm áo khoác bomber, áo denim hoặc gile, phối cùng sneaker hoặc boots.",
            "Áo trắng cùng quần âu chinos hoặc kaki: Tạo sự thanh lịch, gọn gàng. Hoàn thiện set đồ với áo khoác blazer hoặc cardigan, đi kèm giày lười hoặc loafers.",
            "Áo trắng với áo sơ mi khoác ngoài: Mang đến vẻ ngoài chuyên nghiệp, lịch thiệp. Kết hợp với quần tây màu tối như đen, xanh navy hoặc xám.",
            "Áo trắng cùng quần short jeans hoặc kaki Bermuda: Mang đến sự năng động, trẻ trung. Kết hợp với dép lê, sandal hoặc sneaker là lựa chọn hoàn hảo cho những ngày hè nóng bức.",
          ],
        },
        {
          title: "Phối đồ áo thun đen",
          items: [
            'Áo đen + quần jean + sneaker: Set đồ "kinh điển" mà mọi chàng trai đều nên sở hữu.',
            "Áo đen basic và quần tây âu màu be, xám hoặc đen: Mang đến vẻ ngoài thanh lịch, gọn gàng.",
            "Áo đen + quần short kaki hoặc jean: Set đồ thoải mái, phóng khoáng cho những ngày hè nóng bức.",
            "Áo đen + quần yếm: Lựa chọn độc đáo và trendy cho những tín đồ thời trang.",
          ],
        },
      ],
    },
    {
      type: "service",
      title: "Cửa hàng áo thun nam hàng hiệu FREESHIP toàn quốc",
      content: [
        "Miễn phí vận chuyển toàn quốc cho đơn hàng từ 399.000đ.",
        "Đổi trả linh hoạt trong 7 ngày.",
        "Cộng dồn thẻ thành viên lên đến 15%.",
        "Dịch vụ khách hàng chuyên nghiệp, tận tâm.",
      ],
      media: {
        type: "image",
        src: "/images/products/Product_seemore_aoThun/cua_hang_ban_ao_thun_nam_cao_cap.jpg",
      },
    },
    {
      type: "cta",
      title: "Khẳng định phong cách cùng ICONDENIM",
      description:
        "Áo thun cao cấp không chỉ là trang phục mà còn là biểu tượng cá tính. Hãy đến hệ thống cửa hàng ICONDENIM để trải nghiệm ngay hôm nay!",
    },
  ],
};

// 3. DỮ LIỆU SẢN PHẨM ÁO THUN
const productsAoThun = [
  {
    id: 2,
    name: "Áo Thun Nam Cotton L",
    sku: "ATCDL001",
    price: 329000,
    salePrice: 299000,
    discount: 9,
    image: "/images/productcart/2.jpg",
    images: ["/images/productcart/2.jpg", "/images/productcart/2-1.jpg"],
    colors: [
      { name: "Đen", hex: "#1A1A1A", thumbnail: "/images/productcart/2.jpg" },
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: ["XXL"],
    stock: {
      S: 5,
      M: 12,
      L: 18,
      XL: 7,
    },
    totalStock: 42,
    status: "HÀNG MỚI",
    isActive: true,
    category: "Áo Thun",
    tags: ["cotton", "basic", "nam"],
    rating: 4.3,
    reviewCount: 86,
    description: "Áo thun cotton thoáng mát, dễ phối đồ hằng ngày.",
    material: "100% Cotton 180gsm",
    fit: "Regular Fit",
    care: "Giặt máy, lộn trái khi giặt.",
    weight: 200,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-11-20",
    updatedAt: "2024-12-10",
  },
  {
    id: 3,
    name: "Áo Thun Nam In Find New",
    sku: "ATIN002",
    price: 329000,
    salePrice: 199000,
    discount: 40,
    image: "/images/productcart/3.jpg",
    images: ["/images/productcart/3.jpg"],
    colors: [
      { name: "Xám", hex: "#9E9E9E", thumbnail: "/images/productcart/3.jpg" },
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      S: 8,
      M: 10,
      L: 6,
      XL: 4,
    },
    totalStock: 28,
    status: "",
    isActive: true,
    category: "Áo Thun",
    tags: ["in chữ", "trẻ trung", "nam"],
    rating: 4.1,
    reviewCount: 54,
    description: "Áo thun in chữ trẻ trung, năng động.",
    material: "100% Cotton",
    fit: "Regular Fit",
    care: "Giặt nhẹ, không tẩy mạnh.",
    weight: 190,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-10-15",
    updatedAt: "2024-12-01",
  },
  {
    id: 4,
    name: "Áo Thun Nam Cotton Prime Label",
    sku: "ATPL004",
    price: 420000,
    salePrice: 350000,
    discount: 17,
    image: "/images/productcart/5.jpg",
    images: ["/images/productcart/5.jpg"],
    colors: [
      { name: "Trắng", hex: "#F5F5F5", thumbnail: "/images/productcart/5.jpg" },
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      S: 6,
      M: 14,
      L: 11,
      XL: 5,
    },
    totalStock: 36,
    status: "GIẢM GIÁ",
    isActive: true,
    category: "Áo Thun",
    tags: ["prime", "cao cấp", "nam"],
    rating: 4.6,
    reviewCount: 102,
    description: "Áo thun cotton cao cấp, logo tinh tế.",
    material: "Cotton cao cấp",
    fit: "Regular Fit",
    care: "Giặt máy dưới 30°C.",
    weight: 210,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-09-10",
    updatedAt: "2024-11-30",
  },
  {
    id: 5,
    name: "Áo Thun Nam Basic Classic",
    sku: "ATBC005",
    price: 299000,
    salePrice: 259000,
    discount: 13,
    image: "/images/productcart/6.jpg",
    images: ["/images/productcart/6.jpg"],
    colors: [
      { name: "Be", hex: "#D2B48C", thumbnail: "/images/productcart/6.jpg" },
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      S: 9,
      M: 13,
      L: 17,
      XL: 6,
    },
    totalStock: 45,
    status: "",
    isActive: true,
    category: "Áo Thun",
    tags: ["basic", "classic", "nam"],
    rating: 4.0,
    reviewCount: 67,
    description: "Áo thun basic dễ phối mọi phong cách.",
    material: "Cotton 180gsm",
    fit: "Regular Fit",
    care: "Giặt thường.",
    weight: 185,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-08-20",
    updatedAt: "2024-11-15",
  },
  {
    id: 6,
    name: "Áo Thun Nam Oversize Street",
    sku: "ATOS006",
    price: 379000,
    salePrice: 329000,
    discount: 13,
    image: "/images/productcart/7.jpg",
    images: ["/images/productcart/7.jpg"],
    colors: [
      { name: "Xanh Rêu", hex: "#4A5D23", thumbnail: "/images/productcart/7.jpg" },
    ],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      M: 7,
      L: 12,
      XL: 5,
    },
    totalStock: 24,
    status: "HOT",
    isActive: true,
    category: "Áo Thun",
    tags: ["oversize", "streetwear", "nam"],
    rating: 4.7,
    reviewCount: 143,
    description: "Áo thun oversize phong cách streetwear.",
    material: "Cotton dày",
    fit: "Oversize",
    care: "Giặt nhẹ.",
    weight: 280,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-10-01",
    updatedAt: "2024-12-10",
  },
  {
    id: 7,
    name: "Áo Thun Nam Graphic Minimal",
    sku: "ATGM007",
    price: 349000,
    salePrice: 299000,
    discount: 14,
    image: "/images/productcart/8.jpg",
    images: ["/images/productcart/8.jpg"],
    colors: [
      { name: "Đen", hex: "#1A1A1A", thumbnail: "/images/productcart/8.jpg" },
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      S: 11,
      M: 16,
      L: 9,
      XL: 4,
    },
    totalStock: 40,
    status: "",
    isActive: true,
    category: "Áo Thun",
    tags: ["graphic", "minimal", "nam"],
    rating: 4.2,
    reviewCount: 78,
    description: "Áo thun graphic tối giản, dễ phối đồ.",
    material: "Cotton",
    fit: "Regular Fit",
    care: "Giặt máy.",
    weight: 195,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-09-25",
    updatedAt: "2024-12-05",
  },
  {
    id: 8,
    name: "Áo Polo Nam Basic",
    sku: "PLB008",
    price: 459000,
    salePrice: 399000,
    discount: 13,
    image: "/images/productcart/9.jpg",
    images: ["/images/productcart/9.jpg"],
    colors: [
      { name: "Xanh Navy", hex: "#1F3A7A", thumbnail: "/images/productcart/9.jpg" },
    ],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      M: 8,
      L: 15,
      XL: 6,
    },
    totalStock: 29,
    status: "",
    isActive: true,
    category: "Áo Polo",
    tags: ["polo", "lịch sự", "nam"],
    rating: 4.4,
    reviewCount: 91,
    description: "Áo polo nam lịch sự, dễ mặc.",
    material: "Cotton Pique",
    fit: "Regular Fit",
    care: "Giặt nhẹ.",
    weight: 230,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-11-05",
    updatedAt: "2024-12-08",
  },
  {
    id: 9,
    name: "Áo Thun Nam In Typo",
    sku: "ATTP009",
    price: 329000,
    salePrice: 279000,
    discount: 15,
    image: "/images/productcart/10.jpg",
    images: ["/images/productcart/10.jpg"],
    colors: [
      { name: "Trắng", hex: "#F5F5F5", thumbnail: "/images/productcart/10.jpg" },
    ],
    sizes: ["S", "M", "L"],
    outOfStockSizes: [],
    stock: {
      S: 7,
      M: 9,
      L: 5,
    },
    totalStock: 21,
    status: "",
    isActive: true,
    category: "Áo Thun",
    tags: ["typo", "in chữ", "trẻ trung"],
    rating: 3.9,
    reviewCount: 45,
    description: "Áo thun in typo trẻ trung.",
    material: "Cotton",
    fit: "Regular Fit",
    care: "Giặt thường.",
    weight: 185,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-10-20",
    updatedAt: "2024-11-28",
  },
  {
    id: 10,
    name: "Áo Thun Nam Premium Cotton",
    sku: "ATPR010",
    price: 399000,
    salePrice: 349000,
    discount: 13,
    image: "/images/productcart/11.jpg",
    images: ["/images/productcart/11.jpg"],
    colors: [
      { name: "Xanh Navy", hex: "#1F3A7A", thumbnail: "/images/productcart/11.jpg" },
    ],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    stock: {
      S: 10,
      M: 18,
      L: 14,
      XL: 7,
    },
    totalStock: 49,
    status: "HOT",
    isActive: true,
    category: "Áo Thun",
    tags: ["premium", "cotton", "mềm mịn"],
    rating: 4.8,
    reviewCount: 215,
    description: "Áo thun cotton cao cấp, mềm mịn.",
    material: "Premium Cotton",
    fit: "Regular Fit",
    care: "Giặt nhẹ.",
    weight: 200,
    origin: "Việt Nam",
    brand: "DUSK",
    createdAt: "2024-07-15",
    updatedAt: "2024-12-12",
  },
];

// 4. GỘP CHUNG THÀNH aoThunData (ĐỂ DÙNG TRONG TRANG DANH MỤC PAGE.TSX)
const aoThunData = {
  products: productsAoThun,
  pageDetails: contentSeeMoreAoThun,
  faqs: aothunFAQ
};

export default aoThunData;

// =====================================================================
// CÁC HẰNG SỐ PHỤ TRỢ DÀNH CHO CÁC TRANG KHÁC (THANH TOÁN, GIỎ HÀNG,...)
// (Vẫn giữ nguyên export lẻ để không làm vỡ code ở các component khác)
// =====================================================================

export const shippingMethods = [
  {
    id: "standard",
    name: "Giao hàng tiêu chuẩn",
    description: "3–5 ngày làm việc",
    price: 30000,
    estimatedDays: "3–5 ngày",
  },
  {
    id: "express",
    name: "Giao hàng nhanh",
    description: "1–2 ngày làm việc",
    price: 50000,
    estimatedDays: "1–2 ngày",
  },
  {
    id: "same_day",
    name: "Giao trong ngày",
    description: "Nội thành HCM",
    price: 80000,
    estimatedDays: "Hôm nay",
  },
];

export const paymentMethods = [
  { id: "cod", name: "Thanh toán khi nhận hàng (COD)", icon: "💵" },
  { id: "bank_transfer", name: "Chuyển khoản ngân hàng", icon: "🏦" },
  { id: "momo", name: "Ví MoMo", icon: "📱" },
  { id: "vnpay", name: "VNPay", icon: "💳" },
  { id: "zalopay", name: "ZaloPay", icon: "⚡" },
];

export const ORDER_STATUS = {
  CART: { key: "CART", label: "Giỏ hàng", color: "#6B7280", step: 0 },
  PENDING: { key: "PENDING", label: "Chờ xác nhận", color: "#F59E0B", step: 1 },
  CONFIRMED: { key: "CONFIRMED", label: "Đã xác nhận", color: "#3B82F6", step: 2 },
  PROCESSING: { key: "PROCESSING", label: "Đang xử lý", color: "#8B5CF6", step: 3 },
  SHIPPING: { key: "SHIPPING", label: "Đang giao hàng", color: "#06B6D4", step: 4 },
  DELIVERED: { key: "DELIVERED", label: "Đã giao hàng", color: "#10B981", step: 5 },
  PAID: { key: "PAID", label: "Đã thanh toán", color: "#10B981", step: 5 },
  CANCELLED: { key: "CANCELLED", label: "Đã hủy", color: "#EF4444", step: -1 },
  RETURN_REQUESTED: { key: "RETURN_REQUESTED", label: "Yêu cầu hoàn hàng", color: "#F97316", step: -2 },
  RETURNED: { key: "RETURNED", label: "Đã hoàn hàng", color: "#6B7280", step: -2 },
  REFUNDED: { key: "REFUNDED", label: "Đã hoàn tiền", color: "#6B7280", step: -2 },
};

export const vouchers = [
  { code: "DUSK10", type: "percent", value: 10, minOrder: 300000, label: "Giảm 10%" },
  { code: "NEWUSER", type: "fixed", value: 50000, minOrder: 200000, label: "Giảm 50K" },
  { code: "FREESHIP", type: "shipping", value: 100, minOrder: 500000, label: "Miễn phí vận chuyển" },
  { code: "DUSK200", type: "fixed", value: 200000, minOrder: 1000000, label: "Giảm 200K" },
];