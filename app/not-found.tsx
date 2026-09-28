import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col items-center justify-center p-4 text-center selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Glow orb */}
      <div className="bg-glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full" />
      
      <div className="relative z-10 max-w-md w-full p-8 rounded-3xl bg-[#121826]/80 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 mb-5 shadow-xl shadow-indigo-500/25">
          <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-indigo-300" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">404</h1>
        <h2 className="text-lg sm:text-xl font-bold text-zinc-200 mb-2">Sahifa topilmadi</h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mb-6 leading-relaxed">
          Siz qidirayotgan sahifa yoki do'kon mavjud emas yoki boshqa manzilga ko'chirilgan.
        </p>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
}
