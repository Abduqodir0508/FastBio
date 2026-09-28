const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// ==============================================================================
// SOZLAMALAR (CONFIG)
// ==============================================================================
const CONFIG = {
  BOT_TOKEN: process.env.BOT_TOKEN || '8606594487:AAGsSuQdu1dHek2xiBUDsgpobrep8twQDk8',
  ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID || '2067464475',
  SUPPORT_USERNAME: 'A_Husanboyev',
  CARD_NUMBER: '5614688714380671',
  CARD_HOLDER: 'M.S',
  BOT_LINK: 'https://t.me/instalinkpro_bot',
  PORT: process.env.PORT || 3000
};

// ==============================================================================
// MATNLAR VA LOKALIZATSIYA (UZ, RU, EN)
// ==============================================================================
const MESSAGES = {
  uz: {
    welcome: (name) => `👋 Assalomu alaykum, <b>${name}</b>!\n\nIltimos, muloqot tilini tanlang:\nПожалуйста, выберите язык:\nPlease select your language:`,
    lang_selected: "✅ O'zbek tili tanlandi.",
    pricing_info: (cardNum, cardHolder, support) =>
      `💎 <b>InstaLink Pro tarifi:</b> 150 000 so'm\n` +
      `<i>(500 tagacha mahsulot joylash va barcha imkoniyatlar)</i>\n\n` +
      `💳 <b>To'lov uchun karta:</b>\n<code>${cardNum}</code> (${cardHolder})\n\n` +
      `📸 <b>Yo'riqnoma:</b> To'lovni amalga oshirib, chekni (screenshot yoki rasm shaklida) ushbu botga yuboring.\n\n` +
      `💬 <b>Savollaringiz bo'lsa:</b> @${support}`,
    receipt_received: (support) =>
      `✅ <b>Chek qabul qilindi!</b>\n\n` +
      `Admin tasdiqlashi bilan Pro versiyangiz yoqiladi. Uzoog'i 5 daqiqa kuting.\n\n` +
      `Savollar bo'lsa: @${support}`,
    approved_user:
      `🎉 <b>To'lovingiz tasdiqlandi!</b>\n\n` +
      `InstaLink Pro versiyangiz muvaffaqiyatli yoqildi. Xizmatingizdan mamnunmiz! 🚀`,
    rejected_user: (support) =>
      `❌ <b>To'lov tasdiqlanmadi yoki chekda xatolik bor.</b>\n\n` +
      `Iltimos, ma'lumotni tekshirib qaytadan yuboring yoki adminga (@${support}) murojaat qiling.`,
    change_lang_btn: "🌐 Tilni o'zgartirish",
    btn_uz: "🇺🇿 O'zbekcha",
    btn_ru: "🇷🇺 Русский",
    btn_en: "🇬🇧 English"
  },
  ru: {
    welcome: (name) => `👋 Здравствуйте, <b>${name}</b>!\n\nПожалуйста, выберите язык:\nIltimos, muloqot tilini tanlang:\nPlease select your language:`,
    lang_selected: "✅ Выбран русский язык.",
    pricing_info: (cardNum, cardHolder, support) =>
      `💎 <b>Тариф InstaLink Pro:</b> 150 000 сум\n` +
      `<i>(Возможность добавления до 500 товаров и все функции)</i>\n\n` +
      `💳 <b>Карта для оплаты:</b>\n<code>${cardNum}</code> (${cardHolder})\n\n` +
      `📸 <b>Инструкция:</b> Оплатите и отправьте чек (скриншот или фото) в этот бот.\n\n` +
      `💬 <b>По вопросам:</b> @${support}`,
    receipt_received: (support) =>
      `✅ <b>Чек принят!</b>\n\n` +
      `После проверки администратором ваша Pro версия будет активирована. Ожидайте до 5 минут.\n\n` +
      `Если есть вопросы: @${support}`,
    approved_user:
      `🎉 <b>Ваш платёж подтверждён!</b>\n\n` +
      `Тариф InstaLink Pro успешно активирован. Приятного пользования! 🚀`,
    rejected_user: (support) =>
      `❌ <b>Оплата не подтверждена или в чеке есть ошибка.</b>\n\n` +
      `Пожалуйста, проверьте данные и отправьте снова или обратитесь к администратору (@${support}).`,
    change_lang_btn: "🌐 Сменить язык",
    btn_uz: "🇺🇿 O'zbekcha",
    btn_ru: "🇷🇺 Русский",
    btn_en: "🇬🇧 English"
  },
  en: {
    welcome: (name) => `👋 Hello, <b>${name}</b>!\n\nPlease select your language:\nIltimos, muloqot tilini tanlang:\nПожалуйста, выберите язык:`,
    lang_selected: "✅ English selected.",
    pricing_info: (cardNum, cardHolder, support) =>
      `💎 <b>InstaLink Pro Plan:</b> 150,000 UZS\n` +
      `<i>(Upload up to 500 products and unlock all features)</i>\n\n` +
      `💳 <b>Payment card:</b>\n<code>${cardNum}</code> (${cardHolder})\n\n` +
      `📸 <b>Instruction:</b> Complete the payment and send the receipt (screenshot or photo) to this bot.\n\n` +
      `💬 <b>For support:</b> @${support}`,
    receipt_received: (support) =>
      `✅ <b>Receipt received!</b>\n\n` +
      `Your Pro version will be activated as soon as the admin verifies the payment (within 5 minutes).\n\n` +
      `For any questions: @${support}`,
    approved_user:
      `🎉 <b>Your payment has been verified!</b>\n\n` +
      `InstaLink Pro has been successfully activated. Thank you! 🚀`,
    rejected_user: (support) =>
      `❌ <b>Payment not verified or receipt is invalid.</b>\n\n` +
      `Please check the details and resend, or contact the admin (@${support}).`,
    change_lang_btn: "🌐 Change Language",
    btn_uz: "🇺🇿 O'zbekcha",
    btn_ru: "🇷🇺 Русский",
    btn_en: "🇬🇧 English"
  }
};

