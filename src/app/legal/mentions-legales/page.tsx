'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Building2, Scale } from 'lucide-react';

export default function MentionsLegalesPage() {
  const { t } = useShop();

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#242424] font-semibold">Mentions Légales & Impressum</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F1ECE1] shadow-sm space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-[#14532D] flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#14532D]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider">Transparence & Informations Légales</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
                Mentions Légales & Impressum (§ 5 TMG)
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Conformément aux dispositions de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN) en France et du § 5 Telemediengesetz (TMG) en Allemagne.
          </p>

          <hr className="border-[#F1ECE1]" />

          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <h2 className="text-base font-bold text-[#242424] font-heading">1. Éditeur du site</h2>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 font-mono text-xs space-y-1">
              <p><strong>Dénomination sociale :</strong> NOËL GIFT SHOP SAS</p>
              <p><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS) au capital de 50 000 €</p>
              <p><strong>Siège social :</strong> 24 Rue de la Paix, 75002 Paris, France</p>
              <p><strong>RCS :</strong> Paris B 912 345 678</p>
              <p><strong>Numéro SIRET :</strong> 912 345 678 00012</p>
              <p><strong>Numéro TVA Intracommunautaire :</strong> FR 89 912345678</p>
              <p><strong>Directeur de la publication :</strong> M. Alexandre De Noël, Président</p>
              <p><strong>Contact e-mail :</strong> contact@noelgiftshop.com</p>
              <p><strong>Téléphone / WhatsApp :</strong> +33 6 00 00 00 00</p>
            </div>

            <h2 className="text-base font-bold text-[#242424] font-heading">2. Hébergement du site</h2>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 font-mono text-xs space-y-1">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
              <p><strong>Site web :</strong> https://vercel.com</p>
              <p><strong>Infrastructure base de données :</strong> Supabase Inc., 970 Toa Payoh North #07-04, Singapore</p>
            </div>

            <h2 className="text-base font-bold text-[#242424] font-heading">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des éléments graphiques, photographies, logos, textes et animations composant le site <strong>NOËL GIFT SHOP</strong> sont la propriété exclusive de la société ou font l'objet d'une licence d'utilisation. Toute reproduction totale ou partielle sans autorisation préalable écrite est strictement interdite.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
