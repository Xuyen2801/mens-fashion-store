// 1. Dữ liệu danh sách sản phẩm
const productsAoKhoac = [
  {
    id: 0,
    name: "Áo Khoác Varsity Nam Stallion Club",
    sku: "AKVS000",
    price: 699000,
    salePrice: 664000,
    image: "/images/products/ao_khoac/01.jpg",
    images: ["/images/products/ao_khoac/01.jpg"],
    colors: [{ name: "Đen", thumbnail: "/images/products/ao_khoac/01.jpg" }],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    status: "GIẢM GIÁ",
    description: "Áo khoác varsity phong cách thể thao, trẻ trung.",
    material: "Nỉ phối dù",
    fit: "Regular Fit",
    care: "Giặt nhẹ, không sấy.",
  },
  {
    id: 1,
    name: "Áo Khoác Gió Active Nam AirFlex Siêu Nhẹ",
    sku: "AKG001",
    price: 549000,
    salePrice: 521000,
    image: "/images/products/ao_khoac/02.jpg",
    images: ["/images/products/ao_khoac/02.jpg"],
    colors: [{ name: "Đen", thumbnail: "/images/products/ao_khoac/02.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "GIẢM GIÁ",
    description: "Áo khoác gió siêu nhẹ, gấp gọn tiện lợi.",
    material: "Polyester",
    fit: "Regular Fit",
    care: "Giặt nhẹ.",
  },
  {
    id: 2,
    name: "Áo Khoác Gió Nam Phối Nón Rời",
    sku: "AKG002",
    price: 699000,
    salePrice: 664000,
    image: "/images/products/ao_khoac/03.jpg",
    images: ["/images/products/ao_khoac/03.jpg"],
    colors: [{ name: "Xanh Navy", thumbnail: "/images/products/ao_khoac/03.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "GIẢM GIÁ",
    description: "Áo khoác gió có nón rời, tiện dụng khi di chuyển.",
    material: "Vải dù",
    fit: "Regular Fit",
    care: "Giặt nhẹ.",
  },
  {
    id: 3,
    name: "Áo Khoác Phao Nam Snowward",
    sku: "AKP003",
    price: 799000,
    salePrice: 559000,
    image: "/images/products/ao_khoac/04.jpg",
    images: ["/images/products/ao_khoac/04.jpg"],
    colors: [{ name: "Đen", thumbnail: "/images/products/ao_khoac/04.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "SALE 30%",
    description: "Áo khoác phao giữ ấm tốt cho thời tiết lạnh.",
    material: "Sợi tổng hợp",
    fit: "Regular Fit",
    care: "Giặt tay.",
  },
  {
    id: 4,
    name: "Áo Khoác Jeans Nam Offwhite Pocket",
    sku: "AKJ004",
    price: 599000,
    salePrice: 419000,
    image: "/images/products/ao_khoac/05.jpg",
    images: ["/images/products/ao_khoac/05.jpg"],
    colors: [{ name: "Off White", thumbnail: "/images/products/ao_khoac/05.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "SALE 30%",
    description: "Áo khoác jeans form loose, cá tính.",
    material: "Denim cotton",
    fit: "Loose Fit",
    care: "Giặt riêng màu.",
  },
  {
    id: 5,
    name: "Áo Khoác Nam Heritage Varsity",
    sku: "AKVS005",
    price: 699000,
    salePrice: 664000,
    image: "/images/products/ao_khoac/06.jpg",
    images: ["/images/products/ao_khoac/06.jpg"],
    colors: [{ name: "Xanh Đen", thumbnail: "/images/products/ao_khoac/06.jpg" }],
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    status: "GIẢM GIÁ",
    description: "Áo khoác varsity phong cách cổ điển.",
    material: "Nỉ phối da PU",
    fit: "Regular Fit",
    care: "Giặt nhẹ.",
  },
  {
    id: 6,
    name: "Áo Khoác Jean Nam Trucker Steel Mark",
    sku: "AKJ006",
    price: 629000,
    salePrice: 597000,
    image: "/images/products/ao_khoac/07.jpg",
    images: ["/images/products/ao_khoac/07.jpg"],
    colors: [{ name: "Xanh Denim", thumbnail: "/images/products/ao_khoac/07.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "",
    description: "Áo khoác jean dáng trucker mạnh mẽ.",
    material: "Denim cotton",
    fit: "Regular Fit",
    care: "Giặt riêng màu.",
  },
  {
    id: 7,
    name: "Áo Khoác Hoodie Zip Nam Mixing Stripes",
    sku: "AKH007",
    price: 449000,
    salePrice: 381000,
    image: "/images/products/ao_khoac/08.jpg",
    images: ["/images/products/ao_khoac/08.jpg"],
    colors: [{ name: "Xám", thumbnail: "/images/products/ao_khoac/08.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "SALE 15%",
    description: "Áo hoodie zip form loose, trẻ trung.",
    material: "Nỉ cotton",
    fit: "Loose Fit",
    care: "Giặt nhẹ.",
  },
  {
    id: 8,
    name: "Áo Khoác Phao Nam ICON AirLite",
    sku: "AKP008",
    price: 749000,
    salePrice: 374000,
    image: "/images/products/ao_khoac/09.jpg",
    images: ["/images/products/ao_khoac/09.jpg"],
    colors: [{ name: "Đen", thumbnail: "/images/products/ao_khoac/09.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "SALE 50%",
    description: "Áo khoác phao siêu nhẹ, giữ ấm tốt.",
    material: "Sợi tổng hợp AirLite",
    fit: "Regular Fit",
    care: "Giặt tay.",
  },
  {
    id: 9,
    name: "Áo Khoác Nam Chống Nắng UltraShade",
    sku: "AKCN009",
    price: 349000,
    salePrice: 249000,
    image: "/images/products/ao_khoac/10.jpg",
    images: ["/images/products/ao_khoac/10.jpg"],
    colors: [{ name: "Xám Nhạt", thumbnail: "/images/products/ao_khoac/10.jpg" }],
    sizes: ["M", "L", "XL"],
    outOfStockSizes: [],
    status: "SALE 29%",
    description: "Áo khoác chống nắng, cản UV.",
    material: "Polyester chống UV",
    fit: "Regular Fit",
    care: "Giặt nhẹ.",
  },
];

// 2. Dữ liệu giới thiệu / SEO của trang áo khoác
const aoKhoacNamIcondenim = {
  page: "ao-khoac-nam-icondenim",
  sections: [
    {
      type: "hero",
      title: "Áo Khoác Nam Đẹp, Cá Tính Nhất Hiện Nay - ICONDENIM",
      description:
        "Theo đuổi phong cách smart casual đa ứng dụng, ICONDENIM mang đến bộ sưu tập áo khoác nam cao cấp với thiết kế cá tính, chất liệu bền bỉ và tính năng vượt trội. Không chỉ giữ ấm, áo khoác ICONDENIM còn giúp bạn khẳng định phong cách và sự tự tin trong mọi hoàn cảnh."
    },
    {
      type: "intro",
      title: "Thương hiệu áo khoác nam thời trang ICONDENIM",
      content: [
        "ICONDENIM đem đến bộ sưu tập áo khoác nam được làm từ chất liệu cao cấp, tích hợp nhiều tính năng hiện đại, phù hợp với nhu cầu sử dụng hằng ngày của nam giới Việt. Mỗi thiết kế đều chú trọng vào form dáng năng động, dễ mặc, dễ phối đồ và có tính ứng dụng cao.",
        "Áo khoác ICON DENIM sở hữu kiểu dáng thời trang, mẫu mã đa dạng từ bomber, áo khoác jean, áo khoác dù, hoodie đến áo khoác da. Các thiết kế vừa giúp giữ ấm, che chắn cơ thể, vừa mang lại vẻ ngoài cá tính, hiện đại.",
        "Không chỉ là trang phục, áo khoác ICONDENIM còn là tuyên ngôn phong cách, đồng hành cùng bạn trong công việc, dạo phố hay những chuyến đi xa."
      ]
    },
    {
      type: "product_list",
      title: "Những mẫu áo khoác nam đẹp nhất hiện nay bán chạy tại ICONDENIM",
      items: [
        {
          name: "Áo khoác dù",
          description:
            "Chất liệu mỏng nhẹ, trượt nước, chống tia UV hiệu quả với vải dù waterproof. Thiết kế tiện dụng, dễ gấp gọn, phù hợp cho mọi điều kiện thời tiết và các hoạt động ngoài trời.",
          media: {
            type: "image",
            src: "/images/products/Seemore-ao-khoac/ao_khoac_du.jpg",
          }
        },
        {
          name: "Áo khoác Jean",
          description:
            "Chất liệu denim bền bỉ, form dáng đứng cá tính, hiệu ứng wash màu nổi bật. Dễ phối đồ theo phong cách casual, street style, mang đến vẻ ngoài trẻ trung và mạnh mẽ.",
          media: {
            type: "image",
            src: "/images/products/Seemore-ao-khoac/ao_khoac_jean.jpg",
          }
        },
        {
          name: "Áo khoác Bomber",
          description:
            "Thiết kế bụi bặm, cá tính với nhiều biến thể từ bomber cổ điển, bomber varsity đến bomber da hoặc vải dù. Phù hợp với phong cách trẻ trung, năng động.",
          media: {
            type: "image",
            src: "/images/products/Seemore-ao-khoac/ao-khoac-nam-thoi-trang-giu-am.jpg",
          }
        },
        {
          name: "Áo khoác Hoodie",
          description:
            "Chất liệu nỉ mềm mại, dày dặn, giữ ấm tốt. Kiểu dáng đa dạng từ basic đến in hình, thêu chữ, dễ phối cùng quần jean, kaki hoặc jogger.",
          media: {
            type: "video",
            src: "https://www.youtube.com/watch?v=7lujbbXlfNE",
          }
        },
        {
          name: "Áo khoác da",
          description:
            "Chất liệu da cao cấp, bền bỉ, chống thấm nước tốt. Đường may tinh tế, form dáng chuẩn giúp tôn vóc dáng và mang lại vẻ ngoài sang trọng, mạnh mẽ.",
          media: {
            type: "image",
            src: "/images/products/Seemore-ao-khoac/ao_khoac_da.jpg",
          }
        },
        {
          name: "Áo khoác nỉ / Denim lót bông",
          description:
            "Khả năng giữ ấm tốt, mềm mại và thoải mái khi mặc. Phù hợp cho thời tiết se lạnh, dễ phối đồ từ phong cách công sở đến dạo phố."
        }
      ]
    },
    {
      type: "guide",
      title: "Các kiểu form dáng áo khoác nam tại ICONDENIM",
      steps: [
        "Áo khoác có nón: Hoodie mang phong cách streetwear trẻ trung; áo khoác dù có nón chống nước, tiện lợi cho ngày mưa.",
        "Áo khoác không nón: Bomber cá tính, áo khoác jean phá cách, áo khoác da sang trọng.",
        "Puffer chần bông (áo khoác phao): Giữ ấm vượt trội, phù hợp cho thời tiết lạnh.",
        "Đa dạng form dáng từ slimfit đến regular, phù hợp nhiều vóc dáng."
      ]
    },
    {
      type: "style_guide",
      title: "Cách phối đồ áo khoác nam theo phong cách",
      groups: [
        {
          title: "Phối đồ áo khoác dù",
          items: [
            "Kết hợp áo khoác dù với áo thun, quần jean và sneaker để tạo set đồ năng động.",
            "Phối cùng quần jogger và giày thể thao cho phong cách thể thao, trẻ trung."
          ]
        },
        {
          title: "Phối đồ áo khoác jean",
          items: [
            "Áo khoác jean phối với áo thun trơn và quần kaki tạo phong cách casual hiện đại.",
            "Kết hợp cùng sneaker hoặc boots để tăng vẻ bụi bặm, cá tính."
          ]
        },
        {
          title: "Phối đồ áo khoác bomber",
          items: [
            "Bomber phối áo thun basic và quần jean cho set đồ kinh điển.",
            "Bomber varsity kết hợp cùng quần jogger mang phong cách học đường trẻ trung."
          ]
        },
        {
          title: "Phối đồ áo khoác hoodie",
          items: [
            "Hoodie phối cùng quần jogger cho phong cách streetwear.",
            "Kết hợp hoodie với quần jean và sneaker cho set đồ năng động hằng ngày."
          ]
        }
      ]
    },
    {
      type: "service",
      title: "Lợi ích khi mua áo khoác nam tại ICONDENIM",
      content: [
        "Sản phẩm được làm từ chất liệu cao cấp, đường may tỉ mỉ, form dáng chuẩn.",
        "Mẫu mã đa dạng, cập nhật xu hướng thời trang mới nhất.",
        "Giao hàng tận nơi toàn quốc cho đơn hàng từ 399.000đ.",
        "Tích lũy điểm thành viên, ưu đãi chiết khấu lên đến 15%."
      ]
    },
    {
      type: "cta",
      title: "Khẳng định phong cách cùng áo khoác ICONDENIM",
      description:
        "Áo khoác nam ICONDENIM không chỉ là trang phục giữ ấm mà còn là tuyên ngôn phong cách. Hãy đến hệ thống cửa hàng ICONDENIM hoặc mua sắm online để sở hữu những thiết kế áo khoác thời thượng nhất ngay hôm nay!"
    }
  ]
};

// 3. Dữ liệu câu hỏi thường gặp (FAQ)
const aoKhoacFAQ = [
  {
    title: "Áo khoác ICONDENIM có những dòng nào và mỗi dòng phù hợp với nhu cầu gì?",
    content:
      "ICONDENIM có nhiều dòng áo khoác như denim, bomber, khoác gió, cardigan dệt và áo khoác nhẹ công sở. Áo denim phù hợp đi làm – đi chơi với vẻ ngoài mạnh mẽ; bomber trẻ trung, năng động; khoác gió hợp di chuyển nhiều; cardigan phù hợp thời tiết se lạnh; còn áo khoác nhẹ công sở giúp bạn trông lịch sự trong những buổi gặp gỡ quan trọng."
  },
  {
    title: "Vì sao áo khoác denim của ICONDENIM được xem là dòng đặc trưng và bán chạy?",
    content:
      "Denim là thế mạnh lâu năm của ICONDENIM nhờ chất vải dày vừa, đứng phom, bền màu và càng mặc càng đẹp. Đường may kỹ, hiệu ứng wash đẹp, form khoác lên là thấy rõ dáng. Dòng denim cũng rất dễ phối đồ, chỉ cần áo thun hoặc sơ mi bên trong là đã tạo outfit nam tính và gọn gàng."
  },
  {
    title: "Tôi nên chọn loại áo khoác nào để vừa đi làm vừa đi chơi?",
    content:
      "Bạn nên chọn áo khoác denim hoặc bomber vì đủ chỉnh chu để đi làm nhưng vẫn casual khi đi chơi. Các gam màu như đen, xanh denim, xám hoặc navy là lựa chọn an toàn, dễ sử dụng trong nhiều hoàn cảnh."
  },
  {
    title: "Áo khoác của ICONDENIM có chống nước hoặc cản gió tốt không?",
    content:
      "Các mẫu khoác gió và áo khoác dù của ICONDENIM có bề mặt vải trượt nước nhẹ và khả năng cản gió tương đối tốt, phù hợp khi chạy xe, di chuyển ngoài trời trong mưa nhỏ hoặc thời tiết gió lạnh."
  },
  {
    title: "Đi mưa nhẹ tôi nên chọn áo khoác loại nào?",
    content:
      "Khi đi mưa nhỏ, bạn nên chọn áo khoác dù, vải dù lót lưới hoặc poly ép màn TBU. Các chất liệu này trượt nước tốt hơn kaki và denim, ít thấm nước và khô nhanh hơn."
  },
  {
    title: "Áo khoác màu nào dễ phối với quần jean và quần tây nhất?",
    content:
      "Bạn nên ưu tiên các màu trung tính như đen, xám, navy hoặc be. Đây là những gam màu dễ phối với cả quần jean xanh/đen lẫn quần tây màu tối, giúp tổng thể luôn gọn gàng và nam tính."
  },
  {
    title: "Tôi muốn mặc áo khoác nhìn vai rộng hơn thì nên chọn form nào?",
    content:
      "Bạn nên chọn form Regular hoặc hơi boxy, phần vai được cắt vuông rõ. Chất liệu đứng form như kaki, denim 100% cotton hoặc vest twill cao cấp sẽ giúp phần vai trông đầy và rộng hơn."
  },
  {
    title: "Áo khoác nào hợp mặc với quần jean ống suông?",
    content:
      "Quần jean ống suông rất hợp với bomber, coach jacket kaki hoặc denim jacket. Nếu muốn chỉnh chu hơn, bạn có thể phối vest twill bên ngoài áo thun hoặc sơ mi; chiều dài áo nên ngang hông hoặc hơi qua hông để cân đối với ống quần."
  },
  {
    title: "Vai tôi nhỏ, nên chọn áo khoác kiểu nào để nhìn cân đối hơn?",
    content:
      "Bạn nên chọn bomber, áo khoác kaki hoặc vest twill có cầu vai rõ. Dáng áo hơi boxy và chất liệu đứng form sẽ tạo cảm giác vai rộng hơn và phần thân trên đầy đặn hơn."
  },
  {
    title: "Mua áo khoác online thì chọn size thế nào cho chuẩn?",
    content:
      "Bạn chỉ cần cung cấp chiều cao, cân nặng, dáng người và thói quen mặc (ôm vừa hay rộng). Đội ngũ tư vấn ICONDENIM sẽ gợi ý size theo từng form áo khoác. Ngoài ra, bạn có thể đối chiếu bảng size trên website với chiếc áo khoác đang mặc vừa ở nhà để yên tâm khi đặt."
  }
];

// GỘP CHUNG THÀNH aokhoacData VÀ EXPORT
const aokhoacData = {
  products: productsAoKhoac,
  pageDetails: aoKhoacNamIcondenim,
  faqs: aoKhoacFAQ
};

export default aokhoacData;