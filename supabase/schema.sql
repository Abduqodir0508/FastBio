-- ==============================================================================
-- FastBio - Multi-Tenant E-Commerce Link-in-Bio Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Create shops table
CREATE TABLE IF NOT EXISTS public.shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    telegram_username TEXT NOT NULL,
    admin_pin TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create indexes for high performance
CREATE INDEX IF NOT EXISTS idx_shops_slug ON public.shops(slug);
CREATE INDEX IF NOT EXISTS idx_products_shop_id ON public.products(shop_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for shops:
-- Allow anyone to read public shop profile info
CREATE POLICY "Allow public read access to shops"
ON public.shops FOR SELECT
USING (true);

-- Allow anyone to insert/create a new shop
CREATE POLICY "Allow public insert to shops"
ON public.shops FOR INSERT
WITH CHECK (true);

-- Allow updates if needed
CREATE POLICY "Allow public update to shops"
ON public.shops FOR UPDATE
USING (true);

-- 6. RLS Policies for products:
-- Allow anyone to view products of any shop
CREATE POLICY "Allow public read access to products"
ON public.products FOR SELECT
USING (true);

-- Allow insert of products
CREATE POLICY "Allow public insert to products"
ON public.products FOR INSERT
WITH CHECK (true);

-- Allow update of products
CREATE POLICY "Allow public update to products"
ON public.products FOR UPDATE
USING (true);

-- Allow delete of products
CREATE POLICY "Allow public delete to products"
ON public.products FOR DELETE
USING (true);

-- 7. Seed Initial Demo Shops & Products
INSERT INTO public.shops (id, name, slug, telegram_username, admin_pin)
VALUES 
  ('demo-shop-universal-id-001', 'Sizning Do''koningiz', 'demo_shop', 'fastbio_demo', '1234')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (shop_id, title, price, image_url, description)
VALUES
  ('demo-shop-universal-id-001', 'Klassik Erkaklar Ko''ylagi', 240000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', '100% paxtadan tayyorlangan zamonaviy erkaklar ko''ylagi. Barcha o''lchamlar mavjud: S, M, L, XL.'),
  ('demo-shop-universal-id-001', 'Simsiz Shovqinsiz Quloqchin', 450000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', 'Yuqori sifatli bass va qulay shovqinni bekor qiluvchi quloqchin. 30 soatgacha batareya quvvati.'),
  ('demo-shop-universal-id-001', 'Smart Smart-Soat Active Fit', 580000, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 'Yurak urishi, qadamlar va sport rejimlarini o''lchovchi zamonaviy suvga chidamli aqlli soat.'),
  ('demo-shop-universal-id-001', 'Klassik Charm Hamyon', 180000, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80', 'Haqiqiy charmdan ishlangan ixcham va ko‘p bo‘lmali hamyon. Kundalik foydalanish uchun juda qulay.')
ON CONFLICT DO NOTHING;

