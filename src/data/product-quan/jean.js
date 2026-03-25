// 1. DỮ LIỆU CÂU HỎI THƯỜNG GẶP (FAQ) - QUẦN JEANS
const quanJeansFAQ = [
  {
    title: "Làm sao để chọn form quần jeans phù hợp với người có bắp chân to?",
    content:
      "Nếu bạn có bắp chân to, nên ưu tiên chọn form Straight (ống đứng) hoặc Baggy. Những form này có độ rộng từ đùi xuống gấu, giúp che khuyết điểm tốt và tạo sự thoải mái. Tránh chọn form Skinny vì sẽ gây bó sát và lộ bắp chân.",
  },
  {
    title: "Dòng Smart Jeans™ của ICONDENIM có gì đặc biệt?",
    content:
      "Smart Jeans™ sử dụng công nghệ vải siêu co giãn 4 chiều, giúp quần giữ được form dáng nguyên bản ngay cả sau nhiều lần giặt và mang lại cảm giác cử động cực kỳ linh hoạt cho người mặc.",
  },
  {
    title: "Quần jeans nam màu nào dễ phối đồ nhất cho mọi dịp?",
    content:
      "Màu Xanh Indigo (Xanh đậm) và Đen là hai màu cơ bản nhất. Bạn có thể mặc đi làm với áo sơ mi hoặc đi chơi với áo thun đều rất lịch sự và thời trang.",
  },
  {
    title: "Chất liệu AirFlex là gì và phù hợp mặc khi nào?",
    content:
      "AirFlex là dòng denim siêu nhẹ, mỏng nhưng bền bỉ, giúp giảm trọng lượng quần đáng kể. Đây là lựa chọn hoàn hảo cho mùa hè hoặc những ngày phải di chuyển nhiều ngoài trời.",
  },
  {
    title: "Cách giặt quần jeans để không bị phai màu nhanh?",
    content:
      "Bạn nên lộn trái quần khi giặt, sử dụng nước lạnh và hạn chế dùng chất tẩy mạnh. Nếu có thể, hãy giặt tay hoặc dùng túi giặt ở chế độ nhẹ nhàng.",
  },
  {
    title: "Quần jeans form Straight và Slim-fit khác nhau thế nào?",
    content:
      "Slim-fit sẽ ôm nhẹ vào đùi và bắp chân nhưng không quá bó, tạo vẻ hiện đại. Trong khi đó, Straight fit có độ rộng ống từ đùi xuống gấu bằng nhau, mang nét cổ điển và thoải mái hơn.",
  },
  {
    title:
      "Tôi nên chọn size quần jeans như thế nào nếu số đo nằm giữa 2 size?",
    content:
      "Với quần jeans có độ co giãn tốt như Smart Jeans, bạn có thể chọn size nhỏ hơn nếu thích mặc ôm. Với các dòng vải ít co giãn, hãy chọn size lớn hơn để đảm bảo thoải mái khi ngồi.",
  },
  {
    title:
      "Nếu gấu quần quá dài so với chiều cao của tôi thì ICONDENIM có hỗ trợ không?",
    content:
      "Bạn có thể liên hệ trực tiếp cửa hàng để được hỗ trợ lên gấu. Tuy nhiên, hãy lưu ý rằng sản phẩm đã qua sửa chữa sẽ không được áp dụng chính sách đổi trả.",
  },
  {
    title:
      "Làm thế nào để biết quần jeans tôi mua là hàng chính hãng ICONDENIM?",
    content:
      "Sản phẩm chính hãng luôn có đầy đủ bộ tag giấy, nhãn dệt logo ở lưng quần và các chi tiết phụ liệu như cúc, đinh tán đều được khắc chìm tên thương hiệu ICONDENIM.",
  },
  {
    title: "Mua online nếu mặc không vừa đùi có được đổi size không?",
    content:
      "Được. Bạn có thể đổi size trong vòng 7 ngày kể từ khi nhận hàng, miễn là sản phẩm còn nguyên tem mác và chưa qua sử dụng.",
  },
];

