# 🛍️ Insta.Link - Multi-Tenant Link-in-Bio E-Commerce

Zamonaviy Instagram va Telegram do'konlari uchun Link-in-Bio e-commerce veb ilovasi. 
**Next.js (App Router)**, **Tailwind CSS**, **Lucide React** va **Supabase** asosida yaratilgan.

---

## 🌟 Imkoniyatlar (Features)

1. **Bosh Sahifa (`/`)**:
   - Zamonaviy Dark-mode dizayn va interaktiv telefon preview maketi.
   - Do'kon ochish modali (Do'kon nomi, URL slug, Telegram username, Admin PIN).
   - Real-time slug generator va havola tekshiruvi.
   - Do'kon ochilgach darhol do'kon havolasini taqdim etish va `/[slug]/admin` ga yo'naltirish.

2. **Mijoz Vitrinasi (`/[shop_slug]`)**:
   - Mobil-moslashtirilgan Instagram Link-in-Bio dizayni.
   - Do'kon ma'lumotlari, Telegram kontakt tugmasi va Admin Panelga o'tish tugmasi.
   - Mahsulotlar qidiruvi va filtratsiyasi.
   - **Buyurtma berish**: Bosilganda do'kon Telegramiga quyidagi formatda tayyor xabar bilan ochiladi:
     `Assalomu alaykum, men ushbu mahsulotni buyurtma qilmoqchiman: [Mahsulot nomi] - [Narxi] UZS`

3. **Admin Panel (`/[shop_slug]/admin`)**:
   - **PIN Gatekeeper**: Do'konning `admin_pin` kodi kiritilmaguncha panelga kirish cheklanadi.
   - Interaktiv raqamli klaviatura, xato kiritilganda silkinish (shake) animatsiyasi.
   - **To'liq Mahsulotlar CRUD**:
     - Mahsulot qo'shish (Rasm URL, namunaviy rasmlar, nom, narx, tavsif).
     - Mahsulotlarni qidirish va saralash.
     - Mahsulot ma'lumotlarini tahrirlash.
     - Xavfsiz o'chirish tasdiqlash modali.
   - Statistikalar: Jami mahsulotlar soni, o'rtacha narx, umumiy katalog qiymati.

---

## 🚀 Ishga tushirish (Getting Started)

### 1. Loyihani ishga tushirish:
```bash
npm run dev
```
Brauzerda oching: [http://localhost:3000](http://localhost:3000)

### 2. Tayyor namunalar (Demo Shops):
- **Terra Pro**: [http://localhost:3000/terra_pro](http://localhost:3000/terra_pro) (Admin PIN: `1234`)
- **Apple Zone**: [http://localhost:3000/apple_zone](http://localhost:3000/apple_zone) (Admin PIN: `7777`)

---

## 🗄️ Supabase Ma'lumotlar Bazasi Sozlash (Database Setup)

1. [Supabase](https://supabase.com) platformasida yangi loyiha oching.
2. `supabase/schema.sql` fayli ichidagi SQL kodni nusxalang va Supabase **SQL Editor** bo'limida ishga tushiring (Run).
3. Supabase API kalitlarini `.env.local` fayliga kiriting:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
4. Ilova avtomatik ravishda Supabase bilan ulanadi! (Agar kalitlar kiritilmasa, ilova lokal rejimda to'liq ishlashda davom etadi).
