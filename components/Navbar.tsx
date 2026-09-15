'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, Store } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCreateModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Fast<span className="text-emerald-400">Bio</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400 -mt-0.5 sm:-mt-1 font-medium tracking-wide">
              E-Commerce Bio Store
            </span>
          </div>
        </Link>

        {/* Navigation & Action */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/demo_shop"
            className="text-xs font-medium text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-slate-800/60 border border-slate-800 sm:border-transparent transition-colors flex items-center gap-1.5"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Namuna</span>
            <span>Do'kon</span>
          </Link>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950" />
            <span>Do'kon ochish</span>
          </button>
        </div>
      </div>
    </header>
  );
};
