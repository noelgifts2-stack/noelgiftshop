/**
 * NOËL GIFT SHOP - Base de données des produits
 * Monnaie: FCFA (Franc CFA)
 * 10 Catégories officielles
 */

const CATEGORIES = [
  {
    id: "mode",
    name: "Mode & vêtements",
    slug: "mode",
    icon: "shirt",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    description: "Robes de soirée scintillantes, pulls de Noël festifs, costumes élégants et tenues raffinées pour les fêtes.",
    badge: "Tendance",
    subcategories: ["Robes de soirée", "Pulls de Noël", "Chemises & Costumes", "Manteaux & Vestes", "Accessoires de mode"]
  },
  {
    id: "chaussures",
    name: "Chaussures",
    slug: "chaussures",
    icon: "footprints",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    description: "Escarpins dorés, sneakers haut de gamme, bottines d'hiver et mocassins chics pour toutes vos sorties.",
    badge: "Populaire",
    subcategories: ["Sneakers & Baskets", "Escarpins & Talons", "Bottines & Boots", "Mocassins en cuir", "Sandales de fête"]
  },
  {
    id: "jouets",
    name: "Jouets & enfants",
    slug: "jouets",
    icon: "baby",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    description: "Le paradis des enfants : peluches géantes, jeux éducatifs, briques de construction et figurines interactives.",
    badge: "Magie de Noël",
    subcategories: ["Peluches & Doudous", "Jeux éducatifs", "Lego & Construction", "Voitures télécommandées", "Poupées & Univers"]
  },
  {
    id: "mobilite",
    name: "Trottinettes & skateboards",
    slug: "mobilite",
    icon: "zap",
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80",
    description: "Trottinettes électriques dernier cri, skateboards stylés, rollers et hoverboards pour glisser avec style.",
    badge: "Sensations",
    subcategories: ["Trottinettes électriques", "Skateboards & Longboards", "Rollers ajustables", "Hoverboards", "Casques & Protections"]
  },
  {
    id: "hightech",
    name: "High-tech & gadgets",
    slug: "hightech",
    icon: "smartphone",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Casques audio Bluetooth, enceintes sans fil, projecteurs de salon, liseuses et gadgets innovants.",
    badge: "Best-seller",
    subcategories: ["Casques & Écouteurs", "Enceintes Bluetooth", "Mini projecteurs", "Accessoires Gaming", "Drones compacts"]
  },
  {
    id: "accessoires",
    name: "Montres & accessoires",
    slug: "accessoires",
    icon: "watch",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    description: "Montres de prestige automatiques et connectées, sacs à main luxueux, ceintures en cuir et parures scintillantes.",
    badge: "Élégance",
    subcategories: ["Montres Homme", "Montres Femme", "Bijoux & Colliers", "Sacs à main", "Portefeuilles en cuir"]
  },
  {
    id: "beaute",
    name: "Beauté & parfums",
    slug: "beaute",
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    description: "Parfums de luxe emblématiques, palettes de maquillage festives, soins bio et coffrets de relaxation.",
    badge: "Sublime",
    subcategories: ["Parfums de niche", "Palettes maquillage", "Soins du visage", "Huiles précieuses", "Soins barbe & rasage"]
  },
  {
    id: "maison",
    name: "Maison & décoration",
    slug: "maison",
    icon: "home",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    description: "Guirlandes LED féériques, bougies parfumées artisanales, plaids douillets et art de la table pour le réveillon.",
    badge: "Cocooning",
    subcategories: ["Décorations de Noël", "Bougies & Diffuseurs", "Plaids & Coussins", "Art de la table", "Luminaires d'ambiance"]
  },
  {
    id: "sport",
    name: "Sport & loisirs",
    slug: "sport",
    icon: "activity",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    description: "Équipements fitness, gourdes isothermes design, montres sportives GPS et tenues de performance.",
    badge: "Vitalité",
    subcategories: ["Fitness & Yoga", "Gourdes & Shakers", "Brassards & Trackers", "Sacs de sport", "Ballons & Jeux outdoor"]
  },
  {
    id: "coffrets",
    name: "Coffrets cadeaux",
    slug: "coffrets",
    icon: "gift",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
    description: "Paniers gourmands festifs, coffrets chocolats fins, sets bien-être complets et coffrets prestige prêts à offrir.",
    badge: "Prêt à offrir",
    subcategories: ["Paniers gourmands", "Chocolats & Douceurs", "Coffrets Soin SPA", "Box Dégustation", "Coffrets Prestige"]
  }
];

