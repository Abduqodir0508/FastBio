import { supabase, isSupabaseConfigured } from './supabase';
import { Shop, Product, CreateShopInput, CreateProductInput, UpdateProductInput } from './types';
import { cleanTelegramUsername } from './utils';

// Universal single mock demo shop
export const DEMO_SHOP_SLUG = 'demo_shop';

const INITIAL_MOCK_SHOPS: Shop[] = [
  {
    id: 'demo-shop-universal-id-001',
    name: "Sizning Do'koningiz",
    slug: DEMO_SHOP_SLUG,
    telegram_username: 'instalink_demo',
    admin_pin: '1234',
    description: "Namuna do'kon — tizim qanday ishlashini ko'rishingiz uchun.",
    is_demo: true,
    created_at: new Date().toISOString(),
  },
];

const INITIAL_MOCK_PRODUCTS: Product[] = [
  {
    id: 'demo-p1',
    shop_id: 'demo-shop-universal-id-001',
    title: "Klassik Erkaklar Ko'ylagi",
    price: 240000,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    description: "100% paxtadan tayyorlangan zamonaviy erkaklar ko'ylagi. Barcha o'lchamlar mavjud: S, M, L, XL.",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'demo-p2',
    shop_id: 'demo-shop-universal-id-001',
    title: 'Simsiz Shovqinsiz Quloqchin',
    price: 450000,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    description: "Yuqori sifatli bass va qulay shovqinni bekor qiluvchi quloqchin. 30 soatgacha batareya quvvati.",
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'demo-p3',
    shop_id: 'demo-shop-universal-id-001',
    title: 'Smart Smart-Soat Active Fit',
    price: 580000,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: "Yurak urishi, qadamlar va sport rejimlarini o'lchovchi zamonaviy suvga chidamli aqlli soat.",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'demo-p4',
    shop_id: 'demo-shop-universal-id-001',
    title: 'Klassik Charm Hamyon',
    price: 180000,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    description: 'Haqiqiy charmdan ishlangan ixcham va ko‘p bo‘lmali hamyon. Kundalik foydalanish uchun juda qulay.',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

const LOCAL_STORAGE_SHOPS_KEY = 'instalink_shops_data_v1';
const LOCAL_STORAGE_PRODUCTS_KEY = 'instalink_products_data_v1';

export function isDemoShop(shopIdOrSlug?: string | null): boolean {
  if (!shopIdOrSlug) return false;
  const val = shopIdOrSlug.toLowerCase().trim();
  return (
    val === DEMO_SHOP_SLUG ||
    val === 'demo-shop-universal-id-001' ||
    val === 'terra_pro' ||
    val === 'apple_zone'
  );
}

function getLocalShops(): Shop[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_SHOPS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SHOPS_KEY) || localStorage.getItem('instalink_shops_data_v1');
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_SHOPS_KEY, JSON.stringify(INITIAL_MOCK_SHOPS));
      return INITIAL_MOCK_SHOPS;
    }
    const parsed = JSON.parse(raw);
    const hasDemo = parsed.some((s: Shop) => isDemoShop(s.slug) || isDemoShop(s.id));
    if (!hasDemo) {
      const merged = [...INITIAL_MOCK_SHOPS, ...parsed];
      localStorage.setItem(LOCAL_STORAGE_SHOPS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed.map((s: Shop) => {
      if (isDemoShop(s.slug) || isDemoShop(s.id)) {
        return {
          ...s,
          name: "Sizning Do'koningiz",
          slug: DEMO_SHOP_SLUG,
          telegram_username: 'instalink_demo',
          description: "Namuna do'kon — tizim qanday ishlashini ko'rishingiz uchun.",
          is_demo: true,
        };
      }
      return s;
    });
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
    const parsed = JSON.parse(raw);
    const hasDemoProds = parsed.some((p: Product) => isDemoShop(p.shop_id));
    if (!hasDemoProds) {
      const merged = [...INITIAL_MOCK_PRODUCTS, ...parsed];
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return INITIAL_MOCK_PRODUCTS;
  }
}

function saveLocalProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
}

// Helper to save shop locally
function createShopLocally(shopPayload: { name: string; slug: string; telegram_username: string; admin_pin: string }): Shop {
  const shops = getLocalShops();
  const newShop: Shop = {
    id: 'shop_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
    ...shopPayload,
    is_demo: false,
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
    description: "Bu sizning birinchi mahsulotingiz. Admin paneldan bemalol tahrirlashingiz yoki yangilarini qo'shishingiz mumkin.",
    created_at: new Date().toISOString(),
  };
  const products = getLocalProducts();
  saveLocalProducts([sampleProduct, ...products]);

  return newShop;
}

