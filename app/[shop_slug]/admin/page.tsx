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
  Loader2
} from 'lucide-react';
import { 
  getShopBySlug, 
  getProductsByShopId, 
  createProduct, 
  updateProduct, 
  deleteProduct 
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

        // Check session auth
        if (typeof window !== 'undefined') {
          const authKey = `admin_auth_${foundShop.slug}`;
          const isAuth = sessionStorage.getItem(authKey) === 'true';
          setIsAuthenticated(isAuth);
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
        <h1 className="text-2xl font-bold text-white mb-2">Do'kon topilmadi</h1>
        <p className="text-sm text-slate-400 mb-4">
          <span className="font-mono text-white">"/{slug}"</span> do'koni mavjud emas.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  // Gatekeeper: Ask for PIN before granting access
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Bosh sahifaga"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {shop.name}
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                @{shop.telegram_username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-400 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Vitrinani ochish</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
              title="Chiqish (Qulflash)"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Jami Mahsulotlar</span>
              <Package className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {totalProductsCount} <span className="text-xs text-slate-500 font-normal">ta</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>O'rtacha Narx</span>
              <TrendingUp className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatPrice(Math.round(averagePrice))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Katalog Umumiy Qiymati</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatPrice(totalValue)}
            </div>
          </div>
        </div>

        {/* Product Catalog Management */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Mahsulotlar Katalogi
              </h2>
              <p className="text-xs text-slate-400">
                Mahsulotlarni qo'shing, tahrirlang yoki o'chiring. O'zgarishlar vitrinada darhol aks etadi.
              </p>
            </div>
          </div>

          {/* Product List Table / Cards */}
          <AdminProductList
            products={products}
            shop={shop}
            onAddNew={() => {
              setEditingProduct(null);
              setIsFormModalOpen(true);
            }}
            onEdit={(product) => {
              setEditingProduct(product);
              setIsFormModalOpen(true);
            }}
            onDelete={(product) => {
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
