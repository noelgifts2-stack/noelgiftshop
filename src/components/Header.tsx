'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { Locale } from '@/types';
import { 
  Gift, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Phone,
  Snowflake,
  Home,
  Zap
} from 'lucide-react';

export default function Header() {
  const { 
    region, 
    locale, 
    setLocale, 
    t, 
    cartCount, 
    wishlist, 
    toggleSnow, 
    snowActive,
    setIsCartDrawerOpen,
    formatPrice
  } = useShop();

  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  // Search filtered products
  const searchResults = searchQuery.trim().length >= 2 
    ? PRODUCTS.filter(p => {
        const q = searchQuery.toLowerCase();
        const title = (p.title[locale] || p.title.fr).toLowerCase();
        const desc = (p.description[locale] || p.description.fr).toLowerCase();
        return title.includes(q) || desc.includes(q);
      }).slice(0, 5)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* 1. TOP TICKER / BANDEAU SUPÉRIEUR */}
      <div className="bg-gradient-to-r from-[#C62828] via-[#A71D1D] to-[#C62828] text-white text-xs py-1.5 px-3 shadow-sm border-b border-[#F4C542]/40 relative z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">

          {/* Message livraison */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles className="w-3 h-3 text-[#F4C542] animate-pulse flex-shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs truncate">
              {t.common.freeShippingAlert}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Sélecteur de Langue */}
            <div className="flex items-center gap-0.5 bg-black/20 rounded-lg px-1 py-0.5">
              {(['fr', 'en', 'de', 'es'] as Locale[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${locale === l ? 'bg-[#F4C542] text-[#242424]' : 'text-gray-300 hover:text-white'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Bouton Neige — visible sur mobile et desktop */}
            <button
              onClick={toggleSnow}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] transition-colors ${snowActive ? 'bg-white/20 text-[#F4C542]' : 'bg-black/20 text-gray-300'}`}
              title={t.common.snowToggle}
            >
              <Snowflake className="w-3 h-3" />
              <span className="hidden sm:inline">{t.common.snowToggle}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <header className="sticky top-0 z-30 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#F1ECE1] shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="flex items-center h-16 sm:h-18 lg:h-20 gap-2 sm:gap-3">

            {/* Hamburger — mobile & tablette */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-[#C62828] hover:bg-red-50 flex-shrink-0"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#C62828] to-[#991B1B] text-[#F4C542] flex items-center justify-center shadow-md border border-[#F4C542]/40 group-hover:scale-105 transition-transform">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4C542]" />
              </div>
              <div className="hidden xs:block">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-base sm:text-lg lg:text-xl font-heading tracking-tight text-[#C62828]">NOËL</span>
                  <span className="font-bold text-base sm:text-lg lg:text-xl font-heading text-[#14532D]">GIFT</span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-[#D4A017] font-bold tracking-widest uppercase -mt-0.5 hidden sm:block">
                  {t.common.tagline}
                </p>
              </div>
            </Link>

            {/* BARRE DE RECHERCHE — masquée sur xs, visible sm+ */}
            <div className="hidden sm:block flex-1 max-w-xs md:max-w-md lg:max-w-lg relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  placeholder={t.common.searchPlaceholder}
                  className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-full bg-white border border-[#F1ECE1] focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 focus:outline-none shadow-sm transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 p-1.5 rounded-full bg-[#C62828] text-white hover:bg-[#A71D1D] transition-colors"
                >
                  <Search className="w-3 h-3" />
                </button>
              </form>

              {/* Suggestions dropdown */}
              {searchFocused && searchQuery.trim().length >= 2 && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-[#F1ECE1] z-50 overflow-hidden"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {searchResults.length > 0 ? (
                    <div className="p-2 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-gray-400 px-3 py-1">Suggestions :</div>
                      {searchResults.map(p => (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}`}
                          onClick={() => setSearchFocused(false)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FFF9F0] cursor-pointer transition-colors"
                        >
                          <img src={p.images[0]} alt={p.title[locale]} className="w-10 h-10 object-cover rounded-lg border flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#242424] truncate">{p.title[locale] || p.title.fr}</p>
                            <p className="text-[11px] text-[#C62828] font-bold">
                              {formatPrice(region.currency === 'CAD' ? p.priceCad : p.priceEur)}
                            </p>
                          </div>
                        </Link>
                      ))}
                      <div className="pt-1 border-t border-gray-100 text-center">
                        <button
                          onClick={handleSearchSubmit}
                          className="text-xs text-[#C62828] font-bold py-1.5 hover:underline"
                        >
                          {t.common.seeAllResults} ({searchResults.length}) →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-500">
                      {t.common.noResults} « {searchQuery} »
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* NAVIGATION DESKTOP */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-[#242424] flex-shrink-0">
              <Link href="/" className="hover:text-[#C62828] transition-colors whitespace-nowrap">
                {t.common.home}
              </Link>
              <Link href="/shop" className="hover:text-[#C62828] transition-colors whitespace-nowrap">
                {t.common.shop}
              </Link>

              {/* Menu déroulant Catégories */}
              <div className="relative group">
                <button className="hover:text-[#C62828] transition-colors flex items-center gap-1 whitespace-nowrap">
                  <span>{t.common.categories}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#C62828] transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#F1ECE1] p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="text-[10px] font-bold uppercase text-gray-400 px-3 py-1">Nos 10 Rayons</div>
                  <div className="grid grid-cols-1 gap-0.5 mt-1">
                    {CATEGORIES.map(cat => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-1.5 rounded-xl text-xs hover:bg-[#FFF9F0] hover:text-[#C62828] transition-colors"
                      >
                        <span className="font-medium">{cat.name[locale] || cat.name.fr}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-bold">
                          {cat.badge[locale] || cat.badge.fr}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/shop?promo=true" className="hover:text-[#C62828] transition-colors flex items-center gap-1 text-[#C62828] whitespace-nowrap">
                <span>{t.common.promotions}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#C62828] text-white text-[10px] font-bold animate-pulse">PROMO</span>
              </Link>
              <Link href="/contact" className="hover:text-[#C62828] transition-colors whitespace-nowrap">
                {t.common.contact}
              </Link>
            </nav>

            {/* ACTIONS : Compte, Favoris, Panier */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-auto lg:ml-0">
              {/* Recherche mobile — icône cliquable sur xs */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="sm:hidden p-2 rounded-xl text-gray-600 hover:text-[#C62828] hover:bg-red-50 transition-colors"
                aria-label="Recherche"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Compte Utilisateur — masqué sur mobile, visible sm+ */}
              <button
                onClick={() => setUserModalOpen(true)}
                className="hidden sm:flex p-2 rounded-xl text-gray-700 hover:text-[#C62828] hover:bg-gray-100 transition-colors"
                title={t.common.account}
              >
                <User className="w-5 h-5" />
              </button>

              {/* Favoris — masqué sur mobile */}
              <Link
                href="/shop?wishlist=true"
                className="relative hidden sm:flex p-2 rounded-xl text-gray-700 hover:text-[#C62828] hover:bg-gray-100 transition-colors"
                title={t.common.wishlist}
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#C62828] text-[#C62828]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#14532D] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Bouton Panier */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#C62828] text-white hover:bg-[#A71D1D] shadow-md transition-all hover:-translate-y-0.5"
                title={t.common.cart}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4C542]" />
                <span className="hidden md:inline text-xs font-bold">{t.common.cart}</span>
                <span className="w-5 h-5 rounded-full bg-[#F4C542] text-[#242424] text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* BARRE DE RECHERCHE MOBILE — sous le header sur xs uniquement */}
        <div className="sm:hidden px-3 pb-2.5 border-t border-[#F1ECE1] pt-2 bg-[#FFFDF8]/95">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
              placeholder={t.common.searchPlaceholder}
              className="w-full pl-9 pr-10 py-2 text-xs rounded-full bg-white border border-[#F1ECE1] focus:border-[#C62828] focus:outline-none shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <button type="submit" className="absolute right-2 top-1.5 p-1.5 rounded-full bg-[#C62828] text-white">
              <Search className="w-3 h-3" />
            </button>
          </form>
          {searchFocused && searchQuery.trim().length >= 2 && searchResults.length > 0 && (
            <div className="mt-2 bg-white rounded-2xl shadow-xl border border-[#F1ECE1] overflow-hidden">
              {searchResults.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  onClick={() => setSearchFocused(false)}
                  className="flex items-center gap-3 p-2.5 border-b border-gray-50 hover:bg-[#FFF9F0]"
                >
                  <img src={p.images[0]} alt={p.title[locale]} className="w-9 h-9 object-cover rounded-lg border flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#242424] truncate">{p.title[locale] || p.title.fr}</p>
                    <p className="text-[11px] text-[#C62828] font-bold">{formatPrice(region.currency === 'CAD' ? p.priceCad : p.priceEur)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 3. MENU MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-80 max-w-[85vw] bg-[#FFFDF8] h-full shadow-2xl flex flex-col z-10">
            <div className="p-5 bg-[#C62828] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#F4C542]" />
                <span className="font-bold text-base font-heading">Menu de Noël</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-semibold text-[#242424]">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-red-50 hover:text-[#C62828]"
              >
                <Home className="w-4 h-4 mr-1.5 inline-block align-text-bottom" /> {t.common.home}
              </Link>
              <Link 
                href="/shop" 
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-red-50 hover:text-[#C62828]"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5 inline-block align-text-bottom" /> {t.common.shop}
              </Link>
              <Link 
                href="/shop?promo=true" 
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-red-50 text-[#C62828]"
              >
                <Zap className="w-4 h-4 mr-1.5 inline-block align-text-bottom" /> {t.common.promotions}
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 rounded-xl hover:bg-red-50 hover:text-[#C62828]"
              >
                <Phone className="w-4 h-4 mr-1.5 inline-block align-text-bottom" /> {t.common.contact}
              </Link>

              <div className="pt-4 border-t border-gray-200">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-2 px-2">
                  {t.common.categories} :
                </span>
                <div className="space-y-1">
                  {CATEGORIES.map(c => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1.5 rounded-lg text-xs hover:bg-gray-100 text-gray-700"
                    >
                      {c.name[locale] || c.name.fr}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <a 
                href="https://wa.me/33600000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp International</span>
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* 4. MODAL ESPACE CLIENT */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-[#F4C542] relative animate-in fade-in">
            <button
              onClick={() => setUserModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg"
            >
              ×
            </button>
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#C62828] flex items-center justify-center text-2xl mx-auto mb-2">
                <User className="w-5 h-5 text-[#C62828]" />
              </div>
              <h3 className="text-lg font-bold text-[#242424] font-heading">{t.common.account}</h3>
              <p className="text-xs text-gray-500 mt-1">Suivez vos commandes et téléchargez vos factures</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setUserModalOpen(false); }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  placeholder="client@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C62828]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C62828] text-white font-bold text-xs hover:bg-[#A71D1D] shadow mt-2"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
