import type { Metadata } from "next";
import { Locale, defaultLocale, locales, getDict } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale;
  const d = getDict(lang);
  return {
    title: { absolute: d.meta.title },
    description: d.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: "/img/og.png",
          width: 1424,
          height: 752,
          alt: "kingofscents — Décants de parfums de luxe au Maroc",
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  return <>{children}</>;
}
