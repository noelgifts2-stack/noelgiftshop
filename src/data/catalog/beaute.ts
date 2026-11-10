import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const BEAUTE_IMAGES = [
  'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1608248597359-57e335559388?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
];

interface BeauteTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  recipient: 'women' | 'men' | 'couples';
}

const TEMPLATES: BeauteTemplate[] = [
  {
    subcat: 'Parfums d\'Exception',
    titles: {
      fr: 'Eau de Parfum Intense Ambre Précieux & Vanille Étoilée 100ml',
      en: 'Precious Amber & Starry Vanilla Intense Eau de Parfum 100ml',
      de: 'Edles Bernstein & Stern-Vanille Intensives Eau de Parfum 100ml',
      es: 'Agua de Perfume Intensa Ámbar Precioso y Vainilla Estrellada 100ml'
    },
    desc: {
      fr: 'Une fragrance envoûtante de haute parfumerie aux notes chaudes d\'ambre, d\'épices d\'hiver et de vanille bourbon. Sillage longue tenue.',
      en: 'A mesmerizing high-perfumery fragrance with warm amber, winter spice, and Bourbon vanilla notes. Exceptional long-lasting sillage.',
      de: 'Ein betörender Haute-Parfumerie-Duft mit warmen Bernstein-, Gewürz- und Bourbon-Vanillenoten. Außergewöhnliche Haltbarkeit.',
      es: 'Una fragancia cautivadora de alta perfumería con notas cálidas de ámbar, especias y vainilla bourbon. Larga fijación.'
    },
    priceEur: 89.00,
    priceCad: 126.00,
    recipient: 'women'
  },
  {
    subcat: 'Soins & Spa',
    titles: {
      fr: 'Coffret Rituel Spa à Domicile aux Huiles Essentielles Bio & Bougie Cire Végétale',
      en: 'Home Spa Ritual Gift Set Organic Essential Oils & Soy Candle',
      de: 'Home-Spa-Ritual Geschenkset mit Bio-Ölen & Pflanzlicher Duftkerze',
      es: 'Cofre Ritual Spa en Casa con Aceites Orgánicos y Vela de Cera Vegetal'
    },
    desc: {
      fr: 'Contient une huile de massage relaxante, un gommage au sucre de canne et une bougie d\'ambiance aux senteurs festives de cannelle et d\'orange douce.',
      en: 'Includes relaxing massage oil, raw cane sugar scrub, and a holiday scented soy candle with sweet orange and cinnamon.',
      de: 'Enthält entspannendes Massageöl, Rohrzucker-Körperpeeling und festliche Duftkerze mit Zimt- und Orangennoten.',
      es: 'Incluye aceite de masaje relajante, exfoliante de azúcar de caña y vela aromática con notas de canela y naranja dulce.'
    },
    priceEur: 54.90,
    priceCad: 78.90,
    recipient: 'couples'
  },
  {
    subcat: 'Soins Barbe & Homme',
    titles: {
      fr: 'Coffret Soin Barbe & Rasage Traditionnel Blaireau Soie & Huile Cèdre',
      en: 'Traditional Men\'s Shaving & Beard Care Set Cedarwood Oil & Brush',
      de: 'Traditionelles Herren-Bartpflege- & Rasur-Set Zedernöl & Pinsel',
      es: 'Set de Cuidado de Barba y Afeitado Tradicional Aceite de Cedro y Brocha'
    },
    desc: {
      fr: 'Tout le nécessaire pour un rituel de rasage à l\'ancienne. Huile adoucissante parfum cèdre, savon de rasage au beurre de karité et blaireau naturel.',
      en: 'Everything needed for classic grooming. Cedarwood beard softening oil, shea butter shaving soap, and natural bristle brush.',
      de: 'Alles für die traditionelle Herrenrasur. Zedern-Bartöl, Rasierseife mit Sheabutter und natürlicher Rasierpinsel.',
      es: 'Todo lo necesario para el afeitado clásico. Aceite para barba de cedro, jabón con manteca de karité y brocha natural.'
    },
    priceEur: 44.90,
    priceCad: 64.90,
    recipient: 'men'
  },
  {
    subcat: 'Diffuseurs & Bien-être',
    titles: {
      fr: 'Diffuseur d\'Arômes Céramique Sculptée par Nébulisation Ultrasonique Silencieuse',
      en: 'Sculpted Ceramic Ultrasonic Silent Aromatherapy Essential Oil Diffuser',
      de: 'Ultraschall-Aromadiffusor aus geformter Keramik Flüsterleise',
      es: 'Difusor de Aromas Ultrasónico Silencioso de Cerámica Esculpida'
    },
    desc: {
      fr: 'Purifie l\'air et diffuse une brume bienfaisante. Éclairage LED apaisant réglable avec fonction arrêt automatique de sécurité.',
      en: 'Purifies air and releases a soothing mist. Ambient LED gentle light with automatic safety shut-off.',
      de: 'Reinigt die Raumluft und verströmt sanften Nebel. Sanftes Stimmungslicht mit automatischer Sicherheitsabschaltung.',
      es: 'Purifica el aire y difunde una bruma relajante. Luz ambiental LED tenue con apagado automático de seguridad.'
    },
    priceEur: 69.00,
    priceCad: 98.00,
    recipient: 'couples'
  }
];

export const BEAUTE_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `beaute-${String(num).padStart(3, '0')}`;
  const sku = `NLG-BEAU-${String(num).padStart(4, '0')}`;
  const prefix12 = `3707234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = BEAUTE_IMAGES[index % BEAUTE_IMAGES.length];
  
  const priceVariation = (index % 4) * 5;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 4 === 3;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Botanique & Parfums de Fêtes',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Health & Beauty > Personal Care > Cosmetics',
    gender: 'unisex',
    ageGroup: 'adult',
    categorySlug: 'beaute',
    recipient: tpl.recipient,
    budgetTier: finalEur < 50 ? 'budget' : finalEur < 100 ? 'medium' : 'premium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 18 + (index % 30),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.7 + ((index % 4) * 0.07)).toFixed(1)),
    reviewsCount: 15 + ((index * 7) % 75),
    isBestseller: index % 6 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Flacon N°${num}`,
      en: `${tpl.titles.en} Bottle #${num}`,
      de: `${tpl.titles.de} Flakon Nr. ${num}`,
      es: `${tpl.titles.es} Frasco Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Ingrédients naturels d\'origine biologique certifiée', 'Formulé sans parabènes, sulfates ni silicones', 'Présenté dans un coffret cadeau festif soigné'],
      en: ['Certified organic natural ingredients', 'Formulated without parabens, sulfates, or silicones', 'Packaged in an elegant holiday gift box'],
      de: ['Zertifizierte biologische Inhaltsstoffe', 'Frei von Parabenen, Sulfaten und Silikonen', 'In festlicher Geschenkverpackung geliefert'],
      es: ['Ingredientes naturales de origen biológico certificado', 'Sin parabenos, sulfatos ni siliconas', 'Presentado en elegante caja de regalo festiva']
    },
    badge: {
      fr: isPromo ? 'Soin Cadeau' : 'Sensations',
      en: isPromo ? 'Beauty Deal' : 'Sensations',
      de: isPromo ? 'Beauty-Angebot' : 'Verwöhn-Tipp',
      es: isPromo ? 'Oferta Belleza' : 'Sensaciones'
    }
  };
});
