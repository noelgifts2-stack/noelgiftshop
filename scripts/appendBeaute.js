const fs = require('fs');
const d = require('./data/beauteData.js');

const extra = [
  {
    subcat: 'Parfums & Eaux de Parfum',
    brand: 'Parfumerie Céleste',
    title: {
      fr: 'Eau de Cologne Traditionnelle Verveine Givrée & Cédrat 200ml',
      en: 'Traditional Frosted Verbena & Citron Eau de Cologne 200ml',
      de: 'Traditionelles Kölnisch Wasser mit Minzverbene & Zitrone 200ml',
      es: 'Agua de Colonia Tradicional de Verbena y Limón 200ml'
    },
    desc: {
      fr: 'Fraîcheur tonique et vivifiante après la douche : agrumes pétillants de Calabre, verveine des collines et fond doux de musc blanc.',
      en: 'Crisp invigorating post-shower splash: Calabrian citrus zest, crushed verbena leaves and subtle clean musks.',
      de: 'Erfrischender Duftklassiker mit spritziger Zitrone und zitroniger Verbene.',
      es: 'Frescor cítrico tonificante con notas chispeantes de limón italiano y verbena aromática.'
    },
    priceEur: 38.00,
    priceCad: 54.00,
    gender: 'unisex',
    recipient: 'couples',
    budgetTier: 'budget',
    badge: { fr: 'Fraîcheur Pure', en: 'Fresh Cologne', de: 'Erfrischend', es: 'Frescor' }
  },
  {
    subcat: 'Maquillage de Fête',
    brand: 'Céleste Beauté',
    title: {
      fr: 'Coffret 4 Vernis à Ongles de Fête Sans Toxines Longue Tenue',
      en: 'Holiday 4-Piece Clean Non-Toxic Nail Polish Gift Set',
      de: '4er-Set schadstofffreie Festtags-Nagellacke langanhaltend',
      es: 'Cofre de 4 Esmaltes de Uñas Navideños Sin Tóxicos Larga Duración'
    },
    desc: {
      fr: 'Formule 10-free respectueuse des ongles : Rouge Carmin Festif, Or Scintillant, Bordeaux Nuit et Nacre Givrée. Séchage rapide.',
      en: '10-free clean breathable nail lacquer: Festive Carmine, Shimmer Gold, Midnight Plum and Frosted Pearl.',
      de: 'Vegane Nagellacke ohne schädliche Lösungsmittel mit glänzendem Festtagsfinish.',
      es: 'Esmaltes de uñas veganos sin químicos agresivos en tonos festivos con secado ultrarrápido.'
    },
    priceEur: 29.90,
    priceCad: 42.00,
    gender: 'female',
    recipient: 'teens',
    budgetTier: 'budget',
    badge: { fr: 'Formule Saine', en: 'Clean Beauty', de: 'Schadstofffrei', es: 'Fórmula Limpia' }
  },
  {
    subcat: 'Rasage & Barbe',
    brand: 'Barbier de Paris',
    title: {
      fr: "Baume Disciplinant Barbe Cire d'Abeille & Beurre de Cacao 60g",
      en: 'Beard Sculpting Conditioning Balm Cocoa Butter & Beeswax 60g',
      de: 'Formender Bartbalsam mit Bienenwachs und Kakaobutter 60g',
      es: 'Bálsamo Moldeador para Barba con Cera de Abeja y Manteca de Cacao'
    },
    desc: {
      fr: "Fixe et discipline les poils rebelles tout en hydratant la barbe toute la journée sans coller. Parfum frais boisé de pin et cyprès.",
      en: 'Shapes and smooths flyaways with natural hold while locking in deep moisture all day with fresh pine and cypress notes.',
      de: 'Bändigt widerspenstige Barthaare mit natürlichem Halt und dezentem Waldduft.',
      es: 'Fija y da forma a la barba rebelde con ingredientes naturales y aroma a bosque.'
    },
    priceEur: 19.90,
    priceCad: 28.00,
    gender: 'male',
    recipient: 'men',
    budgetTier: 'budget',
    badge: { fr: 'Fixation Douce', en: 'Natural Hold', de: 'Bartbalsam', es: 'Fijación Natural' }
  },
  {
    subcat: 'Maquillage de Fête',
    brand: 'Céleste Beauté',
    title: {
      fr: "Poudre Bronzante Éclat Soleil d'Hiver Boîtier Bijou Doré",
      en: 'Winter Sun Radiant Bronzer Powder Gilded Compact Jewel Mirror',
      de: 'Bronzing-Puder für frischen Winterteint im goldenen Schmuckdöschen',
      es: 'Polvos Bronceadores Efecto Buena Cara Sol de Invierno con Espejo'
    },
    desc: {
      fr: "Réveille le teint pâle de l'hiver d'un hâle subtil et chaleureux sans sous-ton orange. Finition satinée enrichie en poudre de soie.",
      en: 'Revives pale winter skin with warm sun-kissed warmth without orange undertones in a heavy refillable golden compact.',
      de: 'Verleiht blasser Winterhaut einen gesunden, erholten Teint wie nach einem Spaziergang im Schnee.',
      es: 'Aporta calidez instantánea a la piel en invierno sin tonos anaranjados con textura micronizada.'
    },
    priceEur: 32.00,
    priceCad: 45.00,
    gender: 'female',
    recipient: 'women',
    budgetTier: 'budget',
    badge: { fr: 'Bonne Mine', en: 'Sun Kissed', de: 'Frischer Teint', es: 'Buena Cara' }
  },
  {
    subcat: 'Mains & Pieds',
    brand: 'Atelier Botanique',
    title: {
      fr: 'Crème Pieds Nourrissante Menthe Poivrée Rafraîchissante & Arnica',
      en: 'Revitalizing Peppermint & Arnica Tired Feet Foot Cream 100ml',
      de: 'Erfrischende Fußcreme mit Pfefferminze und Arnika gegen müde Füße',
      es: 'Crema Reparadora de Pies con Menta Piperita Refrescante y Árnica'
    },
    desc: {
      fr: 'Soulage immédiatement les pieds fatigués par les courses de Noël et les talons de fête : menthe glaciale délassante et arnica apaisant.',
      en: 'Instantly cools aching feet weary from holiday shopping and evening party heels with icy peppermint and arnica.',
      de: 'Lindert schwere Füße nach Festtagen mit kühlendem Menthol und durchblutungsförderndem Arnika.',
      es: 'Alivia pies cansados tras horas de fiesta o compras navideñas con efecto hielo y árnica.'
    },
    priceEur: 18.00,
    priceCad: 26.00,
    gender: 'unisex',
    recipient: 'couples',
    budgetTier: 'budget',
    badge: { fr: 'Effet Glaçon', en: 'Ice Relief', de: 'Kühleffekt', es: 'Efecto Frío' }
  },
  {
    subcat: 'Soins des Cheveux',
    brand: 'Atelier Botanique',
    title: {
      fr: "Masque Capillaire Nutrition Intense Kératine Végétale & Huile d'Argan",
      en: 'Deep Nourishing Hair Mask Vegan Keratin & Moroccan Argan Oil',
      de: 'Haarmaske Intensive Pflege mit pflanzlichem Keratin und Arganöl',
      es: 'Mascarilla Capilar Nutrición Profunda Queratina Vegetal y Argán'
    },
    desc: {
      fr: 'Répare la fibre capillaire desséchée par le froid extérieur et le chauffage intérieur : cheveux brillants, souples et soyeux pour les fêtes.',
      en: 'Restores split ends parched by indoor radiator heating and outdoor freeze leaving holiday hair glossy and silky.',
      de: 'Verwandelt trockenes Winterhaar in geschmeidige, glänzende Festtagsmähnen.',
      es: 'Repara el cabello castigado por el frío y la calefacción devolviendo brillo y suavidad.'
    },
    priceEur: 28.00,
    priceCad: 39.00,
    gender: 'female',
    recipient: 'women',
    budgetTier: 'budget',
    badge: { fr: 'Cheveux Soyeux', en: 'Glossy Hair', de: 'Haarpflege', es: 'Pelo Sedoso' }
  },
  {
    subcat: 'Pinceaux & Accessoires',
    brand: 'Atelier Botanique',
    title: {
      fr: 'Peigne Démêlant en Corne Naturelle Façonné à la Main Antistatique',
      en: 'Hand-Carved Natural Horn Detangling Hair Comb Anti-Static',
      de: 'Handgeschnitzter Hornkamm aus Naturhorn antistatisch für schonendes Kämmen',
      es: 'Peine Desenredante de Cuerno Natural Tallado a Mano Antiestático'
    },
    desc: {
      fr: "La même composition en kératine que le cheveu : glisse sans casser la fibre et élimine totalement l'électricité statique des bonnets d'hiver.",
      en: 'Same natural keratin composition as hair: glides effortlessly without static flyaways caused by winter beanies.',
      de: 'Echtes Naturhorn verhindert fliegende Haare durch Wintermützen und schont die Spitzen.',
      es: 'Composición de queratina natural que evita el encrespamiento por bufandas y gorros de lana.'
    },
    priceEur: 24.00,
    priceCad: 34.00,
    gender: 'unisex',
    recipient: 'couples',
    budgetTier: 'budget',
    badge: { fr: 'Zéro Électricité', en: 'Anti-Static', de: 'Antistatisch', es: 'Antiestático' }
  },
  {
    subcat: 'Bain & Soins Relaxants',
    brand: 'Atelier Botanique',
    title: {
      fr: "Gel Douche Crème Onctueux Pain d'Épices & Miel de Châtaignier 300ml",
      en: 'Spiced Gingerbread & Chestnut Honey Cream Body Wash 300ml',
      de: 'Duschcreme Lebkuchen & Kastanienhonig reichhaltig 300ml',
      es: 'Gel de Ducha Cremoso Pan de Jengibre y Miel de Castaño 300ml'
    },
    desc: {
      fr: "Mousse généreuse et parfum régressif de biscuit sortant du four : nettoie en douceur sans tirailler grâce aux extraits d'avoine bio.",
      en: 'Rich comforting bakery aromas filling showers with warm gingerbread notes while organic oats soothe dry winter skin.',
      de: 'Duftet herrlich nach frischen Weihnachtsplätzchen und pflegt die Haut schon beim Duschen.',
      es: 'Espuma suave con aroma reconfortante a galletas recién horneadas y avena calmante.'
    },
    priceEur: 16.90,
    priceCad: 24.00,
    gender: 'unisex',
    recipient: 'couples',
    budgetTier: 'budget',
    badge: { fr: 'Gourmandise', en: 'Warm Spice', de: 'Dufterlebnis', es: 'Aroma Dulce' }
  },
  {
    subcat: 'Soins du Visage',
    brand: 'Atelier Botanique',
    title: {
      fr: 'Eau Florale de Rose de Damas Bio Brumisateur Verre Ambré 200ml',
      en: 'Organic Damask Rose Floral Water Toner Amber Glass Spray 200ml',
      de: 'Bio-Damaszener Rosenwasser Gesichtswasser Glaszerstäuber 200ml',
      es: 'Agua Floral de Rosa de Damasco Bio Tónico Facial Frasco de Cristal 200ml'
    },
    desc: {
      fr: "Distillation artisanale à la vapeur d'eau de pétales frais de roses : tonifie, resserre les pores et apaise les rougeurs du froid.",
      en: 'Pure steam-distilled fresh damask petals: calms winter cheek redness, balances hydration and preps skin for festive makeup.',
      de: 'Echtes Rosenhydrolat mildert Rötungen durch Kälte und belebt den Teint morgens sanft.',
      es: 'Destilado puro de rosas frescas que calma rojeces por el frío y equilibra el cutis.'
    },
    priceEur: 17.50,
    priceCad: 25.00,
    gender: 'female',
    recipient: 'women',
    budgetTier: 'budget',
    badge: { fr: 'Rose Bio', en: 'Organic Rose', de: 'Bio-Rose', es: 'Rosa Bio' }
  },
  {
    subcat: 'Savons & Bains',
    brand: 'Atelier Botanique',
    title: {
      fr: 'Éponge de Massage Loofah Naturelle avec Lanière Coton Côtelé',
      en: 'Natural Loofah Body Exfoliator Pad with Organic Cotton Strap',
      de: 'Natürlicher Luffa-Schwamm Peeling-Pad mit Baumwollband',
      es: 'Esponja de Luffa Natural Exfoliante con Cinta de Algodón'
    },
    desc: {
      fr: 'Fibre végétale naturelle de courge luffa séchée : exfolie en douceur le corps sous la douche et stimule la circulation sanguine.',
      en: '100% biodegradable natural dried luffa plant fiber: buffs winter dryness in the shower with sturdy organic strap.',
      de: '100% biologisch abbaubarer Naturschwamm für sanftes Körperpeeling und weiche Haut.',
      es: 'Fibra vegetal 100% biodegradable que activa la circulación y suaviza la piel bajo la ducha.'
    },
    priceEur: 12.00,
    priceCad: 17.00,
    gender: 'unisex',
    recipient: 'couples',
    budgetTier: 'budget',
    badge: { fr: '100% Végétal', en: '100% Natural', de: 'Naturprodukt', es: '100% Vegetal' }
  }
];

const total = [...d, ...extra];
fs.writeFileSync('scripts/data/beauteData.js', 'module.exports = ' + JSON.stringify(total, null, 2) + ';\n');
console.log('Beaute updated to:', total.length);
