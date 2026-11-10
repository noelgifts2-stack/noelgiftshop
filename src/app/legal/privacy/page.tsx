'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ShieldCheck, Lock, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  const { t } = useShop();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#242424] font-semibold">Politique de Confidentialité</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F1ECE1] shadow-sm space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#14532D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#14532D]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider">Protection des Données Personnelles</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
                Politique de Confidentialité (RGPD)
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Dernière mise à jour : <strong>Novembre 2026</strong>. <strong>NOËL GIFT SHOP</strong> accorde une importance capitale à la sécurité et à la confidentialité de vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD 2016/679) et aux lois canadiennes (LPRPDE).
          </p>

          <hr className="border-[#F1ECE1]" />

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base font-bold text-[#242424] font-heading">1. Données collectées</h2>
            <p>
              Dans le cadre strict de l'exécution de vos commandes de Noël, nous collectons :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Vos nom, prénom, adresse postale de livraison et de facturation.</li>
              <li>Votre adresse e-mail et numéro de téléphone / WhatsApp (pour l'envoi du numéro de suivi).</li>
              <li>Les pièces justificatives de virement ou photos de cartes cadeaux déposées lors du paiement (stockées sur des serveurs sécurisés Supabase certifiés ISO/IEC 27001).</li>
            </ul>

            <h2 className="text-base font-bold text-[#242424] font-heading">2. Utilisation des données</h2>
            <p>
              Vos données ne sont ni vendues, ni louées, ni cédées à des tiers à des fins de prospection commerciale. Elles sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>La préparation, l'emballage et l'expédition de votre commande par nos transporteurs partenaires.</li>
              <li>La vérification comptable des paiements.</li>
              <li>Le service après-vente et la gestion des retours.</li>
            </ul>

            <h2 className="text-base font-bold text-[#242424] font-heading">3. Vos droits (Accès, Rectification, Suppression)</h2>
            <p>
              Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données personnelles. Vous pouvez exercer ce droit à tout moment en écrivant à : <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">dpo@noelgiftshop.com</code>.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
