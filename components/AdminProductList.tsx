'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Send, 
  Package, 
  ImageOff,
  ArrowUpDown,
  DollarSign,
  Lock
} from 'lucide-react';
import { Product, Shop } from '@/lib/types';
import { formatPrice, buildTelegramOrderUrl } from '@/lib/utils';

interface AdminProductListProps {
  products: Product[];
  shop: Shop;
  isDemo?: boolean;
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const AdminProductList: React.FC<AdminProductListProps> = ({
  products,
  shop,
  isDemo,
  onAddNew,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'title'>('newest');

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    // newest (default)
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 bg-slate-900/70 p-3 sm:p-4 rounded-2xl border border-slate-800">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Mahsulotlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
          />
        </div>

        {/* Sort & Add Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-700/80 text-[11px] sm:text-xs font-medium text-slate-300 focus:border-emerald-500 outline-none cursor-pointer"
            >
              <option value="newest">Yangi qo'shilganlar</option>
              <option value="price_asc">Narx: Arzonroq</option>
              <option value="price_desc">Narx: Qimmatroq</option>
              <option value="title">Nom bo'yicha</option>
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>

          <button
            onClick={onAddNew}
            className="flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            {isDemo ? <Lock className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
            <span>Mahsulot qo'shish</span>
          </button>
        </div>
      </div>

      {/* Product Cards Grid / Empty State */}
      {sortedProducts.length === 0 ? (
        <div className="py-12 sm:py-16 text-center bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 space-y-3 sm:space-y-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto">
            <Package className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white">Mahsulotlar topilmadi</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {searchQuery
                ? `"${searchQuery}" bo'yicha hech qanday mahsulot topilmadi.`
                : "Ushbu do'konga hali mahsulot qo'shilmagan."}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Birinchi mahsulotni qo'shish</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {sortedProducts.map((product) => {
            const telegramOrderUrl = buildTelegramOrderUrl(
              shop.telegram_username,
              product.title,
              product.price
            );

            return (
              <div
                key={product.id}
                className="group bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all space-y-3 shadow-md"
              >
                <div className="space-y-3">
                  {/* Thumbnail & Meta */}
                  <div className="flex gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <ImageOff className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate" title={product.title}>
                        {product.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-extrabold text-emerald-400 mt-1">
                        {formatPrice(product.price)}
                      </p>
                      {product.description && (
                        <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <a
                    href={telegramOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-[11px] font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 hover:underline"
                    title="Telegram havolasini sinab ko'rish"
                  >
                    <Send className="w-3 h-3" />
                    <span>Sinab ko'rish</span>
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title={isDemo ? "Namuna rejimida" : "Tahrirlash"}
                    >
                      <Edit3 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-1.5 sm:p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                      title={isDemo ? "Namuna rejimida" : "O'chirish"}
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
