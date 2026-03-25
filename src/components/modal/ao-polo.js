const products = [
  {
    id: "PLID0278",
    name: "Áo Polo Nam League Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 5 }, (_, i) => `/assets/images/products/polo/League_form_regular/league_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải cá mập 2C CVC (52% Cotton – 43% Polyester – 5% Spandex)",
    description: "Phong cách học viện năng động với phối màu tương phản ở cổ và tay áo.",
    colors: ["Trắng", "Xanh Navy", "Đen"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0279", // Đã đồng nhất từ PLID0279-01
    name: "Áo Polo Nam Classic City Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 10 }, (_, i) => `/assets/images/products/polo/Classic_City/classic_city_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải cá mập 2C CVC (52% Cotton – 43% Polyester – 5% Spandex)",
    description: "Chất liệu vải cá mập 2C CVC giúp bề mặt đứng form và giữ dáng ổn định. Thiết kế Classic City với bo cổ dệt rib sọc mịn bản 6cm, trụ nẹp 3 nút bản 3cm tạo tổng thể liền mạch.",
    colors: ["Đen", "Be"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0280",
    name: "Áo Polo Len Nam Layer Mood Form Regular",
    price: 399000,
    category: "ao-polo",
    images: Array.from({ length: 10 }, (_, i) => `/assets/images/products/polo/Layer_Mood/layer_mood_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Len Dệt (Knitwear) cao cấp",
    description: "Phong cách thanh lịch với chất liệu len dệt đặc trưng, mềm mại và có chiều sâu.",
    colors: ["Xanh Rêu", "Be", "Đen"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0281",
    name: "Áo Polo Nam Disney Mickey Grid Form Regular",
    price: 399000,
    category: "ao-polo",
    images: Array.from({ length: 5 }, (_, i) => `/assets/images/products/polo/Disney_Mickey/mickey_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải cá sấu CVC (65% Cotton – 35% Polyester)",
    description: "Sản phẩm nằm trong bộ sưu tập hợp tác đặc biệt giữa Icondenim và Disney. Họa tiết Mickey được in theo dạng Grid (lưới) tạo nên vẻ ngoài trẻ trung, độc đáo.",
    colors: ["Trắng", "Đen"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0282",
    name: "Áo Polo Nam Họa Tiết Inscript Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 8 }, (_, i) => `/assets/images/products/polo/Hoa_Tiet_Inscript/inscript_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cá Sấu CVC (65% Cotton – 35% Polyester)",
    description: "Ấn tượng với họa tiết chữ (Inscript) thiết kế tinh tế. Chất vải dày dặn, độ bền màu cao sau nhiều lần giặt.",
    colors: ["Trắng", "Đen", "Xanh Navy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0283",
    name: "Áo Polo Nam Urban Accent Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 13 }, (_, i) => `/assets/images/products/polo/Essence/essence_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cá Mập 2C CVC (52% Cotton – 43% Polyester – 5% Spandex)",
    description: "Thiết kế Urban Accent tập trung vào sự tối giản với trụ nẹp 3 nút phối màu đồng nhất. Vải đứng form, giữ dáng ổn định.",
    colors: ["Xám", "Xanh Rêu", "Đen"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0284",
    name: "Áo Polo Nam Disney Sporty Racing Form Regular",
    price: 399000,
    category: "ao-polo",
    images: Array.from({ length: 10 }, (_, i) => `/assets/images/products/polo/Disney_sport/disney_sport_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cá Sấu CVC (65% Cotton - 35% Polyester)",
    description: "Cảm hứng từ đường đua tốc độ (Sporty Racing). Họa tiết Mickey được cách điệu thể thao mạnh mẽ.",
    colors: ["Trắng", "Xanh Navy", "Đỏ"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0285",
    name: "Áo Polo Nam Classic Trim Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 9 }, (_, i) => `/assets/images/products/polo/Classic_Trim/classic_trim_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải dệt sọc (Chất vải thoáng mát, đứng form)",
    description: "Thiết kế Classic Trim mang vẻ đẹp chỉn chu từ những chi tiết nhỏ. Cổ tim hiện đại không nút gài.",
    colors: ["Xanh Navy", "Trắng", "Đen"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0286",
    name: "Áo Polo Nam Marvel Super Soldier Form Boxy",
    price: 399000,
    category: "ao-polo",
    images: Array.from({ length: 6 }, (_, i) => `/assets/images/products/polo/Marvel_super/marvel_super_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cá Sấu CVC (65% Cotton - 35% Polyester)",
    description: "Sản phẩm bản quyền Marvel thiết kế Form Boxy hiện đại. Họa tiết in sắc nét, bền màu.",
    colors: ["Đen", "Trắng"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0287",
    name: "Áo Polo Nam ICDN Orgnls United Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 9 }, (_, i) => `/assets/images/products/polo/Orgnals_United/orgnals_united_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải cá mập 2C CVC",
    description: "Thiết kế biểu tượng của dòng Original United. Form dáng linh hoạt cho mọi hoạt động.",
    colors: ["Xanh Navy", "Xám"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0288",
    name: "Áo Polo Nam In Predator Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 8 }, (_, i) => `/assets/images/products/polo/Predator/predator_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cá Sấu CVC",
    description: "Họa tiết Predator mạnh mẽ in cách điệu trên nền vải cao cấp, đứng form.",
    colors: ["Đen", "Trắng"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0289",
    name: "Áo Polo Nam Quarter Zip Form Regular",
    price: 385000,
    category: "ao-polo",
    images: Array.from({ length: 11 }, (_, i) => `/assets/images/products/polo/quarter_zip/quarter_zip_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cotton cao cấp",
    description: "Thiết kế cổ kéo khóa Quarter Zip độc đáo, năng động.",
    colors: ["Xám", "Xanh Rêu"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0290",
    name: "Áo Polo Nam Raglan Dominus Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 9 }, (_, i) => `/assets/images/products/polo/Raglan_Dominus/raglan_dominus_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải cá mập 2C CVC",
    description: "Tay Raglan phối màu tạo hiệu ứng vai rộng và thể thao.",
    colors: ["Trắng-Đen", "Xanh-Xám"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0291",
    name: "Áo Polo Len Nam Retro Line Form Regular",
    price: 420000,
    category: "ao-polo",
    images: Array.from({ length: 10 }, (_, i) => `/assets/images/products/polo/Retro_Line/retro_line_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Len dệt cao cấp",
    description: "Phong cách Retro với đường kẻ Line tinh tế. Giữ ấm tốt.",
    colors: ["Be", "Xanh Vintage"],
    sizes: ["S", "M", "L", "XL"] // Đã thêm size S đồng nhất
  },
  {
    id: "PLID0292",
    name: "Áo Polo Nam Twin Stripe Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 9 }, (_, i) => `/assets/images/products/polo/Twin_Stripe/twin_stripe_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải Cá Sấu CVC",
    description: "Hai đường kẻ stripe song song ở cổ và bo tay, thanh lịch cổ điển.",
    colors: ["Trắng", "Đen"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "PLID0293",
    name: "Áo Polo Len Nam Urban Lounge Form Regular",
    price: 399000,
    category: "ao-polo",
    // Giữ nguyên folder Urban_accent theo yêu cầu
    images: Array.from({ length: 9 }, (_, i) => `/assets/images/products/polo/Urban_accent/urban_accent_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Len dệt Cotton",
    description: "Sản phẩm cao cấp Urban Lounge, thoải mái và sang trọng.",
    colors: ["Xám Chill", "Đen"],
    sizes: ["S", "M", "L", "XL"] // Đã thêm size S đồng nhất
  },
  {
    id: "PLID0294",
    name: "Áo Polo Nam Velocity Form Regular",
    price: 379000,
    category: "ao-polo",
    images: Array.from({ length: 9 }, (_, i) => `/assets/images/products/polo/Velocity/velocity_${i + 1}.png`),
    brand: "ICONDENIM®",
    material: "Vải thể thao Pro-Dry",
    description: "Thiết kế Velocity tập trung vào sự tốc độ và thoát mồ hôi nhanh.",
    colors: ["Xanh Electric", "Trắng"],
    sizes: ["S", "M", "L", "XL"]
  }
];

export default products;