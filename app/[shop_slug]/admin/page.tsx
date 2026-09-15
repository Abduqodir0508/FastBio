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
  isDemoShop
} from '@/lib/storage';
import { Shop, Product, CreateProductInput, UpdateProductInput } from '@/lib/types';
import { PinGatekeeper } from '@/components/PinGatekeeper';
import { AdminProductList } from '@/components/AdminProductList';
import { ProductFormModal } from '@/components/ProductFormModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mb-3" />
        <p className="text-sm text-slate-400">Admin panel yuklanmoqda...</p>
      </div>
    );
  }

  // 404 state
  if (notFound || !shop) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Do'kon topilmadi</h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-4">
          <span className="font-mono text-white">"/{slug}"</span> do'koni mavjud emas.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs sm:text-sm"
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

  // Calculate quick stats
  const totalProductsCount = products.length;
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  const averagePrice = totalProductsCount > 0 ? totalValue / totalProductsCount : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title="Bosh sahifaga"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                  {shop.name}
                </h1>
                <span className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                  isDemo 
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' 
                    : 'bg-amber-400/10 border border-amber-400/20 text-amber-400'
                }`}>
                  {isDemo ? 'Demo Mode' : 'Admin'}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">
                @{shop.telegram_username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={handleCopyPublicUrl}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Havolani nusxalash</span>
            </button>

            <Link
              href={`/${shop.slug}`}
              target="_blank"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] sm:text-xs font-bold text-emerald-400 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Vitrinani ochish</span>
              <span className="xs:hidden">Vitrina</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Demo Store Alert Banner */}
      {isDemo && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-xs">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Namuna do'kon (Read-Only Demo):</strong> Ushbu namunada mahsulotlarni o'chirish, tahrirlash yoki yangi qo'shish bloklangan.
              </span>
            </div>
            <Link
              href="/"
              className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] transition-all whitespace-nowrap self-end sm:self-auto"
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
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Jami Mahsulotlar</span>
              <Package className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              {totalProductsCount} <span className="text-xs text-slate-500 font-normal">ta</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>O'rtacha Narx</span>
              <TrendingUp className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              {formatPrice(Math.round(averagePrice))}
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Katalog Umumiy Qiymati</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
              {formatPrice(totalValue)}
            </div>
          </div>
        </div>

        {/* Product Catalog Management */}
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-1">
            <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
              Mahsulotlar Katalogi
            </h2>
            <p className="text-xs text-slate-400">
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
    </div>
  );
}
