'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Package, 
  CheckCircle, 
  Truck, 
  Clock, 
  CreditCard, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  Gift,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { AdminOrder } from '@/types/admin';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [orderReference, setOrderReference] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<AdminOrder | null>(null);

  const fetchOrder = async (ref: string) => {
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/orders?ref=${encodeURIComponent(ref.trim())}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError(data.message || 'Aucune commande trouvée avec cette référence.');
        setOrder(null);
      }
    } catch (err) {
      setError('Impossible de joindre le serveur de suivi. Veuillez réessayer.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchOrder(initialRef);
    }
  }, [initialRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderReference);
  };

  const getStepStatus = (stepIndex: number) => {
    if (!order) return 'upcoming';
    if (order.status === 'cancelled') return 'cancelled';

    const statusMap: Record<string, number> = {
      pending_verification: 1,
      payment_verified: 2,
      shipping_started: 3,
      delivered: 4
    };

    const currentLevel = statusMap[order.status] || 1;
    if (currentLevel > stepIndex) return 'completed';
    if (currentLevel === stepIndex) return 'current';
    return 'upcoming';
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
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
    <div className="max-w-4xl mx-auto">
      {/* Titre & Bannière */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C62828]/10 text-[#C62828] text-xs font-bold uppercase tracking-wider mb-3">
          <Truck className="w-4 h-4" />
          Suivi en temps réel
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#242424] font-heading">
          Suivi de votre Commande de Noël
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
          Consultez à tout moment la validation de votre paiement, la préparation de vos colis et le départ en livraison avec votre numéro de suivi officiel.
        </p>
      </div>

      {/* Formulaire de recherche de commande */}
      <div className="bg-white rounded-2xl shadow-md border border-[#F1ECE1] p-6 sm:p-8 mb-10">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderReference}
              onChange={(e) => setOrderReference(e.target.value)}
              placeholder="Ex: NLG-2026-8942 ou NLG-2026-7319"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C62828] focus:border-transparent uppercase placeholder:normal-case"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3.5 rounded-xl bg-[#C62828] text-white font-bold text-sm hover:bg-[#991B1B] shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Recherche...</span>
              </>
            ) : (
              <>
                <span>Suivre mon colis</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Raccourcis commandes démo */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Références récentes :</span>
          <button
            type="button"
            onClick={() => { setOrderReference("NLG-2026-8942"); fetchOrder("NLG-2026-8942"); }}
            className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 font-mono text-gray-800 transition-colors"
          >
            NLG-2026-8942 (Vérifiée)
          </button>
          <button
            type="button"
            onClick={() => { setOrderReference("NLG-2026-6401"); fetchOrder("NLG-2026-6401"); }}
            className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 font-mono transition-colors"
          >
            NLG-2026-6401 (En livraison)
          </button>
          <button
            type="button"
            onClick={() => { setOrderReference("NLG-2026-7319"); fetchOrder("NLG-2026-7319"); }}
            className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-900 font-mono transition-colors"
          >
            NLG-2026-7319 (En attente)
          </button>
        </div>
      </div>

      {/* Détail et Progression de la Commande */}
      {order && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Carte En-tête Statut */}
          <div className="bg-white rounded-2xl shadow-md border border-[#F1ECE1] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Référence</span>
                  <span className="font-mono font-bold text-lg text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                    {order.orderReference}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Enregistrée le {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {order.status === 'pending_verification' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Paiement en cours de vérification
                  </span>
                )}
                {order.status === 'payment_verified' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Paiement validé – Préparation en atelier
                  </span>
                )}
                {order.status === 'shipping_started' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    Livraison lancée – En transit
                  </span>
                )}
                {order.status === 'delivered' && (
                  <span className="px-3.5 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Colis Livré
                  </span>
                )}
              </div>
            </div>

            {/* Barre d'expédition active (si lancée) */}
            {order.status === 'shipping_started' && (
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Votre colis a été remis au transporteur
                    </div>
                    <div className="text-sm font-semibold text-gray-900 mt-0.5">
                      {order.shippingCarrier || 'Transporteur Express'} • N° {order.trackingNumber || 'En cours de transmission'}
                    </div>
                  </div>
                </div>

                {order.trackingUrl && (
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>Suivre sur le site transporteur</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* TIMELINE VISUELLE */}
            <div className="mt-8 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
                Étapes d'acheminement de votre commande
              </h3>

              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                  
                  {/* Étape 1 */}
                  <div className="flex md:flex-col items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      getStepStatus(1) === 'completed' || getStepStatus(1) === 'current'
                        ? 'bg-[#14532D] text-white shadow-md'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">1. Commande reçue</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {formatDate(order.createdAt)}
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-1 font-medium">
                        Articles réservés
                      </div>
                    </div>
                  </div>

                  {/* Étape 2 */}
                  <div className="flex md:flex-col items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      getStepStatus(2) === 'completed' 
                        ? 'bg-[#14532D] text-white shadow-md'
                        : getStepStatus(2) === 'current'
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">2. Paiement vérifié</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {order.paymentVerifiedAt ? formatDate(order.paymentVerifiedAt) : 'En attente de rapprochement bancaire'}
                      </div>
                      {order.paymentProofName && (
                        <div className="text-[10px] text-gray-400 mt-1 italic">
                          Preuve: {order.paymentProofName}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Étape 3 */}
                  <div className="flex md:flex-col items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      getStepStatus(3) === 'completed'
                        ? 'bg-[#14532D] text-white shadow-md'
                        : getStepStatus(3) === 'current'
                        ? 'bg-emerald-600 text-white shadow-md animate-bounce'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">3. Livraison lancée</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {order.shippingStartedAt ? formatDate(order.shippingStartedAt) : 'Après validation comptable'}
                      </div>
                      {order.shippingCarrier && (
                        <div className="text-[11px] text-emerald-700 mt-1 font-bold">
                          {order.shippingCarrier}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Étape 4 */}
                  <div className="flex md:flex-col items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                      getStepStatus(4) === 'completed'
                        ? 'bg-[#14532D] text-white shadow-md'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">4. Colis livré</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {order.deliveredAt ? formatDate(order.deliveredAt) : 'Estimation : 48h ouvrées'}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        Remis en mains propres
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Détails Récapitulatifs (Articles & Livraison) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Articles commandés */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-md border border-[#F1ECE1] p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C62828]" />
                Articles de la commande ({order.items.length})
              </h3>

              <div className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-3">
                        <span>Quantité : <strong>{item.quantity}</strong></span>
                        {item.size && <span>Taille : <strong>{item.size}</strong></span>}
                        {item.color && <span>Couleur : <strong>{item.color}</strong></span>}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-900 text-right">
                      {(item.price * item.quantity).toFixed(2)} {order.currency}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-bold text-gray-900">
                <span>Montant Total Réglé :</span>
                <span className="text-lg text-[#C62828] font-extrabold">
                  {order.total.toFixed(2)} {order.currency}
                </span>
              </div>
            </div>

            {/* Coordonnées & Adresse */}
            <div className="bg-white rounded-2xl shadow-md border border-[#F1ECE1] p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#14532D]" />
                  Adresse de livraison
                </h3>

                <div className="text-xs text-gray-700 space-y-1.5">
                  <p className="font-bold text-sm text-gray-900">{order.customer.fullName}</p>
                  <p>{order.customer.address}</p>
                  <p>{order.customer.postalCode} {order.customer.city}</p>
                  <p className="font-semibold text-gray-600">{order.customer.country}</p>
                  <p className="text-gray-500 pt-1">📞 {order.customer.phone}</p>
                  <p className="text-gray-500">✉️ {order.customer.email}</p>
                </div>

                {order.customer.giftNote && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
                    <div className="font-bold flex items-center gap-1 mb-1">
                      <Gift className="w-3.5 h-3.5 text-amber-600" />
                      Mot doux personnalisé :
                    </div>
                    <p className="italic">« {order.customer.giftNote} »</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <p className="text-[11px] text-gray-500 mb-2">Une question sur votre livraison ?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C62828] hover:underline"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Contacter notre conciergerie de Noël
                </Link>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="w-8 h-8 border-4 border-[#C62828] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Chargement du portail de suivi...</p>
        </div>
      }>
        <TrackingContent />
      </Suspense>
    </div>
  );
}
