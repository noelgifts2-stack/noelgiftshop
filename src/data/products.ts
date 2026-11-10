import { Category, Product } from '@/types';
import { FASHION_PRODUCTS } from './catalog/mode';
import { SHOES_PRODUCTS } from './catalog/chaussures';
import { TOY_PRODUCTS } from './catalog/jouets';
import { MOBILITE_PRODUCTS } from './catalog/mobilite';
import { HIGHTECH_PRODUCTS } from './catalog/hightech';
import { ACCESSOIRES_PRODUCTS } from './catalog/accessoires';
import { BEAUTE_PRODUCTS } from './catalog/beaute';
import { MAISON_PRODUCTS } from './catalog/maison';
import { SPORT_PRODUCTS } from './catalog/sport';
import { COFFRET_PRODUCTS } from './catalog/coffrets';

export const CATEGORIES: Category[] = [
  {
    id: "mode",
    slug: "mode",
    googleProductCategoryId: 1604,
    icon: "shirt",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Tendance",
      en: "Trending",
      de: "Im Trend",
      es: "Tendencia"
    },
    name: {
      fr: "Mode & Vêtements",
      en: "Fashion & Clothing",
      de: "Mode & Kleidung",
      es: "Moda & Ropa"
    },
    description: {
      fr: "Pulls de Noël jacquard en laine mérinos, manteaux chauds ceinturés et tenues raffinées pour les fêtes.",
      en: "Merino wool jacquard holiday sweaters, belted warm coats, and refined festive outfits.",
      de: "Jacquard-Weihnachtspullover aus Merinowolle, warme Wollmäntel und festliche Kleidung.",
      es: "Jerséis navideños de lana merina, abrigos cálidos con cinturón y prendas de fiesta."
    },
    subcategories: {
      fr: ["Pulls de Noël", "Manteaux d'Hiver", "Pyjamas de Fête", "Écharpes & Cachemire", "Gants en Cuir"],
      en: ["Holiday Sweaters", "Winter Coats", "Holiday Pajamas", "Cashmere Scarves", "Leather Gloves"],
      de: ["Weihnachtspullover", "Wintermäntel", "Festliche Schlafanzüge", "Kaschmirschals", "Lederhandschuhe"],
      es: ["Jerséis Navideños", "Abrigos de Invierno", "Pijamas Festivos", "Bufandas de Cachemira", "Guantes de Cuero"]
    }
  },
  {
    id: "chaussures",
    slug: "chaussures",
    googleProductCategoryId: 187,
    icon: "footprints",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Populaire",
      en: "Popular",
      de: "Beliebt",
      es: "Popular"
    },
    name: {
      fr: "Chaussures & Sneakers",
      en: "Shoes & Footwear",
      de: "Schuhe & Stiefel",
      es: "Calzado & Botas"
    },
    description: {
      fr: "Chaussons moelleux en peau de mouton, bottines d'hiver imperméables et mocassins vernis de réveillon.",
      en: "Plush genuine sheepskin slippers, waterproof winter boots, and patent holiday loafers.",
      de: "Kuschelige Lammfell-Hausschuhe, wasserdichte Winterstiefel und festliche Lackschuhe.",
      es: "Pantuflas de piel de oveja natural, botas de invierno impermeables y mocasines de gala."
    },
    subcategories: {
      fr: ["Chaussons Fourrés", "Bottines d'Hiver", "Après-Skis Thermiques", "Mocassins de Soirée"],
      en: ["Lined Slippers", "Winter Boots", "Thermal Snow Boots", "Evening Loafers"],
      de: ["Lammfell-Hausschuhe", "Winterstiefel", "Thermo-Schneestiefel", "Abendschuhe"],
      es: ["Pantuflas Forradas", "Botines de Invierno", "Botas de Nieve", "Mocasines de Fiesta"]
    }
  },
  {
    id: "jouets",
    slug: "jouets",
    googleProductCategoryId: 1239,
    icon: "baby",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Magie de Noël",
      en: "Holiday Magic",
      de: "Weihnachtszauber",
      es: "Magia Navideña"
    },
    name: {
      fr: "Jouets & Enfants",
      en: "Toys & Children",
      de: "Spielzeug & Kinder",
      es: "Juguetes & Niños"
    },
    description: {
      fr: "Circuits de train en bois massif de hêtre, peluches géantes ultra douces certifiées CE et jeux de société familiaux.",
      en: "Solid beechwood train sets, giant CE-certified plush teddy bears, and family strategy board games.",
      de: "Massivholz-Eisenbahnen, riesige CE-zertifizierte Plüschbären und Gesellschaftsspiele.",
      es: "Circuitos de tren de madera maciza, peluches gigantes certificados CE y juegos de mesa familiares."
    },
    subcategories: {
      fr: ["Jouets en Bois", "Peluches Géantes", "Jeux de Société", "Éveil & Premiers Âges"],
      en: ["Wooden Toys", "Giant Plush Toys", "Board Games", "Early Learning"],
      de: ["Holzspielzeug", "Riesen-Plüschtiere", "Brettspiele", "Frühförderung"],
      es: ["Juguetes de Madera", "Peluches Gigantes", "Juegos de Mesa", "Estimulación Temprana"]
    }
  },
  {
    id: "mobilite",
    slug: "mobilite",
    googleProductCategoryId: 4976,
    icon: "zap",
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Sensations",
      en: "Thrill",
      de: "Action",
      es: "Aventura"
    },
    name: {
      fr: "Trottinettes & Glisse",
      en: "Scooters & Skateboards",
      de: "Roller & Skateboards",
      es: "Patinetes & Skateboards"
    },
    description: {
      fr: "Trottinettes électriques urbaines certifiées, skateboards en érable canadien 7 plis et casques LED connectés.",
      en: "Certified urban electric scooters, 7-ply Canadian maple skateboards, and smart LED helmets.",
      de: "Zertifizierte E-Scooter, 7-lagige Ahorn-Skateboards und smarte LED-Helme.",
      es: "Patinetes eléctricos homologados, monopatines de arce canadiense y cascos inteligentes LED."
    },
    subcategories: {
      fr: ["Trottinettes Électriques", "Skateboards & Cruisers", "Trottinettes Enfants", "Casques & Protections"],
      en: ["Electric Scooters", "Skateboards & Cruisers", "Kids Scooters", "Helmets & Safety"],
      de: ["E-Scooter", "Skateboards & Cruiser", "Kinderroller", "Helme & Schutzausrüstung"],
      es: ["Patinetes Eléctricos", "Skateboards y Cruisers", "Patinetes Infantiles", "Cascos y Protección"]
    }
  },
  {
    id: "hightech",
    slug: "hightech",
    googleProductCategoryId: 222,
    icon: "smartphone",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Best-seller",
      en: "Best Seller",
      de: "Bestseller",
      es: "Más Vendido"
    },
    name: {
      fr: "High-Tech & Gadgets",
      en: "High-Tech & Gadgets",
      de: "Elektronik & Gadgets",
      es: "Tecnología & Gadgets"
    },
    description: {
      fr: "Casques audio sans fil avec réduction active de bruit, enceintes nomades étanches IPX7 et réveils lumière douce.",
      en: "Wireless active noise-cancelling headphones, IPX7 waterproof portable speakers, and sunrise wake-up lamps.",
      de: "Kabellose ANC-Kopfhörer, wasserdichte IPX7 Bluetooth-Lautsprecher und sanfte Lichtwecker.",
      es: "Auriculares inalámbricos con cancelación activa de ruido, altavoces acuáticos y lámparas despertador."
    },
    subcategories: {
      fr: ["Casques & Écouteurs", "Enceintes Bluetooth", "Maison Connectée", "Recharge Sans Fil"],
      en: ["Headphones & Earbuds", "Bluetooth Speakers", "Smart Home", "Wireless Chargers"],
      de: ["Kopfhörer & In-Ears", "Bluetooth-Lautsprecher", "Smart Home", "Kabellose Ladestationen"],
      es: ["Auriculares", "Altavoces Bluetooth", "Hogar Inteligente", "Cargadores Inalámbricos"]
    }
  },
  {
    id: "accessoires",
    slug: "accessoires",
    googleProductCategoryId: 188,
    icon: "watch",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Élégance",
      en: "Elegance",
      de: "Eleganz",
      es: "Elegancia"
    },
    name: {
      fr: "Montres & Bijoux",
      en: "Watches & Jewelry",
      de: "Uhren & Schmuck",
      es: "Relojes & Joyas"
    },
    description: {
      fr: "Montres chronographes automatiques japonaises, colliers étoile en argent 925 et maroquinerie en cuir pleine fleur.",
      en: "Japanese automatic chronograph watches, 925 sterling silver star necklaces, and full-grain leather goods.",
      de: "Japanische Automatik-Chronographen, 925er Silber Sternketten und feine Vollnarbenlederwaren.",
      es: "Relojes cronógrafos automáticos, colgantes estrella de plata 925 y carteras de cuero plena flor."
    },
    subcategories: {
      fr: ["Montres Automatiques", "Colliers & Pendentifs", "Portefeuilles RFID", "Boutons de Manchette"],
      en: ["Automatic Watches", "Necklaces & Pendants", "RFID Wallets", "Cufflinks"],
      de: ["Automatenuhren", "Halsketten & Anhänger", "RFID-Geldbörsen", "Manschettenknöpfe"],
      es: ["Relojes Automáticos", "Collares y Colgantes", "Carteras RFID", "Gemelos de Gala"]
    }
  },
  {
    id: "beaute",
    slug: "beaute",
    googleProductCategoryId: 469,
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Sublime",
      en: "Exquisite",
      de: "Exklusiv",
      es: "Sublime"
    },
    name: {
      fr: "Beauté & Parfums",
      en: "Beauty & Fragrances",
      de: "Schönheit & Parfüm",
      es: "Belleza & Perfumes"
    },
    description: {
      fr: "Eaux de parfum intenses ambrées, coffrets spa relaxants aux huiles bio et diffuseurs d'arômes à ultrasons.",
      en: "Intense amber eaux de parfum, relaxing organic oil spa hampers, and ultrasonic aromatherapy diffusers.",
      de: "Intensive Amber-Eaux de Parfum, entspannende Bio-Spa-Geschenksets und Ultraschall-Aromadiffusoren.",
      es: "Eaux de parfum intensas de ámbar, cofres spa relajantes con aceites orgánicos y difusores ultrasónicos."
    },
    subcategories: {
      fr: ["Parfums d'Exception", "Coffrets Spa & Détente", "Soins Barbe & Homme", "Diffuseurs d'Arômes"],
      en: ["Prestige Perfumes", "Spa & Relaxation Sets", "Men's Grooming", "Aroma Diffusers"],
      de: ["Edle Parfüms", "Spa- & Verwöhnsets", "Herrenpflege & Rasur", "Aromadiffusoren"],
      es: ["Perfumes Exclusivos", "Sets de Spa y Relax", "Cuidado de Barba", "Difusores Aromáticos"]
    }
  },
  {
    id: "maison",
    slug: "maison",
    googleProductCategoryId: 696,
    icon: "home",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Cocooning",
      en: "Cozy Home",
      de: "Wohlfühlen",
      es: "Hogar Acogedor"
    },
    name: {
      fr: "Maison & Décoration",
      en: "Home & Holiday Decor",
      de: "Heim & Festdeko",
      es: "Hogar & Decoración"
    },
    description: {
      fr: "Couronnes de Noël en sapin naturel séché, plaids canapé grosse maille chenille et vaisselle en porcelaine fine or.",
      en: "Natural preserved pine holiday wreaths, chunky chenille cozy throw blankets, and fine porcelain gold tableware.",
      de: "Echte Tannenkranz-Türkränze, kuschelige Grobstrickdecken und feinstes Goldrand-Porzellangeschirr.",
      es: "Coronas navideñas de pino natural, mantas de punto grueso chenilla y vajillas de porcelana con ribete dorado."
    },
    subcategories: {
      fr: ["Couronnes & Végétal", "Plaids Moelleux", "Arts de la Table Festifs", "Guirlandes Féeriques"],
      en: ["Wreaths & Botanicals", "Cozy Blankets", "Holiday Dinnerware", "Fairy Lights"],
      de: ["Türkränze & Naturdeko", "Kuscheldecken", "Festliches Geschirr", "Lichtervorhänge"],
      es: ["Coronas Navideñas", "Mantas Cálidas", "Vajillas Festivas", "Guirnaldas de Luces"]
    }
  },
  {
    id: "sport",
    slug: "sport",
    googleProductCategoryId: 988,
    icon: "activity",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Vitalité",
      en: "Wellness",
      de: "Fitness",
      es: "Vitalidad"
    },
    name: {
      fr: "Sport & Bien-être",
      en: "Sports & Wellness",
      de: "Sport & Fitness",
      es: "Deporte & Bienestar"
    },
    description: {
      fr: "Pistolets de massage musculaire thérapeutique 30 vitesses, tapis de yoga en liège naturel et sacs de randonnée étanches.",
      en: "Therapeutic 30-speed muscle massage guns, natural cork eco yoga mats, and waterproof hiking backpacks.",
      de: "Therapeutische 30-Stufen-Massagepistolen, Naturkork-Yogamatten und wasserdichte Wanderrucksäcke.",
      es: "Pistolas de masaje terapéutico de 30 velocidades, esterillas de corcho natural y mochilas de senderismo."
    },
    subcategories: {
      fr: ["Pistolets de Massage", "Yoga & Liège Naturel", "Sacs à Dos Randonnée", "Bouteilles Isothermes Inox"],
      en: ["Massage Guns", "Natural Cork Yoga", "Hiking Backpacks", "Insulated Water Bottles"],
      de: ["Massagepistolen", "Naturkork-Yoga", "Wanderrucksäcke", "Edelstahl-Thermosflaschen"],
      es: ["Pistolas de Masaje", "Yoga de Corcho Natural", "Mochilas Técnicas", "Botellas Térmicas"]
    }
  },
  {
    id: "coffrets",
    slug: "coffrets",
    googleProductCategoryId: 422,
    icon: "gift",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80",
    badge: {
      fr: "Prêt à offrir",
      en: "Ready to Gift",
      de: "Geschenkfertig",
      es: "Listo para regalar"
    },
    name: {
      fr: "Coffrets Cadeaux",
      en: "Holiday Gift Sets",
      de: "Geschenkboxen",
      es: "Sets de Regalo"
    },
    description: {
      fr: "Paniers gourmands du terroir avec foie gras et confiture de figues, boîtes de chocolats grands crus et coffrets dégustation thés bio.",
      en: "French artisan gourmet hampers with foie gras, grand cru single-origin chocolates, and organic festive tea sets.",
      de: "Festliche Feinkostkörbe mit Spezialitäten, Grand-Cru-Pralinés und exklusive Bio-Weihnachtstees.",
      es: "Cestas gourmet del terruño con foie gras, cajas de bombones grand cru y surtidos de tés ecológicos."
    },
    subcategories: {
      fr: ["Paniers Gourmands Terroir", "Chocolats Grands Crus", "Thés & Infusions Bio", "Spiriteux & Dégustation"],
      en: ["Gourmet Holiday Hampers", "Grand Cru Chocolates", "Organic Festive Teas", "Spirits & Tasting Sets"],
      de: ["Traditionelle Feinkostkörbe", "Grand-Cru-Schokoladen", "Bio-Festtagstees", "Spirituosen-Verkostungssets"],
      es: ["Cestas Gourmet Tradicionales", "Bombones Grand Cru", "Tés e Infusiones Bio", "Licores y Degustación"]
    }
  }
];

export const PRODUCTS: Product[] = [
  ...FASHION_PRODUCTS,
  ...SHOES_PRODUCTS,
  ...TOY_PRODUCTS,
  ...MOBILITE_PRODUCTS,
  ...HIGHTECH_PRODUCTS,
  ...ACCESSOIRES_PRODUCTS,
  ...BEAUTE_PRODUCTS,
  ...MAISON_PRODUCTS,
  ...SPORT_PRODUCTS,
  ...COFFRET_PRODUCTS
];
