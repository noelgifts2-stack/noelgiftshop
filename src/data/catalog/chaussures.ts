import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const SHOES_IMAGES = [
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
];

interface ShoeTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  gender: 'unisex' | 'male' | 'female';
  recipient: 'men' | 'women' | 'kids' | 'teens' | 'couples';
  color: string;
  sizes: string[];
}

const TEMPLATES: ShoeTemplate[] = [
  {
    subcat: 'Chaussons & Pantoufles',
    titles: {
      fr: 'Chaussons Fourrés Laine de Mouton Véritable Semelle Suède',
      en: 'Genuine Sheepskin Lined Suede Slippers',
      de: 'Echte Lammfell-Hausschuhe mit Wildledersohle',
      es: 'Pantuflas Forradas de Piel de Oveja Auténtica y Gamuza'
    },
    desc: {
      fr: 'Chaleur naturelle et douceur incomparable. Doublure 100% laine de mouton véritable respirante et semelle d\'usure antidérapante en caoutchouc naturel.',
      en: 'Natural warmth and incomparable softness. 100% breathable real sheepskin lining and non-slip natural rubber outsole.',
      de: 'Natürliche Wärme und unvergleichliche Weichheit. 100% atmungsaktives Lammfellfutter und rutschfeste Naturkautschuksohle.',
      es: 'Calidez natural y suavidad incomparable. Forro 100% piel de oveja transpirable y suela antideslizante de caucho natural.'
    },
    priceEur: 69.00,
    priceCad: 98.00,
    gender: 'unisex',
    recipient: 'couples',
    color: 'Châtaigne Naturel',
    sizes: ['37', '38', '39', '40', '41', '42', '43', '44']
  },
  {
    subcat: 'Bottines d\'Hiver',
    titles: {
      fr: 'Bottines d\'Hiver Cuir Gras Imperméable Cousu Goodyear',
      en: 'Waterproof Oiled Leather Winter Boots Goodyear Welted',
      de: 'Wasserdichte Winterstiefel aus gefettetem Leder Rahmengenäht',
      es: 'Botas de Invierno de Cuero Encerado Impermeables Goodyear'
    },
    desc: {
      fr: 'Cuir pleine fleur épais traité déperlant, membrane imperméable et respirante, semelle crantée tout-terrain pour la neige et le verglas.',
      en: 'Thick full-grain water-repellent leather, waterproof and breathable membrane, all-terrain lug sole for snow and ice.',
      de: 'Dickes, wasserabweisendes Vollnarbenleder, wasserdichte und atmungsaktive Membran, All-Terrain-Profilsohle für Schnee und Eis.',
      es: 'Cuero plena flor repelente al agua, membrana impermeable y transpirable, suela dentada todoterreno para nieve y hielo.'
    },
    priceEur: 165.00,
    priceCad: 235.00,
    gender: 'male',
    recipient: 'men',
    color: 'Brun Cognac',
    sizes: ['40', '41', '42', '43', '44', '45']
  },
  {
    subcat: 'Mocassins & Soirée',
    titles: {
      fr: 'Mocassins en Cuir Verni Festif Finition Mors Doré',
      en: 'Festive Patent Leather Loafers with Gold Horsebit',
      de: 'Festliche Lackleder-Mokassins mit Goldener Trense',
      es: 'Mocasines de Charol Festivo con Detalle Dorado'
    },
    desc: {
      fr: 'L\'élégance absolue pour les soirs de fête. Cuir verni souple de fabrication artisanale, semelle cuir doublée confort.',
      en: 'Absolute elegance for festive evenings. Handcrafted supple patent leather, cushioned leather-lined sole.',
      de: 'Absolute Eleganz für festliche Abende. Handgefertigtes weiches Lackleder, gepolsterte ledergefütterte Sohle.',
      es: 'Elegancia absoluta para las noches de fiesta. Cuero charol suave de fabricación artesanal, plantilla de cuero acolchada.'
    },
    priceEur: 129.00,
    priceCad: 184.00,
    gender: 'male',
    recipient: 'men',
    color: 'Noir Miroir',
    sizes: ['39', '40', '41', '42', '43', '44']
  },
  {
    subcat: 'Bottes Neige & Montagne',
    titles: {
      fr: 'Après-Skis Doublés Polaire Thermique Grand Froid',
      en: 'Thermal Fleece Lined Extreme Cold Snow Boots',
      de: 'Thermovlies-gefütterte Extreme Kälte Winter-Schneestiefel',
      es: 'Botas de Nieve Térmicas con Forro Polar para Clima Extremo'
    },
    desc: {
      fr: 'Protection thermique certifiée jusqu\'à -25°C. Coque étanche et laçage rapide sécurisé avec bandes réfléchissantes.',
      en: 'Certified thermal protection down to -25°C. Waterproof shell and secure quick-lacing with reflective details.',
      de: 'Zertifizierter Kälteschutz bis -25°C. Wasserdichte Schale und sichere Schnellschnürung mit reflektierenden Details.',
      es: 'Protección térmica certificada hasta -25°C. Carcasa impermeable y cordones rápidos seguros con detalles reflectantes.'
    },
    priceEur: 119.00,
    priceCad: 169.00,
    gender: 'female',
    recipient: 'women',
    color: 'Blanc Neige & Camel',
    sizes: ['36', '37', '38', '39', '40', '41']
  }
];

export const SHOES_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `chaussures-${String(num).padStart(3, '0')}`;
  const sku = `NLG-SHOE-${String(num).padStart(4, '0')}`;
  const prefix12 = `3702234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = SHOES_IMAGES[index % SHOES_IMAGES.length];
  
  const priceVariation = (index % 5) * 5;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 4 === 1;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Chausseur Festif & Cie',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Apparel & Accessories > Shoes',
    gender: tpl.gender,
    ageGroup: 'adult',
    color: tpl.color,
    size: tpl.sizes[0],
    categorySlug: 'chaussures',
    recipient: tpl.recipient,
    budgetTier: finalEur < 80 ? 'low' : finalEur < 150 ? 'medium' : 'premium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 12 + (index % 30),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.7 + ((index % 4) * 0.07)).toFixed(1)),
    reviewsCount: 18 + ((index * 9) % 75),
    isBestseller: index % 6 === 0,
    isPromo,
    options: {
      sizes: tpl.sizes,
      colors: [tpl.color, 'Noir Profond', 'Gris Anthracite']
    },
    title: {
      fr: `${tpl.titles.fr} Série N°${num}`,
      en: `${tpl.titles.en} Series #${num}`,
      de: `${tpl.titles.de} Serie Nr. ${num}`,
      es: `${tpl.titles.es} Serie Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Cuir et doublures de première sélection', 'Semelle confort mémoire de forme', 'Boîte à chaussures de prestige offerte'],
      en: ['Top-tier selected leather and lining', 'Memory foam cushioned comfort footbed', 'Luxury gift shoebox included'],
      de: ['Erstklassiges Leder und Innenfutter', 'Gepolstertes Memory-Schaum-Fußbett', 'Inklusive luxuriöser Geschenkschuhbox'],
      es: ['Cuero y forros de primera selección', 'Plantilla acolchada de espuma viscoelástica', 'Caja de zapatos de lujo incluida']
    },
    badge: {
      fr: isPromo ? 'Promo Hiver' : 'Best-Seller',
      en: isPromo ? 'Winter Deal' : 'Best Seller',
      de: isPromo ? 'Winterangebot' : 'Bestseller',
      es: isPromo ? 'Oferta Invierno' : 'Más Vendido'
    }
  };
});
