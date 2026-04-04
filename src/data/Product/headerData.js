const headerData = {
  topbar: {
    promotions: [
      "🔥 Mua 02 sản phẩm quần Jeans tặng 1 set quà",
      "VOUCHER 10% TỐI ĐA 10K",
      "VOUCHER 20K ĐƠN TỪ 499K",
      "🚚 Freeship đơn từ 399K",
    ],
  },

  logo: {
    src: "/images/header/logo-header.png",
    alt: "ICONDENIM",
    width: 140,
    height: 32,
  },

  mainMenu: [
    {
      type: "dropdown",
      label: "Sản phẩm",
      items: [
        {
          title: "TẤT CẢ SẢN PHẨM",
          links: [
            { label: "Tất cả sản phẩm", path: "/Product" },
            { label: "Sản phẩm mới", path: "/Product/new" },
            { label: "Bán chạy nhất", path: "/Product/best-seller" },
            { label: "OUTLET - Sale up to 50%", path: "/Product/sale" },
          ],
        },
        {
          title: "ÁO NAM",
          links: [
            { label: "Áo thun", path: "/Product/ao-thun" },
            { label: "Áo polo", path: "/Product/ao-polo" },
            { label: "Áo sơ mi", path: "/Product/ao-so-mi" },
            { label: "Áo khoác", path: "/Product/ao-khoac" },
            { label: "Hoodie", path: "/Product/hoodie" },
            { label: "Tank top", path: "/Product/tank-top" },
            { label: "Set đồ", path: "/Product/set-do" },
          ],
        },
        {
          title: "QUẦN NAM",
          links: [
            { label: "Quần jean", path: "/Product/quan-jean" },
            { label: "Quần short", path: "/Product/quan-short" },
            { label: "Quần kaki & chino", path: "/Product/quan-kaki" },
            { label: "Quần jogger", path: "/Product/quan-jogger" },
            { label: "Quần tây", path: "/Product/quan-tay" },
            { label: "Quần boxer", path: "/Product/quan-boxer" },
          ],
        },
      ],
    },

    {
      label: "Hàng mới",
      path: "/Product/new", // Đổi từ "/new" thành "/Product/new"
      type: "link",
      highlight: "New",
    },
    {
      type: "link",
      label: "Hàng bán chạy",
      path: "/best-seller",
    },

    {
      type: "dropdown",
      label: "DENIM",
      denim: {
        left: [
          {
            title: "JEANS",
            links: [
              { label: "Quần Jeans", path: "/Product/quan-jean" },
              { label: "Quần Short Jeans", path: "/Product/quan-short" },
              { label: "Áo Khoác Jeans", path: "/Product/ao-khoac" },
            ],
          },
          {
            title: "SIGNATURE",
            links: [
              { label: "AIRFLEX™", path: "/collection/AIRFLEX" },
              { label: "ProCOOL++™", path: "/collection/ProCOOL" },
              { label: "STITCH™", path: "/collection/STITCH" },
              { label: "RETRO SPORTS", path: "/collection/RETRO" },
            ],
          },
        
        ],
        rightCards: [
          {
            src: "/images/header/gonnhe.png",
            text: "AIRFLEX - Gọn nhẹ",
          },
          {
            src: "/images/header/sieumat.png",
            text: "ProCOOL - Siêu mát",
          },
          {
            src: "/images/header/sieunhe.png",
            text: "ICON105 - Siêu nhẹ",
          },
          {
            src: "/images/header/cogian.png",
            text: "Smart Jeans - Co giãn",
          },
        ],
      },
    },

    {
      label: "Siêu sale",
      path: "/Product/sale", // Đổi từ "/sale" thành "/Product/sale"
      type: "link",
      highlight: "-50%",
    },
    {
      type: "dropdown",
      label: "Collection",
      collections: [
        {
          title: "AIRFLEX™ COLLECTION",
          img: "/images/header/gonnhe.png",
          path: "/collection/AIRFLEX",
        },
        {
          title: "Retro Sports",
          img: "/images/header/sieunhe.png",
          path: "/collection/RETRO",
        },
        {
          title: "STITCH together",
          img: "/images/header/cogian.png",
          path: "/collection/STITCH",
        },
      ],
    },
  ],

  icons: {
    search: true,
    user: true,
    cart: {
      showBadge: true,
      initialCount: 0,
    },
  },
};

export default headerData;