// ==============================================================================
// PUBLIC API FUNCTIONS
// ==============================================================================

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const normalizedSlug = slug.toLowerCase().trim();

  // If requesting legacy demo or new demo slug, return standardized demo shop
  if (isDemoShop(normalizedSlug)) {
    return INITIAL_MOCK_SHOPS[0];
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (error) {
        console.error('[Supabase] getShopBySlug error:', error.message);
      } else if (data) {
        return data as Shop;
      }
    } catch (err: any) {
      console.warn('[Supabase] Network/connection error in getShopBySlug, fallback to local storage:', err.message);
    }
  }

  // Fallback to local storage
  const shops = getLocalShops();
  const found = shops.find((s) => s.slug.toLowerCase() === normalizedSlug);
  return found || null;
}

export async function getProductsByShopId(shopId: string): Promise<Product[]> {
  if (isDemoShop(shopId)) {
    return INITIAL_MOCK_PRODUCTS;
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', shopId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Supabase] getProductsByShopId error:', error.message);
      } else if (data && data.length > 0) {
        return data as Product[];
      }
    } catch (err: any) {
      console.warn('[Supabase] Network/connection error in getProductsByShopId, fallback to local storage:', err.message);
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

  if (isDemoShop(normalizedSlug)) {
    return { shop: null, error: "Ushbu do'kon manzili (slug) band. Iltimos, boshqa nom tanlang." };
  }

  const shopPayload = {
    name: input.name.trim(),
    slug: normalizedSlug,
    telegram_username: cleanUsername,
    admin_pin: input.admin_pin.trim(),
  };

  // 1. Agar Supabase sozlangan bo'lsa, avval Supabase'ga yozishga urinib ko'ramiz
  if (isSupabaseConfigured()) {
    try {
      // Check if slug exists in Supabase
      const { data: existing, error: checkError } = await supabase
        .from('shops')
        .select('id')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (checkError) {
        console.warn('[Supabase] Slug check failed:', checkError.message);
      } else if (existing) {
        return { shop: null, error: "Ushbu do'kon manzili (slug) band. Iltimos, boshqa nom tanlang." };
      }

      // Insert shop into Supabase
      const { data, error: insertError } = await supabase
        .from('shops')
        .insert([shopPayload])
        .select()
        .single();

      if (insertError) {
        console.error('[Supabase] Insert error:', insertError);
        // If it's a unique constraint error
        if (insertError.code === '23505' || insertError.message.toLowerCase().includes('unique')) {
          return { shop: null, error: "Ushbu do'kon manzili (slug) allaqachon mavjud." };
        }
        throw new Error(insertError.message);
      }

      if (data) {
        console.log('[Supabase] Do\'kon muvaffaqiyatli yaratildi:', data);
        // Also save a copy to local storage for offline resilience
        createShopLocally(shopPayload);
        return { shop: data as Shop };
      }
    } catch (err: any) {
      console.warn('[Storage] Supabase ulanishida xatolik yuz berdi (Failed to fetch). LocalStorage rejimiga o\'tilmoqda:', err);
      // Agar Supabase tarmoq xatosi yoki "Failed to fetch" bersa, foydalanuvchi to'xtab qolmasligi uchun LocalStorage'ga yozamiz
      const shops = getLocalShops();
      if (shops.some((s) => s.slug.toLowerCase() === normalizedSlug)) {
        return { shop: null, error: "Ushbu do'kon manzili (slug) band. Iltimos, boshqa nom tanlang." };
      }

      const localShop = createShopLocally(shopPayload);
      return { shop: localShop };
    }
  }

  // 2. Local Storage Fallback (agar Supabase ulanmagan bo'lsa)
  const shops = getLocalShops();
  if (shops.some((s) => s.slug.toLowerCase() === normalizedSlug)) {
    return { shop: null, error: "Ushbu do'kon manzili (slug) band. Iltimos, boshqa nom tanlang." };
  }

  const newShop = createShopLocally(shopPayload);
  return { shop: newShop };
}

export const FREE_PRODUCT_LIMIT = 8;
export const PRO_PRODUCT_LIMIT = 500;

export function getProductLimit(shop?: Shop | null): number {
  if (!shop) return FREE_PRODUCT_LIMIT;
  if (shop.custom_limit && shop.custom_limit > 0) return shop.custom_limit;
  if (shop.is_pro) return PRO_PRODUCT_LIMIT;
  return FREE_PRODUCT_LIMIT;
}

