import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0C10] text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-4 text-center selection:bg-rose-600 selection:text-white relative overflow-hidden transition-colors duration-200">
      {/* Glow orb */}
      <div className="bg-glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 blur-[130px] rounded-full" />
      
      <div className="relative z-10 max-w-md w-full p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-2xl shadow-xl dark:shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 p-0.5 mb-5 shadow-xl shadow-rose-950/20 dark:shadow-rose-950/50">
          <div className="w-full h-full bg-white dark:bg-[#0B0C10] rounded-[14px] flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-rose-600 dark:text-rose-400" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">404</h1>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">Sahifa topilmadi</h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mb-6 leading-relaxed">
          Siz qidirayotgan sahifa yoki do'kon mavjud emas yoki boshqa manzilga ko'chirilgan.
        </p>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
}

