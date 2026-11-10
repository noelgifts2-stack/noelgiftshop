'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Trash2, Gift, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    discount, 
    shipping, 
    total, 
    promoCode, 
    applyPromo, 
    removePromo, 
    giftPackaging, 
    giftNote, 
    setGiftOptions, 
    formatPrice, 
    t, 
    region 
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [localNote, setLocalNote] = useState(giftNote);

  const freeThreshold = region.currency === 'CAD' ? 70 : 50;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  const percentFree = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div>
      <div className="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-[#242424] font-heading">
            {t.cart.title}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {t.cart.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#F1ECE1] shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center text-4xl mx-auto mb-4">
              🛒
            </div>
            <h2 className="text-2xl font-bold text-[#242424] font-heading">{t.cart.empty}</h2>
            <p className="text-sm text-gray-500 mt-2">{t.cart.emptyDesc}</p>
            <Link
              href="/shop"
              className="mt-6 inline-block px-7 py-3.5 rounded-xl bg-[#C62828] text-white font-bold text-sm shadow hover:bg-[#A71D1D] transition-colors"
            >
              {t.hero.ctaShop}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Colonne Articles */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Barre Livraison Gratuite */}
              <div className="bg-white p-4 rounded-2xl border border-[#F1ECE1] shadow-sm">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="flex items-center gap-1.5 text-[#14532D]">
                    <span>🚚</span>
                    {remainingForFree === 0
                      ? t.cart.freeShippingUnlocked
                      : t.cart.freeShippingProgress.replace('{amount}', formatPrice(remainingForFree))}
                  </span>
                  <span className="text-gray-400">{percentFree}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#14532D] to-[#F4C542] rounded-full transition-all duration-500"
                    style={{ width: `${percentFree}%` }}
                  />
                </div>
              </div>

              {/* Liste des Cartes Produits */}
              <div className="bg-white rounded-2xl border border-[#F1ECE1] shadow-sm divide-y divide-[#F1ECE1] overflow-hidden">
                {cart.map(item => (
                  <div key={item.key} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <Link href={`/product/${item.productId}`} className="font-bold text-sm text-[#242424] hover:text-[#C62828]">
                        {item.name}
                      </Link>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1 justify-center sm:justify-start">
                        {item.color && <span>Couleur : <strong>{item.color}</strong></span>}
                        {item.size && <span>Taille : <strong>{item.size}</strong></span>}
                      </div>
                      <div className="font-bold text-[#C62828] text-sm mt-2">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-[#242424]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-gray-400 hover:text-red-600 p-2 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="font-bold text-sm text-[#242424] min-w-[90px] text-right hidden sm:block">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Emballage Cadeau Offert */}
              <div className="bg-white p-5 rounded-2xl border border-[#F1ECE1] shadow-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftPackaging}
                    onChange={(e) => setGiftOptions(e.target.checked, localNote)}
                    className="w-5 h-5 text-[#C62828] accent-[#C62828] rounded"
                  />
                  <div>
                    <span className="font-bold text-sm text-[#242424] flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-[#C62828]" />
                      {t.cart.giftPackagingTitle}
                    </span>
                    <p className="text-xs text-gray-500">{t.cart.giftPackagingDesc}</p>
                  </div>
                </label>
                {giftPackaging && (
                  <div className="mt-3">
                    <textarea
                      rows={2}
                      value={localNote}
                      onChange={(e) => {
                        setLocalNote(e.target.value);
                        setGiftOptions(giftPackaging, e.target.value);
                      }}
                      placeholder={t.cart.giftNotePlaceholder}
                      className="w-full text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                    />
                  </div>
                )}
              </div>

            </div>

            {/* Récapitulatif Tarifaire */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-2xl border border-[#F1ECE1] shadow-md space-y-4 sticky top-24">
                <h3 className="font-bold text-base text-[#242424] pb-3 border-b border-[#F1ECE1]">
                  Récapitulatif
                </h3>

                {/* Champ Code Promo */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">
                    {t.cart.promoCodeLabel}
                  </label>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Ex: NOEL2026"
                      className="flex-1 uppercase text-xs px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#14532D] text-[#F4C542] font-bold text-xs hover:bg-[#0E3E21]"
                    >
                      {t.cart.apply}
                    </button>
                  </form>
                  {promoCode && (
                    <div className="flex items-center justify-between text-xs text-green-700 bg-green-50 p-2 rounded-lg mt-2">
                      <span>✓ Code <strong>{promoCode}</strong> appliqué (-{formatPrice(discount)})</span>
                      <button onClick={removePromo} className="text-red-500 font-bold ml-2">×</button>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-[#F1ECE1]">
                  <div className="flex justify-between text-gray-600">
                    <span>{t.cart.subtotal} :</span>
                    <span className="font-semibold text-[#242424]">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>{t.cart.discount} :</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>{t.cart.shipping} :</span>
                    <span className="font-semibold text-[#242424]">
                      {shipping === 0 ? <strong className="text-green-700">{t.cart.free}</strong> : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1ECE1] flex justify-between items-baseline">
                  <span className="font-bold text-base text-[#242424]">{t.cart.total} :</span>
                  <span className="font-black text-2xl text-[#C62828] font-heading">
                    {formatPrice(total)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-xl flex items-center justify-center gap-2 text-sm text-center block transition-all hover:-translate-y-0.5"
                >
                  <span>{t.cart.checkoutCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link href="/shop" className="block text-center text-xs text-gray-500 hover:text-[#C62828] pt-1">
                  ← {t.cart.continueShopping}
                </Link>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
