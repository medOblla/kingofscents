export type Family = "fresh" | "oriental" | "woody" | "floral" | "gourmand" | "aquatic" | "spicy";
export type Gender = "him" | "her" | "unisex";

export type Fragrance = {
  id: string;
  name: string;
  house: string;
  family: Family;
  gender: Gender;
  notes: { fr: string[]; en: string[] };
  description: { fr: string; en: string };
  tagline: { fr: string; en: string };
  /** Tailwind gradient classes used as the bottle visual */
  gradient: string;
  /** Decorative tint color for chips/glow */
  tint: string;
};

export const catalog: Fragrance[] = [
  {
    id: "baccarat-rouge-540",
    name: "Baccarat Rouge 540",
    house: "Maison Francis Kurkdjian",
    family: "oriental",
    gender: "unisex",
    notes: {
      fr: ["Safran", "Jasmin", "Ambre gris", "Cèdre"],
      en: ["Saffron", "Jasmine", "Ambergris", "Cedar"],
    },
    description: {
      fr: "Une signature sucrée-boisée devenue mythique. Aérienne, addictive, reconnaissable entre mille.",
      en: "A sweet-woody signature gone legend. Airy, addictive, instantly recognizable.",
    },
    tagline: { fr: "L'icône absolue", en: "The absolute icon" },
    gradient: "from-rose-300 via-amber-200 to-rose-500",
    tint: "#E8A0A0",
  },
  {
    id: "tom-ford-tobacco-vanille",
    name: "Tobacco Vanille",
    house: "Tom Ford",
    family: "oriental",
    gender: "unisex",
    notes: {
      fr: ["Tabac", "Vanille", "Fève tonka", "Cacao"],
      en: ["Tobacco", "Vanilla", "Tonka bean", "Cocoa"],
    },
    description: {
      fr: "Un velours sombre et opulent. Le parfum d'un salon de club londonien.",
      en: "Dark, opulent velvet. The smell of a London cigar lounge.",
    },
    tagline: { fr: "Opulent et profond", en: "Opulent and deep" },
    gradient: "from-amber-700 via-yellow-900 to-stone-900",
    tint: "#A67B3E",
  },
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel",
    house: "Chanel",
    family: "woody",
    gender: "him",
    notes: {
      fr: ["Pamplemousse", "Bois de santal", "Cèdre", "Ambre"],
      en: ["Grapefruit", "Sandalwood", "Cedar", "Amber"],
    },
    description: {
      fr: "L'élégance moderne, sans effort. La signature qui ne se discute pas.",
      en: "Effortless modern elegance. The non-negotiable signature.",
    },
    tagline: { fr: "L'élégance moderne", en: "Modern elegance" },
    gradient: "from-sky-400 via-indigo-700 to-slate-900",
    tint: "#5B7CC8",
  },
  {
    id: "creed-aventus",
    name: "Aventus",
    house: "Creed",
    family: "fresh",
    gender: "him",
    notes: {
      fr: ["Ananas", "Bouleau", "Musc", "Mousse de chêne"],
      en: ["Pineapple", "Birch", "Musk", "Oakmoss"],
    },
    description: {
      fr: "Fruité, fumé, magnétique. Le parfum qu'on retient.",
      en: "Fruity, smoky, magnetic. The fragrance people remember.",
    },
    tagline: { fr: "Magnétique", en: "Magnetic" },
    gradient: "from-lime-300 via-yellow-600 to-stone-800",
    tint: "#C9B36E",
  },
  {
    id: "dior-sauvage-elixir",
    name: "Sauvage Elixir",
    house: "Dior",
    family: "spicy",
    gender: "him",
    notes: {
      fr: ["Lavande", "Cannelle", "Réglisse", "Bois précieux"],
      en: ["Lavender", "Cinnamon", "Licorice", "Precious woods"],
    },
    description: {
      fr: "L'évolution intense du Sauvage. Concentré, épicé, virile.",
      en: "The intense evolution of Sauvage. Concentrated, spicy, virile.",
    },
    tagline: { fr: "Intensité concentrée", en: "Concentrated intensity" },
    gradient: "from-emerald-700 via-slate-900 to-black",
    tint: "#2C5F4E",
  },
  {
    id: "initio-oud-for-greatness",
    name: "Oud for Greatness",
    house: "Initio",
    family: "oriental",
    gender: "unisex",
    notes: {
      fr: ["Oud", "Safran", "Patchouli", "Encens"],
      en: ["Oud", "Saffron", "Patchouli", "Incense"],
    },
    description: {
      fr: "Un oud royal, contemporain, qui impose le silence.",
      en: "A royal, contemporary oud that commands silence.",
    },
    tagline: { fr: "Royal et contemporain", en: "Royal and contemporary" },
    gradient: "from-violet-900 via-fuchsia-900 to-stone-900",
    tint: "#7E3B7E",
  },
  {
    id: "parfums-de-marly-layton",
    name: "Layton Royal Essence",
    house: "Parfums de Marly",
    family: "gourmand",
    gender: "him",
    notes: {
      fr: ["Pomme", "Vanille", "Cardamome", "Bois de gaïac"],
      en: ["Apple", "Vanilla", "Cardamom", "Guaiac wood"],
    },
    description: {
      fr: "Sucré-épicé, raffiné. Le compliment-magnet par excellence.",
      en: "Sweet-spiced, refined. The ultimate compliment magnet.",
    },
    tagline: { fr: "Compliment-magnet", en: "Compliment magnet" },
    gradient: "from-amber-300 via-orange-500 to-rose-900",
    tint: "#D89A57",
  },
  {
    id: "lattafa-khamrah",
    name: "Khamrah",
    house: "Lattafa",
    family: "gourmand",
    gender: "unisex",
    notes: {
      fr: ["Dattes", "Cannelle", "Vanille", "Tonka"],
      en: ["Date", "Cinnamon", "Vanilla", "Tonka"],
    },
    description: {
      fr: "Datte caramélisée et épices. L'esprit du Ramadan en flacon.",
      en: "Caramelized date and spice. The spirit of Ramadan in a bottle.",
    },
    tagline: { fr: "Gourmand et chaleureux", en: "Gourmand and warm" },
    gradient: "from-amber-600 via-red-800 to-stone-900",
    tint: "#A55C2A",
  },
  {
    id: "xerjoff-naxos",
    name: "Naxos",
    house: "Xerjoff",
    family: "gourmand",
    gender: "unisex",
    notes: {
      fr: ["Miel", "Tabac", "Vanille", "Cannelle"],
      en: ["Honey", "Tobacco", "Vanilla", "Cinnamon"],
    },
    description: {
      fr: "Miel, tabac et vanille. Du soleil italien dans chaque pulvérisation.",
      en: "Honey, tobacco and vanilla. Italian sun in every spray.",
    },
    tagline: { fr: "Soleil italien", en: "Italian sun" },
    gradient: "from-yellow-400 via-amber-700 to-stone-900",
    tint: "#D4A04A",
  },
  {
    id: "le-labo-santal-33",
    name: "Santal 33",
    house: "Le Labo",
    family: "woody",
    gender: "unisex",
    notes: {
      fr: ["Bois de santal", "Cardamome", "Iris", "Cuir"],
      en: ["Sandalwood", "Cardamom", "Iris", "Leather"],
    },
    description: {
      fr: "Boisé crémeux, légèrement cuir. La signature des cafés branchés.",
      en: "Creamy woody with a leather edge. The cool café signature.",
    },
    tagline: { fr: "Boisé crémeux", en: "Creamy woody" },
    gradient: "from-stone-300 via-amber-400 to-stone-800",
    tint: "#B49B72",
  },
  {
    id: "ysl-libre",
    name: "Libre",
    house: "Yves Saint Laurent",
    family: "floral",
    gender: "her",
    notes: {
      fr: ["Lavande", "Fleur d'oranger", "Vanille", "Musc"],
      en: ["Lavender", "Orange blossom", "Vanilla", "Musc"],
    },
    description: {
      fr: "Liberté florale et solaire. La féminité contemporaine.",
      en: "Solar floral freedom. Contemporary femininity.",
    },
    tagline: { fr: "Solaire et libre", en: "Solar and free" },
    gradient: "from-yellow-200 via-amber-300 to-orange-700",
    tint: "#E4B85A",
  },
  {
    id: "lancome-la-vie-est-belle",
    name: "La Vie Est Belle",
    house: "Lancôme",
    family: "gourmand",
    gender: "her",
    notes: {
      fr: ["Iris", "Praline", "Patchouli", "Vanille"],
      en: ["Iris", "Praline", "Patchouli", "Vanilla"],
    },
    description: {
      fr: "Praline et fleurs blanches. Une joie sucrée et lumineuse.",
      en: "Praline and white flowers. A sweet, luminous joy.",
    },
    tagline: { fr: "Joie sucrée", en: "Sweet joy" },
    gradient: "from-pink-200 via-rose-400 to-fuchsia-700",
    tint: "#E68FA8",
  },
  {
    id: "tom-ford-oud-wood",
    name: "Oud Wood",
    house: "Tom Ford",
    family: "woody",
    gender: "unisex",
    notes: {
      fr: ["Oud", "Bois de rose", "Cardamome", "Vétiver"],
      en: ["Oud", "Rosewood", "Cardamom", "Vetiver"],
    },
    description: {
      fr: "Un oud lisse, élégant, jamais agressif. Pour les soirées qui comptent.",
      en: "A smooth, elegant oud — never aggressive. For nights that matter.",
    },
    tagline: { fr: "L'oud élégant", en: "The elegant oud" },
    gradient: "from-amber-900 via-stone-800 to-zinc-900",
    tint: "#74553C",
  },
  {
    id: "armaf-club-de-nuit",
    name: "Club de Nuit Intense",
    house: "Armaf",
    family: "fresh",
    gender: "him",
    notes: {
      fr: ["Ananas", "Pomme noire", "Bouleau", "Musc"],
      en: ["Pineapple", "Black currant", "Birch", "Musk"],
    },
    description: {
      fr: "Le frais-fumé qui ne fait pas son âge. Performance redoutable.",
      en: "Fresh-smoky that punches way above its weight. Killer performance.",
    },
    tagline: { fr: "Performance brute", en: "Raw performance" },
    gradient: "from-cyan-400 via-blue-800 to-stone-900",
    tint: "#3E78B0",
  },
  {
    id: "mancera-cedrat-boise",
    name: "Cedrat Boise",
    house: "Mancera",
    family: "fresh",
    gender: "unisex",
    notes: {
      fr: ["Citron vert", "Cèdre", "Ambre", "Patchouli"],
      en: ["Lime", "Cedar", "Amber", "Patchouli"],
    },
    description: {
      fr: "Frais boisé pour l'été marocain. Lumineux, longue tenue.",
      en: "Fresh-woody made for Moroccan summer. Bright, long-lasting.",
    },
    tagline: { fr: "Été marocain", en: "Moroccan summer" },
    gradient: "from-lime-300 via-emerald-600 to-stone-800",
    tint: "#8FB85C",
  },
  {
    id: "lattafa-asad",
    name: "Asad",
    house: "Lattafa",
    family: "spicy",
    gender: "him",
    notes: {
      fr: ["Bergamote", "Ananas", "Bouleau", "Ambre"],
      en: ["Bergamot", "Pineapple", "Birch", "Amber"],
    },
    description: {
      fr: "La puissance accessible. Aventus en mode budget conscient.",
      en: "Accessible power. Aventus energy without the price tag.",
    },
    tagline: { fr: "Puissance accessible", en: "Accessible power" },
    gradient: "from-orange-400 via-red-700 to-stone-900",
    tint: "#C76A38",
  },
];

export function getFragranceById(id: string): Fragrance | undefined {
  return catalog.find((f) => f.id === id);
}
