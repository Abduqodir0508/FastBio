import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mb-6 shadow-xl shadow-emerald-950/40">
        <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mb-2">Sahifa topilmadi</h2>
      <p className="text-sm text-slate-400 max-w-sm mb-8">
        Siz qidirayotgan sahifa yoki do'kon mavjud emas yoki boshqa manzilga ko'chirilgan.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Bosh sahifaga qaytish</span>
      </Link>
    </div>
  );
}
