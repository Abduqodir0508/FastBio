'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, KeyRound, ArrowRight, Store, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Shop } from '@/lib/types';

interface PinGatekeeperProps {
  shop: Shop;
  onAuthenticated: () => void;
}

export const PinGatekeeper: React.FC<PinGatekeeperProps> = ({ shop, onAuthenticated }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pin.trim() === shop.admin_pin.trim()) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`admin_auth_${shop.slug}`, 'true');
      }
      onAuthenticated();
    } else {
      setError("PIN kod noto'g'ri! Iltimos qaytadan urinib ko'ring.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeypadPress = (digit: string) => {
    setError(null);
    if (digit === 'DEL') {
      setPin((prev) => prev.slice(0, -1));
    } else if (pin.length < 8) {
      const newPin = pin + digit;
      setPin(newPin);
      // Auto submit if length matches shop admin_pin length
      if (newPin.length === shop.admin_pin.length) {
        if (newPin === shop.admin_pin) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(`admin_auth_${shop.slug}`, 'true');
          }
          onAuthenticated();
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0C10] flex flex-col items-center justify-center p-3.5 sm:p-4 relative overflow-hidden selection:bg-rose-600 selection:text-white transition-colors duration-200">
      {/* Background Ambience */}
      <div className="bg-glow-orb absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-rose-500/10 dark:bg-rose-600/15 blur-[100px] sm:blur-[140px] rounded-full" />
      <div className="bg-glow-orb absolute bottom-1/4 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-red-500/10 blur-[90px] sm:blur-[120px] rounded-full" />

      <div className={`w-full max-w-md bg-white dark:bg-[#12131a]/90 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-xl dark:shadow-2xl backdrop-blur-2xl relative z-10 transition-transform ${shake ? 'animate-shake' : ''}`}>
        
        {/* Lock Icon Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg shadow-rose-600/15">
          <Lock className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
        </div>

        {/* Header */}
        <div className="text-center space-y-1 sm:space-y-1.5 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Admin Kirish
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-900 dark:text-white font-medium">{shop.name}</span> boshqaruv paneliga kirish uchun PIN kodni kiriting.
          </p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="relative">
            <div className="relative flex items-center">
              <input
                type={showPin ? 'text' : 'password'}
                autoFocus
                placeholder="PIN kod..."
                value={pin}
                onChange={(e) => {
                  setError(null);
                  setPin(e.target.value);
                }}
                className="w-full pl-4 pr-12 py-3 sm:py-3.5 rounded-2xl bg-zinc-50 dark:bg-[#0B0C10] border border-zinc-300 dark:border-zinc-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-center font-mono text-lg sm:text-xl tracking-[0.3em] text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 outline-none transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'DEL'].map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => {
                  if (btn === 'C') {
                    setPin('');
                    setError(null);
                  } else {
                    handleKeypadPress(btn);
                  }
                }}
                className={`h-11 sm:h-12 rounded-xl text-sm sm:text-base font-semibold transition-all ${
                  btn === 'DEL' || btn === 'C'
                    ? 'bg-zinc-100 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs border border-zinc-200 dark:border-zinc-800/80'
                    : 'bg-zinc-100 dark:bg-zinc-900/90 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white active:scale-95 shadow-sm border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>Panelga kirish</span>
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-zinc-200 dark:border-zinc-800/80 text-center">
          <Link
            href={`/${shop.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-rose-600 dark:text-rose-500" />
            <span>Mijoz do'koniga qaytish</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
