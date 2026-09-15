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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            FastBio PRO Imkoniyatlari
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Do&apos;koningizni PRO-ga oshiring!
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Hozirgi holat: <span className="text-amber-400 font-semibold">{currentProductCount} / {maxLimit} ta</span> mahsulot. 
            Cheklovlarsiz savdo qiling!
          </p>
        </div>

        {/* Comparison Box with Price */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium mb-1">Bepul Tarif</div>
              <div className="text-base font-bold text-slate-200">8 ta Mahsulot</div>
              <div className="text-xs text-slate-500 mt-2 space-y-1">
                <div>• Standart vitrina</div>
                <div>• Asosiy funksiyalar</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs font-semibold text-slate-400">
              Narxi: 0 so&apos;m
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 border border-amber-500/50 relative flex flex-col justify-between">
            <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded bg-amber-500 text-[10px] font-black text-slate-950 uppercase tracking-wider">
              PRO
            </div>
            <div>
              <div className="text-xs text-amber-400 font-medium mb-1">PRO Do&apos;kon</div>
              <div className="text-base font-bold text-amber-300">500 ta Mahsulot</div>
              <div className="text-xs text-amber-200/80 mt-2 space-y-1">
                <div>• ⭐ PRO rasmiy nishon</div>
                <div>• ⚡ Cheksiz buyurtmalar</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-500/30">
              <div className="text-[10px] text-amber-300/80 uppercase font-semibold">Tarif Narxi</div>
              <div className="text-base sm:text-lg font-black text-amber-400">
                150 000 so&apos;m
              </div>
            </div>
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-2.5 mb-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span><b>500 tagacha</b> mahsulot va yuqori sifatli rasmlar yuklash</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Mijozlar ishonchini oshiruvchi <b>PRO Verified Badge</b> belgisi</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-indigo-500/10 text-indigo-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span>Cheksiz mijozlar va buyurtmalarni qabul qilish</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300">
            <div className="p-1 rounded-md bg-purple-500/10 text-purple-400 shrink-0">
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
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-amber-500/25 text-sm sm:text-base"
          >
            <Send className="w-5 h-5 text-slate-950" />
            <span>150 000 so&apos;m — Telegram Bot orqali faollashtirish</span>
          </a>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
            <span>Savollar uchun adminga yozish:</span>
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
