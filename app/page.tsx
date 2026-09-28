'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CreateShopModal } from '@/components/CreateShopModal';
import { 
  ShoppingBag, 
  Store, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Send,
  Eye,
  Check,
  X
} from 'lucide-react';
import { getShopBySlug, DEMO_SHOP_SLUG } from '@/lib/storage';
import { Shop } from '@/lib/types';

export default function HomePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [demoShop, setDemoShop] = useState<Shop | null>(null);

  useEffect(() => {
    async function loadShop() {
      const shop = await getShopBySlug(DEMO_SHOP_SLUG);
      setDemoShop(shop);
    }
    loadShop();
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Step by Step Guide: Qanday ishlaydi? */}
      <section className="py-12 sm:py-20 bg-[#0c111d]/70 border-y border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-1.5 sm:space-y-2">
            <h2 className="text-[11px] sm:text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Oddiy 3 qadam
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Katalogingiz qanday ishlaydi?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Hech qanday murakkab ro'yxatdan o'tishsiz, bir necha daqiqada savdoni boshlang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-[#121826]/70 border border-white/[0.08] backdrop-blur-xl hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white font-black text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                1
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Do'koningizni oching</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Do'kon nomi, o'zingizga yoqqan qisqa manzil (slug) va Telegram username kiriting. 4 xonali PIN kod o'rnating.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-[#121826]/70 border border-white/[0.08] backdrop-blur-xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-black text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                2
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Mahsulotlarni joylang</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Admin panelingiz orqali mahsulot rasmi, nomi, narxi va qisqacha tavsifini osongina kiriting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-[#121826]/70 border border-white/[0.08] backdrop-blur-xl hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/5 transition-all space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-black text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                3
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Havolani ulashing</h4>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Tayyor <span className="text-indigo-300 font-mono text-[11px] sm:text-xs">myinstalink.vercel.app/sizning_dokon</span> havolasini Instagram va Telegram bioga qo'ying va buyurtmalarni oling!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Single Demo Store Showcase */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Namunaviy Ko'rgazma
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                Tayyor namunani sinab ko'ring
              </h3>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 self-center sm:self-auto transition-colors"
            >
              <span>O'z do'koningizni ochish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Single Universal Showcase Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-[#121826]/80 border border-white/[0.08] backdrop-blur-xl hover:border-indigo-500/40 transition-all space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shrink-0 shadow-lg shadow-indigo-500/25">
                  <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-indigo-300" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                    {demoShop?.name || "Sizning Do'koningiz"}
                    <span className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    myinstalink.vercel.app/{DEMO_SHOP_SLUG}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ko'rish namunasi (Demo)</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Ushbu namuna do'kon tizim qanday qulay ishlashini ko'rsatish uchun yaratilgan. 
              Siz uning mijoz ko'radigan katalogini ochib ko'rishingiz hamda admin paneliga kirib boshqaruv jarayoni bilan to'liq tanishishingiz mumkin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Link
                href={`/${DEMO_SHOP_SLUG}`}
                className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 transition-all border border-white/[0.06]"
              >
                <Store className="w-4 h-4 text-indigo-400" />
                <span>Mijoz vitrinasini ko'rish</span>
              </Link>
              <Link
                href={`/${DEMO_SHOP_SLUG}/admin`}
                className="py-3 px-4 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 transition-all"
              >
                <span>Admin panel interfeysi</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Qulayliklar Section */}
      <section className="py-14 sm:py-20 bg-[#0c111d]/70 border-y border-white/[0.06] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
            <span className="text-[11px] sm:text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Tariflar & Qulayliklar
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Mos tarifni tanlang
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Biznesingizni bepul boshlang yoki PRO tarif bilan imkoniyatlarni kengaytiring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Card 1: Bepul (Start) */}
            <div className="rounded-3xl bg-[#121826]/70 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-white/20 shadow-xl backdrop-blur-xl">
              <div className="space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-white">Bepul (Start)</h4>
                  <p className="text-xs text-zinc-400 mt-1">Yangi boshlovchilar va kichik loyihalar uchun</p>
                </div>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">0</span>
                  <span className="text-zinc-400 text-sm font-semibold">so&apos;m</span>
                  <span className="text-xs text-zinc-500 ml-1">/ doimiy</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-zinc-300">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Maksimal <b>8 tagacha</b> mahsulot / rasm</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Standart Telegram orqali buyurtma</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><b>0% komissiya</b> (barcha tushum sizda)</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Oddiy do&apos;kon havolasi</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-zinc-500">
                    <X className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                    <span>8 tadan ortiq mahsulot qo&apos;shib bo&apos;lmaydi</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-zinc-500">
                    <X className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                    <span>Do&apos;konda maxsus PRO nishoni bo&apos;lmaydi</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-bold text-sm transition-all hover:scale-[1.01] active:scale-[0.99] border border-white/10 shadow-md"
                >
                  Do&apos;kon ochish
                </button>
              </div>
            </div>

            {/* Card 2: PRO Tarif (Highlighted) */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#181534] via-[#12132b] to-[#0d0e1a] border-2 border-indigo-500/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-indigo-500/15 transition-all hover:border-indigo-400 backdrop-blur-xl">
              {/* Badge */}
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-indigo-500/30">
                ⭐ Tavsiya etiladi
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-indigo-300 flex items-center gap-1.5">
                    <span>PRO Do&apos;kon</span>
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">Katta assortiment va professional bizneslar uchun</p>
                </div>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-white">150 000</span>
                  <span className="text-indigo-400 text-sm font-bold">so&apos;m</span>
                  <span className="text-xs text-zinc-400 ml-1">/ to&apos;liq faollashtirish</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-indigo-500/25 text-xs sm:text-sm text-zinc-200">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span><b>500 tagacha</b> mahsulot va fotosuratlar</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Cheksiz mijozlar va buyurtmalar oqimi</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-pink-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Do&apos;kon nomiga maxsus <b>&quot;⭐ PRO&quot;</b> belgisi</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Yuqori yuklanish tezligi va ustuvor qo&apos;llab-quvvatlash</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>Limitni 500 tadan ham ko&apos;paytirish imkoniyati (@A_Husanboyev orqali)</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <a
                  href="https://t.me/A_Husanboyev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>PRO tarifni olish ⚡</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 sm:p-10 md:p-12 text-center text-white overflow-hidden shadow-2xl shadow-indigo-950/60">
            <div className="relative z-10 space-y-4 sm:space-y-5 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Hoziroq o'z onlayn do'koningizni ishga tushiring!
              </h3>
              <p className="text-xs sm:text-base text-indigo-100 font-medium">
                Telegram va Instagram sahifangizga zamonaviy Link-in-Bio katalog qo'shib, mijozlar sonini va savdongizni oshiring.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-100 text-zinc-950 font-extrabold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 fill-indigo-600" />
                  <span>Bepul do'kon ochish</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/[0.06] py-6 text-center text-sm bg-[#070A10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="https://t.me/A_Husanboyev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 group"
          >
            <Send className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Qo&apos;llab-quvvatlash / Savollar bo&apos;yicha: <strong className="text-zinc-300 group-hover:text-white font-medium">@A_Husanboyev</strong></span>
          </a>
        </div>
      </footer>

      {/* Modal for creating a new store */}
      <CreateShopModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
