'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { Filter, SlidersHorizontal, RotateCcw, Search, Tag } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const { region, locale, t, formatPrice } = useShop();

  const initialCat = searchParams.get('category') || 'all';
  const initialRecipient = searchParams.get('recipient') || 'all';
  const initialBudget = searchParams.get('budget') || 'all';
  const initialPromo = searchParams.get('promo') === 'true';
  const initialWishlistOnly = searchParams.get('wishlist') === 'true';
  const searchQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState<string>(initialCat);
  const [recipient, setRecipient] = useState<string>(initialRecipient);
  const [budget, setBudget] = useState<string>(initialBudget);
  const [onlyPromo, setOnlyPromo] = useState<boolean>(initialPromo);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(region.currency === 'CAD' ? 350 : 250);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const { wishlist } = useShop();

  // Reset Filters
  const resetFilters = () => {
    setCategory('all');
    setRecipient('all');
    setBudget('all');
    setOnlyPromo(false);
    setInStockOnly(false);
    setMaxPrice(region.currency === 'CAD' ? 350 : 250);
    setCurrentPage(1);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const price = region.currency === 'CAD' ? p.priceCad : p.priceEur;

      if (category !== 'all' && p.categorySlug !== category) return false;
      if (recipient !== 'all' && p.recipient !== recipient) return false;
      if (budget !== 'all' && p.budgetTier !== budget) return false;
      if (onlyPromo && !p.isPromo) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (initialWishlistOnly && !wishlist.includes(p.id)) return false;
      if (price > maxPrice) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const title = (p.title[locale] || p.title.fr).toLowerCase();
        const desc = (p.description[locale] || p.description.fr).toLowerCase();
        if (!title.includes(q) && !desc.includes(q)) return false;
      }

      return true;
    });
  }, [category, recipient, budget, onlyPromo, inStockOnly, initialWishlistOnly, wishlist, maxPrice, searchQuery, region, locale]);

  // Sorted Products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (region.currency === 'CAD' ? a.priceCad - b.priceCad : a.priceEur - b.priceEur));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (region.currency === 'CAD' ? b.priceCad - a.priceCad : b.priceEur - a.priceEur));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return list;
  }, [filteredProducts, sortBy, region]);

  // Pagination
  const itemsPerPage = 16;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Génération des numéros de page visibles (élégant pour 50+ pages)
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div>
      {/* En-tête Catalogue */}
      <div className="bg-[#FFFDF8] py-8 border-b border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500 mb-3">
            <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#242424] font-semibold">{t.common.shop}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#242424] font-heading">
                {initialWishlistOnly ? t.common.wishlist : 'Notre Boutique de Noël'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Explorez tous nos trésors et cadeaux soigneusement sélectionnés pour les fêtes.
              </p>
            </div>

            {/* Bouton Filtres sur Mobile */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14532D] text-white text-xs font-semibold shadow"
            >
              <Filter className="w-4 h-4 text-[#F4C542]" />
              <span>Filtrer & Trier ({filteredProducts.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTRES (Desktop + Mobile Toggle) */}
          <aside className={`col-span-1 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-2xl border border-[#F1ECE1] shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#F1ECE1]">
                <h3 className="font-bold text-[#242424] text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C62828]" />
                  <span>Filtres de recherche</span>
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#C62828] hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Réinitialiser</span>
                </button>
              </div>

              {/* Filtre Catégorie */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">Catégories</h4>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer p-1.5 rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shop_category"
                      checked={category === 'all'}
                      onChange={() => setCategory('all')}
                      className="accent-[#C62828]"
                    />
                    <span className={category === 'all' ? 'font-bold text-[#C62828]' : 'text-gray-700'}>
                      Toutes les catégories
                    </span>
                  </label>
                  {CATEGORIES.map(cat => (
                    <label key={cat.id} className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shop_category"
                          checked={category === cat.slug}
                          onChange={() => setCategory(cat.slug)}
                          className="accent-[#C62828]"
                        />
                        <span className={category === cat.slug ? 'font-bold text-[#C62828]' : 'text-gray-700'}>
                          {cat.name[locale] || cat.name.fr}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        ({PRODUCTS.filter(p => p.categorySlug === cat.slug).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Curseur de Prix */}
              <div className="pt-4 border-t border-[#F1ECE1]">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Prix maximum</h4>
                  <span className="text-xs font-bold text-[#C62828]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max={region.currency === 'CAD' ? 350 : 250}
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C62828] cursor-pointer"
                />
              </div>

              {/* Destinataire */}
              <div className="pt-4 border-t border-[#F1ECE1]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Destinataire</h4>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setRecipient('all')}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${recipient === 'all' ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                  >
                    Tous
                  </button>
                  {[
                    { id: 'men', name: 'Hommes' },
                    { id: 'women', name: 'Femmes' },
                    { id: 'kids', name: 'Enfants' },
                    { id: 'teens', name: 'Ados' },
                    { id: 'couples', name: 'Couples' },
                  ].map(r => (
                    <button
                      key={r.id}
                      onClick={() => setRecipient(r.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${recipient === r.id ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtres Rapides */}
              <div className="pt-4 border-t border-[#F1ECE1] space-y-2">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyPromo}
                    onChange={(e) => setOnlyPromo(e.target.checked)}
                    className="rounded text-[#C62828] accent-[#C62828]"
                  />
                  <span className="text-gray-700 flex items-center gap-1">Promotions uniquement <Tag className="w-3 h-3 inline text-[#C62828]" /></span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-[#14532D] accent-[#14532D]"
                  />
                  <span className="text-gray-700">En stock uniquement</span>
                </label>
              </div>

            </div>
          </aside>

          {/* CATALOGUE & GRILLE DE PRODUITS */}
          <main className="col-span-1 md:col-span-3">
            
            {/* Barre de tri */}
            <div className="bg-white p-4 rounded-2xl border border-[#F1ECE1] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="text-xs text-gray-500">
                {filteredProducts.length} cadeaux festifs trouvés
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <label htmlFor="shop-sort" className="text-xs text-gray-500 whitespace-nowrap">Trier par :</label>
                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold bg-[#FFFDF8] border border-[#F1ECE1] rounded-xl px-3 py-2 text-[#242424] focus:outline-none focus:border-[#C62828] cursor-pointer w-full sm:w-auto"
                >
                  <option value="popular">Popularité (Avis clients)</option>
                  <option value="price-asc">Prix : Croissant</option>
                  <option value="price-desc">Prix : Décroissant</option>
                  <option value="rating">Meilleures notes (★ 5.0)</option>
                </select>
              </div>
            </div>

            {/* Grille */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-10">
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-[#F1ECE1] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                    >
                      ← Précédent
                    </button>
                    {getVisiblePages().map((page, idx) => (
                      typeof page === 'number' ? (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 120, behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold border transition-colors ${page === currentPage ? 'bg-[#C62828] text-white border-[#C62828]' : 'bg-white text-gray-700 border-[#F1ECE1] hover:bg-gray-50'}`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={idx} className="px-1 text-gray-400 font-bold text-xs select-none">
                          {page}
                        </span>
                      )
                    ))}
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-[#F1ECE1] bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                    >
                      Suivant →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#F1ECE1] shadow-sm">
                <div className="w-16 h-16 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center text-3xl mx-auto mb-4">
                  <Search className="w-7 h-7 text-[#C62828]" />
                </div>
                <h3 className="text-lg font-bold text-[#242424] font-heading">
                  Aucun cadeau ne correspond à ces critères
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2">
                  Essayez d'élargir votre recherche ou de réinitialiser vos filtres.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#C62828] text-white font-bold text-xs shadow hover:bg-[#A71D1D]"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Modal Aperçu Rapide */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">Chargement de la boutique...</div>}>
      <ShopContent />
    </Suspense>
  );
}
