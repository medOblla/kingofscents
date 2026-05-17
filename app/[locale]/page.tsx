import { Locale, defaultLocale, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowItWorks from "@/components/HowItWorks";
import ShopExperience from "@/components/ShopExperience";
import Story from "@/components/Story";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import ScrollReveal from "@/components/ScrollReveal";
import PageLoader from "@/components/PageLoader";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang: Locale = (locales as readonly string[]).includes(locale) ? (locale as Locale) : defaultLocale;
  return (
    <main className="relative">
      <PageLoader />
      <ScrollReveal />
      <StructuredData locale={lang} />
      <Header locale={lang} />
      <Hero locale={lang} />
      <Marquee locale={lang} />
      <HowItWorks locale={lang} />
      <ShopExperience locale={lang} />
      <Story locale={lang} />
      <Reviews locale={lang} />
      <FAQ locale={lang} />
      <Footer locale={lang} />
    </main>
  );
}
