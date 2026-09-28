const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
const http = require('http');

// ==============================================================================
// 1. ASOSIY KONFIGURATSIYA (ENVIRONMENT VARIABLES & DEFAULTS)
// ==============================================================================
const CONFIG = {
  BOT_TOKEN: process.env.BOT_TOKEN || '8606594487:AAGsSuQdu1dHek2xiBUDsgpobrep8twQDk8',
  ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID || '2067464475',
  SUPPORT_USERNAME: process.env.SUPPORT_USERNAME || 'A_Husanboyev',
  CARD_NUMBER: process.env.CARD_NUMBER || '5614688714380671',
  CARD_HOLDER: process.env.CARD_HOLDER || 'M.S',
  BOT_LINK: process.env.BOT_LINK || 'https://t.me/instalinkpro_bot',
  PORT: process.env.PORT || 3000,
  
  // Supabase konfiguratsiyasi
  SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oojosbgogjlltxtgkeuw.supabase.co',
  SUPABASE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_bUHKm7CZTl_WFMHIz5e69A_yM3fTQdx'
};

// ==============================================================================
// 2. SUPABASE MIZOJI (CLIENT)
// ==============================================================================
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY, {
  auth: { persistSession: false }
});

// ==============================================================================
// 3. MATNLAR VA KO'P TILLILIK (UZ, RU, EN)
// ==============================================================================
const MESSAGES = {
  uz: {
    no_store_error: (support) =>
      `⚠️ <b>Xatolik: Do'kon aniqlanmadi!</b>\n\n` +
      `Iltimos, avval <code>myinstalink.vercel.app</code> saytiga kirib, o'z do'koningiz admin panelidagi <b>"Pro tarifni olish"</b> tugmasi orqali botga o'ting.\n\n` +
      `💬 Savollaringiz bo'lsa: @${support}`,
    
    store_not_found: (slug, support) =>
      `❌ <b>Do'kon topilmadi!</b>\n\n` +
      `Bazada <code>${slug}</code> nomli do'kon mavjud emas. Iltimos, havolani to'g'ri ochganingizga ishonch hosil qiling.\n\n` +
      `💬 Yordam: @${support}`,

    store_welcome: (shopName, slug) =>
      `🏪 <b>Do'kon:</b> ${shopName}\n` +
      `🔗 <b>Havola:</b> <code>myinstalink.vercel.app/${slug}</code>\n\n` +
      `Iltimos, muloqot tilini tanlang:\nПожалуйста, выберите язык:\nPlease select your language:`,

    pricing_info: (shopName, slug, cardNum, cardHolder, support) =>
      `🏪 <b>Tanlangan do'kon:</b> ${shopName} (<code>${slug}</code>)\n` +
      `🔗 <b>Havola:</b> myinstalink.vercel.app/${slug}\n\n` +
      `💎 <b>InstaLink Pro tarifi:</b> 150 000 so'm\n` +
      `<i>(500 tagacha mahsulot joylash imkoniyati, VIP status va barcha imkoniyatlar)</i>\n\n` +
      `💳 <b>To'lov uchun karta:</b>\n<code>${cardNum}</code> (${cardHolder})\n\n` +
      `📸 <b>Yo'riqnoma:</b> To'lovni amalga oshirib, chekni (screenshot yoki rasm shaklida) ushbu botga yuboring.\n\n` +
      `💬 <b>Savollaringiz bo'lsa:</b> @${support}`,

    receipt_received: (support) =>
      `✅ <b>Chek qabul qilindi!</b>\n\n` +
      `Admin tasdiqlashi bilan Pro versiyangiz yoqiladi. Uzoog'i 5 daqiqa kuting.\n\n` +
      `Savollar bo'lsa: @${support}`,

    approved_user: (shopName) =>
      `🎉 <b>To'lovingiz tasdiqlandi!</b>\n\n` +
      `Sizning <b>"${shopName}"</b> do'koningiz uchun <b>InstaLink Pro</b> versiyasi muvaffaqiyatli yoqildi! 🚀\n\n` +
      `Endi siz 500 tagacha mahsulot joylashingiz mumkin. Do'koningizni rivojlantirishda omad tilaymiz!`,

    rejected_user: (shopName, support) =>
      `❌ <b>To'lov tasdiqlanmadi yoki chekda xatolik bor.</b>\n\n` +
      `<b>"${shopName}"</b> do'koni uchun to'lov qabul qilinmadi. Iltimos, ma'lumotni tekshirib qaytadan yuboring yoki adminga (@${support}) murojaat qiling.`,

    change_lang_btn: "🌐 Tilni o'zgartirish"
  },

  ru: {
    no_store_error: (support) =>
      `⚠️ <b>Ошибка: Магазин не определен!</b>\n\n` +
      `Пожалуйста, перейдите на сайт <code>myinstalink.vercel.app</code> и нажмите кнопку <b>"Получить PRO"</b> в панели управления вашего магазина.\n\n` +
      `💬 Поддержка: @${support}`,

    store_not_found: (slug, support) =>
      `❌ <b>Магазин не найден!</b>\n\n` +
      `Магазин <code>${slug}</code> не найден в базе. Пожалуйста, проверьте ссылку.\n\n` +
      `💬 Поддержка: @${support}`,

    store_welcome: (shopName, slug) =>
      `🏪 <b>Магазин:</b> ${shopName}\n` +
      `🔗 <b>Ссылка:</b> <code>myinstalink.vercel.app/${slug}</code>\n\n` +
      `Пожалуйста, выберите язык / Iltimos, tilni tanlang:`,

    pricing_info: (shopName, slug, cardNum, cardHolder, support) =>
      `🏪 <b>Выбранный магазин:</b> ${shopName} (<code>${slug}</code>)\n` +
      `🔗 <b>Ссылка:</b> myinstalink.vercel.app/${slug}\n\n` +
      `💎 <b>Тариф InstaLink Pro:</b> 150 000 сум\n` +
      `<i>(Возможность добавления до 500 товаров и все функции)</i>\n\n` +
      `💳 <b>Карта для оплаты:</b>\n<code>${cardNum}</code> (${cardHolder})\n\n` +
      `📸 <b>Инструкция:</b> Оплатите и отправьте чек (скриншот или фото) в этот бот.\n\n` +
      `💬 <b>По вопросам:</b> @${support}`,

    receipt_received: (support) =>
      `✅ <b>Чек принят!</b>\n\n` +
      `После проверки администратором ваша Pro версия будет активирована. Ожидайте до 5 минут.\n\n` +
      `Если есть вопросы: @${support}`,

    approved_user: (shopName) =>
      `🎉 <b>Ваш платёж подтверждён!</b>\n\n` +
      `Для вашего магазина <b>"${shopName}"</b> тариф <b>InstaLink Pro</b> успешно активирован! 🚀\n\n` +
      `Теперь вам доступно добавление до 500 товаров!`,

    rejected_user: (shopName, support) =>
      `❌ <b>Оплата не подтверждена или в чеке есть ошибка.</b>\n\n` +
      `Запрос для магазина <b>"${shopName}"</b> отклонен. Пожалуйста, свяжитесь с администратором: @${support}`,

    change_lang_btn: "🌐 Сменить язык"
  },

  en: {
    no_store_error: (support) =>
      `⚠️ <b>Error: Store not recognized!</b>\n\n` +
      `Please visit <code>myinstalink.vercel.app</code> and click the <b>"Upgrade to PRO"</b> button in your store's admin panel to start.\n\n` +
      `💬 Support: @${support}`,

    store_not_found: (slug, support) =>
      `❌ <b>Store not found!</b>\n\n` +
      `Store <code>${slug}</code> was not found in the database. Please verify your link.\n\n` +
      `💬 Support: @${support}`,

    store_welcome: (shopName, slug) =>
      `🏪 <b>Store:</b> ${shopName}\n` +
      `🔗 <b>Link:</b> <code>myinstalink.vercel.app/${slug}</code>\n\n` +
      `Please select your language:`,

    pricing_info: (shopName, slug, cardNum, cardHolder, support) =>
      `🏪 <b>Selected Store:</b> ${shopName} (<code>${slug}</code>)\n` +
      `🔗 <b>Link:</b> myinstalink.vercel.app/${slug}\n\n` +
      `💎 <b>InstaLink Pro Plan:</b> 150,000 UZS\n` +
      `<i>(Upload up to 500 products and unlock full potential)</i>\n\n` +
      `💳 <b>Payment card:</b>\n<code>${cardNum}</code> (${cardHolder})\n\n` +
      `📸 <b>Instruction:</b> Complete the payment and send the receipt (screenshot or photo) to this bot.\n\n` +
      `💬 <b>Support:</b> @${support}`,

    receipt_received: (support) =>
      `✅ <b>Receipt received!</b>\n\n` +
      `Your Pro version will be activated as soon as the admin verifies the payment (within 5 minutes).\n\n` +
      `For any questions: @${support}`,

    approved_user: (shopName) =>
      `🎉 <b>Your payment has been verified!</b>\n\n` +
      `<b>InstaLink Pro</b> has been successfully activated for <b>"${shopName}"</b>! 🚀\n\n` +
      `You can now add up to 500 products!`,

    rejected_user: (shopName, support) =>
      `❌ <b>Payment not verified or receipt is invalid.</b>\n\n` +
      `Request for store <b>"${shopName}"</b> was rejected. Please contact admin: @${support}`,

    change_lang_btn: "🌐 Change Language"
  }
};

