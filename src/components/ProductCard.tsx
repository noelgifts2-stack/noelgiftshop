'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { region, locale, t, formatPrice, addToCart, isInWishlist, toggleWishlist } = useShop();

  const title = product.title[locale] || product.title.fr;
  const badge = product.badge[locale] || product.badge.fr;
  const price = region.currency === 'CAD' ? product.priceCad : product.priceEur;
  const oldPrice = region.currency === 'CAD' ? product.oldPriceCad : product.oldPriceEur;
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group relative rounded-2xl bg-white border border-[#F1ECE1] shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Conteneur Image & Badges */}
      <div className="aspect-square w-full overflow-hidden bg-gray-50 relative">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Badge Promo / Nouveauté */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${product.isPromo ? 'bg-[#C62828] text-white' : 'bg-[#14532D] text-[#F4C542]'}`}>
            {badge}
          </span>
        </div>

        {/* Bouton Favoris Coeur */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur text-gray-600 hover:text-[#C62828] flex items-center justify-center shadow-sm transition-transform hover:scale-110 z-10"
          title="Ajouter aux favoris"
          aria-label="Ajouter aux favoris"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C62828] text-[#C62828]' : ''}`} />
        </button>

        {/* Bouton Aperçu Rapide */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="hidden sm:flex absolute bottom-2.5 inset-x-2.5 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-semibold items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur z-10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.common.quickView}</span>
          </button>
        )}
      </div>

      {/* Détails Carte */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center gap-1 text-[#F4C542] text-xs">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-[#242424] text-[11px]">{product.rating}</span>
            <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-xs sm:text-sm text-[#242424] group-hover:text-[#C62828] transition-colors line-clamp-2 mt-1">
              {title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Prix ISO formaté */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-black text-sm sm:text-base text-[#C62828] font-heading">
              {formatPrice(price)}
            </span>
            {oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Bouton Ajouter au Panier */}
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2 sm:py-2.5 rounded-xl font-bold text-xs text-[#242424] bg-[#FFF5E6] hover:bg-[#C62828] hover:text-white border border-[#F4C542]/50 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.common.addToCart}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
