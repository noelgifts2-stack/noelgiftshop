import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const HIGHTECH_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80'
];

interface HightechTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  recipient: 'men' | 'women' | 'teens' | 'couples';
}

const TEMPLATES: HightechTemplate[] = [
  {
    subcat: 'Audio & Casques',
    titles: {
      fr: 'Casque Audio Sans Fil Réduction Active de Bruit Hi-Res Audio',
      en: 'Wireless Active Noise Cancelling Headphones Hi-Res Audio',
      de: 'Kabelloser Over-Ear-Kopfhörer mit Active Noise Cancelling Hi-Res',
      es: 'Auriculares Inalámbricos con Cancelación Activa de Ruido Hi-Res'
    },
    desc: {
      fr: 'Transducteurs 40mm au béryllium pour une fidélité acoustique exceptionnelle. Autonomie 45h, charge rapide USB-C et coussinets à mémoire de forme.',
      en: '40mm beryllium drivers for exceptional acoustic fidelity. 45-hour battery life, USB-C quick charge, memory foam earcups.',
      de: '40mm Beryllium-Treiber für erstklassige Klangtreue. 45 Stunden Akkulaufzeit, USB-C Schnellladung, Memory-Schaum-Ohrpolster.',
      es: 'Transductores de 40mm de berilio para una fidelidad acústica excepcional. 45h de autonomía, carga rápida USB-C y almohadillas acolchadas.'
    },
    priceEur: 149.00,
    priceCad: 212.00,
    recipient: 'men'
  },
  {
    subcat: 'Enceintes Nomades',
    titles: {
      fr: 'Enceinte Bluetooth Étanche IPX7 Son 360° Autonomie 24h',
      en: 'Waterproof IPX7 Portable Bluetooth Speaker 360° Sound 24h Battery',
      de: 'Wasserdichter IPX7 Bluetooth-Lautsprecher 360° Sound 24h Akku',
      es: 'Altavoz Bluetooth Portátil Impermeable IPX7 Sonido 360° 24h Batería'
    },
    desc: {
      fr: 'Basses profondes et clarté vocale cristalline. Conception tout-terrain résistante aux chutes et à l\'eau, connectable en stéréo.',
      en: 'Deep bass and crystal-clear vocal clarity. Rugged drop-proof and waterproof build, stereo-pairing capable.',
      de: 'Tiefe Bässe und kristallklare Stimmwiedergabe. Robustes sturz- und wasserdichtes Design, kabellos koppelbar.',
      es: 'Graves profundos y claridad vocal cristalina. Diseño todoterreno resistente a caídas y agua, emparejable en estéreo.'
    },
    priceEur: 89.90,
    priceCad: 128.90,
    recipient: 'teens'
  },
  {
    subcat: 'Maison Connectée',
    titles: {
      fr: 'Lampe d\'Ambiance Connectée Coucher de Soleil & Lever Réveil Doux',
      en: 'Smart Sunset & Sunrise Ambient Wake-Up Light Lamp',
      de: 'Smarte Sonnenuntergangs- & Sonnenaufgangs-Lichtwecker Lampe',
      es: 'Lámpara Inteligente Despertador Simulación de Amanecer y Atardecer'
    },
    desc: {
      fr: '16 millions de couleurs et bruits blancs apaisants pour améliorer le sommeil et l\'endormissement. Contrôle par application et commandes tactiles.',
      en: '16 million colors and soothing white noise sounds to enhance sleep. Controlled via mobile app and intuitive touch buttons.',
      de: '16 Millionen Farben und beruhigendes weißes Rauschen zur Schlafförderung. Steuerbar per Smartphone-App und Touch-Tasten.',
      es: '16 millones de colores y sonidos relajantes para mejorar el descanso. Control desde app móvil y mandos táctiles intuitivos.'
    },
    priceEur: 59.90,
    priceCad: 84.90,
    recipient: 'couples'
  },
  {
    subcat: 'Accessoires Mobiles',
    titles: {
      fr: 'Station de Recharge Sans Fil 3-en-1 Bois Noble & Cuir Véritable',
      en: '3-in-1 Fast Wireless Charging Station Fine Wood & Genuine Leather',
      de: '3-in-1 Schnelle Kabellose Ladestation Edles Holz & Echtes Leder',
      es: 'Estación de Carga Inalámbrica Rápida 3 en 1 Madera Noble y Cuero'
    },
    desc: {
      fr: 'Recharge simultanément votre smartphone, montre connectée et écouteurs sans fil. Finition artisanale élégante pour table de nuit ou bureau.',
      en: 'Simultaneously charges your smartphone, smartwatch, and wireless earbuds. Handcrafted luxury finish for nightstand or desk.',
      de: 'Lädt gleichzeitig Smartphone, Smartwatch und kabellose Kopfhörer. Handgefertigtes elegantes Design für Nachttisch oder Schreibtisch.',
      es: 'Carga simultáneamente smartphone, reloj inteligente y auriculares. Acabado artesanal elegante para mesilla o escritorio.'
    },
    priceEur: 69.90,
    priceCad: 99.90,
    recipient: 'men'
  }
];

export const HIGHTECH_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `hightech-${String(num).padStart(3, '0')}`;
  const sku = `NLG-TECH-${String(num).padStart(4, '0')}`;
  const prefix12 = `3705234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = HIGHTECH_IMAGES[index % HIGHTECH_IMAGES.length];
  
  const priceVariation = (index % 4) * 6;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 5 === 1;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'NovaTech Audio & Home',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Electronics > Audio',
    gender: 'unisex',
    ageGroup: 'adult',
    categorySlug: 'hightech',
    recipient: tpl.recipient,
    budgetTier: finalEur < 70 ? 'low' : finalEur < 130 ? 'medium' : 'premium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 14 + (index % 30),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.7 + ((index % 4) * 0.07)).toFixed(1)),
    reviewsCount: 19 + ((index * 8) % 85),
    isBestseller: index % 6 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Référence N°${num}`,
      en: `${tpl.titles.en} Reference #${num}`,
      de: `${tpl.titles.de} Referenz Nr. ${num}`,
      es: `${tpl.titles.es} Referencia Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Certifié conforme aux normes CE, RoHS & FCC', 'Garantie intégrale 2 ans avec échange à neuf', 'Câbles de charge tressés premium inclus'],
      en: ['Certified CE, RoHS & FCC compliant', '2-year full warranty with express replacement', 'Braided premium charging cables included'],
      de: ['Zertifiziert nach CE, RoHS & FCC Standards', '2 Jahre Vollgarantie mit Austauschservice', 'Inklusive geflochtener Premium-Ladekabel'],
      es: ['Certificado conforme a normas CE, RoHS y FCC', 'Garantía integral de 2 años con reemplazo', 'Cables de carga trenzados premium incluidos']
    },
    badge: {
      fr: isPromo ? 'Super Promo' : 'High-Tech Star',
      en: isPromo ? 'Mega Deal' : 'Tech Star',
      de: isPromo ? 'Super-Deal' : 'Tech-Highlight',
      es: isPromo ? 'Súper Oferta' : 'Estrella Tech'
    }
  };
});
