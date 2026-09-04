import { supabase, isSupabaseConfigured } from './supabase';
import { Shop, Product, CreateShopInput, CreateProductInput, UpdateProductInput } from './types';
import { cleanTelegramUsername } from './utils';

// Initial fallback mock data for testing & offline mode
const INITIAL_MOCK_SHOPS: Shop[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-111111111111',
    name: 'Terra Pro Official',
    slug: 'terra_pro',
    telegram_username: 'terrapro_support',
    admin_pin: '1234',
    created_at: new Date().toISOString(),
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-222222222222',
    name: 'Apple Zone Tashkent',
    slug: 'apple_zone',
    telegram_username: 'applezone_tashkent',
    admin_pin: '7777',
    created_at: new Date().toISOString(),
  },
];

const INITIAL_MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-111111111111',
    title: "Klassik Erkaklar Ko'ylagi",
    price: 240000,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    description: "100% paxtadan tayyorlangan zamonaviy erkaklar ko'ylagi. Barcha o'lchamlar mavjud: S, M, L, XL.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'p2',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-111111111111',
    title: 'Premium Qora Jinsi Shim',
    price: 320000,
    image_url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80',
    description: "Qulay va elastik yuqori sifatli qora jinsi shim. Yuvilganda rangi o'chmaydi.",
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'p3',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-111111111111',
    title: 'Qishki Bomber Kurtka',
    price: 680000,
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    description: "Suv va shamol o'tkazmaydigan issiq kurtka. Ichki qismi yumshoq jun bilan qoplangan.",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'p4',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-111111111111',
    title: 'Charm Erkaklar Kamari',
    price: 110000,
    image_url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
    description: 'Tabiiy charmdan ishlangan klassik qora kamar.',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'p5',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-222222222222',
    title: 'iPhone 16 Pro Max 256GB Desert Titanium',
    price: 17200000,
    image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    description: 'Yangi original Apple iPhone 16 Pro Max. 1 yil rasmiy kafolat bilan.',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'p6',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-222222222222',
    title: 'AirPods Pro 2 USB-C',
    price: 3100000,
    image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
    description: 'Faol shovqinni bekor qilish (ANC) tizimiga ega yangi AirPods Pro 2.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'p7',
    shop_id: 'a1b2c3d4-e5f6-7890-abcd-222222222222',
    title: 'Apple Watch Series 10 46mm',
    price: 5800000,
    image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    description: "Eng yupqa va yorqin displeyli yangi avlod aqlli soat.",
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  }
];

const LOCAL_STORAGE_SHOPS_KEY = 'instal_shops_data';
const LOCAL_STORAGE_PRODUCTS_KEY = 'instal_products_data';

function getLocalShops(): Shop[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_SHOPS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SHOPS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_SHOPS_KEY, JSON.stringify(INITIAL_MOCK_SHOPS));
      return INITIAL_MOCK_SHOPS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_SHOPS;
  }
}

function saveLocalShops(shops: Shop[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_SHOPS_KEY, JSON.stringify(shops));
}

function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_PRODUCTS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_MOCK_PRODUCTS));
      return INITIAL_MOCK_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_PRODUCTS;
  }
}

function saveLocalProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
}

// ==============================================================================
// PUBLIC API FUNCTIONS
// ==============================================================================

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching shop from Supabase:', error);
      }
      if (data) return data as Shop;
    } catch (err) {
      console.error('Supabase query error in getShopBySlug:', err);
    }
  }

  // Fallback to local storage
  const shops = getLocalShops();
  const found = shops.find((s) => s.slug.toLowerCase() === normalizedSlug);
  return found || null;
}

export async function getProductsByShopId(shopId: string): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products from Supabase:', error);
      }
      if (data) return data as Product[];
    } catch (err) {
      console.error('Supabase query error in getProductsByShopId:', err);
    }
  }

  // Fallback to local storage
  const products = getLocalProducts();
  return products.filter((p) => p.shop_id === shopId);
}

