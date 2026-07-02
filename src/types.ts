export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women' | 'apparel' | 'accessories';
  price: number;
  originalPrice?: number;
  images: string[];
  color: string;
  colors?: string[];
  sizes: string[];
  details?: string;
  materials?: string[];
  shipping?: string;
  tags?: string[];
  code: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
}