// ==============================================================================
// 4. FOYDALANUVCHI SESSIYASI (IN-MEMORY MAP)
// ==============================================================================
// userId => { slug, name, id, lang }
const userSessions = new Map();

function getUserSession(userId) {
  return userSessions.get(String(userId)) || null;
}

function setUserSession(userId, sessionData) {
  const current = userSessions.get(String(userId)) || {};
  userSessions.set(String(userId), { ...current, ...sessionData });
}

// ==============================================================================
// 5. TELEGRAF BOTNI YARATISH
// ==============================================================================
const bot = new Telegraf(CONFIG.BOT_TOKEN);

function getLanguageKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("🇺🇿 O'zbekcha", "lang_uz"),
      Markup.button.callback("🇷🇺 Русский", "lang_ru"),
      Markup.button.callback("🇬🇧 English", "lang_en")
    ]
  ]);
}

function getMainKeyboard(lang) {
  const t = MESSAGES[lang] || MESSAGES.uz;
  return Markup.inlineKeyboard([
    [Markup.button.callback(t.change_lang_btn, "show_lang_picker")]
  ]);
}

// ==============================================================================
// 6. /start KOMANDASI VA DEEP LINKING TEKSHIRUVI
// ==============================================================================
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  let rawPayload = (ctx.payload || '').trim();

  // 1. Agar parametr bo'lmasa -> To'lovga ruxsat yo'q!
  if (!rawPayload) {
    const existingSession = getUserSession(userId);
    if (!existingSession || !existingSession.slug) {
      return ctx.replyWithHTML(MESSAGES.uz.no_store_error(CONFIG.SUPPORT_USERNAME));
    }
    rawPayload = existingSession.slug;
  }

  // 2. Slugni tozalash
  const storeSlug = rawPayload.replace(/^upgrade_/, '').trim().toLowerCase();

  try {
    // 3. Supabase bazasidan do'konni tekshirish
    const { data: shop, error } = await supabase
      .from('shops')
      .select('*')
      .eq('slug', storeSlug)
      .maybeSingle();

    if (error) {
      console.error('Supabase query error:', error);
    }

    if (!shop) {
      return ctx.replyWithHTML(MESSAGES.uz.store_not_found(storeSlug, CONFIG.SUPPORT_USERNAME));
    }

    // 4. Do'kon ma'lumotlarini foydalanuvchi sessiyasiga saqlash
    const currentLang = getUserSession(userId)?.lang || 'uz';
    setUserSession(userId, {
      slug: shop.slug,
      name: shop.name,
      id: shop.id,
      lang: currentLang
    });

    // 5. Til tanlash tugmalarini chiqarish
    await ctx.replyWithHTML(
      MESSAGES[currentLang].store_welcome(shop.name, shop.slug),
      getLanguageKeyboard()
    );
  } catch (err) {
    console.error('Start payload processing error:', err);
    ctx.replyWithHTML(MESSAGES.uz.no_store_error(CONFIG.SUPPORT_USERNAME));
  }
});