export async function createProduct(
  input: CreateProductInput
): Promise<{ product: Product | null; error?: string; limitReached?: boolean }> {
  if (isDemoShop(input.shop_id)) {
    return {
      product: null,
      error: "Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!",
    };
  }

  // Check shop limits
  let shop: Shop | null = null;
  if (isSupabaseConfigured()) {
    try {
      const { data } = await supabase
        .from('shops')
        .select('*')
        .eq('id', input.shop_id)
        .maybeSingle();
      if (data) shop = data as Shop;
    } catch {
      // Fallback
    }
  }

  if (!shop) {
    const shops = getLocalShops();
    shop = shops.find((s) => s.id === input.shop_id) || null;
  }

  const existingProducts = await getProductsByShopId(input.shop_id);
  const maxLimit = getProductLimit(shop);

  if (existingProducts.length >= maxLimit) {
    return {
      product: null,
      error: `Limitga yetildi! Sizning limitingiz: ${maxLimit} ta mahsulot. PRO tarifga o'ting!`,
      limitReached: true,
    };
  }

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
        console.error('[Supabase] product insert error:', error);
      } else if (data) {
        return { product: data as Product };
      }
    } catch (err: any) {
      console.warn('[Supabase] Failed to insert product, saving locally:', err.message);
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

export async function upgradeShopToPro(
  slugOrId: string,
  isPro: boolean = true,
  customLimit?: number
): Promise<{ success: boolean; shop?: Shop; error?: string }> {
  const normalized = slugOrId.toLowerCase().trim();

  if (isSupabaseConfigured()) {
    try {
      const updateData: any = { is_pro: isPro };
      if (customLimit !== undefined) updateData.custom_limit = customLimit;

      const { data, error } = await supabase
        .from('shops')
        .update(updateData)
        .or(`slug.eq.${normalized},id.eq.${normalized}`)
        .select()
        .maybeSingle();

      if (error) {
        console.error('[Supabase] upgradeShopToPro error:', error);
      } else if (data) {
        return { success: true, shop: data as Shop };
      }
    } catch (err: any) {
      console.warn('[Supabase] upgrade error, falling back to local storage:', err.message);
    }
  }

  // Local Storage fallback
  const shops = getLocalShops();
  const index = shops.findIndex(
    (s) => s.slug.toLowerCase() === normalized || s.id.toLowerCase() === normalized
  );

  if (index === -1) {
    return { success: false, error: "Do'kon topilmadi" };
  }

  const updatedShop: Shop = {
    ...shops[index],
    is_pro: isPro,
    custom_limit: customLimit !== undefined ? customLimit : shops[index].custom_limit,
  };

  shops[index] = updatedShop;
  saveLocalShops(shops);

  return { success: true, shop: updatedShop };
}

export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<{ product: Product | null; error?: string }> {
  if (id.startsWith('demo-') || isDemoShop(id)) {
    return {
      product: null,
      error: "Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!",
    };
  }

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
        console.error('[Supabase] updateProduct error:', error);
      } else if (data) {
        return { product: data as Product };
      }
    } catch (err: any) {
      console.warn('[Supabase] updateProduct network error:', err.message);
    }
  }

  // Local Storage Fallback
  const products = getLocalProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return { product: null, error: 'Mahsulot topilmadi' };
  }

  if (isDemoShop(products[index].shop_id)) {
    return {
      product: null,
      error: "Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!",
    };
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
  if (id.startsWith('demo-') || isDemoShop(id)) {
    return {
      success: false,
      error: "Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!",
    };
  }

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('[Supabase] deleteProduct error:', error);
      } else {
        return { success: true };
      }
    } catch (err: any) {
      console.warn('[Supabase] deleteProduct network error:', err.message);
    }
  }

  // Local Storage Fallback
  const products = getLocalProducts();
  const target = products.find((p) => p.id === id);
  if (target && isDemoShop(target.shop_id)) {
    return {
      success: false,
      error: "Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!",
    };
  }

  const filtered = products.filter((p) => p.id !== id);
  saveLocalProducts(filtered);
  return { success: true };
}

export async function getAllFeaturedShops(): Promise<Shop[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase.from('shops').select('*').limit(6);
      if (!error && data && data.length > 0) {
        return data as Shop[];
      }
    } catch (err: any) {
      console.warn('[Supabase] getAllFeaturedShops error:', err.message);
    }
  }
  return getLocalShops();
}
