import { Product } from '@/types';
import { generateValidEan13 } from './helpers';

const TOY_IMAGES = [
  'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
];

interface ToyTemplate {
  subcat: string;
  titles: { fr: string; en: string; de: string; es: string };
  desc: { fr: string; en: string; de: string; es: string };
  priceEur: number;
  priceCad: number;
  ageGroup: 'kids' | 'toddler' | 'infant';
  recipient: 'kids' | 'teens';
}

const TEMPLATES: ToyTemplate[] = [
  {
    subcat: 'Jouets en Bois',
    titles: {
      fr: 'Train Express de Noël en Bois Massif avec Circuit 80 Pièces',
      en: 'Solid Wood Christmas Express Train Set with 80-Piece Track',
      de: 'Massivholz-Weihnachtszug mit 80-teiligem Schienenset',
      es: 'Tren Exprés Navideño de Madera Maciza con Circuito de 80 Piezas'
    },
    desc: {
      fr: 'Fabriqué en bois de hêtre durable issu de forêts gérées de façon responsable. Peintures écologiques non toxiques, aimants sécurisés.',
      en: 'Made from sustainable beechwood from responsibly managed forests. Non-toxic eco-friendly paints, secure magnets.',
      de: 'Aus nachhaltigem Buchenholz aus verantwortungsvoll bewirtschafteten Wäldern. Ungiftige umweltfreundliche Farben, sichere Magnete.',
      es: 'Fabricado en madera de haya sostenible de bosques gestionados responsablemente. Pinturas ecológicas no tóxicas, imanes seguros.'
    },
    priceEur: 49.90,
    priceCad: 69.90,
    ageGroup: 'kids',
    recipient: 'kids'
  },
  {
    subcat: 'Peluches Géantes',
    titles: {
      fr: 'Ours en Peluche Géant Ultra Moelleux 100 cm Certifié CE',
      en: 'Giant Ultra Soft 100cm Teddy Bear CE Certified',
      de: 'Riesiger Ultra-Kuscheliger Teddybär 100 cm CE-Zertifiziert',
      es: 'Oso de Peluche Gigante Extrasuave 100 cm Certificado CE'
    },
    desc: {
      fr: 'Le compagnon câlin idéal pour les fêtes. Fourrure soyeuse hypoallergénique, rembourrage moelleux et yeux brodés sécurisés pour tous les âges.',
      en: 'The perfect cuddly holiday companion. Hypoallergenic silky fur, fluffy filling, and secure embroidered eyes for all ages.',
      de: 'Der perfekte Kuschelbegleiter für die Feiertage. Hypoallergenes seidiges Fell, flauschige Füllung und sichere gestickte Augen für alle Altersgruppen.',
      es: 'El compañero de mimos ideal para las fiestas. Pelo sedoso hipoalergénico, relleno mullido y ojos bordados seguros para todas las edades.'
    },
    priceEur: 42.00,
    priceCad: 59.00,
    ageGroup: 'toddler',
    recipient: 'kids'
  },
  {
    subcat: 'Jeux de Société',
    titles: {
      fr: 'Jeu de Stratégie Féerique de Noël en Famille Coffret Collector',
      en: 'Family Holiday Fairy Strategy Board Game Collector Box',
      de: 'Märchenhaftes Weihnachts-Familienspiel Sammler-Edition',
      es: 'Juego de Mesa Familiar de Estrategia Navideña Edición Coleccionista'
    },
    desc: {
      fr: 'Partagez des moments inoubliables en famille autour du sapin. De 2 à 6 joueurs, règles bilingues intuitives et pions métalliques peints à la main.',
      en: 'Share unforgettable family moments around the tree. 2 to 6 players, intuitive rules and hand-painted metal game pieces.',
      de: 'Teilen Sie unvergessliche Familienmomente am Baum. 2 bis 6 Spieler, intuitive Regeln und handbemalte Metallspielfiguren.',
      es: 'Comparta momentos inolvidables en familia junto al árbol. De 2 a 6 jugadores, reglas intuitivas y figuras metálicas pintadas a mano.'
    },
    priceEur: 34.90,
    priceCad: 49.90,
    ageGroup: 'kids',
    recipient: 'kids'
  },
  {
    subcat: 'Éveil & Premiers Âges',
    titles: {
      fr: 'Arche d\'Éveil Sensorielle en Bois Naturel avec Hochets Coton Bio',
      en: 'Natural Wood Sensory Baby Play Gym with Organic Cotton Rattles',
      de: 'Sensorischer Baby-Spielbogen aus Naturholz mit Bio-Baumwollrasseln',
      es: 'Gimnasio de Actividades Sensorial de Madera con Sonajeros de Algodón Orgánico'
    },
    desc: {
      fr: 'Développe la motricité et l\'éveil des tout-petits dès la naissance. Bois non traité poli à la main, éléments suspendus amovibles.',
      en: 'Develops motor skills and sensory awareness from birth. Untreated hand-polished wood with removable hanging elements.',
      de: 'Fördert Motorik und Sinne von Geburt an. Unbehandeltes, handpoliertes Holz mit abnehmbaren Hängeelementen.',
      es: 'Desarrolla la motricidad y estimulación desde el nacimiento. Madera sin tratar pulida a mano con elementos colgantes desmontables.'
    },
    priceEur: 55.00,
    priceCad: 78.00,
    ageGroup: 'infant',
    recipient: 'kids'
  }
];

