-- ============================================================================
-- NOËL GIFT SHOP - SCHEMA SUPABASE & GOOGLE MERCHANT CENTER COMPLIANCE
-- ============================================================================

-- 1. Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Table des Catégories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  google_product_category_id INT DEFAULT 0, -- ID officiel Google Shopping Taxonomy
  icon TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Traductions des Catégories (FR, EN, DE, ES)
CREATE TABLE IF NOT EXISTS public.category_translations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  locale TEXT NOT NULL, -- 'fr', 'en', 'de', 'es'
  name TEXT NOT NULL,
  description TEXT,
  badge TEXT,
  subcategories TEXT[],
  UNIQUE(category_id, locale)
);

-- 4. Table des Produits (Conforme aux spécifications Google Merchant Center 2026)
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL, -- [Google GMC: id]
  category_id UUID REFERENCES public.categories(id),
  brand TEXT NOT NULL DEFAULT 'NOËL GIFT SHOP', -- [Google GMC: brand]
  gtin TEXT, -- [Google GMC: gtin] Code EAN-13 / UPC
  mpn TEXT,  -- [Google GMC: mpn] Numéro de référence fabricant
  identifier_exists BOOLEAN DEFAULT TRUE, -- [Google GMC: identifier_exists]
  condition TEXT DEFAULT 'new', -- [Google GMC: condition] 'new', 'refurbished'
  gender TEXT DEFAULT 'unisex', -- [Google GMC: gender] 'unisex', 'male', 'female'
  age_group TEXT DEFAULT 'adult', -- [Google GMC: age_group] 'adult', 'kids', 'toddler', 'infant'
  color TEXT, -- [Google GMC: color]
  size TEXT,  -- [Google GMC: size]
  recipient TEXT NOT NULL, -- 'men', 'women', 'kids', 'teens', 'couples'
  
  -- Prix ISO 4217 pour les marchés cibles (France/Europe: EUR, Canada: CAD)
  price_eur NUMERIC(10, 2) NOT NULL, -- [Google GMC: price] Ex: 49.99 EUR
  old_price_eur NUMERIC(10, 2),
  price_cad NUMERIC(10, 2) NOT NULL, -- [Google GMC: price] Ex: 69.99 CAD
  old_price_cad NUMERIC(10, 2),
  
  stock_quantity INT DEFAULT 20,
  availability TEXT DEFAULT 'in_stock', -- [Google GMC: availability] 'in_stock', 'out_of_stock'
  
  -- Images (Images conformes Google sans filigrane ni texte promotionnel)
  primary_image_url TEXT NOT NULL, -- [Google GMC: image_link]
  additional_images TEXT[] DEFAULT ARRAY[]::TEXT[], -- [Google GMC: additional_image_link]
  
  rating NUMERIC(2, 1) DEFAULT 4.9,
  reviews_count INT DEFAULT 120,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_promo BOOLEAN DEFAULT FALSE,
  budget_tier TEXT DEFAULT 'medium', -- 'budget', 'low', 'medium', 'premium'
  options_colors TEXT[],
  options_sizes TEXT[],
  options_models TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Traductions des Produits (FR, EN, DE, ES)
CREATE TABLE IF NOT EXISTS public.product_translations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL, -- [Google GMC: title] Max 150 caractères, sans spam
  description TEXT NOT NULL, -- [Google GMC: description]
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  badge TEXT,
  UNIQUE(product_id, locale)
);

-- 6. Table des Commandes
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_reference TEXT UNIQUE NOT NULL, -- Ex: NLG-2026-7891
  locale TEXT NOT NULL DEFAULT 'fr',
  currency TEXT NOT NULL DEFAULT 'EUR',
  
  -- Client & Livraison
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  country TEXT NOT NULL, -- 'FR', 'CA', 'DE', 'ES'
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  gift_note TEXT,
  
  -- Méthode de paiement & Preuve
  payment_method TEXT NOT NULL, -- 'bank_transfer', 'gift_card', 'credit_card'
  payment_status TEXT DEFAULT 'pending_verification', -- 'pending_verification', 'confirmed', 'rejected'
  proof_url TEXT, -- Lien du fichier ou photo de la carte cadeau / virement stocké dans Supabase Storage
  gift_card_code TEXT, -- Code saisi par l'utilisateur
  
  -- Tarifs
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_cost NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0,
  promo_code TEXT,
  total NUMERIC(10, 2) NOT NULL,
  
  status TEXT DEFAULT 'processing', -- 'processing', 'preparing', 'shipped', 'delivered', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Lignes de Commandes
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  color TEXT,
  size TEXT,
  model TEXT,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  total_price NUMERIC(10, 2) NOT NULL
);

-- 8. Configuration Storage Supabase
-- Créer un bucket nommé 'payment-proofs' pour les justificatifs de virement et photos de cartes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-proofs', 'payment-proofs', false)
ON CONFLICT (id) DO NOTHING;

-- RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour les produits et catégories (pour Googlebot et utilisateurs)
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Product Translations" ON public.product_translations FOR SELECT USING (true);
CREATE POLICY "Public Read Category Translations" ON public.category_translations FOR SELECT USING (true);

-- Création de commande par l'acheteur
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON public.order_items FOR INSERT WITH CHECK (true);
