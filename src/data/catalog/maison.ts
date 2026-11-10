import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const MAISON_IMAGES = [
  'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80'
];

interface MaisonTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  recipient: 'couples' | 'women' | 'men';
}

const TEMPLATES: MaisonTemplate[] = [
  {
    subcat: 'Couronnes & Décoration',
    titles: {
      fr: 'Couronne de Noël Murale Artisanale Sapin Naturel & Pommes de Pin Dorées',
      en: 'Handcrafted Holiday Wall Wreath Natural Pine & Golden Cones',
      de: 'Handgefertigter Weihnachtstürkranz aus Naturtannengrün & Goldzapfen',
      es: 'Corona Navideña de Pared Artesanal Pino Natural y Piñas Doradas'
    },
    desc: {
      fr: 'Composée de véritables branches de sapin Nordmann séchées, cannelle naturelle et nœud de velours rouge festif. Diamètre 45 cm.',
      en: 'Crafted with real preserved Nordmann fir branches, natural cinnamon sticks, and festive red velvet bow. 45 cm diameter.',
      de: 'Aus echten konservierten Nordmanntannen-Zweigen, Zimtstangen und festlicher roter Samtschleife. Durchmesser 45 cm.',
      es: 'Elaborada con ramas naturales de abeto preservadas, canela en rama y lazo de terciopelo rojo. Diámetro 45 cm.'
    },
    priceEur: 39.90,
    priceCad: 56.90,
    recipient: 'couples'
  },
  {
    subcat: 'Plaids & Linge de Maison',
    titles: {
      fr: 'Plaid Canapé Grosse Maille Moelleux Chenille Effet Fausse Fourrure',
      en: 'Cozy Chunky Knit Chenille Throw Blanket Faux Fur Softness',
      de: 'Kuschelige Grobstrick-Chenille-Wohndecke Faux-Fur-Weichheit',
      es: 'Manta para Sofá de Punto Grueso Chenilla Tacto Piel Extrasuave'
    },
    desc: {
      fr: 'Le compagnon des soirées au coin du feu. Tissage lourd ultra enveloppant et respirant, lavable en machine sans bouloche.',
      en: 'The ultimate fireside evening companion. Heavy, ultra-cozy and breathable knit, machine washable without shedding.',
      de: 'Der ideale Begleiter für gemütliche Abende am Kamin. Schweres, wohliges und atmungsaktives Gestrick, maschinenwaschbar.',
      es: 'El accesorio perfecto para tardes de invierno. Tejido pesado, cálido y transpirable, lavable a máquina sin pelusas.'
    },
    priceEur: 69.90,
    priceCad: 99.90,
    recipient: 'women'
  },
  {
    subcat: 'Arts de la Table & Réveillon',
    titles: {
      fr: 'Service de Table Festif 18 Pièces en Porcelaine Fine avec Liseré Or',
      en: '18-Piece Fine Porcelain Holiday Dinnerware Set with Gold Rim',
      de: '18-teiliges Festliches Tafelservice aus Feinem Porzellan mit Goldrand',
      es: 'Vajilla Festiva de 18 Piezas en Porcelana Fina con Borde Dorado'
    },
    desc: {
      fr: 'Sublimez vos tables de réveillon. Contient 6 assiettes plates, 6 assiettes creuses et 6 assiettes à dessert. Compatible lave-vaisselle délicat.',
      en: 'Elevate your festive table setting. Includes 6 dinner plates, 6 soup plates, and 6 dessert plates. Dishwasher safe gentle cycle.',
      de: 'Bringen Sie Ihre Festtafel zum Strahlen. Enthält 6 Speiseteller, 6 Suppenteller und 6 Dessertteller.',
      es: 'Haga brillar su mesa navideña. Incluye 6 platos llanos, 6 hondos y 6 de postre. Apta para lavavajillas ciclo suave.'
    },
    priceEur: 149.00,
    priceCad: 212.00,
    recipient: 'couples'
  },
  {
    subcat: 'Guirlandes & Éclairage Féerique',
    titles: {
      fr: 'Guirlande Lumineuse Rideau Micro-LED Blanc Chaud Étanche 300 Lampes',
      en: 'Warm White Micro-LED Waterproof Curtain Fairy Lights 300 Bulbs',
      de: 'Warmweißer wasserdichter Micro-LED Lichtervorhang 300 Lämpchen',
      es: 'Cortina de Luces Navideñas Micro-LED Blanco Cálido Impermeable 300 Luces'
    },
    desc: {
      fr: 'Créez une atmosphère magique en intérieur comme en extérieur. 8 modes d\'animation féeriques avec minuterie intelligente intégrée.',
      en: 'Create a magical atmosphere indoors or outdoors. 8 fairy lighting modes with built-in smart auto-timer.',
      de: 'Zaubern Sie eine magische Atmosphäre drinnen wie draußen. 8 Leuchtmodi mit integrierter intelligenter Zeitschaltuhr.',
      es: 'Cree una atmósfera mágica en interior o exterior. 8 modos de iluminación con temporizador automático inteligente.'
    },
    priceEur: 29.90,
    priceCad: 42.90,
    recipient: 'couples'
  }
];

