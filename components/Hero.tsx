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

          {/* Right Column: Interactive Phone Mockup Preview (iPhone 15/16 Pro Style) */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Phone Outer Shell */}
            <div className="relative w-full max-w-[285px] sm:max-w-[295px] aspect-[9/19.2] bg-slate-950 rounded-[48px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.12)] border border-slate-700/60 ring-1 ring-white/10 animate-fade-in flex flex-col justify-between">
              {/* Subtle Side Button Highlights */}
              <div className="absolute -left-[2px] top-24 w-[2px] h-7 bg-slate-600/80 rounded-l" />
              <div className="absolute -left-[2px] top-34 w-[2px] h-11 bg-slate-600/80 rounded-l" />
              <div className="absolute -right-[2px] top-28 w-[2px] h-14 bg-slate-600/80 rounded-r" />

              {/* Phone Inner Screen Container */}
              <div className="w-full h-full bg-gradient-to-b from-slate-900/95 via-slate-900/95 to-slate-950 rounded-[40px] pt-3 pb-3 px-3 flex flex-col justify-between border border-slate-800/80 overflow-hidden relative shadow-inner">
                {/* Top Status Bar & Dynamic Island */}
                <div className="relative z-10 flex items-center justify-between px-2 pt-0.5 pb-2">
                  <span className="text-[10px] font-semibold text-slate-300 tracking-tight">9:41</span>
                  
                  {/* Dynamic Island Pill */}
                  <div className="w-[78px] h-[20px] bg-black rounded-full flex items-center justify-between px-2 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-sky-500/80" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800/80" />
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-300 font-medium">
                    <span className="text-[9px]">5G</span>
                    <div className="w-4 h-2 rounded-[2px] border border-slate-400 p-[1px] flex items-center">
                      <div className="w-2.5 h-full bg-emerald-400 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Store Header inside Mockup */}
                <div className="text-center space-y-1.5 pt-0.5">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/25">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center justify-center gap-1">
                      <span>Terra Pro Official</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-slate-950 inline-flex items-center justify-center text-[8px] font-black">✓</span>
                    </h3>
                    <p className="text-[10px] text-slate-400">@terrapro_support</p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-medium">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online Do'kon • 24/7</span>
                  </div>
                </div>

                {/* Sample Product Cards in Mini Screen */}
                <div className="space-y-2 py-1">
                  {/* Item 1 */}
                  <div className="bg-slate-950/85 rounded-xl p-2 border border-slate-800/80 flex gap-2.5 items-center hover:border-emerald-500/30 transition-colors">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&auto=format&fit=crop&q=80"
                        alt="Klassik Erkaklar Ko'ylagi"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-semibold text-white truncate">Klassik Erkaklar Ko'ylagi</h4>
                      <p className="text-[11px] font-bold text-emerald-400 mt-0.5">{formatPrice(240000)}</p>
                      <div className="mt-0.5 flex items-center gap-1 text-[9px] text-sky-400 font-medium">
                        <Send className="w-2.5 h-2.5" />
                        <span>Telegramda buyurtma</span>
                      </div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-slate-950/85 rounded-xl p-2 border border-slate-800/80 flex gap-2.5 items-center hover:border-emerald-500/30 transition-colors">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 relative">
                      <img
                        src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80"
                        alt="Premium Qora Jinsi Shim"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-semibold text-white truncate">Premium Qora Jinsi Shim</h4>
                      <p className="text-[11px] font-bold text-emerald-400 mt-0.5">{formatPrice(320000)}</p>
                      <div className="mt-0.5 flex items-center gap-1 text-[9px] text-sky-400 font-medium">
                        <Send className="w-2.5 h-2.5" />
                        <span>Telegramda buyurtma</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Demo Link & Home Indicator */}
                <div className="space-y-2 pt-0.5">
                  <Link
                    href="/terra_pro"
                    className="w-full py-2 px-3 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>To'liq do'konni ochish</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  {/* iPhone Home Indicator Bar */}
                  <div className="w-24 h-1 bg-slate-600/60 rounded-full mx-auto" />
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