// Foydalanuvchilar tanlagan tillarini xotirada saqlash
const userLanguages = new Map();

function getUserLang(userId) {
  return userLanguages.get(String(userId)) || 'uz';
}

function setUserLang(userId, lang) {
  userLanguages.set(String(userId), lang);
}

// ==============================================================================
// BOT INSTANSIYASINI YARATISH
// ==============================================================================
const bot = new Telegraf(CONFIG.BOT_TOKEN);

// Til tanlash klaviaturasi
function getLanguageKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("🇺🇿 O'zbekcha", "set_lang_uz"),
      Markup.button.callback("🇷🇺 Русский", "set_lang_ru"),
      Markup.button.callback("🇬🇧 English", "set_lang_en")
    ]
  ]);
}

// Asosiy menyu klaviaturasi (Tilni o'zgartirish tugmasi bilan)
function getMainKeyboard(lang) {
  const t = MESSAGES[lang] || MESSAGES.uz;
  return Markup.inlineKeyboard([
    [Markup.button.callback(t.change_lang_btn, "show_languages")]
  ]);
}

// 1. /start komandasi
bot.start(async (ctx) => {
  const firstName = ctx.from.first_name || 'Foydalanuvchi';
  await ctx.replyWithHTML(
    MESSAGES.uz.welcome(firstName),
    getLanguageKeyboard()
  );
});

// Tilni o'zgartirish tugmasi bosilganda
bot.action('show_languages', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    const firstName = ctx.from.first_name || 'Foydalanuvchi';
    await ctx.replyWithHTML(
      MESSAGES.uz.welcome(firstName),
      getLanguageKeyboard()
    );
  } catch (err) {
    console.error("Error in show_languages action:", err);
  }
});

// Til tanlanganda (uz, ru, en)
['uz', 'ru', 'en'].forEach((lang) => {
  bot.action(`set_lang_${lang}`, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      const userId = ctx.from.id;
      setUserLang(userId, lang);

      const t = MESSAGES[lang];
      
      // Rekvizitlar va ma'lumot xabarini yuborish
      await ctx.replyWithHTML(
        t.pricing_info(CONFIG.CARD_NUMBER, CONFIG.CARD_HOLDER, CONFIG.SUPPORT_USERNAME),
        getMainKeyboard(lang)
      );
    } catch (err) {
      console.error(`Error in set_lang_${lang} action:`, err);
    }
  });
});