// 2. DỮ LIỆU NỘI DUNG SEO / GIỚI THIỆU TRANG
const contentSeeMoreJeans = {
  page: "quan-jeans-nam-icondenim",
  bannerImage: "/images/banners/quan-jeans.jpg",
  sections: [
    {
      type: "hero",
      title: "Quần Jeans Nam Cao Cấp, Đa Dạng Form Dáng - ICONDENIM",
      description:
        "Tự hào là đơn vị tiên phong trong công nghệ Denim, ICONDENIM mang đến những mẫu quần jeans nam không chỉ bền bỉ mà còn đột phá về chất liệu như Smart Jeans, AirFlex. Khẳng định phong cách lịch lãm và năng động cùng bộ sưu tập jeans thiết kế độc quyền.",
    },
    {
      type: "intro",
      title: "Đột phá công nghệ Denim tại ICONDENIM",
      content: [
        "Quần jeans ICONDENIM được chế tác từ những sợi bông cotton tuyển chọn kết hợp cùng sợi Spandex cao cấp tạo độ co giãn tối ưu. Với định lượng vải tiêu chuẩn từ 11oz đến 13oz, mỗi chiếc quần đều mang lại cảm giác chắc chắn nhưng vẫn đảm bảo độ mềm mại trên da.",
        "Chúng tôi chú trọng vào việc nghiên cứu hình thể nam giới Việt để tạo ra các bản rập (form dáng) chuẩn mực nhất, từ Slim-fit tôn dáng đến Straight cổ điển hay Baggy phóng khoáng.",
        "Mỗi chi tiết nhỏ như đường chỉ may, khóa kéo YKK đến đinh tán đều được kiểm soát nghiêm ngặt.",
      ],
    },
    {
      type: "product_list",
      title: "Các dòng quần jeans nam đặc trưng",
      items: [
        {
          name: "Smart Jeans™ Siêu Co Giãn",
          description:
            "Công nghệ vải thông minh giúp quần co giãn 4 chiều, thoải mái tối đa cho mọi hoạt động hàng ngày.",
        },
        {
          name: "AirFlex Denim Siêu Nhẹ",
          description:
            "Trọng lượng nhẹ hơn 30% so với jeans thông thường, giúp bạn 'mặc như không mặc' giữa thời tiết nắng nóng.",
          media: {
            type: "image",
            src: "/images/products/quan_jeans/jeans_gon/jeans_gon1.png",
          },
        },
        {
          name: "ProCOOL Jeans Mát Lạnh",
          description:
            "Ứng dụng sợi làm mát giúp hạ nhiệt bề mặt vải, đem lại cảm giác dễ chịu suốt ngày dài.",
        },
        {
          name: "Jeans Tái Chế (Eco-Friendly)",
          description:
            "Sử dụng sợi Polyester tái chế từ vỏ chai nhựa, hướng tới xu hướng thời trang bền vững.",
          media: {
            type: "video",
            src: "https://youtu.be/p2C-_nqTG4o",
          },
        },
      ],
    },
    {
      type: "guide",
      title: "Hướng dẫn chọn form quần jeans phù hợp",
      steps: [
        "Chọn Slim-fit nếu bạn muốn tôn dáng chân và trông cao hơn.",
        "Chọn Straight-fit nếu bạn thích sự cổ điển, chín chắn và thoải mái.",
        "Chọn Baggy/Oversize nếu bạn theo đuổi phong cách Streetwear năng động.",
        "Kiểm tra độ dài quần: gấu quần nên chạm nhẹ vào cổ giày để trông gọn gàng nhất.",
      ],
      media: {
        type: "image",
        src: "/images/products/quan_jeans/bang-size-jeans.jpg", // Dùng chung bảng size hoặc thay bằng bảng size quần
      },
    },
    {
      type: "service",
      title: "Chính sách ưu đãi khi mua Quần Jeans tại ICONDENIM",
      content: [
        "Miễn phí vận chuyển cho đơn hàng từ 399.000đ.",
        "Hỗ trợ đổi size/mẫu trong vòng 7 ngày trên toàn hệ thống.",
        "Bảo hành đường chỉ và nút trọn đời sản phẩm.",
        "Tích điểm thành viên nhận ưu đãi lên đến 15% cho mỗi đơn hàng.",
      ],
    },
  ],
};

