'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { RotateCcw, ShieldCheck, CheckCircle2, Clock, Mail } from 'lucide-react';

export default function ReturnsPolicyPage() {
  const { t } = useShop();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane */}
        <nav className="flex text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#242424] font-semibold">Politique de Retours et Remboursements</span>
        </nav>

        {/* Titre & En-tête */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F1ECE1] shadow-sm space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-[#14532D] flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider">Conformité Google Merchant Center</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
                Politique de Retours & Remboursements
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Dernière mise à jour : <strong>Novembre 2026</strong>. Conformément aux directives européennes de protection des consommateurs (Directive 2011/83/UE) et aux réglementations applicables en France, au Canada, en Allemagne et en Espagne.
          </p>

          <hr className="border-[#F1ECE1]" />

          {/* Points Clés Google */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532D]">
                <Clock className="w-4 h-4" />
                <span>Délai de rétractation</span>
              </div>
              <p className="text-xl font-black text-[#242424]">14 jours</p>
              <p className="text-[11px] text-gray-500">À compter de la réception de votre colis.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532D]">
                <ShieldCheck className="w-4 h-4" />
                <span>Frais de réexpédition</span>
              </div>
              <p className="text-xl font-black text-[#14532D]">0,00 € (Gratuit)</p>
              <p className="text-[11px] text-gray-500">Étiquette prépayée fournie en cas d'erreur ou d'article défectueux.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#14532D]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Délai de remboursement</span>
              </div>
              <p className="text-xl font-black text-[#C62828]">5 à 7 jours</p>
              <p className="text-[11px] text-gray-500">Re-crédité sur le moyen de paiement d'origine.</p>
            </div>
          </div>

          {/* Section 1 : Droit de rétractation */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-[#242424] font-heading">
              1. Droit légal de rétractation (14 jours)
            </h2>
            <p>
              Chez <strong>NOËL GIFT SHOP</strong>, si un cadeau ne vous convient pas ou si vous changez d'avis, vous disposez d'un délai légal de <strong>quatorze (14) jours calendaires</strong> à compter de la date de réception de vos articles pour exercer votre droit de rétractation, sans pénalité et sans avoir à justifier de motif.
            </p>
          </div>

          {/* Section 2 : Conditions d'acceptation du retour */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-[#242424] font-heading">
              2. Conditions d'éligibilité des retours
            </h2>
            <p>Pour qu'un retour soit accepté et intégralement remboursé :</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>L'article doit être dans son état d'origine, non utilisé, non porté et non lavé.</li>
              <li>Il doit être retourné dans son emballage d'origine complet (boîte, notices, étiquettes, accessoires, ruban festif).</li>
              <li>Les denrées périssables (ex: chocolats entamés) ou les articles d'hygiène descellés (ex: parfums ouverts) ne peuvent faire l'objet d'un retour pour des raisons de sécurité sanitaire.</li>
            </ul>
          </div>

          {/* Section 3 : Procédure de retour pas à pas */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-[#242424] font-heading">
              3. Comment effectuer un retour ?
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>Contactez notre service retour :</strong> Par e-mail à <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">retours@noelgiftshop.com</code> ou via WhatsApp au <strong>+33 6 00 00 00 00</strong> en indiquant votre numéro de commande (ex: <em>#NLG-2026-XXXX</em>).
              </li>
              <li>
                <strong>Obtenez votre bon de retour :</strong> Nous vous transmettons immédiatement par e-mail le bon de retour et l'étiquette de transport.
              </li>
              <li>
                <strong>Déposez votre colis :</strong> Emballez soigneusement l'article et déposez-le dans le point relais ou bureau de poste le plus proche.
              </li>
            </ol>
          </div>

          {/* Section 4 : Adresse de retour physique */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm space-y-1">
            <strong className="text-[#242424] block">Adresse officielle de réexpédition du centre logistique :</strong>
            <p className="font-mono text-gray-700">
              NOËL GIFT SHOP - Service Retours & SAV<br />
              Centre Logistique Europe<br />
              24 Rue de la Paix, 75002 Paris, France
            </p>
          </div>

          {/* Section 5 : Modalités de remboursement */}
          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-[#242424] font-heading">
              4. Délais et modes de remboursement
            </h2>
            <p>
              Dès réception et inspection de l'article retourné par notre équipe (sous 48h ouvrées), nous procédons au remboursement intégral incluant les frais de livraison standard initiaux.
            </p>
            <p>
              Le remboursement est émis sous <strong>5 à 7 jours ouvrés</strong> :
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Pour un virement bancaire : virement direct sur votre compte bancaire émetteur.</li>
              <li>Pour une carte cadeau : réactivation du crédit ou émission d'un nouvel avoir de même valeur.</li>
              <li>Pour une carte bancaire : recrédit immédiat sur la carte ayant servi au paiement.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[#F1ECE1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-gray-500">
              <Mail className="w-4 h-4 text-[#C62828]" />
              <span>Une question sur votre retour ? Écrivez à <strong>contact@noelgiftshop.com</strong></span>
            </div>
            <Link href="/contact" className="px-5 py-2.5 rounded-xl bg-[#C62828] text-white font-bold hover:bg-[#A71D1D] transition-colors">
              Contacter le support client →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
