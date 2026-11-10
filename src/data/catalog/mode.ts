import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const FASHION_IMAGES = [
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80'
];

interface FashionItemTemplate {
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

const TEMPLATES: FashionItemTemplate[] = [
  {
    subcat: 'Pulls de Noël',
    titles: {
      fr: 'Pull de Noël Jacquard Laine Mérinos Traditionnel',
      en: 'Traditional Merino Wool Jacquard Christmas Sweater',
      de: 'Traditioneller Weihnachtsstrickpullover aus Merinowolle',
      es: 'Jersey Navideño Jacquard de Lana Merina Tradicional'
    },
    desc: {
      fr: 'Pull tricoté épais aux motifs scandinaves traditionnels, confectionné en laine mérinos douce et respirante. Ne gratte pas, coutures renforcées.',
      en: 'Thick knit sweater with traditional Scandinavian patterns, crafted from soft and breathable merino wool. Non-scratchy, reinforced seams.',
      de: 'Dicker Strickpullover mit traditionellen skandinavischen Mustern aus weicher und atmungsaktiver Merinowolle. Kratzfrei, verstärkte Nähte.',
      es: 'Jersey de punto grueso con motivos escandinavos tradicionales, confeccionado en lana merina suave y transpirable. No pica, costuras reforzadas.'
    },
    priceEur: 59.90,
    priceCad: 84.90,
    gender: 'unisex',
    recipient: 'couples',
    color: 'Rouge & Écru',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    subcat: 'Écharpes & Cachemire',
    titles: {
      fr: 'Écharpe Frangée 100% Cachemire Haut de Gamme',
      en: 'Premium 100% Cashmere Fringed Scarf',
      de: 'Hochwertiger Fransenschal aus 100% Kaschmir',
      es: 'Bufanda con Flecos 100% Cachemira de Alta Gama'
    },
    desc: {
      fr: 'Douceur incomparable et chaleur enveloppante pour affronter l\'hiver avec distinction. Tissée avec des fibres de cachemire sélectionnées à la main.',
      en: 'Incomparable softness and cozy warmth to face the winter with distinction. Hand-selected woven cashmere fibers.',
      de: 'Unvergleichliche Weichheit und wohlige Wärme für den Winter mit Eleganz. Gewebt aus handverlesenen Kaschmirfasern.',
      es: 'Suavidad incomparable y calidez envolvente para afrontar el invierno con distinción. Tejida con fibras de cachemira seleccionadas a mano.'
    },
    priceEur: 79.00,
    priceCad: 112.00,
    gender: 'unisex',
    recipient: 'women',
    color: 'Beige Avoine',
    sizes: ['Taille Unique (200x70cm)']
  },
  {
    subcat: 'Manteaux & Vestes',
    titles: {
      fr: 'Manteau Long Drap de Laine Ceinturé Hiver',
      en: 'Winter Belted Long Wool Blend Overcoat',
      de: 'Langer Wintermantel aus Wollmischung mit Gürtel',
      es: 'Abrigo Largo de Paño de Lana con Cinturón'
    },
    desc: {
      fr: 'Coupe épurée et élégante, col tailleur soigné et doublure thermique satinée. Idéal pour les réveillons et les journées fraîches.',
      en: 'Sleek and elegant fit, tailored notch lapel and satin thermal lining. Perfect for holiday dinners and crisp days.',
      de: 'Schlichter und eleganter Schnitt, sorgfältiger Reverskragen und satiniertes Thermofutter. Ideal für Festtage und kühle Tage.',
      es: 'Corte depurado y elegante, cuello sastre cuidado y forro térmico satinado. Ideal para las cenas de fiesta y los días fríos.'
    },
    priceEur: 189.00,
    priceCad: 269.00,
    gender: 'female',
    recipient: 'women',
    color: 'Vert Forêt Profond',
    sizes: ['36', '38', '40', '42', '44']
  },
  {
    subcat: 'Pyjamas de Fête',
    titles: {
      fr: 'Ensemble Pyjama Velours Coton Bio Nuit de Noël',
      en: 'Organic Cotton Velvet Christmas Night Pajama Set',
      de: 'Schlafanzug-Set aus Bio-Baumwollsamt Weihnachtsnacht',
      es: 'Conjunto de Pijama de Terciopelo Algodón Orgánico Nochebuena'
    },
    desc: {
      fr: 'Toucher velours ultra doux, certifié Oeko-Tex Standard 100. Boutons en nacre et passepoil doré contrastant.',
      en: 'Ultra-soft velvet touch, Oeko-Tex Standard 100 certified. Mother-of-pearl buttons and contrasting gold piping.',
      de: 'Ultraweicher Samtgriff, Oeko-Tex Standard 100 zertifiziert. Perlmuttknöpfe und kontrastierende Goldbiese.',
      es: 'Tacto de terciopelo ultrasuave, certificado Oeko-Tex Standard 100. Botones de nácar y vivo dorado a contraste.'
    },
    priceEur: 49.90,
    priceCad: 69.90,
    gender: 'unisex',
    recipient: 'couples',
    color: 'Bordeaux Velours',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    subcat: 'Gants & Bonnets',
    titles: {
      fr: 'Gants en Cuir d\'Agneau Doublés Cachemire Tactiles',
      en: 'Touchscreen Cashmere-Lined Lambskin Leather Gloves',
      de: 'Touchscreen-fähige Lammlederhandschuhe mit Kaschmirfutter',
      es: 'Guantes de Piel de Cordero con Forro de Cachemira Táctiles'
    },
    desc: {
      fr: 'Piel souple sélectionnée, bouts des doigts compatibles avec tous les écrans de smartphone. Doublure 100% cachemire chaud.',
      en: 'Supple selected leather, touchscreen-compatible fingertips. 100% warm cashmere lining.',
      de: 'Geschmeidiges ausgewähltes Leder, Touchscreen-kompatible Fingerspitzen. Futter aus 100% warmem Kaschmir.',
      es: 'Piel flexible seleccionada, yemas de dedos compatibles con pantallas táctiles. Forro de 100% cachemira cálida.'
    },
    priceEur: 65.00,
    priceCad: 92.00,
    gender: 'male',
    recipient: 'men',
    color: 'Noir Carbone',
    sizes: ['8', '8.5', '9', '9.5']
  }
];

export const FASHION_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `mode-${String(num).padStart(3, '0')}`;
  const sku = `NLG-MODE-${String(num).padStart(4, '0')}`;
  const prefix12 = `3701234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = FASHION_IMAGES[index % FASHION_IMAGES.length];
  
  const priceVariation = (index % 5) * 4;
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
    brand: 'Atelier Noël & Co',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Apparel & Accessories > Clothing',
    gender: tpl.gender,
    ageGroup: 'adult',
    color: tpl.color,
    size: tpl.sizes[0],
    categorySlug: 'mode',
    recipient: tpl.recipient,
    budgetTier: finalEur < 50 ? 'budget' : finalEur < 100 ? 'medium' : 'premium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 15 + (index % 35),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.6 + ((index % 5) * 0.08)).toFixed(1)),
    reviewsCount: 14 + ((index * 7) % 80),
    isBestseller: index % 7 === 0,
    isPromo,
    options: {
      sizes: tpl.sizes,
      colors: [tpl.color, 'Bleu Nuit', 'Gris Perle']
    },
    title: {
      fr: `${tpl.titles.fr} Édition N°${num}`,
      en: `${tpl.titles.en} Edition #${num}`,
      de: `${tpl.titles.de} Edition Nr. ${num}`,
      es: `${tpl.titles.es} Edición Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Matière certifiée éco-responsable', 'Finitions atelier cousues main', 'Livré sous coffret cadeau offert'],
      en: ['Eco-certified premium fabric', 'Hand-stitched workshop finishing', 'Delivered in a complimentary gift box'],
      de: ['Öko-zertifizierter Premium-Stoff', 'Handgenähte Werkstatt-Verarbeitung', 'Geliefert in einer kostenlosen Geschenkbox'],
      es: ['Tejido premium certificado ecológico', 'Acabados artesanales cosidos a mano', 'Entregado en caja de regalo de cortesía']
    },
    badge: {
      fr: isPromo ? 'Offre de Noël' : 'Coup de Cœur',
      en: isPromo ? 'Holiday Deal' : 'Staff Pick',
      de: isPromo ? 'Weihnachtsangebot' : 'Empfehlung',
      es: isPromo ? 'Oferta Navideña' : 'Favorito'
    }
  };
});
