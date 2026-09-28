'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  Zap, 
  ArrowRight, 
  Store, 
  ShoppingBag, 
  ExternalLink, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { DEMO_SHOP_SLUG } from '@/lib/storage';

interface HeroProps {
  onOpenCreateModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCreateModal }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-32 transition-colors duration-200">
      {/* Background Glow Elements with Hardware Acceleration */}
      <div className="bg-glow-orb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[540px] lg:w-[640px] h-[320px] sm:h-[540px] lg:h-[640px] bg-rose-500/10 dark:bg-rose-600/15 blur-[100px] sm:blur-[140px] rounded-full" />
      <div className="bg-glow-orb absolute top-1/3 right-4 sm:right-10 w-[220px] sm:w-[380px] h-[220px] sm:h-[380px] bg-red-500/10 dark:bg-red-500/10 blur-[90px] sm:blur-[120px] rounded-full" />
      <div className="bg-glow-orb absolute bottom-10 left-4 sm:left-10 w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] bg-pink-500/10 dark:bg-pink-600/10 blur-[90px] sm:blur-[110px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>Multi-Tenant Link-in-Bio E-Commerce</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.2] sm:leading-[1.12]">
              Instagram va Telegram uchun{' '}
              <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 bg-clip-text text-transparent">
                Mini E-Commerce
              </span>{' '}
              Katalogi
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Do'koningizni 1 daqiqada ishga tushiring. Mahsulotlaringizni joylang, 
              shaxsiy havola oling (<span className="text-rose-600 dark:text-rose-400 font-mono font-medium">myinstalink.vercel.app/{DEMO_SHOP_SLUG}</span>) 
              va mijozlardan to'g'ridan-to'g'ri Telegram orqali avtomatik xabar shaklida buyurtma qabul qiling!
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 justify-center lg:justify-start">
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>0% Komissiya</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 justify-center lg:justify-start">
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Telegramda Buyurtma</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-zinc-700 dark:text-zinc-300 justify-center lg:justify-start">
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>PIN-himoyalangan Admin</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
              <button
                onClick={onOpenCreateModal}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-rose-600/30 hover:shadow-rose-600/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                <span>Bepul do'kon ochish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={`/${DEMO_SHOP_SLUG}`}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 hover:border-rose-500/40 shadow-sm"
              >
                <Store className="w-4 h-4 text-rose-600 dark:text-rose-500" />
                <span>Tayyor namunani ko'rish</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup Preview (iPhone 15/16 Pro Style) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            {/* Phone Outer Shell */}
            <div className="relative w-full max-w-[265px] sm:max-w-[290px] lg:max-w-[305px] aspect-[9/19.2] bg-zinc-200 dark:bg-[#07080a] rounded-[44px] sm:rounded-[48px] p-2.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(225,29,72,0.15)] border border-zinc-300 dark:border-zinc-800 flex flex-col justify-between transition-colors">
              {/* Subtle Side Button Highlights */}
              <div className="absolute -left-[2px] top-24 w-[2px] h-7 bg-zinc-400 dark:bg-zinc-700 rounded-l" />
              <div className="absolute -left-[2px] top-34 w-[2px] h-11 bg-zinc-400 dark:bg-zinc-700 rounded-l" />
              <div className="absolute -right-[2px] top-28 w-[2px] h-14 bg-zinc-400 dark:bg-zinc-700 rounded-r" />

              {/* Phone Inner Screen Container */}
              <div className="w-full h-full bg-white dark:bg-gradient-to-b dark:from-[#14151c] dark:via-[#0B0C10] dark:to-[#07080a] rounded-[38px] sm:rounded-[40px] pt-2.5 pb-2.5 px-2.5 sm:px-3 flex flex-col justify-between border border-zinc-200 dark:border-zinc-800/80 overflow-hidden relative shadow-inner transition-colors">
                {/* Top Status Bar & Dynamic Island */}
                <div className="relative z-10 flex items-center justify-between px-2 pt-0.5 pb-1.5">
                  <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">9:41</span>
                  
                  {/* Dynamic Island Pill */}
                  <div className="w-[74px] sm:w-[78px] h-[18px] sm:h-[20px] bg-zinc-900 dark:bg-black rounded-full flex items-center justify-between px-2 shadow-sm">
                    <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-zinc-800 dark:bg-zinc-900 border border-zinc-700 dark:border-zinc-800 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-rose-500" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 dark:bg-zinc-800/80" />
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-zinc-700 dark:text-zinc-300 font-medium">
                    <span className="text-[9px]">5G</span>
                    <div className="w-3.5 sm:w-4 h-2 rounded-[2px] border border-zinc-500 dark:border-zinc-400 p-[1px] flex items-center">
                      <div className="w-2.5 h-full bg-rose-500 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Store Header inside Mockup */}
                <div className="text-center space-y-1 pt-0.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 p-0.5 shadow-md shadow-rose-600/30">
                    <div className="w-full h-full bg-white dark:bg-[#0B0C10] rounded-[14px] flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 dark:text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center justify-center gap-1">
                      <span>Sizning Do'koningiz</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-600 text-white inline-flex items-center justify-center text-[8px] font-black">✓</span>
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400">@instalink_demo</p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[8px] sm:text-[9px] font-medium">
                    <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
                    <span>Namuna Do'kon • Ko'rish rejimi</span>
                  </div>
                </div>

                {/* Sample Product Cards in Mini Screen */}
                <div className="space-y-1.5 sm:space-y-2 py-1">
                  {/* Item 1 */}
                  <div className="bg-zinc-50 dark:bg-zinc-900/90 rounded-xl p-1.5 sm:p-2 border border-zinc-200 dark:border-zinc-800 flex gap-2 items-center hover:border-rose-500/40 transition-colors">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80"
                        alt="Klassik Erkaklar Ko'ylagi"
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[10px] sm:text-[11px] font-semibold text-zinc-900 dark:text-white truncate">Klassik Erkaklar Ko'ylagi</h4>
                      <p className="text-[10px] sm:text-[11px] font-bold text-rose-600 dark:text-rose-400">{formatPrice(240000)}</p>
                      <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-sky-600 dark:text-sky-400 font-medium">
                        <Send className="w-2 h-2" />
                        <span>Telegramda buyurtma</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-zinc-50 dark:bg-zinc-900/90 rounded-xl p-1.5 sm:p-2 border border-zinc-200 dark:border-zinc-800 flex gap-2 items-center hover:border-rose-500/40 transition-colors">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
                        alt="Simsiz Shovqinsiz Quloqchin"
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[10px] sm:text-[11px] font-semibold text-zinc-900 dark:text-white truncate">Simsiz Shovqinsiz Quloqchin</h4>
                      <p className="text-[10px] sm:text-[11px] font-bold text-rose-600 dark:text-rose-400">{formatPrice(450000)}</p>
                      <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-sky-600 dark:text-sky-400 font-medium">
                        <Send className="w-2 h-2" />
                        <span>Telegramda buyurtma</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Demo Link & Home Indicator */}
                <div className="space-y-1.5 pt-0.5">
                  <Link
                    href={`/${DEMO_SHOP_SLUG}`}
                    className="w-full py-1.5 sm:py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 dark:bg-rose-500/15 dark:hover:bg-rose-500/25 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-[10px] sm:text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>To'liq do'konni ochish</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  {/* iPhone Home Indicator Bar */}
                  <div className="w-20 sm:w-24 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Feature Grid */}
        <div className="mt-14 sm:mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl hover:border-rose-500/40 shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-rose-950/20 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-500 flex items-center justify-center mb-3 sm:mb-4 border border-rose-500/20">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5 sm:mb-2">1 Daqiqada Ishga Tushirish</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Dasturchi yoki murakkab server sozlashlari kerak emas. Faqat do'kon nomi va Telegram username kiriting.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl hover:border-rose-500/40 shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-rose-950/20 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3 sm:mb-4 border border-rose-500/20">
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5 sm:mb-2">Avtomatik Telegram Xabari</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Mijoz mahsulotni tanlab "Buyurtma berish"ni bosganda tayyor xabar bilan to'g'ridan-to'g'ri Telegramingizga yozadi.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl hover:border-rose-500/40 shadow-sm hover:shadow-xl dark:shadow-none hover:shadow-rose-950/20 transition-all">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3 sm:mb-4 border border-rose-500/20">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5 sm:mb-2">PIN-himoyalangan Boshqaruv</h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O'zingiz tanlagan 4 xonali PIN-kod orqali mahsulotlarni osongina qo'shing, narxlarini o'zgartiring va boshqaring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