// 2. Foydalanuvchi to'lov chekini (rasm/photo) yuborganda
bot.on('photo', async (ctx) => {
  const userId = ctx.from.id;
  const lang = getUserLang(userId);
  const t = MESSAGES[lang];

  try {
    // 1. Foydalanuvchiga tasdiq xabarini qaytarish
    await ctx.replyWithHTML(t.receipt_received(CONFIG.SUPPORT_USERNAME));

    // 2. Eng yuqori sifatli rasmni olish
    const photos = ctx.message.photo;
    const bestPhotoId = photos[photos.length - 1].file_id;

    // 3. Adminga yuboriladigan ma'lumot matni
    const userFullName = `${ctx.from.first_name || ''} ${ctx.from.last_name || ''}`.trim();
    const usernameDisplay = ctx.from.username ? `@${ctx.from.username}` : 'Mavjud emas';

    const adminCaption =
      `🔔 <b>Yangi to'lov cheki!</b>\n\n` +
      `👤 <b>Foydalanuvchi:</b> ${userFullName} (${usernameDisplay})\n` +
      `🆔 <b>ID:</b> <code>${userId}</code>\n` +
      `🌐 <b>Til:</b> ${lang.toUpperCase()}\n` +
      `💎 <b>Tarif:</b> InstaLink Pro (150 000 so'm)\n\n` +
      `Quyidagi tugmalar orqali tasdiqlang yoki rad eting:`;

    const adminKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback("✅ Tasdiqlash", `approve_${userId}`),
        Markup.button.callback("❌ Rad etish", `reject_${userId}`)
      ]
    ]);

    // 4. Adminga rasmni tugmalar bilan yuborish
    await ctx.telegram.sendPhoto(CONFIG.ADMIN_CHAT_ID, bestPhotoId, {
      caption: adminCaption,
      parse_mode: 'HTML',
      ...adminKeyboard
    });
  } catch (err) {
    console.error("Error processing photo:", err);
    ctx.reply("⚠️ Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring yoki adminga yozing: @" + CONFIG.SUPPORT_USERNAME);
  }
});

// Foydalanuvchi chekni rasm ko'rinishidagi fayl (document) shaklida yuborsa
bot.on('document', async (ctx) => {
  const userId = ctx.from.id;
  const lang = getUserLang(userId);
  const t = MESSAGES[lang];

  try {
    const doc = ctx.message.document;
    const isImage = doc.mime_type && doc.mime_type.startsWith('image/');

    // Foydalanuvchiga tasdiq xabari
    await ctx.replyWithHTML(t.receipt_received(CONFIG.SUPPORT_USERNAME));

    const userFullName = `${ctx.from.first_name || ''} ${ctx.from.last_name || ''}`.trim();
    const usernameDisplay = ctx.from.username ? `@${ctx.from.username}` : 'Mavjud emas';

    const adminCaption =
      `🔔 <b>Yangi to'lov cheki (Hujjat/Fayl)!</b>\n\n` +
      `👤 <b>Foydalanuvchi:</b> ${userFullName} (${usernameDisplay})\n` +
      `🆔 <b>ID:</b> <code>${userId}</code>\n` +
      `🌐 <b>Til:</b> ${lang.toUpperCase()}\n` +
      `💎 <b>Tarif:</b> InstaLink Pro (150 000 so'm)`;

    const adminKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback("✅ Tasdiqlash", `approve_${userId}`),
        Markup.button.callback("❌ Rad etish", `reject_${userId}`)
      ]
    ]);

    await ctx.telegram.sendDocument(CONFIG.ADMIN_CHAT_ID, doc.file_id, {
      caption: adminCaption,
      parse_mode: 'HTML',
      ...adminKeyboard
    });
  } catch (err) {
    console.error("Error processing document:", err);
  }
});

// ==============================================================================
// ADMIN QARORI (TASDIQLASH / RAD ETISH)
// ==============================================================================

