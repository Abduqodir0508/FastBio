'use client';

import React, { useState } from 'react';
import { X, Send, ShoppingBag, ImageOff, ExternalLink } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/70 rounded-3xl overflow-hidden shadow-2xl text-white animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md text-slate-300 hover:text-white hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-video sm:aspect-[4/3] w-full bg-slate-950 overflow-hidden">
          {!imageError && product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 gap-2">
              <ImageOff className="w-10 h-10 stroke-[1.5]" />
              <span className="text-xs">Rasm mavjud emas</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-emerald-400 font-extrabold text-sm sm:text-base">
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Details & Action */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {product.title}
            </h2>
            {product.description ? (
              <p className="text-sm text-slate-300 mt-2.5 whitespace-pre-line leading-relaxed">
                {product.description}
              </p>
            ) : (
              <p className="text-sm text-slate-500 mt-2 italic">
                Qo'shimcha tavsif kiritilmagan.
              </p>
            )}
          </div>

          <div className="pt-2">
            <a
              href={telegramOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-telegram hover:from-sky-400 hover:to-sky-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01]"
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
