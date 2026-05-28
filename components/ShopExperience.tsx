"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";
import {
  bundlePrice,
  bundlesByTier,
  tiers,
  type TierId,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./HowItWorks";

const easeLuxe = [0.22, 1, 0.36, 1] as const;
const TIER_ORDER: TierId[] = ["royal", "signature", "discovery"];

export default function ShopExperience({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const p = d.packs;

  return (
    <section id="packs" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={locale === "fr" ? "Nos bundles" : "Our bundles"}
          title={p.title}
          sub={p.sub}
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {TIER_ORDER.map((tid, i) => (
            <TierTeaserCard key={tid} tierId={tid} index={i} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierTeaserCard({
  tierId,
  index,
  locale,
}: {
  tierId: TierId;
  index: number;
  locale: Locale;
}) {
  const p = getDict(locale).packs;
  const t = tiers[tierId];
  const copy = p.perks[tierId];
  const tierBundles = bundlesByTier(tierId);
  // Use the first bundle as the cover preview
  const cover = tierBundles[0];
  const minPrice = Math.min(...tierBundles.map(bundlePrice));

  const isSignature = tierId === "signature";
  const isRoyal = tierId === "royal";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeLuxe, delay: index * 0.08 }}
      className={cn(
        "relative rounded-3xl border bg-[color:var(--color-bg-elev)] elev-card overflow-hidden flex flex-col",
        isSignature
          ? "border-[color:var(--color-gold)]/50 shadow-[0_30px_60px_-20px_rgba(200,160,82,0.25)]"
          : "border-[color:var(--color-line)]",
      )}
    >
      {/* Top badges */}
      {isSignature && (
        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] text-[9px] tracking-[0.22em] uppercase font-medium">
          {p.popular}
        </div>
      )}
      {isRoyal && (
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-[color:var(--color-bg)]/80 backdrop-blur border border-[color:var(--color-gold)] text-[color:var(--color-gold)] text-[9px] tracking-[0.22em] uppercase">
          {p.bestValue}
        </div>
      )}

      <Link
        href={`/${locale}/bundle/${tierId}`}
        aria-label={`${copy.name} — ${p.exploreCta}`}
        className="group flex flex-col flex-1"
      >
        {/* Hero — composite photo of the tier's first bundle */}
        <div className="relative aspect-[5/4] sm:aspect-[4/3] overflow-hidden bg-[color:var(--color-bg)]">
          <Image
            src={`/img/bundles/${cover.id}.png`}
            alt={`${copy.name} bundle`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 360px"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-[var(--ease-luxe)]"
            priority={index === 0}
          />
          {/* Top gradient for badge legibility */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-bg)]/80 to-transparent pointer-events-none" />
          {/* Bottom gradient for tier label legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--color-bg)]/90 via-[color:var(--color-bg)]/40 to-transparent pointer-events-none" />

          {/* Tier label bottom-left */}
          <div className="absolute left-5 sm:left-6 bottom-4 z-10">
            <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]">
              {locale === "fr" ? "Tier" : "Tier"}
            </div>
            <div className="font-display text-2xl sm:text-3xl text-[color:var(--color-ink)] leading-none mt-1">
              {copy.name}
            </div>
          </div>
          {/* Count + variant count bottom-right */}
          <div className="absolute right-5 sm:right-6 bottom-4 z-10 text-right">
            <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]">
              {t.count} × 10 ml
            </div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]/70 mt-0.5">
              {tierBundles.length}{" "}
              {locale === "fr" ? "bundles" : "bundles"}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 flex flex-col gap-4 flex-1">
          <p className="text-sm text-[color:var(--color-ink-muted)] leading-relaxed">
            {copy.tagline}
          </p>

          {/* Perks pills (just 2 for brevity) */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] tracking-wider px-2 py-1 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)]">
              {p.freeShipping}
            </span>
            {t.decantMl > 0 && (
              <span className="text-[10px] tracking-wider px-2 py-1 rounded-full border border-[color:var(--color-gold)]/40 text-[color:var(--color-gold)]">
                {p.freeDecant.replace("{n}", String(t.decantMl))}
              </span>
            )}
          </div>

          {/* Price + Explore */}
          <div className="mt-auto pt-3 flex items-end justify-between gap-3">
            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)] mb-1">
                {tierId === "discovery" ? p.fromPrefix : ""}
              </div>
              <div className="font-display text-3xl sm:text-4xl text-[color:var(--color-ink)] tabular-nums leading-none">
                {minPrice}
                <span className="ml-1 text-sm text-[color:var(--color-ink-muted)] align-baseline">
                  DH
                </span>
              </div>
            </div>
            <span className="cta-glint shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] text-sm font-medium group-hover:bg-[color:var(--color-gold-hi)] shadow-[0_14px_30px_-12px_rgba(200,160,82,0.55)] transition-colors">
              {p.exploreCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