// Admin [✅ Tasdiqlash] tugmasini bosganda
bot.action(/^approve_(\d+)$/, async (ctx) => {
  try {
    await ctx.answerCbQuery("To'lov tasdiqlandi!");
    const targetUserId = ctx.match[1];
    const userLang = getUserLang(targetUserId);
    const t = MESSAGES[userLang];

    // 1. Foydalanuvchiga o'z tilida tasdiq xabarini jo'natish
    try {
      await ctx.telegram.sendMessage(targetUserId, t.approved_user, {
        parse_mode: 'HTML'
      });
    } catch (sendErr) {
      console.error("Foydalanuvchiga xabar yuborib bo'lmadi:", sendErr);
    }

    // 2. Admindagi xabar captionini yangilash va tugmalarni olib tashlash
    const originalCaption = ctx.callbackQuery.message?.caption || '';
    const updatedCaption = `${originalCaption}\n\n━━━━━━━━━━━━━━━\n✅ <b>USHBU CHEK TASDIQLANDI VA PRO YOQILDI!</b>\n👤 Admin: @${ctx.from.username || ctx.from.first_name}`;

    try {
      await ctx.editMessageCaption(updatedCaption, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [] }
      });
    } catch (editErr) {
      // Agar caption o'zgarmasa yoki rasm bo'lmasa
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    }
  } catch (err) {
    console.error("Error in approve action:", err);
  }
});

// Admin [❌ Rad etish] tugmasini bosganda
bot.action(/^reject_(\d+)$/, async (ctx) => {
  try {
    await ctx.answerCbQuery("To'lov rad etildi.");
    const targetUserId = ctx.match[1];
    const userLang = getUserLang(targetUserId);
    const t = MESSAGES[userLang];

    // 1. Foydalanuvchiga rad etilganlik xabarini jo'natish
    try {
      await ctx.telegram.sendMessage(
        targetUserId,
        t.rejected_user(CONFIG.SUPPORT_USERNAME),
        { parse_mode: 'HTML' }
      );
    } catch (sendErr) {
      console.error("Foydalanuvchiga xabar yuborib bo'lmadi:", sendErr);
    }

    // 2. Admindagi xabar captionini yangilash va tugmalarni olib tashlash
    const originalCaption = ctx.callbackQuery.message?.caption || '';
    const updatedCaption = `${originalCaption}\n\n━━━━━━━━━━━━━━━\n❌ <b>USHBU CHEK RAD ETILDI.</b>\n👤 Admin: @${ctx.from.username || ctx.from.first_name}`;

    try {
      await ctx.editMessageCaption(updatedCaption, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [] }
      });
    } catch (editErr) {
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    }
  } catch (err) {
    console.error("Error in reject action:", err);
  }
});

// Global xatoliklarni ushlash (Error handler)
bot.catch((err, ctx) => {
  console.error(`❌ Botda xatolik yuz berdi (${ctx?.updateType}):`, err);
});

// ==============================================================================
// 24/7 CLOUD HOSTING UCHUN HTTP HEALTH CHECK SERVER
// ==============================================================================
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('🤖 InstaLink PRO Telegram Bot 24/7 ishlash holatida!');
});

server.listen(CONFIG.PORT, () => {
  console.log(`🌐 Health check server ${CONFIG.PORT}-portda tinglanmoqda`);
});

// ==============================================================================
// BOTNI ISHGA TUSHIRISH
// ==============================================================================
bot.launch({
  dropPendingUpdates: true
})
  .then(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 InstaLink PRO Telegram Bot ishga tushdi!');
    console.log(`🤖 Bot havolasi: ${CONFIG.BOT_LINK}`);
    console.log(`👑 Admin Chat ID: ${CONFIG.ADMIN_CHAT_ID}`);
    console.log(`💳 Karta: ${CONFIG.CARD_NUMBER} (${CONFIG.CARD_HOLDER})`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  })
  .catch((err) => {
    console.error('❌ Botni ishga tushirishda xatolik:', err);
  });

// Xavfsiz to'xtatish (Graceful Shutdown)
process.once('SIGINT', () => {
  server.close();
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  server.close();
  bot.stop('SIGTERM');
});
