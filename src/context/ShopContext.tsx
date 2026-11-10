'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Currency, CountryCode, RegionConfig, CartItem, Product } from '@/types';
import { REGIONS, TRANSLATIONS } from '@/lib/i18n/translations';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error';
}

interface ShopContextType {
  region: RegionConfig;
  setRegionByCountry: (country: CountryCode) => void;
  locale: Locale;
  setLocale: (loc: Locale) => void;
  currency: Currency;
  t: typeof TRANSLATIONS.fr;
  formatPrice: (amount: number) => string;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product, options?: { color?: string; size?: string; model?: string }, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  discount: number;
  promoCode: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  total: number;
  giftPackaging: boolean;
  giftNote: string;
  setGiftOptions: (packaging: boolean, note: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Snow & UI
  snowActive: boolean;
  toggleSnow: () => void;
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<RegionConfig>(REGIONS[0]); // France par défaut
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [giftPackaging, setGiftPackaging] = useState<boolean>(true);
  const [giftNote, setGiftNote] = useState<string>('');
  const [snowActive, setSnowActive] = useState<boolean>(true);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('nlg_next_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('nlg_next_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedSnow = localStorage.getItem('nlg_next_snow');
      if (savedSnow !== null) setSnowActive(JSON.parse(savedSnow));

      const savedRegion = localStorage.getItem('nlg_next_region');
      if (savedRegion) {
        const found = REGIONS.find(r => r.countryCode === savedRegion);
        if (found) {
          setRegion(found);
          setLocaleState(found.defaultLocale);
        }
      }
    } catch (e) {}
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('nlg_next_cart', JSON.stringify(cart));
      localStorage.setItem('nlg_next_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('nlg_next_snow', JSON.stringify(snowActive));
      localStorage.setItem('nlg_next_region', region.countryCode);
    } catch (e) {}
  }, [cart, wishlist, snowActive, region]);

  const setRegionByCountry = (country: CountryCode) => {
    const found = REGIONS.find(r => r.countryCode === country) || REGIONS[0];
    setRegion(found);
    setLocaleState(found.defaultLocale);
    showToast(`Région : ${found.flag} ${found.countryName} (${found.currency})`);
  };

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
  };

  const t = TRANSLATIONS[locale] || TRANSLATIONS.fr;

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, 3500);
  };

  const formatPrice = (amount: number) => {
    const sym = region.currencySymbol;
    if (region.currency === 'CAD') {
      return `$${amount.toFixed(2)} CAD`;
    }
    return `${amount.toFixed(2).replace('.', ',')} €`;
  };

  // CART LOGIC
  const addToCart = (product: Product, options?: { color?: string; size?: string; model?: string }, quantity = 1) => {
    const price = region.currency === 'CAD' ? product.priceCad : product.priceEur;
    const oldPrice = region.currency === 'CAD' ? product.oldPriceCad : product.oldPriceEur;
    const itemKey = `${product.id}_${options?.color || ''}_${options?.size || ''}_${options?.model || ''}_${region.currency}`;

    setCart(prev => {
      const idx = prev.findIndex(i => i.key === itemKey);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: product.id,
          name: product.title[locale] || product.title.fr,
          price,
          oldPrice,
          image: product.images[0],
          color: options?.color,
          size: options?.size,
          model: options?.model,
          quantity,
          currency: region.currency
        }
      ];
    });

    const prodTitle = product.title[locale] || product.title.fr;
    showToast(`🎁 « ${prodTitle} » ${t.common.addedToCart}`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (key: string) => {
    setCart(prev => prev.filter(i => i.key !== key));
  };

  const updateQuantity = (key: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.key === key) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setDiscount(0);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeThreshold = region.currency === 'CAD' ? 70 : 50;
  const standardShipping = region.currency === 'CAD' ? 9.90 : 4.90;
  const shipping = subtotal === 0 || subtotal >= freeThreshold ? 0 : standardShipping;

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: "Code requis" };
    if (subtotal <= 0) return { success: false, message: "Panier vide" };

    if (clean === "NOEL2026") {
      const disc = Math.round(subtotal * 0.15 * 100) / 100;
      setPromoCode(clean);
      setDiscount(disc);
      return { success: true, message: `Code NOEL2026 : -15% (${formatPrice(disc)})` };
    } else {
      return { success: false, message: "Code invalide" };
    }
  };

  const removePromo = () => {
    setPromoCode(null);
    setDiscount(0);
  };

  const total = Math.max(0, subtotal - discount + shipping);

  const setGiftOptions = (packaging: boolean, note: string) => {
    setGiftPackaging(packaging);
    setGiftNote(note);
  };

  // WISHLIST LOGIC
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Retiré des favoris");
        return prev.filter(id => id !== productId);
      } else {
        showToast("💖 Ajouté à votre liste de Noël !");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleSnow = () => {
    setSnowActive(prev => {
      const next = !prev;
      showToast(next ? "❄️ Flocons de neige activés !" : "Flocons désactivés");
      return next;
    });
  };

  return (
    <ShopContext.Provider
      value={{
        region,
        setRegionByCountry,
        locale,
        setLocale,
        currency: region.currency,
        t,
        formatPrice,
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        discount,
        promoCode,
        applyPromo,
        removePromo,
        total,
        giftPackaging,
        giftNote,
        setGiftOptions,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        snowActive,
        toggleSnow,
        toasts,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
