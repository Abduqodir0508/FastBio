-- ==============================================================================
-- Insta.Link - Multi-Tenant E-Commerce Link-in-Bio Database Schema
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
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Terra Pro Official', 'terra_pro', 'terrapro_support', '1234'),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Apple Zone Tashkent', 'apple_zone', 'applezone_tashkent', '7777')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (shop_id, title, price, image_url, description)
VALUES
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Klassik Erkaklar Ko''ylagi', 240000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', '100% paxtadan tayyorlangan zamonaviy erkaklar ko''ylagi. Barcha o''lchamlar mavjud: S, M, L, XL.'),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Premium Qora Jinsi Shim', 320000, 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80', 'Qulay va elastik yuqori sifatli qora jinsi shim. Yuvilganda rangi o''chmaydi.'),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Qishki Bomber Kurtka', 680000, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 'Suv va shamol o''tkazmaydigan issiq kurtka. Ichki qismi yumshoq jun bilan qoplangan.'),
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', 'Charm Erkaklar Kamari', 110000, 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', 'Tabiiy charmdan ishlangan klassik qora kamar.'),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'iPhone 16 Pro Max 256GB Desert Titanium', 17200000, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', 'Yangi original Apple iPhone 16 Pro Max. 1 yil rasmiy kafolat bilan.'),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'AirPods Pro 2 USB-C', 3100000, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80', 'Faol shovqinni bekor qilish (ANC) tizimiga ega yangi AirPods Pro 2.'),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', 'Apple Watch Series 10 46mm', 5800000, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80', 'Eng yupqa va yorqin displeyli yangi avlod aqlli soat.')
ON CONFLICT DO NOTHING;