export const MAISON_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `maison-${String(num).padStart(3, '0')}`;
  const sku = `NLG-HOME-${String(num).padStart(4, '0')}`;
  const prefix12 = `3708234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = MAISON_IMAGES[index % MAISON_IMAGES.length];
  
  const priceVariation = (index % 4) * 5;
  const finalEur = Math.round((tpl.priceEur + priceVariation) * 100) / 100;
  const finalCad = Math.round((tpl.priceCad + priceVariation * 1.4) * 100) / 100;
  const isPromo = index % 5 === 0;
  const oldPriceEur = isPromo ? Math.round((finalEur * 1.25) * 100) / 100 : undefined;
  const oldPriceCad = isPromo ? Math.round((finalCad * 1.25) * 100) / 100 : undefined;

  return {
    id,
    sku,
    gtin,
    mpn: `MPN-${sku}`,
    brand: 'Maison & Féerie d\'Hiver',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Home & Garden > Decor',
    gender: 'unisex',
    ageGroup: 'adult',
    categorySlug: 'maison',
    recipient: tpl.recipient,
    budgetTier: finalEur < 45 ? 'budget' : finalEur < 90 ? 'low' : 'medium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 22 + (index % 35),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.6 + ((index % 4) * 0.08)).toFixed(1)),
    reviewsCount: 17 + ((index * 7) % 80),
    isBestseller: index % 6 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Modèle N°${num}`,
      en: `${tpl.titles.en} Model #${num}`,
      de: `${tpl.titles.de} Modell Nr. ${num}`,
      es: `${tpl.titles.es} Modelo Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Conçu pour durer de nombreux hivers', 'Emballage renforcé anti-casse pour expédition sécurisée', 'Design chaleureux et intemporel'],
      en: ['Designed to last for many holiday seasons', 'Drop-tested reinforced protective packaging', 'Warm and timeless holiday design'],
      de: ['Für viele Festtage in Langlebigkeit gefertigt', 'Verstärkte bruchsichere Versandverpackung', 'Warmes und zeitloses Weihnachtsdesign'],
      es: ['Diseñado para perdurar muchas navidades', 'Embalaje reforzado antichoque para envío seguro', 'Diseño cálido y atemporal']
    },
    badge: {
      fr: isPromo ? 'Esprit de Noël' : 'Ambiance',
      en: isPromo ? 'Holiday Spirit' : 'Cozy Vibe',
      de: isPromo ? 'Weihnachtsgeist' : 'Gemütlich',
      es: isPromo ? 'Espíritu Navideño' : 'Ambiente'
    }
  };
});
