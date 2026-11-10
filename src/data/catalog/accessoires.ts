import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const ACCESSOIRES_IMAGES = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1535683577427-740aaac4ecfa?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1611591475836-8a3d6cb46f7c?auto=format&fit=crop&w=800&q=80'
];

interface AccessoireTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  gender: 'unisex' | 'male' | 'female';
  recipient: 'men' | 'women' | 'couples';
}

const TEMPLATES: AccessoireTemplate[] = [
  {
    subcat: 'Montres Automatiques',
    titles: {
      fr: 'Montre Homme Chronographe Automatique Boîtier Acier & Cuir Véritable',
      en: 'Men\'s Automatic Chronograph Watch Steel Case & Genuine Leather Strap',
      de: 'Herren-Automatikuhr Chronograph Edelstahlgehäuse & Echtes Lederarmband',
      es: 'Reloj de Hombre Cronógrafo Automático Caja de Acero y Correa de Cuero'
    },
    desc: {
      fr: 'Mouvement mécanique à remontage automatique japonais haute précision. Verre saphir inrayable, étanche 5 ATM et cadran guilloché.',
      en: 'High-precision Japanese automatic mechanical movement. Scratch-resistant sapphire crystal, 5 ATM waterproof, guilloche dial.',
      de: 'Hochpräzises japanisches mechanisches Automatikuhrwerk. Kratzfestes Saphirglas, 5 ATM wasserdicht, guillochiertes Zifferblatt.',
      es: 'Movimiento mecánico automático japonés de alta precisión. Cristal de zafiro irrayable, sumergible 5 ATM y esfera guilloché.'
    },
    priceEur: 249.00,
    priceCad: 355.00,
    gender: 'male',
    recipient: 'men'
  },
  {
    subcat: 'Bijoux & Colliers',
    titles: {
      fr: 'Collier Pendentif Étoile Polaire en Argent 925 et Zirconium Étincelant',
      en: 'North Star Pendant Necklace 925 Sterling Silver & Sparkling Zirconia',
      de: 'Nordstern-Anhänger Halskette aus 925er Sterlingsilber & Glitzerndem Zirkonia',
      es: 'Collar con Colgante Estrella Polar en Plata de Ley 925 y Circonitas'
    },
    desc: {
      fr: 'Inspiré de la voûte céleste hivernale. Chaîne réglable diamantée et finition rhodiée anti-ternissement.',
      en: 'Inspired by the winter starry sky. Diamond-cut adjustable chain and anti-tarnish rhodium finish.',
      de: 'Inspiriert vom winterlichen Sternenhimmel. Diamantierte verstellbare Kette und anlaufgeschützte Rhodinierung.',
      es: 'Inspirado en el cielo estrellado invernal. Cadena ajustable diamantada y acabado rodiado antidesgaste.'
    },
    priceEur: 89.00,
    priceCad: 126.00,
    gender: 'female',
    recipient: 'women'
  },
  {
    subcat: 'Maroquinerie & Portefeuilles',
    titles: {
      fr: 'Portefeuille Portecartes Cuir Pleine Fleur avec Protection RFID',
      en: 'Full-Grain Leather Cardholder Wallet with RFID Protection',
      de: 'Vollnarbenleder-Geldbörse mit RFID-Schutz und Kartenfächern',
      es: 'Cartera Billetera de Cuero Plena Flor con Protección Antirrobo RFID'
    },
    desc: {
      fr: 'Cuir tannage végétal patiné avec le temps. Bloque les ondes RFID pour protéger vos cartes bancaires, ultra-fin pour la poche de costume.',
      en: 'Vegetable-tanned leather that develops a rich patina over time. Blocks RFID signals to protect your cards, slim pocket fit.',
      de: 'Pflanzlich gegerbtes Leder, das mit der Zeit eine edle Patina entwickelt. RFID-Blockierung zum Schutz Ihrer Karten.',
      es: 'Cuero de curtido vegetal que gana pátina con el tiempo. Bloquea señales RFID para proteger tarjetas bancarias, perfil ultrafino.'
    },
    priceEur: 49.90,
    priceCad: 69.90,
    gender: 'unisex',
    recipient: 'men'
  },
  {
    subcat: 'Boutons de Manchette',
    titles: {
      fr: 'Boutons de Manchette Nacre Véritable et Finition Or 18 Carats',
      en: 'Genuine Mother-of-Pearl Cufflinks with 18k Gold Finish',
      de: 'Manschettenknöpfe aus echtem Perlmutt mit 18 Karat Gold-Finish',
      es: 'Gemelos de Nácar Auténtico y Acabado en Oro de 18 Quilates'
    },
    desc: {
      fr: 'La touche ultime de distinction pour les réveillons et cérémonies. Livrés dans un écrin en bois laqué avec ruban festif.',
      en: 'The ultimate touch of refinement for festive galas. Delivered in a lacquered wooden jewelry box with holiday ribbon.',
      de: 'Der vollendete Hauch von Vornehmheit für festliche Abende. Geliefert in einer lackierten Holzschatulle mit Festschleife.',
      es: 'El toque supremo de elegancia para fiestas y ceremonias. Entregados en estuche de madera lacada con lazo festivo.'
    },
    priceEur: 59.00,
    priceCad: 84.00,
    gender: 'male',
    recipient: 'men'
  }
];

export const ACCESSOIRES_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `accessoires-${String(num).padStart(3, '0')}`;
  const sku = `NLG-ACCS-${String(num).padStart(4, '0')}`;
  const prefix12 = `3706234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = ACCESSOIRES_IMAGES[index % ACCESSOIRES_IMAGES.length];
  
  const priceVariation = (index % 4) * 7;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 5 === 2;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Maison Horlogère & Joaillerie',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Apparel & Accessories > Jewelry > Watches',
    gender: tpl.gender,
    ageGroup: 'adult',
    categorySlug: 'accessoires',
    recipient: tpl.recipient,
    budgetTier: finalEur < 70 ? 'low' : finalEur < 160 ? 'medium' : 'premium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 11 + (index % 25),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.8 + ((index % 3) * 0.06)).toFixed(1)),
    reviewsCount: 20 + ((index * 9) % 70),
    isBestseller: index % 7 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Prestige N°${num}`,
      en: `${tpl.titles.en} Prestige #${num}`,
      de: `${tpl.titles.de} Prestige Nr. ${num}`,
      es: `${tpl.titles.es} Prestige Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Certificat d\'authenticité et garantie 2 ans', 'Métaux et pierres rigoureusement contrôlés', 'Écrin de présentation de luxe inclus'],
      en: ['Certificate of authenticity and 2-year warranty', 'Rigorously tested precious metals and stones', 'Luxury presentation jewelry box included'],
      de: ['Echtheitszertifikat und 2 Jahre Garantie', 'Streng geprüfte Edelmetalle und Steine', 'Luxuriöse Geschenkverpackung inklusive'],
      es: ['Certificado de autenticidad y 2 años de garantía', 'Metales y piedras preciosas rigurosamente testados', 'Estuche de lujo para regalo incluido']
    },
    badge: {
      fr: isPromo ? 'Édition Fête' : 'Prestige',
      en: isPromo ? 'Holiday Edition' : 'Prestige',
      de: isPromo ? 'Festtags-Edition' : 'Prestige',
      es: isPromo ? 'Edición Fiesta' : 'Prestigio'
    }
  };
});
