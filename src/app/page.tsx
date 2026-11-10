'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import QuickViewModal from '@/components/QuickViewModal';
import { 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Gift, 
  Headphones, 
  ArrowRight,
  Star
} from 'lucide-react';

export default function HomePage() {
  const { t, locale, region } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Compte à rebours jusqu'au 25 décembre 2026
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30, secs: 15 });

  useEffect(() => {
    const target = new Date('2026-12-25T00:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const bestSellers = PRODUCTS.filter(p => p.isBestseller);
  const promoProducts = PRODUCTS.filter(p => p.isPromo);

  return (
    <div>
      {/* 1. HERO BANNER FESTIF */}
      <section className="relative bg-gradient-to-br from-[#14532D] via-[#0D381E] to-[#0A2614] text-white overflow-hidden py-10 sm:py-14 lg:py-20 border-b-4 border-[#F4C542]">
        {/* Sapin de Noël lumineux réaliste net et éclatant en arrière-plan */}
        <div className="absolute right-0 bottom-0 top-0 w-full sm:w-2/3 lg:w-1/2 pointer-events-none opacity-45 sm:opacity-60 lg:opacity-75 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=1600&q=95"
            alt="Sapin de Noël lumineux"
            className="w-full h-full object-cover object-right-bottom filter contrast-110 drop-shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D381E] via-[#0D381E]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2614] via-transparent to-transparent" />
        </div>

        <div className="absolute -right-24 -top-24 w-72 sm:w-96 h-72 sm:h-96 bg-[#C62828]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-60 sm:w-80 h-60 sm:h-80 bg-[#F4C542]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading leading-tight tracking-tight">
                {t.hero.title1}{' '}
                <span className="text-gold-gradient">{t.hero.title2}</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#FFFDF8]/90 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Boutons CTA */}
              <div className="flex flex-col xs:flex-row gap-3 justify-center lg:justify-start pt-1">
                <Link
                  href="/shop"
                  className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base border border-[#F4C542]/30 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4C542]" />
                  <span>{t.hero.ctaShop}</span>
                </Link>
                <Link
                  href="/shop?promo=true"
                  className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-[#242424] bg-[#F4C542] hover:bg-[#E5B535] shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base transition-all"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#C62828]" />
                  <span>{t.hero.ctaPromo}</span>
                </Link>
              </div>

              {/* Compte à rebours */}
              <div className="pt-4 sm:pt-6 border-t border-white/15">
                <div className="text-xs uppercase tracking-wider text-[#F4C542] font-semibold mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{t.hero.countdownTitle}</span>
                </div>
                <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
                  {[
                    { val: timeLeft.days, label: t.common.days, color: 'text-white' },
                    { val: timeLeft.hours, label: t.common.hours, color: 'text-[#F4C542]' },
                    { val: timeLeft.mins, label: t.common.mins, color: 'text-white' },
                    { val: timeLeft.secs, label: t.common.secs, color: 'text-[#F4C542]' },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/35 backdrop-blur px-2.5 sm:px-3.5 py-2 rounded-xl border border-white/10 text-center min-w-[52px] sm:min-w-[62px]">
                      <span className={`block text-xl sm:text-2xl font-black ${item.color}`}>{item.val}</span>
                      <span className="text-[9px] sm:text-[10px] text-gray-300 uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Hero — masquée sur très petits écrans, visible md+ */}
            <div className="lg:col-span-5 relative hidden md:block">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F4C542]/50 group">
                <img
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"
                  alt="Cadeaux de Noël"
                  className="w-full h-[380px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold w-max mb-2">
                    Collection Festive 2026
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-white font-heading">Coffrets Cadeaux & Merveilles</p>
                  <p className="text-xs text-gray-200 mt-1">Prêts à être déposés au pied de votre sapin</p>
                </div>
              </div>

              {/* Pastille code promo */}
              <div className="absolute -bottom-4 left-4 bg-white text-[#242424] p-3 rounded-2xl shadow-xl border-2 border-[#C62828] flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-[#C62828]/10 text-[#C62828] flex items-center justify-center">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">{t.hero.promoCodeLabel}</p>
                  <p className="text-sm font-bold text-[#C62828]">
                    <span className="bg-[#C62828]/10 px-1.5 py-0.5 rounded text-black font-mono">NOEL2026</span> : -15%
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION AVANTAGES */}
      <section className="py-6 sm:py-8 bg-white border-b border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#14532D]" />, bg: 'bg-[#14532D]/10', title: t.benefits.fastShippingTitle, desc: t.benefits.fastShippingDesc },
              { icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#C62828]" />, bg: 'bg-[#C62828]/10', title: t.benefits.securePaymentTitle, desc: t.benefits.securePaymentDesc },
              { icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#A67C00]" />, bg: 'bg-[#F4C542]/20', title: t.benefits.giftWrapTitle, desc: t.benefits.giftWrapDesc },
              { icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#128C7E]" />, bg: 'bg-[#25D366]/15', title: t.benefits.supportTitle, desc: t.benefits.supportDesc },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1]">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${b.bg} flex items-center justify-center flex-shrink-0`}>
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#242424] leading-tight">{b.title}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 hidden sm:block">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION 10 CATÉGORIES POPULAIRES */}
      <section className="py-14 sm:py-18 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#C62828] text-xs font-bold tracking-widest uppercase">
              {t.categories.subtitle}
            </span>
            <h2 className="text-3xl font-extrabold text-[#242424] font-heading mt-1">
              {t.categories.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {t.categories.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#F1ECE1] shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.name[locale]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#14532D] text-[#F4C542] text-[10px] font-bold">
                    {cat.badge[locale] || cat.badge.fr}
                  </span>
                </div>
                <div className="p-3 text-center flex-1 flex flex-col justify-center bg-white group-hover:bg-[#FFF9F0] transition-colors">
                  <h3 className="font-bold text-xs sm:text-sm text-[#242424] group-hover:text-[#C62828] transition-colors line-clamp-1">
                    {cat.name[locale] || cat.name.fr}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {t.categories.discover} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION MEILLEURES VENTES */}
      <section className="py-10 sm:py-14 bg-white border-y border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div>
              <span className="text-[#C62828] text-xs font-bold tracking-widest uppercase">
                {t.bestSellers.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading mt-1">
                {t.bestSellers.title}
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-bold text-[#C62828] hover:text-[#A71D1D] flex items-center gap-1 group flex-shrink-0"
            >
              <span>{t.bestSellers.viewAll}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {bestSellers.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BANNIÈRE VENTE FLASH */}
      <section className="py-10 sm:py-14 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#C62828] via-[#B22222] to-[#8B0000] text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden mb-8 sm:mb-10 border-2 border-[#F4C542]">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F4C542] text-[#242424] text-xs font-extrabold uppercase mb-3">
                {t.flashPromo.tag}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white">
                {t.flashPromo.title}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-gray-200 mt-2 font-light">
                {t.flashPromo.desc}
              </p>
              <div className="mt-5 sm:mt-6 flex flex-wrap gap-3 sm:gap-4 items-center">
                <Link
                  href="/shop?promo=true"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white text-[#C62828] font-bold text-sm hover:bg-[#FFF3B0] shadow-md transition-colors"
                >
                  {t.flashPromo.cta}
                </Link>
                <span className="text-xs font-semibold text-[#F4C542]">
                  {t.flashPromo.stockAlert}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {promoProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CADEAUX PAR DESTINATAIRE */}
      <section className="py-10 sm:py-14 bg-white border-y border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[#14532D] text-xs font-bold tracking-widest uppercase">
              {t.recipients.subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading mt-1">
              {t.recipients.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              {t.recipients.desc}
            </p>
          </div>

          {/* Scroll horizontal sur mobile, grille sur md+ */}
          <div className="flex gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 snap-x snap-mandatory">
            {[
              { id: 'men', name: t.recipients.men, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
              { id: 'women', name: t.recipients.women, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
              { id: 'kids', name: t.recipients.kids, img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80' },
              { id: 'teens', name: t.recipients.teens, img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80' },
              { id: 'couples', name: t.recipients.couples, img: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80' },
            ].map(rec => (
              <Link
                key={rec.id}
                href={`/shop?recipient=${rec.id}`}
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-[#F1ECE1] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white flex-shrink-0 w-40 sm:w-auto snap-start"
              >
                <div className="h-36 sm:h-44 w-full overflow-hidden relative">
                  <img src={rec.img} alt={rec.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                    <h3 className="font-bold text-xs sm:text-sm leading-tight font-heading">{rec.name}</h3>
                    <p className="text-[10px] sm:text-[11px] text-[#F4C542] mt-0.5">Idées cadeaux →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SECTION PETITS BUDGETS */}
      <section className="py-14 bg-[#FFFDF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#C62828] text-xs font-bold tracking-widest uppercase">
              {t.budget.subtitle}
            </span>
            <h2 className="text-3xl font-extrabold text-[#242424] font-heading mt-1">
              {t.budget.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {t.budget.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { id: 'tier1', title: t.budget.tier1, desc: t.budget.tier1Desc },
              { id: 'tier2', title: t.budget.tier2, desc: t.budget.tier2Desc },
              { id: 'tier3', title: t.budget.tier3, desc: t.budget.tier3Desc },
              { id: 'tier4', title: t.budget.tier4, desc: t.budget.tier4Desc },
            ].map(b => (
              <Link
                key={b.id}
                href={`/shop?budget=${b.id}`}
                className="p-6 rounded-2xl bg-white border border-[#F1ECE1] shadow-sm hover:border-[#C62828] hover:-translate-y-1 transition-all text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF5E6] text-[#C62828] flex items-center justify-center text-2xl group-hover:bg-[#C62828] group-hover:text-white transition-colors mb-4">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#242424] group-hover:text-[#C62828] font-heading">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{b.desc}</p>
                <span className="inline-block mt-4 text-xs font-bold text-[#14532D] group-hover:underline">
                  {t.budget.viewSelection} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. AVIS CLIENTS */}
      <section className="py-14 bg-white border-t border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex justify-center text-[#F4C542] text-xl gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading">
              Plus de 2 500 cadeaux livrés avec enchantement
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Des retours élogieux en France, au Canada, en Allemagne et en Espagne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] shadow-sm space-y-3">
              <div className="flex gap-0.5 text-[#F4C542]">{[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
              <p className="text-xs sm:text-sm text-gray-700 italic">
                « Le coffret prestige est tout simplement sublime. L'emballage avec le ruban doré et le mot doux a fait sensation le soir du réveillon à Paris ! »
              </p>
              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#242424]">Camille L. (France 🇫🇷)</h4>
                <p className="text-[11px] text-gray-400">Coffret Prestige Étoile de Noël</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] shadow-sm space-y-3">
              <div className="flex gap-0.5 text-[#F4C542]">{[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
              <p className="text-xs sm:text-sm text-gray-700 italic">
                « Fast delivery to Montreal! The gold automatic chronograph watch arrived in a beautiful wooden box. Highly recommended for holiday gifts. »
              </p>
              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#242424]">Marc D. (Canada 🇨🇦)</h4>
                <p className="text-[11px] text-gray-400">Men's Automatic Chronograph</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#F1ECE1] shadow-sm space-y-3">
              <div className="flex gap-0.5 text-[#F4C542]">{[...Array(5)].map((_,i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
              <p className="text-xs sm:text-sm text-gray-700 italic">
                « Der riesige Teddybär war das Highlight für unsere Kinder. Wunderschöne Qualität und reibungslose Zahlungsabwicklung per Überweisung. »
              </p>
              <div className="pt-2">
                <h4 className="text-xs font-bold text-[#242424]">Hannah W. (Deutschland 🇩🇪)</h4>
                <p className="text-[11px] text-gray-400">Riesen-Teddybär 120cm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Aperçu Rapide */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