const PRODUCTS = [
  // 1. Coffrets Cadeaux & Festifs
  {
    id: "nlg-001",
    name: "Coffret Prestige Étoile de Noël",
    category: "coffrets",
    recipient: "couples",
    price: 38500,
    oldPrice: 52000,
    badge: "Best-seller",
    rating: 4.9,
    reviewsCount: 148,
    isPromo: true,
    isBestseller: true,
    budgetTier: "medium", // under 50k
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Un somptueux coffret festif contenant une sélection de chocolats belges artisanaux, une bougie parfumée à la cannelle et vanille de Madagascar, un thé d'hiver bio aux épices dorées et une carte de vœux manuscrite personnalisée. Présenté dans une boîte en bois laqué rouge aux dorures délicates.",
    features: [
      "Assortiment de 24 chocolats grands crus",
      "Bougie artisanale 220g cire végétale 50h",
      "Mélange thé d'hiver exclusif 100g",
      "Emballage cadeau ruban satin or inclus"
    ],
    options: {
      colors: ["Ruban Doré", "Ruban Rouge Royal", "Ruban Vert Forêt"],
      models: ["Classique", "Version Champagne sans alcool"]
    }
  },
  {
    id: "nlg-002",
    name: "Montre Chronographe Automatique Or & Cuir",
    category: "accessoires",
    recipient: "hommes",
    price: 95000,
    oldPrice: 135000,
    badge: "-30% Promo",
    rating: 5.0,
    reviewsCount: 89,
    isPromo: true,
    isBestseller: true,
    budgetTier: "premium",
    stock: 9,
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Cette montre chronographe d'inspiration classique allie un boîtier en acier inoxydable plaqué or 18k à un somptueux bracelet en cuir véritable gaufré façon alligator. Verre saphir inrayable, fond de boîte transparent et mécanisme automatique de grande précision.",
    features: [
      "Mouvement automatique 40h de réserve",
      "Boîtier 41mm étanche 50 mètres (5 ATM)",
      "Verre saphir traité antireflet",
      "Écrin de luxe en bois de noyer inclus"
    ],
    options: {
      colors: ["Cadran Noir / Or", "Cadran Blanc Émaillé / Or Rose", "Cadran Bleu Nuit / Argent"],
      sizes: ["Bracelet Cuir 20mm standard"]
    }
  },
  {
    id: "nlg-003",
    name: "Casque Audio Sans Fil Réduction de Bruit Pro",
    category: "hightech",
    recipient: "adolescents",
    price: 68000,
    oldPrice: 85000,
    badge: "Coup de Cœur",
    rating: 4.8,
    reviewsCount: 215,
    isPromo: true,
    isBestseller: true,
    budgetTier: "premium",
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Offrez une immersion sonore totale avec ce casque Bluetooth circum-aural haute fidélité doté d'une annulation active de bruit adaptative (ANC). Coussinets en mousse à mémoire de forme ultra-confortables pour de longues sessions musicales sans fatigue.",
    features: [
      "Réduction de bruit active hybride jusqu'à -38dB",
      "Autonomie record de 45 heures en écoute",
      "Charge rapide USB-C (10 min = 5h d'écoute)",
      "Microphones HD pour appels cristallins"
    ],
    options: {
      colors: ["Noir Carbone", "Blanc Argenté", "Bleu Minuit"]
    }
  },
  {
    id: "nlg-004",
    name: "Parfum d'Exception Nectar d'Orient 100ml",
    category: "beaute",
    recipient: "femmes",
    price: 49000,
    oldPrice: 65000,
    badge: "Édition Limitée",
    rating: 4.9,
    reviewsCount: 167,
    isPromo: true,
    isBestseller: true,
    budgetTier: "medium",
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Une fragrance envoûtante créée spécialement pour les festivités de fin d'année. Notes de tête de bergamote et poivre rose, cœur de jasmin sambac et rose de Damas, sublimé par un fond chaud d'ambre gris, de vanille bourbon et de bois de santal précieux.",
    features: [
      "Eau de parfum haute concentration (22%)",
      "Flacon sculpté orné d'un bouchon en cristal",
      "Sillage longue tenue (plus de 18 heures)",
      "Vaporisateur de sac 10ml offert"
    ],
    options: {
      models: ["100ml avec coffret velours", "50ml format nomade"]
    }
  },
  {
    id: "nlg-005",
    name: "Ours Géant en Peluche Douceur 120cm",
    category: "jouets",
    recipient: "enfants",
    price: 24500,
    oldPrice: 32000,
    badge: "Magie Enfant",
    rating: 4.9,
    reviewsCount: 312,
    isPromo: true,
    isBestseller: true,
    budgetTier: "low", // under 25k
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Le compagnon câlin ultime sous le sapin ! Cet ours en peluche géant de 120 cm est fabriqué en tissu micro-polaire ultra-doux certifié hypoallergénique. Arborant un élégant nœud papillon en velours rouge carmin brodé aux fils dorés.",
    features: [
      "Taille géante 120 cm de hauteur",
      "Rembourrage ouate de coton 100% sécurisé",
      "Lavable en surface facilement",
      "Conforme aux normes européennes et internationales CE"
    ],
    options: {
      colors: ["Caramel Doré", "Blanc Neige", "Chocolat Doux"]
    }
  },
  {
    id: "nlg-006",
    name: "Trottinette Électrique Urbaine Pro 350W",
    category: "mobilite",
    recipient: "adolescents",
    price: 185000,
    oldPrice: 220000,
    badge: "Spécial Noël",
    rating: 4.8,
    reviewsCount: 76,
    isPromo: true,
    isBestseller: false,
    budgetTier: "premium",
    stock: 7,
    images: [
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Idéale pour les déplacements citadins rapides et écologiques. Équipée d'un moteur brushless 350W fiable, de pneus 8.5 pouces increvables alvéolés, d'un freinage régénératif E-ABS et d'un écran LED interactif connecté par Bluetooth.",
    features: [
      "Vitesse max : 25 km/h bridée",
      "Autonomie réelle jusqu'à 30 km",
      "Pliage éclair en 3 secondes chrono",
      "Éclairage LED avant et feu stop arrière"
    ],
    options: {
      colors: ["Gris Anthracite & Rouge", "Noir Mat & Doré"]
    }
  },
  {
    id: "nlg-007",
    name: "Robe de Soirée Velours & Paillettes Dorées",
    category: "mode",
    recipient: "femmes",
    price: 34000,
    oldPrice: 48000,
    badge: "Nouveauté",
    rating: 4.7,
    reviewsCount: 94,
    isPromo: true,
    isBestseller: false,
    budgetTier: "medium",
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Faites sensation lors du réveillon de Noël et de la Saint-Sylvestre dans cette robe longue ajustée en velours stretch ornée de constellations de paillettes étincelantes. Décolleté croisé élégant et fente discrète sur le côté.",
    features: [
      "Tissu velours soyeux extensible et galbant",
      "Fermeture éclair invisible au dos",
      "Finitions couture haute qualité",
      "Guide des tailles personnalisé"
    ],
    options: {
      sizes: ["S (36)", "M (38)", "L (40)", "XL (42)"],
      colors: ["Rouge Rubis Impérial", "Vert Émeraude Profond", "Noir Minuit"]
    }
  },
  {
    id: "nlg-008",
    name: "Sneakers Cuir Minimalistes Édition Gold",
    category: "chaussures",
    recipient: "hommes",
    price: 42000,
    oldPrice: 55000,
    badge: "Best-seller",
    rating: 4.8,
    reviewsCount: 132,
    isPromo: true,
    isBestseller: true,
    budgetTier: "medium",
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Baskets iconiques confectionnées en cuir pleine fleur blanc pur avec empiècement arrière doré festif. Semelle en caoutchouc naturel cousue pour une durabilité exemplaire et semelle intérieure à mémoire de forme.",
    features: [
      "Cuir véritable de vachette italien",
      "Semelle cousue latérale robuste",
      "Lacets cirés en coton peigné",
      "Lacets de rechange dorés offerts"
    ],
    options: {
      sizes: ["40", "41", "42", "43", "44", "45"],
      colors: ["Blanc / Détails Dorés", "Noir / Détails Cuivre"]
    }
  },
  {
    id: "nlg-009",
    name: "Guirlande Lumineuse Rideau LED Féerique 3x3m",
    category: "maison",
    recipient: "couples",
    price: 9500,
    oldPrice: 15000,
    badge: "Petit Prix",
    rating: 4.9,
    reviewsCount: 420,
    isPromo: true,
    isBestseller: true,
    budgetTier: "budget", // under 10k
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Transformez votre salon ou chambre en un ciel étoilé féerique ! Ce rideau de 300 micro-LEDs blanc chaud propose 8 modes d'illumination magiques, une télécommande infrarouge et un minuteur automatique intégré.",
    features: [
      "Dimensions : 3m de largeur x 3m de tombée",
      "8 ambiances lumineuses (vague, scintillement, fixe...)",
      "Alimentation USB sécurisée basse tension",
      "Télécommande et crochets d'accroche fournis"
    ],
    options: {
      colors: ["Blanc Chaud Féerique", "Blanc Flocon Glacé", "Multicolore Festif"]
    }
  },
  {
    id: "nlg-010",
    name: "Enceinte Nomade Bluetooth Waterproof Bass Boost",
    category: "hightech",
    recipient: "adolescents",
    price: 28000,
    oldPrice: 38000,
    badge: "Promo Noël",
    rating: 4.8,
    reviewsCount: 185,
    isPromo: true,
    isBestseller: true,
    budgetTier: "medium",
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Ambiance garantie pour toutes vos fêtes de fin d'année ! Cette enceinte délivre un son stéréo puissant à 360° avec des basses profondes et des jeux de lumière LED rythmés par la musique. Certifiée IPX7 résistante à l'eau.",
    features: [
      "Puissance acoustique : 30W RMS",
      "Autonomie : jusqu'à 20 heures de musique",
      "Éclairage LED RGB synchronisé au rythme",
      "Fonction TWS pour coupler 2 enceintes"
    ],
    options: {
      colors: ["Rouge Fête", "Noir Mat", "Bleu Océan"]
    }
  },
  {
    id: "nlg-011",
    name: "Coffret Rituel Spa & Bien-être aux Huiles Essentielles",
    category: "coffrets",
    recipient: "femmes",
    price: 22000,
    oldPrice: 30000,
    badge: "Cadeau Idéal",
    rating: 4.9,
    reviewsCount: 153,
    isPromo: true,
    isBestseller: false,
    budgetTier: "low",
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608248597359-0f6244400e99?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Une invitation à la détente absolue chez soi. Contient un gel douche moussant à l'amande douce, un gommage au sucre de canne et beurre de karité, une huile sèche satinée pour le corps, une éponge végétale et un bandeau de bain en éponge douce.",
    features: [
      "Formules 98% d'ingrédients d'origine naturelle",
      "Parfums relaxants lavande & fleur d'oranger",
      "Panière tressée réutilisable offerte",
      "100% végétalien et non testé sur les animaux"
    ],
    options: {
      models: ["Parfum Lavande & Miel", "Parfum Vanille & Karité"]
    }
  },
  {
    id: "nlg-012",
    name: "Set Fitness & Yoga Premium avec Tapis Antidérapant",
    category: "sport",
    recipient: "femmes",
    price: 19500,
    oldPrice: 26000,
    badge: "Bonne Résolution",
    rating: 4.7,
    reviewsCount: 68,
    isPromo: false,
    isBestseller: false,
    budgetTier: "low",
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Le cadeau parfait pour aborder la nouvelle année en pleine forme ! Kit complet comprenant un tapis de yoga en TPE écologique extra-épais (6mm), un jeu de 3 élastiques de résistance en tissu et une gourde isotherme inox 750ml.",
    features: [
      "Tapis haute densité amortissant 183x61cm",
      "3 bandes élastiques de résistance graduée",
      "Gourde double paroi garde le frais 24h",
      "Sangle de transport et sac filet inclus"
    ],
    options: {
      colors: ["Rose Poudré & Or", "Vert Sauge & Argent", "Bleu Nuit"]
    }
  },
  {
    id: "nlg-013",
    name: "Tasse Mug Isotherme de Noël en Céramique avec Couvercle",
    category: "maison",
    recipient: "couples",
    price: 6500,
    oldPrice: 9000,
    badge: "Top Petit Prix",
    rating: 4.9,
    reviewsCount: 388,
    isPromo: true,
    isBestseller: true,
    budgetTier: "budget", // under 10k
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Savourez votre chocolat chaud ou café au coin du feu dans cette ravissante tasse en céramique ornée d'un père Noël en relief et d'une petite cuillère dorée. Couvercle hermétique avec poignée en étoile.",
    features: [
      "Contenance généreuse : 450ml",
      "Céramique de qualité compatible micro-ondes",
      "Cuillère en inox doré incluse",
      "Boîte cadeau festive prête à offrir"
    ],
    options: {
      colors: ["Rouge Père Noël", "Vert Sapin Festif", "Blanc Flocon"]
    }
  },
  {
    id: "nlg-014",
    name: "Drone Caméra 4K Pliable avec Sacoche Voyage",
    category: "hightech",
    recipient: "hommes",
    price: 115000,
    oldPrice: 160000,
    badge: "-28% Promo",
    rating: 4.8,
    reviewsCount: 82,
    isPromo: true,
    isBestseller: false,
    budgetTier: "premium",
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Capturez des souvenirs inoubliables en très haute définition. Ce drone compact intègre une caméra 4K stabilisée, un retour vidéo en direct 5GHz sur smartphone, un suivi intelligent des personnes et un retour automatique au point de décollage en cas de batterie faible.",
    features: [
      "Caméra 4K UHD avec angle réglable 90°",
      "Autonomie de vol : 28 minutes par batterie",
      "2 batteries incluses dans le pack",
      "Portée de transmission jusqu'à 1,2 km"
    ],
    options: {
      models: ["Pack Standard 1 Batterie", "Pack Combo 2 Batteries + Sacoche"]
    }
  },
  {
    id: "nlg-015",
    name: "Pull de Noël Jacquard Tricoté 'Magie des Rennes'",
    category: "mode",
    recipient: "couples",
    price: 16500,
    oldPrice: 22000,
    badge: "Incontournable",
    rating: 4.8,
    reviewsCount: 240,
    isPromo: true,
    isBestseller: true,
    budgetTier: "low",
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Le classique indémodable des fêtes ! Un pull tricoté ultra-doux avec motifs rennes et flocons de neige en jacquard traditionnel. Coupe unisexe confortable, parfaite pour les photos de famille et les soirées conviviales.",
    features: [
      "Maille douce ne gratte pas (toucher cachemire)",
      "Col rond et poignets côtelés résistants",
      "Lavable en machine à 30°C",
      "Existe en version assortie pour couples"
    ],
    options: {
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Rouge Noël & Blanc", "Bleu Marine & Blanc", "Vert Forêt & Doré"]
    }
  },
  {
    id: "nlg-016",
    name: "Skateboard Cruiser Rétro Bois d'Érable Canadien",
    category: "mobilite",
    recipient: "adolescents",
    price: 32000,
    oldPrice: 45000,
    badge: "Look Rétro",
    rating: 4.9,
    reviewsCount: 71,
    isPromo: true,
    isBestseller: false,
    budgetTier: "medium",
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Un cruiser stylé au design rétro californien pour glisser en ville avec un confort sans pareil. Plateau 7 plis en érable rigide, roues en polyuréthane souple 78A absorbant les aspérités de la route et roulements ABEC-9 ultra-fluides.",
    features: [
      "Longueur 28 pouces idéale pour le transport",
      "Trucks en aluminium haute résistance",
      "Roues lumineuses LED qui brillent en roulant",
      "Grip antidérapant transparent sérigraphié"
    ],
    options: {
      colors: ["Bois Naturel & Roues Rouge Festif", "Noir Minimaliste & Roues Dorées"]
    }
  },
  {
    id: "nlg-017",
    name: "Bougie Gourmande 'Pain d'Épices & Cannelle' 300g",
    category: "maison",
    recipient: "femmes",
    price: 8500,
    oldPrice: 12000,
    badge: "Coup de Cœur",
    rating: 5.0,
    reviewsCount: 198,
    isPromo: true,
    isBestseller: true,
    budgetTier: "budget", // under 10k
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Embaumez votre intérieur d'effluves festives et chaleureuses. Coulée à la main avec de la cire de soja 100% végétale et dotée d'une mèche en bois qui crépite doucement comme un feu de cheminée.",
    features: [
      "Durée de combustion : environ 65 heures",
      "Mèche en bois crépitante relaxante",
      "Pot en verre ambré réutilisable avec couvercle liège",
      "Huiles parfumées sans CMR de Grasse"
    ],
    options: {
      models: ["Pain d'épices & Miel", "Sapin Enneigé & Eucalyptus", "Chocolat Chaud & Noisette"]
    }
  },
  {
    id: "nlg-018",
    name: "Parure Collier & Boucles d'Oreilles Cristal Scintillant",
    category: "accessoires",
    recipient: "femmes",
    price: 26000,
    oldPrice: 38000,
    badge: "Élégance",
    rating: 4.9,
    reviewsCount: 142,
    isPromo: true,
    isBestseller: true,
    budgetTier: "medium",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Sublimez vos tenues de réveillon avec cette parure éclatante. Pendentif goutte d'eau facetté en cristal autrichien monté sur chaîne plaquée or 18k anti-allergique, assorti d'une paire de boucles d'oreilles pendantes légères.",
    features: [
      "Placage or 18 carats 3 microns résistant",
      "Cristaux facettés taillés au laser",
      "Longueur de chaîne 45 cm + 5 cm d'extension",
      "Écrin velours rouge bijouterie offert"
    ],
    options: {
      colors: ["Or Jaune & Cristal Aurore Boréale", "Or Blanc & Cristal Rubis", "Or Rose & Cristal Champagne"]
    }
  },
  {
    id: "nlg-019",
    name: "Circuit de Voitures Électrique avec 2 Bolides Lumineux",
    category: "jouets",
    recipient: "enfants",
    price: 18000,
    oldPrice: 25000,
    badge: "Fous Rires",
    rating: 4.8,
    reviewsCount: 175,
    isPromo: true,
    isBestseller: false,
    budgetTier: "low",
    stock: 32,
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Le cadeau de Noël rêvé des petits pilotes ! Un grand circuit modulable de 5,4 mètres avec loopings sensationnels, virages relevés et 2 voitures de course équipées de phares LED pour des duels endiablés dans le noir.",
    features: [
      "Longueur de piste : 5,4 mètres modulables",
      "2 manettes avec turbo boost progressif",
      "Compteur de tours automatique",
      "Assemblage clipsable facile et solide"
    ],
    options: {
      models: ["Version F1 Racing", "Version Monster Trucks"]
    }
  },
  {
    id: "nlg-020",
    name: "Panier Gourmand 'Noël Délices & Chocolats d'Or'",
    category: "coffrets",
    recipient: "couples",
    price: 29500,
    oldPrice: 39000,
    badge: "Gourmand",
    rating: 4.9,
    reviewsCount: 220,
    isPromo: true,
    isBestseller: true,
    budgetTier: "medium",
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80"
    ],
    description: "Une corbeille garnie d'exception pour régaler toute la famille. Contient des truffes au chocolat noir pur beurre de cacao, des biscuits sablés pur beurre aux épices de Noël, de la confiture artisanale figues & noix et du nougat tendre aux amandes dorées.",
    features: [
      "6 spécialités gourmandes artisanales",
      "Corbeille en osier tressée main décorative",
      "Papier cristal et nœud festif soigné",
      "Fiche dégustation et conseils accords"
    ],
    options: {
      models: ["Sélection Douceur Sucrée", "Sélection Épicerie Fine & Chocolats"]
    }
  }
];

const RECIPIENTS = [
  { id: "hommes", name: "Cadeaux pour Hommes", icon: "user", count: 8, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  { id: "femmes", name: "Cadeaux pour Femmes", icon: "smile", count: 11, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
  { id: "enfants", name: "Cadeaux pour Enfants", icon: "heart", count: 7, image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80" },
  { id: "adolescents", name: "Cadeaux pour Ados", icon: "zap", count: 6, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" },
  { id: "couples", name: "Cadeaux pour Couples", icon: "users", count: 9, image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80" }
];

const BUDGET_RANGES = [
  { id: "budget", name: "Moins de 10 000 FCFA", max: 10000, description: "Petites attentions festives et cadeaux secrets" },
  { id: "low", name: "Entre 10 000 et 25 000 FCFA", max: 25000, description: "De superbes idées pour gâter ses proches" },
  { id: "medium", name: "Entre 25 000 et 50 000 FCFA", max: 50000, description: "Cadeaux généreux et coffrets complets" },
  { id: "premium", name: "Plus de 50 000 FCFA", max: 999999, description: "L'exceptionnel pour marquer les esprits" }
];
