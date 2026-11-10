'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { PaymentMethodType, CountryCode, OrderData } from '@/types';
import { 
  CheckCircle, 
  Upload, 
  CreditCard, 
  Building2, 
  Gift, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Phone,
  FileCheck,
  ShoppingCart,
  Truck,
  PartyPopper
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shipping, discount, promoCode, total, formatPrice, t, region, locale, giftPackaging, giftNote, clearCart, showToast } = useShop();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);

  // Formulaire Étape 1
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<CountryCode>(region.countryCode);
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  // Formulaire Étape 2 (Paiement)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bank_transfer');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [uploadedProofName, setUploadedProofName] = useState<string | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | null>(null);

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 mb-4">{t.cart.empty}</p>
        <Link href="/shop" className="px-6 py-3 rounded-xl bg-[#C62828] text-white font-bold text-xs shadow">
          {t.hero.ctaShop}
        </Link>
      </div>
    );
  }

  // Upload réel vers Supabase Storage API
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedProofName(file.name);
      setProofPreviewUrl(URL.createObjectURL(file));

      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          setProofPreviewUrl(data.url);
        }
      } catch (err) {
        console.warn('Upload preview fallback');
      }

      showToast(`Justificatif « ${file.name} » prêt pour vérification.`);
    }
  };

  const handleValidateStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city || !postalCode) {
      showToast("Veuillez renseigner tous les champs de livraison obligatoires.", "error");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleValidateStep2 = () => {
    if (paymentMethod === 'bank_transfer' && !uploadedProofName) {
      showToast("Veuillez téléverser votre reçu de virement bancaire pour valider.", "error");
      return;
    }
    if (paymentMethod === 'gift_card' && (!giftCardCode || !uploadedProofName)) {
      showToast("Veuillez saisir le code et joindre la photo de votre carte cadeau.", "error");
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalizeOrder = async () => {
    setIsSubmitting(true);
    const orderRef = `NLG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderPayload: OrderData = {
      orderReference: orderRef,
      customer: {
        fullName,
        email,
        phone,
        country,
        city,
        postalCode,
        address,
        giftPackaging,
        giftNote
      },
      items: [...cart],
      paymentMethod,
      paymentProofUrl: proofPreviewUrl || undefined,
      giftCardCode: giftCardCode || undefined,
      subtotal,
      shipping,
      discount,
      promoCode: promoCode || undefined,
      total,
      currency: region.currency,
      locale,
      createdAt: new Date().toISOString()
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
    } catch (e) {
      console.warn("API order call fallback");
    }

    setCompletedOrder(orderPayload);
    clearCart();
    setIsSubmitting(false);
    showToast("🎉 Commande validée avec succès !");
  };

  // 4. ÉCRAN DE SUCCÈS
  if (completedOrder) {
    const whatsappOrderSummary = `Bonjour NOËL GIFT SHOP ! 🎄\nJe viens de valider ma commande sur votre boutique :\n\n` +
      `📦 *Réf. Commande :* ${completedOrder.orderReference}\n` +
      `👤 *Client :* ${completedOrder.customer.fullName} (${completedOrder.customer.phone})\n` +
      `📍 *Adresse :* ${completedOrder.customer.address}, ${completedOrder.customer.postalCode} ${completedOrder.customer.city} (${completedOrder.customer.country})\n` +
      `💳 *Mode de paiement :* ${completedOrder.paymentMethod}\n` +
      (completedOrder.giftCardCode ? `🎁 *Code Carte Cadeau :* ${completedOrder.giftCardCode}\n` : '') +
      `\n🛒 *Articles :*\n` +
      completedOrder.items.map(i => `- ${i.quantity}x ${i.name} (${formatPrice(i.price)})`).join('\n') +
      `\n\n💰 *TOTAL : ${formatPrice(completedOrder.total)}*\n` +
      `Merci de confirmer la bonne réception de mon justificatif ! ✨`;

    const whatsappLink = `https://wa.me/33600000000?text=${encodeURIComponent(whatsappOrderSummary)}`;

    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-in fade-in">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#14532D] to-[#25D366] text-white flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
          <PartyPopper className="w-12 h-12" />
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4C542] text-[#242424] text-xs font-black uppercase mb-3">
          {t.checkout.successBadge}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#242424] font-heading">
          {t.checkout.successTitle.replace('{name}', completedOrder.customer.fullName)}
        </h1>

        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          {t.checkout.successDesc.replace('{ref}', completedOrder.orderReference)}
        </p>

        <div className="mt-8 bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-md max-w-lg mx-auto text-left space-y-3 text-xs">
          <h3 className="font-bold text-sm text-[#242424] border-b pb-2">Détails de la commande enregistrée :</h3>
          <div className="flex justify-between">
            <span className="text-gray-500">Référence :</span>
            <span className="font-mono font-bold text-[#C62828]">{completedOrder.orderReference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Destinataire :</span>
            <span className="font-semibold text-gray-800">{completedOrder.customer.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Adresse :</span>
            <span className="text-gray-800">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Règlement :</span>
            <span className="font-bold text-[#14532D]">{completedOrder.paymentMethod}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-sm font-bold">
            <span>Montant total :</span>
            <span className="text-[#C62828]">{formatPrice(completedOrder.total)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-xl flex items-center justify-center gap-2 text-sm transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>{t.checkout.whatsappConfirmation}</span>
          </a>

          <Link
            href="/"
            className="px-7 py-4 rounded-xl font-bold text-[#242424] bg-white border border-gray-200 hover:bg-gray-50 shadow text-sm flex items-center justify-center"
          >
            {t.checkout.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* En-tête Stepper */}
      <div className="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-[#242424] font-heading text-center">
            {t.checkout.title}
          </h1>

          {/* Stepper 3 Étapes */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 max-w-xl mx-auto">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#C62828] font-bold' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-[#C62828] text-white' : 'bg-gray-200'}`}>1</span>
              <span className="text-xs hidden sm:inline">{t.checkout.step1}</span>
            </div>
            <div className={`w-8 sm:w-16 h-0.5 ${step >= 2 ? 'bg-[#C62828]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#C62828] font-bold' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-[#C62828] text-white' : 'bg-gray-200'}`}>2</span>
              <span className="text-xs hidden sm:inline">{t.checkout.step2}</span>
            </div>
            <div className={`w-8 sm:w-16 h-0.5 ${step >= 3 ? 'bg-[#C62828]' : 'bg-gray-200'}`} />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#C62828] font-bold' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 3 ? 'bg-[#C62828] text-white' : 'bg-gray-200'}`}>3</span>
              <span className="text-xs hidden sm:inline">{t.checkout.step3}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Colonne Formulaires */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F1ECE1] shadow-sm">
              
              {/* ÉTAPE 1 : COORDONNÉES */}
              {step === 1 && (
                <form onSubmit={handleValidateStep1} className="space-y-4">
                  <h2 className="text-lg font-bold text-[#242424] font-heading flex items-center gap-2 pb-2 border-b">
                    <span className="text-[#C62828]">1.</span> {t.checkout.step1Title}
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.fullName} *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex: Jean Dupont"
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.email} *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jean.dupont@example.com"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.phone} *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.country} *</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value as CountryCode)}
                        className="w-full text-xs sm:text-sm px-3 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828] bg-white"
                      >
                        <option value="FR">France 🇫🇷</option>
                        <option value="CA">Canada 🇨🇦</option>
                        <option value="DE">Deutschland 🇩🇪</option>
                        <option value="ES">España 🇪🇸</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.city} *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Paris / Montréal"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.postalCode} *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="75001"
                        className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#242424] mb-1">{t.checkout.address} *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="12 rue de la Paix, Bâtiment B, Étage 3"
                      className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-lg flex items-center justify-center gap-2 text-sm mt-4 transition-all"
                  >
                    <span>{t.checkout.continueToPayment}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* ÉTAPE 2 : PAIEMENT & UPLOAD */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-lg font-bold text-[#242424] font-heading flex items-center gap-2 pb-2 border-b">
                    <span className="text-[#C62828]">2.</span> {t.checkout.step2Title}
                  </h2>

                  {/* 1. Option Virement Bancaire avec RIB */}
                  <div className={`p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'bank_transfer' ? 'border-[#14532D] bg-[#F0FDF4]' : 'border-gray-200 bg-white'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="checkout_payment"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="w-4 h-4 mt-1 accent-[#14532D]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#242424] flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#14532D]" />
                            {t.checkout.wireTransferTitle}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-[#14532D] font-bold">SEPA</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{t.checkout.wireTransferDesc}</p>
                      </div>
                    </label>

                    {paymentMethod === 'bank_transfer' && (
                      <div className="mt-4 pt-4 border-t border-green-200 space-y-3 text-xs">
                        <div className="bg-white p-3.5 rounded-xl border border-green-200 space-y-1 font-mono text-[11px] text-gray-800">
                          <p className="font-sans font-bold text-xs text-[#14532D] mb-1">{t.checkout.bankDetailsTitle}</p>
                          <p>{t.checkout.bankName}</p>
                          <p>{t.checkout.accountHolder}</p>
                          <p className="font-bold text-black">{t.checkout.iban}</p>
                          <p>{t.checkout.bic}</p>
                          <p className="font-sans text-[10px] text-red-600 mt-2 font-bold">{t.checkout.referenceNotice}</p>
                        </div>

                        {/* Téléversement du Reçu */}
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">
                            {t.checkout.uploadTransferProof}
                          </label>
                          <div className="relative border-2 border-dashed border-gray-300 hover:border-[#14532D] rounded-xl p-4 text-center cursor-pointer bg-white">
                            <input
                              type="file"
                              accept=".pdf,image/*"
                              onChange={handleFileUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">
                              {uploadedProofName ? (
                                <span className="font-bold text-green-700 flex items-center justify-center gap-1">
                                  <FileCheck className="w-4 h-4" />
                                  {uploadedProofName}
                                </span>
                              ) : (
                                "Cliquez ou glissez votre reçu de virement ici"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Option Carte Cadeau avec Photo */}
                  <div className={`p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'gift_card' ? 'border-[#C62828] bg-red-50/20' : 'border-gray-200 bg-white'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="checkout_payment"
                        checked={paymentMethod === 'gift_card'}
                        onChange={() => setPaymentMethod('gift_card')}
                        className="w-4 h-4 mt-1 accent-[#C62828]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#242424] flex items-center gap-2">
                            <Gift className="w-4 h-4 text-[#C62828]" />
                            {t.checkout.giftCardTitle}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-[#C62828] font-bold">Voucher</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{t.checkout.giftCardDesc}</p>
                      </div>
                    </label>

                    {paymentMethod === 'gift_card' && (
                      <div className="mt-4 pt-4 border-t border-red-200 space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Code de la carte cadeau *</label>
                          <input
                            type="text"
                            value={giftCardCode}
                            onChange={(e) => setGiftCardCode(e.target.value)}
                            placeholder={t.checkout.giftCardCodePlaceholder}
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828] uppercase font-mono"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-gray-700 mb-1">
                            {t.checkout.uploadCardPhoto} *
                          </label>
                          <div className="relative border-2 border-dashed border-gray-300 hover:border-[#C62828] rounded-xl p-4 text-center cursor-pointer bg-white">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">
                              {uploadedProofName ? (
                                <span className="font-bold text-[#C62828] flex items-center justify-center gap-1">
                                  <FileCheck className="w-4 h-4" />
                                  {uploadedProofName}
                                </span>
                              ) : (
                                "Prendre ou déposer la photo de votre carte cadeau"
                              )}
                            </p>
                          </div>
                        </div>

                        <p className="text-[11px] text-gray-500 italic">
                          {t.checkout.cardNotice}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 3. Option Carte Bancaire */}
                  <div className={`p-4 rounded-2xl border-2 transition-all ${paymentMethod === 'credit_card' ? 'border-[#F4C542] bg-[#FFFDF8]' : 'border-gray-200 bg-white'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="checkout_payment"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="w-4 h-4 mt-1 accent-[#C62828]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#242424] flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-[#F4C542]" />
                            {t.checkout.creditCardTitle}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-bold">3D-Secure</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{t.checkout.creditCardDesc}</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 text-xs flex items-center justify-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t.checkout.back}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleValidateStep2}
                      className="w-2/3 py-3.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                      <span>{t.checkout.proceedToReview}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 : CONFIRMATION FINALE */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center py-2">
                    <CheckCircle className="w-12 h-12 text-[#14532D] mx-auto mb-2" />
                    <h2 className="text-xl font-bold text-[#242424] font-heading">
                      {t.checkout.step3Title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Vérifiez vos informations une dernière fois avant la validation finale.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 border border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.checkout.recipientSummary} :</span>
                      <span className="font-bold text-[#242424]">{fullName} ({phone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.checkout.deliveryAddressSummary} :</span>
                      <span className="font-bold text-[#242424]">{address}, {postalCode} {city} ({country})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.checkout.paymentMethodSummary} :</span>
                      <span className="font-bold text-[#14532D]">{paymentMethod}</span>
                    </div>
                    {uploadedProofName && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Document joint :</span>
                        <span className="font-mono text-gray-700">{uploadedProofName}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 text-xs"
                    >
                      ← Modifier
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleFinalizeOrder}
                      className="w-2/3 py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-xl text-xs sm:text-sm pulse-festive disabled:opacity-50"
                    >
                      {isSubmitting ? "Validation en cours..." : `${t.checkout.confirmOrder} (${formatPrice(total)}) 🎁`}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Colonne Récapitulatif */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-3xl border border-[#F1ECE1] shadow-sm space-y-4 sticky top-24">
              <h3 className="font-bold text-sm text-[#242424] pb-3 border-b border-[#F1ECE1] flex items-center justify-between">
                <span>Articles ({cart.length})</span>
                <Link href="/cart" className="text-xs text-[#C62828] hover:underline font-normal">
                  Modifier
                </Link>
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map(i => (
                  <div key={i.key} className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#242424] truncate">{i.name}</p>
                      <p className="text-[11px] text-gray-400">Qté : {i.quantity} × {formatPrice(i.price)}</p>
                    </div>
                    <span className="text-xs font-bold text-[#242424]">
                      {formatPrice(i.price * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pt-3 border-t border-[#F1ECE1]">
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.subtotal} :</span>
                  <span className="font-semibold text-[#242424]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>{t.cart.discount} ({promoCode}) :</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>{t.cart.shipping} :</span>
                  <span className="font-semibold text-[#242424]">
                    {shipping === 0 ? <strong className="text-green-700">{t.cart.free}</strong> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#F1ECE1]">
                  <span className="font-bold text-sm text-[#242424]">{t.cart.total} :</span>
                  <span className="font-black text-xl text-[#C62828] font-heading">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF8] border border-[#F1ECE1] text-[11px] text-gray-500 space-y-1">
                <p className="flex items-center gap-1.5 text-[#14532D] font-bold">
                  <span>🎄</span> Emballage cadeau festif inclus
                </p>
                <p>Expédié sous boîte scellée avec ruban de protection.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
