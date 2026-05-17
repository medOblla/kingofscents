export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type Dict = {
  meta: { title: string; description: string };
  nav: { packs: string; perfumes: string; story: string; faq: string; orderNow: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    titleC: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bulletA: string;
    bulletB: string;
    bulletC: string;
  };
  trust: { secure: string; codAvail: string; delivery: string; authentic: string };
  marquee: string[];
  how: {
    title: string;
    sub: string;
    steps: { title: string; body: string }[];
  };
  packs: {
    title: string;
    sub: string;
    perDecant: string;
    save: string;
    chooseCta: string;
    popular: string;
    bestValue: string;
    items: { id: 2 | 3 | 4; name: string; subtitle: string; price: number; reg: number; perks: string[] }[];
  };
  composer: {
    title: string;
    subWith: string; // {n}
    progress: string; // {filled}/{total}
    addCta: string;
    addedCta: string;
    swap: string;
    summary: string;
    subtotal: string;
    shipping: string;
    shippingFree: string;
    total: string;
    proceed: string;
    selectPackFirst: string;
    completeYourPack: string;
    yourPack: string;
    empty: string;
    remove: string;
    family: { fresh: string; oriental: string; woody: string; floral: string; gourmand: string; aquatic: string; spicy: string };
    filterAll: string;
    filterBy: string;
    searchPlaceholder: string;
    notesLabel: string;
    forLabel: string;
    forHim: string;
    forHer: string;
    forUnisex: string;
  };
  checkout: {
    title: string;
    sub: string;
    name: string;
    phone: string;
    city: string;
    address: string;
    cityPlaceholder: string;
    addressPlaceholder: string;
    payCod: string;
    placeOrder: string;
    placing: string;
    successTitle: string;
    successBody: string;
    successAgain: string;
    requiredHint: string;
    legal: string;
  };
  reviews: {
    title: string;
    sub: string;
    items: { name: string; city: string; quote: string }[];
  };
  faq: {
    title: string;
    sub: string;
    items: { q: string; a: string }[];
  };
  story: {
    eyebrow: string;
    title: string;
    body: string;
    line1Label: string;
    line1Value: string;
    line2Label: string;
    line2Value: string;
    line3Label: string;
    line3Value: string;
  };
  footer: {
    tagline: string;
    rights: string;
    follow: string;
  };
};

