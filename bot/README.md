# FastBio PRO Telegram Bot

Ushbu bot FastBio do'konlarini **PRO tarifga** o'tkazish, to'lov cheklarini qabul qilish va do'kon egasiga darhol PRO huquqini taqdim etish uchun xizmat qiladi.

## 🚀 Imkoniyatlar:
- 🌐 3 ta tilda to'liq qo'llab-quvvatlash: **O'zbekcha**, **Русский**, **English**.
- 🔗 Deep-linking: `https://t.me/fastbiopro_bot?start=upgrade_[shop_slug]` orqali to'g'ridan-to'g'ri do'konni aniqlash.
- 💳 To'lov rekvizitlari va PRO afzalliklari ko'rgazmasi.
- 📸 To'lov chekini qabul qilish va adminga yuborish.
- ⚡ Admin uchun qulay `[✅ Tasdiqlash va PRO berish]` hamda `[❌ Rad etish]` tugmalari.
- 🔄 Tasdiqlanganda Supabase va FastBio API orqali do'konni 500 ta mahsulot limitiga o'tkazish va foydalanuvchiga xabar berish.

## ⚙️ Ishga tushirish (Local yoki Serverda):

1. `bot` papkasiga kiring:
```bash
cd bot
```

2. Kerakli kutubxonalarni o'rnating:
```bash
npm install
```

3. `.env` faylini sozlang:
```bash
cp .env.example .env
```
Fayl ichidagi qiymatlarni kiriting:
- `BOT_TOKEN`: `8866418532:AAHnV3QnpglIz9v3Aq_L5QKUDGLf0zH9ZO8`
- `ADMIN_TELEGRAM_ID`: O'zingizning Telegram raqamli ID'ingiz (masalan `@userinfobot` orqali bilib olish mumkin).

4. Botni ishga tushiring:
```bash
npm start
```
