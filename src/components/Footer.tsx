'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES } from '@/data/products';
import { Gift, Phone, ShieldCheck, Mail } from 'lucide-react';

export default function Footer() {
  const { t, locale, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast("🎄 Félicitations ! Votre code -15% (NOEL2026) a été activé !");
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#14532D] text-white pt-14 pb-8 border-t-4 border-[#F4C542]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Spéciale Noël */}
        <div className="bg-gradient-to-r from-[#C62828] to-[#991B1B] rounded-3xl p-8 sm:p-10 mb-12 shadow-xl border border-[#F4C542]/40 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="px-3 py-1 rounded-full bg-[#F4C542] text-[#242424] text-xs font-bold uppercase mb-2 inline-block">
              Lettre au Père Noël 🎅
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Recevez nos offres secrètes & -15% sur votre premier achat
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-2 font-light">
              Inscrivez-vous pour recevoir nos réductions exclusives avant tout le monde.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse e-mail..."
                className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm text-[#242424] focus:outline-none bg-white"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#F4C542] text-[#242424] font-bold text-xs sm:text-sm hover:bg-[#E5B535] shadow transition-colors flex items-center justify-center gap-1.5"
              >
                <span>M'inscrire</span>
                <Gift className="w-4 h-4 text-[#F4C542]" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/15">
          
          {/* Colonne 1 : Présentation & Certification */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#C62828] text-[#F4C542] flex items-center justify-center text-xl shadow">
                <Gift className="w-5 h-5 text-[#F4C542]" />
              </div>
              <span className="font-bold text-xl font-heading text-white">NOËL GIFT SHOP</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Votre destination féerique pour dénicher les plus beaux cadeaux de Noël, anniversaires et moments inoubliables.
              Livraison internationale soignée en France, au Canada, en Allemagne et en Espagne.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-[#F4C542] bg-black/25 px-3 py-1.5 rounded-xl border border-white/10 w-max">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>Boutique certifiée Google Merchant Center</span>
            </div>

            <div className="pt-2">
              <a 
                href="https://wa.me/33600000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] shadow transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Assistance WhatsApp 7j/7</span>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div>
            <h4 className="font-bold text-sm text-[#F4C542] font-heading mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/" className="hover:text-[#F4C542] transition-colors">{t.common.home}</Link></li>
              <li><Link href="/shop" className="hover:text-[#F4C542] transition-colors">{t.common.shop}</Link></li>
              <li><Link href="/shop?promo=true" className="hover:text-[#F4C542] transition-colors">{t.common.promotions}</Link></li>
              <li><Link href="/cart" className="hover:text-[#F4C542] transition-colors">{t.common.cart}</Link></li>
              <li><Link href="/contact" className="hover:text-[#F4C542] transition-colors">{t.common.contact}</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Top Catégories */}
          <div>
            <h4 className="font-bold text-sm text-[#F4C542] font-heading mb-4">Catégories Phares</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-[#F4C542] transition-colors">
                    {cat.name[locale] || cat.name.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Modes de Paiement Sécurisés */}
          <div>
            <h4 className="font-bold text-sm text-[#F4C542] font-heading mb-4">Paiements Sécurisés</h4>
            <p className="text-xs text-gray-300 mb-3">Modes de règlement acceptés :</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-blue-900 text-white font-bold text-[10px] border border-blue-400">
                Virement SEPA
              </span>
              <span className="px-2.5 py-1 rounded bg-[#C62828] text-[#F4C542] font-bold text-[10px] border border-[#F4C542]">
                Carte Cadeau
              </span>
              <span className="px-2.5 py-1 rounded bg-white text-gray-800 font-bold text-[10px]">
                Visa / Mastercard
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
              Données chiffrées SSL 256 bits et vérification rigoureuse des commandes.
            </p>
          </div>

        </div>

        {/* Bas de page & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 NOËL GIFT SHOP. {t.common.allRightsReserved}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/legal/returns" className="hover:text-white transition-colors">Retours & Remboursements</Link>
            <span>•</span>
            <Link href="/legal/shipping" className="hover:text-white transition-colors">Livraison & Délais</Link>
            <span>•</span>
            <Link href="/legal/cgv" className="hover:text-white transition-colors">CGV</Link>
            <span>•</span>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <span>•</span>
            <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">Mentions Légales & Impressum</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
