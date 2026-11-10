export type Locale = 'fr' | 'en' | 'de' | 'es';
export type Currency = 'EUR' | 'CAD';
export type CountryCode = 'FR' | 'CA' | 'DE' | 'ES';

export interface RegionConfig {
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  defaultLocale: Locale;
  currency: Currency;
  currencySymbol: string;
}

export interface Category {
  id: string;
  slug: string;
  googleProductCategoryId: number; // Google Shopping taxonomy
  icon: string;
  image: string;
  badge: Record<Locale, string>;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  subcategories: Record<Locale, string[]>;
}

export interface Product {
  id: string;
  sku: string; // Google GMC id
  gtin: string; // Google GMC EAN-13 / UPC
  mpn: string; // Google GMC MPN
  brand: string; // Google GMC brand
  identifierExists: boolean;
  condition: 'new' | 'refurbished';
  googleProductCategory: string; // Google Product Category text or ID
  gender?: 'unisex' | 'male' | 'female';
  ageGroup?: 'adult' | 'kids' | 'toddler' | 'infant';
  color?: string;
  size?: string;
  categorySlug: string;
  recipient: 'men' | 'women' | 'kids' | 'teens' | 'couples';
  budgetTier: 'budget' | 'low' | 'medium' | 'premium';
  
  // Prices in ISO currencies
  priceEur: number;
  oldPriceEur?: number;
  priceCad: number;
  oldPriceCad?: number;
  
  stock: number;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  
  // Images (Clean, high-res, compliant with Google guidelines)
  images: string[];
  
  rating: number;
  reviewsCount: number;
  isBestseller: boolean;
  isPromo: boolean;
  
  // Variants
  options?: {
    colors?: string[];
    sizes?: string[];
    models?: string[];
  };

  // Multilingual translations
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;
  badge: Record<Locale, string>;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  color?: string;
  size?: string;
  model?: string;
  quantity: number;
  currency: Currency;
}

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  country: CountryCode;
  city: string;
  postalCode: string;
  address: string;
  giftNote?: string;
  giftPackaging: boolean;
}

export type PaymentMethodType = 'bank_transfer' | 'gift_card' | 'credit_card';

export interface OrderData {
  orderReference: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  paymentMethod: PaymentMethodType;
  paymentProofUrl?: string;
  giftCardCode?: string;
  subtotal: number;
  shipping: number;
  discount: number;
  promoCode?: string;
  total: number;
  currency: Currency;
  locale: Locale;
  createdAt: string;
}
