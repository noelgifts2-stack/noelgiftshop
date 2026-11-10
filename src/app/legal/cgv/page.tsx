'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { FileText, ShieldCheck } from 'lucide-react';

export default function CGVPage() {
  const { t } = useShop();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#242424] font-semibold">Conditions Générales de Vente</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F1ECE1] shadow-sm space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#C62828] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider">Cadre Légal & Vente en Ligne</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
                Conditions Générales de Vente (CGV)
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Dernière mise à jour : <strong>Novembre 2026</strong>. Les présentes Conditions Générales de Vente régissent l'ensemble des transactions effectuées sur le site <strong>NOËL GIFT SHOP</strong> pour la France, le Canada, l'Allemagne et l'Espagne.
          </p>

          <hr className="border-[#F1ECE1]" />

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base font-bold text-[#242424] font-heading">Article 1 : Objet & Champ d'application</h2>
            <p>
              Le site <strong>NOËL GIFT SHOP</strong> propose la vente au détail d'articles festifs, de coffrets cadeaux, de mode, de produits high-tech, de montres et de jouets. Toute commande passée implique l'adhésion entière et sans réserve du client aux présentes CGV.
            </p>

            <h2 className="text-base font-bold text-[#242424] font-heading">Article 2 : Prix & Devises</h2>
            <p>
              Les prix sont exprimés en <strong>Euros (€)</strong> pour les livraisons en Europe (France, Allemagne, Espagne) et en <strong>Dollars Canadiens ($ CAD)</strong> pour le Canada, toutes taxes comprises (TTC), hors participation aux frais de livraison clairement indiqués avant validation finale du panier.
            </p>

            <h2 className="text-base font-bold text-[#242424] font-heading">Article 3 : Processus de Commande & Validation</h2>
            <p>
              Le client sélectionne ses articles, renseigne ses coordonnées complètes de livraison, choisit son mode de paiement (virement bancaire avec téléversement de justificatif, carte cadeau avec photo, ou carte bancaire) et confirme sa commande. La commande est définitivement enregistrée après validation du moyen de paiement.
            </p>

            <h2 className="text-base font-bold text-[#242424] font-heading">Article 4 : Garanties Légales</h2>
            <p>
              Tous les produits vendus bénéficient de la garantie légale de conformité (articles L. 217-4 et suivants du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants du Code civil).
            </p>

            <h2 className="text-base font-bold text-[#242424] font-heading">Article 5 : Droit applicable & Règlement des litiges</h2>
            <p>
              Les présentes CGV sont soumises à la législation européenne. En cas de litige, une solution amiable est privilégiée via notre service client disponible par e-mail ou WhatsApp.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
