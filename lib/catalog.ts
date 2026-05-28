export type FragranceTier = "designer" | "gulf";

export type Fragrance = {
  id: string;
  name: string;
  house: string;
  tier: FragranceTier;
  notes: { fr: string[]; en: string[] };
  description: { fr: string; en: string };
  gradient: string;
  /** Path under /public to the product photo. */
  image: string;
};

export const fragrances: Record<string, Fragrance> = {
  "ysl-y": {
    id: "ysl-y",
    name: "MYSLF",
    house: "Yves Saint Laurent",
    tier: "designer",
    notes: {
      fr: ["Pomme", "Sauge", "Bois de cèdre", "Ambre"],
      en: ["Apple", "Sage", "Cedarwood", "Amber"],
    },
    description: {
      fr: "Frais et boisé. Le compagnon élégant du quotidien.",
      en: "Fresh and woody. The elegant everyday companion.",
    },
    gradient: "from-zinc-700 via-slate-800 to-black",
    image: "/img/parfumes/ysl.jpeg",
  },
  "dior-homme-intense": {
    id: "dior-homme-intense",
    name: "Homme Intense",
    house: "Dior",
    tier: "designer",
    notes: {
      fr: ["Iris", "Lavande", "Cacao", "Cèdre"],
      en: ["Iris", "Lavender", "Cocoa", "Cedar"],
    },
    description: {
      fr: "Iris poudré, cacao et vétiver. Sophistication classique.",
      en: "Powdered iris, cocoa and vetiver. Timeless sophistication.",
    },
    gradient: "from-stone-700 via-zinc-800 to-stone-900",
    image: "/img/parfumes/diorIntense.jpeg",
  },
  "armani-swy-intensely": {
    id: "armani-swy-intensely",
    name: "Stronger With You Intensely",
    house: "Emporio Armani",
    tier: "designer",
    notes: {
      fr: ["Cardamome", "Vanille", "Châtaigne", "Bois ambré"],
      en: ["Cardamom", "Vanilla", "Chestnut", "Amber wood"],
    },
    description: {
      fr: "Vanille-châtaigne addictive. Le compliment-magnet incontesté.",
      en: "Addictive vanilla-chestnut. The undisputed compliment magnet.",
    },
    gradient: "from-amber-700 via-rose-900 to-stone-900",
    image: "/img/parfumes/strongerwithyou.jpeg",
  },
  "lattafa-supremacy-silver": {
    id: "lattafa-supremacy-silver",
    name: "Supremacy Silver",
    house: "Afnan",
    tier: "gulf",
    notes: {
      fr: ["Ananas", "Bouleau", "Musc", "Ambre gris"],
      en: ["Pineapple", "Birch", "Musk", "Ambergris"],
    },
    description: {
      fr: "Fruité-fumé puissant. L'esprit d'Aventus, budget conscient.",
      en: "Bold fruity-smoky. Aventus energy without the bottle bill.",
    },
    gradient: "from-cyan-700 via-slate-800 to-zinc-900",
    image: "/img/parfumes/supremacy.png",
  },
  "9pm-night-out": {
    id: "9pm-night-out",
    name: "9PM Night Out",
    house: "Afnan",
    tier: "gulf",
    notes: {
      fr: ["Bergamote", "Cardamome", "Vanille", "Tonka"],
      en: ["Bergamot", "Cardamom", "Vanilla", "Tonka"],
    },
    description: {
      fr: "Sucré-épicé pour les soirées qui durent.",
      en: "Sweet-spiced for nights that run long.",
    },
    gradient: "from-violet-800 via-indigo-900 to-stone-900",
    image: "/img/parfumes/9am.jpeg",
  },
  "9pm-rebel": {
    id: "9pm-rebel",
    name: "9PM Rebel",
    house: "Afnan",
    tier: "gulf",
    notes: {
      fr: ["Pomme", "Rhum", "Vanille", "Bois précieux"],
      en: ["Apple", "Rum", "Vanilla", "Precious woods"],
    },
    description: {
      fr: "Gourmand boisé, sillage généreux. Audacieux sans excès.",
      en: "Gourmand-woody with a generous trail. Bold without overdoing it.",
    },
    gradient: "from-orange-700 via-red-900 to-stone-900",
    image: "/img/parfumes/9am2.jpeg",
  },
};

export function getFragrance(id: string): Fragrance {
  const f = fragrances[id];
  if (!f) throw new Error(`Unknown fragrance: ${id}`);
  return f;
}

export type TierId = "royal" | "signature" | "discovery";

export type Tier = {
  id: TierId;
  count: 2 | 3 | 4;
  /** Base price in DH. Discovery has bundles at different price points. */
  price: number;
  /** Free mystery decant size in ml (0 = none). */
  decantMl: number;
  freeShipping: boolean;
};

export const tiers: Record<TierId, Tier> = {
  royal: { id: "royal", count: 4, price: 399, decantMl: 5, freeShipping: true },
  signature: { id: "signature", count: 3, price: 319, decantMl: 2.5, freeShipping: true },
  discovery: { id: "discovery", count: 2, price: 189, decantMl: 0, freeShipping: false },
};

export type Bundle = {
  id: string;
  tier: TierId;
  fragrances: string[];
  /** Price override; defaults to tiers[tier].price. */
  price?: number;
  /** Optional badge, e.g. "Gulf Duo". */
  badgeKey?: "gulfDuo";
};

export const bundles: Bundle[] = [
  // Royal — 4 fragrances · 399 DH
  { id: "royal-1", tier: "royal", fragrances: ["ysl-y", "dior-homme-intense", "armani-swy-intensely", "9pm-rebel"] },
  { id: "royal-2", tier: "royal", fragrances: ["ysl-y", "dior-homme-intense", "armani-swy-intensely", "lattafa-supremacy-silver"] },
  { id: "royal-3", tier: "royal", fragrances: ["ysl-y", "dior-homme-intense", "armani-swy-intensely", "9pm-night-out"] },

  // Signature — 3 fragrances · 319 DH
  { id: "signature-1", tier: "signature", fragrances: ["armani-swy-intensely", "dior-homme-intense", "9pm-rebel"] },
  { id: "signature-2", tier: "signature", fragrances: ["ysl-y", "dior-homme-intense", "lattafa-supremacy-silver"] },
  { id: "signature-3", tier: "signature", fragrances: ["ysl-y", "armani-swy-intensely", "9pm-night-out"] },

  // Discovery — 2 fragrances · 189 DH (149 DH for Gulf duo)
  { id: "discovery-1", tier: "discovery", fragrances: ["dior-homme-intense", "lattafa-supremacy-silver"] },
  { id: "discovery-2", tier: "discovery", fragrances: ["ysl-y", "9pm-night-out"] },
  { id: "discovery-3", tier: "discovery", fragrances: ["armani-swy-intensely", "9pm-rebel"] },
  { id: "discovery-4", tier: "discovery", fragrances: ["9pm-night-out", "9pm-rebel"], price: 149, badgeKey: "gulfDuo" },
];

export function getBundle(id: string): Bundle {
  const b = bundles.find((x) => x.id === id);
  if (!b) throw new Error(`Unknown bundle: ${id}`);
  return b;
}

export function bundlePrice(b: Bundle): number {
  return b.price ?? tiers[b.tier].price;
}

export function bundlesByTier(tier: TierId): Bundle[] {
  return bundles.filter((b) => b.tier === tier);
}