// 3. DỮ LIỆU SẢN PHẨM QUẦN JEANS (10 SẢN PHẨM VỚI ĐƯỜNG DẪN ẢNH ĐÚNG)
const productsJeans = [
  {
    id: 101,
    name: "Quần Smart Jeans™ Nam Org-Blue Faded Wash",
    sku: "QJSD001",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_jeans/jeans_dan/jeans_dan1.png",
    status: "HOT",
    category: "Quần Jeans",
    material: "98% Cotton, 2% Spandex",
    fit: "Slim Fit",
  },
  {
    id: 102,
    name: "Quần Smart Jeans™ Nam Grey Wash",
    sku: "QJSD002",
    price: 599000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_dan/jeans_dan2.png",
    status: "GIẢM GIÁ",
    category: "Quần Jeans",
    material: "98% Cotton, 2% Spandex",
    fit: "Slim Fit",
  },
  {
    id: 103,
    name: "Quần Jean Nam AirFlex - Blue 1",
    sku: "QJAF003",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_gon/jeans_gon1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
    material: "AirFlex Denim",
    fit: "Straight Fit",
  },
  {
    id: 104,
    name: "Quần Jean Nam AirFlex - Blue 2",
    sku: "QJAF004",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_gon/jeans_gon2.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
    material: "AirFlex Denim",
    fit: "Straight Fit",
  },
  {
    id: 105,
    name: "Quần Jean Nam AirFlex - Grey",
    sku: "QJAF005",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_gon/jeans_gon3.png",
    status: "HOT",
    category: "Quần Jeans",
    material: "AirFlex Denim",
    fit: "Straight Fit",
  },
  {
    id: 106,
    name: "Quần Jean Nam ProCOOL - Light Blue",
    sku: "QJPC006",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_jeans/jeans_mat/jeans_mat1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
    material: "ProCOOL Denim",
    fit: "Slim Fit",
  },
  {
    id: 107,
    name: "Quần Jean Nam ProCOOL - Dark Blue",
    sku: "QJPC007",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_jeans/jeans_mat/jeans_mat2.png",
    status: "BÁN CHẠY",
    category: "Quần Jeans",
    material: "ProCOOL Denim",
    fit: "Slim Fit",
  },
  {
    id: 108,
    name: "Quần Jean Nam Mới 2026 - Indigo",
    sku: "QJNM008",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_moi/jeans_moi1.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
    material: "Cotton Denim",
    fit: "Regular Fit",
  },
  {
    id: 109,
    name: "Quần Jean Nam Mới 2026 - Black",
    sku: "QJNM009",
    price: 549000,
    salePrice: 549000,
    image: "/images/products/quan_jeans/jeans_moi/jeans_moi2.png",
    status: "HÀNG MỚI",
    category: "Quần Jeans",
    material: "Cotton Denim",
    fit: "Regular Fit",
  },
  {
    id: 110,
    name: "Quần Jean Nam ICON105 Siêu Nhẹ",
    sku: "QJIC010",
    price: 599000,
    salePrice: 599000,
    image: "/images/products/quan_jeans/jeans_nhe/jeans_nhe1.png",
    status: "HOT",
    category: "Quần Jeans",
    material: "TechUrban Denim",
    fit: "Straight Fit",
  },
];

// 4. GỘP CHUNG THÀNH jeanData
const jeanData = {
  products: productsJeans,
  pageDetails: contentSeeMoreJeans,
  faqs: quanJeansFAQ,
};

export default jeanData;
