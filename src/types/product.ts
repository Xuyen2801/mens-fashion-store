export interface Color {
  name: string;
  thumbnail: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  salePrice: number;
  images: string[];
  colors: Color[];
  sizes: string[];
  outOfStockSizes: string[];
  description?: string; // Dấu ? nghĩa là không bắt buộc phải có
}