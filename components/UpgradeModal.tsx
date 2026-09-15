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
  Headphones 
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
  const botDeepLink = `https://t.me/fastbiopro_bot?start=upgrade_${shop.slug}`;
  const adminDirectLink = `https://t.me/A_Husanboyev`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            FastBio PRO Imkoniyatlari
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Do&apos;koningizni PRO-ga oshiring!
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Hozirgi limit: <span className="text-amber-400 font-semibold">{currentProductCount} / {maxLimit} ta</span> mahsulot. 
            Cheklovlarsiz savdo qiling!
          </p>
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium mb-1">Bepul Tarif</div>
            <div className="text-base font-bold text-slate-200">8 ta Mahsulot</div>
            <div className="text-xs text-slate-500 mt-2 space-y-1">
              <div>• Standart dizayn</div>
              <div>• Asosiy statistika</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/40 relative">
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-500 text-[10px] font-black text-slate-950 uppercase tracking-wider">
              PRO
            </div>
            <div className="text-xs text-amber-400 font-medium mb-1">PRO Do&apos;kon</div>
            <div className="text-base font-bold text-amber-300">500 ta Mahsulot</div>
            <div className="text-xs text-amber-200/70 mt-2 space-y-1">
              <div>• ⭐ PRO nishoni</div>
              <div>• ⚡ Tezkor yuklanish</div>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-amber-500/10 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <span><b>500 tagacha</b> mahsulot va yuqori sifatli rasmlar yuklash</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Mijozlar ishonchini oshiruvchi <b>PRO Verified</b> belgisi</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span>Maksimal tezlik, qulay katalog va ustuvor qidiruv</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-purple-500/10 text-purple-400">
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
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/25"
          >
            <Send className="w-5 h-5 text-slate-950" />
            <span>Telegram Bot orqali faollashtirish</span>
          </a>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
            <span>Yoki to&apos;g&apos;ridan-to&apos;g&apos;ri adminga yozish:</span>
            <a
              href={adminDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
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
