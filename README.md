# 🛍️ InstaLink - Multi-Tenant Link-in-Bio E-Commerce

Zamonaviy Instagram va Telegram do'konlari uchun Link-in-Bio e-commerce SaaS platformasi. 
Foydalanuvchilar o'zlarining shaxsiy do'konlarini 1 daqiqada yaratishlari, mahsulotlarni boshqarishlari va xaridorlardan to'g'ridan-to'g'ri Telegram orqali avtomatik buyurtmalarni qabul qilishlari mumkin.

## 🚀 Asosiy Imkoniyatlar

1. **Multi-Tenant Architecture**: Har bir do'kon o'zining unikal manziliga (`myinstalink.vercel.app/do'kon_nomi`) ega bo'ladi.
2. **Tezkor Do'kon Yaratish**: 1 daqiqada do'kon nomi, manzili (slug) va 4 xonali PIN-kod orqali do'kon ochish.
3. **PIN-Himoyalangan Admin Panel**: Har bir do'kon egasi o'zining PIN-kodi orqali mahsulot qo'shish, tahrirlash va o'chirish imkoniyatiga ega.
4. **Telegram bilan Integratsiya**: Xaridor mahsulotni tanlab buyurtma berish tugmasini bosganda, barcha ma'lumotlar bilan tayyor xabar avtomatik sotuvchining Telegramiga yo'naltiriladi.
5. **Zamonaviy Mobil-Birinchi Dizayn (Mobile-First & Glassmorphism)**:
   - Next.js 14 App Router, Tailwind CSS, Lucide Icons, Glassmorphism va zamonaviy SaaS Dark Theme (`#090D16`, Indigo/Purple/Pink gradientlar).
   - Mobil-moslashtirilgan Instagram Link-in-Bio dizayni.
   - Do'kon ma'lumotlari, Telegram kontakt tugmasi va Admin Panelga o'tish tugmasi.
   - Mahsulotlar qidiruvi va filtratsiyasi.
   - **Buyurtma berish**: Bosilganda do'kon Telegramiga quyidagi formatda tayyor xabar bilan ochiladi:
     `Assalomu alaykum, men ushbu mahsulotni buyurtma qilmoqchiman: [Mahsulot nomi] - [Narxi] UZS`

6. **Admin Panel (`/[shop_slug]/admin`)**:
   - **PIN Gatekeeper**: Do'konning `admin_pin` kodi kiritilmaguncha panelga kirish cheklanadi.
   - Interaktiv raqamli klaviatura, xato kiritilganda silkinish (shake) animatsiyasi.
   - **To'liq Mahsulotlar CRUD**:
     - Mahsulot qo'shish (Rasm URL, namunaviy rasmlar, nom, narx, tavsif).
     - Mahsulotlarni qidirish va saralash.
     - Mahsulot ma'lumotlarini tahrirlash.
     - Xavfsiz o'chirish tasdiqlash modali.
   - Statistikalar: Jami mahsulotlar soni, o'rtacha narx, umumiy katalog qiymati.
   - **PRO Tarif**: 500 tagacha mahsulot limiti, VIP status va maxsus belgilar.

---

## 🚀 Ishga tushirish (Getting Started)

### 1. Loyihani ishga tushirish:
```bash
npm run dev
```
Brauzerda oching: [http://localhost:3000](http://localhost:3000)

### 2. Tayyor namunalar (Demo Shops):
- **Universal Demo Do'kon**: [http://localhost:3000/demo_shop](http://localhost:3000/demo_shop) (Admin PIN: `1234`)
- **Jonli havola formati**: `myinstalink.vercel.app/demo_shop`

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
