/**
 * FastBio PRO Telegram Bot
 * Token: 8866418532:AAHnV3QnpglIz9v3Aq_L5QKUDGLf0zH9ZO8
 * Admin: @A_Husanboyev
 */

require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const locales = require('./locales');

const BOT_TOKEN = process.env.BOT_TOKEN || '8866418532:AAHnV3QnpglIz9v3Aq_L5QKUDGLf0zH9ZO8';
const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID ? Number(process.env.ADMIN_TELEGRAM_ID) : null;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'A_Husanboyev';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const SECRET = process.env.UPGRADE_PRO_SECRET || 'fastbio_pro_secret_key_2025';

// Optional Supabase Direct Client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (SUPABASE_URL && SUPABASE_KEY) ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const bot = new Telegraf(BOT_TOKEN);

// In-memory state tracking
const userLangs = new Map(); // userId -> 'uz' | 'ru' | 'en'
const userStates = new Map(); // userId -> { step: string, slug?: string }

function getLang(userId) {
  return userLangs.get(userId) || 'uz';
}

function t(userId, key, ...args) {
  const lang = getLang(userId);
  const dict = locales[lang] || locales.uz;
  const val = dict[key];
  if (typeof val === 'function') {
    return val(...args);
  }
  return val || locales.uz[key] || key;
}

function getMainMenu(userId) {
  return Markup.keyboard([
    [t(userId, 'btn_upgrade_pro'), t(userId, 'btn_pricing_info')],
    [t(userId, 'btn_contact_admin'), t(userId, 'btn_change_lang')]
  ]).resize();
}

function getLangKeyboard() {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("🇺🇿 O'zbekcha", "set_lang_uz"),
      Markup.button.callback("🇷🇺 Русский", "set_lang_ru"),
      Markup.button.callback("🇬🇧 English", "set_lang_en"),
    ]
  ]);
}

// /start command handler (supports deep link: /start upgrade_slug)
bot.start(async (ctx) => {
  const userId = ctx.from.id;
  const payload = ctx.startPayload || ''; // e.g. "upgrade_my_shop"

  if (!userLangs.has(userId)) {
    // Prompt language selection first
    return ctx.reply(locales.uz.choose_language, getLangKeyboard());
  }

  if (payload.startsWith('upgrade_')) {
    const slug = payload.replace('upgrade_', '').trim();
    userStates.set(userId, { step: 'WAITING_RECEIPT', slug });
    
    await ctx.reply(t(userId, 'shop_detected', slug), { parse_mode: 'HTML' });
    await ctx.reply(t(userId, 'pricing_text'), { 
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t(userId, 'btn_pay_done'), `pay_done_${slug}`)]
      ])
    });
    return;
  }

  // Standard welcome
  await ctx.reply(
    t(userId, 'welcome', ctx.from.first_name || 'Foydalanuvchi'),
    { parse_mode: 'HTML', ...getMainMenu(userId) }
  );
});

// Language callbacks
bot.action(/^set_lang_(uz|ru|en)$/, async (ctx) => {
  const lang = ctx.match[1];
  const userId = ctx.from.id;
  userLangs.set(userId, lang);

  await ctx.answerCbQuery();
  await ctx.reply(t(userId, 'lang_set'), getMainMenu(userId));
});

// Menu text handlers
bot.hears(["⭐ PRO Tarifga o'tish", "⭐ Перейти на PRO", "⭐ Upgrade to PRO"], async (ctx) => {
  const userId = ctx.from.id;
  userStates.set(userId, { step: 'WAITING_SLUG' });
  await ctx.reply(t(userId, 'ask_shop_slug'), { 
    parse_mode: 'HTML',
    ...Markup.keyboard([[t(userId, 'btn_cancel')]]).resize()
  });
});

bot.hears(["💎 PRO Imkoniyatlari va Narxlar", "💎 Возможности и Цены PRO", "💎 PRO Features & Pricing"], async (ctx) => {
  const userId = ctx.from.id;
  await ctx.reply(t(userId, 'pricing_text'), { parse_mode: 'HTML' });
});

bot.hears(["📞 Admin bilan bog'lanish", "📞 Связаться с админом", "📞 Contact Support"], async (ctx) => {
  const userId = ctx.from.id;
  await ctx.reply(t(userId, 'contact_admin_text'));
});

bot.hears(["🌐 Tilni o'zgartirish", "🌐 Сменить язык", "🌐 Change Language"], async (ctx) => {
  const userId = ctx.from.id;
  await ctx.reply(t(userId, 'choose_language'), getLangKeyboard());
});

bot.hears(["❌ Bekor qilish", "❌ Отмена", "❌ Cancel"], async (ctx) => {
  const userId = ctx.from.id;
  userStates.delete(userId);
  await ctx.reply(t(userId, 'cancelled'), getMainMenu(userId));
});

// Inline action when user clicks "To'lov qildim"
bot.action(/^pay_done_(.+)$/, async (ctx) => {
  const slug = ctx.match[1];
  const userId = ctx.from.id;
  userStates.set(userId, { step: 'WAITING_RECEIPT', slug });

  await ctx.answerCbQuery();
  await ctx.reply(t(userId, 'ask_receipt'), { parse_mode: 'HTML' });
});

