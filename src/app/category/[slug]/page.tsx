'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { locale, t } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const category = CATEGORIES.find(c => c.slug === slug);
  if (!category) return notFound();

  const categoryProducts = PRODUCTS.filter(p => p.categorySlug === slug);
  const title = category.name[locale] || category.name.fr;
  const desc = category.description[locale] || category.description.fr;
  const subcategories = category.subcategories[locale] || category.subcategories.fr;

  return (
    <div>
      {/* Bannière de Catégorie Immersive */}
      <section className="relative bg-[#14532D] text-white overflow-hidden py-14 lg:py-20 border-b-4 border-[#F4C542]">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${category.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14532D] via-[#14532D]/90 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex text-xs text-gray-300 mb-3">
            <Link href="/" className="hover:text-[#F4C542]">{t.common.home}</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-[#F4C542]">{t.common.shop}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#F4C542] font-semibold">{title}</span>
          </nav>

          <span className="inline-block px-3 py-1 rounded-full bg-[#C62828] text-[#F4C542] text-xs font-bold mb-3 shadow">
            Collection Spéciale Noël 2026
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mt-2 font-light leading-relaxed">
            {desc}
          </p>

          {/* Pilules de Sous-catégories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {subcategories.map(sub => (
              <span
                key={sub}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium cursor-pointer backdrop-blur transition-colors"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des Articles de la Catégorie */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#242424] font-heading">Produits de cette collection</h2>
            <p className="text-xs text-gray-500 mt-0.5">{categoryProducts.length} articles disponibles</p>
          </div>
          <Link href="/shop" className="text-xs font-bold text-[#C62828] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voir toute la boutique</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categoryProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
