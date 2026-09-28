'use client';

import React, { useState } from 'react';
import { X, Send, ShoppingBag, ImageOff } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, buildTelegramOrderUrl } from '@/lib/utils';

interface ProductDetailModalProps {
  product: Product | null;
  telegramUsername: string;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  telegramUsername,
  onClose,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const telegramOrderUrl = buildTelegramOrderUrl(
    telegramUsername,
    product.title,
    product.price
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 dark:bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#12131a] border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl text-zinc-900 dark:text-white my-auto animate-scale-in transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-video sm:aspect-[4/3] w-full bg-zinc-100 dark:bg-[#0B0C10] overflow-hidden">
          {!imageError && product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-[#0B0C10] text-zinc-400 dark:text-zinc-600 gap-2">
              <ImageOff className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
              <span className="text-xs">Rasm mavjud emas</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0B0C10]/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-rose-600 dark:text-rose-400 font-black text-xs sm:text-base shadow-md">
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Details & Action */}
        <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {product.title}
            </h2>
            {product.description ? (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-2 sm:mt-2.5 whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 mt-2 italic">
                Qo'shimcha tavsif kiritilmagan.
              </p>
            )}
          </div>

          <div className="pt-1 sm:pt-2">
            <a
              href={telegramOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01]"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Telegram orqali buyurtma berish</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
