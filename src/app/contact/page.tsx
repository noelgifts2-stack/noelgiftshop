'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Mail, Phone, MapPin, Clock, ChevronDown, Check } from 'lucide-react';

export default function ContactPage() {
  const { t, showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("🎅 Votre message a été transmis à nos lutins ! Nous vous répondrons sous 2h.");
  };

  return (
    <div>
      <div className="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-[#242424] font-heading">
            {t.common.contact} & Service Client
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Notre équipe de lutins est à votre disposition 7j/7 pour vous assister dans vos achats de Noël.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Formulaire de Contact */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-[#242424] font-heading">
              Envoyez-nous un message
            </h2>

            {submitted ? (
              <div className="p-8 text-center bg-[#F0FDF4] rounded-2xl border border-green-200 space-y-2">
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-[#14532D]">Message envoyé avec succès !</h3>
                <p className="text-xs text-gray-600">Nos équipes traitent votre demande en priorité.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#242424] mb-1">Votre Nom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sophie Martin"
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#242424] mb-1">Adresse E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="sophie@example.com"
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">Numéro de Téléphone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+33 6 00 00 00 00"
                    className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">Objet de votre demande</label>
                  <select className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828] bg-white">
                    <option>Renseignements sur un cadeau ou une taille</option>
                    <option>Suivi d'expédition d'un colis</option>
                    <option>Validation d'un virement bancaire ou d'une carte cadeau</option>
                    <option>Commande entreprise & coffrets groupés</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">Votre message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Comment pouvons-nous vous aider à préparer les fêtes ?"
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-md text-xs sm:text-sm transition-all"
                >
                  Envoyer mon message 🎅
                </button>
              </form>
            )}
          </div>

          {/* Coordonnées & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#14532D] to-[#0A2614] text-white p-6 rounded-3xl shadow-md border-2 border-[#F4C542] space-y-4">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#F4C542] text-[#242424] font-black uppercase">
                Réponse Express
              </span>
              <h3 className="text-xl font-bold font-heading">Besoin d'une réponse immédiate ?</h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                Notre assistance WhatsApp dédiée aux fêtes répond généralement en moins de 10 minutes pour toute question sur les stocks ou livraisons.
              </p>
              <a
                href="https://wa.me/33600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Discuter sur WhatsApp (+33 6 00 00 00 00)</span>
              </a>
            </div>

            {/* Informations pratiques */}
            <div className="bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-4 text-xs">
              <h4 className="font-bold text-sm text-[#242424] border-b pb-2">Informations utiles</h4>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C62828] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#242424]">Siège & Logistique Europe :</strong>
                  <p className="text-gray-500">24 Rue de la Paix, 75002 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#14532D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#242424]">Horaires du service client :</strong>
                  <p className="text-gray-500">Du Lundi au Dimanche : 8h00 - 22h00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F4C542] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#242424]">Adresse e-mail :</strong>
                  <p className="text-gray-500">contact@noelgiftshop.com</p>
                </div>
              </div>
            </div>

            {/* FAQ Accordéon */}
            <div className="bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-3">
              <h4 className="font-bold text-sm text-[#242424]">Questions fréquentes</h4>
              
              <details className="text-xs group border-b border-gray-100 pb-2">
                <summary className="font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center">
                  <span>Puis-je être livré avant le 24 décembre ?</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#C62828] group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-gray-500 mt-2 text-[11px] leading-relaxed">
                  Oui ! Toutes les commandes passées avant le 22 décembre à 18h sont garanties d'être livrées avant le réveillon de Noël en France, au Canada, en Allemagne et en Espagne.
                </p>
              </details>

              <details className="text-xs group border-b border-gray-100 pb-2">
                <summary className="font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center">
                  <span>Comment fonctionne le paiement par virement ou carte cadeau ?</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#C62828] group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-gray-500 mt-2 text-[11px] leading-relaxed">
                  Lors de l'étape de paiement, vous déposez la photo ou le reçu de votre virement ou carte cadeau. Notre équipe vérifie et approuve votre commande sous 2h pour déclencher la livraison.
                </p>
              </details>

              <details className="text-xs group">
                <summary className="font-semibold text-gray-700 cursor-pointer list-none flex justify-between items-center">
                  <span>L'emballage de Noël est-il vraiment offert ?</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#C62828] group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-gray-500 mt-2 text-[11px] leading-relaxed">
                  Tout à fait ! Pour toute la saison 2026, l'emballage festif avec ruban doré et carte manuscrite vous est offert sans aucun frais supplémentaire.
                </p>
              </details>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
