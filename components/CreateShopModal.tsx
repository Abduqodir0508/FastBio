'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Store, 
  Globe, 
  Send, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { createShop } from '@/lib/storage';
import { slugify, cleanTelegramUsername } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateShopModal: React.FC<CreateShopModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdShop, setCreatedShop] = useState<{ slug: string; name: string; admin_pin: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-generate slug when name changes unless manually edited
  useEffect(() => {
    if (!isSlugManuallyEdited && name) {
      setSlug(slugify(name));
    }
  }, [name, isSlugManuallyEdited]);

  // Reset form when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName('');
        setSlug('');
        setIsSlugManuallyEdited(false);
        setTelegramUsername('');
        setAdminPin('');
        setError(null);
        setCreatedShop(null);
        setCopied(false);
      }, 200);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setSlug(slugify(e.target.value));
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelegramUsername(cleanTelegramUsername(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Do'kon nomini kiriting");
      return;
    }
    if (!slug.trim()) {
      setError("Do'kon manzilini (slug) kiriting");
      return;
    }
    if (!telegramUsername.trim()) {
      setError("Telegram username kiriting");
      return;
    }
    if (!adminPin.trim() || adminPin.trim().length < 4) {
      setError("Admin PIN kod kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setLoading(true);
    try {
      const res = await createShop({
        name: name.trim(),
        slug: slug.trim(),
        telegram_username: telegramUsername.trim(),
        admin_pin: adminPin.trim(),
      });

      if (res.error || !res.shop) {
        setError(res.error || "Do'kon ochishda xatolik yuz berdi");
        setLoading(false);
        return;
      }

      // Success!
      setCreatedShop({
        slug: res.shop.slug,
        name: res.shop.name,
        admin_pin: res.shop.admin_pin,
      });

      // Save admin session for instant login
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`admin_auth_${res.shop.slug}`, 'true');
      }

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Ignore if confetti fails in some environments
      }

    } catch (err: any) {
      setError(err.message || "Kutilmagan xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const fullPublicUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/${createdShop?.slug || slug}` 
    : `sayt.uz/${createdShop?.slug || slug}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(fullPublicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoToAdmin = () => {
    if (createdShop) {
      onClose();
      router.push(`/${createdShop.slug}/admin`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 text-white overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-emerald-500/20 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS VIEW */}
        {createdShop ? (
          <div className="py-4 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Tabriklaymiz! Do'koningiz tayyor 🎉
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                <span className="text-white font-medium">{createdShop.name}</span> do'koni muvaffaqiyatli ochildi. Quyidagi havolani Instagram va Telegram sahifangizga qo'ying.
              </p>
            </div>

            {/* Generated Link Display Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-left space-y-2">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Sizning Do'kon Havolangiz:
              </span>
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-sm text-slate-200 truncate select-all">
                  {fullPublicUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Nusxalandi!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Nusxa olish</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Admin PIN Reminder */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300 text-left flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Admin PIN kodingiz: </span>
                <span className="font-mono font-bold text-amber-300 tracking-wider">{createdShop.admin_pin}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Admin panelga kirish uchun ushbu PIN kodni unutmang.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  router.push(`/${createdShop.slug}`);
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm text-slate-200 transition-colors"
              >
                Mijoz ko'rinishi
              </button>
              <button
                onClick={handleGoToAdmin}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-semibold text-sm text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Admin Panelga o'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* CREATION FORM */
          <div>
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1 daqiqada do'kon yarating</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Yangi do'kon ochish
              </h2>
              <p className="text-sm text-slate-400">
                Instagram va Telegram orqali savdo qiluvchi Link-in-Bio katalogingizni ishga tushiring.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shop Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Do'kon nomi *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Terra Pro Toshkent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Shop Slug & Live URL Preview */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                    <span>Do'kon havolasi (slug) *</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Masalan: terra_pro</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs text-slate-500 font-mono select-none">
                    sayt.uz/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="terra_pro"
                    value={slug}
                    onChange={handleSlugChange}
                    className="w-full pl-20 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-mono text-emerald-300 placeholder-slate-600 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Mijozlar ushbu havola orqali sizning mahsulotlaringizni ko'rishadi.
                </p>
              </div>

              {/* Telegram Username */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-sky-400" />
                    <span>Telegram Username *</span>
                  </span>
                  <span className="text-[11px] text-slate-400">@ belgisisiz</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm text-slate-500 font-medium select-none">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="terrapro_manager"
                    value={telegramUsername}
                    onChange={handleTelegramChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Mijoz "Buyurtma berish" tugmasini bosganda ushbu profilga to'g'ridan-to'g'ri yoziladi.
                </p>
              </div>

              {/* Admin PIN */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin PIN kod *</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    {showPin ? "Yashirish" : "Ko'rsatish"}
                  </button>
                </label>
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  maxLength={10}
                  placeholder="Masalan: 1234"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm font-mono tracking-wider text-white placeholder-slate-500 outline-none transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Admin panelga kirish va mahsulotlarni boshqarish uchun shaxsiy parolingiz.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Do'kon ochilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950" />
                      <span>Do'konni ishga tushirish</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
