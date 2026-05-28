export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export type TierCopy = {
  name: string;
  tagline: string;
  perks: string[];
};

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
    popular: string;
    bestValue: string;
    viewBundlesCta: string;
    pickBundleCta: string;
    selectedCta: string;
    exploreCta: string;
    backToBundles: string;
    bundleNoun: string;
    fragrancesNoun: string;
    freeShipping: string;
    freeDecant: string; // {n} placeholder
    fromPrefix: string; // "à partir de" / "from"
    gulfDuoBadge: string;
    perks: { royal: TierCopy; signature: TierCopy; discovery: TierCopy };
    bundlesHeading: string; // {tier}
    bundlesHeadingPickFirst: string;
    chooseVariant: string;
    inThisBundle: string;
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
    summary: string;
    subtotal: string;
    shipping: string;
    total: string;
    lockedTitle: string;
    lockedBody: string;
    lockedCta: string;
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
        "Trois tiers de bundles fixes — Royal, Signature, Discovery. Décants 10ml de YSL, Dior, Armani, Lattafa, Afnan. Livraison offerte au Maroc, paiement à la livraison.",
    },
    nav: { packs: "Bundles", perfumes: "Parfums", story: "Notre histoire", faq: "FAQ", orderNow: "Commander" },
    hero: {
      eyebrow: "Décants 10 ml · Bundles fixes · Livraison offerte",
      titleA: "Le luxe",
      titleB: "en quelques",
      titleC: "gouttes.",
      sub: "Trois tiers. Dix bundles soigneusement composés autour de YSL, Dior, Armani et les meilleurs Gulf. Choisissez votre bundle — recevez votre signature.",
      ctaPrimary: "Voir les bundles",
      ctaSecondary: "Notre histoire",
    },
    trust: {
      secure: "Authentiques garantis",
      codAvail: "Paiement à la livraison",
      delivery: "Livraison 24–72h",
      authentic: "Flaconnage premium",
    },
    marquee: [
      "YSL",
      "Dior",
      "Emporio Armani",
      "Afnan",
    ],
    how: {
      title: "Trois pas vers votre signature",
      sub: "Pas de flacon à 2 000 DH. Juste les parfums que vous voulez vraiment porter — en 10 ml.",
      steps: [
        { title: "Choisissez un tier", body: "Royal, Signature ou Discovery. Plus de parfums, meilleur tarif au décant." },
        { title: "Choisissez votre bundle", body: "Chaque tier propose des bundles fixes — soigneusement composés." },
        { title: "Recevez et obsédez", body: "Livraison partout au Maroc en 24–72h. Paiement à la livraison." },
      ],
    },
    packs: {
      title: "Choisissez votre bundle",
      sub: "Trois tiers — Royal, Signature, Discovery. Tous les décants en 10 ml avec spray brumisateur.",
      popular: "Le plus choisi",
      bestValue: "Meilleur rapport",
      viewBundlesCta: "Voir les bundles",
      pickBundleCta: "Choisir ce bundle",
      selectedCta: "Sélectionné",
      exploreCta: "Découvrir",
      backToBundles: "Retour aux bundles",
      chooseVariant: "Choisissez votre bundle",
      inThisBundle: "Dans ce bundle",
      bundleNoun: "Bundle",
      fragrancesNoun: "parfums",
      freeShipping: "Livraison offerte",
      freeDecant: "+ décant mystère {n} ml offert",
      fromPrefix: "à partir de",
      gulfDuoBadge: "Duo Gulf",
      perks: {
        royal: {
          name: "Royal",
          tagline: "Quatre signatures. Le couronnement.",
          perks: ["4 × décants 10 ml", "+ décant mystère 5 ml offert", "Livraison offerte", "Pochette de transport"],
        },
        signature: {
          name: "Signature",
          tagline: "Trois parfums pour rythmer la semaine.",
          perks: ["3 × décants 10 ml", "+ décant mystère 2,5 ml offert", "Livraison offerte", "Pochette de transport"],
        },
        discovery: {
          name: "Discovery",
          tagline: "Deux parfums. Le pari malin.",
          perks: ["2 × décants 10 ml", "Livraison offerte", "Pochette de transport"],
        },
      },
      bundlesHeading: "Bundles {tier}",
      bundlesHeadingPickFirst: "Choisissez un tier ci-dessus pour découvrir les bundles.",
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
      successAgain: "Voir d'autres bundles",
      requiredHint: "Tous les champs sont requis.",
      legal: "En commandant, vous acceptez nos conditions et politique de confidentialité.",
      summary: "Récapitulatif",
      subtotal: "Sous-total",
      shipping: "Livraison",
      total: "Total",
      lockedTitle: "Choisissez un bundle pour continuer.",
      lockedBody: "Le formulaire de commande s'activera dès qu'un bundle sera sélectionné.",
      lockedCta: "Voir les bundles",
    },
    reviews: {
      title: "Adopté par les exigeants",
      sub: "Plus de 4 200 bundles livrés à travers le Maroc.",
      items: [
        { name: "Yasmine", city: "Casablanca", quote: "Enfin essayer Y de YSL sans flipper sur le prix. Le décant tient une journée entière. J'ai déjà recommandé le Signature." },
        { name: "Hamza", city: "Rabat", quote: "Le packaging est sérieux, les parfums authentiques. Livré en 36 heures. Je change de signature selon l'occasion." },
        { name: "Salma", city: "Marrakech", quote: "Idée brillante. Bundle Royal pour mon mari, Discovery pour moi. Service impeccable." },
        { name: "Mehdi", city: "Tanger", quote: "Les 10 ml durent un bon mois en porté quotidien. Bien plus malin que de claquer 1 800 DH sur un flacon qu'on n'aime plus." },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      sub: "Tout ce qu'il faut savoir avant de commander.",
      items: [
        { q: "Vos parfums sont-ils authentiques ?", a: "Oui. Nous achetons les flacons originaux directement auprès des distributeurs autorisés et nous les reconditionnons à la main dans des décants pharmaceutiques avec spray. Aucun mélange, aucune dilution." },
        { q: "Combien de vaporisations dans un décant 10 ml ?", a: "Environ 100 vaporisations — soit 1 à 2 mois en porté quotidien selon votre habitude." },
        { q: "Quel est le délai de livraison ?", a: "24 à 72 heures partout au Maroc. Casablanca et Rabat généralement le lendemain." },
        { q: "Comment payer ?", a: "Paiement à la livraison en espèces. Le livreur vous remet le bundle, vous vérifiez, vous payez." },
        { q: "Qu'est-ce que le décant mystère ?", a: "Royal et Signature incluent un décant cadeau, sélectionné par notre équipe parmi les nouveautés. Une belle surprise à chaque commande." },
        { q: "Puis-je retourner si le parfum ne me plaît pas ?", a: "Pour des raisons d'hygiène, les décants ouverts ne sont pas repris. Si le décant arrive endommagé, nous le remplaçons immédiatement." },
      ],
    },
    story: {
      eyebrow: "Notre obsession",
      title: "Le parfum de luxe, démocratisé.",
      body: "kingofscents est né d'une idée simple : à Casablanca comme à Marrakech, on aime les belles choses — mais un flacon à 1 800 DH, c'est une décision. Alors on décante. À la main, dans des flacons pharmaceutiques de qualité, à partir de bouteilles 100% authentiques. Vous portez le même parfum — vous payez ce qui est juste.",
      line1Label: "Bundles livrés",
      line1Value: "4 200+",
      line2Label: "Bundles disponibles",
      line2Value: "10",
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
        "Three tiers of fixed bundles — Royal, Signature, Discovery. 10ml decants of YSL, Dior, Armani, Lattafa, Afnan. Free shipping across Morocco, cash on delivery.",
    },
    nav: { packs: "Bundles", perfumes: "Fragrances", story: "Our story", faq: "FAQ", orderNow: "Order now" },
    hero: {
      eyebrow: "10 ml decants · Fixed bundles · Free shipping",
      titleA: "Luxury",
      titleB: "by the",
      titleC: "drop.",
      sub: "Three tiers. Ten curated bundles built around YSL, Dior, Armani and the best Gulf scents. Pick a bundle — wear your signature.",
      ctaPrimary: "See the bundles",
      ctaSecondary: "Our story",
    },
    trust: {
      secure: "Guaranteed authentic",
      codAvail: "Cash on delivery",
      delivery: "24–72h shipping",
      authentic: "Premium glass + atomizer",
    },
    marquee: [
      "YSL",
      "Dior",
      "Emporio Armani",
      "Afnan",
    ],
    how: {
      title: "Three steps to your signature",
      sub: "No 2,000 DH bottle commitment. Just the scents you actually want to wear — in 10 ml.",
      steps: [
        { title: "Pick a tier", body: "Royal, Signature, or Discovery. More fragrances, better price per decant." },
        { title: "Pick your bundle", body: "Each tier offers fixed bundles — carefully curated." },
        { title: "Receive & obsess", body: "Delivered anywhere in Morocco in 24–72h. Pay on delivery." },
      ],
    },
    packs: {
      title: "Choose your bundle",
      sub: "Three tiers — Royal, Signature, Discovery. Every decant is 10 ml in pharma-grade glass with atomizer.",
      popular: "Most chosen",
      bestValue: "Best value",
      viewBundlesCta: "View bundles",
      pickBundleCta: "Pick this bundle",
      selectedCta: "Selected",
      exploreCta: "Explore",
      backToBundles: "Back to bundles",
      chooseVariant: "Pick your bundle",
      inThisBundle: "In this bundle",
      bundleNoun: "Bundle",
      fragrancesNoun: "fragrances",
      freeShipping: "Free shipping",
      freeDecant: "+ free {n} ml mystery decant",
      fromPrefix: "from",
      gulfDuoBadge: "Gulf Duo",
      perks: {
        royal: {
          name: "Royal",
          tagline: "Four signatures. The crown jewel.",
          perks: ["4 × 10 ml decants", "+ free 5 ml mystery decant", "Free shipping", "Travel pouch"],
        },
        signature: {
          name: "Signature",
          tagline: "Three fragrances to set the week.",
          perks: ["3 × 10 ml decants", "+ free 2.5 ml mystery decant", "Free shipping", "Travel pouch"],
        },
        discovery: {
          name: "Discovery",
          tagline: "Two fragrances. The smart bet.",
          perks: ["2 × 10 ml decants", "Free shipping", "Travel pouch"],
        },
      },
      bundlesHeading: "{tier} bundles",
      bundlesHeadingPickFirst: "Pick a tier above to see its bundles.",
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
      successAgain: "Browse other bundles",
      requiredHint: "All fields are required.",
      legal: "By ordering you agree to our terms and privacy policy.",
      summary: "Order summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      total: "Total",
      lockedTitle: "Pick a bundle to continue.",
      lockedBody: "The order form will activate as soon as you pick a bundle.",
      lockedCta: "Browse bundles",
    },
    reviews: {
      title: "Trusted by the picky",
      sub: "4,200+ bundles shipped across Morocco.",
      items: [
        { name: "Yasmine", city: "Casablanca", quote: "Finally got to try YSL Y without sweating over the price. The decant lasts a full day. Already reordered the Signature." },
        { name: "Hamza", city: "Rabat", quote: "Packaging is serious, fragrances are authentic. Delivered in 36 hours. I switch signatures by the occasion now." },
        { name: "Salma", city: "Marrakech", quote: "Brilliant idea. Royal bundle for my husband, Discovery for me. Service was flawless." },
        { name: "Mehdi", city: "Tangier", quote: "10 ml lasts me a solid month of daily wear. Way smarter than blowing 1,800 DH on a bottle you'll get tired of." },
      ],
    },
    faq: {
      title: "Frequently asked",
      sub: "Everything you need to know before ordering.",
      items: [
        { q: "Are your fragrances authentic?", a: "Yes. We buy original bottles directly from authorized distributors and hand-decant them into pharma-grade vials with atomizers. No mixing, no dilution." },
        { q: "How many sprays in a 10 ml decant?", a: "About 100 sprays — roughly 1 to 2 months of daily wear depending on use." },
        { q: "How long is delivery?", a: "24 to 72 hours anywhere in Morocco. Usually next-day in Casablanca and Rabat." },
        { q: "How do I pay?", a: "Cash on delivery. The courier hands you the bundle, you inspect it, then pay." },
        { q: "What is the mystery decant?", a: "Royal and Signature include a bonus decant, picked by our team from our latest arrivals. A little surprise with every order." },
        { q: "Can I return if I don't like a scent?", a: "For hygiene reasons, opened decants are not refundable. If a decant arrives damaged we replace it immediately." },
      ],
    },
    story: {
      eyebrow: "Our obsession",
      title: "Luxury fragrance, democratized.",
      body: "kingofscents was born from a simple idea: in Casablanca and Marrakech we love beautiful things — but a 1,800 DH bottle is a decision. So we decant. By hand, into premium pharma glass, from 100% authentic bottles. Same fragrance — fair price.",
      line1Label: "Bundles shipped",
      line1Value: "4,200+",
      line2Label: "Bundles available",
      line2Value: "10",
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
