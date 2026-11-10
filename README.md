# 🎅 NOËL GIFT SHOP – Application E-Commerce Next.js & Supabase

> Boutique e-commerce professionnelle pour Noël 2026, **100% conforme aux exigences de Google Merchant Center**, conçue avec **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase** et un système d'**internationalisation avancée (France 🇫🇷, Canada 🇨🇦, Allemagne 🇩🇪, Espagne 🇪🇸)**.

---

## 🚀 1. Démarrage Rapide

### Mode Développement
```bash
npm run dev
```
Rendez-vous sur [http://localhost:3000](http://localhost:3000).

### Build de Production
```bash
npm run build
npm start
```

---

## 🛒 2. Conformité Google Merchant Center (GMC 2026)

Le projet intègre les exigences officielles pour éviter tout rejet lors de l'examen par Google :

1. **Balisage structuré JSON-LD Schema.org sur chaque page produit :**
   - Composant [`ProductJsonLd`](file:///d:/Private/ventesnoel/src/components/ProductJsonLd.tsx) injectant `@type: Product`, `@type: Offer`, SKU, GTIN-13, MPN, Brand, Condition, Availability, ReturnPolicy et ShippingDetails.
   - Visible par les robots `Google-StoreBot` et `Googlebot-Image`.
2. **Attributs obligatoires intégrés dans le catalogue :**
   - `sku` (ID stable et unique)
   - `gtin` (Code-barres officiel EAN-13 à 13 chiffres)
   - `mpn` (Référence fabricant)
   - `brand` (Marque déclarée)
   - `price` et `currency` aux normes ISO 4217 (EUR € pour l'Europe, CAD $ pour le Canada)
   - `googleProductCategory` issu de la taxonomie officielle Google
   - Images haute résolution sans filigrane ni texte promotionnel
3. **Générateur de Flux XML Automatique Google Shopping :**
   - Route API : `/api/google-merchant/feed?country=FR` (ou `CA`, `DE`, `ES`)
   - Permet de planifier la récupération automatique du flux directement dans la console Google Merchant Center sans aucune manipulation manuelle.

---

## 🌍 3. Internationalisation Avancée (4 Pays / 4 Langues)

Sélecteur instantané dans le bandeau supérieur :
- 🇫🇷 **France** : Français (`fr`), Devise **EUR (€)**
- 🇨🇦 **Canada** : Anglais / Français (`en`/`fr`), Devise **CAD ($)**
- 🇩🇪 **Deutschland** : Allemand (`de`), Devise **EUR (€)**
- 🇪🇸 **España** : Espagnol (`es`), Devise **EUR (€)**

Toutes les sections du site (Navigation, Hero, Bannières, Catégories, Produits, Panier, Checkout, Garanties et FAQ) disposent de traductions intégrales certifiées dans [`src/lib/i18n/translations.ts`](file:///d:/Private/ventesnoel/src/lib/i18n/translations.ts).

---

## 💳 4. Tunnel de Paiement (Checkout en 3 Étapes)

Accessible via `/checkout` :
- **Étape 1 : Coordonnées** (Nom complet, e-mail, téléphone/WhatsApp, pays de livraison, ville, code postal, adresse complète).
- **Étape 2 : Mode de règlement & Justificatif** :
  1. **Virement Bancaire (SEPA / International) :**
     - Affichage complet des coordonnées bancaires officielles (Banque, Bénéficiaire, IBAN, BIC/SWIFT, mention obligatoire de la référence de commande).
     - Zone de téléversement (*upload*) du reçu de virement (PDF, JPG, PNG) avec confirmation visuelle.
  2. **Paiement par Carte Cadeau / Bon d'achat :**
     - Saisie du code de la carte cadeau.
     - Zone de téléversement (*upload*) de la photo de la carte cadeau pour vérification et approbation par l'équipe avant déclenchement de la livraison.
  3. **Carte Bancaire Sécurisée :**
     - Protocole 3D-Secure certifié (Visa, Mastercard).
- **Étape 3 : Confirmation & Suivi :**
  - Génération d'une référence unique `#NLG-2026-XXXX`.
  - Bouton d'envoi instantané du récapitulatif par WhatsApp pré-formaté.

---

## 🗄️ 5. Intégration Supabase

Le script SQL complet est disponible dans [`supabase/schema.sql`](file:///d:/Private/ventesnoel/supabase/schema.sql) :
- Tables : `categories`, `category_translations`, `products`, `product_translations`, `orders`, `order_items`.
- Bucket Supabase Storage : `payment-proofs` (pour stocker de manière sécurisée les reçus et photos téléversés).
- Row Level Security (RLS) configuré avec accès public en lecture pour Googlebot et création de commandes.