// Til tanlash oynasini qayta chaqirish
bot.action('show_lang_picker', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    const userId = ctx.from.id;
    const session = getUserSession(userId);
    const lang = session?.lang || 'uz';
    const shopName = session?.name || "Do'kon";
    const slug = session?.slug || '';

    await ctx.replyWithHTML(
      MESSAGES[lang].store_welcome(shopName, slug),
      getLanguageKeyboard()
    );
  } catch (err) {
    console.error('show_lang_picker error:', err);
  }
});

// Til tanlanganda (uz, ru, en)
['uz', 'ru', 'en'].forEach((lang) => {
  bot.action(`lang_${lang}`, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      const userId = ctx.from.id;
      const session = getUserSession(userId);

      if (!session || !session.slug) {
        return ctx.replyWithHTML(MESSAGES[lang].no_store_error(CONFIG.SUPPORT_USERNAME));
      }

      setUserSession(userId, { lang });

      const t = MESSAGES[lang];
      await ctx.replyWithHTML(
        t.pricing_info(session.name, session.slug, CONFIG.CARD_NUMBER, CONFIG.CARD_HOLDER, CONFIG.SUPPORT_USERNAME),
        getMainKeyboard(lang)
      );
    } catch (err) {
      console.error(`lang_${lang} error:`, err);
    }
  });
});