export const TOY_PRODUCTS: Product[] = Array.from({ length: 85 }, (_, index) => {
  const tpl = TEMPLATES[index % TEMPLATES.length];
  const num = index + 1;
  const id = `jouets-${String(num).padStart(3, '0')}`;
  const sku = `NLG-TOYS-${String(num).padStart(4, '0')}`;
  const prefix12 = `3703234${String(10000 + num).slice(1)}`;
  const gtin = generateValidEan13(prefix12);
  const image = TOY_IMAGES[index % TOY_IMAGES.length];
  
  const priceVariation = (index % 4) * 3.5;
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
    brand: 'Le Monde des Enfants',
    identifierExists: true,
    condition: 'new',
    googleProductCategory: 'Toys & Games',
    gender: 'unisex',
    ageGroup: tpl.ageGroup,
    categorySlug: 'jouets',
    recipient: tpl.recipient,
    budgetTier: finalEur < 40 ? 'budget' : finalEur < 80 ? 'low' : 'medium',
    priceEur: finalEur,
    oldPriceEur,
    priceCad: finalCad,
    oldPriceCad,
    stock: 20 + (index % 40),
    availability: 'in_stock',
    images: [image],
    rating: Number((4.8 + ((index % 3) * 0.06)).toFixed(1)),
    reviewsCount: 22 + ((index * 8) % 90),
    isBestseller: index % 5 === 0,
    isPromo,
    title: {
      fr: `${tpl.titles.fr} Modèle N°${num}`,
      en: `${tpl.titles.en} Model #${num}`,
      de: `${tpl.titles.de} Modell Nr. ${num}`,
      es: `${tpl.titles.es} Modelo Nº${num}`
    },
    description: tpl.desc,
    features: {
      fr: ['Conforme aux normes européennes EN71 & CE', 'Matières saines sans BPA ni phtalates', 'Emballage cadeau festif offert'],
      en: ['Compliant with European EN71 & CE safety standards', 'BPA-free and phthalate-free safe materials', 'Festive gift wrap included'],
      de: ['Konform mit europäischen EN71 & CE Sicherheitsnormen', 'BPA-freie und phthalatfreie sichere Materialien', 'Inklusive festlicher Geschenkverpackung'],
      es: ['Conforme con las normas europeas EN71 y CE', 'Materiales seguros sin BPA ni ftalatos', 'Envoltorio festivo para regalo incluido']
    },
    badge: {
      fr: isPromo ? 'Cadeau Idéal' : 'Favori Enfants',
      en: isPromo ? 'Ideal Gift' : 'Kids Choice',
      de: isPromo ? 'Ideales Geschenk' : 'Kinder-Liebling',
      es: isPromo ? 'Regalo Ideal' : 'Favorito Niños'
    }
  };
});
