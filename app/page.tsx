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
  Eye
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* Step by Step Guide: Qanday ishlaydi? */}
      <section className="py-12 sm:py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-1.5 sm:space-y-2">
            <h2 className="text-[11px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Oddiy 3 qadam
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Katalogingiz qanday ishlaydi?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Hech qanday murakkab ro'yxatdan o'tishsiz, bir necha daqiqada savdoni boshlang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative">
            {/* Step 1 */}
            <div className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                1
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Do'koningizni oching</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Do'kon nomi, o'zingizga yoqqan qisqa manzil (slug) va Telegram username kiriting. 4 xonali PIN kod o'rnating.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/30 transition-all space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-sky-500 text-slate-950 font-black text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-sky-500/25">
                2
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Mahsulotlarni joylang</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Admin panelingiz orqali mahsulot rasmi, nomi, narxi va qisqacha tavsifini osongina kiriting.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-5 sm:p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-amber-400/25">
                3
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">Havolani ulashing</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Tayyor <span className="text-emerald-400 font-mono text-[11px] sm:text-xs">fastbio.uz/sizning_dokon</span> havolasini Instagram va Telegram bioga qo'ying va buyurtmalarni oling!
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
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Namunaviy Ko'rgazma
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                Tayyor namunani sinab ko'ring
              </h3>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-center sm:self-auto"
            >
              <span>O'z do'koningizni ochish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Single Universal Showcase Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shrink-0">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                    {demoShop?.name || "Sizning Do'koningiz"}
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">✓</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    fastbio.uz/{DEMO_SHOP_SLUG}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ko'rish namunasi (Demo)</span>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ushbu namuna do'kon tizim qanday qulay ishlashini ko'rsatish uchun yaratilgan. 
              Siz uning mijoz ko'radigan katalogini ochib ko'rishingiz hamda admin paneliga kirib boshqaruv jarayoni bilan to'liq tanishishingiz mumkin.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <Link
                href={`/${DEMO_SHOP_SLUG}`}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span>Mijoz vitrinasini ko'rish</span>
              </Link>
              <Link
                href={`/${DEMO_SHOP_SLUG}/admin`}
                className="py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <span>Admin panel interfeysi</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-10 md:p-12 text-center text-slate-950 overflow-hidden shadow-2xl shadow-emerald-950/50">
            <div className="relative z-10 space-y-4 sm:space-y-5 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Hoziroq o'z onlayn do'koningizni ishga tushiring!
              </h3>
              <p className="text-xs sm:text-base text-emerald-100 font-medium">
                Telegram va Instagram sahifangizga zamonaviy Link-in-Bio katalog qo'shib, mijozlar sonini va savdongizni oshiring.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 fill-emerald-600" />
                  <span>Bepul do'kon ochish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-6 sm:py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-400 font-semibold">FastBio</span>
            <span>&copy; {new Date().getFullYear()} Barcha huquqlar himoyalangan.</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-slate-400 text-[11px] sm:text-xs">
            <span>Next.js App Router</span>
            <span>&bull;</span>
            <span>Tailwind CSS</span>
            <span>&bull;</span>
            <span>Supabase</span>
          </div>
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
