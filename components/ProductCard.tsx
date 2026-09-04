'use client';

import React, { useState } from 'react';
import { Send, ShoppingBag, Eye, ImageOff } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, buildTelegramOrderUrl } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  telegramUsername: string;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  telegramUsername,
  onSelectProduct,
}) => {
  const [imageError, setImageError] = useState(false);
  const telegramOrderUrl = buildTelegramOrderUrl(
    telegramUsername,
    product.title,
    product.price
  );

  return (
    <div className="group relative bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 flex flex-col shadow-lg shadow-black/20 hover:shadow-emerald-950/20">
      {/* Product Image Container */}
      <div 
        className="relative aspect-square w-full bg-slate-950 overflow-hidden cursor-pointer"
        onClick={() => onSelectProduct?.(product)}
      >
        {!imageError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 gap-2 p-4">
            <ImageOff className="w-8 h-8 stroke-[1.5]" />
            <span className="text-[11px]">Rasm mavjud emas</span>
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct?.(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Batafsil ko'rish"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-emerald-400 font-bold text-xs tracking-tight shadow-md">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 
            onClick={() => onSelectProduct?.(product)}
            className="font-bold text-white text-sm sm:text-base line-clamp-1 hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>
          {product.description && (
            <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Order via Telegram Button */}
        <a
          href={telegramOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-telegram hover:from-sky-400 hover:to-sky-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
        >
          <Send className="w-3.5 h-3.5 fill-white" />
          <span>Buyurtma berish</span>
        </a>
      </div>
    </div>
  );
};
