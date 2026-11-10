'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { X, Trash2, Gift, ArrowRight, ShoppingCart } from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    total, 
    formatPrice, 
    t,
    region 
  } = useShop();

  if (!isCartDrawerOpen) return null;

  const freeThreshold = region.currency === 'CAD' ? 70 : 50;
  const remainingForFree = Math.max(0, freeThreshold - subtotal);
  const percentFree = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header Tiroir */}
          <div className="p-5 bg-[#14532D] text-white flex items-center justify-between border-b-2 border-[#F4C542]">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#F4C542]" />
              <h3 className="font-bold text-base font-heading">
                {t.cart.title}
              </h3>
            </div>
            <button 
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Jauge Livraison Gratuite */}
          <div className="p-4 bg-[#FFFDF8] border-b border-[#F1ECE1]">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-[#14532D]">
              <span>
                {remainingForFree === 0
                  ? t.cart.freeShippingUnlocked
                  : t.cart.freeShippingProgress.replace('{amount}', formatPrice(remainingForFree))}
              </span>
              <span>{percentFree}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#14532D] to-[#F4C542] rounded-full transition-all duration-300"
                style={{ width: `${percentFree}%` }}
              />
            </div>
          </div>

          {/* Articles */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-gray-400 space-y-3">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto block" />
                <p className="text-sm font-semibold text-gray-700">{t.cart.empty}</p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">{t.cart.emptyDesc}</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#C62828] text-white text-xs font-bold shadow hover:bg-[#A71D1D]"
                >
                  {t.hero.ctaShop}
                </Link>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.key} className="flex items-center gap-3 py-3 border-b border-gray-100">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-gray-100 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#242424] truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                      {item.color && <span>{item.color}</span>}
                      {item.size && <span>{item.size}</span>}
                    </div>
                    <p className="text-xs text-[#C62828] font-bold mt-1">
                      {formatPrice(item.price)}
                    </p>
                    
                    {/* Stepper Quantité */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                        <button
                          onClick={() => updateQuantity(item.key, -1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded-l text-xs"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded-r text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="font-bold text-xs text-[#242424]">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Tiroir */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-[#FFFDF8] space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>{t.cart.subtotal} :</span>
                <span className="font-bold text-[#242424]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-gray-100">
                <span className="font-bold text-sm text-[#242424]">{t.cart.total} :</span>
                <span className="font-black text-xl text-[#C62828] font-heading">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 rounded-xl border border-gray-300 font-bold text-xs text-[#242424] hover:bg-gray-50 text-center block"
                >
                  {t.common.cart}
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-3 rounded-xl bg-[#C62828] text-white font-bold text-xs hover:bg-[#A71D1D] shadow text-center flex items-center justify-center gap-1.5"
                >
                  <span>{t.cart.checkoutCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  );
}
