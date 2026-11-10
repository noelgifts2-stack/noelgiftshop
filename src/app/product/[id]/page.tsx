'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductJsonLd from '@/components/ProductJsonLd';
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  Gift, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  Phone,
  Check,
  Zap
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();
  const { region, locale, t, formatPrice, addToCart, isInWishlist, toggleWishlist } = useShop();

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return notFound();

  const category = CATEGORIES.find(c => c.slug === product.categorySlug);
  const relatedProducts = PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const title = product.title[locale] || product.title.fr;
  const description = product.description[locale] || product.description.fr;
  const features = product.features[locale] || product.features.fr;
  const badge = product.badge[locale] || product.badge.fr;
  const price = region.currency === 'CAD' ? product.priceCad : product.priceEur;
  const oldPrice = region.currency === 'CAD' ? product.oldPriceCad : product.oldPriceEur;

  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.options?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.options?.sizes?.[0]);
  const [selectedModel, setSelectedModel] = useState<string | undefined>(product.options?.models?.[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews' | 'shipping'>('features');

  const inWishlist = isInWishlist(product.id);

  // WhatsApp pre-filled text
  const whatsappText = `Bonjour NOËL GIFT SHOP ! 🎅\nJe souhaite commander directement cet article :\n\n` +
    `🎁 *${title}*\n` +
    `💰 Prix : ${formatPrice(price)}\n` +
    `🔗 Réf / SKU : ${product.sku}\n` +
    (selectedColor ? `🎨 Couleur : ${selectedColor}\n` : '') +
    (selectedSize ? `📏 Taille : ${selectedSize}\n` : '') +
    `\nPourriez-vous me confirmer la disponibilité et le délai de livraison ? Merci !`;

  const whatsappUrl = `https://wa.me/33600000000?text=${encodeURIComponent(whatsappText)}`;

  const handleBuyNow = () => {
    addToCart(product, { color: selectedColor, size: selectedSize, model: selectedModel }, quantity);
    router.push('/checkout');
  };

  return (
    <div>
      {/* BALISAGE JSON-LD OFFICIEL GOOGLE MERCHANT CENTER */}
      <ProductJsonLd
        product={product}
        locale={locale}
        currency={region.currency}
      />

      {/* Fil d'Ariane */}
      <div className="bg-[#FFFDF8] py-6 border-b border-[#F1ECE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500">
            <Link href="/" className="hover:text-[#C62828]">{t.common.home}</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-[#C62828]">{t.common.shop}</Link>
            <span className="mx-2">/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-[#C62828]">
                  {category.name[locale] || category.name.fr}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-[#242424] font-semibold truncate max-w-xs">{title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* GALERIE PHOTOS HAUTE DÉFINITION CONFORME GOOGLE */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#F1ECE1] shadow-md aspect-square max-h-[520px]">
              <img
                src={activeImage}
                alt={title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-[#C62828] text-white text-xs font-bold shadow-md">
                  {badge}
                </span>
                {oldPrice && (
                  <span className="px-3 py-1 rounded-full bg-[#F4C542] text-[#242424] text-xs font-black shadow-md">
                    -{Math.round((1 - price / oldPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Bouton Favoris */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-gray-700 hover:text-[#C62828] flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                title="Ajouter aux favoris"
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-[#C62828] text-[#C62828]' : ''}`} />
              </button>
            </div>

            {/* Miniatures */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === img ? 'border-[#C62828]' : 'border-transparent opacity-75 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${title} ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* INFOS PRODUIT & COMMANDE */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#F4C542] text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#242424]">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewsCount} {t.common.reviews})</span>
                <span className="mx-1 text-gray-300">•</span>
                <span className="text-xs text-[#14532D] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  {t.common.inStock}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-heading leading-tight">
                {title}
              </h1>

              {/* Attributs Google Merchant Center Visibles */}
              <div className="flex items-center gap-4 text-[11px] text-gray-400 mt-2 font-mono">
                <span>SKU: {product.sku}</span>
                <span>EAN: {product.gtin}</span>
              </div>

              {/* Prix */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#C62828] font-heading">
                  {formatPrice(price)}
                </span>
                {oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Options & Variantes */}
            <div className="space-y-4 pt-4 border-t border-[#F1ECE1]">
              {product.options?.colors && (
                <div>
                  <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">
                    {t.product.colorLabel} :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.options.colors.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${selectedColor === c ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.options?.sizes && (
                <div>
                  <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">
                    {t.product.sizeLabel} :
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.options.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${selectedSize === s ? 'bg-[#C62828] text-white border-[#C62828]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stepper Quantité */}
              <div>
                <label className="block text-xs font-bold text-[#242424] uppercase tracking-wider mb-2">
                  {t.product.quantity} :
                </label>
                <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-[#242424]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Boutons d'Action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => addToCart(product, { color: selectedColor, size: selectedSize, model: selectedModel }, quantity)}
                className="w-full py-4 rounded-xl font-bold text-white bg-[#C62828] hover:bg-[#A71D1D] shadow-lg flex items-center justify-center gap-3 text-base transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-[#F4C542]" />
                <span>{t.common.addToCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl font-bold text-[#242424] bg-[#F4C542] hover:bg-[#E5B535] shadow-md flex items-center justify-center gap-2 text-sm transition-all"
              >
                <Zap className="w-4 h-4 text-[#C62828]" />
                <span>{t.common.buyNow}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] shadow-md flex items-center justify-center gap-2 text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{t.common.orderWhatsApp}</span>
              </a>
            </div>

            {/* Rassurance */}
            <div className="rounded-2xl bg-white border border-[#F1ECE1] p-4 space-y-3 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#14532D]" />
                <span><strong>Livraison garantie</strong> : sous 24h à 48h partout en {region.countryName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-[#C62828]" />
                <span><strong>Emballage de Noël offert</strong> avec ruban satin et carte manuscrite</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#F4C542]" />
                <span><strong>Retour sous 14 jours</strong> sans motif si le cadeau ne convient pas</span>
              </div>
            </div>

          </div>
        </div>

        {/* ONGLETS CARACTÉRISTIQUES / AVIS */}
        <div className="mt-14 bg-white rounded-3xl border border-[#F1ECE1] p-6 sm:p-8 shadow-sm">
          <div className="border-b border-[#F1ECE1] pb-4 mb-6 flex gap-6 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-4 transition-colors ${activeTab === 'features' ? 'text-[#C62828] border-b-2 border-[#C62828]' : 'text-gray-400 hover:text-gray-700'}`}
            >
              {t.product.featuresTitle}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 transition-colors ${activeTab === 'reviews' ? 'text-[#C62828] border-b-2 border-[#C62828]' : 'text-gray-400 hover:text-gray-700'}`}
            >
              Avis Clients ({product.reviewsCount})
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 transition-colors ${activeTab === 'shipping' ? 'text-[#C62828] border-b-2 border-[#C62828]' : 'text-gray-400 hover:text-gray-700'}`}
            >
              Livraison & Retours
            </button>
          </div>

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-700">
              <div>
                <h4 className="font-bold text-[#242424] mb-3">Spécifications officielles :</h4>
                <ul className="space-y-2">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#14532D] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FFFDF8] p-5 rounded-2xl border border-[#F1ECE1]">
                <h4 className="font-bold text-[#242424] mb-2">{t.product.guaranteesTitle} :</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Chaque article est minutieusement vérifié et préparé à la main avant expédition. Vous recevez un emballage cadeau raffiné prêt à être déposé directement sous le sapin de Noël avec le message de votre choix.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50">
                <div className="text-3xl font-black text-[#242424]">{product.rating} / 5</div>
                <div>
                  <div className="flex text-[#F4C542]">★★★★★</div>
                  <p className="text-xs text-gray-500 mt-0.5">Basé sur {product.reviewsCount} avis certifiés conformes Google</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-xs sm:text-sm text-gray-600 space-y-2">
              <p>• <strong>Délais de livraison :</strong> 24h à 48h ouvrées en France et en Europe, 48h à 72h au Canada.</p>
              <p>• <strong>Transporteurs partenaires :</strong> Colissimo, DHL Express, FedEx, UPS.</p>
              <p>• <strong>Droit de rétractation :</strong> 14 jours à compter de la réception du colis.</p>
            </div>
          )}
        </div>

        {/* PRODUITS SIMILAIRES */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-[#242424] font-heading mb-6">
              {t.product.similarTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