// ==============================================================================
// 7. TO'LOV CHEKI RASMINI QABUL QILISH (PHOTO & DOCUMENT)
// ==============================================================================
async function handleReceiptSubmission(ctx, fileId, isDocument = false) {
  const userId = ctx.from.id;
  const session = getUserSession(userId);
  const lang = session?.lang || 'uz';
  const t = MESSAGES[lang];

  // Agar do'kon sessiyasi bo'lmasa
  if (!session || !session.slug) {
    return ctx.replyWithHTML(t.no_store_error(CONFIG.SUPPORT_USERNAME));
  }

  try {
    // 1. Foydalanuvchiga darhol tasdiq xabarini berish
    await ctx.replyWithHTML(t.receipt_received(CONFIG.SUPPORT_USERNAME));

    // 2. Adminga yuboriladigan ma'lumotlar
    const userFullName = `${ctx.from.first_name || ''} ${ctx.from.last_name || ''}`.trim();
    const usernameDisplay = ctx.from.username ? `@${ctx.from.username}` : 'Mavjud emas';

    const adminCaption =
      `🔔 <b>YANGI TO'LOV CHEKI!</b>\n\n` +
      `🏪 <b>Do'kon:</b> ${session.name}\n` +
      `🔗 <b>Slug:</b> <code>${session.slug}</code> (myinstalink.vercel.app/${session.slug})\n` +
      `👤 <b>Foydalanuvchi:</b> ${userFullName} (${usernameDisplay})\n` +
      `🆔 <b>User ID:</b> <code>${userId}</code>\n` +
      `🌐 <b>Til:</b> ${lang.toUpperCase()}\n` +
      `💎 <b>Tarif:</b> InstaLink Pro (150 000 so'm)\n\n` +
      `Quyidagi tugmalar orqali tasdiqlang yoki rad eting:`;

    const adminKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.callback("✅ Tasdiqlash", `approve_${userId}_${session.slug}`),
        Markup.button.callback("❌ Rad etish", `reject_${userId}_${session.slug}`)
      ]
    ]);

    // 3. Adminga yuborish
    if (isDocument) {
      await ctx.telegram.sendDocument(CONFIG.ADMIN_CHAT_ID, fileId, {
        caption: adminCaption,
        parse_mode: 'HTML',
        ...adminKeyboard
      });
    } else {
      await ctx.telegram.sendPhoto(CONFIG.ADMIN_CHAT_ID, fileId, {
        caption: adminCaption,
        parse_mode: 'HTML',
        ...adminKeyboard
      });
    }
  } catch (err) {
    console.error('Receipt forwarding error:', err);
    ctx.reply("⚠️ Xatolik yuz berdi. Iltimos adminga yozing: @" + CONFIG.SUPPORT_USERNAME);
  }
}

bot.on('photo', async (ctx) => {
  const photos = ctx.message.photo;
  const bestPhotoId = photos[photos.length - 1].file_id;
  await handleReceiptSubmission(ctx, bestPhotoId, false);
});

bot.on('document', async (ctx) => {
  const doc = ctx.message.document;
  await handleReceiptSubmission(ctx, doc.file_id, true);
});

// ==============================================================================
// 8. ADMIN QARORI VA SUPABASE UPDATE INTEGRATSIYASI
// ==============================================================================

