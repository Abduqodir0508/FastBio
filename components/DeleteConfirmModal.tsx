'use client';

import React from 'react';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { Product } from '@/lib/types';

interface DeleteConfirmModalProps {
  product: Product | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  product,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white text-center space-y-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
          <Trash2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            Mahsulotni o'chirish
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Haqiqatan ham <span className="text-white font-medium">"{product.title}"</span> mahsulotini o'chirmoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs sm:text-sm text-slate-300 transition-colors"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-500/20 flex items-center justify-center gap-1.5 transition-all"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>O'chirilmoqda...</span>
              </>
            ) : (
              <span>O'chirish</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
