import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const COFFRET_IMAGES = [
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
];

interface CoffretTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  recipient: 'couples' | 'men' | 'women';
}

const TEMPLATES: CoffretTemplate[] = [
  {
    subcat: 'Gastronomie & Terroir',
    titles: {
      fr: 'Panier Gourmand Prestige Réveillon Foie Gras Confiture de Figue & Pain d\'Épices',
      en: 'Prestige Holiday Gourmet Hamper Foie Gras Fig Jam & Artisan Gingerbread',
      de: 'Prestige Festtags-Gourmetkorb Foie Gras Feigenkonfitüre & Lebkuchen',
      es: 'Cesta Gourmet Navideña Prestigio Foie Gras Mermelada de Higo y Pan de Especias'
    },
    desc: {
      fr: 'Une sélection raffinée de spécialités artisanales françaises de fête. Présenté dans une corbeille en osier tressée avec ruban doré de Noël.',
      en: 'A refined selection of artisan holiday French delicacies. Presented in a woven wicker hamper with festive gold satin bow.',
      de: 'Eine erlesene Auswahl traditioneller französischer Festtagsspezialitäten in einem geflochtenen Weidenkorb mit Goldschleife.',
      es: 'Selección refinada de especialidades artesanales de fiesta en cesta de mimbre trenzada con lazo dorado.'
    },
    priceEur: 89.00,
    priceCad: 126.00,
    recipient: 'couples'
  },
  {
    subcat: 'Chocolats & Douceurs',
    titles: {
      fr: 'Boîte de Chocolats Grands Crus de Noël Pralinés & Ganaches Pures Origines 500g',
      en: 'Grand Cru Holiday Chocolate Gift Box Pralines & Pure Origin Ganaches 500g',
      de: 'Grand-Cru-Weihnachtsschokoladen Schatulle Pralinés & Edel-Ganaches 500g',
      es: 'Caja de Bombones Navideños Grand Cru Pralinés y Ganaches de Origen 500g'
    },
    desc: {
      fr: 'Chocolats fins élaborés par des maîtres artisans chocolatiers. 100% pur beurre de cacao, sans huile de palme et cacaos équitables.',
      en: 'Fine chocolates crafted by master chocolatiers. 100% pure cocoa butter, palm-oil free, ethically sourced cocoa beans.',
      de: 'Feinste Schokoladen von Meister-Chocolatiers. 100% reine Kakaobutter, palmölfrei und aus fairem Anbau.',
      es: 'Bombones selectos elaborados por maestros chocolateros. 100% manteca de cacao pura, sin aceite de palma.'
    },
    priceEur: 39.90,
    priceCad: 56.90,
    recipient: 'couples'
  },
  {
    subcat: 'Thés & Infusions Festives',
    titles: {
      fr: 'Coffret Dégustation 24 Thés et Infusions Bio de Noël dans Leurs Boîtes Métal',
      en: 'Organic Holiday Tea Tasting Box 24 Blends in Collectible Metal Tins',
      de: 'Bio-Weihnachtstee Probierbox 24 Festtags-Mischungen in Metalldosen',
      es: 'Cofre Degustación de 24 Tés e Infusiones Ecológicas de Navidad en Latas'
    },
    desc: {
      fr: 'Parfums d\'agrumes, d\'épices d\'hiver, de cannelle et de pomme rôtie. Thés bio en feuilles entières dans un coffret en bois gravé.',
      en: 'Citrus, holiday spices, cinnamon, and baked apple aromas. Loose-leaf organic tea blends inside an engraved wooden chest.',
      de: 'Aromen von Zitrusfrüchten, Wintergewürzen, Zimt und Bratapfel. Bio-Ganzblatt-Tees in einer gravierten Holzschatulle.',
      es: 'Aromas a cítricos, especias de invierno, canela y manzana asada. Tés ecológicos de hoja entera en estuche de madera grabada.'
    },
    priceEur: 49.90,
    priceCad: 69.90,
    recipient: 'women'
  },
  {
    subcat: 'Spirueux & Dégustation',
    titles: {
      fr: 'Coffret Découverte Rhums Rares du Monde avec 2 Verres de Dégustation en Cristal',
      en: 'Rare World Rums Discovery Gift Set with 2 Crystal Tasting Snifters',
      de: 'Edles Rum-Entdecker-Set der Welt mit 2 Kristall-Verkostungsgläsern',
      es: 'Cofre Descubrimiento de Rones Raros del Mundo con 2 Copas de Cristal'
    },
    desc: {
      fr: '5 fioles de rhums vieux d\'exception (45ml) accompagnées d\'un guide de dégustation illustré et de verres tulipe spécialement taillés.',
      en: '5 exception aged rums vials (45ml) with illustrated tasting notes guide and specially cut crystal tulip glasses.',
      de: '5 Röhrchen exklusiver gereifter Rumsorten (45ml) mit bebildertem Verkostungsführer und zwei Kristallgläsern.',
      es: '5 viales de rones añejos de excepción (45ml) con guía ilustrada de cata y copas de cristal talladas.'
    },
    priceEur: 65.00,
    priceCad: 92.00,
    recipient: 'men'
  }
];

export const COFFRET_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `coffrets-${String(num).padStart(3, '0')}`;
  const sku = `NLG-GIFT-${String(num).padStart(4, '0')}`;
  const prefix12 = `3710234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = COFFRET_IMAGES[index % COFFRET_IMAGES.length];
  
  const priceVariation = (index % 4) * 6;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 4 === 0;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Épicerie & Merveilles de Noël',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Food, Beverages & Tobacco > Food Items',
    gender: 'unisex',
    ageGroup: 'adult',
    categorySlug: 'coffrets',
    recipient: tpl.recipient,
    budgetTier: finalEur < 45 ? 'budget' : finalEur < 80 ? 'low' : 'medium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 25 + (index % 40),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.8 + ((index % 3) * 0.06)).toFixed(1)),
    reviewsCount: 25 + ((index * 9) % 95),
    isBestseller: index % 5 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Coffret N°${num}`,
      en: `${tpl.titles.en} Hamper #${num}`,
      de: `${tpl.titles.de} Geschenkset Nr. ${num}`,
      es: `${tpl.titles.es} Cofre Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Produits du terroir artisanaux rigoureusement sélectionnés', 'Date limite de consommation longue garantie pour les fêtes', 'Prêt à être déposé directement au pied du sapin'],
      en: ['Rigorously selected artisan gourmet products', 'Guaranteed long shelf-life for the holidays', 'Ready to place directly under the Christmas tree'],
      de: ['Streng ausgewählte handwerkliche Delikatessen', 'Garantierte lange Haltbarkeit für die Festtage', 'Fertig zum Schenken unter den Weihnachtsbaum'],
      es: ['Productos gourmet artesanales rigurosamente seleccionados', 'Fecha de consumo preferente larga garantizada', 'Listo para colocar bajo el árbol de Navidad']
    },
    badge: {
      fr: isPromo ? 'Prêt à Offrir' : 'Gourmandise',
      en: isPromo ? 'Ready to Gift' : 'Gourmet',
      de: isPromo ? 'Geschenkfertig' : 'Gourmet',
      es: isPromo ? 'Listo para Regalar' : 'Gourmet'
    }
  };
});
