import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, defaultLocale, locales, getDict } from "@/lib/i18n";
import { tiers, type TierId } from "@/lib/catalog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import BundleDetail from "@/components/BundleDetail";

const TIER_IDS: TierId[] = ["royal", "signature", "discovery"];

function isTierId(x: string): x is TierId {
  return (TIER_IDS as string[]).includes(x);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    TIER_IDS.map((tier) => ({ locale, tier })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tier: string }>;
}): Promise<Metadata> {
  const { locale, tier } = await params;
  const lang = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : defaultLocale;
  if (!isTierId(tier)) return {};
  const d = getDict(lang);
  const copy = d.packs.perks[tier];
  const t = tiers[tier];
  const title = `${copy.name} — ${t.count} × 10 ml | kingofscents`;
  const desc =
    lang === "fr"
      ? `Bundle ${copy.name}: ${copy.tagline} ${t.count} décants 10 ml. Livraison offerte au Maroc.`
      : `${copy.name} bundle: ${copy.tagline} ${t.count} × 10 ml decants. Free shipping across Morocco.`;
  return {
    title: { absolute: title },
    description: desc,
    alternates: {
      canonical: `/${lang}/bundle/${tier}`,
      languages: {
        fr: `/fr/bundle/${tier}`,
        en: `/en/bundle/${tier}`,
      },
    },
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ locale: string; tier: string }>;
}) {
  const { locale, tier } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  if (!isTierId(tier)) notFound();
  const lang = locale as Locale;

  return (
    <main className="relative">
      <StructuredData locale={lang} />
      <Header locale={lang} />
      <BundleDetail locale={lang} tierId={tier} />
      <Footer locale={lang} />
    </main>
  );
}
