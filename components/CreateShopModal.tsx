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
    : `myinstalink.vercel.app/${createdShop?.slug || slug}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(fullPublicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGoToAdmin = () => {
    onClose();
    if (createdShop) {
      router.push(`/${createdShop.slug}/admin`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#12131a] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-2xl text-zinc-900 dark:text-white my-auto animate-scale-in max-h-[92vh] overflow-y-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS VIEW */}
        {createdShop ? (
          <div className="py-4 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-rose-500/15 text-rose-600 dark:text-rose-500 rounded-2xl flex items-center justify-center mx-auto border border-rose-500/30 shadow-lg shadow-rose-600/10">
              <CheckCircle2 className="w-9 h-9 text-rose-600 dark:text-rose-500" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Tabriklaymiz! Do'koningiz tayyor 🎉
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                <span className="text-zinc-900 dark:text-white font-medium">{createdShop.name}</span> do'koni muvaffaqiyatli ochildi. Quyidagi havolani Instagram va Telegram sahifangizga qo'ying.
              </p>
            </div>

            {/* Generated Link Display Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-200 dark:border-rose-500/30 text-left space-y-2">
              <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Sizning Do'kon Havolangiz:
              </span>
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-sm text-zinc-800 dark:text-zinc-200 truncate select-all">
                  {fullPublicUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span className="text-rose-600 dark:text-rose-400">Nusxalandi!</span>
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
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 text-left flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-rose-600 dark:text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-white">Admin PIN kodingiz: </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400 tracking-wider">{createdShop.admin_pin}</span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Admin panelga kirish uchun ushbu PIN kodni unutmang.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  router.push(`/${createdShop.slug}`);
                }}
                className="w-full py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 font-semibold text-sm text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-700"
              >
                Mijoz ko'rinishi
              </button>
              <button
                onClick={handleGoToAdmin}
                className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-sm text-white shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>1 daqiqada do'kon yarating</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Yangi do'kon ochish
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Instagram va Telegram orqali savdo qiluvchi Link-in-Bio katalogingizni ishga tushiring.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Store Name */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-rose-600 dark:text-rose-500" />
                  <span>Do'kon nomi *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Modiy Kiyimlar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-300 dark:border-zinc-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all shadow-inner"
                />
              </div>

              {/* Store Slug / URL */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-rose-600 dark:text-rose-500" />
                    <span>Do'kon manzili (Slug) *</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">havola uchun</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs text-zinc-500 dark:text-zinc-400 font-mono select-none">
                    myinstalink.vercel.app/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="modiy_kiyimlar"
                    value={slug}
                    onChange={handleSlugChange}
                    className="w-full pl-[170px] pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-300 dark:border-zinc-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm font-mono text-rose-600 dark:text-rose-400 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-all shadow-inner"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Mijozlar ushbu havola orqali sizning mahsulotlaringizni ko'rishadi.
                </p>
              </div>

              {/* Telegram Username */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                    <span>Telegram Username *</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">@ belgisisiz</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm text-zinc-500 font-medium select-none">
                    @
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="sizning_dokon_bot"
                    value={telegramUsername}
                    onChange={handleTelegramChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-300 dark:border-zinc-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all shadow-inner"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Mijoz "Buyurtma berish" tugmasini bosganda ushbu profilga to'g'ridan-to'g'ri yoziladi.
                </p>
              </div>

              {/* Admin PIN */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>Admin PIN kod *</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-300 dark:border-zinc-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-sm font-mono tracking-wider text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all shadow-inner"
                />
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Admin panelga kirish va mahsulotlarni boshqarish uchun shaxsiy parolingiz.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-60 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Do'kon ochilmoqda...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-white" />
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
