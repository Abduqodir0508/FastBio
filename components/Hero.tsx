'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  Lock, 
  Zap, 
  ArrowRight, 
  Store, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface HeroProps {
  onOpenCreateModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCreateModal }) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Multi-Tenant Link-in-Bio E-Commerce</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Instagram va Telegram uchun{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                Mini E-Commerce
              </span>{' '}
              Katalogi
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Do'koningizni 1 daqiqada ishga tushiring. Mahsulotlaringizni qo'shing, 
              shaxsiy havola oling (<span className="text-emerald-400 font-mono font-medium">sayt.uz/terra_pro</span>) 
              va mijozlardan to'g'ridan-to'g'ri Telegram orqali avtomatik xabar shaklida buyurtma qabul qiling!
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 justify-center lg:justify-start">
                <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>0% Komissiya</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 justify-center lg:justify-start">
                <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Telegram orqali Buyurtma</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300 justify-center lg:justify-start">
                <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>PIN-himoyalangan Admin</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              <button
                onClick={onOpenCreateModal}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 fill-slate-950" />
                <span>Bepul do'kon ochish</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/terra_pro"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Tayyor namunani ko'rish</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] bg-slate-950 rounded-[42px] p-3 shadow-2xl shadow-emerald-950/60 border-4 border-slate-800 ring-1 ring-white/10 animate-fade-in">
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mr-2" />
                <div className="w-8 h-1 rounded-full bg-slate-700" />
              </div>

              {/* Phone Screen Container */}
              <div className="w-full bg-slate-900 rounded-[32px] pt-8 pb-4 px-3.5 space-y-4 border border-slate-800/80 overflow-hidden">
                {/* Store Header inside Mockup */}
                <div className="text-center space-y-2 pt-2">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/30">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <ShoppingBag className="w-7 h-7 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                      Terra Pro Official
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-black">✓</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">@terrapro_support</p>
                  </div>
                </div>

                {/* Sample Product Cards in Mini Screen */}
                <div className="space-y-2.5">
                  {/* Item 1 */}
                  <div className="bg-slate-950/90 rounded-xl p-2.5 border border-slate-800 flex gap-2.5 items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80"
                        alt="Klassik Ko'ylak"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">Klassik Erkaklar Ko'ylagi</h4>
                      <p className="text-xs font-bold text-emerald-400 mt-0.5">{formatPrice(240000)}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-sky-400 font-medium">
                        <Send className="w-2.5 h-2.5" />
                        <span>Telegramda buyurtma</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-slate-950/90 rounded-xl p-2.5 border border-slate-800 flex gap-2.5 items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1542272604-780c96856592?w=400&q=80"
                        alt="Jinsi Shim"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">Premium Qora Jinsi Shim</h4>
                      <p className="text-xs font-bold text-emerald-400 mt-0.5">{formatPrice(320000)}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-sky-400 font-medium">
                        <Send className="w-2.5 h-2.5" />
                        <span>Telegramda buyurtma</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Demo Link */}
                <div className="pt-1">
                  <Link
                    href="/terra_pro"
                    className="w-full py-2 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>To'liq do'konni ochish</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Feature Grid */}
        <div className="mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1 Daqiqada Ishga Tushirish</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dasturchi yoki murakkab server sozlashlari kerak emas. Faqat do'kon nomi va Telegram username kiriting.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-sky-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 border border-sky-500/20">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Avtomatik Telegram Xabari</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Mijoz mahsulotni tanlab "Buyurtma berish"ni bosganda tayyor xabar bilan to'g'ridan-to'g'ri Telegramingizga yozadi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-amber-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">PIN-himoyalangan Boshqaruv</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              O'zingiz tanlagan 4 xonali PIN-kod orqali mahsulotlarni osongina qo'shing, narxlarini o'zgartiring va o'chiring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
