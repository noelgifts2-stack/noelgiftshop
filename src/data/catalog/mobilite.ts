import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const MOBILITE_IMAGES = [
  'https://images.unsplash.com/photo-1597404293702-d021c170a48b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=800&q=80'
];

interface MobiliteTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  recipient: 'kids' | 'teens' | 'men' | 'women';
}

const TEMPLATES: MobiliteTemplate[] = [
  {
    subcat: 'Trottinettes Électriques',
    titles: {
      fr: 'Trottinette Électrique Urbaine Pliable 350W Autonomie 30km',
      en: 'Foldable Urban Electric Scooter 350W 30km Range',
      de: 'Faltbarer E-Scooter 350W 30km Reichweite',
      es: 'Patinete Eléctrico Urbano Plegable 350W Autonomía 30km'
    },
    desc: {
      fr: 'Moteur brushless puissant, freins à disque double sécurité, éclairage LED avant/arrière et pneus increvables alvéolés 8.5 pouces.',
      en: 'Powerful brushless motor, dual safety disc brakes, front/rear LED lights, and 8.5-inch puncture-proof honeycomb tires.',
      de: 'Leistungsstarker bürstenloser Motor, doppelte Scheibenbremsen, LED-Beleuchtung und 8,5-Zoll pannensichere Wabenreifen.',
      es: 'Potente motor sin escobillas, frenos de disco de doble seguridad, luces LED del/tras y neumáticos antipinchazos de 8,5 pulgadas.'
    },
    priceEur: 299.00,
    priceCad: 429.00,
    recipient: 'teens'
  },
  {
    subcat: 'Skateboards & Cruisers',
    titles: {
      fr: 'Skateboard Cruiser Érable Canadien 7 Plis Roulements ABEC-9',
      en: 'Canadian Maple 7-Ply Cruiser Skateboard ABEC-9 Bearings',
      de: 'Cruiser Skateboard aus 7-lagigem kanadischem Ahorn ABEC-9',
      es: 'Skateboard Cruiser Madera de Arce Canadiense 7 Capas ABEC-9'
    },
    desc: {
      fr: 'Planche robuste en érable canadien sélectionné, roues polyuréthane 60mm super silencieuses pour une glisse fluide et réactive.',
      en: 'Sturdy selected Canadian maple deck, super-quiet 60mm polyurethane wheels for smooth and responsive cruising.',
      de: 'Robustes Deck aus ausgewähltem kanadischem Ahornholz, leise 60mm PU-Rollen für sanftes und reaktives Cruisen.',
      es: 'Tabla robusta de arce canadiense seleccionado, ruedas de poliuretano de 60mm supersilenciosas para un deslizamiento suave.'
    },
    priceEur: 79.90,
    priceCad: 114.90,
    recipient: 'teens'
  },
  {
    subcat: 'Trottinettes Enfants',
    titles: {
      fr: 'Trottinette 3 Roues Évolutive Enfant avec Roues LED Lumineuses',
      en: 'Adjustable 3-Wheel Kids Scooter with Light-Up LED Wheels',
      de: 'Verstellbarer 3-Rad Kinderroller mit leuchtenden LED-Rädern',
      es: 'Patinete Infantil Evolutivo de 3 Ruedas con Ruedas LED Luminosas'
    },
    desc: {
      fr: 'Système de direction par inclinaison intuitif breveté, guidon réglable sur 4 hauteurs et roues sans pile qui s\'illuminent en roulant.',
      en: 'Patented intuitive lean-to-steer system, 4-height adjustable handlebar, and battery-free motion-powered light-up wheels.',
      de: 'Patentiertes intuitives Lenksystem durch Gewichtsverlagerung, 4-fach höhenverstellbarer Lenker und batterielose LED-Räder.',
      es: 'Sistema patentado de dirección intuitiva por inclinación, manillar ajustable en 4 alturas y ruedas LED que se iluminan al rodar.'
    },
    priceEur: 49.90,
    priceCad: 69.90,
    recipient: 'kids'
  },
  {
    subcat: 'Équipements & Sécurité',
    titles: {
      fr: 'Casque Urbain Connecté avec Feux de Signalisation LED Clignotants',
      en: 'Smart Urban Helmet with Integrated LED Turn Signal Lights',
      de: 'Smarter Urban-Helm mit integrierten LED-Blinklichtern',
      es: 'Casco Urbano Inteligente con Luces LED e Intermitentes'
    },
    desc: {
      fr: 'Protection maximale certifiée CE EN1078. Télécommande sans fil au guidon pour activer les clignotants et batterie rechargeable USB-C longue durée.',
      en: 'Maximum CE EN1078 certified protection. Wireless handlebar remote to activate turn signals, long-life USB-C rechargeable battery.',
      de: 'Maximaler CE EN1078 zertifizierter Schutz. Drahtlose Lenker-Fernbedienung für Blinker, langlebiger USB-C-Akku.',
      es: 'Máxima protección certificada CE EN1078. Control remoto inalámbrico en el manillar para intermitentes, batería recargable USB-C.'
    },
    priceEur: 69.90,
    priceCad: 99.90,
    recipient: 'men'
  }
];

export const MOBILITE_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `mobilite-${String(num).padStart(3, '0')}`;
  const sku = `NLG-MOBL-${String(num).padStart(4, '0')}`;
  const prefix12 = `3704234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = MOBILITE_IMAGES[index % MOBILITE_IMAGES.length];
  
  const priceVariation = (index % 4) * 8;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 4 === 2;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Mobilité Glisse & Co',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Sporting Goods > Outdoor Recreation > Riding Scooters',
    gender: 'unisex',
    ageGroup: tpl.recipient === 'kids' ? 'kids' : 'adult',
    categorySlug: 'mobilite',
    recipient: tpl.recipient,
    budgetTier: finalEur < 80 ? 'low' : finalEur < 200 ? 'medium' : 'premium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 10 + (index % 25),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.7 + ((index % 4) * 0.07)).toFixed(1)),
    reviewsCount: 16 + ((index * 6) % 65),
    isBestseller: index % 6 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Édition N°${num}`,
      en: `${tpl.titles.en} Edition #${num}`,
      de: `${tpl.titles.de} Edition Nr. ${num}`,
      es: `${tpl.titles.es} Edición Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Homologué selon les normes européennes strictes', 'Garantie constructeur 2 ans incluse', 'Notice complète en français et livraison rapide'],
      en: ['Approved to strict European safety standards', '2-year manufacturer warranty included', 'Complete manual and fast secure shipping'],
      de: ['Zugelassen nach strengen europäischen Sicherheitsnormen', '2 Jahre Herstellergarantie inklusive', 'Vollständige Anleitung und schneller Versand'],
      es: ['Homologado según estrictas normas europeas', 'Garantía del fabricante de 2 años incluida', 'Manual completo y envío rápido asegurado']
    },
    badge: {
      fr: isPromo ? 'Promo Spéciale' : 'Recommandé',
      en: isPromo ? 'Special Deal' : 'Top Choice',
      de: isPromo ? 'Sonderangebot' : 'Top-Wahl',
      es: isPromo ? 'Oferta Especial' : 'Recomendado'
    }
  };
});
