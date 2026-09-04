'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Image as ImageIcon, DollarSign, Type, AlignLeft, Loader2, AlertCircle, ImageOff } from 'lucide-react';
import { Product, CreateProductInput, UpdateProductInput } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductFormModalProps {
  isOpen: boolean;
  shopId: string;
  initialProduct?: Product | null;
  onClose: () => void;
  onSubmit: (data: CreateProductInput | UpdateProductInput) => Promise<boolean>;
}

const PRESET_IMAGES = [
  { label: "Ko'ylak", url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80' },
  { label: 'Jinsi', url: 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&q=80' },
  { label: 'Kurtka', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80' },
  { label: 'Krossovka', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
  { label: 'Smartfon', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80' },
  { label: 'Soat', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  shopId,
  initialProduct,
  onClose,
  onSubmit,
}) => {
  const isEditing = Boolean(initialProduct);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setTitle(initialProduct.title || '');
      setPrice(initialProduct.price?.toString() || '');
      setImageUrl(initialProduct.image_url || '');
      setDescription(initialProduct.description || '');
      setImageError(false);
    } else {
      setTitle('');
      setPrice('');
      setImageUrl(PRESET_IMAGES[0].url);
      setDescription('');
      setImageError(false);
    }
    setError(null);
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Mahsulot nomini kiriting');
      return;
    }
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      setError('Iltimos, to‘g‘ri narx kiriting');
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        shop_id: shopId,
        title: title.trim(),
        price: numericPrice,
        image_url: imageUrl.trim() || PRESET_IMAGES[0].url,
        description: description.trim(),
      };

      const success = await onSubmit(payload);
      if (success) {
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{isEditing ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isEditing 
              ? "Mahsulot ma'lumotlarini o'zgartiring va saqlang."
              : "Do'koningiz katalogiga yangi mahsulot qo'shing."}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mahsulot nomi *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Klassik Erkaklar Ko'ylagi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Narxi (UZS) *</span>
              </span>
              {price && !isNaN(parseFloat(price)) && (
                <span className="text-xs font-bold text-emerald-400">
                  {formatPrice(parseFloat(price))}
                </span>
              )}
            </label>
            <input
              type="number"
              required
              min="0"
              step="1000"
              placeholder="Masalan: 240000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Image URL & Quick Presets */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Rasm URL havolasi</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageError(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />

            {/* Presets List */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] text-slate-400 mr-1">Namunalar:</span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setImageUrl(preset.url);
                    setImageError(false);
                  }}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                    imageUrl === preset.url
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Image Preview */}
            {imageUrl && (
              <div className="mt-3 relative w-full h-32 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-red-400">
                    <ImageOff className="w-4 h-4" />
                    <span>Rasm yuklanmadi. URL to'g'riligini tekshiring.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Tavsif (ixtiyoriy)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Mahsulot haqida qisqacha ma'lumot, o'lchamlar, ranglar..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm text-slate-300 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saqlanmoqda...</span>
                </>
              ) : (
                <span>{isEditing ? "Saqlash" : "Mahsulotni qo'shish"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
