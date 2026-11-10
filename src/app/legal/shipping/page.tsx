'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Truck, Globe, Clock, PackageCheck, AlertCircle } from 'lucide-react';

export default function ShippingPolicyPage() {
  const { t } = useShop();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane */}
        <nav className="flex text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#242424] font-semibold">Politique d'Expédition et de Livraison</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F1ECE1] shadow-sm space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#14532D] flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#14532D]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider">Conformité Google Merchant Center</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
                Politique de Livraison & Délais
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Pour la saison de <strong>Noël 2026</strong>, nous assurons des livraisons rapides, fiables et suivies en <strong>France, au Canada, en Allemagne et en Espagne</strong>.
          </p>

          <hr className="border-[#F1ECE1]" />

          {/* Tableau Récapitulatif Officiel des Délais et Tarifs */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#242424] font-heading mb-3">
              Tableau officiel des tarifs et délais par pays
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-[#FFFDF8] border-b border-gray-200 font-bold text-[#242424] uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Pays de destination</th>
                    <th className="p-3">Délai de préparation</th>
                    <th className="p-3">Délai de transit</th>
                    <th className="p-3">Frais de port standard</th>
                    <th className="p-3 text-green-700">Livraison Offerte dès</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold flex items-center gap-1.5">
                      <span>🇫🇷</span> France Métropolitaine
                    </td>
                    <td className="p-3">24h ouvrées</td>
                    <td className="p-3">24h à 48h (Colissimo / Chronopost)</td>
                    <td className="p-3 font-semibold">4,90 €</td>
                    <td className="p-3 font-bold text-green-700">50,00 €</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold flex items-center gap-1.5">
                      <span>🇩🇪</span> Deutschland (Allemagne)
                    </td>
                    <td className="p-3">24h ouvrées</td>
                    <td className="p-3">48h à 72h (DHL Express)</td>
                    <td className="p-3 font-semibold">4,90 €</td>
                    <td className="p-3 font-bold text-green-700">50,00 €</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold flex items-center gap-1.5">
                      <span>🇪🇸</span> España (Espagne)
                    </td>
                    <td className="p-3">24h ouvrées</td>
                    <td className="p-3">48h à 72h (SEUR / Correos)</td>
                    <td className="p-3 font-semibold">4,90 €</td>
                    <td className="p-3 font-bold text-green-700">50,00 €</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3 font-bold flex items-center gap-1.5">
                      <span>🇨🇦</span> Canada (Toutes provinces)
                    </td>
                    <td className="p-3">24h ouvrées</td>
                    <td className="p-3">3 à 5 jours ouvrés (Postes Canada / FedEx)</td>
                    <td className="p-3 font-semibold">9,90 $ CAD</td>
                    <td className="p-3 font-bold text-green-700">70,00 $ CAD</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Garantie Noël */}
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#C62828] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-red-900 leading-relaxed">
              <strong className="block text-sm font-bold text-[#C62828] mb-0.5">Garantie de livraison avant Noël 2026 :</strong>
              Toutes les commandes passées avant le <strong>22 décembre 2026 à 18h00</strong> (heure de Paris / Montréal) sont garanties d'être livrées avant le réveillon du 24 décembre.
            </div>
          </div>

          {/* Suivi de colis */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-[#242424] font-heading">
              Suivi en temps réel de votre commande
            </h2>
            <p>
              Dès l'expédition de vos colis depuis notre entrepôt, vous recevez un e-mail et une notification WhatsApp contenant votre lien de suivi de livraison en direct. Vous pouvez suivre l'acheminement de votre hotte de Noël étape par étape.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
