'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Package, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Bell, 
  History, 
  ExternalLink, 
  ChevronRight, 
  Upload, 
  X, 
  Check, 
  RefreshCw, 
  Sparkles, 
  Maximize2, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  SlidersHorizontal,
  FileText,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { Product } from '@/types';
import { AdminOrder, AuditLogEntry, AdminNotification, OrderStatus } from '@/types/admin';

type AdminTab = 'orders' | 'products' | 'shipping' | 'audit' | 'notifications';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  
  // Données
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState<boolean>(false);

  // Filtres Produits
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [productSearch, setProductSearch] = useState<string>('');
  const [productAvailabilityFilter, setProductAvailabilityFilter] = useState<string>('all');
  const [productPage, setProductPage] = useState<number>(1);
  const productsPerPage = 12;

  // Filtres Commandes
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');

  // Modals
  const [previewProofModal, setPreviewProofModal] = useState<{ isOpen: boolean; order: AdminOrder | null }>({ isOpen: false, order: null });
  const [shippingModal, setShippingModal] = useState<{ isOpen: boolean; order: AdminOrder | null }>({ isOpen: false, order: null });
  const [editProductModal, setEditProductModal] = useState<{ isOpen: boolean; product: Product | null; isNew: boolean }>({ isOpen: false, product: null, isNew: false });
  const [orderDetailsModal, setOrderDetailsModal] = useState<{ isOpen: boolean; order: AdminOrder | null }>({ isOpen: false, order: null });

  // Formulaire Expédition
  const [shippingCarrier, setShippingCarrier] = useState<string>('Colissimo Suivi');
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [shippingNotes, setShippingNotes] = useState<string>('');

  // Formulaire Produit
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);

  // Message Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ----------------------------------------------------
  // CHARGEMENT INITIAL DES DONNÉES
  // ----------------------------------------------------
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, productsRes, auditRes, notifsRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/products'),
        fetch('/api/admin/audit'),
        fetch('/api/admin/notifications')
      ]);

      const [ordersData, productsData, auditData, notifsData] = await Promise.all([
        ordersRes.json(),
        productsRes.json(),
        auditRes.json(),
        notifsRes.json()
      ]);

      if (ordersData.success) setOrders(ordersData.orders || []);
      if (productsData.success) setProducts(productsData.products || []);
      if (auditData.success) setAuditLogs(auditData.logs || []);
      if (notifsData.success) {
        setNotifications(notifsData.notifications || []);
        setUnreadNotifsCount(notifsData.unreadCount || 0);
      }
    } catch (err) {
      console.error('Erreur chargement admin:', err);
      showToast('Erreur de connexion aux APIs administrateur.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // ----------------------------------------------------
  // ACTIONS SUR LES COMMANDES
  // ----------------------------------------------------
  const handleVerifyPayment = async (order: AdminOrder) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderReference: order.orderReference,
          status: 'payment_verified',
          actor: 'Admin Principal'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`✓ Paiement validé pour la commande ${order.orderReference} !`);
        setPreviewProofModal({ isOpen: false, order: null });
        loadAllData();
      } else {
        showToast(data.message || 'Erreur lors de la validation.');
      }
    } catch (err) {
      showToast('Erreur serveur lors de la validation du paiement.');
    }
  };

  const openShippingModal = (order: AdminOrder) => {
    setShippingModal({ isOpen: true, order });
    setShippingCarrier(order.shippingCarrier || 'Colissimo Suivi');
    setTrackingNumber(order.trackingNumber || `CC${Math.floor(100000000 + Math.random() * 900000000)}FR`);
    setShippingNotes('');
  };

  const handleLaunchShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingModal.order) return;

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderReference: shippingModal.order.orderReference,
          status: 'shipping_started',
          shippingCarrier,
          trackingNumber,
          adminNotes: shippingNotes,
          actor: 'Admin Principal'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🚚 Livraison lancée pour la commande ${shippingModal.order.orderReference} !`);
        setShippingModal({ isOpen: false, order: null });
        loadAllData();
      } else {
        showToast(data.message || 'Erreur lors du lancement.');
      }
    } catch (err) {
      showToast('Erreur lors du lancement de la livraison.');
    }
  };

  const handleMarkDelivered = async (order: AdminOrder) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderReference: order.orderReference,
          status: 'delivered',
          actor: 'Admin Principal'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🎁 Commande ${order.orderReference} marquée comme livrée !`);
        loadAllData();
      }
    } catch (err) {
      showToast('Erreur serveur.');
    }
  };

  // ----------------------------------------------------
  // ACTIONS SUR LES PRODUITS
  // ----------------------------------------------------
  const handleToggleProductAvailability = async (product: Product) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          actor: 'Admin Principal'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Produit ${product.sku} : statut mis à jour (${data.availability === 'in_stock' ? 'Disponible' : 'Vendu'})`);
        loadAllData();
      }
    } catch (err) {
      showToast('Erreur modification disponibilité.');
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement « ${product.title.fr} » ?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/products?id=${encodeURIComponent(product.id)}&actor=Admin+Principal`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Produit ${product.sku} supprimé.`);
        loadAllData();
      }
    } catch (err) {
      showToast('Erreur suppression produit.');
    }
  };

  const openEditProductModal = (product: Product) => {
    setProductForm({ ...product });
    setNewImageUrl('');
    setEditProductModal({ isOpen: true, product, isNew: false });
  };

  const openNewProductModal = () => {
    const defaultCat = selectedCategory !== 'all' ? selectedCategory : 'mode';
    setProductForm({
      id: `prod-${defaultCat}-${Date.now().toString().slice(-4)}`,
      categorySlug: defaultCat,
      title: { fr: '', en: '', de: '', es: '' },
      description: { fr: '', en: '', de: '', es: '' },
      brand: 'NOËL PRESTIGE',
      sku: `NOEL-${defaultCat.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      gtin: '',
      priceEur: 49.90,
      priceCad: 69.90,
      stock: 25,
      availability: 'in_stock',
      images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'],
      rating: 4.9,
      reviewsCount: 15,
      isBestseller: false,
      isPromo: false,
      recipient: 'women',
      budgetTier: 'medium'
    });
    setNewImageUrl('');
    setEditProductModal({ isOpen: true, product: null, isNew: true });
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title?.fr) {
      showToast('Le titre en français est obligatoire.');
      return;
    }

    try {
      const method = editProductModal.isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productForm,
          actor: 'Admin Principal'
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(editProductModal.isNew ? 'Nouveau produit ajouté !' : 'Produit mis à jour avec succès !');
        setEditProductModal({ isOpen: false, product: null, isNew: false });
        loadAllData();
      } else {
        showToast(data.message || 'Erreur lors de la sauvegarde.');
      }
    } catch (err) {
      showToast('Erreur serveur lors de la sauvegarde du produit.');
    }
  };

  // Upload d'image produit
  const handleProductPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        const currentImages = productForm.images || [];
        setProductForm({
          ...productForm,
          images: [data.url, ...currentImages]
        });
        showToast(`Photo « ${file.name} » téléversée avec succès !`);
      }
    } catch (err) {
      showToast("Échec de l'upload de l'image.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    const currentImages = productForm.images || [];
    setProductForm({
      ...productForm,
      images: [...currentImages, newImageUrl.trim()]
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentImages = productForm.images || [];
    if (currentImages.length <= 1) {
      showToast('Un produit doit posséder au moins une image.');
      return;
    }
    setProductForm({
      ...productForm,
      images: currentImages.filter((_, idx) => idx !== indexToRemove)
    });
  };

  // ----------------------------------------------------
  // GESTION DES NOTIFICATIONS
  // ----------------------------------------------------
  const handleMarkAllNotifsRead = async () => {
    try {
      const res = await fetch('/api/admin/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_all_read' })
      });
      if (res.ok) {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setUnreadNotifsCount(0);
        showToast('Toutes les alertes sont marquées comme lues.');
      }
    } catch (err) {}
  };

  // ----------------------------------------------------
  // PRODUITS FILTRÉS & PAGINÉS
  // ----------------------------------------------------
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
      if (productAvailabilityFilter !== 'all' && p.availability !== productAvailabilityFilter) return false;
      if (productSearch) {
        const s = productSearch.toLowerCase();
        const matchesTitle = p.title.fr?.toLowerCase().includes(s) || p.title.en?.toLowerCase().includes(s);
        const matchesSku = p.sku?.toLowerCase().includes(s);
        const matchesGtin = p.gtin?.includes(s);
        if (!matchesTitle && !matchesSku && !matchesGtin) return false;
      }
      return true;
    });
  }, [products, selectedCategory, productAvailabilityFilter, productSearch]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (productPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, productPage]);

  // ----------------------------------------------------
  // COMMANDES FILTRÉES
  // ----------------------------------------------------
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
      if (orderSearch) {
        const s = orderSearch.toLowerCase();
        const matchesRef = o.orderReference.toLowerCase().includes(s);
        const matchesName = o.customer.fullName.toLowerCase().includes(s);
        const matchesEmail = o.customer.email.toLowerCase().includes(s);
        const matchesCity = o.customer.city.toLowerCase().includes(s);
        if (!matchesRef && !matchesName && !matchesEmail && !matchesCity) return false;
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Statistiques pour le haut de page
  const stats = useMemo(() => {
    const pendingOrders = orders.filter(o => o.status === 'pending_verification').length;
    const verifiedOrders = orders.filter(o => o.status === 'payment_verified').length;
    const shippingOrders = orders.filter(o => o.status === 'shipping_started').length;
    const inStockProducts = products.filter(p => p.availability === 'in_stock').length;
    const totalRevenueEur = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((acc, curr) => acc + (curr.currency === 'EUR' ? curr.total : curr.total * 0.7), 0);

    return {
      pendingOrders,
      verifiedOrders,
      shippingOrders,
      inStockProducts,
      totalRevenueEur
    };
  }, [orders, products]);

  const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#F4C542]/40 flex items-center gap-3 animate-slideUp">
          <Sparkles className="w-5 h-5 text-[#F4C542] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOPBAR ADMINISTRATION */}
      <header className="bg-[#1E293B] border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Identité */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C62828] to-[#991B1B] flex items-center justify-center text-white font-black shadow-md border border-[#F4C542]/40">
              🎄
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                  NOËL GIFT SHOP
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4C542]/20 text-[#F4C542] border border-[#F4C542]/40 uppercase">
                  Backoffice Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-light hidden sm:block">
                Gestion des commandes, paiements, expéditions & catalogue Google Merchant
              </p>
            </div>
          </div>

          {/* Outils & Notifications Topbar */}
          <div className="flex items-center gap-3">
            
            {/* Lien boutique publique */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium transition-colors border border-slate-700"
            >
              <span>Voir la boutique</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Suivi client public */}
            <Link
              href="/track"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800 text-xs font-medium transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Portail Suivi Client</span>
            </Link>

            {/* Bouton Rafraîchir */}
            <button
              onClick={loadAllData}
              title="Rafraîchir les données"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#F4C542]' : ''}`} />
            </button>

            {/* Cloche Notifications avec Badge */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C62828] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Menu déroulant des notifications */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1E293B] rounded-2xl shadow-2xl border border-slate-700 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#F4C542]" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Alertes & Notifications</span>
                    </div>
                    {unreadNotifsCount > 0 && (
                      <button
                        onClick={handleMarkAllNotifsRead}
                        className="text-[11px] text-[#F4C542] hover:underline"
                      >
                        Tout marquer comme lu
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800 text-xs">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-slate-500">Aucune notification</div>
                    ) : (
                      notifications.slice(0, 6).map(notif => (
                        <div key={notif.id} className={`p-3 transition-colors ${notif.read ? 'opacity-70' : 'bg-slate-800/50'}`}>
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-200">{notif.title}</span>
                            <span className="text-[10px] text-slate-500 flex-shrink-0">{formatDate(notif.createdAt).split(' ')[0]}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] mt-1">{notif.message}</p>
                          {notif.orderReference && (
                            <button
                              onClick={() => {
                                setOrderStatusFilter('all');
                                setOrderSearch(notif.orderReference!);
                                setActiveTab('orders');
                                setNotifDropdownOpen(false);
                              }}
                              className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#F4C542] hover:underline"
                            >
                              <span>Voir {notif.orderReference}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profil Admin */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                AD
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-white">Admin Principal</div>
                <div className="text-[10px] text-emerald-400">En ligne</div>
              </div>
            </div>

          </div>
        </div>

        {/* BARRE D'ONGLETS PRINCIPALE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-slate-800/80 py-2.5">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === 'orders'
                ? 'bg-[#C62828] text-white shadow-lg shadow-red-900/30'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Commandes & Paiements</span>
            {stats.pendingOrders > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#F4C542] text-[#242424] font-black text-[10px]">
                {stats.pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === 'products'
                ? 'bg-[#C62828] text-white shadow-lg shadow-red-900/30'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catalogue Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === 'shipping'
                ? 'bg-[#C62828] text-white shadow-lg shadow-red-900/30'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Expéditions & Logistique</span>
            {stats.verifiedOrders > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px]">
                {stats.verifiedOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 ${
              activeTab === 'audit'
                ? 'bg-[#C62828] text-white shadow-lg shadow-red-900/30'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Traçabilité & Logs ({auditLogs.length})</span>
          </button>
        </div>
      </header>

      {/* BANDEAU INDICATEURS CLÉS (KPIS) */}
      <section className="bg-slate-900/60 border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Paiements à vérifier</div>
              <div className="text-xl font-black text-amber-400">{stats.pendingOrders}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Prêts pour expédition</div>
              <div className="text-xl font-black text-blue-400">{stats.verifiedOrders}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Colis en transit</div>
              <div className="text-xl font-black text-emerald-400">{stats.shippingOrders}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1E293B] border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4C542]/10 text-[#F4C542] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400">Produits en stock</div>
              <div className="text-xl font-black text-[#F4C542]">{stats.inStockProducts} / {products.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU PRINCIPAL SELON L'ONGLET ACTIF */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* ============================================================== */}
        {/* ONGLET 1 : COMMANDES & PAIEMENTS */}
        {/* ============================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Barre d'outils filtres commandes */}
            <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
              
              {/* Statuts filter pills */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'pending_verification', label: 'À vérifier' },
                  { id: 'payment_verified', label: 'Paiement validé' },
                  { id: 'shipping_started', label: 'En livraison' },
                  { id: 'delivered', label: 'Livrées' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setOrderStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      orderStatusFilter === tab.id
                        ? 'bg-slate-700 text-white border border-slate-600'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Recherche */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Réf., nom client, email..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F4C542]"
                />
              </div>

            </div>

            {/* Tableau des commandes */}
            <div className="bg-[#1E293B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Réf. Commande</th>
                      <th className="py-3.5 px-4 font-bold">Date</th>
                      <th className="py-3.5 px-4 font-bold">Client</th>
                      <th className="py-3.5 px-4 font-bold">Total</th>
                      <th className="py-3.5 px-4 font-bold">Règlement</th>
                      <th className="py-3.5 px-4 font-bold text-center">Preuve de Paiement</th>
                      <th className="py-3.5 px-4 font-bold">Statut</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions de Traitement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500">
                          Aucune commande trouvée selon vos filtres.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                          
                          {/* Réf */}
                          <td className="py-4 px-4 font-mono font-bold text-white">
                            <button
                              onClick={() => setOrderDetailsModal({ isOpen: true, order })}
                              className="hover:text-[#F4C542] hover:underline flex items-center gap-1.5"
                            >
                              <span>{order.orderReference}</span>
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-4 text-slate-400 whitespace-nowrap">
                            {formatDate(order.createdAt)}
                          </td>

                          {/* Client */}
                          <td className="py-4 px-4">
                            <div className="font-semibold text-slate-200">{order.customer.fullName}</div>
                            <div className="text-[11px] text-slate-400">{order.customer.city} ({order.customer.country})</div>
                          </td>

                          {/* Total */}
                          <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                            {order.total.toFixed(2)} {order.currency}
                          </td>

                          {/* Mode de règlement */}
                          <td className="py-4 px-4">
                            {order.paymentMethod === 'bank_transfer' && (
                              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold">
                                Virement SEPA
                              </span>
                            )}
                            {order.paymentMethod === 'gift_card' && (
                              <span className="px-2 py-0.5 rounded bg-red-950 text-[#F4C542] border border-red-800 text-[10px] font-semibold">
                                Carte Cadeau
                              </span>
                            )}
                            {order.paymentMethod === 'credit_card' && (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
                                Carte Bancaire
                              </span>
                            )}
                          </td>

                          {/* Preuve de paiement avec zoom modal */}
                          <td className="py-4 px-4 text-center">
                            {order.paymentProofUrl ? (
                              <button
                                onClick={() => setPreviewProofModal({ isOpen: true, order })}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 font-semibold text-[11px] transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Voir le justificatif</span>
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-500 italic">Non requis / Aucun</span>
                            )}
                          </td>

                          {/* Statut */}
                          <td className="py-4 px-4">
                            {order.status === 'pending_verification' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/70 text-[10px] font-bold">
                                <Clock className="w-3 h-3" />
                                À vérifier
                              </span>
                            )}
                            {order.status === 'payment_verified' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-700/70 text-[10px] font-bold">
                                <Check className="w-3 h-3" />
                                Paiement validé
                              </span>
                            )}
                            {order.status === 'shipping_started' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/70 text-[10px] font-bold">
                                <Truck className="w-3 h-3" />
                                En livraison
                              </span>
                            )}
                            {order.status === 'delivered' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-950 text-green-300 border border-green-700/70 text-[10px] font-bold">
                                <CheckCircle className="w-3 h-3" />
                                Livré
                              </span>
                            )}
                          </td>

                          {/* Boutons d'action workflow */}
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {order.status === 'pending_verification' && (
                                <button
                                  onClick={() => handleVerifyPayment(order)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors shadow flex items-center gap-1"
                                >
                                  <Check className="w-3 h-3" />
                                  <span>Valider Paiement</span>
                                </button>
                              )}

                              {order.status === 'payment_verified' && (
                                <button
                                  onClick={() => openShippingModal(order)}
                                  className="px-2.5 py-1 rounded-lg bg-[#C62828] hover:bg-[#991B1B] text-white font-bold text-[11px] transition-colors shadow flex items-center gap-1"
                                >
                                  <Truck className="w-3 h-3" />
                                  <span>Lancer Livraison</span>
                                </button>
                              )}

                              {order.status === 'shipping_started' && (
                                <button
                                  onClick={() => handleMarkDelivered(order)}
                                  className="px-2.5 py-1 rounded-lg bg-green-700 hover:bg-green-600 text-white font-bold text-[11px] transition-colors shadow flex items-center gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Marquer Livré</span>
                                </button>
                              )}

                              <button
                                onClick={() => setOrderDetailsModal({ isOpen: true, order })}
                                title="Voir détails"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* ONGLET 2 : CATALOGUE PRODUITS PAR CATÉGORIE (NON ENCOMBRANT) */}
        {/* ============================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Barre de navigation des Catégories (Pills épurés) */}
            <div className="bg-[#1E293B] p-4 rounded-2xl border border-slate-800 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#F4C542]" />
                    <span>Filtrer par Catégorie de Noël</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sélectionnez une catégorie pour inspecter et modifier les fiches et visuels sans encombrement.
                  </p>
                </div>

                <button
                  onClick={openNewProductModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C62828] to-[#991B1B] text-white font-bold text-xs hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center gap-2 self-start sm:self-auto border border-[#F4C542]/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un produit</span>
                </button>
              </div>

              {/* Pills Catégories */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedCategory('all'); setProductPage(1); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[#F4C542] text-[#242424] shadow'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                  }`}
                >
                  Toutes ({products.length})
                </button>

                {CATEGORIES.map(cat => {
                  const count = products.filter(p => p.categorySlug === cat.slug).length;
                  const isSelected = selectedCategory === cat.slug;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.slug); setProductPage(1); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#F4C542] text-[#242424] shadow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      <span>{cat.name.fr}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-[#242424] text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sous-filtres : Recherche & Disponibilité */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => { setProductSearch(e.target.value); setProductPage(1); }}
                    placeholder="Recherche par titre, SKU, EAN-13..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F4C542]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs text-slate-400">Disponibilité :</span>
                  <select
                    value={productAvailabilityFilter}
                    onChange={(e) => { setProductAvailabilityFilter(e.target.value); setProductPage(1); }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                  >
                    <option value="all">Tous les états</option>
                    <option value="in_stock">Disponible (En stock)</option>
                    <option value="out_of_stock">Vendu / Rupture</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Grille compacte / Tableau Produit épuré */}
            <div className="bg-[#1E293B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-bold">Visuel</th>
                      <th className="py-3 px-4 font-bold">Produit & Réf. GMC</th>
                      <th className="py-3 px-4 font-bold">Catégorie</th>
                      <th className="py-3 px-4 font-bold">Prix (EUR / CAD)</th>
                      <th className="py-3 px-4 font-bold">Stock</th>
                      <th className="py-3 px-4 font-bold">Disponibilité</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {paginatedProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          Aucun produit trouvé dans cette sélection.
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map(product => {
                        const isAvailable = product.availability === 'in_stock';
                        return (
                          <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                            
                            {/* Miniature photo */}
                            <td className="py-3 px-4">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                                <img
                                  src={product.images[0] || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80'}
                                  alt={product.title.fr}
                                  className="w-full h-full object-cover"
                                />
                                {product.images.length > 1 && (
                                  <span className="absolute bottom-0 right-0 bg-black/70 text-[9px] font-bold text-white px-1 rounded-tl">
                                    +{product.images.length - 1}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Titre & SKU */}
                            <td className="py-3 px-4 max-w-xs">
                              <div className="font-semibold text-slate-200 line-clamp-1">{product.title.fr}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                                <span>SKU: {product.sku}</span>
                                <span>•</span>
                                <span>EAN: {product.gtin}</span>
                              </div>
                            </td>

                            {/* Catégorie */}
                            <td className="py-3 px-4 text-slate-300 capitalize">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-medium border border-slate-700">
                                {product.categorySlug}
                              </span>
                            </td>

                            {/* Prix */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="font-bold text-white">{product.priceEur.toFixed(2)} €</div>
                              <div className="text-[10px] text-slate-400">{product.priceCad.toFixed(2)} $ CAD</div>
                            </td>

                            {/* Stock */}
                            <td className="py-3 px-4">
                              <span className={`font-mono font-bold ${product.stock <= 5 ? 'text-amber-400' : 'text-slate-300'}`}>
                                {product.stock} pcs
                              </span>
                            </td>

                            {/* Disponibilité (Bouton bascule 1 clic Vendu / Disponible) */}
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleToggleProductAvailability(product)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                                  isAvailable
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80 hover:bg-emerald-900'
                                    : 'bg-red-950 text-red-300 border border-red-700/80 hover:bg-red-900'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                <span>{isAvailable ? 'Disponible' : 'Vendu / Rupture'}</span>
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openEditProductModal(product)}
                                  className="p-1.5 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 transition-colors"
                                  title="Modifier les infos & photos"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleDeleteProduct(product)}
                                  className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 transition-colors"
                                  title="Supprimer du catalogue"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    Affichage {((productPage - 1) * productsPerPage) + 1} à {Math.min(productPage * productsPerPage, filteredProducts.length)} sur {filteredProducts.length} produits
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={productPage === 1}
                      onClick={() => setProductPage(p => Math.max(1, p - 1))}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    >
                      Précédent
                    </button>
                    <span className="font-mono px-2 font-bold text-white">
                      {productPage} / {totalPages}
                    </span>
                    <button
                      disabled={productPage === totalPages}
                      onClick={() => setProductPage(p => Math.min(totalPages, p + 1))}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* ONGLET 3 : EXPÉDITIONS & LOGISTIQUE */}
        {/* ============================================================== */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            
            <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>Centre des Expéditions & Suivi des Colis</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Dès qu'un virement bancaire ou une carte cadeau est validé, vous pouvez déclencher manuellement la livraison ici. Cela met à jour le statut en direct pour l'acheteur sur sa page de suivi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Commandes prêtes à expédier */}
              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Paiements validés – Prêts pour envoi ({orders.filter(o => o.status === 'payment_verified').length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {orders.filter(o => o.status === 'payment_verified').length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      Toutes les commandes validées ont déjà été remises aux transporteurs !
                    </div>
                  ) : (
                    orders.filter(o => o.status === 'payment_verified').map(order => (
                      <div key={order.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white">{order.orderReference}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900 text-blue-300">{order.customer.country}</span>
                          </div>
                          <div className="text-xs text-slate-300 mt-1 font-semibold">{order.customer.fullName}</div>
                          <div className="text-[11px] text-slate-400">{order.customer.address}, {order.customer.postalCode} {order.customer.city}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{order.items.length} article(s) • Total: {order.total.toFixed(2)} {order.currency}</div>
                        </div>

                        <button
                          onClick={() => openShippingModal(order)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 flex-shrink-0"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Lancer la livraison</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Colis actuellement en transit */}
              <div className="bg-[#1E293B] p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    En cours de livraison ({orders.filter(o => o.status === 'shipping_started').length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {orders.filter(o => o.status === 'shipping_started').length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      Aucun colis en transit actuellement.
                    </div>
                  ) : (
                    orders.filter(o => o.status === 'shipping_started').map(order => (
                      <div key={order.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white">{order.orderReference}</span>
                            <span className="text-[11px] text-emerald-400 font-bold">{order.shippingCarrier}</span>
                          </div>
                          <div className="text-xs text-slate-300 mt-1">N° Suivi : <strong className="font-mono text-white">{order.trackingNumber}</strong></div>
                          <div className="text-[11px] text-slate-400">Expédié le {formatDate(order.shippingStartedAt)}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Destinataire : {order.customer.fullName} ({order.customer.city})</div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          {order.trackingUrl && (
                            <a
                              href={order.trackingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Suivi transporteur"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleMarkDelivered(order)}
                            className="px-3 py-1.5 rounded-xl bg-green-700 hover:bg-green-600 text-white font-bold text-xs shadow flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Colis Livré</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* ONGLET 4 : TRAÇABILITÉ & JOURNAL D'AUDIT */}
        {/* ============================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            
            <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-[#F4C542]" />
                <span>Journal d'Audit & Traçabilité Complète</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Historique inaltérable de chaque modification effectuée sur la boutique : validations de paiements, expéditions déclenchées, éditions de fiches produits et ajustements de stock.
              </p>
            </div>

            <div className="bg-[#1E293B] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Date & Heure</th>
                      <th className="py-3.5 px-4 font-bold">Opérateur</th>
                      <th className="py-3.5 px-4 font-bold">Action</th>
                      <th className="py-3.5 px-4 font-bold">Cible / Réf.</th>
                      <th className="py-3.5 px-4 font-bold">Détails de l'opération</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {auditLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          Aucun journal d'audit enregistré pour l'instant.
                        </td>
                      </tr>
                    ) : (
                      auditLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 text-slate-400 font-mono whitespace-nowrap">
                            {formatDate(log.timestamp)}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-200">
                            {log.actor}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              log.action === 'VERIFY_PAYMENT' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                              log.action === 'START_SHIPPING' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                              log.action === 'MARK_DELIVERED' ? 'bg-green-950 text-green-300 border border-green-800' :
                              log.action === 'CREATE_PRODUCT' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                              log.action === 'DELETE_PRODUCT' ? 'bg-red-950 text-red-300 border border-red-800' :
                              'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white max-w-xs truncate">
                            {log.targetReference}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {log.details}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ============================================================== */}
      {/* MODAL 1 : EXAMEN & ZOOM PREUVE DE PAIEMENT */}
      {/* ============================================================== */}
      {previewProofModal.isOpen && previewProofModal.order && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleUp flex flex-col max-h-[90vh]">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-400" />
                  <span>Justificatif de Paiement – {previewProofModal.order.orderReference}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Client : <strong>{previewProofModal.order.customer.fullName}</strong> • Montant : <strong>{previewProofModal.order.total.toFixed(2)} {previewProofModal.order.currency}</strong>
                </p>
              </div>
              <button
                onClick={() => setPreviewProofModal({ isOpen: false, order: null })}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenu visuel */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-950/50">
              <div className="relative group max-w-full">
                <img
                  src={previewProofModal.order.paymentProofUrl}
                  alt="Preuve de paiement"
                  className="rounded-xl border border-slate-700 max-h-[50vh] object-contain shadow-2xl"
                />
              </div>

              {previewProofModal.order.paymentProofName && (
                <div className="mt-3 text-xs text-slate-400 font-mono">
                  Nom du fichier : {previewProofModal.order.paymentProofName}
                </div>
              )}

              {previewProofModal.order.giftCardCode && (
                <div className="mt-3 px-4 py-2 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-300 font-mono font-bold text-xs">
                  Code Carte Cadeau : {previewProofModal.order.giftCardCode}
                </div>
              )}
            </div>

            {/* Barre d'action basse */}
            <div className="p-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80">
              <a
                href={previewProofModal.order.paymentProofUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger l'original</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPreviewProofModal({ isOpen: false, order: null })}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-colors w-full sm:w-auto"
                >
                  Fermer
                </button>

                {previewProofModal.order.status === 'pending_verification' && (
                  <button
                    type="button"
                    onClick={() => handleVerifyPayment(previewProofModal.order!)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors shadow flex items-center justify-center gap-1.5 w-full sm:w-auto"
                  >
                    <Check className="w-4 h-4" />
                    <span>Valider le Paiement</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2 : DÉCLENCHEMENT EXPÉDITION (LANCER LA LIVRAISON) */}
      {/* ============================================================== */}
      {shippingModal.isOpen && shippingModal.order && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 w-full max-w-lg overflow-hidden shadow-2xl animate-scaleUp">
            
            <form onSubmit={handleLaunchShipping}>
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Truck className="w-5 h-5 text-emerald-400" />
                    <span>Lancer la Livraison du Colis</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Commande <strong>{shippingModal.order.orderReference}</strong> ({shippingModal.order.customer.fullName})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShippingModal({ isOpen: false, order: null })}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Transporteur Logistique
                  </label>
                  <select
                    value={shippingCarrier}
                    onChange={(e) => setShippingCarrier(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-[#F4C542]"
                  >
                    <option value="Colissimo Suivi">Colissimo Suivi (La Poste)</option>
                    <option value="Chronopost Express">Chronopost Express 24h</option>
                    <option value="DHL Express Worldwide">DHL Express Worldwide</option>
                    <option value="UPS Standard">UPS Standard International</option>
                    <option value="Mondial Relay">Mondial Relay</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Numéro de Suivi Colis (Tracking ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Ex: CC982348192FR ou 6A28901847192"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:ring-1 focus:ring-[#F4C542]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Le lien officiel de tracking sera généré automatiquement pour le client.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Notes d'expédition ou instructions
                  </label>
                  <textarea
                    rows={2}
                    value={shippingNotes}
                    onChange={(e) => setShippingNotes(e.target.value)}
                    placeholder="Ex: Remis au centre de tri postal..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-[11px]">
                  ✓ La commande passera immédiatement au statut <strong>« Livraison lancée »</strong> et sera visible en temps réel sur la page de suivi client.
                </div>
              </div>

              <div className="p-5 border-t border-slate-800 flex items-center justify-end gap-2 bg-slate-900/60">
                <button
                  type="button"
                  onClick={() => setShippingModal({ isOpen: false, order: null })}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C62828] hover:bg-[#991B1B] text-xs font-bold text-white transition-colors shadow flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Confirmer le départ de livraison</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3 : ÉDITION PRODUIT & GESTION DES PHOTOS PAR CATÉGORIE */}
      {/* ============================================================== */}
      {editProductModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 w-full max-w-3xl overflow-hidden shadow-2xl animate-scaleUp flex flex-col max-h-[92vh]">
            
            <form onSubmit={handleSaveProduct} className="flex flex-col h-full">
              
              {/* En-tête */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-[#F4C542]" />
                    <span>{editProductModal.isNew ? 'Ajouter un nouveau produit au catalogue' : `Modifier la fiche : ${productForm.sku}`}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Toutes les modifications sont synchronisées avec le flux Google Merchant Center.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditProductModal({ isOpen: false, product: null, isNew: false })}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenu formulaire */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
                
                {/* 1. INFORMATIONS GÉNÉRALES */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C542] border-b border-slate-800 pb-1">
                    1. Informations Générales & Catégorie
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Titre du Produit (FR) *</label>
                      <input
                        type="text"
                        required
                        value={productForm.title?.fr || ''}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          title: { ...productForm.title, fr: e.target.value } as any
                        })}
                        placeholder="Ex: Pull Jacquard Flocon Noël en Laine Mérinos"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-[#F4C542]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Catégorie de Noël</label>
                      <select
                        value={productForm.categorySlug || 'mode'}
                        onChange={(e) => setProductForm({ ...productForm, categorySlug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.slug}>{cat.name.fr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Marque</label>
                      <input
                        type="text"
                        value={productForm.brand || 'NOËL PRESTIGE'}
                        onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">SKU (ID Marchand)</label>
                      <input
                        type="text"
                        value={productForm.sku || ''}
                        onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Code-barres EAN-13 (GTIN)</label>
                      <input
                        type="text"
                        value={productForm.gtin || ''}
                        onChange={(e) => setProductForm({ ...productForm, gtin: e.target.value })}
                        placeholder="Ex: 3760123456789"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Description (FR)</label>
                    <textarea
                      rows={3}
                      value={productForm.description?.fr || ''}
                      onChange={(e) => setProductForm({
                        ...productForm,
                        description: { ...productForm.description, fr: e.target.value } as any
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. PRIX & GESTION DU STOCK */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C542] border-b border-slate-800 pb-1">
                    2. Tarifs & Disponibilité (Vendu / En Stock)
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Prix EUR (€) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={productForm.priceEur ?? 49.90}
                        onChange={(e) => setProductForm({ ...productForm, priceEur: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Prix Barré EUR (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={productForm.oldPriceEur || ''}
                        onChange={(e) => setProductForm({ ...productForm, oldPriceEur: parseFloat(e.target.value) || undefined })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Prix CAD ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={productForm.priceCad ?? 69.90}
                        onChange={(e) => setProductForm({ ...productForm, priceCad: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Stock (unités)</label>
                      <input
                        type="number"
                        value={productForm.stock ?? 25}
                        onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <span className="font-semibold text-slate-300">État du produit :</span>
                    <button
                      type="button"
                      onClick={() => setProductForm({
                        ...productForm,
                        availability: productForm.availability === 'in_stock' ? 'out_of_stock' : 'in_stock'
                      })}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 ${
                        productForm.availability === 'in_stock'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white" />
                      <span>{productForm.availability === 'in_stock' ? 'Disponible (En vente)' : 'Marqué comme VENDU / Rupture'}</span>
                    </button>
                  </div>
                </div>

                {/* 3. GALERIE PHOTOS DU PRODUIT */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4C542]">
                      3. Galerie Photos ({productForm.images?.length || 0})
                    </h4>
                    
                    {/* Bouton Upload Photo directe */}
                    <label className="cursor-pointer px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#F4C542]" />
                      <span>{isUploadingPhoto ? 'Téléversement...' : 'Téléverser photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductPhotoUpload}
                        className="hidden"
                        disabled={isUploadingPhoto}
                      />
                    </label>
                  </div>

                  {/* Liste des images existantes */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {(productForm.images || []).map((imgUrl, index) => (
                      <div key={index} className="relative group rounded-xl overflow-hidden bg-slate-800 border border-slate-700 aspect-square">
                        <img
                          src={imgUrl}
                          alt={`Visuel ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                          title="Supprimer cette image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-1 left-1 bg-black/70 text-[9px] font-bold text-[#F4C542] px-1 rounded">
                            Principale
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Ajout d'image par URL externe */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Coller l'URL d'une image (ex: Unsplash HD, CDN)..."
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
                    >
                      Ajouter URL
                    </button>
                  </div>
                </div>

              </div>

              {/* Pied de formulaire */}
              <div className="p-5 border-t border-slate-800 flex items-center justify-end gap-2 bg-slate-900/60">
                <button
                  type="button"
                  onClick={() => setEditProductModal({ isOpen: false, product: null, isNew: false })}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#C62828] to-[#991B1B] hover:from-red-600 hover:to-red-700 text-xs font-bold text-white transition-all shadow flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer les modifications</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4 : DÉTAIL COMPLET COMMANDE */}
      {/* ============================================================== */}
      {orderDetailsModal.isOpen && orderDetailsModal.order && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 w-full max-w-2xl overflow-hidden shadow-2xl animate-scaleUp flex flex-col max-h-[90vh]">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">
                  Détail de la commande <span className="font-mono text-[#F4C542]">{orderDetailsModal.order.orderReference}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Enregistrée le {formatDate(orderDetailsModal.order.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setOrderDetailsModal({ isOpen: false, order: null })}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              
              {/* Client & Adresse */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-1">Client</div>
                  <div className="font-bold text-white text-sm">{orderDetailsModal.order.customer.fullName}</div>
                  <div className="text-slate-300 mt-0.5">✉️ {orderDetailsModal.order.customer.email}</div>
                  <div className="text-slate-300">📞 {orderDetailsModal.order.customer.phone}</div>
                </div>

                <div>
                  <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-1">Livraison</div>
                  <div className="text-slate-200">{orderDetailsModal.order.customer.address}</div>
                  <div className="text-slate-200">{orderDetailsModal.order.customer.postalCode} {orderDetailsModal.order.customer.city}</div>
                  <div className="text-slate-400 font-bold">{orderDetailsModal.order.customer.country}</div>
                </div>
              </div>

              {/* Message cadeau si existant */}
              {orderDetailsModal.order.customer.giftNote && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-amber-200">
                  <div className="font-bold uppercase tracking-wider text-[10px] mb-1">Mot doux d'accompagnement :</div>
                  <div className="italic">« {orderDetailsModal.order.customer.giftNote} »</div>
                </div>
              )}

              {/* Articles commandés */}
              <div>
                <div className="font-bold uppercase tracking-wider text-slate-400 text-[10px] mb-2">Articles commandés</div>
                <div className="divide-y divide-slate-800 border-y border-slate-800">
                  {orderDetailsModal.order.items.map((it, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt={it.name} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{it.name}</div>
                          <div className="text-[10px] text-slate-400">Qté : {it.quantity} {it.size ? `• Taille: ${it.size}` : ''}</div>
                        </div>
                      </div>
                      <div className="font-bold text-white font-mono">
                        {(it.price * it.quantity).toFixed(2)} {orderDetailsModal.order?.currency || 'EUR'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-sm font-bold text-white pt-2">
                <span>Total de la commande :</span>
                <span className="text-lg text-[#F4C542]">
                  {orderDetailsModal.order?.total.toFixed(2)} {orderDetailsModal.order?.currency || 'EUR'}
                </span>
              </div>

            </div>

            <div className="p-5 border-t border-slate-800 flex items-center justify-end bg-slate-900/60">
              <button
                onClick={() => setOrderDetailsModal({ isOpen: false, order: null })}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
