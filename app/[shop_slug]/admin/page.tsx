'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Store, 
  ExternalLink, 
  LogOut, 
  Plus, 
  Package, 
  TrendingUp, 
  DollarSign, 
  ArrowLeft,
  Sparkles,
  Layers,
  Copy,
  Check,
  Loader2,
  ShieldAlert,
  Info,
  AlertTriangle
} from 'lucide-react';
import { 
  getShopBySlug, 
  getProductsByShopId, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  isDemoShop,
  getProductLimit
} from '@/lib/storage';
import { Shop, Product, CreateProductInput, UpdateProductInput } from '@/lib/types';
import { PinGatekeeper } from '@/components/PinGatekeeper';
import { AdminProductList } from '@/components/AdminProductList';
import { ProductFormModal } from '@/components/ProductFormModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import UpgradeModal from '@/components/UpgradeModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.shop_slug as string;

  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Check shop and session auth on mount
  useEffect(() => {
    async function loadShop() {
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

        // Check session auth or auto-auth for demo shop to allow seamless preview
        const isDemo = foundShop.is_demo || isDemoShop(foundShop.slug);
        if (typeof window !== 'undefined') {
          const authKey = `admin_auth_${foundShop.slug}`;
          const isAuth = sessionStorage.getItem(authKey) === 'true';
          setIsAuthenticated(isAuth || isDemo);
        }

        // Fetch products
        const shopProducts = await getProductsByShopId(foundShop.id);
        setProducts(shopProducts);
      } catch (err) {
        console.error('Error in admin page:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    loadShop();
  }, [slug]);

  const isDemo = shop ? (shop.is_demo || isDemoShop(shop.slug)) : false;

  const handleLogout = () => {
    if (typeof window !== 'undefined' && shop) {
      sessionStorage.removeItem(`admin_auth_${shop.slug}`);
    }
    setIsAuthenticated(false);
    toast.info("Admin paneldan chiqildi");
  };

  const handleCopyPublicUrl = () => {
    if (typeof window !== 'undefined' && shop) {
      const publicUrl = `${window.location.origin}/${shop.slug}`;
      navigator.clipboard.writeText(publicUrl);
      setCopiedLink(true);
      toast.success("Do'kon havolasi nusxalandi!");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // CRUD HANDLERS
  const handleCreateOrUpdateProduct = async (
    data: CreateProductInput | UpdateProductInput
  ): Promise<boolean> => {
    if (!shop) return false;

    if (isDemo) {
      toast.error("Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!");
      return false;
    }

    if (editingProduct) {
      // UPDATE
      const res = await updateProduct(editingProduct.id, data as UpdateProductInput);
      if (res.error || !res.product) {
        toast.error(res.error || "Mahsulotni yangilashda xatolik yuz berdi");
        return false;
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? res.product! : p))
      );
      toast.success("Mahsulot muvaffaqiyatli tahrirlandi");
      setEditingProduct(null);
      return true;
    } else {
      // CREATE
      const res = await createProduct(data as CreateProductInput);
      if (res.error || !res.product) {
        if (res.limitReached) {
          setIsUpgradeModalOpen(true);
        }
        toast.error(res.error || "Mahsulot qo'shishda xatolik yuz berdi");
        return false;
      }

      setProducts((prev) => [res.product!, ...prev]);
      toast.success("Yangi mahsulot qo'shildi!");
      return true;
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    if (isDemo) {
      toast.error("Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!");
      setDeletingProduct(null);
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteProduct(deletingProduct.id);
      if (!res.success) {
        toast.error(res.error || "Mahsulotni o'chirishda xatolik yuz berdi");
      } else {
        setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
        toast.success("Mahsulot o'chirildi");
        setDeletingProduct(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Xatolik yuz berdi");
    } finally {
      setIsDeleting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0C10] flex flex-col items-center justify-center text-zinc-900 dark:text-white">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600 dark:text-rose-500 mb-3" />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Admin panel yuklanmoqda...</p>
      </div>
    );
  }

  // 404 state
  if (notFound || !shop) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0C10] flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">Do'kon topilmadi</h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          <span className="font-mono text-zinc-900 dark:text-white">"/{slug}"</span> do'koni mavjud emas.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  // Gatekeeper: Ask for PIN before granting access (except if already authenticated)
  if (!isAuthenticated) {
    return (
      <PinGatekeeper
        shop={shop}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    );
  }

  // Calculate quick stats and limits
  const totalProductsCount = products.length;
  const maxProductLimit = getProductLimit(shop);
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  const averagePrice = totalProductsCount > 0 ? totalValue / totalProductsCount : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0C10] text-zinc-900 dark:text-zinc-100 flex flex-col selection:bg-rose-600 selection:text-white overflow-x-hidden transition-colors duration-200">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0B0C10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 shadow-sm"
              title="Bosh sahifaga"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                  {shop.name}
                </h1>
                <span className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                  isDemo 
                    ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300' 
                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400'
                }`}>
                  {isDemo ? 'Demo Mode' : 'Admin'}
                </span>

                {shop.is_pro ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 border border-rose-500/40 text-rose-600 dark:text-rose-300 shrink-0">
                    <Sparkles className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                    ⭐ PRO Do'kon ({maxProductLimit} ta)
                  </span>
                ) : !isDemo ? (
                  <button
                    onClick={() => setIsUpgradeModalOpen(true)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-white dark:bg-zinc-900 hover:bg-rose-500/15 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500/40 text-zinc-700 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-300 transition-all shrink-0 shadow-sm"
                    title="PRO tarifga o'tish"
                  >
                    <Sparkles className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                    <span>Tarif: Bepul ({maxProductLimit} tagacha) — <strong className="text-rose-600 dark:text-rose-400 underline">PRO-ga o'tish</strong></span>
                  </button>
                ) : null}
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                @{shop.telegram_username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <ThemeToggle />
            <button
              onClick={handleCopyPublicUrl}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors shadow-sm"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Havolani nusxalash</span>
            </button>

            <Link
              href={`/${shop.slug}`}
              target="_blank"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[11px] sm:text-xs font-bold text-rose-600 dark:text-rose-300 transition-colors shadow-sm"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Vitrinani ochish</span>
              <span className="xs:hidden">Vitrina</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors shadow-sm"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Demo Store Alert Banner */}
      {isDemo && (
        <div className="bg-rose-50 dark:bg-rose-950/40 border-b border-rose-200 dark:border-rose-500/20 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-xs">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>
                <strong>Namuna do'kon (Read-Only Demo):</strong> Ushbu namunada mahsulotlarni o'chirish, tahrirlash yoki yangi qo'shish bloklangan.
              </span>
            </div>
            <Link
              href="/"
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-all whitespace-nowrap self-end sm:self-auto shadow-md shadow-rose-600/20"
            >
              O'z do'koningizni oching
            </Link>
          </div>
        </div>
      )}

      {/* Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl space-y-1">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              <span>Jami Mahsulotlar</span>
              <Package className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-white flex items-baseline gap-1.5">
              <span>{totalProductsCount}</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-normal">/ {maxProductLimit} ta</span>
              {!shop.is_pro && !isDemo && totalProductsCount >= maxProductLimit && (
                <span className="ml-auto text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/30">
                  Limit to'ldi
                </span>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl space-y-1">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              <span>O'rtacha Narx</span>
              <TrendingUp className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
              {formatPrice(Math.round(averagePrice))}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-xl space-y-1">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 text-xs font-medium">
              <span>Katalog Umumiy Qiymati</span>
              <DollarSign className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
              {formatPrice(totalValue)}
            </div>
          </div>
        </div>

        {/* Product Catalog Management */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Mahsulotlar Katalogi
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isDemo 
                ? "Namunaviy mahsulotlar ro'yxati. O'zgartirishlar faqat real foydalanuvchi do'konida ishlaydi."
                : "Mahsulotlarni qo'shing, tahrirlang yoki o'chiring. O'zgarishlar vitrinada darhol aks etadi."}
            </p>
          </div>

          {/* Product List Table / Cards */}
          <AdminProductList
            products={products}
            shop={shop}
            isDemo={isDemo}
            onAddNew={() => {
              if (isDemo) {
                toast.error("Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!");
                return;
              }
              if (totalProductsCount >= maxProductLimit) {
                toast.warning(`Limit tugadi! Sizda ${maxProductLimit} ta mahsulot limiti bor. PRO tarifga o'ting.`);
                setIsUpgradeModalOpen(true);
                return;
              }
              setEditingProduct(null);
              setIsFormModalOpen(true);
            }}
            onEdit={(product) => {
              if (isDemo) {
                toast.error("Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!");
                return;
              }
              setEditingProduct(product);
              setIsFormModalOpen(true);
            }}
            onDelete={(product) => {
              if (isDemo) {
                toast.error("Bu namuna do'kon. O'zgartirish kiritish uchun o'z do'koningizni oching!");
                return;
              }
              setDeletingProduct(product);
            }}
          />
        </div>
      </main>

      {/* Product Create/Edit Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        shopId={shop.id}
        initialProduct={editingProduct}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleCreateOrUpdateProduct}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProduct)}
        product={deletingProduct}
        isDeleting={isDeleting}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteProduct}
      />

      {/* Upgrade to PRO Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        shop={shop}
        currentProductCount={totalProductsCount}
      />
    </div>
  );
}
