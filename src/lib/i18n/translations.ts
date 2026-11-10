import { Locale, RegionConfig } from '@/types';

export const REGIONS: RegionConfig[] = [
  {
    countryCode: 'FR',
    countryName: 'France',
    flag: '🇫🇷',
    defaultLocale: 'fr',
    currency: 'EUR',
    currencySymbol: '€'
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    defaultLocale: 'en',
    currency: 'CAD',
    currencySymbol: '$'
  },
  {
    countryCode: 'DE',
    countryName: 'Deutschland',
    flag: '🇩🇪',
    defaultLocale: 'de',
    currency: 'EUR',
    currencySymbol: '€'
  },
  {
    countryCode: 'ES',
    countryName: 'España',
    flag: '🇪🇸',
    defaultLocale: 'es',
    currency: 'EUR',
    currencySymbol: '€'
  }
];

export const TRANSLATIONS = {
  fr: {
    common: {
      siteName: "NOËL GIFT SHOP",
      tagline: "Magie & Cadeaux de Noël",
      freeShippingAlert: "Livraison offerte dès 50 € / 70 $ | -15% avec le code NOEL2026",
      snowToggle: "Neige",
      searchPlaceholder: "Quel cadeau recherchez-vous ? (ex: montre, casque, parfum...)",
      seeAllResults: "Voir tous les résultats",
      noResults: "Aucun cadeau trouvé pour",
      home: "Accueil",
      shop: "Boutique",
      categories: "Catégories",
      promotions: "Promotions",
      contact: "Contact",
      cart: "Panier",
      wishlist: "Favoris",
      account: "Mon Compte",
      quickView: "Aperçu rapide",
      addToCart: "Ajouter au panier",
      addedToCart: "a été ajouté à votre hotte de Noël !",
      buyNow: "Commander maintenant",
      orderWhatsApp: "Commander via WhatsApp",
      inStock: "En stock - Expédié sous 24h",
      outOfStock: "Rupture temporaire",
      reviews: "avis vérifiés",
      allRightsReserved: "Tous droits réservés. Boutique de Noël certifiée Google Merchant.",
      days: "Jours",
      hours: "Heures",
      mins: "Min",
      secs: "Sec"
    },
    hero: {
      badge: "Spécial Noël 2026",
      guarantee: "Expédition garantie avant le réveillon",
      title1: "Le cadeau parfait",
      title2: "se trouve ici !",
      subtitle: "Faites plaisir à ceux que vous aimez avec notre sélection raffinée de cadeaux pour tous les goûts et tous les budgets. Emballage festif soigné et livraison express.",
      ctaShop: "Découvrir la boutique",
      ctaPromo: "Voir les promotions",
      countdownTitle: "Compte à rebours jusqu'au réveillon :",
      promoCodeLabel: "Code Promo",
      promoCodeDesc: "15% de réduction immédiate"
    },
    categories: {
      subtitle: "Explorez la magie",
      title: "Nos Catégories Populaires",
      desc: "Dénichez des idées cadeaux inspirantes classées avec soin pour toutes les envies.",
      discover: "Découvrir"
    },
    bestSellers: {
      subtitle: "Les coups de cœur de la saison",
      title: "Nos Meilleures Ventes",
      viewAll: "Voir tout le catalogue"
    },
    flashPromo: {
      tag: "Vente Flash de Noël",
      title: "« Les offres de Noël sont arrivées ! »",
      desc: "Profitez de réductions exceptionnelles jusqu'à -35% sur une sélection de cadeaux féeriques. Stocks limités !",
      cta: "Profiter des réductions",
      stockAlert: "⚡ Offres valables dans la limite des stocks disponibles"
    },
    recipients: {
      subtitle: "Guide d'achat sur-mesure",
      title: "Cadeaux par Destinataire",
      desc: "Trouvez en un clin d'œil le présent adapté à chaque être cher.",
      men: "Cadeaux Hommes",
      women: "Cadeaux Femmes",
      kids: "Cadeaux Enfants",
      teens: "Cadeaux Ados",
      couples: "Cadeaux Couples",
      giftIdeas: "idées cadeaux"
    },
    budget: {
      subtitle: "Budget Maîtrisé",
      title: "« Faire plaisir sans se ruiner »",
      desc: "Des attentions magiques et abordables pour combler tous vos proches.",
      tier1: "Moins de 20 € / 30 $",
      tier1Desc: "Petites attentions festives et cadeaux secrets",
      tier2: "Entre 20 € et 50 €",
      tier2Desc: "De superbes idées pour gâter ses proches",
      tier3: "Entre 50 € et 100 €",
      tier3Desc: "Cadeaux généreux et coffrets complets",
      tier4: "Cadeaux d'Exception",
      tier4Desc: "Le prestige pour marquer les esprits",
      viewSelection: "Voir la sélection"
    },
    benefits: {
      fastShippingTitle: "Livraison Express",
      fastShippingDesc: "Sous 24h à 48h en Europe et Amérique du Nord",
      securePaymentTitle: "Paiement Sécurisé",
      securePaymentDesc: "Virement bancaire, Carte Cadeau et CB certifiée",
      giftWrapTitle: "Emballage Cadeau Offert",
      giftWrapDesc: "Ruban doré et carte personnalisée",
      supportTitle: "Service Client 7j/7",
      supportDesc: "Assistance dédiée pour vos fêtes"
    },
    product: {
      sku: "Réf. produit (SKU)",
      gtin: "Code EAN/GTIN",
      colorLabel: "Couleur / Finition",
      sizeLabel: "Taille / Pointure",
      modelLabel: "Modèle / Variante",
      quantity: "Quantité",
      featuresTitle: "Points forts & Caractéristiques",
      guaranteesTitle: "La garantie NOËL GIFT SHOP",
      similarTitle: "Vous aimerez aussi pour Noël"
    },
    cart: {
      title: "Votre Hotte de Noël",
      subtitle: "Vérifiez vos articles avant de passer à l'étape de livraison et de paiement.",
      empty: "Votre panier est encore vide !",
      emptyDesc: "Le traîneau du Père Noël attend vos choix pour se remplir.",
      freeShippingProgress: "Plus que {amount} pour débloquer la livraison gratuite !",
      freeShippingUnlocked: "Félicitations ! Vous bénéficiez de la livraison offerte !",
      giftPackagingTitle: "Emballage de Noël soigné & ruban doré (OFFERT)",
      giftPackagingDesc: "Ajoutez une touche de magie avec notre emballage prêt à offrir.",
      giftNotePlaceholder: "Écrivez le mot doux que nous glisserons sur la carte de vœux...",
      promoCodeLabel: "Code promo ou de réduction :",
      apply: "Appliquer",
      subtotal: "Sous-total",
      discount: "Réduction",
      shipping: "Frais de livraison estimés",
      free: "GRATUITE",
      total: "Total à régler",
      checkoutCta: "Passer à la commande",
      continueShopping: "Continuer vos achats"
    },
    checkout: {
      title: "Finaliser votre commande",
      step1: "Coordonnées",
      step2: "Paiement & Justificatif",
      step3: "Confirmation",
      
      step1Title: "1. Informations de livraison",
      fullName: "Nom complet",
      email: "Adresse e-mail",
      phone: "Numéro de téléphone / WhatsApp",
      country: "Pays de livraison",
      city: "Ville",
      postalCode: "Code postal",
      address: "Adresse complète de livraison",
      continueToPayment: "Continuer vers le paiement",
      
      step2Title: "2. Mode de règlement & Validation",
      
      // Virement Bancaire
      wireTransferTitle: "Paiement par Virement Bancaire (SEPA / International)",
      wireTransferDesc: "Effectuez votre virement sur le compte officiel de la boutique puis déposez votre preuve de virement.",
      bankDetailsTitle: "Coordonnées bancaires pour le virement :",
      bankName: "Banque : Boursorama / BNP Paribas International",
      accountHolder: "Bénéficiaire : NOËL GIFT SHOP SAS",
      iban: "IBAN : FR76 3000 4000 0100 2345 6789 012",
      bic: "BIC / SWIFT : BNPAFRPPXXX",
      referenceNotice: "IMPORTANT : Indiquez votre nom et la référence de commande dans l'intitulé du virement.",
      uploadTransferProof: "Téléverser le justificatif / reçu de virement (PDF, JPG, PNG) :",
      
      // Carte Cadeau
      giftCardTitle: "Paiement par Carte Cadeau / Bon d'Achat",
      giftCardDesc: "Réglez avec votre carte cadeau. Veuillez renseigner le code et joindre une photo de la carte pour approbation avant expédition.",
      giftCardCodePlaceholder: "Numéro ou code de la carte cadeau (ex: GC-2026-XXXX)",
      uploadCardPhoto: "Photo de la carte cadeau (format JPG, PNG) :",
      cardNotice: "Votre commande sera préparée et validée dès vérification de la carte par notre équipe.",
      
      // Carte Bancaire
      creditCardTitle: "Carte Bancaire Sécurisée (Visa / Mastercard)",
      creditCardDesc: "Paiement en ligne instantané avec protocole 3D-Secure certifié.",
      
      uploadSuccess: "Fichier sélectionné avec succès :",
      back: "Retour",
      proceedToReview: "Vérifier la commande",
      
      step3Title: "3. Vérification finale",
      recipientSummary: "Destinataire",
      deliveryAddressSummary: "Adresse de livraison",
      paymentMethodSummary: "Mode de paiement sélectionné",
      confirmOrder: "Confirmer et valider ma commande",
      
      successBadge: "Commande Enregistrée avec Succès !",
      successTitle: "Merci pour votre commande, {name} !",
      successDesc: "Votre référence de commande est : {ref}. Nos équipes examinent votre justificatif et préparent votre colis.",
      whatsappConfirmation: "Envoyer confirmation sur WhatsApp",
      backHome: "Retour à l'accueil"
    }
  },

  en: {
    common: {
      siteName: "NOËL GIFT SHOP",
      tagline: "Christmas Magic & Gifts",
      freeShippingAlert: "Free shipping over $70 / €50 | 15% OFF with code NOEL2026",
      snowToggle: "Snow",
      searchPlaceholder: "What gift are you looking for? (e.g. watch, headphones, perfume...)",
      seeAllResults: "View all results",
      noResults: "No gifts found for",
      home: "Home",
      shop: "Shop",
      categories: "Categories",
      promotions: "Deals",
      contact: "Contact",
      cart: "Cart",
      wishlist: "Wishlist",
      account: "My Account",
      quickView: "Quick view",
      addToCart: "Add to cart",
      addedToCart: "has been added to your Christmas cart!",
      buyNow: "Buy now",
      orderWhatsApp: "Order via WhatsApp",
      inStock: "In stock - Shipped within 24h",
      outOfStock: "Temporarily out of stock",
      reviews: "verified reviews",
      allRightsReserved: "All rights reserved. Certified Google Merchant Store.",
      days: "Days",
      hours: "Hours",
      mins: "Mins",
      secs: "Secs"
    },
    hero: {
      badge: "Christmas 2026 Special",
      guarantee: "Guaranteed delivery before Christmas Eve",
      title1: "The perfect gift",
      title2: "is right here!",
      subtitle: "Delight your loved ones with our curated collection of festive gifts for every taste and budget. Elegant packaging and fast express delivery.",
      ctaShop: "Explore the shop",
      ctaPromo: "View Christmas deals",
      countdownTitle: "Countdown to Christmas Eve:",
      promoCodeLabel: "Promo Code",
      promoCodeDesc: "15% instant discount"
    },
    categories: {
      subtitle: "Explore the magic",
      title: "Our Popular Categories",
      desc: "Find inspiring gift ideas thoughtfully curated for every desire.",
      discover: "Discover"
    },
    bestSellers: {
      subtitle: "Season's favorites",
      title: "Our Best Sellers",
      viewAll: "View entire catalog"
    },
    flashPromo: {
      tag: "Holiday Flash Sale",
      title: "“Christmas deals have arrived!”",
      desc: "Enjoy extraordinary discounts up to -35% on a magical selection of gifts. Limited stocks!",
      cta: "Grab the discounts",
      stockAlert: "⚡ Offers valid while stocks last"
    },
    recipients: {
      subtitle: "Personalized gift guide",
      title: "Gifts by Recipient",
      desc: "Instantly find the right present for every loved one.",
      men: "Gifts for Men",
      women: "Gifts for Women",
      kids: "Gifts for Kids",
      teens: "Gifts for Teens",
      couples: "Gifts for Couples",
      giftIdeas: "gift ideas"
    },
    budget: {
      subtitle: "Smart budget",
      title: "“Delight without overspending”",
      desc: "Magical and affordable gift ideas to please everyone.",
      tier1: "Under $30 / €20",
      tier1Desc: "Festive little treats and secret Santa presents",
      tier2: "$30 to $70",
      tier2Desc: "Wonderful ideas to spoil your loved ones",
      tier3: "$70 to $150",
      tier3Desc: "Generous gifts and complete luxury sets",
      tier4: "Prestige Gifts",
      tier4Desc: "Exceptional gifts to make an unforgettable impression",
      viewSelection: "View selection"
    },
    benefits: {
      fastShippingTitle: "Express Delivery",
      fastShippingDesc: "Within 24h to 48h across North America and Europe",
      securePaymentTitle: "Secure Payment",
      securePaymentDesc: "Bank wire, Gift Card and certified Credit Card",
      giftWrapTitle: "Complimentary Gift Wrapping",
      giftWrapDesc: "Golden ribbon and personalized greeting card",
      supportTitle: "Customer Care 7/7",
      supportDesc: "Dedicated support for your holidays"
    },
    product: {
      sku: "Product SKU",
      gtin: "EAN/GTIN barcode",
      colorLabel: "Color / Finish",
      sizeLabel: "Size",
      modelLabel: "Model / Variant",
      quantity: "Quantity",
      featuresTitle: "Highlights & Specifications",
      guaranteesTitle: "The NOËL GIFT SHOP Guarantee",
      similarTitle: "You may also love for Christmas"
    },
    cart: {
      title: "Your Christmas Bag",
      subtitle: "Review your items before proceeding to shipping and payment.",
      empty: "Your cart is currently empty!",
      emptyDesc: "Santa's sleigh is waiting for your gifts.",
      freeShippingProgress: "Add {amount} more to unlock free shipping!",
      freeShippingUnlocked: "Congratulations! You get free shipping!",
      giftPackagingTitle: "Christmas Gift Packaging & Gold Ribbon (FREE)",
      giftPackagingDesc: "Add a touch of magic with our ready-to-offer gift wrap.",
      giftNotePlaceholder: "Write the sweet message to include on the greeting card...",
      promoCodeLabel: "Promo or discount code:",
      apply: "Apply",
      subtotal: "Subtotal",
      discount: "Discount",
      shipping: "Estimated shipping",
      free: "FREE",
      total: "Total to pay",
      checkoutCta: "Proceed to checkout",
      continueShopping: "Continue shopping"
    },
    checkout: {
      title: "Complete your order",
      step1: "Customer Info",
      step2: "Payment & Proof",
      step3: "Confirmation",
      
      step1Title: "1. Delivery Information",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp Number",
      country: "Destination Country",
      city: "City",
      postalCode: "Postal Code",
      address: "Complete Delivery Address",
      continueToPayment: "Continue to payment",
      
      step2Title: "2. Payment Method & Validation",
      
      // Wire Transfer
      wireTransferTitle: "Bank Wire Transfer (SEPA / Wire)",
      wireTransferDesc: "Transfer directly to the official shop bank account and upload your transfer confirmation.",
      bankDetailsTitle: "Bank details for wire transfer:",
      bankName: "Bank: BNP Paribas / International Clearing",
      accountHolder: "Beneficiary: NOËL GIFT SHOP SAS",
      iban: "IBAN: FR76 3000 4000 0100 2345 6789 012",
      bic: "BIC / SWIFT: BNPAFRPPXXX",
      referenceNotice: "IMPORTANT: Include your full name and order reference in the transfer memo.",
      uploadTransferProof: "Upload wire transfer receipt (PDF, JPG, PNG):",
      
      // Gift Card
      giftCardTitle: "Gift Card / Voucher Payment",
      giftCardDesc: "Pay using your gift card. Enter the code and upload a photo of the card for verification before dispatch.",
      giftCardCodePlaceholder: "Gift card number or voucher code (e.g. GC-2026-XXXX)",
      uploadCardPhoto: "Photo of the gift card (JPG, PNG format):",
      cardNotice: "Your order will be approved and prepared as soon as the card is verified by our team.",
      
      // Credit Card
      creditCardTitle: "Secure Credit Card (Visa / Mastercard)",
      creditCardDesc: "Instant online checkout with certified 3D-Secure protocol.",
      
      uploadSuccess: "File uploaded successfully:",
      back: "Back",
      proceedToReview: "Review Order",
      
      step3Title: "3. Final Review",
      recipientSummary: "Recipient",
      deliveryAddressSummary: "Shipping Address",
      paymentMethodSummary: "Selected Payment Method",
      confirmOrder: "Confirm and place my order",
      
      successBadge: "Order Successfully Placed!",
      successTitle: "Thank you for your order, {name}!",
      successDesc: "Your order reference is: {ref}. Our team is verifying your payment details and packing your holiday gifts.",
      whatsappConfirmation: "Send confirmation on WhatsApp",
      backHome: "Back to home"
    }
  },

  de: {
    common: {
      siteName: "NOËL GIFT SHOP",
      tagline: "Weihnachtszauber & Geschenke",
      freeShippingAlert: "Kostenloser Versand ab 50 € | 15% Rabatt mit Code NOEL2026",
      snowToggle: "Schnee",
      searchPlaceholder: "Welches Geschenk suchen Sie? (z.B. Uhr, Kopfhörer, Parfüm...)",
      seeAllResults: "Alle Ergebnisse anzeigen",
      noResults: "Keine Geschenke gefunden für",
      home: "Startseite",
      shop: "Shop",
      categories: "Kategorien",
      promotions: "Angebote",
      contact: "Kontakt",
      cart: "Warenkorb",
      wishlist: "Wunschliste",
      account: "Mein Konto",
      quickView: "Schnellansicht",
      addToCart: "In den Warenkorb",
      addedToCart: "wurde Ihrem Weihnachtskorb hinzugefügt!",
      buyNow: "Jetzt kaufen",
      orderWhatsApp: "Über WhatsApp bestellen",
      inStock: "Auf Lager - Versand innerhalb von 24h",
      outOfStock: "Vorübergehend vergriffen",
      reviews: "verifizierte Bewertungen",
      allRightsReserved: "Alle Rechte vorbehalten. Zertifizierter Google Merchant Shop.",
      days: "Tage",
      hours: "Std",
      mins: "Min",
      secs: "Sek"
    },
    hero: {
      badge: "Weihnachts-Spezial 2026",
      guarantee: "Garantierte Lieferung vor Heiligabend",
      title1: "Das perfekte Geschenk",
      title2: "ist genau hier!",
      subtitle: "Bereiten Sie Ihren Liebsten eine Freude mit unserer edlen Auswahl an Weihnachtsgeschenken für jeden Geschmack und jedes Budget.",
      ctaShop: "Shop entdecken",
      ctaPromo: "Angebote ansehen",
      countdownTitle: "Countdown bis Heiligabend:",
      promoCodeLabel: "Gutscheincode",
      promoCodeDesc: "15% Sofortrabatt"
    },
    categories: {
      subtitle: "Entdecken Sie den Zauber",
      title: "Beliebte Kategorien",
      desc: "Inspirierende Geschenkideen für jeden Wunsch sorgfältig zusammengestellt.",
      discover: "Entdecken"
    },
    bestSellers: {
      subtitle: "Favoriten der Saison",
      title: "Unsere Bestseller",
      viewAll: "Gesamten Katalog ansehen"
    },
    flashPromo: {
      tag: "Weihnachts-Blitzverkauf",
      title: "„Die Weihnachtsangebote sind da!“",
      desc: "Sichern Sie sich bis zu 35% Rabatt auf zauberhafte Geschenke. Begrenzte Stückzahl!",
      cta: "Rabatte sichern",
      stockAlert: "⚡ Angebote gültig solange der Vorrat reicht"
    },
    recipients: {
      subtitle: "Individueller Einkaufsberater",
      title: "Geschenke nach Empfänger",
      desc: "Finden Sie im Handumdrehen das passende Präsent für jeden geliebten Menschen.",
      men: "Geschenke für Männer",
      women: "Geschenke für Frauen",
      kids: "Geschenke für Kinder",
      teens: "Geschenke für Teenager",
      couples: "Geschenke für Paare",
      giftIdeas: "Geschenkideen"
    },
    budget: {
      subtitle: "Für jedes Budget",
      title: "„Freude schenken ohne Reue“",
      desc: "Wunderbare und erschwingliche Geschenke für Ihre Familie.",
      tier1: "Unter 20 €",
      tier1Desc: "Kleine Aufmerksamkeiten und Wichtelgeschenke",
      tier2: "20 € bis 50 €",
      tier2Desc: "Großartige Ideen für Ihre Liebsten",
      tier3: "50 € bis 100 €",
      tier3Desc: "Großzügige Präsente und Geschenksets",
      tier4: "Exklusive Geschenke",
      tier4Desc: "Luxusgeschenke für unvergessliche Momente",
      viewSelection: "Auswahl ansehen"
    },
    benefits: {
      fastShippingTitle: "Expressversand",
      fastShippingDesc: "Innerhalb von 24h bis 48h in ganz Europa",
      securePaymentTitle: "Sichere Zahlung",
      securePaymentDesc: "Banküberweisung, Geschenkkarte und zertifizierte Kreditkarte",
      giftWrapTitle: "Kostenlose Geschenkverpackung",
      giftWrapDesc: "Mit goldenem Band und persönlicher Grußkarte",
      supportTitle: "Kundenservice 7 Tage die Woche",
      supportDesc: "Persönlicher Support für Ihre Feiertage"
    },
    product: {
      sku: "Artikelnummer (SKU)",
      gtin: "EAN/GTIN-Code",
      colorLabel: "Farbe / Ausführung",
      sizeLabel: "Größe",
      modelLabel: "Modell / Variante",
      quantity: "Menge",
      featuresTitle: "Eigenschaften & Highlights",
      guaranteesTitle: "Die NOËL GIFT SHOP Garantie",
      similarTitle: "Das könnte Ihnen auch gefallen"
    },
    cart: {
      title: "Ihr Weihnachtskorb",
      subtitle: "Überprüfen Sie Ihre Artikel vor Versand und Bezahlung.",
      empty: "Ihr Warenkorb ist noch leer!",
      emptyDesc: "Der Schlitten des Weihnachtsmanns wartet auf Ihre Geschenke.",
      freeShippingProgress: "Noch {amount} bis zum kostenlosen Versand!",
      freeShippingUnlocked: "Herzlichen Glückwunsch! Der Versand ist kostenlos!",
      giftPackagingTitle: "Festliche Geschenkverpackung & Goldband (GRATIS)",
      giftPackagingDesc: "Schenken Sie Freude mit unserer edlen Geschenkverpackung.",
      giftNotePlaceholder: "Ihre persönliche Grußbotschaft für die Karte...",
      promoCodeLabel: "Gutschein- oder Rabattcode:",
      apply: "Einlösen",
      subtotal: "Zwischensumme",
      discount: "Rabatt",
      shipping: "Geschätzte Versandkosten",
      free: "KOSTENLOS",
      total: "Gesamtbetrag",
      checkoutCta: "Zur Kasse",
      continueShopping: "Weiter einkaufen"
    },
    checkout: {
      title: "Bestellung abschließen",
      step1: "Kundendaten",
      step2: "Zahlung & Nachweis",
      step3: "Bestätigung",
      
      step1Title: "1. Lieferinformationen",
      fullName: "Vollständiger Name",
      email: "E-Mail-Adresse",
      phone: "Telefon- / WhatsApp-Nummer",
      country: "Lieferland",
      city: "Stadt",
      postalCode: "Postleitzahl",
      address: "Vollständige Lieferadresse",
      continueToPayment: "Weiter zur Zahlung",
      
      step2Title: "2. Zahlungsart & Überprüfung",
      
      // Überweisung
      wireTransferTitle: "Zahlung per Banküberweisung (SEPA)",
      wireTransferDesc: "Überweisen Sie direkt auf das offizielle Geschäftskonto und laden Sie die Überweisungsbestätigung hoch.",
      bankDetailsTitle: "Bankverbindung für Überweisung:",
      bankName: "Bank: BNP Paribas Deutschland / Boursorama",
      accountHolder: "Empfänger: NOËL GIFT SHOP SAS",
      iban: "IBAN: FR76 3000 4000 0100 2345 6789 012",
      bic: "BIC / SWIFT: BNPAFRPPXXX",
      referenceNotice: "WICHTIG: Bitte geben Sie Ihren Namen und die Bestellnummer als Verwendungszweck an.",
      uploadTransferProof: "Überweisungsbeleg hochladen (PDF, JPG, PNG):",
      
      // Geschenkkarte
      giftCardTitle: "Zahlung mit Geschenkkarte / Gutschein",
      giftCardDesc: "Bezahlen Sie mit Ihrer Geschenkkarte. Bitte Code eingeben und Foto der Karte zur Bestätigung vor Versand hochladen.",
      giftCardCodePlaceholder: "Geschenkkartennummer oder Gutscheincode",
      uploadCardPhoto: "Foto der Geschenkkarte (JPG, PNG):",
      cardNotice: "Ihre Bestellung wird freigegeben und verpackt, sobald die Karte überprüft wurde.",
      
      // Kreditkarte
      creditCardTitle: "Sichere Kreditkarte (Visa / Mastercard)",
      creditCardDesc: "Sofortige Online-Zahlung mit zertifiziertem 3D-Secure-Verfahren.",
      
      uploadSuccess: "Datei erfolgreich hochgeladen:",
      back: "Zurück",
      proceedToReview: "Bestellung prüfen",
      
      step3Title: "3. Zusammenfassung",
      recipientSummary: "Empfänger",
      deliveryAddressSummary: "Lieferanschrift",
      paymentMethodSummary: "Gewählte Zahlungsart",
      confirmOrder: "Bestellung verbindlich bestätigen",
      
      successBadge: "Bestellung erfolgreich aufgegeben!",
      successTitle: "Vielen Dank für Ihre Bestellung, {name}!",
      successDesc: "Ihre Bestellnummer lautet: {ref}. Unser Team prüft Ihre Zahlungsdaten und verpackt Ihre Geschenke.",
      whatsappConfirmation: "Bestätigung per WhatsApp senden",
      backHome: "Zur Startseite"
    }
  },

  es: {
    common: {
      siteName: "NOËL GIFT SHOP",
      tagline: "Magia & Regalos de Navidad",
      freeShippingAlert: "Envío gratis a partir de 50 € | 15% de descuento con el código NOEL2026",
      snowToggle: "Nieve",
      searchPlaceholder: "¿Qué regalo buscas? (ej: reloj, auriculares, perfume...)",
      seeAllResults: "Ver todos los resultados",
      noResults: "No se encontraron regalos para",
      home: "Inicio",
      shop: "Tienda",
      categories: "Categorías",
      promotions: "Ofertas",
      contact: "Contacto",
      cart: "Carrito",
      wishlist: "Favoritos",
      account: "Mi Cuenta",
      quickView: "Vista previa",
      addToCart: "Añadir al carrito",
      addedToCart: "ha sido añadido a tu cesta de Navidad!",
      buyNow: "Comprar ahora",
      orderWhatsApp: "Pedir por WhatsApp",
      inStock: "En stock - Envío en 24h",
      outOfStock: "Agotado temporalmente",
      reviews: "opiniones verificadas",
      allRightsReserved: "Todos los derechos reservados. Tienda certificada Google Merchant.",
      days: "Días",
      hours: "Horas",
      mins: "Min",
      secs: "Seg"
    },
    hero: {
      badge: "Especial Navidad 2026",
      guarantee: "Envío garantizado antes de Nochebuena",
      title1: "El regalo perfecto",
      title2: "¡está aquí!",
      subtitle: "Sorprende a tus seres queridos con nuestra refinada selección de regalos de Navidad para todos los gustos y presupuestos. Embalaje festivo y entrega rápida.",
      ctaShop: "Descubrir la tienda",
      ctaPromo: "Ver ofertas de Navidad",
      countdownTitle: "Cuenta atrás para Nochebuena:",
      promoCodeLabel: "Código Promocional",
      promoCodeDesc: "15% de descuento inmediato"
    },
    categories: {
      subtitle: "Explora la magia",
      title: "Nuestras Categorías Populares",
      desc: "Ideas de regalos inspiradoras seleccionadas cuidadosamente para cada ocasión.",
      discover: "Descubrir"
    },
    bestSellers: {
      subtitle: "Los favoritos de la temporada",
      title: "Nuestros Más Vendidos",
      viewAll: "Ver todo el catálogo"
    },
    flashPromo: {
      tag: "Venta Flash Navideña",
      title: "«¡Las ofertas de Navidad han llegado!»",
      desc: "Aprovecha descuentos exclusivos de hasta el -35% en regalos mágicos. ¡Unidades limitadas!",
      cta: "Aprovechar descuentos",
      stockAlert: "⚡ Ofertas válidas hasta fin de existencias"
    },
    recipients: {
      subtitle: "Guía de compra personalizada",
      title: "Regalos por Destinatario",
      desc: "Encuentra en un instante el regalo perfecto para cada ser querido.",
      men: "Regalos para Hombres",
      women: "Regalos para Mujeres",
      kids: "Regalos para Niños",
      teens: "Regalos para Adolescentes",
      couples: "Regalos para Parejas",
      giftIdeas: "ideas de regalo"
    },
    budget: {
      subtitle: "Presupuesto a medida",
      title: "«Ilusión sin gastar de más»",
      desc: "Detalles mágicos y accesibles para sorprender a todos.",
      tier1: "Menos de 20 €",
      tier1Desc: "Detalles festivos y regalos de amigo invisible",
      tier2: "De 20 € a 50 €",
      tier2Desc: "Grandes ideas para consentir a los tuyos",
      tier3: "De 50 € a 100 €",
      tier3Desc: "Regalos generosos y sets completos",
      tier4: "Regalos Exclusivos",
      tier4Desc: "Detalles prémium para marcar la diferencia",
      viewSelection: "Ver selección"
    },
    benefits: {
      fastShippingTitle: "Envío Exprés",
      fastShippingDesc: "En 24h a 48h en toda Europa",
      securePaymentTitle: "Pago 100% Seguro",
      securePaymentDesc: "Transferencia bancaria, Tarjeta de Regalo y Tarjeta de Crédito",
      giftWrapTitle: "Envoltorio de Regalo Gratis",
      giftWrapDesc: "Con cinta dorada y tarjeta personalizada",
      supportTitle: "Atención al Cliente 7/7",
      supportDesc: "Soporte dedicado para tus compras navideñas"
    },
    product: {
      sku: "Ref. producto (SKU)",
      gtin: "Código EAN/GTIN",
      colorLabel: "Color / Acabado",
      sizeLabel: "Talla",
      modelLabel: "Modelo / Variante",
      quantity: "Cantidad",
      featuresTitle: "Características principales",
      guaranteesTitle: "Garantía NOËL GIFT SHOP",
      similarTitle: "También te puede gustar"
    },
    cart: {
      title: "Tu Cesta de Navidad",
      subtitle: "Revisa tus artículos antes de pasar a la entrega y al pago.",
      empty: "¡Tu carrito está vacío!",
      emptyDesc: "El trineo de Papá Noel espera tus regalos para llenarse.",
      freeShippingProgress: "¡Añade {amount} más para conseguir envío gratis!",
      freeShippingUnlocked: "¡Enhorabuena! ¡Disfrutas de envío gratuito! 🎉",
      giftPackagingTitle: "Embalaje festivo & lazo dorado (GRATIS)",
      giftPackagingDesc: "Añade un toque mágico con nuestro envoltorio listo para regalar.",
      giftNotePlaceholder: "Escribe el mensaje cariñoso que pondremos en la tarjeta de felicitación...",
      promoCodeLabel: "Código promocional o de descuento:",
      apply: "Aplicar",
      subtotal: "Subtotal",
      discount: "Descuento",
      shipping: "Gastos de envío estimados",
      free: "GRATIS",
      total: "Total a pagar",
      checkoutCta: "Tramitar pedido",
      continueShopping: "Seguir comprando"
    },
    checkout: {
      title: "Finalizar compra",
      step1: "Datos personales",
      step2: "Pago y Comprobante",
      step3: "Confirmación",
      
      step1Title: "1. Información de entrega",
      fullName: "Nombre y apellidos",
      email: "Correo electrónico",
      phone: "Teléfono / WhatsApp",
      country: "País de destino",
      city: "Ciudad",
      postalCode: "Código postal",
      address: "Dirección completa de entrega",
      continueToPayment: "Continuar al pago",
      
      step2Title: "2. Método de pago y comprobación",
      
      // Transferencia
      wireTransferTitle: "Pago por Transferencia Bancaria (SEPA)",
      wireTransferDesc: "Realiza tu transferencia a la cuenta oficial de la tienda y sube el comprobante de pago.",
      bankDetailsTitle: "Datos bancarios para la transferencia:",
      bankName: "Banco: BNP Paribas / Boursorama España",
      accountHolder: "Titular: NOËL GIFT SHOP SAS",
      iban: "IBAN: FR76 3000 4000 0100 2345 6789 012",
      bic: "BIC / SWIFT: BNPAFRPPXXX",
      referenceNotice: "IMPORTANTE: Indica tu nombre y la referencia del pedido en el concepto de la transferencia.",
      uploadTransferProof: "Subir recibo o comprobante de transferencia (PDF, JPG, PNG):",
      
      // Tarjeta Regalo
      giftCardTitle: "Pago con Tarjeta de Regalo / Bono",
      giftCardDesc: "Paga con tu tarjeta de regalo. Introduce el código y adjunta una foto de la tarjeta para su validación previa al envío.",
      giftCardCodePlaceholder: "Número o código de la tarjeta de regalo",
      uploadCardPhoto: "Foto de la tarjeta de regalo (JPG, PNG):",
      cardNotice: "Tu pedido se preparará y validará en cuanto nuestro equipo verifique la tarjeta.",
      
      // Tarjeta de Crédito
      creditCardTitle: "Tarjeta de Crédito Segura (Visa / Mastercard)",
      creditCardDesc: "Pago online instantáneo con protocolo 3D-Secure verificado.",
      
      uploadSuccess: "Archivo cargado correctamente:",
      back: "Volver",
      proceedToReview: "Revisar pedido",
      
      step3Title: "3. Resumen final",
      recipientSummary: "Destinatario",
      deliveryAddressSummary: "Dirección de entrega",
      paymentMethodSummary: "Método de pago seleccionado",
      confirmOrder: "Confirmar mi pedido",
      
      successBadge: "¡Pedido Registrado con Éxito!",
      successTitle: "¡Muchas gracias por tu compra, {name}! 🎅",
      successDesc: "La referencia de tu pedido es: {ref}. Nuestro equipo está revisando tu comprobante y preparando tus regalos.",
      whatsappConfirmation: "Enviar confirmación por WhatsApp",
      backHome: "Volver al inicio"
    }
  }
};