// Admin [✅ Tasdiqlash] bosganda
bot.action(/^approve_(\d+)_(.+)$/, async (ctx) => {
  try {
    const targetUserId = ctx.match[1];
    const storeSlug = ctx.match[2];
    const session = getUserSession(targetUserId);
    const lang = session?.lang || 'uz';
    const shopName = session?.name || storeSlug;

    await ctx.answerCbQuery("Tasdiqlanmoqda...");

    // 1. Supabase bazasida do'konni PRO qilish va limitni 500 ga oshirish
    let supabaseSuccess = false;
    try {
      const { data, error } = await supabase
        .from('shops')
        .update({
          is_pro: true,
          custom_limit: 500
        })
        .eq('slug', storeSlug)
        .select()
        .maybeSingle();

      if (error) {
        console.error('Supabase update error:', error);
      } else {
        supabaseSuccess = true;
      }
    } catch (dbErr) {
      console.error('Supabase execution error:', dbErr);
    }

    // 2. Foydalanuvchiga muvaffaqiyat xabarini yuborish
    try {
      const t = MESSAGES[lang] || MESSAGES.uz;
      await ctx.telegram.sendMessage(
        targetUserId,
        t.approved_user(shopName),
        { parse_mode: 'HTML' }
      );
    } catch (userMsgErr) {
      console.error('User message sending error:', userMsgErr);
    }

    // 3. Admindagi xabar matnini o'zgartirish va tugmalarni o'chirish
    const originalCaption = ctx.callbackQuery.message?.caption || '';
    const updatedCaption =
      `${originalCaption}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `✅ <b>USHBU CHEK TASDIQLANDI!</b>\n` +
      `🏪 <b>Do'kon:</b> ${storeSlug} (PRO va 500 limit yoqildi)\n` +
      `👤 <b>Admin:</b> @${ctx.from.username || ctx.from.first_name}`;

    try {
      await ctx.editMessageCaption(updatedCaption, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [] }
      });
    } catch (editErr) {
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    }
  } catch (err) {
    console.error('Approve action error:', err);
  }
});

// Admin [❌ Rad etish] bosganda
bot.action(/^reject_(\d+)_(.+)$/, async (ctx) => {
  try {
    const targetUserId = ctx.match[1];
    const storeSlug = ctx.match[2];
    const session = getUserSession(targetUserId);
    const lang = session?.lang || 'uz';
    const shopName = session?.name || storeSlug;

    await ctx.answerCbQuery("Chek rad etildi.");

    // 1. Foydalanuvchiga rad etilganlik xabari
    try {
      const t = MESSAGES[lang] || MESSAGES.uz;
      await ctx.telegram.sendMessage(
        targetUserId,
        t.rejected_user(shopName, CONFIG.SUPPORT_USERNAME),
        { parse_mode: 'HTML' }
      );
    } catch (userMsgErr) {
      console.error('User reject message sending error:', userMsgErr);
    }

    // 2. Admindagi xabar matnini yangilash
    const originalCaption = ctx.callbackQuery.message?.caption || '';
    const updatedCaption =
      `${originalCaption}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `❌ <b>USHBU CHEK RAD ETILDI.</b>\n` +
      `🏪 <b>Do'kon:</b> ${storeSlug}\n` +
      `👤 <b>Admin:</b> @${ctx.from.username || ctx.from.first_name}`;

    try {
      await ctx.editMessageCaption(updatedCaption, {
        parse_mode: 'HTML',
        reply_markup: { inline_keyboard: [] }
      });
    } catch (editErr) {
      await ctx.editMessageReplyMarkup({ inline_keyboard: [] });
    }
  } catch (err) {
    console.error('Reject action error:', err);
  }
});

// Global xatoliklarni ushlash
bot.catch((err, ctx) => {
  console.error(`❌ Telegraf Error (${ctx?.updateType}):`, err);
});

// ==============================================================================
// 9. 24/7 CLOUD HOSTING UCHUN HTTP HEALTH CHECK SERVER
// ==============================================================================
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({
    status: 'online',
    app: 'InstaLink PRO Telegram Bot',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  }));
});

server.listen(CONFIG.PORT, () => {
  console.log(`🌐 Health check server ${CONFIG.PORT}-portda faol`);
});

// ==============================================================================
// 10. BOTNI ISHGA TUSHIRISH
// ==============================================================================
bot.launch({ dropPendingUpdates: true })
  .then(() => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 InstaLink PRO Deep-Linking Bot muvaffaqiyatli ishga tushdi!');
    console.log(`🤖 Bot manzili: ${CONFIG.BOT_LINK}`);
    console.log(`👑 Admin Chat ID: ${CONFIG.ADMIN_CHAT_ID}`);
    console.log(`🗄️ Supabase URL: ${CONFIG.SUPABASE_URL}`);
    console.log(`💳 Karta: ${CONFIG.CARD_NUMBER} (${CONFIG.CARD_HOLDER})`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  })
  .catch((err) => {
    console.error('❌ Bot launch xatosi:', err);
  });

// Xavfsiz to'xtatish
process.once('SIGINT', () => { server.close(); bot.stop('SIGINT'); });
process.once('SIGTERM', () => { server.close(); bot.stop('SIGTERM'); });
