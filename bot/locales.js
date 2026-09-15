/**
 * FastBio Multi-language localization dictionary (UZ, RU, EN)
 */

module.exports = {
  uz: {
    language_name: "🇺🇿 O'zbekcha",
    welcome: (name) => `👋 Assalomu alaykum, <b>${name}</b>!\n\n<b>FastBio PRO</b> faollashtirish botiga xush kelibsiz.`,
    choose_language: "🌐 Iltimos, muloqot tilini tanlang:\nПожалуйста, выберите язык:\nPlease select your language:",
    lang_set: "✅ Til muvaffaqiyatli tanlandi!",
    
    main_menu: "Asosiy menyu:",
    btn_upgrade_pro: "⭐ PRO Tarifga o'tish",
    btn_pricing_info: "💎 PRO Imkoniyatlari va Narxlar",
    btn_contact_admin: "📞 Admin bilan bog'lanish",
    btn_change_lang: "🌐 Tilni o'zgartirish",
    
    pricing_text: `💎 <b>FastBio PRO Imkoniyatlari va Ta'riflar:</b>\n\n` +
      `⚡ <b>Imkoniyatlar:</b>\n` +
      `• 500 tagacha mahsulot va yuqori sifatli rasmlar\n` +
      `• ⭐ PRO Verified rasmiy nishon\n` +
      `• Yuqori tezlik va ustuvor qidiruv\n` +
      `• 24/7 Shaxsiy qo'llab-quvvatlash\n\n` +
      `💳 <b>To'lov ma'lumotlari:</b>\n` +
      `• Narxi: <b>49 000 UZS / oy</b> (yoki <b>299 000 UZS / umrbod</b>)\n` +
      `• Karta: <code>8600 0000 0000 0000</code> (Husanboyev A.)\n\n` +
      `To'lovni amalga oshirib, chekni ushbu botga yuboring!`,

    ask_shop_slug: "✍️ PRO faollashtirmoqchi bo'lgan <b>do'koningiz manzilini (slug)</b> kiriting:\n\n<i>Masalan: my_brand (fastbio.uz/my_brand)</i>",
    shop_detected: (slug) => `🏪 Tanlangan do'kon: <b>${slug}</b>\n(Havola: fastbio.uz/${slug})`,
    
    ask_receipt: `📸 Iltimos, to'lov amalga oshirilgan <b>to'lov cheki (skrinshot yoki PDF)</b>ni botga yuboring.`,
    
    receipt_received: "✅ <b>Chek qabul qilindi!</b>\n\nMa'lumotlar adminga tekshirish uchun yuborildi. Bir necha daqiqada do'koningiz PRO maqomiga o'tkaziladi va sizga xabar beriladi.",
    
    btn_pay_done: "✅ To'lov qildim (Chek yuborish)",
    btn_cancel: "❌ Bekor qilish",
    cancelled: "Bekor qilindi.",
    contact_admin_text: "👨‍💻 Savollar yoki yordam uchun adminga murojaat qiling: @A_Husanboyev",

    // Admin alerts
    admin_new_request: (slug, user) => 
      `🔔 <b>YANGI PRO SO'ROVI!</b>\n\n` +
      `🏪 Do'kon: <b>${slug}</b>\n` +
      `👤 Foydalanuvchi: ${user.first_name || ''} (@${user.username || 'username_yoq'})\n` +
      `🆔 Telegram ID: <code>${user.id}</code>\n\n` +
      `Quyidagi tugmalar orqali tasdiqlang yoki rad eting:`,

    admin_approved_btn: "✅ Tasdiqlash va PRO berish",
    admin_rejected_btn: "❌ Rad etish",
    admin_approved_success: (slug) => `✅ <b>${slug}</b> do'koni uchun PRO muvaffaqiyatli faollashtirildi!`,
    admin_rejected_success: (slug) => `❌ <b>${slug}</b> so'rovi rad etildi.`,

    user_approved_msg: (slug) => 
      `🎉 <b>TABRIKLAYMIZ!</b>\n\n` +
      `Sizning <b>fastbio.uz/${slug}</b> do'koningiz uchun <b>PRO tarif</b> muvaffaqiyatli faollashtirildi! 🚀\n\n` +
      `Endi siz 500 tagacha mahsulot qo'shishingiz va barcha PRO imkoniyatlaridan foydalanishingiz mumkin!`,

    user_rejected_msg: (slug, reason) => 
      `⚠️ Hurmatli foydalanuvchi, <b>${slug}</b> do'koni uchun PRO so'rovi to'lov tasdiqlanmaganligi sababli rad etildi.\n\n` +
      `Savollar bo'lsa adminga murojaat qiling: @A_Husanboyev`
  },

  ru: {
    language_name: "🇷🇺 Русский",
    welcome: (name) => `👋 Здравствуйте, <b>${name}</b>!\n\nДобро пожаловать в бот активации <b>FastBio PRO</b>.`,
    choose_language: "🌐 Выберите язык / Tilni tanlang / Select language:",
    lang_set: "✅ Язык успешно выбран!",
    
    main_menu: "Главное меню:",
    btn_upgrade_pro: "⭐ Перейти на PRO",
    btn_pricing_info: "💎 Возможности и Цены PRO",
    btn_contact_admin: "📞 Связаться с админом",
    btn_change_lang: "🌐 Сменить язык",
    
    pricing_text: `💎 <b>Возможности и Тарифы FastBio PRO:</b>\n\n` +
      `⚡ <b>Преимущества:</b>\n` +
      `• До 500 товаров и фото высокого качества\n` +
      `• ⭐ Официальный значок PRO Verified\n` +
      `• Максимальная скорость и приоритет в поиске\n` +
      `• Круглосуточная поддержка 24/7\n\n` +
      `💳 <b>Реквизиты для оплаты:</b>\n` +
      `• Стоимость: <b>49 000 UZS / мес</b> (или <b>299 000 UZS / навсегда</b>)\n` +
      `• Карта: <code>8600 0000 0000 0000</code> (Husanboyev A.)\n\n` +
      `После оплаты отправьте чек в этот бот!`,

    ask_shop_slug: "✍️ Введите <b>адрес (slug) вашего магазина</b>:\n\n<i>Например: my_brand (fastbio.uz/my_brand)</i>",
    shop_detected: (slug) => `🏪 Выбранный магазин: <b>${slug}</b>\n(Ссылка: fastbio.uz/${slug})`,
    
    ask_receipt: `📸 Пожалуйста, отправьте <b>чек об оплате (скриншот или PDF)</b> в бот.`,
    
    receipt_received: "✅ <b>Чек принят!</b>\n\nДанные переданы администратору на проверку. Ваш магазин будет переведен на PRO в течение нескольких минут.",
    
    btn_pay_done: "✅ Оплатил (Отправить чек)",
    btn_cancel: "❌ Отмена",
    cancelled: "Отменено.",
    contact_admin_text: "👨‍💻 По всем вопросам обращайтесь к администратору: @A_Husanboyev",

    admin_new_request: (slug, user) => 
      `🔔 <b>НОВЫЙ ЗАПРОС НА PRO!</b>\n\n` +
      `🏪 Магазин: <b>${slug}</b>\n` +
      `👤 Пользователь: ${user.first_name || ''} (@${user.username || 'нет_юзернейма'})\n` +
      `🆔 Telegram ID: <code>${user.id}</code>\n\n` +
      `Подтвердите или отклоните запрос:`,

    admin_approved_btn: "✅ Подтвердить и выдать PRO",
    admin_rejected_btn: "❌ Отклонить",
    admin_approved_success: (slug) => `✅ PRO успешно активирован для магазина <b>${slug}</b>!`,
    admin_rejected_success: (slug) => `❌ Запрос для магазина <b>${slug}</b> отклонен.`,

    user_approved_msg: (slug) => 
      `🎉 <b>ПОЗДРАВЛЯЕМ!</b>\n\n` +
      `Для вашего магазина <b>fastbio.uz/${slug}</b> успешно активирован <b>тариф PRO</b>! 🚀\n\n` +
      `Теперь вы можете добавлять до 500 товаров и использовать все премиум функции!`,

    user_rejected_msg: (slug, reason) => 
      `⚠️ Запрос на активацию PRO для магазина <b>${slug}</b> был отклонен.\n\n` +
      `Если у вас есть вопросы, напишите администратору: @A_Husanboyev`
  },

  en: {
    language_name: "🇬🇧 English",
    welcome: (name) => `👋 Hello, <b>${name}</b>!\n\nWelcome to the <b>FastBio PRO</b> activation bot.`,
    choose_language: "🌐 Please select your language:",
    lang_set: "✅ Language set successfully!",
    
    main_menu: "Main Menu:",
    btn_upgrade_pro: "⭐ Upgrade to PRO",
    btn_pricing_info: "💎 PRO Features & Pricing",
    btn_contact_admin: "📞 Contact Support",
    btn_change_lang: "🌐 Change Language",
    
    pricing_text: `💎 <b>FastBio PRO Features & Pricing:</b>\n\n` +
      `⚡ <b>Features:</b>\n` +
      `• Up to 500 products & HD images\n` +
      `• ⭐ PRO Verified Badge\n` +
      `• Ultra fast loading & priority indexing\n` +
      `• 24/7 Dedicated Support\n\n` +
      `💳 <b>Payment Details:</b>\n` +
      `• Price: <b>49,000 UZS / month</b> (or <b>299,000 UZS / lifetime</b>)\n` +
      `• Card: <code>8600 0000 0000 0000</code> (Husanboyev A.)\n\n` +
      `Complete the payment and send the receipt to this bot!`,

    ask_shop_slug: "✍️ Please enter your <b>shop address (slug)</b>:\n\n<i>Example: my_brand (fastbio.uz/my_brand)</i>",
    shop_detected: (slug) => `🏪 Selected Shop: <b>${slug}</b>\n(Link: fastbio.uz/${slug})`,
    
    ask_receipt: `📸 Please send your <b>payment receipt (screenshot or PDF)</b>.`,
    
    receipt_received: "✅ <b>Receipt received!</b>\n\nSent to the administrator for review. Your shop will be upgraded to PRO within minutes.",
    
    btn_pay_done: "✅ Paid (Send Receipt)",
    btn_cancel: "❌ Cancel",
    cancelled: "Cancelled.",
    contact_admin_text: "👨‍💻 For help or questions, contact: @A_Husanboyev",

    admin_new_request: (slug, user) => 
      `🔔 <b>NEW PRO REQUEST!</b>\n\n` +
      `🏪 Shop: <b>${slug}</b>\n` +
      `👤 User: ${user.first_name || ''} (@${user.username || 'no_username'})\n` +
      `🆔 Telegram ID: <code>${user.id}</code>\n\n` +
      `Approve or reject below:`,

    admin_approved_btn: "✅ Approve & Grant PRO",
    admin_rejected_btn: "❌ Reject",
    admin_approved_success: (slug) => `✅ PRO successfully activated for <b>${slug}</b>!`,
    admin_rejected_success: (slug) => `❌ Request for <b>${slug}</b> rejected.`,

    user_approved_msg: (slug) => 
      `🎉 <b>CONGRATULATIONS!</b>\n\n` +
      `<b>PRO Plan</b> has been successfully activated for <b>fastbio.uz/${slug}</b>! 🚀\n\n` +
      `You can now upload up to 500 products!`,

    user_rejected_msg: (slug, reason) => 
      `⚠️ Your PRO request for <b>${slug}</b> was rejected.\n\n` +
      `Contact admin for assistance: @A_Husanboyev`
  }
};
