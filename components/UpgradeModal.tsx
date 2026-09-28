'use client';

import React from 'react';
import { 
  Sparkles, 
  Check, 
  Send, 
  MessageCircle, 
  X, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Headphones,
  Tag
} from 'lucide-react';
import { Shop } from '@/lib/types';
import { getProductLimit } from '@/lib/storage';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: Shop;
  currentProductCount?: number;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  shop,
  currentProductCount = 0,
}: UpgradeModalProps) {
  if (!isOpen) return null;

  const maxLimit = getProductLimit(shop);
  const botDeepLink = `https://t.me/instalinkpro_bot?start=${shop.slug}`;
  const adminDirectLink = `https://t.me/A_Husanboyev`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#12131a] border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/20 dark:shadow-rose-950/40 overflow-hidden text-zinc-900 dark:text-white transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/15 dark:bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-rose-500" />
            InstaLink PRO Imkoniyatlari
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Do&apos;koningizni PRO-ga oshiring!
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            Hozirgi holat: <span className="text-rose-600 dark:text-rose-400 font-semibold">{currentProductCount} / {maxLimit} ta</span> mahsulot. 
            Cheklovlarsiz savdo qiling!
          </p>
        </div>

        {/* Comparison Box with Price */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-200 dark:border-zinc-800">
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Bepul Tarif</div>
              <div className="text-base font-bold text-zinc-800 dark:text-zinc-200">8 ta Mahsulot</div>
              <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 space-y-1">
                <div>• Standart vitrina</div>
                <div>• Asosiy funksiyalar</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Narxi: 0 so&apos;m
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-50/80 via-white to-rose-100/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-rose-950/40 border border-rose-500/60 ring-1 ring-rose-500/30 relative flex flex-col justify-between shadow-sm">
            <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-rose-600 text-[10px] font-black text-white uppercase tracking-wider">
              PRO
            </div>
            <div>
              <div className="text-xs text-rose-600 dark:text-rose-400 font-medium mb-1">PRO Do&apos;kon</div>
              <div className="text-base font-bold text-zinc-900 dark:text-white">500 ta Mahsulot</div>
              <div className="text-xs text-rose-600/80 dark:text-rose-300/80 mt-2 space-y-1">
                <div>• ⭐ PRO rasmiy nishon</div>
                <div>• ⚡ Cheksiz buyurtmalar</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-rose-500/30">
              <div className="text-[10px] text-rose-600/80 dark:text-rose-300/80 uppercase font-semibold">Tarif Narxi</div>
              <div className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                150 000 so&apos;m
              </div>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
            <div className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-500 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span><b>500 tagacha</b> mahsulot va yuqori sifatli rasmlar yuklash</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
            <div className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-500 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Mijozlar ishonchini oshiruvchi <b>PRO Verified Badge</b> belgisi</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
            <div className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-500 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span>Cheksiz mijozlar va buyurtmalarni qabul qilish</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-700 dark:text-zinc-300">
            <div className="p-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-500 shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <span>24/7 Shaxsiy qo&apos;llab-quvvatlash va maslahatlar</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={botDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg shadow-rose-600/35 active:scale-[0.98] text-sm sm:text-base"
          >
            <Send className="w-5 h-5 text-white" />
            <span>150 000 so&apos;m — PRO tarifni faollashtirish</span>
          </a>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1 pt-1">
            <span>Savollar uchun adminga yozish:</span>
            <a
              href={adminDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:text-rose-500 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              @A_Husanboyev
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