export async function createShop(
  input: CreateShopInput
): Promise<{ shop: Shop | null; error?: string }> {
  const cleanUsername = cleanTelegramUsername(input.telegram_username);
  const normalizedSlug = input.slug.toLowerCase().trim();

  const shopPayload = {
    name: input.name.trim(),
    slug: normalizedSlug,
    telegram_username: cleanUsername,
    admin_pin: input.admin_pin.trim(),
  };

  if (isSupabaseConfigured()) {
    try {
      // Check if slug exists
      const { data: existing } = await supabase
        .from('shops')
        .select('id')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (existing) {
        return { shop: null, error: "Ushbu do'kon manzili (slug) band. Iltimos, boshqa nom tanlang." };
      }

      const { data, error } = await supabase
        .from('shops')
        .insert([shopPayload])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return { shop: null, error: error.message };
      }

      return { shop: data as Shop };
    } catch (err: any) {
      return { shop: null, error: err.message || 'Xatolik yuz berdi' };
    }
  }

  // Local Storage Fallback
  const shops = getLocalShops();
  if (shops.some((s) => s.slug.toLowerCase() === normalizedSlug)) {
    return { shop: null, error: "Ushbu do'kon manzili (slug) band. Iltimos, boshqa nom tanlang." };
  }

  const newShop: Shop = {
    id: 'shop_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    ...shopPayload,
    created_at: new Date().toISOString(),
  };

  const updatedShops = [newShop, ...shops];
  saveLocalShops(updatedShops);

  // Add sample product to new shop for instant demonstration
  const sampleProduct: Product = {
    id: 'prod_' + Math.random().toString(36).substring(2, 9),
    shop_id: newShop.id,
    title: 'Birinchi Mahsulotingiz',
    price: 150000,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: "Bu sizning birinchi namunaviy mahsulotingiz. Admin paneldan tahrirlashingiz yoki yangilarini qo'shishingiz mumkin.",
    created_at: new Date().toISOString(),
  };
  const products = getLocalProducts();
  saveLocalProducts([sampleProduct, ...products]);

  return { shop: newShop };
}

export async function createProduct(
  input: CreateProductInput
): Promise<{ product: Product | null; error?: string }> {
  const productPayload = {
    shop_id: input.shop_id,
    title: input.title.trim(),
    price: Number(input.price),
    image_url: input.image_url?.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: input.description?.trim() || '',
  };

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productPayload])
        .select()
        .single();

      if (error) {
        console.error('Supabase product insert error:', error);
        return { product: null, error: error.message };
      }

      return { product: data as Product };
    } catch (err: any) {
      return { product: null, error: err.message || 'Mahsulot qo‘shishda xatolik' };
    }
  }

  // Local Storage Fallback
  const newProduct: Product = {
    id: 'prod_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    ...productPayload,
    created_at: new Date().toISOString(),
  };

  const products = getLocalProducts();
  saveLocalProducts([newProduct, ...products]);

  return { product: newProduct };
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<{ product: Product | null; error?: string }> {
  const updatePayload: any = {};
  if (input.title !== undefined) updatePayload.title = input.title.trim();
  if (input.price !== undefined) updatePayload.price = Number(input.price);
  if (input.image_url !== undefined) updatePayload.image_url = input.image_url.trim();
  if (input.description !== undefined) updatePayload.description = input.description.trim();

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { product: null, error: error.message };
      }
      return { product: data as Product };
    } catch (err: any) {
      return { product: null, error: err.message || 'Tahrirlashda xatolik' };
    }
  }

  // Local Storage Fallback
  const products = getLocalProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return { product: null, error: 'Mahsulot topilmadi' };
  }

  const updatedProduct = {
    ...products[index],
    ...updatePayload,
  };

  products[index] = updatedProduct;
  saveLocalProducts(products);

  return { product: updatedProduct };
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'O‘chirishda xatolik' };
    }
  }

  // Local Storage Fallback
  const products = getLocalProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveLocalProducts(filtered);
  return { success: true };
}

export async function getAllFeaturedShops(): Promise<Shop[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase.from('shops').select('*').limit(6);
      if (data && data.length > 0) return data as Shop[];
    } catch {
      // Fall through to local mock
    }
  }
  return getLocalShops();
}