// Photo / Document handler for Receipt
bot.on(['photo', 'document'], async (ctx) => {
  const userId = ctx.from.id;
  const state = userStates.get(userId);

  if (!state || state.step !== 'WAITING_RECEIPT' || !state.slug) {
    return ctx.reply("Iltimos, avval '⭐ PRO Tarifga o'tish' tugmasini bosing va do'kon nomini kiriting.", getMainMenu(userId));
  }

  const slug = state.slug;
  const adminMarkup = Markup.inlineKeyboard([
    [
      Markup.button.callback("✅ Tasdiqlash (PRO berish)", `adm_approve_${slug}_${userId}`),
      Markup.button.callback("❌ Rad etish", `adm_reject_${slug}_${userId}`)
    ]
  ]);

  const caption = locales.uz.admin_new_request(slug, ctx.from);

  try {
    // If admin chat ID is configured, forward to admin
    if (ADMIN_ID) {
      if (ctx.message.photo) {
        const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        await ctx.telegram.sendPhoto(ADMIN_ID, photoId, {
          caption,
          parse_mode: 'HTML',
          ...adminMarkup
        });
      } else if (ctx.message.document) {
        await ctx.telegram.sendDocument(ADMIN_ID, ctx.message.document.file_id, {
          caption,
          parse_mode: 'HTML',
          ...adminMarkup
        });
      }
    } else {
      console.log(`[FastBio Bot] Receipt received for shop "${slug}" by user ${userId} (@${ctx.from.username}). Set ADMIN_TELEGRAM_ID to receive receipts in Telegram.`);
    }

    userStates.delete(userId);
    await ctx.reply(t(userId, 'receipt_received'), { 
      parse_mode: 'HTML',
      ...getMainMenu(userId)
    });
  } catch (err) {
    console.error('Error forwarding receipt to admin:', err);
    await ctx.reply("Chekni yuborishda xatolik yuz berdi. Iltimos, to'g'ridan-to'g'ri @A_Husanboyev ga yuboring.");
  }
});

// Text input handler (for shop slug or general text)
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const state = userStates.get(userId);
  const text = ctx.message.text.trim();

  if (state && state.step === 'WAITING_SLUG') {
    const slug = text.replace(/https?:\/\/fastbio\.uz\/?/i, '').replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
    
    if (!slug) {
      return ctx.reply("Iltimos, to'g'ri do'kon nomini (slug) kiriting:");
    }

    userStates.set(userId, { step: 'WAITING_RECEIPT', slug });
    
    await ctx.reply(t(userId, 'shop_detected', slug), { parse_mode: 'HTML' });
    await ctx.reply(t(userId, 'pricing_text'), { 
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.callback(t(userId, 'btn_pay_done'), `pay_done_${slug}`)]
      ])
    });
    return;
  }

  // If waiting for receipt and sends text
  if (state && state.step === 'WAITING_RECEIPT') {
    return ctx.reply(t(userId, 'ask_receipt'), { parse_mode: 'HTML' });
  }

  // Fallback
  return ctx.reply(t(userId, 'welcome', ctx.from.first_name || ''), {
    parse_mode: 'HTML',
    ...getMainMenu(userId)
  });
});

// Admin Approval Handler
bot.action(/^adm_approve_(.+)_(.+)$/, async (ctx) => {
  const slug = ctx.match[1];
  const targetUserId = ctx.match[2];

  try {
    // 1. Upgrade in DB via API or Supabase direct
    let success = false;
    if (supabase) {
      const { error } = await supabase
        .from('shops')
        .update({ is_pro: true, custom_limit: 500 })
        .eq('slug', slug);
      if (!error) success = true;
    }

    if (!success) {
      try {
        const res = await axios.post(`${APP_URL}/api/upgrade-pro`, {
          slug,
          is_pro: true,
          secret: SECRET
        });
        if (res.data?.success) success = true;
      } catch (e) {
        console.warn('API upgrade fallback call:', e.message);
      }
    }

    // Update admin message
    await ctx.editMessageCaption(
      (ctx.callbackQuery.message.caption || '') + `\n\n✅ <b>PRO TASDIQLANDI!</b> (Admin tomonidan)`,
      { parse_mode: 'HTML' }
    );
    await ctx.answerCbQuery("PRO faollashtirildi!");

    // Notify user
    try {
      await ctx.telegram.sendMessage(
        targetUserId,
        locales[getLang(Number(targetUserId))].user_approved_msg(slug),
        { parse_mode: 'HTML' }
      );
    } catch (e) {
      console.warn('Could not send confirmation to user:', e.message);
    }
  } catch (err) {
    console.error('Error in adm_approve:', err);
    await ctx.answerCbQuery("Xatolik yuz berdi!");
  }
});

// Admin Rejection Handler
bot.action(/^adm_reject_(.+)_(.+)$/, async (ctx) => {
  const slug = ctx.match[1];
  const targetUserId = ctx.match[2];

  try {
    await ctx.editMessageCaption(
      (ctx.callbackQuery.message.caption || '') + `\n\n❌ <b>RAD ETILDI</b> (Admin tomonidan)`,
      { parse_mode: 'HTML' }
    );
    await ctx.answerCbQuery("So'rov rad etildi.");

    // Notify user
    try {
      await ctx.telegram.sendMessage(
        targetUserId,
        locales[getLang(Number(targetUserId))].user_rejected_msg(slug),
        { parse_mode: 'HTML' }
      );
    } catch (e) {
      console.warn('Could not send rejection to user:', e.message);
    }
  } catch (err) {
    console.error('Error in adm_reject:', err);
  }
});

// Launch Bot
bot.launch()
  .then(() => {
    console.log('🤖 FastBio PRO Telegram Bot muvaffaqiyatli ishga tushdi!');
  })
  .catch((err) => {
    console.error('Telegram botni ishga tushirishda xatolik:', err);
  });

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
