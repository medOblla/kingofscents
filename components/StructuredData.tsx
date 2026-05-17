import { Locale } from "@/lib/i18n";

export default function StructuredData({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://kingofscents.ma/#org",
        name: "kingofscents",
        url: "https://kingofscents.ma",
        logo: "https://kingofscents.ma/img/og.png",
        sameAs: [
          "https://instagram.com/kingofscents",
          "https://tiktok.com/@kingofscents",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://kingofscents.ma/#website",
        url: `https://kingofscents.ma/${locale}`,
        name: "kingofscents",
        inLanguage: locale === "fr" ? "fr-MA" : "en",
        publisher: { "@id": "https://kingofscents.ma/#org" },
      },
      {
        "@type": "Product",
        name: "Pack The Trio — 3 décants 10 ml",
        description: "Trois décants de parfums de luxe 10ml composés à la main au Maroc.",
        image: "https://kingofscents.ma/img/og.png",
        brand: { "@id": "https://kingofscents.ma/#org" },
        offers: {
          "@type": "Offer",
          price: "250",
          priceCurrency: "MAD",
          availability: "https://schema.org/InStock",
          areaServed: "MA",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "4200",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