export const dict: Record<Locale, Dict> = {
  fr: {
    meta: {
      title: "kingofscents — Le luxe en quelques gouttes | Décants 10ml",
      description:
        "Composez votre pack de décants de parfums de luxe — 10ml chacun. Sauvage, Baccarat Rouge 540, Tom Ford, Creed. Livraison partout au Maroc, paiement à la livraison.",
    },
    nav: { packs: "Packs", perfumes: "Parfums", story: "Notre histoire", faq: "FAQ", orderNow: "Commander" },
    hero: {
      eyebrow: "Décants 10 ml · Composé à la main au Maroc",
      titleA: "Le luxe",
      titleB: "en quelques",
      titleC: "gouttes.",
      sub: "Découvrez les parfums qui vous obsèdent — Baccarat Rouge 540, Tom Ford, Creed, Dior — sans engager 2 000 DH sur un flacon. Composez votre pack de décants 10 ml, et portez une signature différente chaque jour.",
      ctaPrimary: "Composer mon pack",
      ctaSecondary: "Voir les parfums",
      bulletA: "100% authentiques",
      bulletB: "Livraison 24–72h",
      bulletC: "Paiement à la livraison",
    },
    trust: {
      secure: "Authentiques garantis",
      codAvail: "Paiement à la livraison",
      delivery: "Livraison 24–72h",
      authentic: "Flaconnage premium",
    },
    marquee: [
      "Baccarat Rouge 540",
      "Bleu de Chanel",
      "Tom Ford Tobacco Vanille",
      "Creed Aventus",
      "Dior Sauvage Elixir",
      "Oud for Greatness",
      "Layton Royal Essence",
      "Khamrah",
      "Naxos",
      "Le Labo Santal 33",
    ],
    how: {
      title: "Trois pas vers votre signature",
      sub: "Pas de flacon à 2 000 DH. Juste les parfums que vous voulez vraiment porter — en 10 ml.",
      steps: [
        { title: "Choisissez un pack", body: "2, 3 ou 4 décants. Plus vous en prenez, moins le décant coûte cher." },
        { title: "Composez votre pack", body: "Sélectionnez vos parfums dans notre catalogue de signatures de luxe." },
        { title: "Recevez et obsédez", body: "Livraison partout au Maroc en 24–72h. Paiement à la livraison." },
      ],
    },
    packs: {
      title: "Choisissez votre pack",
      sub: "Tous les décants sont en flacon de 10 ml avec spray brumisateur — environ 100 vaporisations.",
      perDecant: "par décant",
      save: "Économisez",
      chooseCta: "Choisir ce pack",
      popular: "Le plus choisi",
      bestValue: "Meilleur rapport",
      items: [
        { id: 2, name: "Le Duo", subtitle: "Deux signatures pour rythmer la semaine", price: 180, reg: 240, perks: ["2 décants 10 ml", "Pochette de transport", "Livraison offerte dès 250 DH"] },
        { id: 3, name: "Le Trio", subtitle: "Le pack le plus choisi — variez selon l'humeur", price: 250, reg: 360, perks: ["3 décants 10 ml", "Pochette de transport", "Livraison offerte"] },
        { id: 4, name: "Le Quatuor", subtitle: "Une garde-robe olfactive complète", price: 310, reg: 480, perks: ["4 décants 10 ml", "Pochette de transport", "Livraison offerte", "Carte d'olfaction offerte"] },
      ],
    },
    composer: {
      title: "Composez votre pack",
      subWith: "Choisissez exactement {n} parfums parmi notre sélection.",
      progress: "{filled} sur {total} parfums",
      addCta: "Ajouter",
      addedCta: "Ajouté",
      swap: "Remplacer",
      summary: "Votre pack",
      subtotal: "Sous-total",
      shipping: "Livraison",
      shippingFree: "Offerte",
      total: "Total",
      proceed: "Passer à la caisse",
      selectPackFirst: "Sélectionnez un pack ci-dessus pour commencer.",
      completeYourPack: "Complétez votre pack pour continuer",
      yourPack: "Votre pack",
      empty: "Aucun parfum sélectionné",
      remove: "Retirer",
      family: { fresh: "Frais", oriental: "Oriental", woody: "Boisé", floral: "Floral", gourmand: "Gourmand", aquatic: "Aquatique", spicy: "Épicé" },
      filterAll: "Tous",
      filterBy: "Filtrer par famille",
      searchPlaceholder: "Rechercher un parfum…",
      notesLabel: "Notes",
      forLabel: "Pour",
      forHim: "Lui",
      forHer: "Elle",
      forUnisex: "Mixte",
    },
    checkout: {
      title: "Finaliser la commande",
      sub: "Aucune carte requise. Vous payez à la livraison.",
      name: "Nom complet",
      phone: "Téléphone (WhatsApp)",
      city: "Ville",
      address: "Adresse de livraison",
      cityPlaceholder: "Casablanca, Rabat, Marrakech…",
      addressPlaceholder: "Quartier, rue, étage…",
      payCod: "Paiement à la livraison",
      placeOrder: "Confirmer la commande",
      placing: "Envoi en cours…",
      successTitle: "Commande reçue.",
      successBody: "Notre équipe vous contactera sur WhatsApp dans l'heure pour confirmer.",
      successAgain: "Composer un autre pack",
      requiredHint: "Tous les champs sont requis.",
      legal: "En commandant, vous acceptez nos conditions et politique de confidentialité.",
    },
    reviews: {
      title: "Adopté par les exigeants",
      sub: "Plus de 4 200 packs livrés à travers le Maroc.",
      items: [
        { name: "Yasmine", city: "Casablanca", quote: "Enfin essayer Baccarat Rouge 540 sans flipper sur le prix. Le décant tient une journée entière. J'ai déjà recommandé le Trio." },
        { name: "Hamza", city: "Rabat", quote: "Le packaging est sérieux, les parfums authentiques. Livré en 36 heures. Je change de signature selon l'occasion." },
        { name: "Salma", city: "Marrakech", quote: "Idée brillante. J'ai composé un pack mixte pour mon mari et moi — chacun deux décants. Service impeccable." },
        { name: "Mehdi", city: "Tanger", quote: "Les 10 ml durent un bon mois en porté quotidien. Bien plus malin que de claquer 1 800 DH sur un flacon qu'on n'aime plus." },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      sub: "Tout ce qu'il faut savoir avant de composer.",
      items: [
        { q: "Vos parfums sont-ils authentiques ?", a: "Oui. Nous achetons les flacons originaux directement auprès des distributeurs autorisés et nous les reconditionnons à la main dans des décants pharmaceutiques avec spray. Aucun mélange, aucune dilution." },
        { q: "Combien de vaporisations dans un décant 10 ml ?", a: "Environ 100 vaporisations — soit 1 à 2 mois en porté quotidien selon votre habitude." },
        { q: "Quel est le délai de livraison ?", a: "24 à 72 heures partout au Maroc. Casablanca et Rabat généralement le lendemain." },
        { q: "Comment payer ?", a: "Paiement à la livraison en espèces. Le livreur vous remet le pack, vous vérifiez, vous payez." },
        { q: "Puis-je retourner si le parfum ne me plaît pas ?", a: "Pour des raisons d'hygiène, les décants ouverts ne sont pas repris. Si le décant arrive endommagé, nous le remplaçons immédiatement." },
        { q: "Puis-je mélanger pour homme et pour femme dans un même pack ?", a: "Évidemment. C'est même l'idée — composez selon vos envies." },
      ],
    },
    story: {
      eyebrow: "Notre obsession",
      title: "Le parfum de luxe, démocratisé.",
      body: "kingofscents est né d'une idée simple : à Casablanca comme à Marrakech, on aime les belles choses — mais un flacon de Baccarat Rouge à 2 200 DH, c'est une décision. Alors on décante. À la main, dans des flacons pharmaceutiques de qualité, à partir de bouteilles 100% authentiques. Vous portez le même parfum — vous payez ce qui est juste.",
      line1Label: "Décants livrés",
      line1Value: "4 200+",
      line2Label: "Parfums au catalogue",
      line2Value: "30+",
      line3Label: "Note moyenne",
      line3Value: "4.9 / 5",
    },
    footer: {
      tagline: "Le luxe, décanté à la main au Maroc.",
      rights: "Tous droits réservés.",
      follow: "Suivez-nous",
    },
  },
  en: {
    meta: {
      title: "kingofscents — Luxury fragrances, decanted | 10ml decants",
      description:
        "Build your pack of luxury fragrance decants — 10ml each. Sauvage, Baccarat Rouge 540, Tom Ford, Creed. Delivered across Morocco, cash on delivery.",
    },
    nav: { packs: "Packs", perfumes: "Fragrances", story: "Our story", faq: "FAQ", orderNow: "Order now" },
    hero: {
      eyebrow: "10 ml decants · Hand-poured in Morocco",
      titleA: "Luxury",
      titleB: "by the",
      titleC: "drop.",
      sub: "Wear the fragrances you actually obsess over — Baccarat Rouge 540, Tom Ford, Creed, Dior — without dropping 2,000 DH on a full bottle. Compose your pack of 10 ml decants and wear a different signature every day.",
      ctaPrimary: "Build my pack",
      ctaSecondary: "Browse fragrances",
      bulletA: "100% authentic",
      bulletB: "24–72h delivery",
      bulletC: "Cash on delivery",
    },
    trust: {
      secure: "Guaranteed authentic",
      codAvail: "Cash on delivery",
      delivery: "24–72h shipping",
      authentic: "Premium glass + atomizer",
    },
    marquee: [
      "Baccarat Rouge 540",
      "Bleu de Chanel",
      "Tom Ford Tobacco Vanille",
      "Creed Aventus",
      "Dior Sauvage Elixir",
      "Oud for Greatness",
      "Layton Royal Essence",
      "Khamrah",
      "Naxos",
      "Le Labo Santal 33",
    ],
    how: {
      title: "Three steps to your signature",
      sub: "No 2,000 DH bottle commitment. Just the scents you actually want to wear — in 10 ml.",
      steps: [
        { title: "Pick a pack", body: "2, 3, or 4 decants. The bigger the pack, the cheaper each decant gets." },
        { title: "Compose it", body: "Hand-pick your fragrances from our curated catalog of luxury signatures." },
        { title: "Receive & obsess", body: "Delivered anywhere in Morocco in 24–72h. Pay on delivery." },
      ],
    },
    packs: {
      title: "Choose your pack",
      sub: "Every decant is 10 ml in pharma-grade glass with atomizer — about 100 sprays.",
      perDecant: "per decant",
      save: "Save",
      chooseCta: "Pick this pack",
      popular: "Most chosen",
      bestValue: "Best value",
      items: [
        { id: 2, name: "The Duo", subtitle: "Two signatures to set the week", price: 180, reg: 240, perks: ["2× 10 ml decants", "Travel pouch", "Free shipping over 250 DH"] },
        { id: 3, name: "The Trio", subtitle: "Our most popular — match the mood", price: 250, reg: 360, perks: ["3× 10 ml decants", "Travel pouch", "Free shipping"] },
        { id: 4, name: "The Quartet", subtitle: "A full fragrance wardrobe", price: 310, reg: 480, perks: ["4× 10 ml decants", "Travel pouch", "Free shipping", "Free scent card"] },
      ],
    },
    composer: {
      title: "Compose your pack",
      subWith: "Pick exactly {n} fragrances from our curated catalog.",
      progress: "{filled} of {total} fragrances",
      addCta: "Add",
      addedCta: "Added",
      swap: "Swap",
      summary: "Your pack",
      subtotal: "Subtotal",
      shipping: "Shipping",
      shippingFree: "Free",
      total: "Total",
      proceed: "Proceed to checkout",
      selectPackFirst: "Select a pack above to start composing.",
      completeYourPack: "Complete your pack to continue",
      yourPack: "Your pack",
      empty: "No fragrance selected yet",
      remove: "Remove",
      family: { fresh: "Fresh", oriental: "Oriental", woody: "Woody", floral: "Floral", gourmand: "Gourmand", aquatic: "Aquatic", spicy: "Spicy" },
      filterAll: "All",
      filterBy: "Filter by family",
      searchPlaceholder: "Search a fragrance…",
      notesLabel: "Notes",
      forLabel: "For",
      forHim: "Him",
      forHer: "Her",
      forUnisex: "Unisex",
    },
    checkout: {
      title: "Place your order",
      sub: "No card required. You pay at delivery.",
      name: "Full name",
      phone: "Phone (WhatsApp)",
      city: "City",
      address: "Delivery address",
      cityPlaceholder: "Casablanca, Rabat, Marrakech…",
      addressPlaceholder: "Neighborhood, street, floor…",
      payCod: "Cash on delivery",
      placeOrder: "Confirm order",
      placing: "Sending…",
      successTitle: "Order received.",
      successBody: "Our team will contact you on WhatsApp within the hour to confirm.",
      successAgain: "Build another pack",
      requiredHint: "All fields are required.",
      legal: "By ordering you agree to our terms and privacy policy.",
    },
    reviews: {
      title: "Trusted by the picky",
      sub: "4,200+ packs shipped across Morocco.",
      items: [
        { name: "Yasmine", city: "Casablanca", quote: "Finally got to try Baccarat Rouge 540 without sweating over the price. The decant lasts a full day. Already reordered the Trio." },
        { name: "Hamza", city: "Rabat", quote: "Packaging is serious, fragrances are authentic. Delivered in 36 hours. I switch signatures by the occasion now." },
        { name: "Salma", city: "Marrakech", quote: "Brilliant idea. Built a mixed pack for me and my husband — two decants each. Service was flawless." },
        { name: "Mehdi", city: "Tangier", quote: "10 ml lasts me a solid month of daily wear. Way smarter than blowing 1,800 DH on a bottle you'll get tired of." },
      ],
    },
    faq: {
      title: "Frequently asked",
      sub: "Everything you need to know before composing.",
      items: [
        { q: "Are your fragrances authentic?", a: "Yes. We buy original bottles directly from authorized distributors and hand-decant them into pharma-grade vials with atomizers. No mixing, no dilution." },
        { q: "How many sprays in a 10 ml decant?", a: "About 100 sprays — roughly 1 to 2 months of daily wear depending on use." },
        { q: "How long is delivery?", a: "24 to 72 hours anywhere in Morocco. Usually next-day in Casablanca and Rabat." },
        { q: "How do I pay?", a: "Cash on delivery. The courier hands you the pack, you inspect it, then pay." },
        { q: "Can I return if I don't like a scent?", a: "For hygiene reasons, opened decants are not refundable. If a decant arrives damaged we replace it immediately." },
        { q: "Can I mix men's and women's in one pack?", a: "Of course — that's the whole point. Compose by mood, not by aisle." },
      ],
    },
    story: {
      eyebrow: "Our obsession",
      title: "Luxury fragrance, democratized.",
      body: "kingofscents was born from a simple idea: in Casablanca and Marrakech we love beautiful things — but a 2,200 DH bottle of Baccarat Rouge is a decision. So we decant. By hand, into premium pharma glass, from 100% authentic bottles. Same fragrance — fair price.",
      line1Label: "Decants shipped",
      line1Value: "4,200+",
      line2Label: "Fragrances in catalog",
      line2Value: "30+",
      line3Label: "Average rating",
      line3Value: "4.9 / 5",
    },
    footer: {
      tagline: "Luxury, decanted by hand in Morocco.",
      rights: "All rights reserved.",
      follow: "Follow us",
    },
  },
};

export function getDict(locale: Locale): Dict {
  return dict[locale] ?? dict[defaultLocale];
}
