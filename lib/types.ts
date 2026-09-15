export interface Shop {
  id: string;
  name: string;
  slug: string;
  telegram_username: string;
  admin_pin: string;
  description?: string;
  is_demo?: boolean;
  is_pro?: boolean;
  custom_limit?: number;
  created_at?: string;
}

export interface Product {
  id: string;
  shop_id: string;
  title: string;
  price: number;
  image_url: string;
  description: string;
  created_at?: string;
}

export type CreateShopInput = Omit<Shop, 'id' | 'created_at'>;
export type CreateProductInput = Omit<Product, 'id' | 'created_at'>;
export type UpdateProductInput = Partial<Omit<Product, 'id' | 'shop_id' | 'created_at'>>;
