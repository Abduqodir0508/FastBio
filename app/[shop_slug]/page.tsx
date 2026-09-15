'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShoppingBag, 
  Send, 
  Settings, 
  Search, 
  ArrowLeft, 
  Package, 
  ExternalLink,
  ShieldCheck,
  Share2,
  Check,
  Sparkles,
  Store,
  Eye,
  Info
} from 'lucide-react';
import { getShopBySlug, getProductsByShopId, isDemoShop } from '@/lib/storage';
import { Shop, Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { buildTelegramDirectUrl } from '@/lib/utils';
import { toast } from 'sonner';

export default function ShopCatalogPage() {
  const params = useParams();
  const slug = params?.shop_slug as string;

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadShopData() {
      if (!slug) return;
      setLoading(true);
      try {
        const foundShop = await getShopBySlug(slug);
        if (!foundShop) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setShop(foundShop);
        const shopProducts = await getProductsByShopId(foundShop.id);
        setProducts(shopProducts);
      } catch (err) {
        console.error('Error loading shop catalog:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadShopData();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast.success("Do'kon havolasi nusxalandi!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // 404 Not Found State
  if (!loading && (notFound || !shop)) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mb-4">
          <Store className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Do'kon topilmadi</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6">
          <span className="font-mono text-white">"/{slug}"</span> nomli do'kon mavjud emas yoki o'chirilgan bo'lishi mumkin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Link
            href="/"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bosh sahifaga</span>
          </Link>
          <Link
            href="/"
            className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold text-center transition-all shadow-lg"
          >
            Do'kon ochish
          </Link>
        </div>
      </div>
    );
  }

  const isDemo = shop ? (shop.is_demo || isDemoShop(shop.slug)) : false;

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Insta.Link</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Havolani ulashish"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <Link
              href={`/${slug}/admin`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all hover:scale-[1.02]"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Demo Store Notice Banner if Demo */}
      {isDemo && (
        <div className="bg-emerald-950/60 border-b border-emerald-500/20 py-2 px-4 text-center">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-2 text-xs text-emerald-300">
            <Info className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
            <span>
              Bu <strong>Namuna Do'kon</strong> (Demo mode). Tizim mijozlarga qanday ko'rinishini sinab ko'ryapsiz.
            </span>
          </div>
        </div>
      )}

      {/* Main Container - Mobile First Bio Layout */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5 sm:py-8 space-y-5 sm:space-y-6">
        {loading ? (
          /* Shimmer Loading State */
          <div className="space-y-6 animate-pulse">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800 rounded-3xl" />
              <div className="w-40 sm:w-48 h-5 sm:h-6 bg-slate-800 rounded-lg" />
              <div className="w-28 sm:w-32 h-3.5 sm:h-4 bg-slate-800 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[3/4] bg-slate-900 rounded-2xl" />
              ))}
            </div>
          </div>
        ) : shop ? (
          <>
            {/* Shop Profile Header (Link-in-Bio Style) */}
            <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
              {/* Store Avatar */}
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-400 p-0.5 shadow-xl shadow-emerald-950/40">
                  <div className="w-full h-full bg-slate-900 rounded-[22px] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-md">
                  ✓
                </div>
              </div>

              {/* Shop Name & Details */}
              <div className="space-y-1">
                <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  {shop.name}
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  sayt.uz/{shop.slug}
                </p>
                {shop.description && (
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto pt-0.5">
                    {shop.description}
                  </p>
                )}
              </div>

              {/* Telegram Contact CTA Button */}
              <a
                href={buildTelegramDirectUrl(shop.telegram_username)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-400 font-semibold text-xs sm:text-sm shadow-sm transition-all hover:scale-105"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-sky-400" />
                <span>@{shop.telegram_username} bilan bog'lanish</span>
              </a>
            </div>

            {/* Search & Product Counter */}
            <div className="space-y-2.5 sm:space-y-3 pt-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Katalogdan qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-medium text-slate-300">
                  Barcha mahsulotlar ({filteredProducts.length})
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-400 hover:underline text-xs"
                  >
                    Filtrni tozalash
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-12 sm:py-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">Mahsulot topilmadi</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {searchQuery 
                    ? `"${searchQuery}" bo'yicha hech qanday mahsulot topilmadi.`
                    : "Ushbu do'konda hozircha mahsulotlar mavjud emas."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    telegramUsername={shop.telegram_username}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </>
        ) : null}
      </main>

      {/* Product Detail Modal for Quick View */}
      <ProductDetailModal
        product={selectedProduct}
        telegramUsername={shop?.telegram_username || ''}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer Branding */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-400 transition-colors inline-flex items-center gap-1">
          <span>Powered by</span>
          <span className="font-semibold text-emerald-400">Insta.Link</span>
        </Link>
      </footer>
    </div>
  );
}
