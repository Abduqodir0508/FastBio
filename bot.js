const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '8866418532:AAHnV3QnpglIz9v3Aq_L5QKUDGLf0zH9ZO8';
const bot = new Telegraf(BOT_TOKEN);

// Start bosilganda chiqadigan xabar
bot.start((ctx) => {
  return ctx.reply(
    "Assalomu alaykum! FastBio Pro botiga xush kelibsiz.\nIltimos, tilingizni tanlang / Выберите язык / Choose language:",
    Markup.inlineKeyboard([
      [Markup.button.callback("🇺🇿 O'zbekcha", "lang_uz")],
      [Markup.button.callback("🇷🇺 Русский", "lang_ru")],
      [Markup.button.callback("🇬🇧 English", "lang_en")]
    ])
  );
});

// Til tanlanganda - O'zbekcha
bot.action('lang_uz', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    "⚡ FastBio PRO tarifi (150 000 so'm)\n\n" +
    "• 500 tagacha mahsulot va rasm\n" +
    "• Cheksiz mijozlar va buyurtmalar\n" +
    "• Do'konga oltin ⭐ PRO nishoni\n\n" +
    "💳 To'lov uchun karta: 8600 0000 0000 0000\n" +
    "Egasining ismi: Abduqodir H.\n\n" +
    "To'lovni amalga oshirgach, chekni (skrinshot yoki PDF) va do'koningiz nomini (havolasini) shu yerga yuboring.\n" +
    "Savollar bo'yicha: @A_Husanboyev"
  );
});

// Til tanlanganda - Русский
bot.action('lang_ru', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    "⚡ Тариф FastBio PRO (150 000 сум)\n\n" +
    "• До 500 товаров и фото\n" +
    "• Безлимитные клиенты и заказы\n" +
    "• Золотой значок ⭐ PRO для магазина\n\n" +
    "💳 Карта для оплаты: 8600 0000 0000 0000\n" +
    "Имя владельца: Abduqodir H.\n\n" +
    "После оплаты отправьте чек (скриншот или PDF) и название магазина сюда.\n" +
    "Поддержка: @A_Husanboyev"
  );
});

// Til tanlanganda - English
bot.action('lang_en', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    "⚡ FastBio PRO Plan (150,000 UZS)\n\n" +
    "• Up to 500 products and images\n" +
    "• Unlimited customers and orders\n" +
    "• Exclusive ⭐ PRO badge for your store\n\n" +
    "💳 Payment card: 8600 0000 0000 0000\n" +
    "Cardholder: Abduqodir H.\n\n" +
    "After payment, please send the receipt and your shop name/link here.\n" +
    "Support: @A_Husanboyev"
  );
});

// Polling orqali ishga tushirish
bot.launch()
  .then(() => {
    console.log("🤖 FastBio PRO Bot muvaffaqiyatli ishga tushdi!");
  })
  .catch((err) => {
    console.error("Botni ishga tushirishda xatolik:", err);
  });

// Xatolik va to'xtatishlarni ushlash
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
