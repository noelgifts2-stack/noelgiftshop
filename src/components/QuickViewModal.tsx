'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { X, ShoppingBag, ArrowRight, Star } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { region, locale, t, formatPrice, addToCart } = useShop();

  if (!product) return null;

  const title = product.title[locale] || product.title.fr;
  const description = product.description[locale] || product.description.fr;
  const badge = product.badge[locale] || product.badge.fr;
  const price = region.currency === 'CAD' ? product.priceCad : product.priceEur;
  const oldPrice = region.currency === 'CAD' ? product.oldPriceCad : product.oldPriceEur;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#F4C542] p-6 z-10">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <img src={product.images[0]} alt={title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C62828] text-white text-[10px] font-bold">
              {badge}
            </span>

            <div className="flex items-center gap-1 text-[#F4C542] text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-gray-400">({product.reviewsCount} {t.common.reviews})</span>
            </div>

            <h3 className="text-lg font-bold text-[#242424] font-heading leading-snug">
              {title}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#C62828] font-heading">
                {formatPrice(price)}
              </span>
              {oldPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
              {description}
            </p>

            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="w-full py-3 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-md flex items-center justify-center gap-2 text-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#F4C542]" />
                <span>{t.common.addToCart}</span>
              </button>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="w-full py-2.5 rounded-xl font-bold text-[#242424] bg-gray-100 hover:bg-gray-200 text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Fiche produit détaillée</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
