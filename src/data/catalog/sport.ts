import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const SPORT_IMAGES = [
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80'
];

interface SportTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  recipient: 'men' | 'women' | 'teens';
}

const TEMPLATES: SportTemplate[] = [
  {
    subcat: 'Récupération & Massage',
    titles: {
      fr: 'Pistolet de Massage Musculaire Thérapeutique 30 Vitesses Ultra Silencieux',
      en: 'Therapeutic Muscle Massage Gun 30 Speeds Ultra Quiet',
      de: 'Therapeutische Muskelmassagepistole 30 Stufen Flüsterleise',
      es: 'Pistola de Masaje Muscular Terapéutica 30 Velocidades Silenciosa'
    },
    desc: {
      fr: 'Soulage les tensions et accélère la récupération sportive. Livré avec 6 têtes interchangeables et mallette de transport rigide premium.',
      en: 'Relieves muscle tension and speeds post-workout recovery. Includes 6 interchangeable heads and premium travel carrying case.',
      de: 'Löst Verspannungen und beschleunigt die Regeneration. Inklusive 6 Massageköpfen und robustem Premium-Koffer.',
      es: 'Alivia tensiones y acelera la recuperación deportiva. Incluye 6 cabezales intercambiables y maletín de transporte rígido.'
    },
    priceEur: 79.90,
    priceCad: 114.90,
    recipient: 'men'
  },
  {
    subcat: 'Yoga & Bien-être',
    titles: {
      fr: 'Tapis de Yoga Écologique en Liège Naturel et Caoutchouc Antidérapant',
      en: 'Eco-Friendly Natural Cork & Rubber Non-Slip Yoga Mat',
      de: 'Ökologische Yogamatte aus Naturkork & Rutschfestem Kautschuk',
      es: 'Esterilla de Yoga Ecológica de Corcho Natural y Caucho Antideslizante'
    },
    desc: {
      fr: 'Adhérence maximale même lors des séances intenses. Naturellement antibactérien, sans PVC ni odeurs chimiques, sangle de portage incluse.',
      en: 'Maximum grip even during sweaty workouts. Naturally antibacterial, PVC-free, with carrying strap included.',
      de: 'Maximaler Halt auch bei schweißtreibenden Einheiten. Natürlich antibakteriell, ohne PVC, inklusive Tragegurt.',
      es: 'Adherencia máxima incluso con sudor. Naturalmente antibacteriana, sin PVC ni olores, incluye correa de transporte.'
    },
    priceEur: 55.00,
    priceCad: 78.00,
    recipient: 'women'
  },
  {
    subcat: 'Randonnée & Plein Air',
    titles: {
      fr: 'Sac à Dos de Randonnée Étanche 35L avec Housse de Pluie & Ergonomie Dorsale',
      en: 'Waterproof 35L Hiking Backpack with Rain Cover & Ergonomic Back Support',
      de: 'Wasserdichter 35L Wanderrucksack mit Regenhülle & Ergonomischem Rückenteil',
      es: 'Mochila de Senderismo Impermeable 35L con Funda de Lluvia y Respaldo Ergonómico'
    },
    desc: {
      fr: 'Conçu pour les amoureux de grands espaces et balades hivernales. Tissu ripstop indéchirable, compartiment poche à eau et sangles ventilées.',
      en: 'Built for outdoor lovers and winter treks. Tear-resistant ripstop fabric, hydration bladder compartment, and breathable straps.',
      de: 'Konzipiert für Outdoor-Liebhaber und Winterwanderungen. Reißfestes Ripstop-Gewebe, Trinkblasen-Fach und belüftete Träger.',
      es: 'Diseñada para amantes de la naturaleza y rutas de invierno. Tejido ripstop antidesgarro, compartimento para bolsa de agua.'
    },
    priceEur: 69.90,
    priceCad: 99.90,
    recipient: 'men'
  },
  {
    subcat: 'Bouteilles & Thermos',
    titles: {
      fr: 'Bouteille Isotherme Inox Double Paroi 1L Maintien Chaud 24h & Froid 36h',
      en: 'Double-Walled 1L Stainless Steel Insulated Water Bottle Keeps Hot 24h',
      de: 'Doppelwandige 1L Edelstahl-Thermosflasche Hält 24h Heiß & 36h Kalt',
      es: 'Botella Térmica de Acero Inoxidable 1L Doble Pared Mantiene Caliente 24h'
    },
    desc: {
      fr: 'Emportez vos chocolats chauds et tisanes de Noël partout. Zéro fuite garanti, acier inoxydable 18/8 de qualité alimentaire sans arrière-goût.',
      en: 'Take hot cocoa and holiday tea anywhere. Guaranteed leak-proof, food-grade 18/8 stainless steel with zero metallic taste.',
      de: 'Genießen Sie heißen Kakao und Wintertee überall. 100% auslaufsicher, lebensmittelechter 18/8 Edelstahl ohne Beigeschmack.',
      es: 'Lleve su chocolate caliente o té a cualquier parte. Cero fugas garantizado, acero 18/8 de grado alimentario.'
    },
    priceEur: 32.90,
    priceCad: 46.90,
    recipient: 'teens'
  }
];

export const SPORT_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `sport-${String(num).padStart(3, '0')}`;
  const sku = `NLG-SPRT-${String(num).padStart(4, '0')}`;
  const prefix12 = `3709234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = SPORT_IMAGES[index % SPORT_IMAGES.length];
  
  const priceVariation = (index % 4) * 4.5;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 5 === 3;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Sport & Aventure Hivernale',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Sporting Goods',
    gender: 'unisex',
    ageGroup: 'adult',
    categorySlug: 'sport',
    recipient: tpl.recipient,
    budgetTier: finalEur < 45 ? 'budget' : finalEur < 90 ? 'low' : 'medium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 16 + (index % 35),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.7 + ((index % 4) * 0.07)).toFixed(1)),
    reviewsCount: 14 + ((index * 8) % 70),
    isBestseller: index % 7 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Série N°${num}`,
      en: `${tpl.titles.en} Series #${num}`,
      de: `${tpl.titles.de} Serie Nr. ${num}`,
      es: `${tpl.titles.es} Serie Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Matériaux haute résistance et durabilité éprouvée', 'Garantie constructeur 2 ans', 'Livraison rapide avec suivi sécurisé'],
      en: ['Heavy-duty materials and proven durability', '2-year manufacturer warranty', 'Fast secure tracked shipping'],
      de: ['Hochbelastbare Materialien und geprüfte Langlebigkeit', '2 Jahre Herstellergarantie', 'Schneller versicherter Versand'],
      es: ['Materiales de alta resistencia y durabilidad', 'Garantía de 2 años', 'Envío rápido con seguimiento asegurado']
    },
    badge: {
      fr: isPromo ? 'Forme & Santé' : 'Énergie',
      en: isPromo ? 'Fitness Deal' : 'Energy',
      de: isPromo ? 'Fitness-Angebot' : 'Power',
      es: isPromo ? 'Oferta Fitness' : 'Energía'
    }
  };
});
