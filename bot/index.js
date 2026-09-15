import { Telegraf, Markup } from 'telegraf';

const BOT_TOKEN = '8866418532:AAHnV3QnpglIz9v3Aq_L5QKUDGLf0zH9ZO8';
const bot = new Telegraf(BOT_TOKEN);

// Start bosilganda chiqadigan xabar
bot.start((ctx) => {
  return ctx.reply(
    "Assalomu alaykum! FastBio Pro botiga xush kelibsiz.\nIltimos, tilingizni tanlang / Выберите язык:",
    Markup.inlineKeyboard([
      [Markup.button.callback("🇺🇿 O'zbekcha", "lang_uz")],
      [Markup.button.callback("🇷🇺 Русский", "lang_ru")],
      [Markup.button.callback("🇬🇧 English", "lang_en")]
    ])
  );
});

// Til tanlanganda
bot.action('lang_uz', (ctx) => {
  ctx.reply(
    "⚡ FastBio PRO tarifi (150 000 so'm)\n\n" +
    "• 500 tagacha mahsulot va rasm\n" +
    "• Cheksiz mijozlar va buyurtmalar\n" +
    "• Do'konga oltin ⭐ PRO nishoni\n\n" +
    "💳 To'lov uchun karta: 8600 0000 0000 0000\n" +
    "Egasining ismi: Abduqodir H.\n\n" +
    "To'lovni amalga oshirgach, chekni (skrinshot) va do'koningiz nomini shu yerga yuboring.\n" +
    "Savollar bo'yicha: @A_Husanboyev"
  );
});

bot.action('lang_ru', (ctx) => {
  ctx.reply(
    "⚡ Тариф FastBio PRO (150 000 сум)\n\n" +
    "• До 500 товаров и фото\n" +
    "• Безлимитные заказы\n" +
    "• Значок ⭐ PRO\n\n" +
    "💳 Карта: 8600 0000 0000 0000\n\n" +
    "Отправьте чек и название магазина сюда.\nПоддержка: @A_Husanboyev"
  );
});

bot.action('lang_en', (ctx) => {
  ctx.reply(
    "⚡ FastBio PRO Plan (150,000 UZS)\n\n" +
    "• Up to 500 products\n" +
    "• Unlimited orders\n" +
    "• Exclusive ⭐ PRO badge\n\n" +
    "Support: @A_Husanboyev"
  );
});

bot.launch().then(() => console.log("🤖 FastBio Bot ishga tushdi!"));

// Xatoliklarni ushlash
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
