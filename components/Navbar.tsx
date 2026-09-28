'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Store } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreateModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-[#0B0C10]/85 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-600/25 group-hover:scale-105 group-hover:shadow-rose-600/40 transition-all duration-200 shrink-0">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center">
              Insta<span className="bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">Link</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 -mt-0.5 sm:-mt-1 font-medium tracking-wide">
              E-Commerce Bio Store
            </span>
          </div>
        </Link>

        {/* Navigation & Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/demo_shop"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 sm:border-transparent transition-all flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-rose-600 dark:text-rose-500" />
            <span className="hidden xs:inline">Namuna</span>
            <span>Do'kon</span>
          </Link>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/30 hover:shadow-rose-600/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span className="hidden xs:inline">Do'kon ochish</span>
            <span className="xs:hidden">Ochish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
